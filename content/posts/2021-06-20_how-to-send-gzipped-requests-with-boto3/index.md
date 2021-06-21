---
uuid: 90be2802-c883-4757-8875-02b7fc8609ca
layout: post
title: "How to send gzipped requests with boto3"
slug: "how-to-send-gzipped-requests-with-boto3"
subtitle: null
date: "2021-06-22T18:50:00.000Z"
updated: "2021-06-22T18:50:00.000Z"
author: Luciano Mammino
author_slug: luciano-mammino
header_img: "./how-to-send-gzipped-requests-with-boto3-luciano-mammino-loige.jpg"
fb_img: "./how-to-send-gzipped-requests-with-boto3-fb.png"
tw_img: "./how-to-send-gzipped-requests-with-boto3-tw.png"
status: published
language: en_US
meta_title: null
meta_description: null
written_with: []
tags:
  - python
  - aws
---

I recently needed to send a big payload to CloudWatch and I managed to increase my chances of staying within the AWS payload size limit by using gzip encoding on the request body with `boto3`.

Unfortunately, with `boto3`, gzip encoding is not enbled by default and it can't be turned on with some simple boolean flag. To make things worse, as of today, there isn't a great body of documentation or examples available on how to achieve this. Or maybe I am just terrible at _googling_...

I had to go down the rabbit hole to figure out how to support this use case and, in this article, I want to share what I learned with you.


## Send gzipped metrics to CloudWatch using boto3 

Ok, this is the TLDR; a little gift for the ones in a rush that are looking for a quick _copy-pastable_ solution.

Be aware that the various AWS SDKs are just a convenience layer in front of the AWS HTTP API. Python and `boto3` are no exception. Every time you are calling a method on a `boto3` client, you are just sending HTTP requests to AWS behind the scenes...

This is how you can intercept and modify such HTTP requests, before they are sent to AWS:

  1. `boto3` has a built-in event system that, among other things, it allows you to intercept (and even modify) HTTP requests that are ready to be forwarded to AWS.
  2. By using this event system, you can implement an event handler that takes the payload of an outgoing requests and gzips it. The same handler can also alter the set of outgoing HTTP headers so that it can indicate the request is gzipped by adding the header `Content-Encoding: gzip`.

Here is a code example that uses a CloudWatch client, intercepts calls to the `PutMetricData` API and gzips the request payload:


```python
import boto3
import gzip

# Create a CloudWatch client
cw_client = boto3.client('cloudwatch')

# Get a reference to the event system for that client
event_system = cw_client.meta.events

# Event handler that takes an arbitrary request and gzips its body
def gzip_request_body(request, **kwargs):
    gzipped_body = gzip.compress(request.body)
    request.headers['Content-Encoding'] = 'gzip'
    request.data = gzipped_body
    return request

# Register the event handler (only for CloudWatch PutMetricData!)
event_system.register('before-sign.cloudwatch.PutMetricData', gzip_request_body)

# Sends a request
cw_client.put_metric_data(
    MetricData = [
        {
            'MetricName': 'KPIs',
            'Dimensions': [
                {
                    'Name': 'PURCHASES_SERVICE',
                    'Value': 'CoolService'
                },
                {
                    'Name': 'APP_VERSION',
                    'Value': '1.0'
                },
            ],
            'Unit': 'None',
            'Value': 217
        },
    ],
    Namespace='CoolApp'
)
```

You are welcome! 😜

Now, if you are curious to know more about my use case and how the `boto3` events system works you are more than welcome to keep reading the rest of the article.


## The use case: sending custom metrics to CloudWatch

Last week, during my work at [fourTheorem](https://www.fourtheorem.com/), we started to get intermittent alarms for a Lambda in our stack that was failing because of requests to CloudWatch being occasionally throttled.

Once we looked at the error, the problem was actually quite obvious, but let me give you a simplified overview of what we are doing with this Lambda.

This Lambda is triggered by a Kinesis stream in which we publish custom metric data from all the other components of our application. The Lambda reads these metrics and publish them to CloudWatch using the [`PutMetricData` API](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_PutMetricData.html).

![Schematic of a Kinesis stream being processed by a Lambda to collect metrics and send them to CloudWatch](./boto3-custom-metrics-kinesis-lambda-cloudwatch.jpg)

The issue is that, in our original implementation we took the naive approach of submitting 1 data point at the time. Therefore, under load, we would be sending a large number of HTTP requests per second to AWS and we might end up being throttled.

The solution to the problem is actually quite simple: we can reduce the total number of HTTP requests by sending batche containing multiple data points, rather then sending them one by one.

This is actually possible by using the same `PutMetricData` API from CloudWatch.


## CloudWatch `PutMetricData` limits

So apparently the solution is simple: we just need to send multiple data points for every single `PutMetricData` call. But how many?

A call to this API accepts an array of metrics that looks like this:

```python
[
    {
        'MetricName': 'SomeMetric1',
        'Dimensions': [
            {
                'Name': 'Dimension1Name',
                'Value': 'Dimension1Value'
            },
            # Up to other 9 dimensions here ...
        ],
        'Unit': 'Count',
        'Values': [217, 220, 221], # Up to 150 items here ...
        'Timestamp': 1624290910000
    },
    # Up to other 19 metric items here ...
]
```

More details can be found in the documentation for the [`MetricDatum` type](https://docs.aws.amazon.com/AmazonCloudWatch/latest/APIReference/API_MetricDatum.html).

As you can tell from the comments in the snippet above, the API has some interesting limits to be considered:

  - Up to **20** different metrics
  - Up to **10** dimensions per metric
  - Up to **150 values** per metric
  - Up to **40 KB** in size for HTTP POST requests

So, the best case scenario to reduce the number of `PutMetricData` requests is to have batches of 20 metrics, but we need to make sure that all this data, once encoded, fits in 40 KB.

The `PutMetricData` documentation also mentions:

> Each PutMetricData request is limited to 40 KB in size for HTTP POST requests. You can send a payload compressed by gzip

Splitting the metrics in chunks of 20 is not a big deal, but how do we make sure all the other constrainsts are respected. Especially the payload size one.

It would be convenient to use gzip compression to increase our chances to stay within boundaries.

At this point I thought _"Ok, probably `boto3` is automatically doing the compression for us, because why not?"_

But if you have used AWS for long enough, you learn not to give too many things for granted, so... Let's test this assumption!


## Testing `boto3` default behaviour

Testing the client with local debug server
...


## The `boto3` events system

...


## An even more defensive and reliable solution

Try except and if it fails split the data in 2 requests

...


## Conclusion

...

Bye!