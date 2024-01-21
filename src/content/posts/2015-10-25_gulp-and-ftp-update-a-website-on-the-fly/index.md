---
title: 'Gulp and FTP: update a website "on the fly"'
slug: gulp-and-ftp-update-a-website-on-the-fly
subtitle: Automate FTP deployments with Gulp for quick website updates
date: 2015-10-25T18:47:00.000Z
updated: 2016-12-13T21:24:35.000Z
header_img: ./gulp-and-ftp-update-a-website-on-the-fly-1.png
status: published
tags:
  - gulp
  - javascript
  - ftp
  - server
description: This tutorial explains how to use Gulp and vinyl-ftp to watch local
  files for changes and automatically upload updates to a website via FTP.
  Useful for quickly editing legacy sites only accessible through FTP.
---

In this post I will explain you how to use [Gulp](http://gulpjs.com/) to interact with the files on your server through FTP. You will learn how to watch the files you are editing on your local machine and automatically synchronize them with your server as they change and how to setup a task to launch an FTP deploy on demand.

## Premise

Few days ago I was assigned to take care of updating few sections on **a legacy website which development environment is currently accessible only through FTP**. So no local virtualized development environment, no Git, no automated deploy, only old-school "FTP live edit and test"!

I would have used an FTP desktop app to create a virtual drive to allow me to edit files easily and open the full project in Sublime, but I couldn't find any good one for the last version of OS X (El Capitan), so I decided to work out a simple solution by myself using Gulp.

If you ever had a similar situation or if you just want to have a simple and fast command line solution to edit a website you can access to only through FTP, keep reading, this post is for you!

**NOTE**: I just want to stress on the fact that this solution must not be considered a best practice for development and deploy, but only a useful trick in case you have to deal with a very basic setup, especially if you are not in control of the development and deployment environments.

## Installing Gulp

In case you don't know it, Gulp is a very popular build system written in Node.js. It uses streams, so it's quite efficient in dealing with data transformations and in managing streams of data from different sources.

![Gulp is a very popular stream-based build system written in Node.js](./gulp-is-the-streaming-web-build-system.png)

To be able to run the script we are going to write you need to have Node.js and Gulp installed in your machine. If you don't have Gulp already you can easily install it with NPM:

```bash
npm install -g gulp
```

## Preparing the project

You will need to have a copy of the full project on your local machine, so if you don't have it already you need to login to your server and download a copy of the source files. You can use any FTP software to do so, but if you are on a Mac there's a quick trick that allows you to avoid to install any additional software: you can simply open finder and press `⌘` + `k` to start the **connect to server** window and specify the FTP url of your project with the following syntax: `ftp://username:password@host:port/path`. This will allow you to see and copy all the files from your project and, in case you are wondering, this is a read-only access!

Once you copied all the files you have to initialize NPM on the copied project with:

```bash
npm init
```

Follow the on screen instructions and provide all the missing informations.

Then you need to install Gulp also as a local dependency:

```bash
npm install --save-dev gulp
```

Also we are going to use a couple of external libraries, so let's install them as well:

```bash
npm install --save-dev gulp-util vinyl-ftp
```

[gulp-util](https://www.npmjs.com/package/gulp-util) is a module that offers a series of utilities functions for gulp (we will mainly use the log related functions) and [vinyl-ftp](https://www.npmjs.com/package/vinyl-ftp) is an FTP library that allows you to access FTP files and folders as streams and it's a perfect match for Gulp.

Ok, now the last step before moving to some code is to initialize a new gulp project. To do so just run:

```bash
gulp init
```

It will create a new `gulpfile.js` file, let's finally jump to some code.

## The gulpfile

We are going to implement two different Gulp commands: `ftp-deploy` and `ftp-deploy-watch`. The first one allows us to deploy all the local changes to the server, the second one instead activates a live watch that constantly monitors our files and uploads immediately any change to the files, very useful when you want to live-code against a development server.

To enable these two commands you need to copy paste the following code inside your `gulpfile.js` file.

```javascript
'use strict'

var gulp = require('gulp')
var gutil = require('gulp-util')
var ftp = require('vinyl-ftp')

/** Configuration **/
var user = process.env.FTP_USER
var password = process.env.FTP_PWD
var host = 'your hostname or ip address'
var port = 21
var localFilesGlob = ['./**/*']
var remoteFolder = '/myApp'

// helper function to build an FTP connection based on our configuration
function getFtpConnection() {
  return ftp.create({
    host: host,
    port: port,
    user: user,
    password: password,
    parallel: 5,
    log: gutil.log,
  })
}

/**
 * Deploy task.
 * Copies the new files to the server
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy`
 */
gulp.task('ftp-deploy', function() {
  var conn = getFtpConnection()

  return gulp
    .src(localFilesGlob, { base: '.', buffer: false })
    .pipe(conn.newer(remoteFolder)) // only upload newer files
    .pipe(conn.dest(remoteFolder))
})

/**
 * Watch deploy task.
 * Watches the local copy for changes and copies the new files to the server whenever an update is detected
 *
 * Usage: `FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch`
 */
gulp.task('ftp-deploy-watch', function() {
  var conn = getFtpConnection()

  gulp.watch(localFilesGlob).on('change', function(event) {
    console.log(
      'Changes detected! Uploading file "' + event.path + '", ' + event.type
    )

    return gulp
      .src([event.path], { base: '.', buffer: false })
      .pipe(conn.newer(remoteFolder)) // only upload newer files
      .pipe(conn.dest(remoteFolder))
  })
})
```

The Gulp script is very simple and pretty self-descriptive, but let's try to have a look at it in greater detail.

After importing our modules, we have a series of configuration variables. The ones you have to set are `host`, `port`, `localFilesGlob` and `remoteFolder`.

- `host` is the hostname or the IP address of your FTP server (e.g. `myserver.com` or `123.124.125.126`)
- `port` is the port where your FTP server is listening (generally it's the default: `21`)
- `localFilesGlob` is an array containing one or more [glob](https://www.npmjs.com/package/glob) expressions. These expressions are used to determine which files from your local copy should be watched and deployed into the server. The default option is very "open", it will copy all the files in your project folder. Most of the time it's better to be more specific so, be sure to build your own custom array of glob to avoid copying unnecessary or sensible data.
- `remoteFolder` is the folder in your remote server that contains the whole project (where the new files will be copied).

As you probably noticed we also have the `username` and `password` variables mapped to an environment variable. Is generally a good idea to not write passwords in configuration files, especially if you are going to publish this file somewhere. With this approach we can also share the same gulpfile with other people in the team and allow everyone to use their personal credentials.

After the configuration variables block we have the `getFtpConnection` function. This function is used as an helper to build an FTP connection using the previously specified options. You can also add some [additional options](https://www.npmjs.com/package/vinyl-ftp#ftp-create-config), for instance `parallel` allows you to define the maximum number of files to upload in parallel.

At the end we have our two real Gulp commands: `ftp-deploy` and `ftp-deploy-watch`.

They simply defines a stream starting from the glob expressions and pipe it to the destination server through the FTP connection. The only difference between the two commands is that in the `ftp-deploy` we read all the files from the glob expressions and send them through the connection, in the second case we watch the files and send only the one that changes while command is running.

It's also worth noticing that we are piping the files through the function `conn.newer`. This function ensures that only the files that are different from the server gets overwritten.

## Running the commands

To run the commands you must first specify the `FTP_USER` and `FTP_PWD` environment variables. For example you can do it this way:

```bash
FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy
```

or

```bash
FTP_USER=someuser FTP_PWD=somepwd gulp ftp-deploy-watch
```

Or if you prefer you can export the variables in your `.bashrc` or `.bash_profile` files (in this case I suggest you to rename the variables into something more specific to avoid collisions).

## Conclusions

This approach allowed me to solve the problem easily and quickly having a mechanism that is quite fast to use and easy to maintain.

I am also more and more impressed about how easy is to have simple but effective solutions up and running with Node.js and the tools in its ecosystem. I am also impressed by the versatility of Gulp and how its stream-based approach makes things very concise and uniform.

I hope this article was useful and interesting for you.
I'd really love to receive **your opinions in the comments box** about it and, in case you are a veteran Gulp user, I'm curious to know **what was the most interesting command you have ever written using Gulp**.

Until next time!

Regards
