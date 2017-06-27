uuid:             a9fcc25f-c805-4d20-b449-da2d0bacebe4
layout:           post
title:            'My Universal JavaScript Web Applications talk at Codemotion Milan 2016'
slug:             my-universal-javascript-web-applications-talk-at-codemotion-milan-2016-2
subtitle:         null
date:             '2016-11-26T09:53:55.000Z'
updated:          '2016-12-12T23:44:38.000Z'
author:           'Luciano Mammino'
author_slug:      luciano-mammino
header_img:       /content/images/2016/11/my-universal-javascript-web-applications-talk-at-codemotion-milan-2016-2.jpg
status:           published
language:         en_US
meta_title:       null
meta_description: null
tags:
  - slides
  - talk
  - node-js
  - javascript
  - react

---

Yesterday (25/11/2016) I had the pleasure of delivering a talk about Universal JavaScript at [Codemotion Milan 2016](http://milan2016.codemotionworld.com). It was a great fun and I was very happy to meet such a big pool of technology enthusiasts and professionals all in one places. I'm already looking forward for the next edition!

## Video

**Update** (12-12-2016): a video recording of the talk has been published by the folks at Codemotion:

<div style=" position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 5em;">
<iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/9z7k3-Or7EA" frameborder="0" allowfullscreen></iframe>
</div>

## Slides deck

If you are interested in my talk you can find the slides on [Slides.com](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016):

<div style=" position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 5em;">
<iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" src="//slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016/embed" scrolling="no" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>


## Commentary

Here follows also a quite detailed kind of commentary for every slide (from my notes), so you can easily understand all the concepts discussed during the presentation.

### [1.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/1)

Hello everybody, I am Luciano (also known as "[lmammino](https://github.com/lmammino)" or "[loige](https://twitter.com/loige)" on GitHub and Twitter).
I am a software engineer at [Planet9 Energy](http://planet9energy.com), a new electricity provider that is focused
on using new technologies to give industrial and consumer customers more visibility over
their bills and at the same time enabling new ways to perform energy trading very efficiently.

Me and my team are currently building most of the infrastructure using a serverless approach
and we make heavy use of AWS lambda and the serverless framework. If you are interested
in these topics please catch up with me after this talk.

I am also the co-author of the book "[Node.js Design Patterns Second Edition](https://www.nodejsdesignpatterns.com)" together with [Mario Casciaro](https://twitter.com/mariocasciaro). If you are interested in re-enforcing your knowledge of design patterns, and most importantly discover how you can get the best out of them in the Node.js and JavaScript land, this book is probably for you. For what concerns this talk, the book also features an entire chapter about Universal JavaScript.

### [2.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/2)

So today we are going to be talking about Universal JavaScript for Web applications.

First of all we will see what "universal" really means, then we will discuss who is currently using it and why. Then we will move into a quick overview of the main challenges to face when dealing with universal JavaScript applications. Finally, in the second part of this talk, we will see a practical example about how to build a Universal JavaScript Web Application. At first we will build the front-end only version and then by making it "universal".

### [3.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/3)

So, for some time, what we call today Universal JavaScript was recognised as "Isomorphic" JavaScript. After some discussions it seems that the JavaScript community agreed on using the term "Universal" instead. If you are interested in the full story you can read most of it at this link [here](http://bit.ly/universaljs).

Anyway, what do we really mean with the term "Universal"? I am going to phrase my own definition here... So please don't take it as an academic one...

> Universal Javascript means writing JavaScript code that can run on different JavaScript runtimes over different contexts. For example on the Browser as well as on the Server.

### [4.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/4)

But that's not limited only to the web, for example we can talk about Universal JavaScript even when building desktop or mobile applications and some people are even attempting experiments to control hardware devices directly with JavaScript.
During the course of this talk we are going to focus only on Web development though.

### [5.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/5)

What are the main advantages of Universal JavaScript? First of all it allows you to deal with a JavaScript only development environment. Having JavaScript both on the Browser and on the Server removes the cost of language switching. This of course happens with any Node.js application, even if not Universal. When it gets to universal you are going to have most of the same code shared between frontend and backend, so in that case your code base would probably contain less duplication and thus will result to be more maintainable.
Also with universal JavaScript you will achieve better Serach Engines Optimization, because the server will be able to render the full content of you pages and not just that but it will also be able to return proper http codes in any situation, so cases like "page not found" or "redirects" can be resolved correctly by Google and the other crawlers.
Finally we will also achieve a better "perceived" load time. This is a side effect of server rendering, because when the browser finish to download the HTML of the page it will have already most of the information needed to render the page, so the classical flickering effect of classic single page applications would be less likely to happen.

### [6.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/6)

Just to mention a few, the very first early adopter of Universal JavaScript were Netflix, Airbnb, Wordpress (that used this approach to build the [new administration panel for wordpress.com](https://github.com/Automattic/wp-calypso)) and Dropbox.

### [7.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/7)

So yes, everything looks great, but if you already heard about it, you probably also heard that it's very complicated...
Let's see why many people think so...

### [8.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/8)

Well, there are some specific pain point to address when it comes to build a Universal application. First of all you will need to have a nice way to write your code (generally in the form of modules) once and make it available between the backend and the frontend. The two environments, even if similar, are not the same. For example they load files and resources in different ways so we need standards and tools in order to "transform" the code in a way that is loadable and functional in both environments.
The current open source solutions are [UMD](https://github.com/umdjs/umd), which stands for Universal Module Definition, [SystemJS](https://github.com/systemjs/systemjs) that allows to load modules asynchronously and [Browserify](http://browserify.org) and [Webpack](https://webpack.github.io) as module builder for bringing CommonJs/Node.js modules to the browser.


### [9.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/9)

Another issue is universal rendering. When it comes to JavaScript heavy applications we build most of the HTML needed from JavaScript itself (generally using the concept of components). In a regular Single Page Application these components are rendered only by the browser, after the page is fully loaded. With Unviersal JavaScript we want to be able to perform the generation of the full HTML from the server before the page is served to the browser. All the major new framworks like React and Angular 2 supports way to achieve Universal Rendering and there's a new interesting player in this field called Next.js.

### [10.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/10)

A similar problem is universal routing. We want both the browser and the server to be able to render specific view given specific urls. Ideally we don't want any code duplication, so the same mechanism to define routes and actions should be defined once and should function in a seamless way in both environments.
There are several interesting libraries trying to address this problem and one of the most famous, at least in the React land, is React Router.

### [11.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/11)

Again a similar problems comes in relation to loading the data (often in the form of an API) needed by the application.
In these cases one of the most common solutions is to have an api that is accessible both from the server and the client and load it with an universal code base using a library like Axios or Universal Fetch.

### [12.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/12)

Finally one of the last big pain points is Universal State management. There is a tendency to define the full state of an application in a single object generally using libraries like Redux or Cerebral. We want to keep doing this in a way that is fully compatible and functional both on the server and the client.

### [13.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/13)

And well yes, plain old JavaScript doesn't seem to be enough these days. We often want to use some high level abstraction or language extension like Flow or JSX or even other new languages able to compile directly to JavaScript like TypeScript or Elm.
This is not strictly necessary but it might make the developer experience way better.

### [14.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/14)

Yeah I know the current JavaScript panorama sounds a bit too broad and scary...

### [15.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/15)

But let's stop complaining and let's build something together... It doesn't need to be perfect but I will show you that it's totally possible to build a non trivial Universal application in about 30 minutes.

### [16.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/16)

The tools that we are going to use for this experiment are Webpack, React, ReactRouter and express.

### [17.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/17)

I was for years a Judo practitioner and I am still a big fan of this sport, so we are going to build an application called Judo Heroes. I already published a version of this application, you can see the URL here (judo-heroes.herokuapp.com) and I also wrote an entire tutorial based on it on Scotch.io (bit.ly/judo-heroes-tutorial).

### [18.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/18)

As you can see the application is very simple ad allows us to display some of the best Judo Olympic athletes and read some details about them: their nationality, the year of birth, some pictures and the list of all the medals they won.

### [19.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/19)

Let's see how Universal comes into play with this app. If we load a specific athlete page, we can see, using the chrome developer tools all the loaded resources.

### [20.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/20)

Then, if from the interface we switch to another athlete, the application loads only the new resources. In this case the images for the new athlete.

### [21.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/21)

And also, if we refresh the page, the server will render the full html for the athlete page straight away. We can see this here with a curl command.

### [22.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/22)

Ok, let's start looking at some code. Fist of all let's see out data set. For the sake of this tutorial we will keep things simple and rely on a JavaScript module that exports an array of athletes. Every athletes is an object which contains all the information we need in order to display an athlete: name, country, birth year, images, list of medals, etc.
We can easily require this module everywhere we want to access the data.

### [23.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/23)

Now let's build all the React components that define our interface.

### [24.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/24)

The first component that we are going to see is the `Layout` component, which has the goal of defining the markup of the global layout we want to use in our application. It contains a static header and a static footer and a variable content.

### [25.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/25)

This is more or less how a component looks like in React. We basically needs to define a render function that receives some parameters (called props) and returns the markup needed to render the component view. This markup looks like a mix of HTML and JavaScript and it's called *JSX*. In this case we expect to see:

  a. An header section
  b. A variable content (notice the variable `props.children`)
  c. And the footer section

### [26.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/26)

Now let's move to the `IndexPage` component page. This component has the goal to show a card based navigation bar that allows us to select an athlete.

### [27.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/27)

The first thing to notice is that we are importing our data module to get the list of all the athletes. Then inside our render method we iterate over this list and, for every athlete in the list, we reference another component called `AthletePreview` passing to it all the data representing the current athlete.

### [28.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/28)

So the `AthletePreview` component represents a card in the navigation bar of the `IndexPage`. Let's jump to the code.

### [29.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/29)

Let's use this component to understand better how React and its JSX syntax work.

  a. As I told you we have a function that has the goal of providing the JSX markup needed by React to render the component.
  b. The main *tag* that we use is `Link` which represents a React Router component. This will make all the component *clickable* and will link it to a specific React route. We will see later in greater detail how the routing functionality works. The only important thing you need to notice for now is that the attribute `to` uses an interpolated variable to build the link reference. We reference here the `props` object which will contain all the attributes passed to this component by the parent component.
  c. Then we display the headshot of the athlete, again we access the object `props` to fetch the picture for the current athlete.
  d. We do the same to display the name of the athlete.
  e. Finally we also define the markup to render a little medal icon and the count of the medals won by the athlete.

### [30.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/30)

Now let's move to the `AthletePage` which represents the detail page of an athlete.

### [31.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/31)

A lot of code here. But don't worry this is the biggest component we will see today and at the end it's quite simple. So let's zoom into the important details.

### [32.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/32)

This component as well has access to all our data. It receives the id of the current athlete to display in `props.params.id`, data that will be populate by the routing layer given the current url.

  a. We use this information to verify if the current id really exists in our little static database object. If not we simply render a `NotFoundPage` component that we will see later. If the athlete exists we will have all its data in the `athlete` variable.
  b. If we have found the athlete we first render a custom component called `AthletesMenu`.
  c. Then we have the markup that define the header of the page (the one with the big background image and the picture of the current athlete).

### [33.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/33)

  d. Then we have a the markup needed to render the athlete description.
  e. Notice that inside this markup we reference another custom component called `Flag` which is the one responsible for rendering the flag icon inside the description.
  f. In the next section we iterate over all the athlete medals and display them...
  g. Using a custom component called `Medal`
  h. The last bit is a link that redirects to the index page.

### [34.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/34)

This is the `AthletesMenu` component that we referenced in the previous component.

### [35.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/35)

In its code we access again to our data module and we iterate over it.

  a. For every athlete we reference a `Link` component pointing to the athlete page. It's worth noticing that we use the attribute `activeClassName`. This is a very handy utility of the ReactRouter module that allows us to apply to the link a specific class to the link tag when the linked route matches the current URL. With this utility get very easy to create some CSS code to style active links differently from the other ones.

### [36.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/36)

This is the `Flag` component we mentioned some slides before.

### [37.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/37)

The code is very simple. We just need to use the `props.icon` to render the image tag properly. We also have an optional prop called `showName` that, if set to a *truthy* value, tells the component to also display the name of the country along the flag icon.

### [38.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/38)

Finally let's see our `Medal` component.

### [39.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/39)

In this component, before the render function we have a little dictionary object that we use to map medal types ids to it's literal description ('G' for 'Gold', 'S' for 'Silver', etc.). Then we reference all the properties we receive from the parent component to display the medal year, the city, the name of the competition and the category.


### [40.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/40)

Finally let's have a look at out super simple `NotFoundPage` component. This is probably the simplest one as we don't reference any dynamic property but we just render some markup to display a very simple error page with a link to the index.

### [41.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/41)

Ok, enough React components! I hope you are not bored already...
Let's move to the routing functionality.

### [42.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/42)

In our application we will have two different routes:

  a. The index page, mapped to the main route
  b. and the athlete page which uses the athlete `id` as parameter.

### [43.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/43)

in our `Routes` components we define these two routes. Using ReactRouter we can define the routes hierarchy using JSX.

  - We have a main route that links the `Layout` component. This will make sure that every component will use our default layout.
  - Then the common index route is associated to our `IndexPage` component.
  - We than map the `AthletePage` component to the path `athlete/:id`
  - And finally we provide a fallback path that matches all the other routers and renders our `NotFoundPage` component.

### [44.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/44)

Let's create the real router component now.

  a. This component imports our previously defined hierarchy of routes.
  b. It uses the hashHistory mechanism to detect the current router. We will see later what this really means.
  c. We reference our routing hierarchy through the `routes` attribute.
  d. Finally we use a little function to scroll the page back up every time we move dynamically to a new route. This will make sure that the transition between one page an another looks natural.

### [45.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/45)

So now we have React components and routing. Let's combine them together and finalize our client app.

### [46.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/46)

The app-client represent our browser application.

  a. It loads our router
  b. and renders it inside the tag with id `main`.

### [47.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/47)

Let's see how the main html of our application looks like

### [48.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/48)

We basically have some regular meta headers and a link to a stylesheet. Then in the body:

  a. We have our `main` tag which will contain all our react app
  b. The bundled script that contains all the code needed to run our app in the frontend.

### [49.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/49)

Let's how we can build this bundle using Babel and Webpack.

### [50.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/50)

Our Babel config looks extremely simple:

  a. We just need to specify that we want to transpile react code and EcmaScript 2015 to regular ES5 code.

Our webpack config is a bit more elaborate:

  b. First thing we need to specify is the entry point of our app. Webpack will start to crawl through all the used dependencies starting from this file.
  c. Then we specify where we want to output the resulting bundled file.
  d. And finally we specify that we want to process every file in our source directory using babel.

### [51.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/51)

To create our bundle we just need to call `webpack` from the command line.

### [52.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/52)

The last bit we need before seeing our application working is to write a small server app using Express that allows us to serve the static files that compose our app at this stage. We can do this using the `Express.static` middleware.

### [53.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/53)

Let's finally test our app!

(Show frontend only app, show routing with hashes, code only rendered on the client and 404 not understood)

### [54.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/54)

So What we have done so far?

  1. We defined our views combining a bunch of different React components
  2. We added routing using React Router
  3. We compiled our application for the browser using Babel and Webpack
  4. Then we executed the application served through a static Express server

### [55.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/55)

Ok nothing so exiting so far, let's now add Server Side Rendering and Routing!

### [56.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/56)

When we executed our front-end only application you probably noticed that our URLS were looking a bit weird. The only changing part was prefixed by an hashtag symbol. That's because we were using the `hashHistory` mode in our router. This route works very well for frontend-only applications, because it makes shareable link pointing to the right dynamic section, even when in the server you only have an `index.html` page.

We need now to switch to full routes (without hashtags) and to do so we can simply change our `hashHistory` to `browserHistory`.

### [57.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/57)

Now we also want to convert our old `index.html` to a generic *ejs* template. Our new file looks almost identical, with the only exception that inside our `main` block we have now an *ejs* template variable called `markup` that allows us to inject arbitrary html code into it. We are going to use this to inject the React generated markup when rendering from the server.

### [58.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/58)

Now the last step is to update our server application to support universal routing and rendering. To do so we need to import some libraries from React, ReactDom e ReactRouter. We also import our routes from our frontend-only app and the `NotFoundPage` component.

Finally we also enable the support for *ejs* templates.

### [59.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/59)

Now let's get to the most interesting part, let's see how the universal routing and rendering works.

The important part of the code here is the Express route defined with `app.get('*', (req, res) => {...})`.

This is an Express *catch-all* route that will intercept all the *GET* requests to every URL in the server (not previously matched to a static file). Inside this route, we take care of delegating the routing logic to the React Router `match` function.

`match` accepts two parameters: the first one is a configuration object and the second is a callback function. The configuration object must have two keys:

  - `routes`: used to pass the React Router routes configuration. Here, we are passing the exact same configuration that we used for the client-side rendering.
  - `location`: This is used to specify the currently requested URL.

The callback function is called at the end of the matching. It will receive three arguments: `error`, `redirectLocation` and `renderProps`. We can use them to determine what exactly the result of the match operation was.

We can have four different cases that we need to handle:

  1. The first case is when we have an error during the routing resolution. To handle this case, we simply return a 500 internal server error response to the browser.
  2. The second case is when we match a route that is a redirect route. In this case, we need to create a server redirect message (302 redirect) to tell the browser to go to the new destination (this is not really happening in our application because we are not using redirect routes in our React Router configuration, but it's good to have it ready in case we decide to keep evolving our application).
  3. The third case is when we match a route and we have to render the associated component. In this case, the argument renderProps is an object that contains the data we need to use to render the component. The component we are rendering is RouterContext (contained in the React Router module), which is responsible for rendering the full component tree using the values in renderProps.
  4. The last case is when the route is not matched, and here we can simply return a 404 not found error to the browser.

This is the core of our server- side routing mechanism and we use the ReactDOM `renderToString` function to be able to render the HTML code that represents the component associated to the currently matched route.

Finally, we inject the resulting HTML into the `index.ejs` template we defined before to obtain the full HTML page that we send to the browser.

### [60.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/60)

Let's test the app again.

(Show universal routing and rendering working when changing and reloading pages).

### [61.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/61)

Quick recap about what was done in this presentation:

  - Create a Single Page Application with React and React Router
  - Add server side routing and rendering using React and React Router libraries in out Express app

### [62.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/62)

What can we do next to have a fully-fledged Universal app.

  - Add Universal Data Retrieval
  - Add Universal State Management

### [63.](http://slides.com/lucianomammino/universal-js-web-applications-with-react-codemotion-milan-2016#/63)

Thanks everybody for being here!

## Thanks

Big thanks to the organizers of the event for giving me this chance to be there on the stage. Also great thanks to my great friends Alessandro Cinelli ([@cirpo](https://twitter.com/cirpo)), Andrea Mangano ([@andreaman87](https://twitter.com/andreaman87)), Aleksandar Čambas and Peter Caulfield ([@quasi_modal](https://twitter.com/quasi_modal)) for reviewing my slide deck and for giving me tons of advices!

### Some photos from Twitter

Gigantic thanks also to whoever took pictures and shared them on Twitter, some here:

<blockquote class="twitter-tweet" data-lang="it"><p lang="en" dir="ltr"><a href="https://twitter.com/loige">@loige</a> on stage <a href="https://twitter.com/hashtag/codemotion?src=hash">#codemotion</a> Milan! Rock on! <a href="https://t.co/9Y97YENhIG">pic.twitter.com/9Y97YENhIG</a></p>&mdash; cirpo (@cirpo) <a href="https://twitter.com/cirpo/status/802170435425234948">25 novembre 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet" data-lang="it"><p lang="en" dir="ltr">It&#39;s time of <a href="https://twitter.com/hashtag/universaljs?src=hash">#universaljs</a> <a href="https://twitter.com/hashtag/reactjs?src=hash">#reactjs</a> with <a href="https://twitter.com/loige">@loige</a> <a href="https://t.co/2XrAZFOBRe">pic.twitter.com/2XrAZFOBRe</a></p>&mdash; Andrea Mangano (@andreaman87) <a href="https://twitter.com/andreaman87/status/802170179379752960">25 novembre 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>


<blockquote class="twitter-tweet" data-lang="it"><p lang="it" dir="ltr">Ottimo talk, su <a href="https://twitter.com/hashtag/reactjs?src=hash">#reactjs</a>. Forse le più belle slide mai viste. Chiare ed essenziali <a href="https://twitter.com/hashtag/Codemotion?src=hash">#Codemotion</a> <a href="https://twitter.com/loige">@loige</a> <a href="https://t.co/DhCRV8NPMX">pic.twitter.com/DhCRV8NPMX</a></p>&mdash; Daniele Montagni (@dmontagni) <a href="https://twitter.com/dmontagni/status/802182660189724672">25 novembre 2016</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

I hope you liked this article and that you are now somehow confident that building universal JavaScript application is not that hard... you just need to start somewhere!
Feel free to leave any question or comment below on the comments box.

Cheers, see you next time! 🍻

