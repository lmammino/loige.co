---
uuid: e935373e-574b-493e-8f84-de5194c67401
layout: post
title: Writing a new Extractor for PHPoAuthUserData
permalink: writing-a-new-extractor-for-php-oauth-user-data/
subtitle: null
date: 2014-02-10T17:23:54.000Z
updated: 2014-02-10T17:30:42.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./writing-a-new-extractor-for-php-oauth-user-data.png
fb_img: ./writing-a-new-extractor-for-php-oauth-user-data-fb.png
tw_img: ./writing-a-new-extractor-for-php-oauth-user-data-tw.png
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - library
  - php
  - oauth
  - instagram
  - github
---

In my [previous post](http://loige.com/new-php-library-php-oauth-user-data/) I introduced my latest library [PHPoAuthUserData](https://github.com/Oryzone/PHPoAuthUserData) that allows to abstract the process of
extracting user profile data from various OAuth providers (_Facebook_, _Twitter_, _Linkedin_, etc).

The library still need a lot of work, especially to write the logic to extract data from all the services available in the [parent OAuth library](https://github.com/Lusitanian/PHPoAuthLib).

At the moment the library supports only the most common OAuth providers. I would be glad to support all the following services:

Amazon, BitBucket, BitLy, Box, Dailymotion, Dropbox, Etsy, FitBit, Flickr, Foursquare, GitHub, Google, Heroku, Mailchimp, Microsoft, PayPal, Reddit, RunKeeper, SoundCloud, Tumblr, Vkontakte, Yammer.

So that's a lot of work! And yes, of course I would be glad to share it with someone interested in using the library.

This article illustrates how to add support for a new service by writing a dedicate **extractor** class. It's really simple so stick with me and you will be able to submit your pull request in minutes!

## What is an extractor

Extractors defines the logic to request information to a given service API and to normalize the received data according to a common [interface](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/ExtractorInterface.php).
The most basic way to define an extractor is to write a class that implements the [ExtractorInterface](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/ExtractorInterface.php) (that is pretty self-explanatory).

You could extend the class [Extractor](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/Extractor.php) that implements most of the needed code to get you started. Anyway, extractors should **really** extend the class [LazyExtractor](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/LazyExtractor.php) where possible
because this class acts as a boilerplate to define highly optimized extractors. It easily allows you to implement extractors that **lazy loads** data (perform requests only when needed to) and **caches** data (does not make the same request more than once and avoids normalizing the same data more than once). Everything is done behind the scenes, so you'll need to focus only on methods that define how to make
requests and how to normalize data.

To understand how to write a new extractor by adopting the [LazyExtractor](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/LazyExtractor.php) we need to clarify some concepts:

- **Supported fields**: an array of the fields that can be extracted (you should use field constants from the [ExtractorInterface](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/ExtractorInterface.php)).
- **Loaders**: methods whose responsibility is to trigger the proper request to the OAuth provider endpoint to load a specific set of raw data. Generally you need to define a loader for each block of information that could be retrieved from the endpoint. this methods must have the suffix `Loader` in their name.
  Most of the service will allow you to retrieve all the user data with a single request, so, in this cases, you would have only a single loader method (eg: `profileLoader`).
- **Normalizers**: methods that accept raw data (the one previously fetched by some loader method) and uses it to extract the value for a given field.
  Usually you have a normalizer for each supported field. Normalizers methods must have the suffix `Normalizer` (eg. `uniqueIdNormalizer` or `descriptionNormalizer`).
- **LoadersMap**: an array that associates supported fields (keys) to loaders methods (values). Loaders methods must be referenced without the `Loader` suffix.
  Most of the time, if you have only the `profileLoader` loader you will have an array with all fields mapping to the string `profile`.
- **NormalizersMap**: an array that associates supported fields (keys) to the related normalizer methods (values). Normalizers methods must be referenced without the `Normalizer` suffix. It's highly suggested to use the same name of the field for its related normalizer, so, most of the time, you will end up by having an array that maps field constants to the same field constant (eg. `array(self::FIELD_UNIQUE_ID => self::FIELD_UNIQUE_ID)`) for
  every supported field.

Once you defined _Supported Fields_, _Loaders_, _Normalizers_, _Loaders Map_ and _Normalizers Map_ from within your new extractor class you must
wire them to the underlying logic by passing them to the parent constructor. So if you defined methods such as `getSupportedField`, `getLoadersMap` and `getNormalizersMap`
you will end up with a constructor like this:

```php
public function __construct()
{
    parent::__construct(
        self::getLoadersMap(),
        self::getNormalizersMap(),
        self::getSupportedFields()
    );
}
```

But let's see how I built the [Instagram extractor](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/Instagram.php) to have a better understanding on the whole process.

## Writing the Instagram extractor

First of all I had a look on [a bit of documentation](http://instagram.com/developer/api-console/) to find out what kind of data can be extracted from Instagram users.

So I discovered that the request to retrieve information about the user is: `/users/self` and its response is a json object that looks like the following:

```json
{
  "meta": {
    "code": 200
  },
  "data": {
    "username": "johnnydonny",
    "bio": "A life on the edge",
    "website": "http://blog.johnnydonny.com",
    "profile_picture": "http://images.ak.instagram.com/profiles/profile_weird_numbers.jpg",
    "full_name": "John Doe",
    "counts": {
      "media": 131,
      "followed_by": 80,
      "follows": 64
    },
    "id": "1111222333"
  }
}
```

So I understood wich fields can be mapped and started writing the `Instagram` class under the `OAuth\UserData\Extractor` namespace.

```php
<?php

namespace OAuth\UserData\Extractor;

class Instagram extends LazyExtractor
{
	//...
}
```

First of all I wrote the method `profileLoader` and added a class constant that defines the url of the request.

```php
const REQUEST_PROFILE = '/users/self';

protected function profileLoader()
{
	return json_decode($this->service->request(self::REQUEST_PROFILE), true);
}
```

Each extractor has access to the property `$this->service` that is an instance of the specific OAuth service from the parent library (`OAuth\OAuth2\Service\Instagram`) in this case. With this instance you can easily make request to the provider API endpoint.

Then I added the `getSupportedFields` method:

```php
protected static function getSupportedFields()
{
	return array(
		self::FIELD_UNIQUE_ID,
		self::FIELD_USERNAME,
		self::FIELD_FULL_NAME,
		self::FIELD_FIRST_NAME,
		self::FIELD_LAST_NAME,
		self::FIELD_DESCRIPTION,
		self::FIELD_WEBSITES,
		self::FIELD_IMAGE_URL,
		self::FIELD_PROFILE_URL,
		self::FIELD_EXTRA
	);
}
```

The fields _first_name_, _last_name_ and _profile_url_ are not directly available on the json response but are easy to reconstruct by using the _full_name_ and _username_ fields.

Than I started writing all the normalizer methods to map the raw data to the respective supported fields:

```php
protected function uniqueIdNormalizer($data)
{
	return isset($data['data']['id']) ? $data['data']['id'] : null;
}

protected function usernameNormalizer($data)
{
	return isset($data['data']['username']) ? $data['data']['username'] : null;
}

protected function fullNameNormalizer($data)
{
	return isset($data['data']['full_name']) ? $data['data']['full_name'] : null;
}

protected function firstNameNormalizer()
{
	$fullName = $this->getField(self::FIELD_FULL_NAME);
	if ($fullName) {
		$names = explode(' ', $fullName);

		return $names[0];
	}

	return null;
}

protected function lastNameNormalizer()
{
	$fullName = $this->getField(self::FIELD_FULL_NAME);
	if ($fullName) {
		$names = explode(' ', $fullName);

			return $names[sizeof($names) - 1];
	}

	return null;
}

protected function descriptionNormalizer($data)
{
	return isset($data['data']['bio']) ? $data['data']['bio'] : null;
}

protected function websitesNormalizer($data)
{
	$websites = array();
	if (isset($data['data']['website'])) {
		$websites[] = $data['data']['website'];
	}

	return $websites;
}

protected function profileUrlNormalizer()
{
	$username = $this->getField(self::FIELD_USERNAME);

	if (null !== $username) {
		return sprintf('http://instagram.com/%s', $username);
	}

	return null;
}

protected function imageUrlNormalizer($data)
{
	return isset($data['data']['profile_picture']) ? $data['data']['profile_picture'] : null;
}

protected function extraNormalizer($data)
{
	return ArrayUtils::removeKeys($data['data'], array(
            'id',
            'username',
            'full_name',
            'website',
            'profile_picture',
            'bio',
	));
}
```

Notice that each normalizer must return `null` if the field is not defined. That's a best pratice to follow for safety.

Also notice that the `extraNormalizer` method has the purpose to keep track of all the fields that could not be mapped to the `ExtractorInterface` fields. So we use the `OAuth\UserData\Utils\ArrayUtils::removeKeys` method to simply remove already mapped data.

Finally we need to wire our `profileLoader` method and all our normalizers methods in the constructor:

```php
public function __construct()
{
	parent::__construct(
		self::getDefaultLoadersMap(),
		self::getDefaultNormalizersMap(),
		self::getSupportedFields()
	);
}
```

The methods `self::getDefaultLoadersMap` and `self::getDefaultNormalizersMap` are convenience methods defined in the `LazyExtractor` class that defines respectively a loaders map and a normalizers map that are good in most of the cases.

That's all. To see the complete class have a look [here](https://github.com/Oryzone/PHPoAuthUserData/blob/master/src/OAuth/UserData/Extractor/Instagram.php).

**Important note**: if you are willing to submit a pull request to integrate a new extractor be sure to follow [PSR-2 code style](http://www.php-fig.org/psr/psr-2/) and to add a dedicated test case. Have a look at the [InstagramTest](https://github.com/Oryzone/PHPoAuthUserData/blob/master/tests/OAuth/Unit/UserData/Extractor/InstagramTest.php) class to understand how to do it.
