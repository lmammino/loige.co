---
title: JavaScript, low-level or AI?
slug: javascript-low-level-or-ai
subtitle: The tension between generative AI and low-level languages
date: 2023-11-10T14:37:00.000Z
updated: 2023-11-10T14:37:00.000Z
header_img: ./javascript-low-level-or-ai.jpg
status: published
tags:
  - opinion
  - javascript
  - rust
  - go
  - ai
description: The software industry sees an interesting tension between
  generative AI capturing the software lifecycle and low-level languages aiming
  for better performance. As developers we must understand these trends and find
  a strategy. Learn one or both?
---

The software industry is going to be fun to see in the coming 5-10 years.


I see an interesting tension happening right now...


## The generative AI side

On one side we have **generative AI** capturing almost every bit of the software development lifecycle and effectively becoming a new high-level abstraction, possibly the highest level we have ever seen in our industry.

There seems to be no stopping this phenomenon... just looking at the latest announcements from GitHub Universe, it's clear that we will have to adopt AI in one way or another and this is not necessarily a bad thing if it truly makes us all more productive and focused on generating business value.

If you don't know what I am talking about you should check out this video:

<div style=" position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 5em;">
<iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/KqIGLh1EBOw" frameborder="0" allowfullscreen></iframe>
</div>

And if that's not enough you should watch the [full GitHub Universe 2023 keynote](https://www.youtube.com/live/h3Bwuzz0TNA?si=db6QZULbBgdhFSe9).

