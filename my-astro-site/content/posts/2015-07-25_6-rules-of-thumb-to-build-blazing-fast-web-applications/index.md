---
uuid: b7e233ac-3bda-4529-88c5-1fff08b629a1
title: 6 Rules of thumb to build blazing fast web server applications
slug: 6-rules-of-thumb-to-build-blazing-fast-web-applications
subtitle:
  In this post are described 6 extremely important rules you should take under
  consideration when writing your next web application
date: 2015-07-25T18:57:00.000Z
updated: 2016-01-15T19:15:54.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./6-rules-of-thumb-to-build-blazing-fast-web-applications-flash-gordon-1.jpg
fb_img: ./6-rules-of-thumb-to-build-blazing-fast-web-applications-fb.png
tw_img: ./6-rules-of-thumb-to-build-blazing-fast-web-applications-tw.png
status: published
language: en_US
meta_title: 6 Rules of thumb to build blazing fast web applications (server side)
meta_description:
  In this post are described 6 extremely important rules you should take under
  consideration when writing your next web application
tags:
  - php
  - symfony
  - laravel
  - performance
  - scalability
---

In this post I will try to highlight some of the most common principles that you have to take under consideration when you want to achieve a great level of performance while building a web application (specifically on the backend part). I believe the concepts discussed here can be applied to any language and framework even if, due to my specific experience, I will mention some examples, design patterns, conventions and tools that are mostly used in the PHP world.

You can read this article in other languages:

