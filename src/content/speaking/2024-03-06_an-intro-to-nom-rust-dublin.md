---
title: An intro to nom, parsing made easy for Rustaceans
slug: an-intro-to-nom-rust-dublin
date: 2024-03-06T18:15:00.000Z
status: published
language: en_US
event_name: Rust Dublin
event_link: https://www.meetup.com/rust-dublin/events/299358988/
event_location: Remote
event_location_gps: ~
event_city: Remote
event_days: 6 March, 2024
is_workshop: false
slides_link: https://loige.link/nom-rs
video_link: https://www.youtube.com/live/1atZzA3e3Kg?t=972
with:
  - name: Roberto Gambuzzi
    link: https://twitter.com/gbinside
    avatar: https://avatars.githubusercontent.com/u/1200081?v=4
---

In this talk we will give you a pragmatic introduction to `nom` , a famous Rust parser combinator crate, which, in other words, is a tool that makes it easy to create parsers even for more advanced use cases.

We will start by showcasing common suboptimal ways to do parsing including string splitting and using regexes. Then we will introduce nom and the main concepts it builds on, including its most commonly used functions. Finally, we will present several examples, from a few simple ones to building an entire parser for RESP, the Redis Serialization Protocol. If we do a good job, you'll probably think twice before using a regex again!
