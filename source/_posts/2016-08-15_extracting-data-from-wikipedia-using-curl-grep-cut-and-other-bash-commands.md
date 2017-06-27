uuid:             297697ad-a954-4135-b80b-466fae20dbaf
layout:           post
title:            'Extracting data from Wikipedia using curl, grep, cut and other shell commands'
slug:             extracting-data-from-wikipedia-using-curl-grep-cut-and-other-bash-commands
subtitle:         null
date:             '2016-08-15T17:17:00.000Z'
updated:          '2016-08-29T22:08:11.000Z'
author:           'Luciano Mammino'
author_slug:      luciano-mammino
header_img:       /content/images/2016/08/extracting-data-from-wikipedia-using-curl-grep-and-other-bash-commands-judo-teddy-riner.jpg
status:           published
language:         en_US
meta_title:       null
meta_description: null
tags:
  - bash
  - shell

---

In this article I am going to show you how I was able to extract and process some information from Wikipedia only using a combination of common bash utilities like `curl` and `grep`.


## The need

If you are a sport lover like me I guess your heart is currently being warmed by the **Rio 2016 Olympic games**. My favourite sport in the games is **Judo** and now that the competitions are over I was wondering who were **the best olympic "judokas" of all the times** by number of medals collected during the games (no matter the kind of medal).
I tried to *google* the answer for a while but it wasn't easy to find an up to date result, so I decided to do some quick research and trying to get to a conclusion by myself. I have to say it was I bit tougher than I expected, but it was definitively fun...


## The dataset

