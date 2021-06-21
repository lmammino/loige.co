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

I recently needed to send a big payload to CloudWatch and I managed to increase my chances of staying within the AWS payload size limits by using gzip encoding on the request body with `boto3`.

Unfortunately, with `boto3`, gzip encoding is not enbled by default nor can be turned on with some configuration. What's worse is that, as of today, there isn't a great body of documentation or examples available on how to achieve this.

I had to go down the rabbit hole to figure out how to support this use case and, in this article, I want to share what I learned with you.


## Send gzipped metrics to CloudWatch using boto3 

Ok, this is the TLDR; for the ones that just need a quick solution that they can copy and paste:

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

...


## CloudWatch `PutMetricData` limits

...


## Testing `boto3` default behaviour

Testing the client with local debug server
...


## The `boto3` events system

...


## An even more defensive and reliable solution

Try except and if it fails split the data in 2 requests

...


## Sketching and testing a solution

...

## Conclusion

...

Bye!