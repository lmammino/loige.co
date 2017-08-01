---
uuid:             f52438b9-7003-4837-98ea-b536e3a97d5c
layout:           post
title:            'Introducing Gulp cozy - Manage your gulp tasks in a cozier way'
slug:             introducing-gulp-cozy-manage-your-gulp-tasks-in-a-cozier-way
subtitle:         null
date:             '2016-01-18T23:27:40.000Z'
updated:          '2016-01-18T23:27:40.000Z'
author:           'Luciano Mammino'
author_slug:      luciano-mammino
header_img:       /content/images/2016/01/meerkat-459171_1920.jpg
status:           published
language:         en_US
meta_title:       null
meta_description: null
tags:
  - gulp
  - javascript
  - node-js
  - library

---

[Gulp-cozy](https://www.npmjs.com/package/gulp-cozy) is an experimental NPM package that allows you to organize your Gulp tasks in a more modular way with simplicity and *"cozyness"* in mind.

![I don't always modularize my gulp tasks, but when I do it must be cozy!](/content/images/2016/01/gulp-cozy-i-dont-always-loige-luciano-mammino.jpg)

## Rationale
Ever found yourself digging into a gigantic monstrous `Gulpfile` with hundreds
of functions and tasks scattered all around? If it happened to you I am sure you can tell that it's not a great feeling...

That's the reason why I created this small module as an attempt to help with keeping yourself cozier (and happier!) when working with Gulp.
In a way it tries to bring a bit of the *Node philosophy* (also known as "[The Node way](http://thenodeway.io/)") into your Gulpfile.

*Gulp-cozy* in fact offers a very easy way (read: *very-very-very-easy!*) to separate all your Gulp tasks into small modules organized inside a dedicated folder. Gulp-cozy will take care to load all the modules and to register them as Gulp tasks. With this approach you will end up with several small modules that serve one specific purpose (a task), which in turn result easier to maintain and to reason about.

## Installation and usage

Enough talking, let's jump to the practice! As most of the NPM packages to install `gulp-cozy` you just need to run the following command inside your project folder:

```bash
npm install --save-dev gulp-cozy
```

Of course I am assuming you have already installed `Gulp` globally and as local dev dependency for your project.

Once NPM finished downloading (it should be fast, the module is pretty small!) you can turn you `Gulpfile.js` into this:

```javascript
#Gulpfile.js

var gulp = require('gulp');
var cozy = require('gulp-cozy');
cozy(gulp);
```

YES! This will be the only content of your Gulpfile...
So you might ask *"where do all the tasks logic go?"*

The idea is to keep all the tasks inside a `gulp` folder in your main project folder (doesn't it make you think to the `node_modules` folder approach?!). Every task is a file which name will represent the name of the gulp task.

Don't worry too much for now, let's just create this new `gulp` folder and everything will be cleaner in a moment with a more practical example.

Let's assume we want to create a new task to build the css files for our new project. For this sake we can add the `build-css` task by creating the `build-css.js` file as follows:

```javascript
#gulp/build-css.js

var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');

module.exports = function(gulp) {
  return function() {
    return gulp.src([
      './node_modules/bootstrap/dist/css/bootstrap.css'
    ])
      .pipe(concat('all.css'))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(gulp.dest('./assets/'))
    ;
  }
}
```

Notice that the module exports a function that receives the current instance of Gulp as argument. This function is a factory for the real Gulp task logic so it should return a function which, will be executed when calling the `build-css` task with:

```bash
gulp build-css
```

You can also create a module to call a series tasks as in the following
example.

```javascript
#gulp/build.js

module.exports = ['clean', 'build-css', 'build-js', 'compress', 'upload'];
```

In this case, rather than using a factory function, the module needs to export just a plain array containing the names of the tasks to be invoked. You can launch this new task with:

```bash
gulp build
```

What do you think? Doesn't it make things more separated, organised and most importantly "cozy"?

## Long way to perfection

As I told in the very first line this approach has to be considered **experimental** for now and there are still many concerns that I have about it.

First of all the module tries to expose a very small surface and to do one simple thing. That's generally good and it sticks to the node philosophy. But at the same time it's probably not very flexible.

Would be great to have a way to define generic task templates, like for example processing CSS files (compile from sass, concatenate and minify) and than have a configurable way to use this template with different sets of files and producing different assets.

At the moment you could do this by creating a generic configurable module outside your `gulp` folder and than require it and use it inside one or more tasks in the new folder. This approach should work without big efforts but doesn't feel very right to me at the moment.

Probably the module should expose more functions to deal with more complex case, but it boils down to the eternal struggle between "keeping things simple" and "making the new jack-of-all-trades module"...


## Contributing

If you want to contribute to this project you can find the sources on [GitHub](https://github.com/lmammino/gulp-cozy) (of course!). If this project is interesting to you you are very welcome to contribute by submitting a pull request or simply by [opening an issue](https://github.com/lmammino/gulp-cozy/issues).

If you decide to go with the pull request, please take care to maintain the existing coding style and add unit tests for any new or changed functionality.
The project is currently using [XO](https://github.com/sindresorhus/xo) for styleguide and style checks run with the regular test suite.

## Conclusion

I am really curious to see if this topic and this library can be of any interest for other people. I'd like to know if you ever questioned yourself to find better solutions to organize your Gulp tasks and if you came out with some kind of personal solution. I would be very happy to see some comments down this article, maybe a nice discussion might born from this.

Before leaving you I have to thank my dearest friend [Andrea](https://www.linkedin.com/in/manganoandrea) for discussing these topics and give me the inspiration to spend some time on this subject.

Until next time! :)
