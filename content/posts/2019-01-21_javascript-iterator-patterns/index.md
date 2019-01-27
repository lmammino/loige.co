---
uuid: 1fbc7d18-2276-4fc5-b00d-074aef001eea
layout: post
title: JavaScript iterator patterns
slug: javascript-iterator-patterns
subtitle: null
date: 2019-01-21T03:25:58.000Z
updated: 2019-01-27T17:15:58.000Z
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

In this article we will explore different ways to create iterators and iterable
values in Javascript, specifically **functions**, **iterators**, **iterables**
and **generators**.

JavaScript is a very flexible language and most often you can achieve the same goals
in many different ways, iterators are no exception!

Wikipedia defines iterators as follows:

> In computer programming, an iterator is an object that enables a programmer
to traverse a container, particularly lists. Various types of iterators are
often provided via a container's interface.

We will extend this definition even further as we will not focus on building
iterators for pre-computed values like lists, but we will see how to iterate over
generative sequences like the [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_number).

Most likely you won't be using the Fibonacci sequence in your day to day programming
(unless you are interviewing for some company who wants to validate your knowledge
of recursion 😆), but the idea of generating a sequence of values on demand
(lazy evaluation) translates well to a lot of real-life scenarios like:

 - traversing custom data structures
 - consuming paginated APIs
 - draining a queue
 - processing long files line by line
 - read all the records from a SQL table
 - etc.


## The Fibonacci sequence

In case you have never seen the Fibonacci sequence before (or you don't remember
the exact definition), here is how it looks like:

```plain
1 1 2 3 5 8 13 21 ...
```

Essentially, a number in the sequence is given by the sum of the previous 2 numbers.

In more formal mathematical terms, you can define the sequence as:

> F<sub>1</sub> = F<sub>2</sub> = 1  
> F<sub>n</sub> = F<sub>(n-1)</sub> + F<sub>(n-2)</sub>

Few things to notice:

 - The sequence is infinite (it would be impossible to store it in a list without an upper limit).
 - It is made by positive integers.

So, how do we write some JavaScript code that allows us to iterate over this sequence and
calculate an arbitrary number of elements?

Well, there are many ways...


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
    `n1` and `n2` are the only two values that we need to compute an element of
    the sequence. They represent the last 2 numbers computed. We set them to `0` by default.
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


## The Iterator protocol

In the previous example we came up with our own way to define how to iterate through
the elements (returned anonymous function) and how to understand whether the sequence
was over (return of `null`).

**ECMAScript 2015** provides a standard and interoperable way to define iterator
objects. This is called **the Iterator protocol**.

In short, a JavaScript object is _an iterator_ if it implements a `next()`
method with the following semantic:

  - `next()` does not accept any argument.
  - `next()` has to return an object with 2 properties: `done` and `value`.
  - `done` is a boolean and it will be set to `true` if and only if there are no
    more elements in the sequence.
  - `value` will contain the actual value as computed in the last iteration
    (could be `undefined` when `done` is `true`).

Ok, now let's rewrite our Fibonacci sequence to implement the Iterator protocol:

```javascript
const genFibIterator = (max = Number.MAX_SAFE_INTEGER) => {
  let n1 = 0
  let n2 = 0

  // this time we return an iterator object (rather than a function)
  return {
    // the logic needed to compute the next element is inside the `next` method
    next: () => {
      // calculates the next value
      let nextVal = n2 === 0 ? 1 : n1 + n2

      // redefines n1 and n2 to match new values
      const prevVal = n2
      n2 = nextVal
      n1 = prevVal

      // if we reached the upper bound (iteration completed)
      // set done to true and nextVal to undefined
      let done = false
      if (nextVal >= max) {
        nextVal = undefined
        done = true
      }

      // return the iteration object as for the iteration protocol
      return { value: nextVal, done }
    }
  }
}
```

The comments in the code should help you to understand the new logic.

Let's see how to use our new Fibonacci iterator implementation:

```javascript
const it = genFibIterator(6) // { next: [Function: next] }
it.next() // { value: 1, done: false }
it.next() // { value: 1, done: false }
it.next() // { value: 2, done: false }
it.next() // { value: 3, done: false }
it.next() // { value: 5, done: false }
it.next() // { done: true }

// or

const it2 = genFibIterator(6)
let result = it2.next()
while (!result.done) {
  console.log(result.value)
  result = it2.next()
}
// 1
// 1
// 2
// 3
// 5
```


