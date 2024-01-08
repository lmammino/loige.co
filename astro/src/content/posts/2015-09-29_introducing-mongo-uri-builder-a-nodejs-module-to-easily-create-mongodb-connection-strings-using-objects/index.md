---
title: Introducing mongo-uri-builder, a Node.js module to easily create mongodb
  connection strings using objects
slug: introducing-mongo-uri-builder-a-nodejs-module-to-easily-create-mongodb-connection-strings-using-objects
subtitle: null
date: 2015-09-29T23:07:02.000Z
updated: 2015-09-29T23:07:02.000Z
header_img: ./mongo-uri-builder-article-sample-image.jpg
status: published
tags:
  - node-js
  - library
  - mongodb
  - github
---

A couple of days ago I had the need to store the MongoDB connection string for a Node.js application I am currently building.
Of course it was not a big deal and at first I stored it in a file.
Anyway at some point I realised that I would needed to override parts of this string to change some settings in _production_ (e.g. adding replicas and authentication settings).
For this sake it would have been nice to have a way to store this configuration as a "well organised" object and then override just the properties I wanted to change.

I often use the [config](https://www.npmjs.com/package/config) module to store my configuration and so I wanted to be able to do something like this in my configuration file:

```json
{
  "mongo": {
    "host": "localhost",
    "port": 27017,
    "database": "mydb",
    "username": "loige",
    "password": "whyDoYouWantToKnowMyPassword"
  }
}
```

And then to be able to retrieve this data and use it with a new `MongoClient` instance:

```javascript
var MongoClient = require('mongodb').MongoClient
var config = require('config')

var mongoConfig = config.get('mongo')
MongoClient.connect(
  createConnectionString(mongoConfig),
  function(err, db) {
    //...
  }
)
```

The missing bit here was the function `createConnectionString`. How to do that?
I made a quick search on NPM and I wasn't able to find something ready to be used... So, given that it was a quite easy task and that I enjoy to create new packages, I decided to build it by myself: welcome **[mongo-uri-builder](https://www.npmjs.com/package/mongo-uri-builder)**! **It's alive!**

![Frankestain it's alive feeling when creating a new NPM library](./mongodb-connection-string-builder-its-alive-frankestain.gif)

(Yes, this was sort of the feeling I had after launching `npm publish`, call me crazy...)

## The mongo-uri-builder package

`mongo-uri-builder` is a Node.js package to easily create mongodb connection strings using configuration objects.

The configuration object that the module expects looks like this:

```javascript
var mongoConnectionConfig = {
  username: 'user', // the username
  password: 'pass', // the password
  host: 'host1', // the main host (default: "localhost")
  port: 1111, // the main port
  replicas: [
    // an array of replica databases
    // every replica must define an host, the port is optional
    { host: 'host2', port: 2222 },
    { host: 'host3', port: 3333 },
  ],
  database: 'db', // the name of the database
  options: {
    // an arbitrary object of connection options
    w: 0,
    readPreference: 'secondary',
  },
}
```

All the properties are optional and you can even use an empty object. The classic `mongodb://localhost` will be generated as default in this case.

As we are used with NPM, installing the module is as easy as running:

```bash
npm install --save mongo-uri-builder
```

Then to use it you can do something like this:

```javascript
var mongoUriBuilder = require('mongo-uri-builder')

var connectionString = mongoUriBuilder({
  username: 'user',
  password: 'pass',
  host: 'host1',
  port: 1111,
  replicas: [{ host: 'host2', port: 2222 }, { host: 'host3', port: 3333 }],
  database: 'db',
  options: {
    w: 0,
    readPreference: 'secondary',
  },
})

console.log(connectionString)

// outputs "mongodb://user:pass@host1:1111,host2:2222,host3:3333/db?w=0&readPreference=secondary"
```

How easy and "well-readable" it is now? :)

## Contributing & Issues

As I often do I put the code of the module on GitHub, you can find the repository at [lmammino/mongo-uri-builder](https://github.com/lmammino/mongo-uri-builder).
Everyone is more than welcome to contribute to the project. You can contribute just by submitting bugs and pull requests or suggesting improvements by [opening an issue](https://github.com/lmammino/mongo-uri-builder/issues).

## Wrap up

This module is really something naive but it is a nice thing to have for me, especially in conjunction with `config`, that allows me to have different configuration files for every environment (e.g. `development` and `production`) and to override properties from a `default` configuration file.
This way I can just override the parts of the connection string that are effectively different from the default configuration. I can even [use environment variables](https://github.com/lorenwest/node-config/wiki/Environment-Variables) if I don't want for example to store the username and password of my database as clear text in a file.

I really look forward to knowing what you think about it and if you found it useful. Of course I also hope that you will be willing to give it a spin in your next Node.js project.

Ah, yeah, if you liked it don't forget to share the love and "star" it on [Github](https://github.com/lmammino/mongo-uri-builder) and [Npm](https://www.npmjs.com/package/mongo-uri-builder)! ;)

Cheers!
