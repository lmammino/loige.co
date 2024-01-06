---
title: >-
  Emerging JavaScript pattern: multiple return values
slug: emerging-javascript-pattern-multiple-return-values
subtitle: null
date: 2018-11-11T17:00:00.000Z
updated: 2018-11-11T17:00:00.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./emerging-javascript-pattern-multiple-return-values.jpg
fb_img: ./emerging-javascript-pattern-multiple-return-values-fb.png
tw_img: ./emerging-javascript-pattern-multiple-return-values-tw.png
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - javascript
  - node-js
  - design-patterns
  - react
  - lua
  - go
---

In this article, I want to explore an interesting pattern that I am seeing more and more in JavaScript code which allows you to return multiple values from a function.

You probably know already that JavaScript does not support multiple return values natively, so this article will actually explore some ways to "simulate" this behavior.

One of the most famous usages of this pattern I have seen recently is within [React Hooks](https://reactjs.org/docs/hooks-overview.html), but before delving into that, let's see what I mean with "multiple return values" by exploring this concept in other languages.

## Multiple return values in other languages

Two languages that come to my mind which natively support multiple return values are Lua and Go. Let's implement a simple _integer division_ function that returns both the _quotient_ and the _remainder_.

### Lua

Let's start with a simple implementation in Lua. It's definitely worth mentioning that [Lua's official documentation](https://www.lua.org/pil/5.1.html) defines multiple return values as _"An unconventional, but quite convenient feature"_:

```lua
function intDiv (dividend, divisor)
  local quotient = math.floor(dividend / divisor)
  local remainder = dividend % divisor
  return quotient, remainder
end

print(intDiv(10,3)) -- 3	1
```

### Go

Here's some equivalent code in Go:

```go
package main

import "fmt"

func intDiv(dividend, divisor int) (int, int) {
  quotient := dividend / divisor
  remainder := dividend % divisor
  return quotient, remainder
}

func main() {
  fmt.Println(intDiv(10,3)) // 3 1
}
```

As you can see in these 2 code snippets, functions can return more than 1 value and this can be very convenient in cases where you logically have produce multiple outputs in a computation.

**Note**: a more realistic implementation in Go, would take into account errors (e.g. division by 0) and add an extra return value to propagate potential errors. We shouldn't worry too much about this for the sake of this article, but it is definitely worth mentioning that multiple return values in Go shine when it comes to error propagation and error handling. We will touch a bit more on this later in this article to see how this idea can be applied to JavaScript as well, especially in the context of Async/Await.

## Simulating multiple return values in JavaScript

So, as we said early on, JavaScript does not natively support a syntax to return more than one value from a function. We can workaround this limitation by using _composite values_ like arrays or objects.

### Multiple return values with arrays

Let's implement our `intDiv` in JavaScript by using arrays as return types:

```javascript
intDiv = (dividend, divisor) => {
  const quotient = Math.floor(dividend / divisor)
  const remainder = dividend % divisor
  return [quotient, remainder]
}

console.log(intDiv(10, 3)) // [ 3, 1 ]
```

Here we are just printing the result of a division, but let's assume we want to handle the two return values individually, how do we _reference_ those?

Well, the return value is an array so we can simply access the two elements in the array using the indices `0` and `1`:

```javascript
const result = intDiv(10, 3)
const quotient = result[0]
const remainder = result[1]
console.log(`Quotient = ${quotient}`) // Quotient = 3
console.log(`Remainder = ${remainder}`) // Remainder = 1
```

This syntax is arguably verbose and definitely not very elegant. Thankfully, [ES2015 array destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) can help us here:

```javascript
const [quotient, remainder] = intDiv(10, 3)
console.log(`Quotient = ${quotient}`) // Quotient = 3
console.log(`Remainder = ${remainder}`) // Remainder = 1
```

This is much nicer to read and we also trimmed away 2 out 3 lines of code, big win!

As nice as it is, this implementation has an important shortcoming: return values are positional, so you need to be careful and respect the order while destructuring.

### Multiple return values with objects

An alternative implementation could use objects as return value, let's see how:

```javascript
intDiv = (dividend, divisor) => {
  const quotient = Math.floor(dividend / divisor)
  const remainder = dividend % divisor
  return { quotient, remainder }
}
```

Note that here we are using another syntactic sugar from ES2015 (Enhanced object literal syntax) that allows us to define objects very concisely. Prior to ES2015, we would have defined the return statement as `{quotient: quotient, remainder: remainder}`.

With this approach we will be able to use our `intDiv` function as follows:

```javascript
const result = intDiv(10, 3)
const quotient = result.quotient
const remainder = result.remainder
console.log(`Quotient = ${quotient}`) // Quotient = 3
console.log(`Remainder = ${remainder}`) // Remainder = 1
```

Again, this is a bit too verbose and ES2015 has another fantastic syntactic sugar to make this nicer:

```javascript
const { quotient, remainder } = intDiv(10, 3)
console.log(`Quotient = ${quotient}`) // Quotient = 3
console.log(`Remainder = ${remainder}`) // Remainder = 1
```

This syntactic sugar is called [Object Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring). With this approach we are now independent from the position of return values (we can swap the position of `quotient` and `remainder` without side effects). This syntax also lets you rename the destructured variables, which can very useful to avoid name collisions with other local variables, or just to make variable names shorter or more descriptive as we please. Let's see how this works:

```javascript
const { remainder: r, quotient: q } = intDiv(10, 3)
console.log(`Quotient = ${q}`) // Quotient = 3
console.log(`Remainder = ${r}`) // Remainder = 1
```

Here we are not dependent by values position, but by their names in the returned object. If you are designing an API with multiple return values, it's up to you to figure out which trade off will be the best to guarantee a proper developer experience.

Ok, now you should have a good idea on how to simulate multiple return values in JavaScript. In the next section we will see some more realistic examples that take advantage of this pattern.

## Some more realistic use cases

As mentioned early on, this technique has been recently popularized by React hooks, so we are gonna explore this use case first. Later we will see other two cases related to Async/Await.

### React Hooks

React hooks are a [new feature proposal](https://reactjs.org/docs/hooks-overview.html) available from _React v16.7.0-alpha_ that lets you use state and other React features without having to write a class.

The first and most famous React hook present is called **State Hook**.

Let's see how it works with an example, let's build a CSS color viewer component.

Here's how our component is going to look like:

![CssColorViewer React component demo](./css-color-viewer-demo.gif)

And here's the code used to implement this:

```javascript
import { useState } from 'react'

function CssColorViewer() {
  const [cssColor, setCssColor] = useState('Blue')
  //                          <-- multiple return values

  const onCssColorChange = e => {
    setCssColor(e.target.value)
  }

  return (
    <div>
      <input value={cssColor} onChange={onCssColorChange} />
      <div
        style={{
          width: 100,
          height: 100,
          background: cssColor,
        }}
      />
    </div>
  )
}
```

You can see this component in action and play with the code on [CodeSandbox](https://codesandbox.io/s/9lzyov54lr).

For the sake of this article, we are going to focus only on the `useState` call, but if you are curious to understand better how the hook itself works internally I really recommend you read the [official State Hook documentation](https://reactjs.org/docs/hooks-state.html). I was personally curious to understand how multiple `useState` calls could maintain the relationship with the specific state attribute (since there's no explicit labelling or reference). If you are curious about that too, well you should read the [Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#how-does-react-associate-hook-calls-with-components) and [Dan Abramov's recent article about Hooks](https://medium.com/@dan_abramov/making-sense-of-react-hooks-fdbde8803889).

Back to the `useState` call in our example, now!

The `useState` hook acts like a factory: given a default value for the state property (`'Blue'` in our case), it will need to instantiate for you 2 things:

- the current value for the specific state property (`cssColor` in our case)
- a function that allows you to alter the specific property (`setCssColor` in our case)

React developers decided to handle this requirement by simulating multiple return values with an array.

Combining this with array destructuring and proper variable naming, the result is an API that is very nice to read and to use.

This React feature is still very experimental and subject to change at the time of writing, but it already sounds like a big deal for the React community to make the code more expressive and reduce the barrier to entry to start adopting React.

The point I want to make is that, in this specific case, the multiple return values pattern plays a big role towards this goal.

### Converting callbacks API to Async/Await

Recently I found another great use case for the multiple return values pattern while trying to convert a callback oriented API into an equivalent Async/Await API.

To make this part clear, I am going to explain very quickly an approach I use to convert callback based APIs into functions that I can use with Async/Await.

Let's take this generic example:

```javascript
function doSomething(input, callback) {
  // ... do something asynchronously and
  //     compute response or error
  // When finished, invoke the callback:
  callback(error, response)
}
```

To convert this function into something that can be used with Async/Await we have to essentially [_promisify_](https://loige.co/to-promise-or-to-callback-that-is-the-question/) it. There are libraries to do it and, if you are using Node.js you can even use the builtin [`util.promisify`](https://nodejs.org/api/util.html#util_util_promisify_original), but that's something we can do ourselves by just creating a _wrapper_ function like the following one:

```javascript
const doSomethingPromise = (input) => new Promise((resolve, reject) => {
  doSomething(input, (error response) => {
    if (error) {
      return reject(error)
    }

    return resolve(response)
  })
})
```

In short, our wrapper function `doSomethingPromise` is immediately returning a `Promise`. Inside the body of the promise we are invoking the original `doSomething` function with a callback that will be resolving or rejecting the promise based on whether there's an `error` or not.

Now we can finally take advantage of Async/Await:

```javascript
// inside an async function
const response = await doSomethingPromise(input)
```

**Note**: this will throw in case of error, so make sure you have it in a `try/catch` block to handle the error correctly.

> If you are curious about _promisifying_ callback-based functions, I have [an entire article](https://loige.co/to-promise-or-to-callback-that-is-the-question/) dedicated to this topic.

In my specific use case, I was using a [twitter client](https://www.npmjs.com/package/twitter) library that follows this conventions:

```javascript
// client is an instance of the twitter client
client.get('statuses/user_timeline', params, function callback(
  error,
  tweets,
  response
) {
  if (!error) {
    console.log(tweets)
  }
})
```

The important detail here is that the `callback` function is a bit unconventional because it receives 3 parameters: a possible `error`, a list of `tweets` and a `response` (which represents the raw HTTP response object). Conventional callback-style APIs will send only two parameters to the callback function: a potential error and some sort of result object.

The question here is: how to _promisify_ this unconventional API?

Multiple return values to the rescue!

```javascript
const getUserTimeline = (client, params) =>
  new Promise((resolve, reject) => {
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      if (error) {
        return reject(error)
      }

      return resolve([tweets, response]) // multiple return values
    })
  })
```

We can use this function with Async/Await as follows:

```javascript
// inside an async function

// ... set `client` and `params`
const [tweets, response] = await getUserTimeline(client, params)
```

**Note**: don't forget to have a `try/catch` to handle errors!

To recap, we can use the multiple return values pattern also with promises to allow them to be resolved to multiple values. This technique gives us a very nice interface especially when used in combination with Async/Await.

### Async/Await with alternative error handling

Another closely related pattern I am seeing more and more in JavaScript is error propagation and handling _à la Go_.

In Go, when a function can generate an error, this error is not thrown but simply returned by the function. If the function has to return some output and can also generate errors, then the function will have multiple return values (output and error).

The caller code, should ideally verify if the returned error value is an actual error before proceeding, as in the following Go code example:

```go
file, err := os.Open("file.go")
if err != nil {
	log.Fatal(err)
}

// ... do something with `file`
```

Some JavaScript libraries are starting to promote the same conventions as in Go to report errors, especially when it comes to Async/Await.

You can find some examples by just [searching `"error = await"` on GitHub](https://github.com/search?l=JavaScript&q=%22error+%3D+await%22&type=Code).

Let's rewrite our `getUserTimeline` function from our previous example to follow this approach:

```javascript
const getUserTimeline = (client, params) =>
  new Promise((resolve, reject) => {
    client.get('statuses/user_timeline', params, (error, tweets, response) => {
      return resolve([error, tweets, response]) // multiple return values
    })
  })
```

Notice that we are never telling the promise to _reject_, so when we will be using this function with Async/Await we cannot use try/catch to handle errors. This is what we should do instead:

```javascript
// inside an async function

// ... set `client` and `params`
const [error, tweets, response] = await getUserTimeline(client, params)

if (error) {
  // handle error here
}

// ... do stuff with `tweets` and `response`
```

I am not sure if I would recommend this pattern or not in JavaScript land. I have a bit of mixed feelings about it. On one side I quite like it, because as happens in Go, it forces you to handle every single error individually, which makes you think a bit more carefully about the best way to handle the specifics of the error. On the other hand, this pattern it still feels a bit forced into JavaScript and people that never saw this pattern in other languages might find it annoying or even hard to understand. Moreover, if you don't capture and handle an error this will not automatically escalate (as it happens with `throw` or rejected promises), so the error will totally be swallowed by the runtime, leading to potential inconsistencies in your app state.
I'll let you draw your own conclusions on this one! 😇

## Array destructuring tricks

At this point, I would like to show you few _"little tricks"_ that you can use with array destructuring that might come in handy when dealing with multiple return values.

### Skipping elements

Let's say, for instance, that you have a function `doStuff` that returns multiple values using an array and the values are in the array are an `error`, a `rawResponse` and `result`. Let's say only for the sake of this example that you are not interested in using the `rawResponse`, you could easily skip that element while destructuring with the following syntax:

```javascript
const [error, , result] = doStuff()
```

Notice the double comma there. That basically means that we are leaving an array index unassigned. You can bend this technique as you please, for example you might decide to destructure only the `result`:

```javascript
const [, , result] = doStuff()
```

Well, you shouldn't really skip errors though...

### Aggregate remaining return values

Another interesting trick is that you can use the special `...` syntax to accumulate the _remaining return values_ under a single variable. Let's make a dummy example to explore this idea.

Let's say we have a function called `listDogs` which is implemented as follows:

```javascript
function listDogs() {
  return [3, 'Bella', 'Lucy', 'Daisy']
}
```

The first element of the array is the number of dogs, while every other elements are actual dog names.

Since the number of returned elements here is variable it might be tricky to use destructuring directly. In these cases we can use this special syntax:

```javascript
const [numDogs, ...dogNames] = listDogs()
console.log(numDogs) // 3
console.log(dogNames) // [ 'Bella', 'Lucy', 'Daisy' ]
```

The `...` syntax basically allows you to destructure any remaining element of the array into another array. Of course you can only have a `...` element in the left hand side of the destructuring expression and this has to be the last element in the list.

My example here is very dummy, but this pattern really shines in some real life use cases, for example when you want to [unpack values from a regular expression match](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Unpacking_values_from_a_regular_expression_match).

## Performance implications

When React hooks were presented the community was super excited about this new feature, but some performance experts in the Google chromium team ([@bmeurer](https://twitter.com/bmeurer), [@\_developit](https://twitter.com/_developit) and [@rossmcilroy](https://twitter.com/rossmcilroy)) raised their eyebrows and wanted to dig deeper to see if this new approach could lead to serious performance issues in the web.

What came out from their research is an amazing paper that goes by the title ["Array destructuring for multi-value returns (in light of React hooks)"](https://docs.google.com/document/d/1hWb-lQW4NSG9yRpyyiAA_9Ktytd5lypLnVLhPX9vamE/edit).

I really encourage you to read it to get all the details, but here's my attempt at giving you some sort of TLDR;

- In React components the `render()` method is called often, so the code there should be optimized enough not to slow things down. That's where you use React hooks.
- Array destructuring is a very generic API, it doesn't work only with arrays but with every type of _iterable_ object, so the VM has a lot work to do to figure out how to traverse and destructure the specific object.
- Object destructuring might be a more performant alternative, but it would probably offer a less pleasant developer experience.
- If you use Babel in loose mode, array destructuring will be highly simplified (to direct element access) and it will result in highly optimized code.
- There's work going on to see if the different phases of the optimizing compiler in the Google's V8 engine might be able to optimize destructuring even if you are not using Babel.

## Recap

In this article we discussed this new emerging JavaScript pattern that is getting more and more traction, mostly because of its adoption within React.

Use cases are not limited to React though and I hope you will find this useful in your daily development life also outside the React land.

I am really curious to see what you will come up with, so please keep me in the loop using [twitter](https://twitter.com/loige) or the comments in this article.

For the very curious ones I want to give you one last link, so that you can compare [how multiple return values are implemented in many many other languages](https://rosettacode.org/wiki/Return_multiple_values).

Until next time!
