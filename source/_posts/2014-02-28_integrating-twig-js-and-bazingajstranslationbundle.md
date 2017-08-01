---
uuid:             000b9c76-e0e2-4b7b-95c2-29a6a84a65e1
layout:           post
title:            'Integrating Twig.js and BazingaJsTranslationBundle'
slug:             integrating-twig-js-and-bazingajstranslationbundle
subtitle:         null
date:             '2014-02-28T11:40:05.000Z'
updated:          '2014-02-28T12:35:38.000Z'
author:           'Luciano Mammino'
author_slug:      luciano-mammino
header_img:       null
status:           published
language:         en_US
meta_title:       null
meta_description: null
tags:
  - php
  - symfony
  - javascript
  - translation
  - twig

---

Recently I had the need to run a twig template that uses the `trans` filter on my frontend using [twig.js](http://jmsyst.com/libs/twig.js), a pure JavaScript port of twig written by the good [Johannes Schmitt](http://jmsyst.com/).
The JavaScript version does not handle all the functionalities offered by the original PHP version (even if it goes pretty close) and in particular it does not natively handle the `trans` filter.

So, at first, I got a JavaScript runtime exception on my page when trying to use the template.
Luckily enough the JavaScript version of twig is extensible like the PHP one and it is very easy to add new filters and functions.

In my specific case I had a Symfony application where I was already using [BazingaJsTranslationBundle](https://github.com/willdurand/BazingaJsTranslationBundle) to manage dynamic translations on the frontend. As I discovered the twig.js extensibility, it was very easy to start building a twig.js extension by using the `Translator` JavaScript object offered by the Bazinga bundle.

**Note**: I will not go into the details about how to install twig.js and BazingaJsTranslationBundle in a Symfony application. You can find all the needed informations on their websites/github pages.

In my first attempt I wrote something like this:

```javascript
Twig.setFilter("trans", function(id, params, domain, locale) {
    return Translator.trans(id, params, domain, locale);
});
```

That seemed to work pretty good until I started to use translation strings with parameters. Parameters were not replaced with their respective values!
The problem laid in a subtle differece on how the BazingaJsTranslationBundle and the standard twig handle parameters. Let's see a simple example.

Suppose we have the string `hello %name%`. With twig we expect to do something like:

```jinja+html
{{ 'hello %name%'|trans({ '%name%' : 'Alice' }) }}
```

Note the `%` delimiters around the parameter name.

The `Translator.trans` method expects an hash map without parameter delimiters in it. So we would have to do something like this:

```javascript
Translator.trans("hello %name%", { 'name' ; 'Alice' });
```
Note that there's no `%` delimiter this time.
The `Translator.trans` method manages the detection of parameters by itself and you can also decide to customize the delimiters by setting the values: `Translator.placeHolderPrefix` and `Translator.placeHolderSuffix`.
Obviously I suggest you to be consistent and use the same placeholders you use with PHP (especially if you need to share templates and translations from the backend to the frontend).

So my final solution was the following:

```javascript
Twig.setFilter("trans", function(id, params, domain, locale) {

    params = params || {};

    // normalizes params (removes placeholder prefixes and suffixes)
    for (var key in params) {
        if (params.hasOwnProperty(key) &&
            key[0] == Translator.placeHolderPrefix &&
            key[key.length - 1] == Translator.placeHolderSuffix) {
            params[key.substr(1,key.length-2)] = params[key];
            delete params[key];
        }
    }

    return Translator.trans(id, params, domain, locale);
});
```

This way it automatically normalizes parameters for the `Translator` object (by removing any delimiter from parameter keys) and I have a consistent behavior between twig and twig.js.
My normalization approach is very rough and you can surely find a better approach (maybe using a regex).
Let me know if you do it ;)

Obviously you can also avoid the normalization and keep the responsibility to pass the parameters hash map in the way the `Translator` object expects it (without delimiters). In this case you can stick to my first implementation.

That's all. See ya ;)
