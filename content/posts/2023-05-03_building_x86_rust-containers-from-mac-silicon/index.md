---
uuid: cd7bebf5-1e90-4883-a033-ab233c502fb5
layout: post
title: 'Building x86 rust containers from Mac Silicon'
slug: building_x86_rust-containers-from-mac-silicon
subtitle: null
date: 2023-03-26T16:30:00.000Z
updated: 2023-03-26T16:30:00.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: './building_x86_rust-containers-from-mac-silicon.jpg'
fb_img: ./building_x86_rust-containers-from-mac-silicon-fb.png
tw_img: ./building_x86_rust-containers-from-mac-silicon-tw.png
status: published
language: en_US
meta_title: null
meta_description: How to build a lightweight Alpine container for a Rust x86 binary from a Mac Silicon
tags: ['rust', 'docker']
---

I recently struggled to build an x86_64 container for a web app written in Rust from my Mac Silicon. I eventually figured out a working solution that also heavily reduced the size of the container and in this article, I will walk you through it!

My solution involves a bunch of interesting technology, so if nothing else, it's going to be an opportunity to explore these cool topics:

- [Docker](/tag/docker) (of course)
- Docker multi-stage builds
- Linux Alpine
- [musl libc](https://musl.libc.org/)
- [QEMU](https://www.qemu.org/)
- [RusTLS](https://github.com/rustls/rustls)

The big disclaimer is that, I am not sure this is the best solution ever, but it's definitely "a solution". If you have been through the same journey and you think there's something that can be improved, I'd love to hear that! After all, we are here to learn from each other, so do reach out [on Twitter](https://twitter.com/loige) or [in the comments below](#comments).


## The use case

Let's start by putting things in context. What's the problem I am trying to solve here?

I built a web application using [Axum](https://github.com/tokio-rs/axum) (a cool Rust web framework) and [SolidJS](https://www.solidjs.com/) (which, as an aside, is becoming my favourite frontend JavaScript framework).

The app works and I am happy with it. _It works on my machine™️_, but now the question is _"How do I ship it to production?"_ 🛳️

In this particular case, I don't have too much of a say on how to structure the production environment, what I am told is that **I get to run "a container" in some kind of Virtual Private Server somewhere**.

So no AWS joy, for me, this time around 🥲 ... but life is good, at least I can still use containers, which should be easy enough, right? RIGHT?! 🥺


## The first attempt

So, being able to ship a Docker container, I don't really have to know much about the target environment. I am guaranteed I will have enough memory and CPU for my container and that (critical piece of information) the VPS runs on a **x86 64 bits processor**. So I have to make sure to provide a container for this target architecture.

Another critical piece of information is that my development machine is a Mac with a silicon processor, so I need to figure out how to build my container for a different architecture.

If you are thinking I could create some kind of build pipeline on an x86 architecture, well, great idea! But I like the pain and the challenge, so I want to be able to build from my machine and just ship the damn container image!

Before we deep dive into the Docker code, keep in mind that my project is structured as a monorepo. I have frontend and backend colocated in the same project and my folder structure looks more or less like this:

```plain
.
├── Dockerfile
├── README.md
├── backend
└── frontend
```

So I rolled up my sleeves and came up with this first version of `Dockerfile` (of which you get to see a simplified version just to get to the point):

```Dockerfile
# build container
FROM rust:1.68.2-slim-buster as backend
RUN apt update && apt install -y librust-openssl-dev libssl-dev 
RUN mkdir /app
COPY backend /app/backend
RUN cd /app/backend && cargo build --release

# frontend build container removed for simplicity

# target container
FROM rust:1.68.2-slim-buster
RUN mkdir /app
COPY --from=backend /app/backend/target/release/backend /app/backend
WORKDIR /app
CMD ["./backend"]
EXPOSE 3000
ENV RUST_LOG="info"
ENV PORT="3000"
```

Let's break down what's happening here.

This is a [multi-stage Docker build](https://docs.docker.com/build/building/multi-stage/) which, in short, means that I am using an intermediate container that knows how to compile the Rust binary. Then I can build the target container by copying over the binary from the build container.

There are a few advantages to this approach:

- It's easier to end up with a smaller target container because it doesn't contain all the baggage of the build tools. The build happens in a dedicated container that is not going to be used in production.
- If you are building multiple things (in my case a frontend and a backend) you can parallelise these parts by using multiple build containers.

Let's now review the current `Dockerfile` and go through the main bits:

```Dockerfile
# build container
FROM rust:1.68.2-slim-buster as backend
RUN apt update && apt install -y librust-openssl-dev libssl-dev 
RUN mkdir /app
COPY backend /app/backend
RUN cd /app/backend && cargo build --release
```

This is the build container. It's responsible _just_ for building the executable binary by compiling the Rust code.

In short, what's happening here is the following:

- We start from a Debian based Rust container which we label `backend`. This base image contains all the build tools that we are expected to use to compile Rust-based projects (`cargo`, `rustc`, etc.).
- Because the project uses some crates that require `openssl` (such as `sqlx` and `reqwest`) we need to make sure `openssl` is present in the build environment.
- We create the `/app/backend` folder and copy all the Rust source code in there.
- Finally, we run `cargo build --release` to compile the executable binary for the app.

Let's now look at the target container:

```Dockerfile
# target container
FROM rust:1.68.2-slim-buster
RUN mkdir /app
COPY --from=backend /app/backend/target/release/backend /app/backend
WORKDIR /app
CMD ["./backend"]
EXPOSE 3000
ENV RUST_LOG="info"
ENV PORT="3000"
```

The first (and probably unexpected bit) is that we are using the same base image as our build container. This is something that I wasn't really happy with because it means we give away one of the benefits of multi-stage containers: keep the target container small.

The reason for this is that I tried other smaller base images, such as plain Debian (slim) or even Alpine and in all these attempts I ended up with different runtime errors indicating some kind of missing library.

Out of frustration, I eventually capitulated, and decided _this is fine_ 🐶☕️🔥 and moved on with my life (massive spoiler alert: I'll eventually get to regret this decision).

The other bits in this `Dockerfile` are:

- Again, we create an `/app` folder.
- We copy from the `backend` build container the `backend` binary into `/app/backend`.
- We set the working directory of this container to `/app`.
- We define the default runtime command to execute the `backend` binary we just copied.
- We expose port `3000` and set some environment variables.

Great, all clear?!

Awesome, let's build this now! 🛠️

```bash
docker build --platform linux/amd64 .
```

The secret ingredient here is the `--platform` flag. In case you didn't know, Docker has [multi-platform](https://docs.docker.com/build/building/multi-platform/) capabilities!

This flag uses `buildkit`, `buildx` and `QEMU` behind the scene to build the container for the specified target architecture, regardless what's your current architecture.

This is what allows us to build a `linux/amd64` binary on a machine with a different architecture such as a Mac silicon (_AArch64_).


## Going to production and container size issues

Long story short, I was eventually happy with this approach and I _shipped_ the resulting container.

I didn't initially pay too much attention to the container size, but I did realise that it took a _significantly long time_ to transfer it over the wire to the target machine. It is also worth calling out that here we are not using a Docker registry but just shipping raw TAR files for the Docker image.

Easy to conclude two things:

- The networking between my development machine and the production machine is not great which is something outside my control, unfortunately.
- The filesize of this container must be _significantly big_.

I discovered this cool tool called [`dive`](https://github.com/wagoodman/dive) to inspect container images and I analysed my image.

A whooping **900 MB** is what came out!

That felt indeed like a lot for a container _just_ running a Rust-based binary!

Maybe I can ...


TODO

Container size

TODO

Shipping it to production

Container too big problems

TODO

## Second attempt: reducing the file size

Mention article by Sylvain Kerkour [How to create small Docker images for Rust](https://kerkour.com/rust-small-docker-image)

Mention trying to switch to Alpine as it is and OpenSSL linking problems!

Mention how to switch crates to use RusTLS

Mention musl stuff and what it does

mention also changes in the allocator

Final Dockerfile

```Dockerfile
FROM rust:1.68.2-slim-buster as backend
ENV RUSTFLAGS='-C linker=x86_64-linux-gnu-gcc'
ENV CC_x86_64_unknown_linux_musl=clang
ENV AR_x86_64_unknown_linux_musl=llvm-ar
ENV CARGO_TARGET_X86_64_UNKNOWN_LINUX_MUSL_RUSTFLAGS="-Clink-self-contained=yes -Clinker=rust-lld"
ENV CARGO_TARGET_X86_64_UNKNOWN_LINUX_MUSL_RUNNER="qemu-x86_64 -L /usr/x86-64-linux-gnu"
RUN rustup target add x86_64-unknown-linux-musl
RUN apt update && apt install -y musl-tools musl-dev build-essential gcc-x86-64-linux-gnu clang llvm
RUN update-ca-certificates
RUN mkdir /app
COPY backend /app/backend
RUN cd /app/backend && cargo build --target x86_64-unknown-linux-musl --release

FROM node:18.15.0-buster-slim as frontend
RUN mkdir /app
COPY frontend /app/frontend
RUN cd /app/frontend && npm install && npm run build

FROM alpine:3.17.3
RUN mkdir /app
COPY --from=backend /app/backend/target/x86_64-unknown-linux-musl/release/backend /app/backend
COPY --from=frontend /app/frontend/dist /app/frontend
WORKDIR /app
WORKDIR /app
CMD ["./backend"]
EXPOSE 3000
ENV RUST_LOG="info"
ENV PORT="3000"
```

Mention container size now

TODO

## Conclusion


TODO

mention other alternative solutions: zig & cargo cross

Cover photo by [novi raj](https://unsplash.com/@noviraj) on [Unsplash](https://unsplash.com/photos/gNhPDsTxz2U).
  
