---
title: 'Serverless Podcast Transcription with Durable Lambda Functions, ECS Managed Instances, and Bedrock'
slug: serverless-podcast-transcription-aws-dublin-user-group
date: 2026-03-24T18:00:00.000Z
status: published
language: en_US
event_name: AWS User Group Dublin
event_link: https://www.meetup.com/awsdublin/events/313341338/
event_location: Button Factory - 2 Curved Street, Dublin, Ireland
event_location_gps: 53.3449334,-6.264522800000009
event_city: Dublin, Ireland
event_days: Mar 24, 2026
is_workshop: false
slides_link: null
embed_slides: null
video_link: null
with: []
---

Luciano Mammino co hosts AWS Bites with Eoin Shanaghy. The show has passed 150 episodes and, as a side project alongside a full time job, the production workflow has to be efficient. A few years ago Luciano and Eoin built an automated system to transcribe each episode and generate subtitles for YouTube and the website. That system became Podwhisperer, an open source pipeline that anyone can deploy in their own AWS account to automate podcast transcription.

Three years is a long time in the AWS world. Better speech tooling showed up, new ways to run GPU workloads became practical, and durable orchestration in Lambda showed up as a great option to build workflows programmatically. So the project was rebuilt as Podwhisperer v2: a serverless transcription pipeline optimized for podcasts, with GPU accelerated transcription, speaker diarization, and an optional refinement step powered by Amazon Bedrock. v2 also produces captions in VTT, SRT, and JSON, including word level timing, so the output can be used directly across platforms without extra manual work.

This talk is a practical case study of the v2 architecture and the trade offs behind it, but it is also designed to teach the foundations behind the building blocks that make it work. Luciano will introduce Lambda Durable Functions and explain how checkpointing and replay enable long running workflows to survive Lambda timeouts. He will then break down ECS Managed Instances and show how they can provision CUDA capable capacity on demand for containerized GPU workloads, scale to zero between runs, and avoid the operational overhead of managing an EC2 fleet. Finally, the talk will cover how Amazon Bedrock can be used for transcript refinement in a controlled way, improving readability without turning the output into creative writing.

Along the way, the session digs into the implementation details that make or break these systems in practice, including idempotency, worker callbacks, queue based coordination, and startup latency when scaling from zero. Attendees will leave with a clear mental model of the services involved and a set of practical patterns they can apply to their own long running, event driven workloads.