- **Japanese** on **POSTD**: [高速な Web サーバアプリケーションを構築するための 6 つの経験則](http://postd.cc/6-rules-of-thumb-to-build-blazing-fast-web-server-applications/)
- **Italian** on **HTML5 Today**: [Performance: 6 regole per sviluppare applicazioni web](http://html5today.it/tutorial/performance-6-regole-sviluppare-applicazioni-web/)

**TLDR;** the basic rules are:

- [Rule 1](#rule-1). Avoid premature optimization
- [Rule 2](#rule-2). Do the minimum amount of work to solve the problem
- [Rule 3](#rule-3). Defer the work you don't need to do immediately
- [Rule 4](#rule-4). Use cache when you can
- [Rule 5](#rule-5). Understand and avoid the N+1 query problem with relational databases
- [Rule 6](#rule-6). Prepare your app for horizontal scalability when possible

![Your code should be fast as Flash](./flash-gordon-fast-code.png)

<a id="rule-1"></a>

## Rule 1: Avoid premature optimization

One of the most famous [Donald Knuth](http://www-cs-faculty.stanford.edu/~uno/)'s quotes says:

> "premature optimization is the root of all evil"
> <br/><br/><a href="https://twitter.com/home?status=%22Premature%20optimization%20is%20the%20root%20of%20all%20evil%22%20%E2%80%94D.Knuth%20%0A%0AWeb%20apps%20performance%20tips%20by%20%40loige%3A%20http%3A//bit.ly/1SaHIJY" target="_blank"><i class="fa fa-twitter"></i> Tweet this</a>

Knuth's noticed that a lot of software developers generally waste a huge amount of time thinking about performance of non-critical parts of the code they are writing. This very often happens because such developers don't really know what are the critical parts of their code or the ones that need to be optimized more, so they start to worry about futile things like "_are double quoted strings slower than single quoted ones?_"

To avoid to fall into the premature optimization trap you should write the first version of your code without worrying much about performance. Then you can use a **profiler** to instrument your code and see where the bottlenecks are. This way you can focus on improving only the parts that really need your attention.

**Note**: I want to make it clear that Knuth's quote doesn't mean that you don't have to care about optimization at all and it's not an excuse to write shitty code and then abandon it. I just intended it as an encouragement to learn how to "optimize smartly" and that's the way you should read it as well.

If you are working on the PHP land there are a loot of tools that you can easily adopt to profile your code:

- **[xdebug](http://xdebug.org/)**: probably the most famous PHP debugger and profiler, it must be installed as a PHP extension and it's easily integrable in most of the IDEs.
- **[xhprof](https://github.com/phacility/xhprof)**: a function-level hierarchical profiler for PHP. It comes with a simple HTML based navigational interface and offers some cool diff capabilities to compare the performance of different versions of your code.
- **[Symfony profiler](https://symfony.com/doc/current/cookbook/profiler/index.html)**: The Symfony profiler it's a one of the best features of the Symfony framework. It allows you to inspect the execution time of every request, showcasing a nice timeline that allows you to easily understand which part of your code is the most time-consuming. It is automatically enabled in "development" mode and does not need any PHP extension to be installed.
- **[The Stopwatch component](https://symfony.com/doc/current/components/stopwatch.html)**: It's the low level library used in the Symfony profiler to measure the execution time of a piece of PHP code. It can be easily integrated in any PHP project and does not require any extension.
- **[Blackfire.io](https://blackfire.io/)**: a profiler optimized for PHP that offers a very nice web interface that allows you to understand visually what your code does and where the CPU spends most of its time.
- **[Tideways](https://tideways.io/)**: a promising alternative to Blackfire, offers a lot of graphical tools (timeline, call graphs, etc.) to make it really easy to find bottlenecks. It's meant to be run continuously (also in production).

If you want to know more on this specific topic you can have a read at the following articles and papers:

- [On optimization in PHP](http://blog.ircmaxell.com/2011/08/on-optimization-in-php.html) by Anthony Ferrara
- [The fallacy of premature optimization](http://ubiquity.acm.org/article.cfm?id=1513451) by Randall Hyde
- [Premature optimization](http://www.c2.com/cgi/wiki?PrematureOptimization) by Cunningham & Cunningham, Inc

<a id="rule-2"></a>

## Rule 2: Do just what you need to

![Joker meme I Just Do Things](./i-just-do-things-joker-meme.gif)

Very often your code does more things than it's required to do to produce the expected output. This is especially true if you are using complex libraries and frameworks in your code. Just to give you some examples you might load classes that you'll never use, you might open a database connection or read a file for every request even when these resources are not needed to generate the output for a specific request.

There are a number of design patterns and techniques that can help you to avoid these situations and achieve better performances.

- **Autoloading**: it's a [PHP feature](http://php.net/manual/en/language.oop5.autoload.php) that allows you to require the file containing the definition of a class only when you are about to use that class (instantiation, static method call, access to a constant, etc.). This way you should not worry about which files to include in your script, but just to use that classes that you need. Autoloading will do the rest for you. Configuring autoloading has been a little bit complex in the past, especially because every library used its own conventions, but today thanks to the [PSR-0](http://www.php-fig.org/psr/psr-0/) and [PSR-4](http://www.php-fig.org/psr/psr-4/) standards and tools like _Composer_ it is a piece of cake to use autoloading.
- **Dependency Injection**: it's a very common [design pattern](https://en.wikipedia.org/wiki/Dependency_injection) in the Java world that in the last years has got a lot of traction even in the PHP world thanks also to the effort of frameworks like Symfony, Zend and Laravel that use and advocate it widely. Basically it allows to inject components through the constructor or a setter method. This has the effect of forcing the developer to think in terms of dependencies and to create small isolated components focused on doing just one thing and do it well.
- **Lazy Loading**: another important [design pattern](https://en.wikipedia.org/wiki/Lazy_loading) used to defer initialization of an object until the point at which it is needed. It's mostly used with objects that deals with heavy resources like database connections or file based data sources.

<a id="rule-3"></a>

## Rule 3: Mama, I'll do it tomorrow!

![Tomorrow definition mystical land for human productivity](./i-ll-do-it-tomorrow-meme.jpg)

How many times do you needed to send an email to a user after he/she triggered a specific event in your web app (e.g. password changed or order completed)? How many times you needed to resize an image after the user uploaded it? Well it's quite common to do these "heavy" operations before sending a success message to the user. To put it another way, our users expects to see some message in their browsers as soon as possible and we need to ensure that any additional task (not directly related with creating that message) should be deferred.
The most common way to do that is to use [job queues](https://en.wikipedia.org/wiki/Job_queue), which means that you have to store the minimum amount of data needed to perform the deferred task into a queue of some kind (e.g. a database, a message broker) and forget about it. You have to get back immediately to your main task: generating the output for the user! There will be some kind of worker in place with the goal to read from the queue periodically and perform the deferred job (e.g. sending the e-mail or generating the image thumbnails).

A simple queue system can be easily done with any kind of data store (very often Redis or MongoDB are used) or a message broker like RabbitMQ or ActiveMQ. There are also a lot of implementation already done for the PHP world:

- [Resque](https://github.com/chrisboulton/php-resque): A PHP queue library that uses Redis as data store.
- [Laravel Queues](http://laravel.com/docs/5.1/queues): the Laravel/Lumen out-of-the-box solution to defer jobs using queues and workers. It can be configured to use different data stores.
- [Gearman](http://gearman.org/): A generic job server that supports the wide majority of languages (PHP among the others).
- [Beanstalkd](http://kr.github.io/beanstalkd/): Another fast work queue with client libraries for the most common languages (Ruby, PHP, etc.)

<a id="rule-4"></a>

## Rule 4: Gotta cache 'em all!

![Comic strip about the cloud and the cache](./cache-joke-comic-the-cloud.png)

Nowadays web apps are really complex pieces of code. In order to generate a response to every request we generally do a lot of things: connect to one or more database, call external APIs, read configuration files, compute and aggregate data, serialize the results into some parseable format (Xml, Json, etc.) or render it with a template engine into a wonderful HTML page.
Using a naive approach we can do that for every request that we get, our servers will never get bored to do repetitive tasks.

But there's a smarter (and faster) way to do repetitive tasks, avoiding to calculate the same results again and again: enter "_the cache_"!

> Cache, which is pronounced "cash" (not "catch" or "cashay"), stores recently used information so that it can be quickly accessed at a later time.

Cache is used widely in computer science and you can find it pretty much everywhere. For example the RAM itself can be considered as a way to cache the code of running programs to avoid the CPU to read the (slow) hard disk sparsely millions and millions of times.

In general with web programming we can focus on several different **levels of cache**:

- **Byte Code Cache**: it's a common feature of many interpreted languages (PHP, Python, Ruby, etc.) and it allows to avoid to interpretate source code files again and again if they are not changed since the last time. Some languages have this feature integrated in the core (Python), others like PHP needs to have it as an extension and several extensions exists for this sake: [APC](http://php.net/manual/en/book.apc.php), [eAccelerator](http://eaccelerator.net/), [Xcache](http://xcache.lighttpd.net/). Since PHP 5.5 we can use the [Opcache extension](http://php.net/manual/en/book.opcache.php) which has been integrated in the core.
- **Application Cache**: to not be confused with HTML5 Application cache, is the cache logic that regards your specific application and it's probably the most important in terms of performance. Are you computing the 1264575th number in the Fibonacci sequence over and over again in your app? Well put the result in a cache and avoid to recompute it every time. Or, to give a more realistic example, are you always making the same expensive queries to the database over and over again to render the front page of you app? Well cache the results of the queries (or even the output of the whole page when possible) and avoid to hit the database for every user request. In these cases it's a good idea to use cache servers like [Memcached](http://memcached.org/), [Redis](http://redis.io/) or [Gibson](http://gibson-db.in/).
- **HTTP Cache**: Fetching data over the network is slow: a lot of round trips between the client and server are required and a lot of time is wasted before the browser is able to display the content. Wouldn't it be useful to have ways to tell the browser to reuse content that he already downloaded?
  Well, you can do that by using **HTTP Cache headers** like `Etag` and `Cache-control`. This turns to be the cheapest way in terms of server resources to leverage cache (because everything is already in the browser and the server doesn't get requests at all), you should only be sure to use it properly to avoid returning visitors to see stale content.
- **Proxy Cache**: this technique refers to the usage of a dedicated server that receives all the HTTP traffic and it may have copies of the web pages requested by the users (often called **Reverse proxy**). In these cases it returns the copy of the page directly without requiring the app server to re-elaborate the request. It generally keeps the copy of the data in memory and avoids many network round trips so it's generally an out-of-the-box approach to speed up very trafficked web sites where the content doesn't change too frequently. Famous proxy servers are [Varnish](https://www.varnish-cache.org/), [Nginx](http://nginx.org/) and [Squid](http://www.squid-cache.org/). Also [Apache](http://httpd.apache.org/) can be configured to act as a reverse proxy.

Anyway, once you got the concept of caching, it is really easy to adopt it. The issues arise when you need to understand whether something changed and the cached version of your data might not be relevant anymore. In such cases you need to delete the data on the cache to be sure it gets correctly recomputed the next it's requested. This process is called "_cache invalidation_" and it generally makes developers insane to the point that a very famous quote exists:

> There are only two hard things in Computer Science: **cache invalidation** and naming things.
>
> — Phil Karlton
> <br/><br/><a href="https://twitter.com/home?status=There%20are%20only%202%20hard%20things%20in%20CS%3A%20cache%20invalidation%20and%20naming%20things%0A%E2%80%94Karlton%0AWeb%20apps%20performance%20tips%20by%20%40loige%20http%3A//bit.ly/1SaHIJY" target="_blank"><i class="fa fa-twitter"></i> Tweet this</a>

If you have been into software development for a while I'm quite sure that you already had chance to read it!

There's no silver bullet to make cache invalidation easy, it really depends from the architecture of your code and the requirements of your application. In general the less caching layers you have the better: always avoid to add complexity!

Here follows some articles that might be interesting to know more about caching for web applications:

- [Web application caching](http://docforge.com/wiki/Web_application/Caching) by DocForge
- [Fine tune your Opcache configuration to avoid caching surprises](https://tideways.io/profiler/blog/fine-tune-your-opcache-configuration-to-avoid-caching-suprises) by Tideways blog
- [Beginners guide to HTTP cache headers](http://www.mobify.com/blog/beginners-guide-to-http-cache-headers/) by Mobify
- [HTTP Caching, optimizing content efficiency](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching) by Google
- [Using Http headers with Symfony](http://symfony.com/it/doc/current/book/http_cache.html) by Symfony
- [What is a reverse proxy server](https://www.nginx.com/resources/glossary/reverse-proxy-server/) by Nginx
- [Laravel cache](http://laravel.com/docs/5.1/cache) by Laravel

<a id="rule-5"></a>

## Rule 5: Avoid the damn N+1 Query Problem

The "_N+1 Query Problem_" is a very common anti-pattern unintentionally used especially when dealing with relational databases. Basically it reads N record from the database by generating N+1 queries (one to read the n IDs and 1 for every record). Take a look at the following piece of code to have a real case (well... almost real) example:

```php
<?php

function getUsers() {
  //... retrieve the users from the database (1 query)
  return $users;
}

function loadLastLoginsForUsers($users) {
  foreach ($users as $user) {
    $lastLogins = ... // load the last logins for the user (1 query, executed n times)
    $user->setLastLogins($lastLogins);
  }

  return $users;
}

$users = getUsers();
loadLastLoginsForUsers($users);
```

The given piece of code loads a list of users at first and then, for every user, it loads his last login times from the database. This code produces the following N+1 queries:

```sql
SELECT id FROM Users; -- ids: 1, 2, 3, 4, 5, 6...
SELECT * FROM Logins WHERE user_id = 1;
SELECT * FROM Logins WHERE user_id = 2;
SELECT * FROM Logins WHERE user_id = 3;
SELECT * FROM Logins WHERE user_id = 4;
SELECT * FROM Logins WHERE user_id = 5;
SELECT * FROM Logins WHERE user_id = 6;
-- ...
```

That's obviously inefficient and it happens quite often with "has many" relationships in databases, especially when you are using some kind of magic ORM and you don't exactly know what it is doing out of the box (and probably you haven't configured it properly).

In general you can solve this problem by producing a query like the following:

```sql
SELECT id FROM Users; -- ids: 1, 2, 3, 4, 5, 6...
SELECT * FROM Logins WHERE user_id IN (1, 2, 3, 4, 5, 6, ...);
```

or by using the `JOIN` syntax where possible.

This problem can be only addressed when you are in control of your SQL queries or if you have a clear understanding of the ORM library you are using (if you are using one). Anyway keep it in mind and be sure you don't fall in the N+1 queries trap, especially when you deal with large datasets. Many PHP profilers allows you to inspect the generated queries for every page request, they can be very useful companion to understand if you are doing things properly in terms of avoiding the N+1 queries problem.

On a side note, speaking of databases, be sure to keep a single connection open to your data source and to not reconnect for every query.

Don't expect this to be exhaustive. This problem is very broad and it has a lot of other important case to analyze, so if you want to know more about it have a look at the following articles and books:

- [Performance: N+1 Query Problem](https://secure.phabricator.com/book/phabcontrib/article/n_plus_one/) by Phabricator
- [Nested Loops](http://use-the-index-luke.com/sql/join/nested-loops-join-n1-problem) by Use the Index, Luke
- [Laravel's Eloquent ORM Eager Loading](http://laravel.com/docs/5.0/eloquent#eager-loading) by Laravel
- Book [Solving The N+1 Problem In PHP](https://leanpub.com/sn1php) by Paul M. Jones

<a id="rule-6"></a>

## Rule 6: Scale... horizontally!

![Horizontal scalability is hard](./web-apps-explodes-like-a-baloon-scalability-comic.png)

"Scalability" is not exactly the same thing of "performance", but the two things are tightly intertwined.
To give you my personal definition, "scalability" is the ability of a system to adapt and remain functional without noticeable performance issues when the number of users (and requests) grows.

It's a very complex and broad topic and I don't want to get into the details here. But for the sake of performance it's worth to understand and keep in mind some simple things that you can do to be sure your app can be easily scaled horizontally. Horizontal scaling is a particular scaling strategy in which you add more machines to the cluster where your app is deployed. This way the load is split among all the machines and thus the whole system can remain performant even when there are a lot of simultaneous requests.

The two major problems to take in consideration when preparing for horizontal scaling are user sessions and user files consistency.

- **Sessions**: quite often (especially in PHP applications) user session data is stored on the local filesystem where the app is deployed. Using this strategy is not only slower but it will not work if you have two machines to handle the requests (the session data stored in one machine will be different than the one stored in the other). A better solution is to use some kind of database to store the user session data. Most of the frameworks easily allows you to do that with just few lines of configuration. At the beginning, when your app is small and it's not so popular, you can install your favourite session storage platform in the same machine of your web sever. Than when you will need to scale your architecture you can easily move the session storage into a separate machine and connect all your web machines to it.
- **User files consistency**: Same problem of sessions happens when users can store files within your app. In these cases you need to be sure that whatever is the web server they end up with they are able to see their files. So you need to keep the files into a dedicated storage (like [Amazon S3](http://aws.amazon.com/s3/) or [Rackspace Cloudfiles](http://www.rackspace.com/cloud/files)). Otherwise you can keep the files locally on the machines but you need to find a way to keep them synchronized within all the machines of the cluster. In this case you can use [NFS](https://en.wikipedia.org/wiki/Network_File_System) or [GlusterFS](http://www.gluster.org/) to create a shared filesystem.

Here's a list of other interesting resources to know more about scalable web applications:

- [Horizontally scalable web applications](http://inviqa.com/blog/horizontally-scalable-web-applications/) by Inviqa
- [Horizontally Scaling PHP Applications: A Practical Overview](https://www.digitalocean.com/company/blog/horizontally-scaling-php-applications/) by Digital Ocean
- [Best Practices For Horizontal Application Scaling](https://blog.openshift.com/best-practices-for-horizontal-application-scaling/) by OpenShift
- [Scalable Web Architecture and Distributed Systems](http://www.aosabook.org/en/distsys.html) by Kate Matsudaira
- [Intuitively Showing How To Scale A Web Application Using A Coffee Shop As An Example](http://highscalability.com/blog/2014/3/17/intuitively-showing-how-to-scale-a-web-application-using-a-c.html) by HighScalability
- Book [The art of scalability](http://theartofscalability.com/) by Martin Abbot and Michael Fisher
- Slides [7 Stages of scaling web applications](http://www.slideshare.net/davemitz/7-stages-of-scaling-web-applications) by Rackspace

## Conclusions

I really hope this long post has been useful for you. I just wanted to give you an idea of what are the general concerns to take in mind when you start to write an app that should take performance under consideration. As I said in the first rule, don't fall into the trap of premature optimization and just focus on writing the right code for the right job. Anyway if you have this points clear in your mind you will almost automatically think about good solutions to achieve a good level of performance and scalability from the very first versions of your app and you can also make some smart architectural decisions from the very beginning.

In case you are an experienced web developer let me know if I forgot to mention any important rule and, if you commonly follow these rules, what you think about them.

I hope some great discussion will start from the comments here.

Thanks for taking your time to read this post.

Until next time!
