---
uuid: 1fbc7d18-2276-4fc5-b00d-074aef001eea
layout: post
title: JavaScript iterator patterns
slug: javascript-iterator-patterns
subtitle: null
date: 2019-01-20T22:18:58.000Z
updated: 2019-01-20T22:18:58.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./javascript-iterator-patterns-rubber-ducks.jpg
fb_img: ./javascript-iterator-patterns-fb.png
tw_img: ./javascript-iterator-patterns-tw.png
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - javascript
  - node-js
  - design-patterns
---

In this article we will explore different ways to create Iterators in Javascript.

JavaScript is a very flexible language and most often you can achieve the same goals
in many different ways, Iterators are no exception!

Wikipedia defines iterators as follows:

> In computer programming, an iterator is an object that enables a programmer
to traverse a container, particularly lists. Various types of iterators are
often provided via a container's interface.

We will extend this definition even further as we will not focus on building
iterators for pre-computed values like lists, but we will see how to iterate over
generative sequences like the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

Most likely you won't be using the Fibonacci sequence in your day to day programming
(unless you are interviewing for some company who wants to validate your knowledge
of recursion 😆), but the idea of generating sequence of values on demand
(lazy evaluation) translates to a lot of real life scenarios like: consuming a
paginated API, draining a queue, processing long files line by line, etc.


## The Fibonacci sequence

In case you have never seen the Fibonacci sequence before (or you don't remember
the exact definition), let's start by defining very quickly how the Fibonacci
sequence looks like:

```plain
1 1 2 3 5 8 13 21 ...
```

Essentially, a number in the sequence is given by the sum of the previous 2 numbers.

In formal mathematical terms, you can define the sequence as:

> F<sub>1</sub> = F<sub>2</sub> = 1  
> F<sub>n</sub> = F<sub>(n-1)</sub> + F<sub>(n-2)</sub>

Few things to notice:

 - The sequence is infinite (it would be impossible to store it in a list without an upper limit)
 - It is made by positive numbers

So, how do we write some JavaScript code that allows us to iterate over this sequence and
calculate an arbitrary number of elements?


## Functions

In JavaScript, functions are first class citizens and most patterns can be modeled
with the use of only plain functions. This will become natural once you master
the concepts of _function scope_, _anonymous functions_ and _nested functions_.

So, how can we build a fibonacci sequence by using only functions?

Here's an example:

```javascript
const genFib = (max = Number.MAX_SAFE_INTEGER) => {
  // initialize default values in the scope
  let n1 = 0
  let n2 = 0

  // returns an anonymous function that will return the next element
  // every time that it is called
  return () => {
    // calculates the next value
    const nextVal = n2 === 0 ? 1 : n1 + n2

    // redefines n1 and n2 to match new values
    const prevVal = n2
    n2 = nextVal
    n1 = prevVal

    // if we reached the upper bound return null (iteration completed)
    if (nextVal >= max) {
      return null
    }

    // return the new value
    return nextVal
  }
}
```

I added some comments to make the code easy to understand, but let's go through it
once more.

 1. `genFib` is a function that accepts an optional parameter, which is the upper bound
    used to define when to stop computing elements in the sequence. JavaScript numbers
    starts to lose precision after `Number.MAX_SAFE_INTEGER`, so this is a sensible default.
 2. The first thing that happens in the function is initializing the function scope.
    The only two values that we need to compute an element of the sequence are `n1` and `n2`
    which represent the last 2 numbers computed. We set them to `0` by default.
 3. At this point the function returns an anonymous function. This function can be
    invoked an arbitrary number of times and every time it will compute and return
    a new element in the sequence, making sure the internal state is updated accordingly.

Notice that `genFib` will initizalize a new isolated scope containing `n1` and `n2`.
These values will be accessible (and modifiable) only by the anonymous function returned
by `genFib`. This means that you can generate multiple "iterators" and everyone of them
will be independent from each other.

To understand this even better let's see an example on how a user would use this code:

```javascript
const f = genFib(6) // limit the sequence to numbers below 6
f() // 1
f() // 1
f() // 2
f() // 3
f() // 5
f() // null
f() // null
f() // null

// or with a loop

// prints all the numbers of the sequence below MAX_SAFE_INTEGER
const f2 = genFib()
let current
while ((current = f2()) !== null) {
  console.log(current)
}
```


## Iterators and the Iterator protocol

In the previous example we came up with our own way to define how to iterate through
the elements (returned anonymous function) and how to understand whether the sequence
was over (return of `null`).

**ECMAScript 2015** defines a standard and interoperable way to define objects
on which you can iterate over. This is called **The iterator protocol**.

In short, a JavaScript object is _an iterator_ when it implements a `next()`
method with the following semantics:

  - `next()` does not accept any argument.
  - `next()` has to return an object with 2 properties: `done` and `value`.
  - `done` is a boolean and it will be set to `true` only and only if there are no
    more elements in the iteration.
  - `value` will contain the actual value as computed in the last iteration.

ECMAScript 2015 also provides a new `for` construct (`for...of`) that allows to go over the
elements of an iterator:

```javascript
for (let current of someIterator) {
  console.log(current)
}
```

Iterators can also be used in combination with the **spread operator** to eagerly
load all the values in the iterator and store them into an array:

```javascript
const allValues = [...someIterator]
```

Ok, now let's rewrite our Fibonacci sequence to implement the iterator protocol:

```javascript
//...
```
