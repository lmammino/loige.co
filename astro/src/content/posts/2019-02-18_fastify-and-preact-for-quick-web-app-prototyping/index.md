---
title: Fastify and Preact for quick web app prototyping
slug: fastify-and-preact-for-quick-web-app-prototyping
subtitle: Fastify and Preact enable quick web app prototyping and easy sharing
  with Docker
date: 2019-02-18T20:22:58.000Z
updated: 2019-02-18T20:22:58.000Z
header_img: ./fastify-and-preact-for-quick-web-app-prototyping.jpg
status: published
tags:
  - javascript
  - node-js
  - fastify
  - react
  - docker
description: This article shows how to quickly build web app prototypes using
  Fastify for the backend API and Preact for the frontend UI. It also covers how
  to dockerize the app for easy sharing. Key points are the plugin architecture
  of Fastify, the lightweight nature of Preact, and the use of htm for defining
  UI without transpilation.
---

In this article I will show my setup to build and share web apps prototypes using **Fastify** and **Preact**, two technologies that I love.

I will also use **htm**, a library that can be easily integrated with Preact to define DOM elements in a very expressive and react-like way (like _JSX_), without having to use _transpilers_ like Babel. Finally we will see how to _dockerize_ a sample app built with this setup. This will make the app easy to share with co-workers and friends.

I came up with this stack, few weeks ago when I had to build a very simple prototype web application to test some product assumptions with some co-workers.

My experiment was quite successful. I was able to build my prototype quickly and it was super easy for my colleagues to play with it and give me feedback, even if they didn't have Node.js and NPM installed on their machines.

For these reasons, I think this approach is probably worth sharing and I look forward to receiving your feedback in case you decide to give this tech stack a try.

## TLDR;

If you know already **Fastify** and **Preact** and you are just looking for a quick way to get started with a stack based on these 2 technologies... well you just have to run the following commands:

```bash
git clone https://github.com/lmammino/fastify-preact-htm-boilerplate.git my-new-project
cd my-new-project
rm -rf .git
npm install
```

Of course, you can replace `my-new-project` with the actual name of your project.

Now enjoy editing the sample code in src:

- `src/ui`: is for your frontend (Preact + htm)
- `src/server`: is for your backend (Fastify)

Then run your project with:

```bash
npm start
```

And finally test it on `localhost:3000`.

Oh, yeah... most importantly, don't forget to [give me a ⭐️ on GitHub](https://github.com/lmammino/fastify-preact-htm-boilerplate) (pleazeee 😇)!

## Fastify

If you never heard about **Fastify**, it is a fast and low overhead web framework for Node.js.

