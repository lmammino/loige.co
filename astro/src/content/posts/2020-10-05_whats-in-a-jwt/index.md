---
title: What's in a JWT (Json Web Token)?
slug: whats-in-a-jwt
subtitle: null
date: 2020-10-05T09:00:00.000Z
updated: 2020-10-05T09:00:00.000Z
header_img: ./whats-in-a-jwt.png
status: published
tags:
  - jwt
---

If you ended up on this article, chances are that you have been seeing JWTs (Json Web Tokens) for a while and you are curious to find out what they really are, what's inside of them and how they actually work! Why did they get so mainstream anyway?! 🤔

In this article we will be trying to address this topic in a short but (hopefully) effective fashion!


## It's just a string with a well-defined format

JWT stands for *JSON Web Token* and such a token is just a string composed by 3 parts:

![The three parts of a JSON Web Token](./jwt-parts.png)

  - a **header**
  - a **body** (sometimes also referred to as **payload**)
  - a cryptographic **signature**.

Let's have a look at a more concrete example, a JWT looks like this:

```text
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJoZWxsbyI6ImZyb20gSldUIn0.XoByFQCJvii_iOTO4xlz23zXmb4yuzC3gqrWNt3EHrg
```

The three parts are separated by a `.` (dot) character:

![The three parts of a sample JSON Web Token](./jwt-parts-example.png)

  - header: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9`
  - body: `eyJoZWxsbyI6ImZyb20gSldUIn0`
  - signature: `XoByFQCJvii_iOTO4xlz23zXmb4yuzC3gqrWNt3EHrg`

Header and Body are JSON strings (yeah, that's why the are called *JSON* web tokens...). This is somewhat hidden, because those two strings are encoded using the [Base64Url](https://tools.ietf.org/html/rfc4648#section-5) algorithm (a URL-safe variation of the standard Base64 encoding algorithm).

If we decode them this is what we get:

  - header: `{ "alg": "HS256", "typ": "JWT" }`
  - body: `{ "hello": "from JWT" }`

Which now looks like proper JSON!

The signature part contains raw bytes which represent a cryptographic signature of header and body. The signature is also encoded using Base64Url and it can be used to verify the authenticity of a token.

If you try to decode the signature and visualize it a s UTF-8 string you will probably see some rubbish like this:

![An attempt to try to decode a JWT signature to a UTF-8 string](./jwt-signature-decoded-to-string.png)

Again, this is because the signature just contains raw bytes which do not represent a valid UTF-8 string. So yeah, there is no point in trying to decode and visualize a signature. 🤗


## When are JWTs useful

JWTs are mostly used as a mechanism for "stateless" claims exchange. We can define a claim as some piece of information that we want to certify and propagate through various systems. 

A good example is authentication and authorization, were our claims could be information about the user session (user id, roles, etc). Let's try to discuss this example with a (rather crappy) illustration:

![John authenticating against an Auth server and getting back a JWT](./jwt-auth-part-1-loige.png)

![John using his JWT to communicate with the pizza service](./jwt-auth-part-2-loige.png)

In this picture:

  1. John is authenticating against an auth server. The auth server recognizes his credentials and gives him back a token
  2. John can now use the token to connect to specific services, for instance the pizza service.

Every time John makes a request to a service, he will need to attach his token to the request. The service can look at the token to understand if the request can be authorized. The service can read the information embedded within the token to understand that the request is coming from John and can verify that the signature was applied by the Auth server.

This process is "stateless" because this validation can be done without having to make an explicit request to the Auth server. Of course every service needs to know the Auth server public key to be able to validate the token signature.

A stateless mechanism like this, is great for distributed systems or, in general, systems that deal with a high load of requests.

Authentication is not the only use case for JWT. For instance a JWT can also be used to generate confirmation links like "confirm your subscription to this newsletter" or to generate "password reset links".
 

## Now you can be nosy

Now that you know how a JWT token is made you can start to be nosy and look into the JWT tokens you bump into.

You can copy-paste tokens into [jwt.io](https://jwt.io) or use a command-line tool like [`jwtinfo`](https://github.com/lmammino/jwtinfo) to read the content of the header and the body in plain text.

Trust me, if you do that you will be surprised by how many interesting information you can find there!


## Closing notes

JWT tokens are an interesting approach to authentication and they are particularly convenient in distributed systems when we want to minimise the communication and the amount of load to the authentication provider. Once a token is created, it can be validated without the need to call the authentication provider again.

If you are curious to understand more about how JWT works (and even how you could crack tokens using Node.js 😼) check out this talk I gave a couple of years ago at [BuzzJS 2018](https://buzzjs.com/) in the beautiful New York City:

<div style="margin-top: 2em; position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 2em;">
<iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/uBYdxOQ57nQ" frameborder="0" allowfullscreen></iframe>
</div>

While you watch that, you can have [the slides](https://loige.link/jwt-crack-ny) too! 🤗

That's all for now.

Thank you and see you on the next post! 👋
