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

The big caveat is that, I am not sure this is the best solution ever, but it's definitely "a solution". If you have been through the same journey and you think there's something that can be improved, I'd love to hear that! After all, we are here to learn from each other, so do reach out [on Twitter](https://twitter.com/loige) or [in the comments below](#comments).


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

So I rolled up my sleeves and came up with this first `Dockerfile` (of which you get to see a simplified version just to get to the point):

```Dockerfile
FROM rust:1.68.2-slim-buster as backend
RUN apt update && apt install -y librust-openssl-dev libssl-dev 
RUN mkdir /app
COPY backend /app/backend
RUN cd /app/backend && cargo build --release

FROM node:18.15.0-buster-slim as frontend
RUN mkdir /app
COPY frontend /app/frontend
RUN cd /app/frontend && npm install && npm run build

FROM rust:1.68.2-slim-buster
RUN mkdir /app
COPY --from=backend /app/backend/target/release/backend /app/backend
COPY --from=frontend /app/frontend/dist /app/frontend
WORKDIR /app
CMD ["./backend"]
EXPOSE 3000
ENV RUST_LOG="info"
ENV PORT="3000"
```

Let's break down what's happening here

explain the concept of multi-stage build

TODO

Command to build the container

TODO

Container size

TODO

Shipping it to production

Container too big problems

TODO

## Reducing the file size

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

Cover photo by [novi raj](https://unsplash.com/@noviraj) on [Unsplash](https://unsplash.com/photos/gNhPDsTxz2U).
  