Fastify was initially created by [Tomas Della Vedova](https://github.com/delvedor) and [Matteo Collina](https://github.com/mcollina). Today, it counts a core team of 10 developers, more than 130 contributors and almost 10.000 stars on GitHub.

Fastify takes inspiration from Node.js frameworks that have been around for a while like **Express** or **Hapi**, but puts particular focus on performance, developer experience and composability. One of my favorite features is in fact the composable plugin system.

The [official Fastify documentation](https://www.fastify.io/docs/) is a great place to start from, if you want to find out more about this wonderful framework.

_Full disclosure_: I am a member of the core team and I mostly contribute with building and maintaining the Fastify website and its documentation.

## Preact

If you never heard about **Preact**, it is a UI library for the web, initially created as a lighter and faster drop-in alternative to React by [Jason Miller](https://github.com/developit).

The project has been quite successful. It is now maintained by a [team of contributors](https://github.com/developit/preact/graphs/contributors) and has gained more than 20.000 GitHub stars.

One of the reasons why I like Preact, is that it has a pluggable view definition layer. Normally you would use it with **JSX** in combination with **Babel** for transpilation, but if you don't want to setup Babel and have a build process, you can use Preact in combination with [**htm**](https://github.com/developit/htm), which uses template literals and doesn't require any transpilation on modern browsers.

We are going to use htm in this article, so hold your horses... you'll see some examples soon!

## Project overview

So, you decided to follow along and build this stack from scratch, very well!

Our goal will be to build a simple web app that displays the server time at startup.

Just to give you a more concrete idea, this is more or less how it is going to look when completed:

![Sample server time web application](./sample-server-time-app.png)

This is a Single Page Application (SPA) where Preact and htm are used to build the fronted App, while Fastify is used to build the _server time API_.

By the way, the meticoulus reader might have noticed that amazing favicon there. Stop squinting, here's a zoomed-in version, just for your personal enjoyment!

![Cheeta grimage](./cheeta-grimace.jpg)

## Backend setup

Ok, let's start by creating a new folder:

```bash
mkdir server-time
cd server-time
```

Now we can initialize it as an NPM project and get Fastify installed.

```bash
npm init -y
npm i --save fastify@next fastify-static@next fastify-cli
```

Notice that I am using `@next` for some dependencies to get Fastify v2, currently in release candidate stage, but that should become the main stable version very soon!

> **Note**: you can also create a new Fastify project using the Fastify CLI:
>
> ```bash
> npx fastify-cli generate server-time
> ```
>
> At the time of writing this will generate a new project for Fastify 1.x, but it will be updated soon, once v2 will be released as stable.

Let's analyze the installed packages one by one:

- `fastify` is the core component of the framework
- `fastify-static` is an optional plugin that allows you to easily serve static files from a Fastify server
- `fastify-cli` is a command line integration that allows you to start your Fastify apps.

At this point we are ready to create our Fastify API, let's place the server code in `src/server/server.js`:

```javascript
const path = require('path')

module.exports = async function (fastify, opts) {
  // serves static assets from the `src/ui` folder
  fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '..', 'ui'),
  })

  // Add your API endpoints here
  fastify.get('/api/time', async (request, reply) => {
    return { time: new Date().toISOString() }
  })
}
```

The code above should be quite self explanatory, but there are some interesting details to cover, especially if you are not familiar with Fastify.

The first thing you might notice is the usage of the `async` keyword. Fastify supports both the _async/await style_ and a more traditional _callback-based style_, so you can pick your favorite flavor.

Another interesting detail is that we are defining a server as an exported module. This module (a _plugin_ in Fastify lingo) is essentially a function that receives a Fastify instance (`fastify`) and a set of options (`opts`) as arguments. Inside the module definition we can use the `fastify` instance to register plugins, as we are doing here with the `fastify-static`, or add HTTP endpoints using methods such as `fastify.get` or `fastify.post`.

This module approach, while a bit unconventional, has its perks. First of all, it allows you to compose different servers together. Imagine you have created a server to manage a blog and one to manage a forum, you could easily embed them in an existing app and mount them over paths like `/blog` and `/forum`.

Moreover, this approach keeps your apps and sub-apps abstract from the actual server bootstrapping (socket binding and listening), which is left either to a root level app or to the `fastify-cli`.

Let's see how to do that with the fastify Command Line Interface:

```bash
node_modules/.bin/fastify start --log-level info src/server/server.js
```

For simplicity we can add this command to our `package.json` scripts:

```json
{
  "scripts": {
    "start": "fastify start --log-level info src/server/server.js"
  }
}
```

Before launching the server, we have to make sure our UI assets folder exists (fastify-static would crash otherwise), so let's create it:

```bash
mkdir src/ui
```

Now we can run our app with `npm start` and point our browser to [localhost:3000/api/time](http://localhost:3000/api/time).

You should now see a response like this:

```json
{ "time": "2019-02-17T19:32:03.354Z" }
```

At this point you are probably noticing another amazing feature of Fastify: JSON serialization is handled out of the box if a route returns an object.

Hooray, our server API is now implemented. 🥳

Let's move on and let's start to work on the frontend!

## Frontend setup

All our frontend code will live in `src/ui` and it will be made of 5 files:

- `app.js`: the code for our Preact app
- `bootstrap.min.css`: the CSS code for styling our app (directly from the Bootstrap framework)
- `favicon.ico`: our delicious favicon, because you are not building a serious app if you don't have a serious favicon!
- `index.html`: main HTML code for our SPA
- `preacthtm.js`: the code for Preact + htm.

First of all let's download the files for Bootstrap, Preact and our favicon:

```bash
curl "https://unpkg.com/htm@2.0.0/preact/standalone.js" > src/ui/preacthtm.js
curl "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" > src/ui/bootstrap.min.css
curl "https://github.com/lmammino/fastify-preact-htm-boilerplate/blob/master/src/ui/favicon.ico?raw=true" > src/ui/favicon.ico
```

Now it's time to create our `src/ui/index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="/bootstrap.min.css" />

    <title>My awesome server time</title>
  </head>
  <body>
    <div id="app"></div>

    <!-- JavaScript -->
    <script src="/preacthtm.js"></script>
    <script src="/app.js"></script>
  </body>
</html>
```

This is a pretty standard HTML 5 page where we are loading all our resources (CSS and JS) and creating an empty `div` (`id="app"`) where we will mount our frontend application at runtime.

Let's now look at the code needed for our app in `src/ui/app.js`:

```javascript
/* global htmPreact */
const { html, Component, render } = htmPreact

class App extends Component {
  componentDidMount() {
    this.setState({ loading: true, time: null })
    fetch('/api/time')
      .then((response) => response.json())
      .then((data) => this.setState({ loading: false, time: data.time }))
  }
  render(props, state) {
    return html`
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col">
            <h1>Hello from your new App</h1>
            <div>
              ${state.loading && html` <p>😴 Loading time from server...</p> `} ${state.time &&
              html` <p>⏱ Time from server: <i>${state.time}</i></p> `}
            </div>
            <hr />
            <div>
              👩‍💻 Have fun changing the code from this boilerplate:
              <ul>
                <li>UI code available at <code>/src/ui</code></li>
                <li>Server-side code available at <code>/src/server</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `
  }
}

render(html` <${App} /> `, document.getElementById('app'))
```

In our frontend app we have only one stateful component called `App`.

The state for this component is defined by 2 variables:

- `loading`: a boolean flag used to indicate whether an API request to fetch the current server time is in progress
- `time`: a string that contains the last fetched time

If you have familiarity with React, the component should be pretty straightforward to understand.

By using Preact and htm, we can create a component by writing a class that extends from the built in `Component` class.

In this class we can define the component behavior using lifecycle hooks like `componentDidMount` and the look and feel using the `render` method.

In our case, once the component is attached to the the page (`componentDidMount` hook), we set the state as `loading` and we issue a request to our time API, using `fetch`.

Once the request is completed, we set the `time` and reset the `loading` state to false.

The `render` function is automatically invoked every time the component state or its props change. In this method we define the DOM for the component using htm.

htm allows us to define the DOM nodes using tagged template literals with the special tag `html`. Within our template literal, we can have dynamic expressions, like the ones we use to check the state and decide what to render in case of loading or not.

One last detail, aside from defining the behavior and the look and feel of our App component we have to create an instance and render it in our HTML page.

We do that by using the `render` function from the global `htmPreact` object.

That's it.

Relaunch your server and visit [localhost:3000](http://localhost:3000) to see the app in action!

Feel free to play around, change and break things, until you are happy enough with the outcome and feel ready to share your creation with the world (or maybe with just some friends).

## Dockerize all the things

In my opinion, the best way to share your new little project is to use Docker.

With Docker, whoever is trying to run your app doesn't have to worry about having the right versions of Node.js and NPM and to run the right sequence of commands to install dependencies and run the server.

In order to "dockerize" our app we have to create a very simple `Dockerfile` in the root folder of our project:

```docker
FROM node:11-alpine

WORKDIR /app
COPY . /app
RUN npm install --production

EXPOSE 3000

CMD ["npm", "start"]
```

With this setup we are essentially doing the following:

- Creating an image starting from the the latest version of Node.js 11, linux alpine.
- Everything from our current folder is copied inside `/app` inside the container.
- At this point we run `npm install` to make sure that all the dependencies are downloaded and installed. The `--production` flag will make so that only production dependencies are installed, speeding up the image creation in case you have many dev dependencies.
- We also expose port 3000, which is where our web server will run by default.
- Finally, we define our runtime command as `npm start` to start the application.

In order to build the image for this container, you can run the following command:

```bash
docker build -t server-time .
```

After few second the image should be ready and you should be able to run containers off of it:

```bash
docker run -it -p 3000:3000 server-time
```

The `-p` parameter allows you to map the port 3000 from within the container to the local port 3000, so that you can access the dockerized application from `localhost:3000`.

Now you are ready to share this application. Whoever is receiving it has to have Docker installed and run the two commands above!

## Conclusion

In this article, I showed you how easy it is to bootstrap a quick web app development environment using Fastify and Preact. We also saw how to share the resulting app with Docker.

I said that this setup is ideal for building quick prototypes, so you are maybe wondering what's missing in case you want to take the app to production.

Well, these are probably some of the concerns you will have when starting to think about making your code production ready:

- Frontend assets compilation: how to create optimized (bundled) files, maybe by using Webpack, Babel or other similar tools.
- Frontend routing
- Server side rendering
- Data persistence

I didn't cover all these aspects with my setup yet, so I don't want to consider this production ready, but I am quite sure you can expand it and cover the missing pieces and be able to build production ready apps with Fastify and Preact.

I hope this article was informative and that this stack will be useful to you for your next prototype application.

This article was possible only because of the support and the kind reviews of some developers I really admire, so **thank you to them all** (in alphabetical order) 😻:

- [Angelo Gulina](https://github.com/AngeloGulina)
- [Jason Miller](https://github.com/developit)
- [Marvin Hagemeister](https://github.com/marvinhagemeister)
- [Matteo Collina](https://github.com/mcollina)
- [Tomas Della Vedova](https://github.com/delvedor)

I really look forward to hearing your feedback, so please don't hesitate leaving a comment below!

Until next time, ciao 👋
