---
title: 'Durable Functions + ECS Managed Instances + Bedrock for perfect podcast transcriptions'
slug: 'durable-functions-ecs-bedrock-podcast-transcriptions'
date: '2026-02-18T17:30:00.000Z'
status: published
language: it_IT
event_name: 'AWS User Group Roma'
event_link: 'https://www.meetup.com/it-it/amazon-web-services-rome/events/313003094/'
event_location: 'Talent Garden, Via Ostiense 92, Roma'
event_location_gps: '41.871540,12.479340'
event_city: 'Roma, Italy'
event_days: '18 Feb, 2026'
is_workshop: false
slides_link: 'https://loige.link/pod'
video_link: ~
with: []
---

I co-host [AWS Bites](https://awsbites.com/) with Eoin Shanaghy. The show has passed 150 episodes, and since it is a side project alongside a full-time job, the production workflow has to be efficient. A few years ago Eoin and I built an automated system to transcribe each episode and generate subtitles for YouTube and the website. That system became [Podwhisperer](https://github.com/fourTheorem/podwhisperer), an open-source pipeline that anyone can deploy in their own AWS account to automate podcast transcription.

Three years is a long time in the AWS world. Better speech tooling showed up, new ways to run GPU workloads became practical, and durable orchestration in Lambda got a lot more interesting. So we rebuilt the project as podwhisperer v2: a serverless transcription pipeline optimized for podcasts, with GPU-accelerated transcription, speaker diarization, and an optional refinement step powered by Amazon Bedrock. v2 also produces captions in VTT, SRT, and JSON — including word-level timing — so the output can be used directly across platforms without extra manual work.

This talk is a practical case study of the v2 architecture and the trade-offs behind it. The workflow is orchestrated with a Durable Lambda Function, so long-running jobs survive Lambda timeouts thanks to automatic checkpointing. GPU work runs in a container on Amazon ECS Managed Instances, which provisions CUDA-capable capacity on demand and shuts it down when idle — no EC2 fleet to manage and the system can scale to zero between episodes. The pipeline is modular: each step can be enabled or disabled independently. The talk digs into the implementation details that make or break these systems in practice: idempotency, worker callbacks, queue-based coordination, startup latency when scaling from zero, and how to use an LLM for refinement without turning the transcript into a creative writing exercise. To close, I will show how the AWS CDK stack is made highly configurable and type-safe using Zod, so changing the pipeline feels like changing configuration, not rewriting infrastructure.
