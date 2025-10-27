---
title: Introducing Middy, Node.js middleware engine for AWS Lambda (Lightning talk)
slug: introducing-middy-frontconf-munich
date: 2017-12-09T00:00:00.000Z
status: published
language: en_US
event_name: Frontconf Munich
event_link: https://frontconf.com/
event_location: Microsoft Germany GmbH, Walter-Gropius-Straße 5, 80807 München, Germany
event_location_gps: 48.177622,11.593452999999954
event_city: Munich, Germany
event_days: December 8-9 2017
is_workshop: false
slides_link: https://slides.com/lucianomammino/introducing-middy-11
embed_slides: 'https://slides.com/lucianomammino/introducing-middy-11'
video_link: null
with: []
---

One of the main strengths of serverless and AWS Lambda is that, from a developer perspective, your focus is mostly shifted toward implementing business logic.

Anyway, when you are writing an handler, you still have to deal with some common technical concerns outside business logic, like input parsing and validation, output serialization, error handling, etc.

Very often, all this necessary code ends up polluting the pure business logic code in your handlers, making the code harder to read and to maintain.

In other contexts, like generic web frameworks (express, fastify, hapi, etc.), this problem has been solved using the middleware pattern.

Middy brings the middleware pattern into AWS Lambda making it easier to focus on business logic and reuse the boilerplate code across different functions.
