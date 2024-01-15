---
title: 8 invitations to try Keybase.io
slug: 8-invitations-to-try-keybase-io
subtitle: Keybase.io makes encryption and authentication easy by linking crypto
  keys to social media profiles
date: 2015-05-26T22:25:45.000Z
updated: 2015-05-27T11:22:09.000Z
header_img: ./8-invitations-to-try-keybase-io.jpg
status: published
tags:
  - security
  - cryptography
description: Keybase.io is a new service that combines asymmetric cryptography
  with a social network. It allows users to easily share public keys and
  authenticate messages by linking keys to profiles on Twitter, GitHub, Reddit,
  etc. The service provides encrypted messaging and bitcoin wallet pairing to
  make adopting cryptography seamless.
---

Hello dear developers,
today I finally got my invitation to access the private beta of [Keybase.io](https://keybase.io)! 😎 🎉
For those who are not aware of this new service, Keybase.io is a website and a command line application that makes easier to adopt asymmetric cryptography to encrypt and authenticate messages. But it's not just this, it's also a _"directory of people"_, as they like to say. It's like a social network, where everyone can easily share its public key and attach it to its social profiles (like Twitter, Github or Reddit). You can also pair your bitcoin address with it...

![Keybase.io illustration](./keybase-io-robot.jpg)
...and furthermore the website is full of wonderful illustrations a-la-Dropbox :D

## A quick demo

Just to give you a practical idea of how it works, let's suppose I want to send a super-secret message to my twitter friend Daniel Li ([@d4nyll](https://twitter.com/d4nyll)).
Once I have the Keybase command line app installed (and configured) I can just run:

```bash
$ keybase encrypt twitter://d4nyll -m "Hey pal, I finally crafted the perfect plan to rule this World. Give me a ring"
```

and it will print out a weird message that only Daniel, with his private key will be able to decrypt:

```none
-----BEGIN PGP MESSAGE--