## The Iterable protocol

In the previous section we saw how to define **Iterator objects** that conform
the Iterator protocol. In reality, we might want to express the concept of
"iterability" in a more generic fashion, so that, given any object, we can tell if
such object is iterable or not.

For this reason, ECMAScript 2015 defines also the **Iterable protocol**.

An object is said to be _iterable_ if it exposes a property called `Symbol.iterable`,
which is a function that returns an _iterator_ object.

You can introspectively check if an object is _iterable_ with some code like this:

```javascript
function isIterable(obj) {
  return Boolean(obj) && typeof obj[Symbol.iterator] === 'function'
}
```

ECMAScript 2015 also provides a new `for` construct (`for...of`) that allows to
easily iterate over the elements of an iterable object:

```javascript
for (let current of someIterable) {
  console.log(current)
}
```

Iterable objects can also be used in combination with the **spread operator** to
eagerly load all the values and store them into an array:

```javascript
const allValues = [...someIterable]
```

Ok, now let's rewrite our Fibonacci sequence to implement the Iterable protocol:

```javascript
const genFibIterable = (max = Number.MAX_SAFE_INTEGER) => {
  let n1 = 0
  let n2 = 0

  // returns an iterable object
  return {
    [Symbol.iterator] () {
      // returns an iterator
      return {
        next() {
          let nextVal = n2 === 0 ? 1 : n1 + n2

          const prevVal = n2
          n2 = nextVal
          n1 = prevVal

          let done = false
          if (nextVal >= max) {
            nextVal = undefined
            done = true
          }

          return { value: nextVal, done }
        }
      }
    }
  }
}
```

What we did here is to just move the implementation of the iterator seen in the
previous section into the `Symbol.iterator` function.

Note that it is possible to come up with an implementation that can satisfy the Iterator and the Iterable protocols
at the same time :

```javascript
const genFib = (max = Number.MAX_SAFE_INTEGER) => {
  let n1 = 0
  let n2 = 0

  return {
    // this satisfies the Iterator protocol
    next: () => {
      let nextVal = n2 === 0 ? 1 : n1 + n2

      const prevVal = n2
      n2 = nextVal
      n1 = prevVal

      let done = false
      if (nextVal >= max) {
        nextVal = undefined
        done = true
      }

      return { value: nextVal, done }
    },

    // this satisfies the Iterable protocol
    [Symbol.iterator] () {
      // returns `this` because the object itself is an iterator
      return this
    }
  }
}
```

The comments in the code should help you to understand the logic in these 2
implementations.

With this new approaches you can generate numbers from the Fibonacci sequence as
follows:

```javascript
// prints all the numbers in the sequence until MAX_SAFE_INTEGER
const f = genFibIterable()
for (let n of f) {
  console.log(n)
}

// creates an array with all the Fibonacci numbers lower than 17
const f2 = genFibIterable(17)
const lowerThan17 = [...f2] // [ 1, 1, 2, 3, 5, 8, 13 ]
```

If at this point you are still struggling to see the logical difference between
an _iterator_ and an _iterable_ object you can see it this way:

 - An _iterable_ is an object on which you can iterate over.
 - An _iterator_ is a cursor object that allows you to iterate over an _iterable_.


## Generators

Another great addition coming from ECMAScript 2015 to JavaScript are **Generators**.
More specifically, ECMAScript 2015 defines **Generator functions** and **Generator objects**.

> A `function*` declaration (function keyword followed by an asterisk) defines
  a _Generator function_, which returns a _Generator object_.

Generators are functions which can be exited and later re-entered.
Their context (variable bindings) will be saved across re-entrances.

To simplify this concept a bit, you can see generator functions as functions that
can "return" (or "_yield_") multiple times.

Let's explore the generator syntax with a simple example:

```javascript
// generator function
function* countTo3() {
  yield 1
  yield 2
  return 3
}
```

In this example we are defining a `counter` that generates numbers from 1 to 3.
We can use it as follows:

```javascript
// c is a generator object
const c = countTo3()
c.next() // { value: 1, done: false }
c.next() // { value: 2, done: false }
c.next() // { value: 3, done: true }
c.next() // { done: true }
c.next() // { done: true }
// ...
```

