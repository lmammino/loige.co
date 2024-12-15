---
title: I am co-authoring a book about Rust and Lambda
slug: coauthoring-a-book-about-rust-and-lambda
subtitle: 'Announcing Crafting Lambda Functions in Rust, a guide to building efficient AWS Lambda functions with Rust by Luciano Mammino and James Eastham'
date: 2024-01-24T18:26:00.000Z
updated: 2024-01-24T18:26:00.000Z
header_img: ./coauthoring-a-book-about-rust-and-lambda.png
status: published
tags:
  - rust
  - serverless
  - lambda
description: Announcing Crafting Lambda Functions in Rust, a new book that guides you through building efficient, reliable, and cost-effective AWS Lambda functions using Rust, written by Luciano Mammino and James Eastham. Learn why Rust and serverless are a perfect match. Early access is now available at rust-lambda.com!
---

I’m beyond excited to share some big news with you: I’m co-authoring a new book
called _Crafting Lambda Functions in Rust_ together with the amazing
[James Eastham](https://jameseastham.co.uk/)! If you're as passionate about
[serverless](/tag/serverless) and [Rust](/tag/serverless) as I am, you’ll want
to check this out. We even have an official website for it, check out
[the book Crafting Lambda Functions in Rust](https://rust-lambda.com).

This book is your hands-on guide to building efficient, scalable, and
cost-effective serverless applications with AWS Lambda functions and using the
power of the Rust programming language.

## How it all started

The idea for this book didn’t happen overnight. It all began when I kept
crossing paths with James at conferences over the years. Every time we met, we’d
end up deep in conversation about two of our favorite topics: **serverless
computing** and **Rust**.

This year, at Rust Nation in London, the stars seemed to align. We realized that
we had both been toying with the idea of writing a book to share what we’d
learned about building AWS Lambda functions in Rust. We talked about how Rust is
not only incredibly powerful for Lambda but also surprisingly easy (perhaps
unexpectedly) to get started with. Rust has a reputation of being hard to grasp,
so it might come as a surprise to many to discover that building Lambda
functions with this language it's a very accessible endeavor. While we were
debating different approaches we had played with and discussing the current
tooling ecosystem, it became clear that a little evangelism could go a long way
in bringing this tech combo to a broader audience.

At that point, joining forces felt like the most natural thing to do. We agreed
to tackle this project together, and what started as an idea is now becoming a
reality. And while we’re still knee-deep in writing, we hope that someday we’ll
look back and say, “And the rest is history!” For now, though, there’s a huge
pile of work ahead, and we’re ready to take it on.

By the way, before you move on to find out more details about our motivations
and the book itself, I'd like to make it very clear that the book is already
available for purchase in early access. This means that you can start reading it
right now and help us shape the final version with your feedback. If you're
interested, head over to
[Crafting Lambda Functions in Rust's website](https://rust-lambda.com) to grab
your copy. And yes, at the time of writing it's heavily discounted, so I'd like
to think you get yourself a bit of a good deal...

Oh yeah, let me show you the book cover as well, so you can tell that this is
real!

<div style="text-align:center; display: block; max-width: 400px; margin: 0 auto;">

[![The cover of the book Crafting Lambda Functions in Rust](./crafting-lambda-functions-in-rust-cover-light.png)](https://rust-lambda.com)

</div>

<small>Yes, our mascot is a crab (a _cRustacean_, get it?) with a Lambda hat...
If you have been wandering around this blog long enough you'd probably get the
video game reference as well!</small>

## Why Rust and Lambda?

I have actually written an entire blog post on this last year:
[Why you should consider Rust for your Lambdas](/why-you-should-consider-rust-for-your-lambdas/).
But don't worry, if you are in a rush, I'll give you a quick summary here
anyway.

The combination of Rust and AWS Lambda is a game changer. Over the past few
years, I’ve been using Rust to build serverless applications, and I’ve seen
firsthand how well they complement each other. Here’s why I think Rust is an
awesome choice for writing Lambda functions.

- **Cost Savings and Sustainability**: As a compiled language, Rust produces
  highly efficient binaries that are compact and lightning-fast. This means your
  Lambda functions run quicker, consume less memory, and ultimately cost less to
  execute. Remember that with Lambda functions the _execution cost_ is given by
  the formula `memoryCost * executionTime` where `memoryCost` is a price unit
  that depends on how much memory you allocated for the Lambda and
  `executionTime` is how long that function has been executing in milliseconds.
  With Rust, in most circumstances, you can lower both dimensions, compared to
  interpreted languages such as JavaScript and Python. But it’s not just about
  saving money: Rust’s efficiency reduces resource usage, which translates to a
  lower carbon footprint. Your apps can be both cost-effective and
  environmentally friendly.
- **Reliability and Correctness**: Rust’s strict compiler and type system are
  like having an extra pair of eyes on your code. I am a big fan of the idea of
  not having a `null` type in the language and that you have to express the
  potential absence of data using a dedicated wrapper type: the
  [`Option`](https://doc.rust-lang.org/std/option/enum.Option.html) type. The
  same goes for the
  [`Result`](https://doc.rust-lang.org/std/result/enum.Result.html) type which
  lets you deal with errors in a very explicit way. These features make it
  easier to spot edge-cases as early as possible and you have to explicitly
  decide how to handle them. Once you get used to these abstractions and
  appreciated their benefits, you'll find yourself being much more confident
  that your code is correct and reliable. When you’re working in a serverless
  environment where reliability is often non-negotiable, this is a huge win.
- **Fast Starts, Smooth Runs**: With Rust, you get tiny package sizes and no
  garbage collection. This often translates to faster cold starts. How fast you
  might ask... What I have seen is something on the range of 10-60 ms (depending
  on the amount of libraries and the amount of init work to be performed). This
  is in the order of 10-20x of what I have generally observed with JavaScript
  and Python. Now think about using Lambdas as your HTTP backend or for any
  other task that has a user waiting for a response. This means that, even in
  the occasional presence of a cold start, your users will barely notice any
  additional delay which translates to a more seamless experience, even during
  peak loads.
- **A Streamlined Developer Experience**: Last but definitely not least, we
  should talk about DX. When I first talk to people about using Rust for Lambda
  functions, most of them are initially skeptical. And I get it: although
  fast-growing, Rust is still a relatively niche language, and it's certainly
  not common to see it being used with Lambda. Plus Rust has gotten a reputation
  of being somewhat difficult to learn, so all of this creates an expectation
  that, although there might be strong benefits, it must be real hard to write a
  Lambda in Rust and bring it all the way to production. Now, we can argue about
  Rust being difficult or not. I acknowledge there might be some initial
  challenges when you come from languages that manage memory for you, but it's
  also fair to say that it isn't that hard to start writing Rust and get
  productive with it. You don't need to become an all around expert of the
  language to write decent code that be shipped to production. But this isn't
  the only point, because the real super power for the combo Rust-Lambda is a
  tool called [**Cargo Lambda**](https://cargo-lambda.info). This tool makes it
  super easy to scaffold a Lambda, test it locally, compile it and ship it to
  production. It even integrates with most of IaC tools out there such as SAM,
  Terraform and even CDK. This let's you focus on writing great code while
  letting the tooling handle the heavy lifting. I seriously wish a tool like
  this existed also for Node.js and Python!

## Early Access: Read and Shape the Book!

If you got this far, hopefully, you are now convinced that using Rust for your
Lambda functions is not that crazy of an idea, so the next question is _how do
you get started_?

Well, that's why we are writing this book, so you are in the right place!

I have a bad and a good news though!

The bad news is that the book isn't finished (unless you are reading this a bit
ahead in the future). But, the good news is that everything we have produced so
far is already avaialable and there's a significant amount of work already!

You can get your copy of the book right now in early access. This means you can
get started today! By purchasing early access, you’ll:

- **Receive chapters as they’re written**: You’ll get new content and updates
  regularly.
- **Contribute to the book**: Share your feedback, and help shape the final
  version.
- **Enjoy a discounted price**: Early access comes at a (significantly) reduced
  cost from what we are expecting the final cover price to be!

This approach lets us work collaboratively with readers to ensure the book is as
practical and comprehensive as possible.

Is it worth to get the book right now? I don't know, you tell us! 😅

I'd like to think it is a good deal if you are looking to get started ASAP.

Worth mentioning that what we have published so far includes **6 chapters** that
will guide you from building a serious serverless application (a URL shortener
service) from scratch and ship it to production. This accounts for **more than
100 pages** and tons of code examples and exercises.

## What’s in (and what will be in) the Book?

Here's a list of the chapters of the book:

- **Chapter 1: Rust & Lambda** (available): We'll explore why using Rust and AWS
  Lambda together is a great idea. We'll discuss the benefits of this
  combination compared to other alternatives.
- **Chapter 2: A 'Hello, Serverless' API** (available): You'll learn how to
  write your first Rust-powered Lambda Function. You'll create a simple "Hello,
  Serverless" API that demonstrates the basics of AWS Lambda and Rust.
- **Chapter 3: Infrastructure as code with SAM** (available): We'll show you how
  to deploy and manage your Rust Lambda functions using the Serverless
  Application Model (SAM). You'll learn how to create, update, and delete your
  functions.
- **Chapter 4: Integrating with external systems** (available): We'll teach you
  how to make arbitrary HTTP requests or interact with other AWS services from
  your Lambda functions. We'll cover various techniques for integrating with
  external systems.
- **Chapter 5: Code organization** (available): This chapter will focus on best
  practices for organizing the code for projects with multiple Lambda functions.
  You'll learn how to structure your code for maintainability and readability.
- **Chapter 6: Making the code testable** (available): We'll show you how to
  structure your code in a way that allows you to write good tests for your
  Lambda functions. You'll learn about testing fundamentals and how they apply
  to Rust Lambda functions.
- **Chapter 7: Handling different kinds of events** (in progress): In this
  chapter, we'll discuss how to handle AWS-specific events, custom events, and
  arbitrary JSON in a strongly-typed way. You'll learn about event handling best
  practices for your Rust Lambda functions.
- **Chapter 8: Different ways of writing Lambda handlers** (in progress): We'll
  explore different ways to write your Lambda function handlers. We'll cover
  simple async functions, custom structs, and implementing the Tokio Tower
  service trait.
- **Chapter 9: Configuration management and handling secrets** (planned): This
  chapter will focus on best practices for injecting configuration and secrets
  into your Rust Lambda functions. You'll learn how to securely manage sensitive
  data in your serverless applications.
- **Chapter 10: Observing all the things** (planned): We'll show you how to make
  your Rust Lambda functions observable using CloudWatch or OpenTelemetry.
  You'll learn about monitoring best practices and how they apply to your
  serverless functions.
- **Chapter 11: Middlewares** (planned): In this chapter, we'll introduce the
  middleware pattern and show you how to handle cross-cutting concerns in an
  elegant and reusable way. You'll learn about middleware best practices for
  your Rust Lambda functions.
- **Chapter 12: Hosting existing HTTP services** (planned): We'll teach you how
  to wrap existing HTTP services in a Lambda function to make them easily
  available as serverless functions. You'll learn about the benefits and
  trade-offs of using this approach.
- **Chapter 13: Lambda extensions** (planned): Where we learn about Writing
  Lambda extensions using Rust.
- **Chapter 14: Integrating with GitHub Actions** (planned): How to configure
  the integration between AWS and GitHub Actions to test, build and deploy your
  Lambda Functions in an automated fashion.
- **Appendix A: IaC alternatives** (planned): How to use CDK or Terraform as an
  alternative to SAM.

## Ready to Start?

If this sounds like the kind of challenge you’re ready to take on, head over to
[rust-lambda.com](https://rust-lambda.com) to grab your copy. Let’s build
something amazing together!

Of course, feel free to reach out if you have any kind of feedback or suggestion
about this initiative, I'd seriously love to hear from you!
