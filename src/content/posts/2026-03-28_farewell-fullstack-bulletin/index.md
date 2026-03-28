---
title: "Farewell FullStack Bulletin"
slug: farewell-fullstack-bulletin
subtitle: "After 458 issues and almost a decade of weekly curation, it's time to close this chapter"
header_img: "./farewell-fullstack-bulletin-cover.jpg"
date: 2026-03-28T12:00:00.000Z
updated: 2026-03-28T12:00:00.000Z
status: published
tags:
  - life
  - collaboration
description: "After 458 issues, 3,073+ curated links, and nearly a decade of weekly curation, FullStack Bulletin is closing. Here's the story of the journey, why it's ending, and what lives on."
---

> “There is no real ending. It’s just the place where you stop the story.”  
> ― Frank Herbert

After 458 issues, 3,073+ curated links, and almost nine years of showing up in your inbox every week, [Andrea](https://andreamangano.com/) and I have decided to close [FullStack Bulletin](https://fullstackbulletin.com) (the newsletter). For real this time...

If you've been following along, you might remember that just over a year ago I wrote [404: Newsletter Found](/404-newsletter-found/), a celebratory post where I reflected on the journey and committed to giving FullStack Bulletin _one more shot_. I meant every word of it. We both did. We pushed through 2025, reached 450 issues, moved to Buttondown, kept innovating and kept curating week after week with the same care we always had.

But sometimes giving something your best shot is exactly what helps you realize it's time to let go.

This isn't an obituary. It's a love letter.

So pour yourself a coffee (or a beer, depending on your timezone and your coping mechanisms), and let me tell you the story of a newsletter that started as a weekend experiment between two friends and somehow became a nine-year journey through the ever-changing landscape of full-stack web development.

## What FullStack Bulletin was

For those who never had the pleasure: FullStack Bulletin was a free weekly newsletter for full-stack web developers. Every issue contained seven hand-selected articles from across the web (plus a few extra ones at the bottom), one book recommendation, and one inspirational tech quote. No fluff, no spam, no algorithmic feed. Just two humans reading and being inspired by a lot of stuff on the internet and wanting to share the learnings with 3,000+ developers around the world.

I started the project in March 2017 together with my dear friend and former colleague [Andrea Mangano](https://andreamangano.com/). We originally designed the format together. Andrea is responsible for the iconic look and feel that defined FullStack Bulletin from day one: the bold yellow branding, the clean layout, the sense that someone actually cared about the reading experience. I took care of the technical side: the automation pipeline, the infrastructure, and most of the weekly curation.

FullStack Bulletin was the newsletter we wished we had when we started our own careers. The full-stack world moves fast, impossibly fast, and keeping up with everything from frontend frameworks to database internals to deployment strategies can feel like drinking from a firehose. We wanted to be the filter. Every Monday, you'd open your inbox and find a small, curated window into the best of what the web development world had produced that week. And if it wasn't the absolute best, it was at least our take on something that could teach you something new, challenge your assumptions, or simply make you smile and remind you why we love this craft so much.

In fact, what made it special, I think, wasn't the content itself. You could find great articles anywhere. What made it special was the human touch: two people who genuinely loved this craft, spending their evenings and weekends reading, discussing, ranking, and assembling something they were proud to send. In an age of algorithmic recommendations and AI-generated summaries, there was something stubbornly beautiful about that. Even when we threw in an off-topic gem every once in a while, it's because that content had given us something we could bring back to our own work. We wanted to share that with our readers, and we hoped it would spark a similar sense of discovery and delight.

If you want the full origin story, I told it in detail in [404: Newsletter Found](/404-newsletter-found/). That post also digs into the technical architecture behind the automation, the static APIs for books and quotes, and the Step Function pipeline that kept the whole thing running on AWS for a long while.

## 458 issues and counting (well, not anymore)

Let me put some numbers on this, because they still blow my mind.

- **458 issues** published
- **3,073+ links** shared
- **~9 years** of weekly curation (March 2017 to March 2026)
- **3,000+ subscribers** at our peak

That's nearly nine years of Mondays. Nine years of reading dozens of articles every week, picking the best seven, writing an editorial intro, selecting a book and a quote, and hitting send. Multiply that by the number of evenings and weekends it took, and you start to get a sense of what this project asked of us. Just thinking back, this is probably the longest sustained creative project I've ever been part of. Probably the most consistent thing I've done in my entire life, tech or otherwise! And it was a labor of love every step of the way.

The early days were pure adrenaline. The first issue went out to a handful of friends and colleagues, and every new subscriber felt like a small miracle. Andrea and I would text each other whenever someone signed up. _"We got another one!"_ We were building something from nothing, and the excitement of it made the work feel effortless, as it often happens with many side projects...

Then came the automation. I've always had a tendency to automate things (some would say too much), and FullStack Bulletin became my favorite playground. What started as a fully manual process gradually evolved into a sophisticated pipeline: an AWS Step Function that scraped links from our socials (Twitter first, then Mastodon once it became X), fetched titles and descriptions, ranked content, pulled in the book and quote of the week from our static APIs on GitHub, and assembled a draft issue ready for review.

The content selection always remained manual (who would want a soulless, overly mechanical newsletter?). But the automation handled the heavy lifting and freed us to focus on what mattered most: the curation itself. We still spent lots of time trying to make every issue tell a story, tying the links together and explaining why we cared about them and how we bumped into them in our busy developer lives.

Some of the most fun I had with the project was during the live refactoring sessions with my friend [Roberto Gambuzzi](https://www.gambuzzi.it/). We streamed on [Twitch](https://www.twitch.tv/loige) and [YouTube](https://www.youtube.com/@loige), splitting the original monolithic Lambda function into a proper Step Function and rewriting pieces of it in Rust. Raw, unscripted, full of real-world problem-solving. If you're curious, [the full playlist is still up](https://www.youtube.com/playlist?list=PLbNOKnE-Oyr1tsUft4j0QZDyk5iFcVVy_).

In 2025, we migrated from Mailchimp to [Buttondown](https://buttondown.com/fullstackbulletin/archive/), which gave us a cleaner publishing experience and a better archive (at less than half the cost). We hit the 450-issue mark and I remember thinking: _500 is within reach. Just another year._

Along the way, we were fortunate to collaborate with incredible sponsors who believed in what we were doing: _PostHog_, _Dashlane_, _Buttonize_, _Packt_, _Belka_, _MisterDA_, _ConfigCat_, _FeedHive_, _Upstash_, _Nudge_, and _Trigger.dev_. Even if we were never profitable, their support helped us a bunch to keep the lights on and I am genuinely grateful for every one of them. We were never about clickthrough volumes so these sponsors always bought into our vision and never once asked us to compromise on what we curated. That trust meant the world.

And then there were 458 weekends where we showed up, even when we were tired, even when life got in the way, even when the easy thing would have been to skip a week. Consistency isn't glamorous, but there's a quiet kind of pride in it. We did that. For almost a decade.

## Why we're stopping

Here's the part where I have to be honest with you. And with myself.

In December 2024, I wrote in the [404: Newsletter Found](/404-newsletter-found/) post:

> [...] instead of stepping away, I’ve decided to give FullStack Bulletin one more shot. I believe in its value and the role it plays in the full-stack developer community. My goal for the coming year is to grow the number of subscribers and secure more long-term sponsorships to make the project sustainable. With a larger audience and reliable sponsorship, I could reduce the financial strain and even consider bringing on someone to help with the workload.

I meant it. And in some ways, 2025 was a good year for the newsletter. We stayed consistent, reached 450 issues, changed the tone and the structure, spent even more time each week on the storytelling... and engagement actually improved quite a bit!

But the growth in subscribers didn't materialize. The sponsorships we secured were fantastic, but not enough to make the project financially sustainable. And the workload? It kept growing, not because of the newsletter itself, but because of everything else in our lives.

Plus, life has a way of shifting priorities when you're not looking...

Our families grew. Our work responsibilities deepened. I kept picking up new passions and side projects: writing [the fourth edition of Node.js Design Patterns](/nodejs-design-patterns-fourth-edition/), working on the [Rust and Lambda book](https://rust-lambda.com), speaking at conferences, training for BJJ and staying in shape, trying to be a present father and partner. Andrea had his own evolving world of commitments and ambitions. The hours in a day didn't change, but the number of things competing for them kept growing.

And here's the thing about curation: it only works if you do it well. A half-hearted newsletter is worse than no newsletter at all. Every week, I could feel the tension between the quality I wanted to deliver and the time I actually had. Some weeks I managed to bridge that gap. Others, I barely squeezed through. The joy of the process, the thing that had kept us going for years, started to feel more like obligation. Yet, I kept doing it for a while, because when you have done something for so long, it always feels you are on the verge of a breakthrough and everything will become easier after that. You just need one more rep.

![Cartoon of two miners digging through rock toward a wall of blue diamonds. The miner in the lower tunnel turns back and walks away just before reaching the gems, while the miner above keeps digging. The image symbolizes perseverance and the fear of giving up right before a breakthrough.](./never-give-up.png)

<small>

The hardest part of any long effort: you can never quite tell whether you are wisely persevering or simply refusing to admit it is time to stop. [Sunk cost fallacy](https://en.wikipedia.org/wiki/Sunk_cost#Fallacy_effect) at its finest.

</small>

And then, a few weeks ago, it hit me. One of those rare moments of clarity where the fog lifts and you see the thing for what it really is. The newsletter had become more of a source of stress than a source of joy. The tension between what I wanted to deliver and what I could actually deliver was no longer sustainable. The project that had once been a labor of love was starting to feel like a burden. And if we kept going, we risked something far worse than stopping: we might end up resenting something we had built with so much care and passion.

Once I said it out loud, the decision was obvious. I called Andrea, and it turned out he had been feeling the same way. We didn't need to convince each other. We just needed to admit it to each other.

So that's what we're doing. No regrets. Just acceptance that this chapter has reached its final page.

## What lives on

Closing the newsletter doesn't mean erasing it. One thing Andrea and I agreed on from the start of this conversation was that we wanted to leave the door open for anyone who might want to revisit what we built, learn from it, or even build on top of it. Everything is still out there, and we intend to keep it that way.

**The archive is fully preserved.** All 458 issues are searchable and browsable at [fullstackbulletin.com](https://fullstackbulletin.com). If you want to take a trip down memory lane, rediscover the trends that shaped web development over the years, or simply find a gem you missed, it's all there.

**The data is also yours to explore.** We've made the entire archive available as structured data: [JSON](https://fullstackbulletin.com/fullstackbulletin-archive.json) and [Parquet](https://fullstackbulletin.com/fullstackbulletin-archive.parquet) files that you can download and query. You could even load the Parquet file into [DuckDB](https://duckdb.org) and run SQL queries against almost a decade of full-stack web development trends. Because if we're going to close a newsletter, we're going to do it the nerd way.

**The code is open source.** Everything that powered FullStack Bulletin lives on GitHub:

- [FullStackBulletin/automation](https://github.com/FullStackBulletin/automation) — the Step Function pipeline that scraped, ranked, and published every issue
- [FullStackBulletin/tech-quotes](https://github.com/FullStackBulletin/tech-quotes) — a curated collection of inspirational tech quotes (one shipped with every issue)
- [FullStackBulletin/fullstack-books](https://github.com/FullStackBulletin/fullstack-books) — a hand-picked list of books for full-stack developers
- Even the full website code that powers [fullstackbulletin.com is open source](https://github.com/FullStackBulletin/fullstackbulletin.com)!

If you ever want to start your own newsletter project, this code might be a useful starting point. Fork it, adapt it, make it your own. After all, that's what open source is for and we truly believe in it.

**The live coding sessions are still up.** The [YouTube playlist](https://www.youtube.com/playlist?list=PLbNOKnE-Oyr1tsUft4j0QZDyk5iFcVVy_) of our refactoring sessions with Roberto Gambuzzi is there for anyone who enjoys watching two developers ~argue~ debate about Rust lifetimes while debugging a Lambda function at 7pm on a Monday.

And if you're looking for newsletters and creators to fill the FullStack Bulletin-shaped hole in your inbox, we've curated a list of our favorites on the [official farewell page](https://fullstackbulletin.com). There's even an [**OPML** file](https://fullstackbulletin.com/fullstackbulletin-recommended-feeds.opml) you can import into your favourite **RSS reader** for a unified stream of full-stack inspiration. Because old habits die hard. It won't replace FullStack Bulletin, but it will surely give you tons of insights and inspirations to keep up with the ever-evolving world of web development.

![Screenshot of a desktop RSS reader showing the curated FullStack Bulletin OPML feed. The left sidebar lists blogs and writers included in the collection, the middle column shows recent posts from Marvin Hagemeister, and the main reading pane displays his article “Signals vs Query-Based Compilers.” The image highlights the newsletter’s inspiration sources and the kind of technical writing behind its curation.](./fullstack-bulletin-curated-opml-rss-feed.png)

<small>Load the OPML file into your favourite RSS reader and you'll have a direct window into the ecosystem that fed FullStack Bulletin for years.</small>

## What FullStack Bulletin could have been

This is the section I've been putting off writing.

I'm not bitter. But there's a particular kind of ache that comes with closing something you built with someone you care about, and letting yourself imagine what it could have become.

Life pulled Andrea and me in a hundred different directions over the years, but every Monday, FullStack Bulletin was a reason to stay connected. A shared project, a shared routine, a thread running through the chaos of two lives lived in parallel. That kind of sustained creative partnership is rare. Most side projects die within a few months. Most collaborations dissolve when life gets complicated. Ours lasted almost a decade, and it only ended because we chose to end it together, not because it fell apart.

And we weren't short on ideas. If anything, we had too many of them.

One of the things I'm proudest of is how much the newsletter's voice evolved. We went from a straightforward list of links to something with real editorial personality: every issue told a small story, connecting the articles, giving you context for why we picked them. I think we got pretty good at that. But there was so much more room to explore: deeper commentary, themed issues, maybe even guest curators bringing fresh perspectives from corners of the stack we didn't cover as well.

And then there was Andrea's redesign. He had been working on a completely new visual identity for FullStack Bulletin, a bold rethink of the look and feel that I genuinely believe would have been a game changer. It never shipped, but I think it's only fair to Andrea to let you see a glimpse of what a newly revamped FullStack Bulletin could have looked like:

![Brand concept board for FullStack Bulletin in a pixel art style. It shows several logo variations with a pixel crown icon, a mock landing page on a dark purple background, a set of playing cards featuring a unicorn wearing a VR headset, a mint and purple alternate logo treatment, a three color palette with mint, pale yellow, and dark purple swatches, and a larger close up of the pixel unicorn illustration.](./fsb-redesign.png)

<small>Modern, old school, and unapologetically nerdy at the same time. I genuinely love it.</small>

## So long, and thanks for all the links

First, I want to thank [Andrea](https://andreamangano.com/). We dreamed this thing up together, built it together, and carried it together for almost a decade. You brought the eye for design, the calm when I was overthinking, and the friendship that made the work feel less like work. FullStack Bulletin wouldn't have been FullStack Bulletin without you. I'm grateful beyond words.

Thank you to every sponsor who believed in what we were doing: _PostHog_, _Dashlane_, _Buttonize_, _Packt_, _Belka_, _MisterDA_, _ConfigCat_, _FeedHive_, _Upstash_, _Nudge_, and _Trigger.dev_. You kept the lights on and you never once asked us to compromise on what we curated. That trust meant the world.

Thank you to [Roberto Gambuzzi](https://www.gambuzzi.it/) for the late-night live coding sessions that turned infrastructure refactoring into entertainment. Those streams were some of the most fun I've had as a developer.

Thank you to every author, blogger, and creator whose work we curated over the years. FullStack Bulletin existed because the web development community produces incredible content, generously and most often for free. You are the real heroes here.

And thank you. Yes, you. The subscriber who opened our emails every Monday. The one who clicked through the links, tried the tools, read the books, and occasionally hit reply to tell us you enjoyed the issue. Maybe you've been with us since Issue #1, or maybe you found us somewhere along the way. Either way, you are the reason we kept going for 458 Mondays. Connecting with you, even through something as simple as a weekly email, has been one of the most rewarding experiences of my life.

FullStack Bulletin taught me that community is built one email at a time. That consistency compounds. That curating someone else's brilliance is its own form of creativity. And that the best projects are the ones you build with people you love.

> I may not have gone where I intended to go, but I think I have ended up where I needed to be.  
> — Douglas Adams

In my [404: Newsletter Found](/404-newsletter-found/) post, I closed with: _"Here's to Issue 404... and beyond!"_

Well, we went beyond. Fifty-four issues beyond, to be exact.

And there will be one more. Issue #459, the very last one, will land in your inbox soon to close the loop and point you right here. Consider it our final Monday together.

Here's to Issue #459. And what a ride it's been.

Thank you for reading. Thank you for subscribing. Thank you for being part of this.

So long, and thanks for all the links.