So, the way a generator works is the following:

 - When you invoke a _generator function_, a _generator object_ is returned.
 - Generator objects have a `next()` method.
 - When you invoke the `next()` method of a _generator object_ the code of the
   generator will be executed until the first `yield` (or `return`) is encountered.
 - If a `yield` was found, the code is stopped and the yielded value will be passed
   to the invoking context though an object with the following shape: `{ value: <yieldedValue>, done: false }`.
 - The next time `next()` is invoked, the execution will be resumed from the point
   where it was initially suspended until a new `yield` or `return` is found.
 - If a `return` statement is found (or the function completes), the object
   returned will look like: `{ value: <returnedValue>, done: true }`
   (notice the `done` now set to `true`).
 - Once the generator has completed, consecutive calls to `next()` will always produce `{ done: true }`.

Of course, the reason why we are exploring this topic is because we can implement
our Fibonacci sequence as a generator:

```javascript
function* Fib (max = Number.MAX_SAFE_INTEGER) {
  // initialize the state variables
  let n1 = 0
  let n2 = 0
  // we can now pre-initialize nextVal to 1 as part of the state
  let nextVal = 1

  // loop until we exceed the max number
  while (nextVal <= max) {
    // yields the current value
    yield nextVal

    // shifts nextVal -> n2 and n2 -> n1
    const prevVal = n2
    n2 = nextVal
    n1 = prevVal

    // calculates the next value
    nextVal = n1 + n2
  }
}
```

The comments in the code should help you with understanding this implementation.

You can immediately notice that since we don't have to deal with a _nested function_,
the implementation seems easier to read, or at least it might feel easier to read
the code and understand the actual execution flow.

For this reason, you might prefer to use generators over plain functions in this
kind of scenarios.

We can use our new generator-based Fibonacci sequence as in this example:

```javascript
const fib = Fib(6)
fib.next() // { value: 1, done: false }
fib.next() // { value: 1, done: false }
fib.next() // { value: 2, done: false }
fib.next() // { value: 3, done: false }
fib.next() // { value: 5, done: false }
fib.next() // { done: true }

// or

const fib2 = Fib(6)
let result = fib2.next()
while (!result.done) {
  console.log(result.value)
  result = fib2.next()
}
// 1
// 1
// 2
// 3
// 5
```

At this point you might be wandering:

> Is a generator object an iterator or an iterable?

Well, it turns out that **a generator object is both an iterator and iterable**!

So you can also use our latest implementation with the `for...of` and the _spread_
syntax:

```javascript
const fib = Fib(6)
for (let current of fib) {
  console.log(current)
}
// 1
// 1
// 2
// 3
// 5

// or
const fib2 = Fib(6)
[...fib2] // [ 1 1 2 3 5 ]
```

Finally, since generators are _iterators_, you can use them as `Symbol.iterator`
property of an _iterable object_. This could help you to define the iteration logic
in a more elegant and concise way, taking advantage of the `yield` keyword.

To some extent, you can see generators as a syntactic sugar to define iterable objects.


## Conclusion

In this article we learned about different ways to generate dynamic sequences using
plain functions, iterators, iterables and generators.

Notice that these approaches are ideal when the operation needed to generate the
next element is synchronous (it doesn't require external resources to be
loaded asynchronously).

When you have to iterate over values that become available asynchronously you
have to rely on different patterns such as
[**event emitters**](https://nodejs.org/api/events.html),
[**streams**](https://nodejs.org/api/stream.html), or
[**async iterators**](https://github.com/tc39/proposal-async-iteration).

Also, notice that generators have some interesting advanced features not covered
in this article, like the opportunity to pass new values in the context every
time `.next()` is called or to throw exceptions, so make sure you checkout
[the generators documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator).

If you liked this article and you are interested in similar content, be sure
to checkout my book **[Node.js Design Patterns](https://www.nodejsdesignpatterns.com)**.

[![Node.js Design Patterns Second Edition by Mario Casciaro and Luciano Mammino](./node-js-design-patterns.jpg)](https://www.nodejsdesignpatterns.com)

This book contains more than 500 pages, filled with more than 100 examples on
Node.js (and JavaScript) design patterns. I am sure you won't be disappointed!

Have fun! :)
