---
title: Everything I know about S3 pre-signed URLs
slug: everything-i-know-about-s3-presigned-urls-comsum
date: 2023-09-28T18:00:00.000Z
status: published
language: en_US
event_name: AWS Community Summit
event_link: https://www.comsum.co.uk/manchester-23
event_location: Laughter Lounge
event_location_gps: 53.492330,-2.326580
event_city: Manchester, England
event_days: Sept 28, 2023
is_workshop: false
slides_link: https://fth.link/sign-before
embed_slides: 'https://slides.com/lucianomammino/everything-i-know-about-s3-pre-signed-urls-aws-comsum-manchester-2023/embed'
video_link: https://www.youtube.com/watch?v=3sbz5y_WXTY
with: []
---

Almost every web application at some point needs a way to upload or download files… and no one seems to enjoy building reliable and scalable upload/download servers… and for good reasons too! In fact, you’ll probably need to manage long-running connections and handle files that can be quite large (i.e videos). If you are running a fully serverless backend using API Gateway and Lambda, you probably know that you are limited in terms of payload size and execution time, so things get even more complicated there. In all these cases you should consider offloading this problem to S3 by using S3 pre-signed URLs. Pre-signed URLs are a fantastic tool to handle file download and upload directly in S3 in a managed and scalable fashion. But all that glitters is not gold and S3 pre-signed URLs come with quite a few gotchas… So in this talk, we will explore some use cases, see some potential implementations of S3 pre-signed URLs and uncover some of the gotchas that I discovered while using them. By the end of this talk, you should know exactly when to use pre-signed URLs and how to avoid most of the many mistakes I made with them!
