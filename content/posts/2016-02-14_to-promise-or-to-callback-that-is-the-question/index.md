---
uuid: 9f4d82ed-4a42-4563-9884-fd85634947c7
layout: post
title: To promise or to callback? That is the question...
slug: to-promise-or-to-callback-that-is-the-question
subtitle: null
date: 2016-02-14T13:32:00.000Z
updated: 2017-03-03T21:08:07.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./to-promise-or-to-callback-this-is-the-problem-loige-amlet-arnold-schwarzenegger-javascript.jpg
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - javascript
  - node-js
---

You are building the next cool [JavaScript](/tag/javascript) or [Node.js](/tag/node-js) module with a lot of asynchronous functions and you are very happy about it. At some point a terrible doubt assaults you:

> Should my API offer support for callbacks or should it be promise based?

In this article we are going to show a very simple way to add support for both promises and callbacks in our asynchronous modules, this way we can make everyone happy and our libraries much more flexible.

## The problem

Promises can be used as a nice replacement for callbacks, that's a well know fact in the JavaScript world today. Promises turn out to be very useful in making our code more readable and easy to reason about.
But while promises bring many advantages, they also require the developer to understand many non-trivial concepts in order to use them correctly and proficiently. For this and other reasons, in some cases it might be more practical to prefer callbacks over promises.

Now let’s imagine for a moment that we want to build a public library that performs asynchronous operations. What do we do? Do we create a *callback oriented* API or a *promise oriented* one? Do we need to be opinionated on one side or another or there are ways to support both and make everyone happy?

There are at least 2 approaches to face this question, let's see how they work!


##1. The "I don't fu**in' care" approach

