---
uuid: b0f2bda3-b159-47d2-8b5a-2c8f5bebf1e6
layout: post
title: 2017 - A year in review
slug: 2017-a-year-in-review
subtitle: null
date: 2018-01-03T18:59:58.000Z
updated: 2018-01-03T22:55:34.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: my-blog/src/posts/2018-01-03_2017-a-year-in-review/loige-co-2017-a-year-in-review-luciano-mammino-blog.jpg
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - life
path: /2017-a-year-in-review
---

2017 is over and it's time to sit down and see what happened during this year. As I already did [last year](https://loige.co/2016-a-year-in-review/), I would love to write a (potentially boring) recap of all the good and bad things (mostly from a career perspective) that happened in my life during this year.

Last year I promised myself I would keep doing this as a way to keep track and benchmark my productivity over the coming years, so here I am to see how I performed!


## The year of conference talks!

Let's start with a big win! This was the year of conference talks (and workshops too!). I had to travel a fair bit around Europe and I created a dedicated [speaking page](https://loige.co/speaking/) to keep track of all the events I have been involved with and the related available material (slides, videos, repositories).

![Luciano Mammino at CodeEurope Wroclaw](./loige-co-luciano-mammino-2017-a-year-in-review-conferences.jpg)

Here's the full list of the talks and workshop I had the pleasure to deliver in 2017:

- *"AWS Lambda & Serverless framework"* at **Node.js Meetup**, Dublin (January)
- *"Universal JS Web Applications with React"* at **Codemotion**, Rome (March)
- *"Building a Serverless company with Node.js, React and the Serverless framework"* at **JSDay**, Verona (May)
- *"Universal Javascript"* at **Frontend United**, Athens (May)
- *"Serverless, the pros and cons of building a company without infrastructure"* at **Shift Conference**, Split (June)
- *"Deep Dive on Serverless Application Development (with Planet 9 Energy)"*  with Danilo Poccia from AWS and Padraig O'Brien from Planet 9 Energy at **AWS Summit**, London (June)
- *"Serverless: getting started with AWS Lambda Functions"* (workshop) with Padraig O'Brien at **Dublin.js Meetup**, Dublin (July)
- *"Serverless: the battle of the giants"*  (workshop) with Christos Matskas from Microsoft at **FullStack 2017**, London (July)
- *"Universal JS web applications with React"* (workshop) at **Web Summer Camp**, Rovinj (September)
- *"Serverless from the trenches"* with Padraig O'Brien at **AWS User Group**, Dublin (October)
- *"Getting started with Serverless and AWS Lambda Functions"* (workshop) at **Codemotion**, Milan (November)
- *"Cracking JWT tokens: a tale of magic, Node.JS and parallel computing"* at **Codemotion**, Milan (November)
- *"Cracking JWT tokens: a tale of magic, Node.JS and parallel computing"* at **Node.js meetup**, Dublin (November)
- *"The future will be Serverless"* at **The Front Conf**, Munich (December)
- *"Introducing Middy"* (Lightning talk) at **The Front Conf**, Munich (December)
- *"Building a serverless company on AWS lambda and Serverless framework"* with Padraig O'Brien at **CodeEurope**, Wroclaw (December)
- *"Cracking JWT tokens: a tale of magic, Node.JS and parallel computing"* at **CodeEurope**, Wroclaw (December)

👍 Compared to 2016, I moved from 2 conferences talks to 17 (+750%), this is a pretty good WIN (and an awesome vanity metrics too 😇)!

I am really curious to see what 2018 will bring on this regard!


## Career

