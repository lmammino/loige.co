---
uuid: 0810502c-a477-47fb-8f1b-a00de4e61241
layout: post
title: >-
  AWS Command line: S3 content from stdin or to stdout
slug: aws-command-line-s3-content-from-stdin-or-to-stdout
subtitle: null
date: 2018-05-05T12:00:14.000Z
updated: 2018-05-06T09:55:40.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: my-blog/src/posts/2018-05-05_aws-command-line-s3-content-from-stdin-or-to-stdout/aws-command-line-s3-content-from-stdin-or-to-stdout-loige-co-luciano-mammino.jpg
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - aws
  - bash
  - shell
---

This article presents a quick tip that will help you deal with the content of files in S3 through the AWS command line in a much faster and simpler way.

Did you ever want to simply print the content of a file in S3 from your command line and maybe pipe the output to another command? Or maybe, did you ever needed to pipe the standard output of a sequence of commands directly into a file in S3? I had this need multiple times and, before my amazing colleague Paul made me discover the tip I am about to describe here, I was always using intermediary files to keep track of the input and output of S3 files.


## Some examples

Let's make few practical examples to make this use case easier to grasp.

Imagine you have a PostgreSQL database containing GeoIP data and you want to dump all the data to a CSV, gzip it and store it an S3 bucket.

This is how I used to solve this problem:

```bash
# dump the data from PostgreSQL to a compressed csv
psql -U user -d db_name -c "Copy (Select * From geoip_v4) To STDOUT With CSV HEADER DELIMITER ',';" | gzip > geoip_v4_data.csv.gz
# upload the resulting file to S3
aws s3 cp geoip_v4_data.csv.gz s3://my-amazing-bucket/geoip_v4_data.csv.gz
```

At some point in the future, you probably want to read the file from S3 and search for a given CIDR in the content of the file. Again, this is how I would have solved this problem:

```bash
# download the file from S3
aws s3 cp s3://my-amazing-bucket/geoip_v4_data.csv.gz .
# decompress the file and search inside it
gunzip -c geoip_v4_data.csv.gz | grep "1.0.8.0/21"
```

In both cases, I am creating intermediary files and, as you probably already know,  this is not ideal for many reasons. Just to name few, this is a slower operation (not fully stream-able), it takes extra space on disk (imagine you have to deal with very big files), finally, it also needs an extra command. Wouldn't it be great if we could solve both problems by writing a single pipeline of commands?

## The "magic" `-` option in `aws cp`

Buried at the very bottom of the `aws s3 cp` command help you might (by accident) find this:

```plain
Uploading a local file stream to S3

  WARNING:: PowerShell may alter the encoding of or add a CRLF  to  piped
  input.

  The  following  cp  command  uploads  a local file stream from standard
  input to a specified bucket and key:

    aws s3 cp - s3://mybucket/stream.txt

Downloading an S3 object as a local file stream

  WARNING:: PowerShell may alter the encoding of or add a CRLF  to  piped
  or redirected output.

  The  following cp command downloads an S3 object locally as a stream to
  standard output. Downloading as a stream is  not  currently  compatible
  with the --recursive parameter:

    aws s3 cp s3://mybucket/stream.txt -
```

To make it simple, when running `aws s3 cp` you can use the special argument `-` to indicate the content of the standard input or the content of the standard output (depending on where you put the special argument).


## Writing to S3 from the standard output

Using this newly acquired piece of knowledge, we now know we can do something like this to write content from the standard output directly to a file in S3:

```bash
cat "hello world" | aws s3 cp - s3://some-bucket/hello.txt
```

This way we can rewrite the solution to our first problem as follows:

```bash
psql -U user -d db_name -c "Copy (Select * From geoip_v4) To STDOUT With CSV HEADER DELIMITER ',';" | gzip | aws s3 cp - s3://my-amazing-bucket/geoip_v4_data.csv.gz
```

This time no intermediary file is created and the data from the gzipped file is immediately streamed to S3 as soon as the first bytes start to be available.


## Using data from S3 as input for other commands

The magic `-` argument can be used also to read the content of files in s3 and pass it in the standard output, for instance, you could do the following:

```bash
aws s3 cp s3://some-bucket/hello.txt -
```

This will output:

```
hello world
```

Let's use this option to rewrite the solution to our second problem as a one-liner:

```bash
aws s3 cp s3://my-amazing-bucket/geoip_v4_data.csv.gz - | gunzip -c geoip_v4_data.csv.gz | grep "1.0.8.0/21"
```

This approach looks much similar to what you would do with a local file and makes integrating other commands seamless with the content of files available in your S3 storage.


## Pipeline processing of S3 files

We can combine the learnings from the previous two sections to build processing pipelines for S3 files.

Just to give you a practical example, imagine you have to optimize a png image available in an S3 bucket and save the resulting image in a new bucket.

To optimize an image we can use [`imagemin`](https://github.com/imagemin/imagemin-cli) which accepts an image in the standard input and returns the optimized image content through the standard output.

Assuming we have our source image in `s3://my-images/image.png` and we want to save the optimized version in `s3://my-images-optimized/image.png`, we can write the pipeline as follows:

```bash
aws s3 cp s3://my-images/image.png - | imagemin | aws s3 cp - s3://my-images-optimized/image.png
```

What will happen behind the scene with this pipeline of commands is the following:

  1. S3 will start to stream the binary content of `s3://my-images/image.png` to the standard output
  2. The standard output is then piped to `imagemin` and used as input stream
  3. `imagemin` will start immediately to process the stream and produce an output stream representing the optimized image
  4. This output stream is then piped to the AWS CLI again and the `s3 cp` command will start to write it to the destination bucket.

No intermediary file is created in the executing machine and the content is just kept in memory in a streaming fashion during the different phases of the pipeline.


## The 5GB caveat

If you are writing to S3 files that are bigger than 5GB, you have to use the `--expected-size` option so that AWS CLI can calculate the proper number of parts in the multi-part upload. If you don't do this you'll exceed the number of parts allowed in a multi-part upload and your request will fail.

From the [AWS CLI Documentation](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html):

> `--expected-size` (string): This argument specifies the expected size of a stream in terms of bytes. Note that this argument is needed only when a stream is being uploaded to s3 and the size is larger than 5GB. Failure to include this argument under these conditions may result in a failed upload due to too many parts in the upload.

`--expected-size` should be equal or greater than the size of the upload and it doesn't have to be perfect. Just close enough.

(Thanks to mahinka for this suggestion)


## That's all folks

I hope this little trick is going be useful to you and that it will allow you to use S3 in a much similar way to how you would use a local file system.

I am really curious to know what kind of use cases you might come up with, so please, let me know in the comments here if you'll ever use the nifty `-` option in the `aws s3 cp` command line utility.

I really look forward to hearing from you!

Special thanks to Paul for making me discover this trick and to [mahinka](https://www.reddit.com/user/mahinka) and [paul345](https://www.reddit.com/user/paul345) (on [Reddit](https://www.reddit.com/r/aws/comments/8h73uf/aws_command_line_s3_content_from_stdin_or_to/)) for corrections and suggestions.

Until next time, ciao! 👋