![I don't care gif animation Judy Garland](http://i.giphy.com/on45FojvYvnsQ.gif)

The first approach, used for instance by libraries like [request](https://www.npmjs.com/package/request), [redis](https://www.npmjs.com/package/redis) and [mysql](https://www.npmjs.com/package/mysql) as well as all the node native async functions, consists in offering a simple API based only on callbacks and leave the developer the option to *promisify* the exposed functions if needed.
Some of these libraries are a bit more elaborated and they provide helpers to be able to *promisify* all the asynchronous functions they offer at once, but the developer still needs to someway “convert” the exposed API to be able to use promises.
That's why I believe this approach feels a bit rude like:

> Do you want to use Promise? I don't care, it's your problem... just promisify what you want and leave me alone!

There are a number of modules out there that can help to promisify a callback based function. The first two that come in my mind are [Bluebird](http://bluebirdjs.com/) with its [`Promise.promisify()`](http://bluebirdjs.com/docs/api/promise.promisify.html) method and [es6-promisify](https://www.npmjs.com/package/es6-promisify) which adopts ES2015 promises.

Let's see a quick example of this approach with **es6-promisify**. In the following snippet of code we are going to promisify the native `fs.readFile()` function:

```javascript
"use strict";

const fs = require('fs');
const promisify = require('es6-promisify');

let readFile = promisify(fs.readFile);

readFile('last_action_hero.txt', 'utf-8')
  .then((content) => console.log(content))
  .catch((err) => console.error(err))
;
```

The example is very straightforward, we just have to call `promisify(fs.readFile)` to obtain a promisified version of the `readFile` function. As we might expect we can invoke this function without passing the `callback` argument and we get a `Promise` object as output, so we can immediately use it and call the handy `then` and `catch` methods.

Unfortunately the new `Promise` implementation of ES2015 does not offer a built-in *promisify* mechanism (yet...).


## 2. The "No strong feelings" way

![I have no strong feeling either way futurama gif animation](http://i.giphy.com/7U7oEJkAiP5Xq.gif)

This approach is more transparent and I would say more... "polite"!
It is also based on the concept of offering a simple callback oriented API, but **it makes the callback argument optional**.
Whenever the callback is passed as an argument the function will behave normally executing the callback on completion or on failure. Instead **when the callback is not passed to the function, it will immediately return a Promise object**.

This approach effectively combines callbacks and promises in a way that allows the developer to choose at call time what interface to adopt, without any need to promisify the function in advance. Many libraries like [mongoose](https://www.npmjs.com/package/mongoose) and [sequelize](https://www.npmjs.com/package/sequelize) are supporting this approach.

Let’s see a simple implementation of this approach with an example. Let’s assume we want to implement a dummy module that executes divisions asynchronously:

```javascript
module.exports = function asyncDivision (dividend, divisor, cb) {  
  return new Promise((resolve, reject) => {      // [1]

    process.nextTick(() => {
      if (
        typeof dividend !== 'number' ||
        typeof divisor !== 'number' ||
        divisor === 0
      ){
        let error = new Error('Invalid operands');
        if (cb) { return cb(error); }                  // [2]
        return reject(error);
      }

      var result = dividend/divisor;
      if (cb) { return cb(null, result); }             // [3]
      return resolve(result);
    });

  });
};
```

The code of the module is very simple, but there are some details (marked with a number in square brackets) that are worth to be underlined:

  1. First, we return a new promise created using the ES2015 `Promise` constructor. We define the whole logic inside the function passed as argument to the constructor.
  2. In case of error, we reject the promise, but if the callback was passed at call time we also execute the callback to propagate the error.
  3. After we calculate the result we resolve the promise, but again, if there’s a callback, we propagate the result to the callback as well.

Now to complete the example, let’s see now how we can use this module with both callbacks and promises:

```javascript
// callback oriented usage
asyncDivision(10, 2, (error, result) => {
  if (error) {
    return console.error(error);
  }
  console.log(result);
});

// promise oriented usage
asyncDivision(22, 11)
  .then(result => console.log(result))
  .catch(error => console.error(error))
;
```

It should be clear that with very little effort, the developers who are going to use our new module will be able to easily choose the style that best suits their needs without having to introduce an external “promisification” function whenever they want to leverage promises.


### A little caveat and an alternative implementation

As [Amar Zavery](https://disqus.com/by/amar_zavery) pointed out in a [comment here](//loige.co/to-promise-or-to-callback-that-is-the-question/#comment-3184972856), this approach is not perfect.

If we use the function with the callback approach, we still have created and returned a promise that behaves in an inconsistent way (never *resolved*, nor *rejected*).  Let's make this clear with an example:

```javascript
asyncDivision(2,0, console.log)
  .then(() => console.log(`Promise resolved`))
  .catch(() => console.error(`Promise rejected`))
;
```

In this example, we are passing a callback (`console.log`) to our function but also using the returned promise to print some extra information.
With our implementation of `asyncDivision` either the `then` block and the `catch` block are never executed because the function is interrupted as soon as the callback is used.

This is most of the time negligible because is very unlikely that somebody will be using the function with this mixed async approach (we could even argue that doing so would be a bad practice).

Anyway, we can get rid of this issue by re-implementing our async function as follows:

```javascript
module.exports = function asyncDivision (dividend, divisor, cb) {
  // internal implementation, callback based
  function _asyncDivision (dividend, divisor, cb) {
    process.nextTick(() => {
      if (
        typeof dividend !== 'number' ||
        typeof divisor !== 'number' ||
        divisor === 0
      ){
        return cb(new Error('Invalid operands'));
      }

      return cb(null, dividend/divisor);
    });
  }

  if (cb) {
    return _asyncDivision(dividend, divisor, cb);
  }

  // optional promisification, only if no callback
  return new Promise((resolve, reject) =>
    _asyncDivision(dividend, divisor,
      (err, result) => err ? reject(err) : resolve(result)
    )
  );
}
```

This code generates a promise only if no callback is used. So if we provide a callback as the last argument, and then we try to use `catch` or `then` on the returning value, we will get an explicit runtime error:

  - `TypeError: Cannot read property 'then' of undefined` or
  - `TypeError: Cannot read property 'catch' of undefined`

While this approach is probably more correct, it is also more verbose and, if it becomes a recurrent practice in your development process, you are better off using some promisification library.


## Conclusion

As usual I hope this article has been useful and that it will ignite some interesting conversation.

I think from the tone of the article it's quite clear that I prefer to opt for the "polite" approach, but I am very curious to know what are your opinions about this topic and if you are an "I don't care" or a "whatever" person when you create your asynchronous functions in your modules.

Let me know your thoughts in the comments.

Until next time! :)