In December I finished my contract with Planet 9 Energy and I am very excited to start a new adventure as Solution Architect with [Vectra](https://vectra.ai) in Dublin. If you never heard about Vectra, this is what [Vectra about page](https://vectra.ai/leadership) has to say about it:

> Vectra offers the fastest way to detect and stop hidden cyberattackers – from cloud and data center workloads to user and IoT devices.

![Vectra logo](./vectra-logo.png)

The range of products offered by Vectra sounds extremely interesting and I am sure I will be exposed to super interesting topics like **IT Security** and **Machine Learning**, so I am absolutely thrilled to get started.


## The year of side projects

2017, wasn't just the year of the conference talks, but also the year of *side-projects*!

I didn't write a new book, but I had the real pleasure to be involved in four on-going side projects: [Fullstack bulletin](https://fullstackbulletin.com), [Serverless Lab](https://serverlesslab.com), [Middy](https://middy.js.org) and [Fastify](https://www.fastify.io).

### Fullstack bulletin

[![Fullstack bulletin website preview](./fullstack-bulletin-preview-loige-co-2017-a-year-in-review.jpg)](https://fullstackbulletin.com)

**Fullstack bulletin** is a weekly newsletter [Andrea Mangano](https://twitter.com/andreaman87) and myself built to support ambitious fullstack developers to stay up to date with the latest trends and news. The idea is to collect 7 interesting links every week regarding topics such as Frontend/Backend web development, APIs, microservices, databases, scalability, but also web design, UI and UX. In every issue, aside from the links, you also get a famous *tech-related* quote and a suggested tech book.

The links are extracted automatically from the ones tweeted by Andrea and myself during the previous week, using a simple ranking algorithm.

The project is totally [open sourced](https://github.com/FullStackBulletin) and built on top of serverless technologies (mostly AWS Lambda, Serverless framework and Cloudwatch).

### Serverless lab

[![Serverless Lab website preview](./serverless-lab-preview-loige-co-2017-a-year-in-review.jpg)](https://serverlesslab.com)

**Serverless Lab** is a side-project started by [Padraig "Podge" O'Brien](https://twitter.com/podgeypoos79) and myself to help companies to get started quickly with serverless technologies on AWS.

The support is given with a day-long in-house training course that introduces all the components needed to build a wide range of applications using serverless on AWS. At the moment we defined an introductory course and an advanced one.

Some of our learning materials have been open sourced and you can check them out on the [LucPod organisation on GitHub](https://github.com/lucpod).

Yes, LucPod stands for *LUCiano* and *PODge* (Padraig's nickname)... I know, we have to figure out a better name 😂


### Middy

[![Middy website preview](./middy-js-org-middleware-framework-preview-loige-co-2017-a-year-in-review.jpg)](https://middy.js.org/)

**Middy** is a *Node.js middleware engine for AWS Lambda*. It basically allows you to take care of tedious and repetitive tasks such as validation, input deserialization and output serialization by encapsulating this external logic into reusable and testable middlewares. With Middy, your lambda functions will look like this:

```javascript
const middy = require('middy')
const { middleware1, middleware2, middleware3 } = require('middy/middlewares')

const originalHandler = (event, context, callback) => { 
  /* your pure business logic */
}

const handler = middy(originalHandler)

handler
  .use(middleware1())
  .use(middleware2())
  .use(middleware3())

module.exports = { handler }
```

You can see from the example that the business logic is clearly defined in the `originalHandler` and that the handler function doesn't get polluted with additional code that is attached as a *decorator* with the `use` function.

Middy is still a pretty young and immature project, but, it's currently the only solution in this space (as far as I know), so it's getting a bit of attention. I had the idea of starting this project, but since then it has been a community effort and the current team is composed by some amazing people in the Open Source space:

  - [Aleksandar Cambas](https://twitter.com/acambas_sasa)
  - [David Wells](https://twitter.com/DavidWells)
  - [Domagoj Katavic](https://twitter.com/katavic_d)
  - [Joe Minichino](https://twitter.com/tech_fort)
  - [Padraig O'brien](https://twitter.com/Podgeypoos79)
  - [Peter Caulfield](https://twitter.com/quasi_modal)

Also, a special mention goes to [Jose Santacruz](https://github.com/joseSantacruz) for bringing Typescript support into Middy.

If you like this idea (and open source in general), remember to [give it a star on GitHub](https://github.com/middyjs/middy).

I hope the project will grow in 2018 and get much more stable and complete.


### Fastify

![Fastify website preview](./fastify-nodejs-web-framework-preview-loige-co-2017-a-year-in-review.jpg)

**Fastify** is a fast and low overhead web framework for Node.js. If you like Express, you are definitely gonna love Fastify.

Fastify was started by two amazing developers: [
Tomas Della Vedova](https://twitter.com/delvedor) and [Matteo Collina](https://twitter.com/matteocollina) in an attempt to create a performant and scalable, yet very friendly web framework for Node.js.

Now [the team](https://github.com/orgs/fastify/people) has grown up a lot and version 1.0 is very close to being released. You can surely expect big things from this framework in 2018.

For what concerns me, I have been involved mostly in taking care of the [Fastify website](https://github.com/fastify/website) and its [Continuous Integration pipeline](https://circleci.com/gh/fastify/website). I made sure that every time there's a new release, the documentation get's pulled from the main repository and the website is rebuilt, versioned and published. This way, contributors don't have to worry much about the website look and feel and they just have to maintain a bunch of handy markdown files to document all the aspects of the framework. This part is built by using a bunch of tailored Node.js scripts adopting git and the GitHub APIs, [Metalsmith](http://www.metalsmith.io) as a static website engine, [Circle CI](https://circleci.com) for the CI pipeline, GitHub Pages and [Cloudflare](https://www.cloudflare.com) for the web hosting.


## Blog posts

I have to admit this year I wasn't a very prolific author (again 😓)... I guess all the stuff described above took almost all my free time. Anyway, I still managed to write some posts. Here are the most interesting ones (based on actual reading stats):
 
  - [Using Let’s Encrypt and Certbot to automate the creation of certificates for OpenVPN](https://loige.co/using-lets-encrypt-and-certbot-to-automate-the-creation-of-certificates-for-openvpn/) (~3.500 views)
  - [Unshorten (expand) short URLs with Node.js](https://loige.co/unshorten-expand-short-urls-with-node-js/) (~2.500 views)
  - [From bare metal to Serverless](https://loige.co/from-bare-metal-to-serverless/) (~1.500 views)
  - [My Universal JavaScript Web Applications talk at Codemotion Rome 2017](https://loige.co/my-universal-javascript-web-applications-talk-at-codemotion-rome-2017/) (~1.200 views)

It's funny to see that most of the traffic is still driven by old (and probably outdated) articles from the previous years like [Developing a web application with Lumen and MySql](https://loige.co/developing-a-web-application-with-lumen-and-mysql/) (~12.000 views) and [Gulp and FTP: update a website "on the fly"](https://loige.co/gulp-and-ftp-update-a-website-on-the-fly/) (~5.700 views).

👎 The total number of page views amounts to about 57.000 views, which compared to the previous year total of 90.000 is a dramatic decrease of 36.67%!

I guess I have to write more and find more interesting topics if I want to keep this blog relevant in 2018!


## External posts

Aside from the articles published on my blog I had the pleasure to collaborate again with [Scotch.io](https://scotch.io/) and to establish a new collaboration with [Twilio]() to publish 2 posts as a guest author:

  - [Create a custom Slack slash command with Node.js and Express](https://scotch.io/tutorials/create-a-custom-slack-slash-command-with-nodejs-and-express)
  - [Automated SMS Notifications with AWS Lambda, JavaScript and Twilio SMS](https://www.twilio.com/blog/2017/12/automated-sms-notifications-aws-lambda-javascript-twilio-sms-apis.html)

It's always fun and rewarding to write guest posts and it's a nice way to get my name out from my common channels.

I guess in 2018 I should keep doing that and maybe build some new relationship with other publishers :)


## Open Sourcing

As usual, I kept spending some time working out some small open source contributions, mostly creating little Node.js libraries or command line utilities for different purposes. Here's the complete list of the open source contributions I made:

### Organisations

  - [fastify](https://github.com/fastify)
  - [FullStackBulletin](https://github.com/FullStackBulletin)
  - [middy](https://github.com/middyjs)
  - [lucpod](https://github.com/lucpod)

### Repositories

  - [jekyll/jekyll](https://github.com/jekyll/jekyll) (contribution): Jekyll is a blog-aware, static site generator in Ruby.
  - [mattallty/Caporal.js](https://github.com/mattallty/Caporal.js) (contribution): A full-featured framework for building command line applications (cli) with node.js
  - [anaibol/awesome-serverless](https://github.com/anaibol/awesome-serverless) (contribution): A curated list of awesome services, solutions and resources for serverless / nobackend applications
  - [karlhorky/awesome-speakers](https://github.com/karlhorky/awesome-speakers) (contribution): Awesome speakers in the programming and design communities
  - [mdvorscak/metalsmith-browser-sync](https://github.com/mdvorscak/metalsmith-browser-sync) (contribution): A Metalsmith plugin to make your workflow easier
  - [1000ch/node-github-markdown](https://github.com/1000ch/node-github-markdown) (contribution): Parse GitHub flavored markdown to static html
  - [gianarb/wikidiff](https://github.com/gianarb/wikidiff) (contribution): A wikipedia "snapshotter"
  - [lmammino/judo-heroes-2](https://github.com/lmammino/judo-heroes-2): Universal Javascript sample application with React Router 4 and Express 5
  - [lmammino/webhook-tunnel](https://github.com/lmammino/webhook-tunnel): A little HTTP proxy suitable to create tunnels for webhook endpoints protected behind a firewall or a VPN
  - [lmammino/slack-shorturl-integration](https://github.com/lmammino/slack-shorturl-integration): A slack slash command server to shorten URLs using Rebrandly API
  - [lmammino/terraform-openvpn](https://github.com/lmammino/terraform-openvpn): A sample terraform setup for OpenVPN using Let's Encrypt and Certbot to generate certificates
  - [lmammino/lambda-currency-exchange-sms](https://github.com/lmammino/lambda-currency-exchange-sms): An AWS lambda function that sends you an SMS (using Twilio) with today exchange rate for a give currency pair
  - [lmammino/sample-jwt-webapp](https://github.com/lmammino/sample-jwt-webapp): A sample JWT web app that can be use to demonstrate how to escalate permissions by cracking and forging JWT tokens
  - [lmammino/tall](https://github.com/lmammino/tall): Promise-based, No-dependency URL unshortner (expander) module for Node.js
  - [lmammino/swagger-jsdoc-generator](https://github.com/lmammino/swagger-jsdoc-generator): Command line script that generates a swagger file based on jsdoc comments
  - [lmammino/json-dynamo-putrequest](https://github.com/lmammino/json-dynamo-putrequest): Converts an arbitrary JSON into a DynamoDB PutRequest JSON to simplify the import of the raw data into DynamoDB.
  - [lmammino/simple-react-universal-demo](https://github.com/lmammino/simple-react-universal-demo): A simple demo to demonstrate Universal JavaScript with React
  - [lmammino/heroku-buildpack-npm-build](https://github.com/lmammino/heroku-buildpack-npm-build): Runs npm build on heroku
  - [lmammino/yaml-prune](https://github.com/lmammino/yaml-prune): A simple command line script that allows to prune parts of a yaml file

👍 Comparing last year (13) to this year (19) I had a +46.15% repo contributions increase. Another pretty good vanity metric!

PS: I finally have more than 100 repositories on my GitHub account 🎉


## Learning

This year I kept familiarising know technologies such as **AWS**, **serverless**, **Node.js**, **React**, **Docker** and **python**, but I also gained knowledge of some interesting technologies/tools such as **Terraform** and **Ansible**.

Also, I am getting more and more interested in the following technologies:

  - [Rust](https://www.rust-lang.org)
  - [Kubernetes](https://kubernetes.io)
  - [Elastic Search](https://www.elastic.co)
  - CSS [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout) & [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)


👎 I admit I dropped the ball on Elixir, and even though I spent a bit of time reading about [Phoenix](http://phoenixframework.org) (the most famous Elixir web framework), I never really built something barely interesting with it.


## Previous years goals

Now it's time to check whether I met [the goals I set last year](https://loige.co/2016-a-year-in-review#expectationsfornextyear):

 - ✅ **Keep improving my knowledge of Node.js and everything related**
 - 😐 **Publish the first version of my side project with Andrea**  
(that mysterious side project was totally dropped, but we managed to publish Fullstack Bulletin instead, so this was not a complete failure)
 - ✅ **Getting better with AWS and the Serverless framework**
 - ❌ **Move my blog to a static publishing engine and (possibly) use a serverless hosting approach**  
(this is still a work in progress 😟)
 - ❌ **Keep investing time on Elixir and build something with it**
 - ✅ **Presentations and talks at conferences and meet-ups**
 - 😐 **Get more proficient with VIM**  
(I think I got slightly better, but VIM it's not my primary editor still)
 - ✅ **Keep open sourcing stuff**
 - ✅ **Travel more!**
 - 😐 **More serious and constant BJJ training!**  
(I finally got my blue belt, but still I feel like I am training way less then I should!)


## Expectations for next year

Ok, it's finally time to move to the good intentions for the next year! I have been very long already so I'll just sort this part out with a simple unordered checklist, I am already looking forward to seeing, in one year time, how many items will be crossed:

  - MOAR conference talks/workshops (at least 8)
  - Write at least 8 quality blog posts (excluding this one!)
  - Learn a lot about Security, Machine Learning and networking (😇 Vectra, please...)
  - Keep contributing to Fastify
  - Keep working on Middy
  - Move my blog to a static publishing engine and (possibly) use a serverless hosting approach
  - Learn enough about Rust and build something with it
  - Learn enough about Elastic Search and build something with it
  - Learn enough about Kubernetes and build something with it
  - Do stuff with CSS Grids and Flexbox
  - Keep learning AWS and serverless
  - More serious and constant BJJ training!

Well, That's all... I hope I didn't bore you to death!
Anyway, **I'd really love to know what was your biggest achievement in 2017**. If you feel like you want to share this information with me feel free to [write me on Twitter](https://twitter.com/loige) or to post a comment here! I'll make sure to have (at least) a pint in your honour! 🍻

Finally, I **wish a fantastic 2018** to you all!
