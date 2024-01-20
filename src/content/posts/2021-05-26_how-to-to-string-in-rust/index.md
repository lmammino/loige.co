---
title: How to to_string in Rust
slug: how-to-to-string-in-rust
subtitle: 'Exploring Rust traits for string conversion: Debug, Display and ToString'
date: 2021-05-26T18:50:00.000Z
updated: 2021-05-27T19:10:00.000Z
header_img: ./how-to-to-string-in-rust.jpg
status: published
written_with: []
tags:
  - rust
description: This article explores how to convert values to strings in Rust
  using traits like Debug, Display and ToString. It explains the difference
  between user-facing and debug representations.
---

In Rust, there are several ways to turn a value into a string. In this article, we will explore a few different ways and discuss what are the most idiomatic approaches depending on the context you are currently working on.

Personally, I have been quite confused for a while on what's the best way to implement a "to string" functionality for a given Rust struct. The reason why this has been confusing to me is that there are indeed many ways to do that and they all have different purposes.

I finally decided to do a bit of research to try and demystify this topic a bit and, in this post, I want to share what I learned!

Are you ready? 🙂

## Implementing our own `to_string()`

Coming from other languages and not having a deep knowledge of the most idiomatic Rust approaches, the first thing that I generally tend to do when facing a problem is _"let's just make this work for now"_.

So, in the spirit of _just making things work_, the first thing that we can do is to _just_ implement our own `to_string()` method on a given struct.

At the end of the day, what we want is just to be able to turn a given value into a `String` value, essentially something like:

```rust
someValue.to_string(); // returns a String value
```

For the sake of having a consistent example throughout the article, let's pretend that we are working on a struct that allows us to manage API credentials. In this context credentials are made up of 2 separate values:

- An `api_key`: effectively a unique id for the key.
- A `secret`: a secret string associated with the key. Something that we could use to sign API requests.

We can store this data in a struct called `Credentials`:

```rust
pub struct Credentials {
    api_key: String,
    secret: String,
}
```

Ok, now let's add a constructor and a `to_string` method to this struct:

```rust
impl Credentials {
    pub fn new(api_key: String, secret: String) -> Self {
        Credentials {
            api_key,
            secret,
        }
    }

    pub fn to_string(&self) -> String {
        // We don't want to disclose the secret
        format!("Credentials({})", &self.api_key)
    }
}
```

Quick note: the `secret` is a piece of sensitive information, so it makes sense not to print it out in our `to_string()` method.

Now, we can use our new struct:

```rust
fn main() {
    let creds = Credentials::new(String::from("SOME_API_KEY"), String::from("SOME_SECRET"));
    println!("{}", creds.to_string());
}
```

The snippet above is going to print:

```plaintext
Credentials(SOME_API_KEY)
```

Success! 🎉

OK, this is easy and it works! But, let's face it, the implementation is very specific to our struct!

What I mean by that is that the rest of the codebase doesn't really know that this type can be converted to a String. It is just a method like any other and there is no agreement or standard that says that this is how you _signal_ that a given value can be converted to a string. Therefore, we cannot build abstractions on top of this...

In fact, note how we needed to explicitly call `to_string()` in our `println!()` call.

If we try to remove that and just pass the `creds` value we get an error:

```plaintext
error[E0277]: `Credentials` doesn't implement `std::fmt::Display`
  --> src/main.rs:22:20
   |
22 |     println!("{}", creds);
   |                    ^^^^^ `Credentials` cannot be formatted with the default formatter
   |
   = help: the trait `std::fmt::Display` is not implemented for `Credentials`
   = note: in format strings you may be able to use `{:?}` (or {:#?} for pretty-print) instead
   = note: required by `std::fmt::Display::fmt`
   = note: this error originates in a macro (in Nightly builds, run with -Z macro-backtrace for more info)

error: aborting due to previous error

For more information about this error, try `rustc --explain E0277`.
```

If we zoom in a little, the error message is clear:

```plaintext
"`Credentials` cannot be formatted with the default formatter"
```

As expected, the Rust compiler doesn't seem to understand that we have defined a way to turn `Credentials` values into a string!

Wouldn't it be nice if we could somehow tell the Rust compiler that our `Credentials` type can be _stringified_?

## Rust traits

If we have a second, more in-depth, look at the error above, there's an interesting hint there:

```plaintext
the trait `std::fmt::Display` is not implemented for `Credentials`
```

The Rust compiler is trying to be helpful and it's telling us:

