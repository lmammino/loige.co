---
title: Unshorten (expand) short URLs with Node.js
slug: unshorten-expand-short-urls-with-node-js
subtitle: null
date: 2017-03-31T23:23:09.000Z
updated: 2017-05-21T08:17:34.000Z
header_img: ./unshorten-expand-short-urls-with-node-js-loige-compressed.jpg
status: published
tags:
  - node-js
  - library
  - javascript
---

Short URLs have been an invaluable tool for social media marketing for so many years and we are now used to seeing them everywhere. Most of the credit probably goes to _URL shorteners_ services like [Bit.ly](https://bitly.com), [Goo.gl](https://goo.gl/), [YOURLS](https://yourls.org/) and [Rebrandly](https://www.rebrandly.com) that popularised the concept and made easy for everyone to start creating short URLs.

When working with URLs in some automation scenarios like analytics, information crawling, data retrieval, etc. it can be important to _resolve_ (or "_unshorten_" or "_expand_") short URLs, which means retrieving the original long URL.

In this article, we are going to see how short URLs work and how we can "expand" them into their original URL.

## How short URLs work

A short URLs is a regular URL that most of the time results very short by following a very simple format:

```plaintext
http://<domain>/<id>
```

The shorter the `domain` and the `id` (often called also `slashtag`), the shorter will, of course, be the URL (e.g. [`http://loige.link/b`](http://loige.link/b)).

What happens behind the scene of an URL shortener service is that there is a big database table that contains a map of all the existing short URLs and the related full-length URLs.

A URL shortener service lookup table might look like the following:

```plaintext
+