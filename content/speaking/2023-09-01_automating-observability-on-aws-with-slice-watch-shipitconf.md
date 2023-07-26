---
uuid: d500f703-71e6-46f9-b15f-f45de7bbf8a0
layout: speaking
title: 'Automating observability on AWS with SLIC Watch'
slug: 'automating-observability-on-aws-with-slice-watch-shipitconf'
date: 2023-09-01T12:00:00.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: null
status: published
language: en_US
presentation_language: en_US
meta_title: null
meta_description: null
event_name: 'Ship It Conference 2023'
event_link: 'https://shipitcon.com/'
event_location: 'Dublin, Ireland'
event_location_gps: '53.3411086,-6.2526659'
event_city: 'Dublin'
event_days: 'Sept 1, 2023'
is_workshop: false
slides_link: ~
video_link: ~
---

Have you ever thought that your Lambda functions could fail without you even noticing?

If the answer is YES, that’s probably because you already “burnt" yourself playing with the cloud, where errors and failures are always around the corner…

Unfortunately we can’t prevent all types of failures, but what we can do is try to spot them as soon as possible and react quickly, possibly before our customers notice.

In order to do that, we need good observability for our serverless applications and therefore we need to become good friends with services like CloudWatch.

If you have tried CloudWatch already, you probably know how powerful but also complex it can be and setting it up correctly… well it’s a lot of work!

In this talk we will introduce SLIC Watch, an open source tool that allows you to apply observability best practices automatically to your applications running on AWS!