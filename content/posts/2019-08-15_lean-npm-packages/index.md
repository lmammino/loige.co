---
uuid: a4e1d457-7479-401d-bb13-b6ec84cbe34a
layout: post
title: Lean NPM packages
slug: lean-npm-packages
subtitle: null
date: 2019-08-15T20:22:58.000Z
updated: 2019-08-15T20:22:58.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./lean-npm-packages.jpg
fb_img: ./lean-npm-packages-fb.png
tw_img: ./lean-npm-packages-tw.png
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - javascript
  - node-js
  - npm
---

Every developer in this planet knows how modular Node.js and the JavaScript ecosystem in general have become in the last few years.
This is possibly due to the great job that package management systems and registries like [bower](https://bower.io/) (discontinued) and [npm](https://npm.com) carried over. In general, this is also due to the "many small modules" philosophy that has been popularized within the ecosystem.

This is great, but all that glitters is not gold... Look, for instance, at this picture for a second:

![node_modules heaviest objects in the universe](./node_modules_heaviest_objects_in_the_universe.jpg)

Yeah you have probably seen this picture already and it's probably not funny anymore... well, in any case, that's a good summary right there on how this "many small modules" idea got a little bit out of hand within the JavaScript ecosystem.

Some people like to make fun of this issue or they just complain about it. In this article, I don't want to do any of those things. I'd rather prefer to be a little bit more constructive and try to share some simple techniques to keep your NPM modules as lean as possible, so that other developers will save bandwidth and time when pulling your modules!


## Git vs NPM

In some languages like Go or PHP, what you have in a module git repository is exactly what you get through the package manager when trying to install the module. This is because the code you download through the package manager is actually coming straight from git (or a proxy). In this cases the structure of your repository is fundamentally tied to the file structure of your module.

NPM doesn't work this way. In fact, NPM allows you to selectively push files into the registry, so you might end up with a very different file structure compared to what you have in your git repository.

While this interesting property of the system have caused some security issues in the past (see the [event-stream module incident](https://snyk.io/blog/a-post-mortem-of-the-malicious-event-stream-backdoor/) if you are curious), it also offers us an opportunity to be very selective with what we publish and keep the module lean.

This is especially important if you are using Typescript or Babel, so that your "final" version of your module code is actually the result of a compilation/transpilation process. In such cases, you don't need to publish the entire codebase on NPM as your users will be using only the production version of your code.

The same goes for tests, documentation, images and other files that won't be used by the users of your module in their codebase.

In the rest of this article we will see some ways to configure an NPM package so that all the unnecessary files will be excluded from the registry.

...

many tricks to keep npm packages small

.npmignore vs `files`

remove images and docs and build caches

remove tests

npm pack for testing

have an example of library


## Conclusion

We are not going to solve the `node_modules` drama, but at least we can do our part to make it a little bit more bearable.
