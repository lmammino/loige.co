---
title: Building x86 Rust containers from Mac Silicon
slug: building_x86_rust-containers-from-mac-silicon
subtitle: Cross-compiling Rust for x86 containers from Mac Silicon using musl,
  RusTLS, and other tricks
date: 2023-05-05T09:29:00.000Z
updated: 2023-05-08T09:40:00.000Z
header_img: ./building_x86_rust-containers-from-mac-silicon.jpg
status: published
tags:
  - rust
  - docker
description: This article walks through the challenges of cross-compiling a Rust
  web app from a Mac Silicon machine to an x86 Docker container using musl,
  RusTLS, multi-stage builds and other techniques to produce a small container
  image.
---

I recently struggled to build an x86_64 container for a web app written in Rust from my Mac Silicon. I eventually figured out a working solution that also heavily reduced the size of the container image. In this article, I will walk you through this solution!

This solution involves a bunch of interesting technology, so if nothing else, it's going to be an opportunity to explore these cool topics:

- [Rust](/tag/rust) (of course)
- [Docker](/tag/docker) (of course)
- Docker multi-stage builds
- Linux Alpine
- [musl libc](https://musl.libc.org/)
- [QEMU](https://www.qemu.org/)
- [RusTLS](https://github.com/rustls/rustls)
- [Jemalloc](https://jemalloc.net/)

The big disclaimer is that I am not sure this is the best solution ever, but it's definitely "a solution". If you have been through the same journey and you think there's something that can be improved, I'd love to hear that! After all, we are here to learn from each other, so do reach out [on Twitter](https://twitter.com/loige) or [in the comments below](#comments).

## The use case

Let's start by putting things in context. What's the problem I am trying to solve here anyway?

I built a web application using [Axum](https://github.com/tokio-rs/axum) (a cool Rust web framework) and [SolidJS](https://www.solidjs.com/) (which, as an aside, is becoming my favourite frontend JavaScript framework).

The app works and I am happy with it. _It works on my machine™️_, but now the question is _"How do I ship it to production?"_ 🛳️

In this particular case, I don't have too much of a say on how to structure the production environment, what I am told is that **I get to run "a container" in some kind of Virtual Private Server somewhere**.

So no AWS joy, for me, this time around 🥲 ... but life is good, at least I can still use containers, which should be easy enough, right? RIGHT?! 🥺

![How hard it can be? (Spongebob)](./hard.gif)

## The first attempt

So, being able to ship a Docker container, I don't really have to know much about the target environment. I am guaranteed I will have enough memory and CPU for my container and that (critical piece of information) the VPS runs on a **x86 64 bits processor**. So I have to make sure to provide a container for this target architecture.

Another critical piece of information is that my development machine is a Mac with a silicon processor, so I need to figure out how to build my container for a different architecture.

If you are thinking I could create some kind of build pipeline on an x86 architecture, well, great idea! But I like the pain and the challenge, so I want to be able to build from my machine and just ship the damn container image!

Before we deep dive into the Docker code, keep in mind that my project is structured as a monorepo. I have frontend and backend colocated in the same project and my folder structure looks more or less like this:

```plaintext
.
├── Dockerfile
├── README.md
├── backend
└── frontend
```

So I rolled up my sleeves and came up with this first version of `Dockerfile` (of which you get to see a simplified version just to get to the point):

```dockerfile
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

- It's easier to end up with a smaller target container because it won't contain all the baggage of the build tools. In fact, the build happens in a dedicated container which is not the one that gets shipped to production.
- If you are building multiple things (in my case a frontend and a backend) you can parallelise these parts by using several specialised build containers.

Let's now review the current `Dockerfile` and go through the main bits:

```dockerfile
# build container
FROM rust:1.68.2-slim-buster as backend
RUN apt update && apt install -y librust-openssl-dev libssl-dev
RUN mkdir /app
COPY backend /app/backend
RUN cd /app/backend && cargo build --release

# ...
```

This is the build container. It's responsible _just_ for building the executable binary by compiling the Rust code.

In short, what's happening here is the following:

- We start from a Debian-based Rust container which we label `backend`. This base image contains all the build tools that we are expected to use to compile Rust-based projects (`cargo`, `rustc`, etc.).
- Because the project uses some crates that require `openssl` (such as `sqlx` and `reqwest`) we need to make sure `openssl` is present in the build environment.
- We create the `/app/backend` folder and copy all the Rust source code in there.
- Finally, we run `cargo build --release` to compile the executable binary for the app.

Let's now look at the target container:

```dockerfile
# ...

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

The first (and probably unexpected bit) is that we are using the same base image as our build container. This is something that I wasn't really happy with because it means we give away one of the benefits of multi-stage containers: keeping the target container small.

The reason for this is that I tried other smaller base images, such as plain Debian (slim) or even Alpine and in all these attempts I ended up with different runtime errors indicating some kind of missing library.

Out of frustration, I eventually capitulated, and decided _this is fine_ 🐶☕️🔥 and moved on with my life (massive spoiler alert: I'll eventually get to regret this decision).

The other bits in this `Dockerfile` are:

- Again, we create an `/app` folder.
- We copy from the `backend` build container the `backend` binary into `/app/backend`.
- We set the working directory of this container to `/app`.
- We define the default runtime command to execute the `backend` binary we just copied.
- We expose port `3000` and set some environment variables.

Great, all clear?!

Awesome! Let's build this, now! 🛠️

```bash
docker build --platform linux/amd64 .
```

The secret ingredient here is the `--platform` flag. In case you didn't know, Docker has [multi-platform](https://docs.docker.com/build/building/multi-platform/) capabilities!

This flag uses `buildkit`, `buildx` and `QEMU` behind the scene to build the container for the specified target architecture, regardless what's your current architecture.

This is what allows us to build a `linux/amd64` binary on a machine with a different architecture such as a Mac silicon (_AArch64_).

## Going to production and container size issues

Long story short, I was eventually happy with this approach and I _shipped_ the resulting container.

I didn't initially pay too much attention to the container size, but I did realise that it took a _significantly long time_ to transfer it over the wire to the target machine. It is also worth calling out that here we are not using a Docker registry but just shipping raw TAR files for the Docker image.

Don't ask me why... didn't I tell you I don't have a say in the target environment? 😅

Ok, so now it's easy to conclude two things:

- The networking between my development machine and the production machine is not great which is something outside my control, unfortunately.
- The filesize of this container must be _significantly big_.

I discovered this cool tool called [`dive`](https://github.com/wagoodman/dive) to inspect container images and I analysed my image.

A whopping **900 MB\*\*** is what came out!

![this big gif (Paul McCartney)](./big.gif)

That felt indeed like a lot for a container _just_ running a Rust-based binary!

Maybe I can try to optimise something to reduce the container image size.

It cannot be that hard, right? 😇

## Second attempt: reducing the image file size

My first idea was to just try again with a Linux Alpine base image for the target container. I have used Alpine in the past and it comes with its quirks but it's always quite reliable when it comes to keeping the container image size small.

So I just changed:

```dockerfile
# ...

# target container
FROM rust:1.68.2-slim-buster

# ...
```

with:

```dockerfile
# ...

# target container
FROM alpine:3.17.3

# ...
```

And built the container, again:

```bash
docker build --platform linux/amd64 .
```

It built just fine, but now when we try to run the resulting container image, this is what we get!

```plaintext
Could not open '/lib64/ld-linux-x86-64.so.2': No such file or directory
```

I honestly had no idea what that meant, so after some careful googling, this is [what I found](https://www.reddit.com/r/docker/comments/wqxqff/comment/ikq1ol5/?utm_source=reddit&utm_medium=web2x&context=3):

> You problem is you are using an alpine image, and docker assumes glibc. alpine uses musl not glibc. Hence why /lib64/ld-linux-x86-64.so.2 doesn't exist.

I also discovered this amazing article: [How to create small Docker images for Rust](https://kerkour.com/rust-small-docker-image) by Sylvain Kerkour. It contains a lot of useful suggestions on how to get small Docker images for Rust projects. It also confirms that we need to build using [`musl`](https://musl.libc.org/) and avoid glibc if we want to target Alpine base images! Finally, it also recommends trying to remove all dependencies from `libssl` and `openssl` and rely on [`rustls`](https://github.com/rustls/rustls) instead.

If you never heard about `musl` this is the official description:

> `musl` is an implementation of the C standard library built on top of the Linux system call API, including interfaces defined in the base language standard, POSIX, and widely agreed-upon extensions. musl is lightweight, fast, simple, free, and strives to be correct in the sense of standards-conformance and safety.

And here's `rustls` one:

> `Rustls` is a modern TLS library written in Rust. It uses [`ring`](https://github.com/briansmith/ring) for cryptography and [`webpki`](https://github.com/rustls/webpki) for certificate verification.

Overall, what we want is a way to create a self-contained binary, meaning **all the libraries should be statically linked into the executable** so we don't have to assume specific libraries have to exist in the execution environment.

I like the sound of that, but it requires some code changes, so let's go through all of them, one by one!

### Switching to jemallocator

[`jemallocator`](https://docs.rs/jemallocator/latest/jemallocator/) is a crate that provides binding to [`Jemalloc`](https://jemalloc.net/), a general purpose `malloc(3)` implementation.

This is actually not a mandatory step, but Sylvain's article mentions that the default `musl` allocator is not optimized for speed and that `jemalloc` should help us with making sure we don't lose throughput just by switching to `musl`. I haven't done any benchmark myself, but I trust Sylvain, so let's do this!

In order to use the `jemallocator` crate, we need 2 code changes, the first one is in our `main.rs` file:

```rust
// main.rs

// ...
// Use Jemalloc only for musl-64 bits platforms
#[cfg(all(target_env = "musl", target_pointer_width = "64"))]
#[global_allocator]
static ALLOC: jemallocator::Jemalloc = jemallocator::Jemalloc;

// ...
```

And, we also need to add the `jmallocator` crate to our `Cargo.toml`:

```toml
# ...

[target.'cfg(all(target_env = "musl", target_pointer_width = "64"))'.dependencies.jemallocator]
version = "0.5"
```

I haven't seen this kind of syntax before but my understanding of it is _"if compiling for a 64bit architecture with `musl` we want `jemallocator` version `0.5` installed as an additional dependency"_.

### Switching to RusTLS

This part is a bit tricky. We need to figure out which ones of our dependencies rely on `libssl` as a dynamic library and configure those to use RusTLS instead.

In my case the two problematic crates are `sqlx` (a relational database client) and `reqwest` (an http client). Thankfully they both support RusTLS out of the box, you just need to make sure to use the right feature flags.

This was an extract of my first version of the `Cargo.toml`:

```toml
# ...

[dependencies]
# ...
reqwest = { version = "0.11.17" }
sqlx = { version = "0.6.2", features = ["runtime-tokio-native-tls", "mysql", "chrono", "offline"] }
# ...
```

And this is how I changed them to use RusTLS instead:

```toml
# ...

[dependencies]
# ...
reqwest = { version = "0.11.17", default-features = false, features = ["rustls-tls"] }
sqlx = { version = "0.6.2", features = ["runtime-tokio-rustls", "mysql", "chrono", "offline"] }
# ...
```

For `sqlx` we are replacing the `runtime-tokio-native-tls` feature with `runtime-tokio-rustls`. `reqwest` is a bit trickier and it took me a while to figure out that I couldn't just enable the `rustls-tls` feature, but I also needed to specify `default-features = false`.

### Compiling Rust using musl

Now let's get to the fun part, compiling our Rust executable, using `musl`. Full disclaimer I have little to no idea about what I am doing here, so I am mostly just reporting the steps I copied from Sylvain's article.

![I have no idea what I am doing](./no-idea.gif)

Let's update our `Dockerfile`, starting with the `backend` stage:

```dockerfile
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
```

We added a bunch of environment variables that should make sure that when Rust targets `x86_64-unknown-linux-musl` we use `qemu` and a bunch of other magic Rust flags that somehow get the job done (don't ask me how, plz)!

Then, we use `rustup` to install the `x86_64-unknown-linux-musl` target.

We also install a bunch of system-level dependencies that are needed for the build: `musl-tools musl-dev build-essential gcc-x86-64-linux-gnu clang llvm`.

And finally, we use the `--target x86_64-unknown-linux-musl` in our `cargo build` command.

Awesome! This is now building our executable producing a statically linked binary using musl and RusTLS!

There's one tiny extra change we need in our target container. When we use the `--target` flag, the resulting file will be saved in a slightly different path, so we need to change this line:

```dockerfile
# ...
COPY --from=backend /app/backend/target/release/backend /app/backend
# ...
```

to this line:

```dockerfile
# ...
COPY --from=backend /app/backend/target/x86_64-unknown-linux-musl/release/backend /app/backend
# ...
```

Note the extra `x86_64-unknown-linux-musl` in the new path.

And that's it, really!

Now we can build again with `docker build --platform linux/amd64 .` and this time we get a container image size of **100 MB**.

8x size reduction! Not bad! 🎉

![small ratatouille gif](./small.gif)

## Version 3: simpler & faster build container

**UPDATE 2023-05-06**: Thanks to all the comments I received on [a lobste.rs thread](https://lobste.rs/s/alzpfn/building_x86_rust_containers_from_mac) (special thanks to _jmillikin_ and _david_chisnall_) I ended up with a revised version of the build container which is simpler and build a bit faster.

Here's the final `Dockerfile`:

```dockerfile
FROM rust:1.68.2-slim-buster as backend
# Dependency `ring` requires a cross-compiler for bundled C/C++
# sources, and may require Perl for some the target platforms.
RUN apt update && apt install -y --no-install-recommends clang llvm perl
RUN update-ca-certificates
RUN rustup target add x86_64-unknown-linux-musl
COPY backend /app/backend
ENV CC_x86_64_unknown_linux_musl=clang
ENV RUST_BACKTRACE=full
RUN \
  --mount=type=cache,target=/app/backend/target,rw \
  --mount=type=cache,target=/usr/local/cargo/registry,rw \
  cd /app/backend && \
  cargo build --target x86_64-unknown-linux-musl --release && \
  cp /app/backend/target/x86_64-unknown-linux-musl/release/backend /app/backend/server

FROM alpine:3.17.3
RUN mkdir /app
COPY --from=backend /app/backend/server /app/backend
WORKDIR /app
WORKDIR /app
CMD ["./backend"]
EXPOSE 3000
ENV RUST_LOG="info"
ENV PORT="3000"
```

These changes are removing the need for `qemu` and making everything simpler.

I also learned about Docker cache mounts thanks to [an article by Nathanial Lattimer](https://d0nut.hashnode.dev/entering-the-garden-of-ferris) which is something that helps a ton in speeding up subsequent builds. This allows us to keep the built dependencies in the cache and rebuild only the changes made on the app!

I am much happier with these changes. That's the power of sharing your stuff even if you don't feel like an expert on it! So thanks to everyone reading this and suggesting various improvements! Please keep doing that if you see more opportunities for improvement!

## Docker history

**UPDATE 2023-05-07**: I already mentioned `dive` as a way to check the layers making up a given Docker image.

Today I discovered there's a much simpler way to do that without having to install any third-party tool: `docker history`.

You just use:

```bash
docker history <image_id>
```

And you will get a breakdown of all the commands used to build that image and how much space every one of them is taking.

In my case, I see something like this:

```plaintext
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
e7c3a275c427   10 minutes ago   ENV MAILCHIMP_LIST_ID=                          0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV MAILCHIMP_API_KEY=                          0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV MAILCHIMP_ENDPOINT=                         0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV GEOIP_PATH=/app/geoip/GeoLite2-City.mmdb    0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV FRONTEND_PATH=/app/frontend                 0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV IMAGES_PATH=/app/images                     0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV SECRET=                                     0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV DATABASE_URL=                               0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV PORT=3000                                   0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV RUST_LOG=info                               0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ENV VERSION=0.0.29                              0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   EXPOSE map[3000/tcp:{}]                         0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   CMD ["./backend"]                               0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   WORKDIR /app                                    0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   COPY images /app/images # buildkit              3.82MB    buildkit.dockerfile.v0
<missing>      10 minutes ago   COPY geoip/GeoLite2-City.mmdb /app/geoip/Geo…   71.8MB    buildkit.dockerfile.v0
<missing>      10 minutes ago   RUN |1 version=0.0.29 /bin/sh -c mkdir /app/…   0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   COPY /app/frontend/dist /app/frontend # buil…   865kB     buildkit.dockerfile.v0
<missing>      10 minutes ago   COPY /app/backend/server /app/backend # buil…   22.5MB    buildkit.dockerfile.v0
<missing>      10 minutes ago   RUN |1 version=0.0.29 /bin/sh -c mkdir /app …   0B        buildkit.dockerfile.v0
<missing>      10 minutes ago   ARG version                                     0B        buildkit.dockerfile.v0
<missing>      5 weeks ago      /bin/sh -c #(nop)  CMD ["/bin/sh"]              0B
<missing>      5 weeks ago      /bin/sh -c #(nop) ADD file:9a4f77dfaba7fd2aa…   7.05MB
```

This is telling me that:

- The base image adds an overhead of about 7MB
- The Rust binary is about 22MB
- Frontend assets and images make up together for about 4MB
- Finally, I have a GeoLite DB that makes the bulk of the image with about 72MB

If we sum all of these we get to the ~100MB that makes up for the entire image size.

I could probably squeeze a bit more from the Rust binary by stripping debug symbols or doing other compilation optimizations, but I am honestly quite happy with this result for now!

## Conclusion

I hope this article helps you if you are also going through the pain... ehm... the journey of trying to figure out how to cross-compile a Rust binary and run it through a small Docker container.

This is certainly not the only solution to this problem and I doubt it is the most optimized one (given that I barely know what I am doing here).

By having some conversations on Twitter someone brought up [`cross`](https://github.com/cross-rs/cross) which markets itself as _"Zero setup cross compilation and cross testing of Rust crates"_, something that sounds very promising.

I also know that [`cargo-lambda`](https://www.cargo-lambda.info/) uses the `zig` compiler to achieve cross-compilation when packaging lambda functions written in Rust, so it might also be worth exploring how they do that.

If you know of other solutions, please do let me know in the comment box below!

Until then, see you in the next article! ❤️

<small>Original cover photo by [novi raj](https://unsplash.com/@noviraj) on [Unsplash](https://unsplash.com/photos/gNhPDsTxz2U).</small>