[![GitHub Universe 2023, Day 1, Thomas Dohmke on stage with a slide in the background saying "One more thing", mimicking the Steve Job's launch of the iPad](./github-universe-2023-day1-one-more-thing.jpg)](https://www.youtube.com/live/h3Bwuzz0TNA?si=db6QZULbBgdhFSe9&t=5414)

<small>_GitHub Universe 2023, Day 1. Thomas Dohmke on stage with a slide in the background saying "One more thing", mimicking the Steve Job's launch of the iPad_</small>

The part that impressed me the most is that now Copilot can also help you lay out the structure of a project, breaking down requirements into potential tasks. Once you are happy with the result, it can start to work on the individual tasks and submit PRs. This is called [Copilot workspace](https://githubnext.com/projects/copilot-workspace), if you want to have a look.

It seems too good to be true and it's probably going to be far from perfect for a while, but there's great potential for efficiency here, and I am sure GitHub (and other competitors) will keep investing in this kind of products and maybe in a few years, we'll be mostly reviewing and merge AI-generated PRs for the most common use cases.

If you think that ChatGPT was launched slightly less than 1 year ago, what will we be seeing in 5 or 10 years from now?


## The low-level side

On the other side, we have a wave of new low-level languages such as [**Go**](/tag/go), [**Rust**](/tag/rust), **Zig** (and **Carbon**, and **Nim**, and **Odin**, and **VLang**, and **Pony**, and **Hare**, and **Crystal**, and **Julia**, and **Mojo**, and.. I could keep going here... 🤷‍♀️).

![The lovely Hare language mascot](./hare-language-mascot.png)

<small>_OK, I really wanted to put the lovely Hare language mascot here. [Hare](https://harelang.org/) is a systems programming language designed to be simple, stable, and robust. Hare uses a static type system, manual memory management, and a minimal runtime. It is well-suited to writing operating systems, system tools, compilers, networking software, and other low-level, high-performance tasks._</small>

All these languages take slightly different trade-offs, but, at the end of the day, they are built on the premise that we need to go lower level and have more fine-grained control over how we use memory, CPU, GPU and all the other resources available on the hardware. This is perceived as an important step to achieve better performance, lower production costs, and reach the dream of _"greener"_ computing.

If you are curious to know why we should be caring about _green computing_, let's just have a quick look at this report: [Data Centres Metered Electricity Consumption 2022 (Republic of Ireland)](https://www.cso.ie/en/releasesandpublications/ep/p-dcmec/datacentresmeteredelectricityconsumption2022/keyfindings/).

The report findings state that in 2022, in Ireland alone, data centers' energy consumption increased by 31%. This increase amounts to an additional 4,016 Gigawatt/hours. To put that in perspective we are talking about the equivalent of [an additional 401.600.000.000 (402 billion!) LED light bulbs being lit every single hour](https://www.energy.gov/eere/articles/how-much-power-1-gigawatt). If you divide that by the [population of the Republic of Ireland](https://en.wikipedia.org/wiki/Demographics_of_the_Republic_of_Ireland) this is like every individual is powering ~80.000 additional LED light bulbs in their home, all day and night! And this is just the increase from 2021 to 2022... How friggin' crazy is that?! 🤯

![Light! More light! - a picture by D A V I D S O N L U N A with tons of light bulbs hanging from the ceiling](./d-a-v-i-d-s-o-n-l-u-n-a-VoaI7RNKzp4-unsplash.jpg)

<small style="text-align: center">Photo by <a href="https://unsplash.com/@davidsonluna?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">D A V I D S O N L U N A</a> on <a href="https://unsplash.com/photos/clear-glass-pendant-lamps-turned-on-during-night-time-VoaI7RNKzp4?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a></small>

Ok, now one could argue that we had low-level languages pretty much since the software industry was invented. So why isn't that the default and why do we bother wasting energy with higher-level programming languages?

That's actually quite simple: because coding in low-level programming languages such as **C** and **C++** is hard! Like really really hard! And it's also time-consuming and therefore expensive for companies! And I am not even going to mention the risk of security issues that come with these languages.

So why should this new wave of low-level programming language change things?

Well, my answer is that they are trying to make low-level programming more accessible and safe. They are trying to create paradigms that could be friendly enough to be used for general computing problems (not just low-level), which could potentially bring the benefits of performance and efficiency even in areas where historically we have been using higher-level languages and made the hard tradeoff of fast development times vs sub-optimal performance.

Take for example Rust. It was historically born to solve some of the hard problems that Mozilla had to face while building Firefox. But now it's being used in many other areas, including embedded systems, game development, and even web development. Not just on the backend, but even on the frontend using WebAssembly!

I am not going to claim that writing stuff in Rust is easier than doing the same in [JavaScript](/tag/javascript) or [Python](/tag/python), but it's definitely easier than doing the same in C or C++.

So there might be many cases where we will be able to use these new languages to achieve better performance and efficiency without having to pay a massive development price for using a low-level language.

And I would go as far as saying that these use cases exist in the industry today and there's a staggering lack of talent in these areas.


## Why the tension?

So, is there really a tension here between generative AI-driven development and using low-level languages or are these just two very disjoint things?

I would personally say yes, there's a tension.

Again, generative AI is pushing us to care less about the details. We trade our time and attention for the ability to focus on the business value and let the AI do the rest. This is a trend that has been going on for a while now and it's not going to stop anytime soon.

Investing in using a low-level language goes in the opposite direction. It's a bet that we can achieve better performance and efficiency by going lower level and deciding to be explicit about the minutia of how we want to use the hardware at best.

But, wait... Am I saying that AI is not going to be able to write efficient and hyper-optimised low-level code? 🤔

Maybe! Or, at least my belief is that, as with any abstraction, there's always a price to pay. And the price of using AI is that we are going to be less explicit about the details and therefore we are going to be less efficient.

But I also expect this equation to change with time. As AI improves, it might be able to generate more efficient code. Possibly even better than code we would write manually, even with tons of expertise on our side.


## What can we do as software developers

Where does that leave us?

As individual software engineers, we can't expect to be able to change these trends. We can only try to understand them and adapt.

Investing in learning a new language is a multi-year effort, and although it might be fun (if you are a language nerd like me), it is time that you might be taking away from other activities that might be more rewarding in the long term or just more valuable to you. For instance, you could be learning more about generative AI, right? 🤓

My personal bet is to invest in both! I am currently learning Rust and I am also trying to keep up with the latest developments in the AI space.

For instance, [Eoin](https://twitter.com/eoins) and I just released [a new episode of AWS Bites where we explore Bedrock](https://awsbites.com/103-building-genai-features-with-bedrock/), AWS generative AI service... Check it out if you are curious to find out what we built with it!

<div style=" position: relative; padding-bottom: 56.25%; height: 0; margin-bottom: 5em;">
<iframe style="position: absolute; top:0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/u945tsm4p7M" frameborder="0" allowfullscreen></iframe>
</div>

I am not sure how much I will be able to keep up with both, but I am going to try my best.

I tend to be a generalist and it's only natural for me to try to explore a wide space of possibilities rather than going super deep on one specific topic.

But I am also aware that this is not the best strategy for everyone. So, if you are a specialist, you might want to focus on one of these two areas and try to become an expert in that. It might come with a risk, but it might also come with a great reward.

I am also of the belief that the more we learn the more we are capable of learning. So regardless if you decide to go wide or if you put all your eggs in one basket, the important thing is to always keep learning and keep an open mind.

If the future takes an unprecedented turn and we all end up writing code in a new language that is generated by AI, I am sure that the skills we have acquired in the past will still be valuable and will help us to adapt to the new paradigm.

Only the future will tell... And maybe, even after all this fuss, we'll still be writing tons of JavaScript in 10 years from now! 😜

## What do you think?

So what's your opinion and what's your strategy for the future? I'd love for you to strongly disagree with me... or not?! Either way, let me know what you think here in the comments or on [X, formerly Twitter](https://twitter.com/loige).

See you around and happy coding! 🤓