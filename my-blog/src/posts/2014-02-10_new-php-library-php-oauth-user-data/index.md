---
uuid: d79a0db9-3f46-4023-9fbe-e18c5c66d0c4
layout: post
title: >-
  New PHP library: PHPoAuthUserData
slug: new-php-library-php-oauth-user-data
subtitle: null
date: 2014-02-10T12:13:50.000Z
updated: 2014-02-10T23:23:21.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: null
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - library
  - php
  - oauth
  - github
---

I recently wrote a new [PHP library](https://github.com/Oryzone/PHPoAuthUserData) to simplify the extraction of user data (*name*, *email*, *id*, etc...) from various OAuth providers such as *Facebook*, *Twitter* and *Linkedin*.

Is well know that OAuth 1 and 2 are great *standard* protocols to authenticate users in our apps. Anyway we often need to go further the authentication process and extract various information about the authenticated users. Unfortunately this is something that is not standardized and obviously each OAuth provider manages user data in very specific manner according to its specific purposes.

So each OAuth provider offer a set of APIs with specific data schemes to allow developers to extract data about the authenticated users.

That's not a big deal if we build apps that adopts a single OAuth provider, but, if we want to adopt more of them, you need to deal with several different APIs and data schemes! Yes, things can get really cumbersome!

Just to make things clearer suppose you want to allow users in your app to sign up with Facebook, Twitter and Linkedin. Probably, to increase conversion rate and speed up the sign up process, you may want to populate the user profile on your app by copying data from the OAuth provider user profile he used to sign up. Yes, you have to deal with 3 different sets of APIs and data schemes! And suppose you would be able to add GitHub and Google one day, that will count for 5 different APIs and data schemes... not so maintainable, isn't it?

The library I wrote is called [PHPoAuthUserData](https://github.com/Oryzone/PHPoAuthUserData). It sits on top of the excellent OAuth library [Lusitanian/PHPoAuthLib](https://github.com/Lusitanian/PHPoAuthLib) and aims to resolve the user extraction data problem in the most simple and effective way.

It offers a *uniform* and (really) simple interface to extract the most interesting and common user data such as *Name*, *Username*, *Id* and so on.

Just to give you a *quick* idea of what is possible with the library have a look at the following snippet:

```php
// $service is an istance of \OAuth\Common\Service\ServiceInterface (eg. the "Facebook" service) with a valid access token

$extractorFactory = new \OAuth\UserData\ExtractorFactory();
$extractor = $extractorFactory->get($service); // get the extractor for the given service
echo $extractor->getUniqueId(); // prints out the unique id of the user
echo $extractor->getUsername(); // prints out the username of the user
echo $extractor->getImageUrl(); // prints out the url of the user profile image
```

The code is available on [Github](https://github.com/Oryzone/PHPoAuthUserData) where you will find detailed information on how to install and use the library.

I Hope you will enjoy it and be willing to contribute to the code base. If you want to know more, read the next post that explains [how to write an extractor for the library](http://loige.com/writing-a-new-extractor-for-php-oauth-user-data/).
