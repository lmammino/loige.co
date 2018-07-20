---
uuid: f35460e0-938b-41cc-be68-3fb5143ee211
layout: post
title: Transparent pixel response with Symfony, how to track email opening
slug: transparent-pixel-response-with-symfony-how-to-track-email-opening
subtitle: null
date: 2014-06-13T10:33:04.000Z
updated: 2014-06-17T09:00:17.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: null
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - php
  - symfony
  - http
  - tracking
  - email
path: /transparent-pixel-response-with-symfony-how-to-track-email-opening
---

If you have ever heard about "**transparent pixel**", "**1x1 blank pixel**", "**tracking pixel**" or simply "**tracking image**" you probably know what we are going to talk about and can just [skip to the implementation](#symfonyimplementation)!


###Introduction

Transparent pixel image is a technique often used to track some user behavior (often visits or views to a certain online content) in scenarios where you can't use javascript.

One of the most common scenarios is probably email opening tracking. Can you put Google Analytics into an email? Well, probably it would not work as expected... So there's something we can do? Of course there is, let's jump into a concrete example.


###Track email opening

The following image shows the typical tracking flow applied to emails:

![Tracking email opening](./email-tracking.png)

  1. A user receives our HTML email. Within the email content there's a "smart" tracking image: `<img src="http://example.com/track.gif?id=1234">`. Notice that it points to our server **example.com** and has a parameter `id=1234`.

  2. When the user opens the email, his email client will start to download all the resources linked into the HTML code (usually images) and it will trigger a request to download the tracking image.
  
  3. The request is handled by the **example.com** webserver. It does not handle the request as a static image but it executes some logic. It checks the `id` parameter and uses it to determine which email has triggered the request. Then it marks that email as opened in its own database for future reports. The mail client is still waiting for an answer and it expects an image. So the webserver generates on the fly the most small image possible: a 1x1 transparent image!
  
  4. Then the image is sent back to the client that will render it on the screen. Anyway the image is trasparent and so small that the user will barely notice it.


### Symfony implementation

Now let's see how to implement this tracking flow using the Symfony framework.

Notice that you should have your own logic to generate emails, to store and send them. I will not cover these parts, but only the one related to the tracking flow explained before.

First of all, we want to have a dedicated `Response` class to send back a transparent pixel to the client, let's call it `TransparentPixelResponse`:

```php
<?php

namespace LMammino\Http;

use Symfony\Component\HttpFoundation\Response;

/**
 * Class TransparentPixelResponse
 * @package LMammino\Http
 * @author Luciano Mammino <lucianomammino@gmail.com>
 */
class TransparentPixelResponse extends Response
{
    /**
     * Base 64 encoded contents for 1px transparent gif and png
     * @var string
     */
    const IMAGE_CONTENT = 
        'R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw=='
    ;
    
    /**
     * The response content type
     * @var string
     */
    const CONTENT_TYPE = 'image/gif';

    /**
     * Constructor
     */
    public function __construct()
    {
        $content = base64_decode(self::IMAGE_CONTENT);
        parent::__construct($content);
        $this->headers->set('Content-Type', self::CONTENT_TYPE);
        $this->setPrivate();
        $this->headers->addCacheControlDirective('no-cache', true);
        $this->headers->addCacheControlDirective('must-revalidate', true);
    }
}
```

The logic is very simple here. We have hardcoded the content of a 1x1 transparent gif image using a base64 encoded string.
We use this string to set the content of the response object. We also set some cache headers to mark the response as not cacheable.

Now we can write a controller that will handle the tracking request:

```php
<?php

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use LMammino\Http\TransparentPixelResponse;

class TrackingController extends Controller
{
	/**
     * @Route('/track.gif')
     */
    public function trackEmailAction(Request $request)
    {
    	$id = $request->query->get('id');
        if (null !== $id) {
            //... executes some logic to retrieve the email and mark it as opened
        }
        return new TransparentPixelResponse();
    }
}
```

Here the logic is pretty simple too. 
We created a controller with a `trackEmail` action. The action has been assigned to the route `/track.gif` using the `Route` annotation (if you prefer you can do it also by using the yaml or the xml convention).
Within this action we just read the parameter `id` from the request and used it to execute the persistence logic to retrive the email record and mark it as opened (skipped in the example).
Then we just have to return a new instance of our `TransparentPixelResponse` class.

That's it! Pretty simple, isn't it?

####Improve performance

**UPDATE 2014-06-16**: A comment from [Lumbendil](http://disqus.com/Lumbendil) pointed out that it would be possible to do the "heavy logic" within a `kernel.terminate` event listener. So let's refactor our code to follow this good suggestion:

```php
<?php

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpKernel\Event\KernelEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

use LMammino\Http\TransparentPixelResponse;

class TrackingController extends Controller
{
	/**
     * @Route('/track.gif')
     */
    public function trackEmailAction(Request $request)
    {
    	$id = $request->query->get('id');
        if (null !== $id) {
        	$dispatcher = $this->get('event_dispatcher');
            $dispatcher->addListener(KernelEvents::TERMINATE, 
                function(KernelEvent $event) use ($id){
                   //... executes some logic to retrieve 
                   // the email and mark it as opened
                }
            );
        }
        return new TransparentPixelResponse();
    }
}
```
Notice that we have "wrapped" our potentially heavy logic within a callable function that gets executed when the [`kernel.terminate`](http://symfony.com/doc/current/components/http_kernel/introduction.html#component-http-kernel-kernel-terminate) event is fired. This way the response is returned immediatly (before executing all the heavy logic) and the requesting client will not have to wait for processing.

Obviously, from the point of view of the server, we are not "really" improving performance. The code is not executed faster, but only in a different order. There's only an apparent performance improvement for the web client who receives the response quicker and doesn't care about the processing logic that will keep running on the server side.

Keep in mind that the `kernel.terminate` event is optional, and should only be called if your kernel implements `TerminableInterface` (it should work if you are using the  Symfony Standard Edition).

[Lumbendil](http://disqus.com/Lumbendil) also pointed out that this solution is not the only one possible. You can also rely on some messaging/queue system such as [RabbitMq](http://www.rabbitmq.com), [Gearman](http://gearman.org) or [Beanstalkd](http://kr.github.io/beanstalkd). These are great tools but they add new dependencies and a whole new layer of complexity to the  web infrastructure, so I will suggest to use one of them only if your logic is very complex or heavy (or if you are designing you whole infrastructure from scratch to leverage a work queue system).

### Considerations

You can apply this method to track email opening or views on other online contents such as Html webpages (in cases where you can't or don't want to use javascript).
Anyway, regarding tracking email opening, you should be aware that **some e-mail clients block images loading** when you open an e-mail from an unknown sender. Yes, they do it not only to save your bandwidth, but mostly to avoid triggering tracking images! So in this cases you will not able to track the email opening, unless the user authorizes its client to load all the images in that specific email.

**UPDATE 2014-06-17**: [Jelte Steijaert](http://disqus.com/jeltesteijaert/) reported that using email authentication systems such as [DKIM](http://www.dkim.org/) or [SPF](http://www.openspf.org/) will increase chances for images to get autoloaded by email clients. This authentication methods are also very useful to save your emails from ending up into the spam folder, so they are very recommended! 

If you have some other consideration you are very welcome to write a comment, as always!
