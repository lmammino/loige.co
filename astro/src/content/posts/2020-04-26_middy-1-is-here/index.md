---
title: Middy 1.0.0 is here
slug: middy-1-is-here
subtitle: null
date: 2020-04-26T15:25:00.000Z
updated: 2020-04-26T15:25:00.000Z
header_img: ./loige-co-middy-1-is-here.jpg
status: published
tags:
  - serverless
  - node-js
  - javascript
---

Middy, the Node.js middleware framework for AWS Lambda, has finally graduated to 1.0.0! A long awaited milestone for the project.

In this post we will discuss what middy is and what are the main features of this first stable release.


## What is middy

If you are hearing about [middy](https://middy.js.org) for the first time, middy is a **middleware framework** for **AWS Lambda** written in **Node.js**.

Middy has the goal to simplify the way you write Lambda code, essentially by providing a convenient middleware abstraction (similar to the ones you find in frameworks such as Express or Fastify). A middleware framework can simplify code re-use, testing and avoid code duplication. Middy also provides a collection of middlewares that can be installed and configured to fullfil very common use cases (authentication, authorization, caching, data validation, deserialization and serialization, etc.).

Just to give you a feeling of what using middy looks like, here's a snippet of code:

```javascript
// import core
const middy = require('@middy/core')

// import some middlewares
const jsonBodyParser = require('@middy/http-json-body-parser')
const httpErrorHandler = require('@middy/http-error-handler')
const validator = require('@middy/validator')

// This is your common handler, in no way different than what 
// you are used to doing every day in AWS Lambda
const processPayment = async (event, context) => {
  // we don't need to deserialize the body ourself as 
  // a middleware will be used to do that
  const {
    creditCardNumber,
    expiryMonth,
    expiryYear,
    cvc,
    nameOnCard,
    amount
  } = event.body

  // do stuff with this data ...
  // e.g. send it to a payment gateway and record the transaction

  return { result: 'success', message: 'payment processed correctly'}
}

// Notice that in the handler you only added base business logic (no deserilization,
// validation or error handler), we will add the rest with middlewares
const inputSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        creditCardNumber: {
          type: 'string',
          minLength: 12,
          maxLength: 19,
          pattern: '\d+'
        },
        expiryMonth: {
          type: 'integer',
          minimum: 1,
          maximum: 12
        },
        expiryYear: {
          type: 'integer',
          minimum: 2020,
          maximum: 2027
        },
        cvc: {
          type: 'string',
          minLength: 3,
          maxLength: 4,
          pattern: '\d+'
        },
        nameOnCard: { type: 'string' },
        amount: { type: 'number' }
      },
      // Insert here all required event properties
      required: ['creditCardNumber']
    }
  }
}

// Let's "middyfy" our handler, then we will be able to attach middlewares to it
const handler = middy(processPayment)
  .use(jsonBodyParser()) // parses the request body when it's a JSON and converts it to an object
  .use(validator({inputSchema})) // validates the input
  .use(httpErrorHandler()) // handles common http errors and returns proper responses

module.exports = { handler }
```

From the example above, you can see that middy helps you to keep the handler code (the core of your lambda function) as clean as possible. Your handler is now free from having to handle all sorts of pre and post conditions such as data serialization and validation. Managing these pre and post-conditions can be done with the help of default of custom middlewares and those middlewares can easily be reused across different lambdas as needed.

This is nothing new if you come from frameworks such as Express or Fastify, but surprisingly, this is yet not so common in *Lambda-land* and middy is the first (and one of the very few) frameworks that offers you this capability in this context.

The best feature of middy is that, since it focuses only on the code layer, you can use it with any other infrastructure-level tool you commonly use, including **Terraform**, **Cloudformation**, **SAM** and the **Serverless Framework**. The integration is seamless, just install and use the library in your code (as you do with any other external dependency from npm).

Middy is not so new (in open source terms). It has been around for almost 3 years receiving contributions from more 50 different people, it has almost 1500 [GitHub stars](https://github.com/middyjs/middy/stargazers) (please give it some more if you are reading this 😇) and [5 digits downloads per week](https://www.npmjs.com/package/@middy/core). Not impressive numbers, but, in my humble opinion, these are numbers good enough to demostrate that there is interest and maturity around the project.

If you want to find out more about middy from a technical perspective, check out the official website at [middy.org.js](https://middy.js.org/).


## What's in the 1.0.0

The main change in version 1.0.0 is that now the core and the official middlewares are distributed in separated NPM packages. This allows you to install only the packages you actually need, which helps with keeping your lambdas slim and allow them to bootstrap fast.

Other interesting changes are new official middlewares, bug fixes and a number of improvements in terms of features, stability and usability.

You can read the full list of changes in the [release page on GitHub](https://github.com/middyjs/middy/releases/tag/1.0.0).

If you are already using middy version 0.x, you can read the [dedicated migration guide](https://github.com/middyjs/middy/blob/1.0.0/UPGRADE.md#upgrade-0x