> "You know, if you want to be able to automatically convert `Credentials` values to a string, you should look into implementing the `std::fmt::Display` trait"

In Rust, structs can expose certain common behavior by implementing specific traits.

In other languages, you can do the same by extending certain classes or implementing certain interfaces. Other languages do the same by convention (or by protocols): if you implement certain methods with very specific names, arguments, and return types then your type (or object) can exhibit a certain behavior.

Regarding the _"to string behavior_", in Rust, there are several interesting traits that we should look into!

1. the `std::fmt::Debug` trait
2. the `std::string::ToString` trait
3. the s`td::fmt::Display` trait (the one recommended by the previous error message)

They have very specific purposes, so in the rest of this article, we will be exploring all of them and discuss when you should be using them.

## The `Debug` trait

Let's start with the `Debug` trait.

The [`Debug` documentation](https://doc.rust-lang.org/std/fmt/trait.Debug.html) says:

> "Debug should format the output in a programmer-facing, debugging context".

This is a great way to provide details about a struct, providing a message that should be visible only to developers in a debugging context.

An interesting thing is that we can get Rust to auto-implement the `Debug` trait for us by using the `Derive` macro:

```rust
#[derive(Debug)]
struct SomeStruct{}
```

So, if we want to implement the `Debug` trait in our example, we could do it as follows:

```rust
#[derive(Debug)]
pub struct Credentials {
    api_key: String,
    secret: String,
}

impl Credentials {
    pub fn new(api_key: String, secret: String) -> Self {
        Credentials {
            api_key,
            secret,
        }
    }
}

fn main() {
    let creds = Credentials::new(String::from("SOME_API_KEY"), String::from("SOME_SECRET"));
    println!("{:?}", creds);
}
```

The code above will output:

```plaintext
Credentials { api_key: "SOME_API_KEY", secret: "SOME_SECRET" }
```

Did you notice that we used the `{:?}` placeholder in our format string? This is the placeholder that indicates you want to print the value in _"debug mode"_.

A small productivity tip here: you can also use the `{:#?}` placeholder (note the hash) if you want the output to be pretty-printed! If we do that in our with our `Credentials` struct from the previous example, it will be printed like this:

```plaintext
Credentials {
    api_key: "SOME_API_KEY",
    secret: "SOME_SECRET",
}
```

But what if we want to customize the string generated in _"debug mode"_?

For instance, we might not want to display the full `secret` but only the first 4 characters and obfuscate all the remaining ones with asterisks.

Well, in this particular case, we can implement the `Debug` trait manually:

```rust
use std::fmt;

pub struct Credentials {
    api_key: String,
    secret: String,
}

impl Credentials {
    pub fn new(api_key: String, secret: String) -> Self {
        Credentials { api_key, secret }
    }
}

impl fmt::Debug for Credentials {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        f.debug_struct("Credentials")
            .field("api_key", &self.api_key)
            .field(
                "secret",
                &self
                    .secret
                    .chars()
                    .enumerate()
                    .map(|(i, c)| if i < 4 { c } else { '*' })
                    .collect::<String>(),
            )
            .finish()
    }
}

fn main() {
    let creds = Credentials::new(String::from("SOME_API_KEY"), String::from("SOME_SECRET"));
    println!("{:#?}", creds);
}
```

The code above will output:

```plaintext
Credentials {
    api_key: "SOME_API_KEY",
    secret: "SOME*******",
}
```

Implementing the `Debug` trait manually is something that you rarely have to do manually. For the majority of use cases, the `Derive` macro will serve you well!

It is interesting to note that implementing the Debug trait manually requires you to use a `Formatter`.

From the documentation:

> "A Formatter represents various options related to formatting. Users do not construct Formatters directly; a mutable reference to one is passed to the fmt method of all formatting traits, like Debug and Display."

In short, a formatter is a utility that helps you to build the output string you want to generate. If you are curious to find out more, you can check out the [official documentation page on the `Formatter` type](https://doc.rust-lang.org/std/fmt/struct.Formatter.html).

## The `ToString` trait

Let's now talk about the `std::string::ToString` trait, which is defined as:

> "A trait for converting a value to a String"

But the documentation also says that **this trait shouldn’t be implemented directly**. The `Display` trait should be implemented instead and by doing that you get the `ToString` implementation for free!

How is that possible? I mean, how is it possible that by implementing a trait, we get another one implemented automatically?

In Rust, we can implement a trait for any type that implements another trait. Implementations of a trait on any type that satisfies the trait bounds are called **blanket implementations** and are extensively used in the Rust standard library.

What this means in practice is that somewhere in the Rust core library there is some code like this:

```rust
impl<T: Display> ToString for T {
    fn to_string(&self) -> String {
        // blanket implementation here...
    }
}
```

This is basically telling the Rust compiler how to provide a _default_ implementation of the `ToString` trait for any generic types `T` that implements the `Display` trait.

Implementing `ToString` for a type will force that type to have a `to_string()` method. But the more idiomatic way to tell Rust that a type can have a user-facing string representation is to implement the more generic `Display` trait.

**UPDATE**: It's is interesting to know that the `Display` trait is implemented in the `core` module and does not use any memory allocator. `String` is heap-allocated, so it couldn't have been used in `Display`'s definition. Rust designs traits carefully to keep _heap allocating_ functions separated from the ones that don't need a memory allocator (`core`).

<small>Thanks to [kornel](https://lobste.rs/s/7hrgbb/how_string_rust#c_cxqzse) from lobste.rs for this tip</small>.

At this point, we can practically ignore the `ToString` trait and focus only on the `Display` trait!

## The `Display` trait

From [the official `Display` documentation](https://doc.rust-lang.org/std/fmt/trait.Display.html):

> "Display is similar to Debug, but Display is for user-facing output, and so cannot be derived".

The documentation is essentially saying that `Display` allows us to provide a user-facing description of a type and that we can only implement the trait directly, no magic derive!

Let's implement `Display` for our `Credentials` struct then:

```rust
use std::fmt;

pub struct Credentials {
    api_key: String,
    secret: String,
}

impl Credentials {
    pub fn new(api_key: String, secret: String) -> Self {
        Credentials { api_key, secret }
    }
}

impl fmt::Display for Credentials {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        f.write_str(self.api_key.as_ref())
    }
}

fn main() {
    let creds = Credentials::new(String::from("SOME_API_KEY"), String::from("SOME_SECRET"));
    println!("{}", creds); // "SOME_API_KEY"
}
```

Note that, again, we have to deal with a formatter.

A small productivity tip is that you can use the `write!` macro with formatters and convert:

```rust
f.write_str(self.api_key.as_ref())
```

into:

```rust
write!(f, "{}", self.api_key)
```

Nicer and more flexible, isn't it?

**UPDATE**: the `Formatter` type is more flexible because it allows us to write data into an arbitrary buffer (rather than always allocating new `String`s). For instance we could pre-allocate a buffer once (as a `String`) and write onto it multiple times as in the following example:

```rust
use std::fmt::Write;

fn main() -> fmt::Result {
    let foo = Credentials::new(String::from("foo"), String::from("foosecret"));
    let bar = Credentials::new(String::from("bar"), String::from("barsecret"));

    // pre-allocated buffer
    let mut output = String::with_capacity(200);

    write!(&mut output, "{}", foo)?;
    write!(&mut output, "{}", bar)?;
    println!("{}", output); // foobar

    Ok(())
}
```

<small>Thanks to [nicoburns](https://www.reddit.com/r/rust/comments/nlor05/how_to_to_string_in_rust_extended_blog_post_from/gzmc14l) from Reddit for this tip.</small>

Also, remember that the placeholder to use the `Display` trait is just `{}` (as opposed to `{:?}` or `{:#?}` for the `Debug` trait).

## Summary

So, just to summarise:

- `Debug` allows you to generate a debug representation for a given type. It can be automatically derived.
- `Display` is the equivalent but for user-facing information. It **CANNOT** be derived.
- `ToString`... don't implement it, just implement `Display` and you will get it for free thanks to the standard blanket implementation!

That's all I know about stringifying things in Rust! 😊

I hope this article was insightful and I am curious to know if you learned something new or if all these things were already done and dusted in your Rust journey! Let me know that in the comments!

Did I miss or misunderstood something? Please, let me know that as well! ❤️

If you'd like to see more of my Rust learning journey check out my new [twitch channel](https://www.twitch.tv/loige), where I stream every week (Monday 5PM GMT) with my friends [Eugen](https://twitter.com/88_eugen) and [Roberto](https://twitter.com/gbinside) our attempts at cracking the [Advent of code challenges](https://github.com/lmammino/rust-advent/tree/main/y2020/ex12) using Rust!

And if you prefer to read rather than watching long random-ish streaming sessions, you could check the other [Rust articles in this blog](https://loige.co/tag/rust). There are already a good few! 😱

CIAO 🙃
