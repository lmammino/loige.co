---
uuid: 6a238e13-01dc-4611-8154-0b75c5a9fe9e
layout: post
title: "Provision an Ubuntu-based EC2 instance with CDK"
slug: "provision-ubuntu-ec2-with-cdk"
subtitle: null
date: "2021-08-04T18:20:00.000Z"
updated: "2021-08-04T13:00:00.000Z"
author: Luciano Mammino
author_slug: luciano-mammino
header_img: "./provision-ubuntu-ec2-with-cdk-luciano-mammino-loige.jpg"
fb_img: "./provision-ubuntu-ec2-with-cdk-fb.png"
tw_img: "./provision-ubuntu-ec2-with-cdk-tw.png"
status: published
language: en_US
meta_title: null
meta_description: null
written_with: []
tags:
  - aws
  - cdk
  - javascript
  - typescript
---

You are using CDK and you need to provision an EC2 instance. What if you prefer to use **Ubuntu** over **Amazon Linux**? In this short article we will see exactly how to do that!

I have to be honest, I am more on the Ubuntu camp then I am in the Amazon Linux one... It's a subjective preference. I just find myself more comfortable with `apt`, `snap`, `systemd` and other Ubuntu nuances than I am with `yum` and other things in Amazon Linux. Plus, I find just easier in general to find resources regarding how to do all sort of things with Ubuntu.

So, the story goes that I was playing with CDK and I was trying to deploy a simple Node.js application to an EC2 instance. All the examples I could find were all using Amazon Linux, but I thought it wouldn't be too complicated to switch to Ubuntu instead. I already had a Systemd service definition written for my app and a script to install all dependencies using `apt`.

How hard could it be to use Ubuntu? It turns out there are some dark corners and the necessary documentation is scattered around the web. I will try to document my finding and provide a complete example in this article. We will also see how to install the `aws` CLI and other necessary AWS utilities in our Ubuntu-based virtual machine.


## What is CDK

Ok, if you know CDK already, you can just skip this section. If you don't, how in the world wide web did you end up in this page? 😅

[CDK](https://aws.amazon.com/cdk/) stands for **Cloud Development Kit** and it's a relatively new tool from Amazon to write infrastructure as code (_IaC_). It is thought to help you to define all your cloud infrastructure programmatically so you can keep it versioned and you can have reproducible deployments. If you use CDK you won't have to go in the AWS web console and click around to provision resources, you'll write code and use command line tools to do all of that for you.

If you have used tools like **Terraform** or **CloudFormation** already, CDK addresses the same type of problems. What's different with CDK is that you don't have to write tons of JSON, Yaml or even learn a new markup language such as [HCL](https://github.com/hashicorp/hcl).

With CDK you can use your favourite programming language (TypeScript, Python, Java and C# are supported right now) and you can define your cloud infrastructure by instantiating objects.

Just to give you an example, this is how you can create a new SSM parameter using CDK (TypeScript):

```typescript
import * as ssm from '@aws-cdk/aws-ssm'

new ssm.StringParameter(stack, 'Parameter', {
  allowedPattern: '.*',
  description: 'The value Foo',
  parameterName: 'FooParameter',
  stringValue: 'Foo',
  tier: ssm.ParameterTier.ADVANCED,
})
```

You can probably agree already that the main advantage of CDK is that you'll be able to use your favourite language, your favourite code editor or IDE and get other nice things like syntax highligting, type checking, auto-completion, etc.

I have found that there's much less guess work or "writing configuration by trial and error" when using CDK as opposed to writing plain CloudFormation configuration or using Terraform.

It's worth knowing that CDK is not a standalone tool, but it's an abstraction built on top of CloudFormation. So when you _synthesise_ (which is how you say _compile_ in CDK lingo) a CDK stack, you actually get a CloudFormation stack. When you run `cdk deploy` you are actually deploying that stack with CloudFormation. This way, you still get all the benefits of CloudFormation, but you also get a nicer way to write down your infrastructure as code.

If you want to know how to get started with CDK check out the official guide [Getting started with the AWS CDK](https://docs.aws.amazon.com/cdk/latest/guide/getting_started.html).


## Defining An EC2 resource with CDK

From here, I am assuming you have already installed CDK and generated a project with `cdk init`.

In order to be able to provision and EC2 instance with CDK using TypeScript we need first to install the package `@aws-cdk/aws-ec2`:

```bash
npm i --save @aws-cdk/aws-ec2
```

Then we can define the instance in a Stack with the following code (intentionally incomplete):

```typescript
import * as cdk from '@aws-cdk/core'
import * as ec2 from '@aws-cdk/aws-ec2'

export class MyAppStack extends cdk.Stack {
  const defaultVpc = ec2.Vpc.fromLookup(this, 'VPC', {
    isDefault: true,
  })

  const myVm = new ec2.Instance(this, 'myVm', {
    // the type of instance to deploy (e.g. a 't2.micro')
    instanceType: new ec2.InstanceType('t2.micro'),
    // the id of the image to use for the instance
    machineImage: someAmiId,
    // A reference to the object representing the VPC
    // you want to deploy the instance into
    vpc: defaultVpc
    // ... more configuration
  })
}
```

As you can see there 3 mandatory pieces of information we need to provide:

  - The [type of EC2 instance](https://aws.amazon.com/ec2/instance-types/) we want to run (i.e. `t2.micro`)
  - The id of the machine image (more on this in the next section)
  - The id of the VPC (Virtual Private Cloud) where you want to deploy your instance. For example, in the example above we are using the default VPC for your AWS account.

You can also specify a ton of other optional configuration options (Security Groups, a role for IAM permissions, volumes, etc). For a full list of supported options you can check out [the official documentation for the CDK EC2 Instance construct](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_aws-ec2.Instance.html).


## Ubuntu AMIs and where to find them

When provisioning EC2 instances on AWS you have to provide a virtual machine image (an _AMI_ in AWS lingo). You can build and manage your own private images or use one of the many public images for different Linux distributions.

There's an entire website dedicated to finding public AMIs for just Ubuntu: [Ubuntu Amazon EC2 AMI Locator](https://cloud-images.ubuntu.com/locator/ec2/).

Every image is built for a specific AWS region, processor architecture and instance type. Every image is identified by a unique ID called _AMI-ID_.

When provisioning a new EC2 instance you need to specify the wantend _AMI-ID_ and make sure to select the correct one for the region you are deploying your istance to.

TODO: FROM HERE.

  - Explain that if you want to specify a straight id you need to provide a map per region
  - Explain the approach using public SSM parameters


## A simple EC2 instance with Ubuntu

TODO:

  - Show naive approach by using SSM
  - Show failure because of missing CloudFormation Signal


## Installing AWS Linux Utilities on an Ubuntu Image

TODO:

  - Show how to add user data
  - Show working deployment
  - Show how to also install aws cli


## Conclusion

TODO:

  - Recap
  - Mention more complete example in repo