The first thing I needed was a reliable and up to date data source listing all the Judo Olympic medal winners in history. This was easy to find on Wikipedia: [List of Olympic medalists in Judo](https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo).
Anyway the data on this Wikipedia page is structured to be easy to read by humans and not to be processed by a machine. Also I didn't found any way to have the same data in the page in a *csv* or *json* format, so the only viable option was to extract the data by myself from the web page.
At first I thought about creating a quick and dirty [JavaScript](/tag/javascript) command and use some library like [cheerio](https://cheerio.js.org) to extract the data directly from the HTML code of the page, but it sounded like to much of work for the simple goal I had in mind.
So I had another quick look at Wikipedia to find out if there was any better format to extract the information. Going to the *edit* option of the page I realized that parsing the [wikitext](https://www.mediawiki.org/wiki/Markup_spec) (source) of the page would have been much easier and I could even use a regular expression to extract the relevant information from there.
At this stage I wondered if there was a way to get only the wikitext of a specific Wikipedia page. It turns out that it's possible and it's very easy: you just need to append the query parameter `?action=raw` in the url!

So hitting [https://en.wikipedia.org/wiki/List\_of\_Olympic_medalists\_in\_judo?action=raw](https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo?action=raw) will give us our starting dataset which will look like this:

```
==Men==
===Extra Lightweight===
*60&nbsp;kg
{| {{MedalistTable|type=Games}}
|-
|rowspan=2|[[Judo at the 1980 Summer Olympics|1980 Moscow]]<br>{{DetailsLink|Judo at the 1980 Summer Olympics – Men's 60 kg}}
|rowspan=2|{{flagIOCmedalist|[[Thierry Rey]]|FRA|1980 Summer}}
|rowspan=2|{{flagIOCmedalist|[[José Rodríguez (judoka)|José Rodríguez]]|CUB|1980 Summer}}
|{{flagIOCmedalist|[[Tibor Kincses (judoka)|Tibor Kincses]]|HUN|1980 Summer}}
|-
|{{flagIOCmedalist|[[Aramby Emizh]]|URS|1980 Summer}}
|-
|rowspan=2|[[Judo at the 1984 Summer Olympics|1984 Los Angeles]]<br>{{DetailsLink|Judo at the 1984 Summer Olympics – Men's 60 kg}}
|rowspan=2|{{flagIOCmedalist|[[Shinji Hosokawa]]|JPN|1984 Summer}}
|rowspan=2|{{flagIOCmedalist|[[Kim Jae-Yup]]|KOR|1984 Summer}}
|{{flagIOCmedalist|[[Neil Eckersley]]|GBR|1984 Summer}}
|-
|{{flagIOCmedalist|[[Edward Liddie]]|USA|1984 Summer}}
|-
...
```

Note that, for the sake of brevity, from now on I will use `...` to indicates that there's a lot of data that was stripped from the example.

We can easily get this data into our bash shell with `curl`:

```bash
curl -sS "https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo?action=raw"
```

In case you don't know the options `-sS` allow to strip out the download progress output and just print the downloaded data (or any possible error) in the console.

Now that we have our dataset, to compute the result we need to:

  - Extract all the athletes names
  - Count the occurrences of each one of them
  - Reverse order them by the resulting count.

We will do so with a combination of bash commands, bound together using the pipe operator (`|`). Pipes let you use the output of a program as the input of another one, effectively creating a stream of data that is transformed step by step by small and easy to understand operations.


## Extracting data with `grep`

The dataset shown before is just the wikitext code needed to render the tables of athletes that won medals by category and year. So we can easily assume that all the athletes listed in the page are interesting for us.

As you can see every athlete is referenced in the code using the *template* `flagIOCmedalist` and every entry looks like:

```
{{flagIOCmedalist|[[NAME]]|COUNTRY|OLYMPIC GAME}}
```

So we can easily extract all the athletes names with a regex like the following:

```regexp
flagIOCmedalist\|\[\[(.+)\]\]
```

This regular expression behaves as described in the following picture:

![flagIOCmedalist matches the characters flagIOCmedalist literally](/content/images/2016/08/flagIOCmedalist_matches_the_characters_flagIOCmedalist.png)

If you want to understand all the details of this regex you can play with it on [regex101](https://regex101.com/r/cT7nD8/2).

In the shell we can apply a regex to an input data using `grep`. We need to concatenate the output of `curl` to `grep` using the pipe operator (`|`):

```bash
curl ... |  grep -Eoi "flagIOCmedalist\|\[\[(.+)\]\]"
```

With the `grep` we are using the options `-Eoi` which allow us to:

  - `-E`: use a POSIX *extended* regular expression ([ERE](https://en.wikibooks.org/wiki/Regular_Expressions/POSIX-Extended_Regular_Expressions))
  - `-o`: print only the matched (non-empty) parts of a matching line
  - `-i`: case insensitive matching (this is not really needed for our problem, but could allow us to match any case variation of the template reference like `flagiocmedalist` and `FLAGIOCMEDALIST`).

The previous command is going to output something like this:

```nohighlight
flagIOCmedalist|[[Thierry Rey]]
flagIOCmedalist|[[José Rodríguez (judoka)|José Rodríguez]]
flagIOCmedalist|[[Tibor Kincses (judoka)|Tibor Kincses]]
flagIOCmedalist|[[Aramby Emizh]]
...
```

Which, of course, looks kind of ugly. We ideally want to have only the name of every athlete and not all the `template` syntax wrapping it.

Let's try to clean up the data a little bit more.


## Cleaning up the data with `cut`

`cut` is another interesting command line utility that can be used in a whole lot of different ways to extract substrings (or columns) from text.

Using `cut` we can remove all the unneeded text in 3 steps:

  1. remove the prefix `flagIOCmedalist|[[`
  2. remove the suffix `]]`
  3. clean up the names with the "(judo)" disambiguation note. For example from `José Rodríguez (judoka)|José Rodríguez` we want to keep only `José Rodríguez`.


### Substring with `cut`

The complete the first step (removing the prefix `flagIOCmedalist|[[`) we can use the following command:

```bash
... | cut -c"19-"
```

The option `-c"19-"` means: "take the substring that starts from the character number 19 to the end of the string". Character 19 is the 20th character considering that strings are *"0-indexed"*.
You can use the `-c` option to extract any generic substring. For example `-c"4-8"` will extract the substring from the 5th to the 9th character. If you leave the range open on the right it will take all the remaining string to the end.

This filter will be applied to every line and it will modify our stream of data as follows:

```
Thierry Rey]]
José Rodríguez (judoka)|José Rodríguez]]
Tibor Kincses (judoka)|Tibor Kincses]]
Aramby Emizh]]
...
```

### Splitting strings with `cut`

Now we would like to remove the suffix `]]`.
In order to achieve this goal we can use:

```bash
... cut -d \] -f 1
```

This time we are using the options `-d` and `-f`.
When we use `d` we can specify a character to be used as delimiter (`]` in this case), this way `cut` will not split the string by character index but in chunks (or columns), generating a new chunk every time the delimiter is encountered along the line.
The option `-f` can be combined with `-d` to select one or more chunks, in this case we want to select the first chunk.
As we can expect, this will be the status of our data after this command is executed in the pipeline:

```
Thierry Rey
José Rodríguez (judoka)|José Rodríguez
Tibor Kincses (judoka)|Tibor Kincses
Aramby Emizh 
...
```

The data looks almost clean, we just need to get rid of the occasional disambiguation notes. These cases can be distinguished by the character `|` (pipe) that separates the disambiguation definition from the text that must be rendered by the wikitext engine into HTML code. In these cases we want to keep only the part of the string after the pipe character. Again we can use `cut` with the options `-d` and `-f`:

```bash
... | cut -d \| -f 2
```

This time we are using the pipe character as delimiter and we are taking only the second chunk of the string. 
This might seem obvious at this stage, but what happens in all the rows where there's no disambiguation note (and no pipe character)? In this cases we will have just one chunk containing the full line, so what do we get by using the option `-f 2`?
Luckily in these cases `cut` is smart enough to assume the string is not matching our pattern and returns the entire line, so our data is not destroyed.

The final result after this command is:

```
Thierry Rey
José Rodríguez
Tibor Kincses
Aramby Emizh 
...
```

Our data is finally clean! 🎉


## Counting and sorting with `uniq` and `sort`

Now that we have our clean list of names we need to count the occurrences of every athlete and sort.
In order to remove duplicates (and count the occurrences) we can use the command `uniq`. This command, when fed with some text, outputs the text itself with adjacent identical lines collapsed to one.
This means that before we can use `uniq` we need to have all the names sorted alphabetically so that all the athletes with multiple occurrences have their name repeated on multiple lines one after another.
This can be achieved with the command `sort`, which, as you might easily guess, just sorts all the lines received as input in alphabetical order.

Just to give you a practical example, after using the command `sort` our data will look like:

```
...
Paweł Nastula
Peter Seisenbacher
Peter Seisenbacher
Priscilla Gneto
Qin Dongya
Radomir Kovačević
Rafael Silva
Rafael Silva
Rafaela Silva
Ramaz Kharshiladze
...
```

Now we can pipe the `uniq -c` command to our data processing flow in order to remove duplicates. The option `-c` prints in front of every line the number of consecutive occurrences originally found for that line.
After this command we will have something like this:

```
...
1 Paweł Nastula
2 Peter Seisenbacher
1 Priscilla Gneto
1 Qin Dongya
1 Radomir Kovačević
2 Rafael Silva
1 Rafaela Silva
1 Ramaz Kharshiladze
...
```

Note that [Rafael Silva](https://en.wikipedia.org/wiki/Rafael_Silva_(judoka)) and [Rafaela Silva](https://en.wikipedia.org/wiki/Rafaela_Silva) are two different athletes, it's not a typo! 😂

We are almost done. Now we just need to sort our data once again, but this time in reverse order. To do so we can use the `sort` command once again, this time as follows:

```bash
sort -nr
```

Where the option `-n` specifies that the first part of every line is a number (so the command can effectively distinguish and sort lines starting for example with `1` and `10`). The option `-r` instead indicates that we want to sort in revers order (bigger first).

This concludes our pipeline of commands!


## Combining all together

Combining all the commands together, our final pipeline will be the following:

```bash
curl -sS "https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo?action=raw" |\
 grep -Eoi "flagIOCmedalist\|\[\[(.+)\]\]" |\
 cut -c"19-" |\
 cut -d \] -f 1 |\
 cut -d \| -f 2 |\
 sort |\
 uniq -c |\
 sort -nr
```

Now that you understood every single part it shouldn't look very cryptic.

If we execute it, we can finally discover who are the best Judo Olympic athletes up to Rio 2016:

... drum rolls ...

With 4 medals:

  - [Driulis González](https://en.wikipedia.org/wiki/Driulis_González)
  - [Angelo Parisi](https://en.wikipedia.org/wiki/Angelo_Parisi)

With 3 medals:

  - [Teddy Riner](https://en.wikipedia.org/wiki/Teddy_Riner) (The guy in the picture!)
  - [Tadahiro Nomura](https://en.wikipedia.org/wiki/Tadahiro_Nomura)
  - [Ryoko Tamura](https://en.wikipedia.org/wiki/Ryoko_Tani)
  - [Rishod Sobirov](https://en.wikipedia.org/wiki/Rishod_Sobirov)
  - [Mark Huizinga](https://en.wikipedia.org/wiki/Mark_Huizinga)
  - [Idalys Ortiz](https://en.wikipedia.org/wiki/Idalys_Ortiz)
  - [Edith Bosch](https://en.wikipedia.org/wiki/Edith_Bosch)
  - [David Douillet](https://en.wikipedia.org/wiki/David_Douillet)
  - [Amarilis Savón](https://en.wikipedia.org/wiki/Amarilis_Savón)

Lot's of French people there, uh! It's a shame no Italian athlete is there yet! 😉 


## Conclusion

I hope this article showed you that the unix shell is a very powerful tool. If you learn its basic commands and the most common options you will be able to complete a hell of a lot of task directly from the command line by just wisely combining them. You will not need to open an editor and write a long script and then to have an interpreter like [Node.js](/tag/node-js) to run it, sometimes the command line is just enough you need!

If you want to experiment a bit more with this topic, I can propose you a nice variation of this tutorial as exercise:

**Can you compute the ranking of the nations with the highest number of medals?**

If so, please write your solution in the comments 🤓

Until next time!

Cheers


## Alternative approaches

**EXTRA** (Updated on Wed 29th August 2016)

Some people are suggesting interesting alternative solutions. I think it's nice to list them here.


### Improved `grep` with the reset match operator

In the newest versions of Gnu grep (not currently available on Mac!) is possible to use the `\K` operator (reset match). 

`\K` resets the starting point of the reported match. Any previously consumed characters are no longer included in the final match. (See the complete regex on [regex101](https://regex101.com/r/tJ9qI1/1))

With this approach we can rewrite our command as follows, effectively getting rid of all the `cut` commands in the pipeline:

```bash
curl -sS "https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo?action=raw" |\
 grep -Po 'flagIOCmedalist\|\[\[(.* \(judoka\)\|)?\K[^\]]*' |\
 sort |\
 uniq -c |\
 sort -nr
```

Solution suggested by *pakistanprogrammerclub* in the [comments](#comment-2844392299)

### quget

[quget](https://www.npmjs.com/package/quget) is a command line utility authored in [Node.js](/tag/node-js) that brings together the power of famous node packages such as request, cheerio, and jQuery-like CSS selectors to the command-line.

To run the following command you need to have Node.js installed and to install `quget` with `npm i -g quget`:

```bash
quget https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo "#mw-content-text table.wikitable tr:nth-child(n+2) td:nth-child(n+2) a:first-of-type, #mw-content-text table.wikitable tr:nth-child(n+2) td:only-child a:first-of-type" | sort | uniq -c | sort -nr
```

Solution by *ɹɐqooɟ* in the [comments](#comment-2840602442).

*shapeshed* on reddit mentioned [pup](https://github.com/ericchiang/pup) an alternative command written in [Go](/tag/go).


### awk

`awk` is a programming language designed for text processing and typically used as a data extraction and reporting tool. It is a standard feature of most Unix-like operating systems (cit. [Wikipedia](https://en.wikipedia.org/wiki/AWK)).

```bash
curl -sS "https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo?action=raw" | awk -F'\|\\\[\\\[|\\\]' '/flagIOCmedalist/{a[$2]++} END {for (i in a) print a[i], i | "sort -r"}'
```

This didn't work for me on a Mac, but it did work on an Ubuntu machine.

Solution by *Boris P.* on Facebook.


### sed

`sed` (stream editor) is a Unix utility that parses and transforms text, using a simple, compact programming language. (See more on [Wikipedia](https://en.wikipedia.org/wiki/Sed)).

We can use `sed` as an alternative to grep to extract the names of the judokas in one shot. Our final command will look like:

```bash
curl -sS "https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo?action=raw" | sed -n '/flagIOCmedalist/{s/^.*\[\[//; s/\]\].*//; s/^.*|//;p}' | sort | uniq -c | sort -nr
```

This approach doesn't seem to be working on Mac tough.

Solution suggested by *pakistanprogrammerclub* in the [comments](#comment-2844392299)


### In-Browser developer console

You can extract data from the current web page using the developer console that most browsers offer (Chrome, Opera, Firefox...). After opening [our Wikipedia page of interest](https://en.wikipedia.org/wiki/List_of_Olympic_medalists_in_judo), in the developer console you can run the following [JavaScript](/tag/javascript) one-liner:

```javascript
[].slice.call(document.querySelectorAll('table tr td:nth-child(n+2) > a:nth-child(1), table tr:nth-child(3) td > a:nth-child(1)')).map(function(e) { return e.innerText; }).reduce(function(res,el) { res[el] = res[el] ? res[el] + 1 : 1; return res; }, {});
```

The result is an object with the medalists as keys, and the count as values. JavaScript objects are unordered so sorting is left as an exercise for the reader.

Solution by *lacksconfidence* on [HackerNews](https://news.ycombinator.com/item?id=12293209)


### XPath and Google Spreadsheet or Python

XPath (XML Path Language) is a query language for selecting nodes from an XML document (cit. [Wikipedia](https://en.wikipedia.org/wiki/XPath)).

By downloading the HTML of the Wikipedia page and applying an XPath selector like `//table//tr/td[2]/a[1]/text()` we should be able to extract all the gold medalist in the tables. In the same fashion we can build a slightly more complex solution by combining more selectors:

```xpath
//table//tr/td[2]/a[1]/text()|//table//tr/td[3]/a[1]/text()|//table//tr/td[4]/a[1]/text()
```

With this approach we can easily import data into a spreadsheet software like Google Spreadsheet. In Google Spreadsheet we can use the function `IMPORTXML` to run an XPath expression against an XML or HTML document available on a given URL.

I created an [example document](https://docs.google.com/spreadsheets/d/1VVFIGFcmuVpDRBR9xKe-s_T4tJk0-tLcvuf_gKVuKfA/edit?usp=sharing) that you can check out if you are curious to see this feature in action.

Solution based on comments by *turtlebits* and *san_dimitri* on [HackerNews](https://news.ycombinator.com/item?id=12294667).

I'm glad to know I inspired [Nikolai Hampton](https://twitter.com/@NikolaiHampton) to write an [amazing article](http://3583bytesready.net/2016/08/17/scraping-data-python-xpath/) that illustrates how to solve this problem using XPath expressions in **Python**. If you like Python the article is absolutely a must, don't miss it out!
