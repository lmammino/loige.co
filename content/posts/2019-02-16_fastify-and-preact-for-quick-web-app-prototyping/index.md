---
uuid: cf41cb77-385c-4d40-942e-53cb94857e8a
layout: post
title: Fastify and Preact for quick web app prototyping
slug: fastify-and-preact-for-quick-web-app-prototyping
subtitle: null
date: 2019-02-16T03:25:58.000Z
updated: 2019-02-16T17:15:58.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./fastify-and-preact-for-quick-web-app-prototyping.jpg
fb_img: ./fastify-and-preact-for-quick-web-app-prototyping-fb.png
tw_img: ./fastify-and-preact-for-quick-web-app-prototyping-tw.png
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - javascript
  - node-js
  - fastify
  - react
  - docker
---

In this article I will show my setup to build and share web apps prototypes using two technologies that I love: **Fastify** and **Preact**. I will also use **htm**, a library that can be easily integrated with Preact to be able to define DOM elements in a very expressive and react-like way (like _JSX_), without having to use _transpilers_ like Babel. Finally we will see how to _dockerize_ a sample app built with this setup. This will make the app easily to share with co-workers and friends.

I came up with this stack, few weeks ago when I had to build a very simple prototype web applications to test some product assumptions with some co-workers.

- Describe Fastify and Preact
- Describe setup
- Describe dockerization
- What if you need persistence
- Use LevelDB
- Build a sampe TODO app

## TLDR;

If you know already Fastify and Preact, and you don't care about how to setup this stuff on your own and you want a quick way to get started with a stack based on Fastify & Preact... well you just have to run the following commands:

```bash
git clone https://github.com/lmammino/fastify-preact-htm-boilerplate.git my-new-project
cd my-new-project
rm -rf .git
npm install
```

Now enjoy editing the sample code in src:

- `src/ui`: is for your frontend (Preact + htm)
- `src/server`: is for your backend (Fastify)

## Commands

```bash
npm init -y
npm i --save fastify@next fastify-static@next fastify-cli
```
