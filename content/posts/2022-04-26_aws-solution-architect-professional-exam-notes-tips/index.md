---
uuid: 5ce59e16-7ffd-43a5-8038-da09e7b565bf
layout: post
title: >-
  AWS Solution Architect Professional exam, my notes and tips
slug: aws-solution-architect-professional-exam-notes-tips
subtitle: null
date: 2022-04-26T18:20:00.000Z
updated: 2022-04-26T18:20:00.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./aws-solution-architect-professional-exam-notes-tips.jpg
fb_img: ./aws-solution-architect-professional-exam-notes-tips-fb.png
tw_img: ./aws-solution-architect-professional-exam-notes-tips-tw.png
status: published
language: en_US
meta_title: null
meta_description: null
tags:
  - aws
---

Hello everyone, I am really happy to share with you that I recently got my AWS Solution Architect Professional certification (SAP-C01) 🎉

In this article I talk about my experience with the exam, how I prepared for it and share a few tips that can, hopefully, help you if you are preparing for the exam.

## Who is the AWS Solution Architect Professional certification for

I'd recommend you embarking on this challenge only if you already have a few years of AWS experience and you already managed to explore a few different services and different types of architectures.

This certification is for those who want to have a comprehensive view of what's possible with AWS and that are aiming to be able to advise about the best architectures for specific problems.

In my view, this certification is for you if you are working as a **AWS cloud consultant** (or you want to be one) or you are aiming to get an **architect** role at a company with a significant footprint on AWS.

If you have already taken other AWS certifications that would also be very beneficial for you. This is probably the hardest of AWS certification so having experienced the whole process with other AWS certifications will help.

In my case, [I took the AWS Solution Architect associate certification](/aws-solution-architect-associate-exam-notes-tips) 3 years ago. If you have less than 2 years of experience with AWS, I'd recommend taking this other certification first. You can read [my notes and tips](/aws-solution-architect-associate-exam-notes-tips) about that particular experience!


## Exam Structure

The AWS Solution Architect is probably the thoughest exams I had to do to get an IT certification.

The exam is not easy, it requires quite a lot of focus.

There are tons of questions, every question is very verbose and getting the right answer while trying to manage your time, can be challenging. On top of that, you need a very broad knowledge about AWS services and different types of architectural concerns.

The exam is a multiple answer question. In it's current incarnation (2022) there are **75 questions** and you have **3 hours** to complete it. This gives you about 2 minutes per question.

If you think that's plenty of time, let's have a look at one of the example questions. Start a time, NOW! ⏱

> **A company has two AWS accounts: one for production workloads and one for development workloads.
> Creating and managing these workloads are a development team and an operations team. The company
> needs a security strategy that meets the following requirements:**
> 
> - **Developers need to create and delete development application infrastructure.**
> - **Operators need to create and delete both development and production application infrastructure.**
> - **Developers should have no access to production infrastructure.**
> - **All users should have a single set of AWS credentials.**
> 
> **What strategy meets these requirements?**
>
> - A) In the development account:
>   - Create a development IAM group with the ability to create and delete application infrastructure.
>   - Create an IAM user for each operator and developer and assign them to the development group.
>   In the production account:
>   - Create an operations IAM group with the ability to create and delete application infrastructure.
>   - Create an IAM user for each operator and assign them to the operations group.
> - B) In the development account:
>   - Create a development IAM group with the ability to create and delete application infrastructure.
>   - Create an IAM user for each developer and assign them to the development group.
>   - Create an IAM user for each operator and assign them to the development group and the operations group in the production account.
>   In the production account:
>   - Create an operations IAM group with the ability to create and delete application infrastructure.
> - C) In the development account:
>   - Create a shared IAM role with the ability to create and delete application infrastructure in the production account.
>   - Create a development IAM group with the ability to create and delete application infrastructure.
>   - Create an operations IAM group with the ability to assume the shared role.
>   - Create an IAM user for each developer and assign them to the development group.
>   - Create an IAM user for each operator and assign them to the development group and the operations group.
> - D) In the development account:
>   - Create a development IAM group with the ability to create and delete application infrastructure.
>   - Create an operations IAM group with the ability to assume the shared role in the production account.
>   - Create an IAM user for each developer and assign them to the development group.
>   - Create an IAM user for each operator and assign them to the development group and the operations group.
>   In the production account:
>   - Create a shared IAM role with the ability to create and delete application infrastructure.
>   - Add the development account to the trust policy for the shared role.

OK, time off! ⏱

How long did it take you to read and make sense of this literal wall of text?! Do you already know what's the right answer? 😅

I am probably slow at reading, but it took me about 2 minutes just to read this!

Some questions are even trickier because you'll need to pick more than one answer!

The point is that you'll need to be able to decide on your answer fast. And you will also need to be able to keep your focus for 3 hours straight!

**🔥 First tip**: if English is not your primary language you can request extra time when booking your exam, or do the exam in other languages (French, German, Italian, Japanese, Korean, Portuguese, Simplified Chinese, or Spanish).

I didn't think I needed this and I went for the English version without extra time. I had to rush through the last 5 questions, so, in retrospective, it was a mistake not to take advantage of this!

I'll share a few more tips to maximise your chances of succes later in this article!

Meanwhile, if you are curious to see more example questions, there is an [official set of example questions for the Solution Architect Professional exam provided by AWS](https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Sample-Questions.pdf).


## Exam topics and required knowledge

There are 5 *domains* of knowledge in which the various questions are grouped:

  - **Domain 1**: Design for Organizational Complexity (12.5% of the exam)
  - **Domain 2**: Design for New Solutions (31%  of the exam)
  - **Domain 3**: Migration Planning (15%  of the exam)
  - **Domain 4**: Cost Control (12.5%  of the exam)
  - **Domain 5**: Continuous Improvement (29%  of the exam)

In terms of overall knowledge, these are some of the topics that AWS recommends you to be comfortable with before taking the exam:

  - Familiarity with AWS CLI and APIs.
  - Be comfortable with CloudFormation.
  - Be able to understand Billing and to use the web console.
  - Know how to use a scripting language.
  - Know enough about running applications on Windows and Linux systems and how to keep them up to date.
  - Ability to provide guidance on the architectural design across multiple applications and projects of the enterprise as well as an ability to map business objectives to application/architecture requirements.
  - Ability to evaluate cloud application requirements and make architectural recommendations for implementation, deployment, and provisioning applications on AWS.
  - Ability to design a hybrid architecture using key AWS technologies (e.g., VPN, AWS Direct Connect) as well as a continuous integration and deployment process.
  - Be able to explain and apply the five pillars of the AWS Well-Architected Framework.
  - Architect a continuous integration/continuous delivery (CI/CD) process.

Yes, it's quite a big surface of knowledge and this is probably not even a comprehensive list.

If you want a bit more detail on what kind of topics and services you need to be comfortable with you can Download the [official Solution Architect Professional exam guide](https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf).


## Preparation

Ok, if you are still up for this, let's see how you can prepare yourself to smash this challenging exam! 💪

Well... unfortunately, I don't think there is a bullet-proof method to pass this exam. This exam takes a good mixture of expertise, focus and (of course) a bit of luck. You should do your best to arrive prepared at the exam, but I also recommend you account for a good chance of failure. It's not a shame to fail the exam and you can always try it again later.

So, how did I prepare myself?

I have been lucky to have been exposed quite a lot to various AWS projects in the last 5-6 years. This has given me a good breadth of knowledge and confidence. I have been working in a mixture of roles shifting from software engineering to architecture. I have architected, built and deployed serverless solutions, but also more traditional solutions based on EC2 instances and containers. I also had numerous chances to explore event driven architectures and use services like SQS, SNS, EventBridge and Kinesis.

With that being said, I don't think this amount of practical experience was nearly enough to walk into the exam!

But how did I know that? Well, I didn't... I was actually quite confident about my skills at first! Until I got knocked out by the first exam simulation...


### Exam simulations

The first thing you should really do to asses where you stand is to take an exam simulation. An exam simulation will present you 75 questions similar to the ones you might find during the real exam and you'll have 3 hours to answer them.

Those simulations are available on a number of platforms. I have tried 2 of them:

  - [AWS Certified Solutions Architect Professional Practice Exam](https://www.udemy.com/course/aws-solutions-architect-professional-practice-exams-amazon/) on Udemy, by Jon Bonso (Tutorials Dojo).
  - AWS Certified Solutions Architect - Professional 2020 on [A Cloud Guru](https://acloudguru.com/), by Scott Pletcher.

I really liked the Udemy ones for several reasons.

First of all, you can pause your exam. I know this is not really realistic, but it's a great way to allow you to practice even when you don't have a block of 3 full hours available to you.

Secondly, at the end of a simulation, you get an overview of all the questions. For every question you get a quite lengthy explaination about how you should have interpreted the question and a walkthrough over all the possible answer. This can teach you how to analyse questions and answers and it will help you train the right muscles to spot correct answers and recognize and avoid wrong answers (*distractors*).

Once you complete a simulation you can assess where you stand against the different domains of the exam. Where you weakness and strengths lies and where you need to study and practice more.

The Udemy course gives you four different variations of the exam, so you get a total of 300 questions to practice with!


### Study material

Once you have identified your gaps, you need to study!

I found A Cloud Guru to be one of the best resources out there. The AWS Certified Solutions Architect Professional course by Scott Pletcher is very broad and informative. Scott keeps it quite entertaining with occasional stories and jokes and there are quite a few interactive labs for you to practice what you learn through the course.

Doing the full course could be quite time consuming (almost 30 hours of video content!), but if you are in a rush you can only pick the chapters that you need the most. That table of contents is really well structured and you can easily jump around.

One caveat is that what A Cloud Guru gives you is not necessarily enough. In some cases the videos and the labs only scratch the surface of certain topics and you might still struggle to answer some of the question.

In those cases, Scott is very upfront and gives you a bunch of additional study material published for free directly from AWS. Make sure not to ignore these papers because they can make a big difference in your understanding of AWS and in getting you ready for the exam!

Another great resource is AWS Skill Builders, which has an entire section on [Exam Readiness: AWS Certified Solutions Architect – Professional](https://explore.skillbuilder.aws/learn/course/external/view/elearning/34/exam-readiness-aws-certified-solutions-architect-professional?sap=sec&sec=prep).

I only skimmed through this one, so I can't vouch 100% for this, but it seems like a great FREE alternative to what A Cloud Guru can offer.

Check out also the FAQ and the White Papers published on the [official page for the AWS Certified Solutions Architect - Professional certification](https://aws.amazon.com/certification/certified-solutions-architect-professional/).


## Recommended strategy

Here's my very personal recommendation on how to prepare and approach the exam.

### Before the exam

  1. Do a couple of exam simulations on Udemy.
  2. Don't worry too much about your score (I failed almost all of them!), but focus on the questions you failed. Read the explanation and make sure to understand if you need to research more about the topic.
  3. Compile a list of all the topics you need to research more about (your gaps).
  4. Find study material (A Cloud Guru, YouTube, official AWS material, etc.) and try to fill the gaps.
  5. Do more exam simulations.
  6. Try to do a couple more of exam simulations without pausing the exam.
  7. Don't wait for your simulation score to be over 75% before you try the real exam, just make sure your score has improved and that you feel much more confident.


### During the exam

  1. Read the question carefully and try to understand what are the main keywords and what's the context. After a few simulations you should know what to expect and you should be able to skim through the question quickly.
  2. But if you feel you haven't fully understood the question take the time to read it again.
  3. Manage your time. Ideally you shouldn't be spending more than 2 minutes per question, but sometimes there are question that require you more time. Don't stress too much out if you are taking to long for a given question, there will be questions that you'll be able to answer in less than 2 minutes and those will help you to balance things out. Make sure though not to spend too much time on a given question. If it's taking you more than 4 minutes, you should probably skip it (or even better give a temporary answer) and come back to it later.
  4. You can flag questions for review. This means that flagged questions will be highlighted and it will be easier for you to get back to them if you have extra time and want to review the answer.
  5. A lot of questions don't have absolutely objective answers. Actually most questions are arguable (in my opinion). In those cases try to go by exclusion and find reasons not to pick particular answers. Try also to wear the hat of AWS: ask yourself *what would AWS itself most likely recommend?*

### After the exam

  1. If you passed it... well, good job! Time to brag with your friends and co-workers and celebrate!
  2. If you didn't pass it... no worries! You have probably learned a lot anyway. Go back to more simulations and study material and try again in a few months! Next time will certainly go better!


## My Study notes

Here's a list of notes about topics that I didn't really know about and I had to research a little bit. This is no way comprehensive but maybe it can help you to find gaps in your knowledge. I basically build this list out of answers I failed during the simulations, so these were basically part of my knowledge gaps!

### Alexa for business

- A service that allows you to provision Alexa Echo devices for office use.
- Can be integrated with office resources (e.g. calendar, room booking systems, shared files, video conference tools, etc.).
- Then Echo devices can be used to answer business questions, book meetings or other resources.

### Amazon Connect

-  Cloud based contact center (system to allow communication between companies and the general public, e.g. support call centers)
-  Main features: Provides skill based routing, Automatic call distribution, Call recording, Reporting
-  Allows to design automated "Contact flows" that can direct the user to the right operator ("press X if you need to do Y")
-  The contact flows can be integrated with lambda to customise the flow programmatically decisions for the workflow (e.g. fetch a reservation for the caller and decide the next step based on the state of the reservation)
-  Provides an IVR (Interactive Voice Response) and records transcripts for every conversation / flow

### Amazon Kinesis Video Stream

- Different service from Kinesis Data Stream (it goes into an entirely different category)
- Cameras/microphones and other devices can use Kinesis video stream libraries (producer library) to publish data (real time or buffered)
- Data can be consumed in real time or buffered (saved durably in S3) - Real time vs batch approach
- Rekognition can be used to extract metadata from the stream

### AWS Networking notes

- Network ACL (NACL): firewall-like rules for entire vpc/subnets to enable/block traffic (stateless. Outgoing traffic for ephemeral ports needs to be specified explicitly )
- Security Groups: per instance firewall-like rules to enable disable traffic (stateful. E.g. if you allow incoming port 80, outgoing port for traffic coming through port 80 will be allowed as well)
- You can give a public IP to a Load Balancer either through a Network load balancer with Elastic IP or an Application Load Balancer with Gloabal Accelerator

### AWS Shield

- Service for DDoS attack protection.
- There is an Shield Advanced option. In addition to the network and transport layer protections that come with Standard, AWS Shield Advanced provides additional detection and mitigation against large and sophisticated DDoS attacks, near real-time visibility into attacks, and integration with AWS WAF.

### CloudFront

- CloudFront signed cookies allow you to control who can access your content when you don't want to change your current URLs or when you want to provide access to multiple restricted files, for example, all of the files in the subscribers' area of a website. This topic explains the considerations when using signed cookies and describes how to set signed cookies using canned and custom policies.

### Direct Connect

- Direct Connect can be used to connect an Amazon VPC to an On premise network
- Use Direct Connect link between the VPC and the on premise network
- Use a network device in the on-premise network that supports BGP and MD5 Authentication (needed to establish a Direct Connect link from your data center to your VPC)
- Direct Connect connections consist of a single connection between your network and AWS with no inherent redundancy.
- Traffic coming from on-prem via a Direct Connect connect is restricted from internet access.
- You must create a virtual interface (public, private or transit) in order to begin using your AWS Direct Connect connection.


### IAM

#### Managed Policies
AWS managed policies **don't grant least privilege permissions**. You must consider the security risk of granting your principals more permissions than they need to do their job.

You can attach AWS managed policies, including job functions, to any IAM identity. To switch to least privilege permissions, you can run **AWS Identity and Access Management Access Analyzer** to monitor principals with AWS managed policies. After learning which permissions they are using, then you can write a custom policy or generate a policy with only the required permissions for your team. This is less secure, but provides more flexibility as you learn how your team is using AWS.

AWS managed policies for job functions are designed to closely align to common job functions in the IT industry. You can use these policies to grant the permissions needed to carry out the tasks expected of someone in a specific job function. These policies consolidate permissions for many services into a single policy that's easier to work with than having permissions scattered across many policies.

##### Most common managed policies

- **[AdministratorAccess](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/AdministratorAccess)** his user has full access and can delegate permissions to every service and resource in AWS.
- [**Billing**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/job-function/Billing) This user needs to view billing information, set up payments, and authorize payments. The user can monitor the costs accumulated for the entire AWS service.
- [**DatabaseAdministrator**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/job-function/DatabaseAdministrator) This user sets up, configures, and maintains databases in the AWS Cloud.
- [**DataScientist**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/job-function/DataScientist) This user runs Hadoop jobs and queries. The user also accesses and analyzes information for data analytics and business intelligence.
- [**PowerUserAccess**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/PowerUserAccess)This user performs application development tasks and can create and configure resources and services that support AWS aware application development.
- [**NetworkAdministrator**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/job-function/NetworkAdministrator) This user is tasked with setting up and maintaining AWS network resources.
- [**ReadOnlyAccess**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/ReadOnlyAccess) This user requires read-only access to every resource in an AWS account.
- [**SecurityAudit**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/SecurityAudit) This user monitors accounts for compliance with security requirements. This user can access logs and events to investigate potential security breaches or potential malicious activity.
- [**SupportUser**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/job-function/SupportUser) This user contacts AWS Support, creates support cases, and views the status of existing cases.
- [**SystemAdministrator**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/job-function/SystemAdministrator) This user sets up and maintains resources for development operations.
- [**ViewOnlyAccess**](https://console.aws.amazon.com/iam/home#policies/arn:aws:iam::aws:policy/job-function/ViewOnlyAccess) This user can view a list of AWS resources and basic metadata in the account across all services. The user cannot read resource content or metadata that goes beyond the quota and list information for resources.


### Lex

- Conversation interface service
- ASR (Automatic Speech Recognition) + NLU (Natural Language Understanding)
- Can understand voice and text (voice automation + chatbots)
- Based on intents (entities that define actions that the user might want to perform)
- An intent has "sample utterances" (example phrases that can be used to express the intent)
- An intent has "slots" (particular type of keywords that represent specific concepts in a phrase)
- A "slot" can have a type (e.g. color, dates, day of weeks, city, country, etc.)
- Slots can be used as a template variable in utterances ("Your trip is scheduled for {date}")
- The response is generated statically (predefined phrases) or dinamically (through a lambda)
- Can be combined with comprehend for sentiment analysis
- It understands audio (Amazon Transcribe: speech to text)
- It can generate audio responses (Amazon Polly: text to speech)

### Macie

- Security tool that can be used to monitor events (Intelligent cloud protection)
- It can scan data uploaded to S3 and recognize sensitive information (e.g. API Keys, but also passport numbers or address)
- It can be used to detect anomalies in AWS API usage (e.g. it can detect if data is likely to have been stolen)
- It can be integrated with CloudWatch and SNS to alarm on potential threats
- It offers a dashboard that allows you to visualise the detected threats, but also all the AWS API calls (grouped by type but you can also drill down)
- Supports Lucene-style queries to search through the data


### RPO vs RTO

- Metrics for establishing and measuring good practices in backup and recovery of data (disaster recovery)  
- RPO (Recovery Point Objective): Time between a good dataset (in the backup) and a disaster event.  
- RTO (Recovery Time Objective):  Point in which the data is restored and operation continues.  
- If RTO is 30 minutes that means that recovering from an incident should not take more than 30 minutes. You can also see that as the maximum time that a company is willing to keep a service unavailable  
- RPO: before an incident occurs  
- RTO: after an event occurs  
- Reducing RPO and RTO have cost implications because it means more frequent backups and faster mechanism to recover from failure


### S3 

- Objects that are stored in your bucket before you set the versioning state have a version ID of `null`.

#### S3 Select

-  Allows to query ONE s3 object and extract data from it without having to download the entire file locally
-  It uses a subset of standard SQL for queries
-  Supports CSV, JSON (also gzipped or bzipped) and parquet (non compressed)
-  Supports files encrypted at rest
-  Can query selectively part of a file (e.g. only the first 100Mb)
-  It can be cheaper to get data out of S3 this way (not transferring large files outside AWS)
-  It charges based on the amount of data scanned per query and the amount of data returned


### Snowball

- If copying files is slow: this is due to encryption overhead when copying files to the Snowball Edge device. Open multiple sessions to the Snowball Edge device and initiate parallel copy jobs to improve the overall copying throughput.


### Storage Gateway

- In the **cached mode**, your primary data is written to S3, while retaining your frequently accessed data locally in a cache for low-latency access.
- In the **stored mode**, your primary data is stored locally and your entire dataset is available for low-latency access while asynchronously backed up to AWS.

### VPC

#### NAT Gateway

- NAT Gateway do not support IPv6
	- same for NAT instances
	- If you need IPv6 traffic use an egress-only internet Gateway
- You'd generally prefer a NAT Gataway over a NAT instance because
	- Gateway is a managed service
	- Highly available
	- Scales automatically
- But you might prefer a NAT instance when:
	- Need to save money for a small workload that doesn't require High Availability
	- You need to fine tune security groups
	- You want the ability to detach your Elastic IP

#### Allow a VPC to resolve using on-premise DNS

- Configure a DHCP Option Set to issue your on-prem DNS IP to VPC clients.

#### Egress-Only Internet Gateway

The purpose of an "Egress-Only Internet Gateway" is to allow IPv6 based traffic within a VPC to access the Internet, whilst denying any Internet based resources the possibility of initiating a connection back into the VPC.

- Allows VPC based IPv6 traffic to communicate to the Internet
- Prevents IPv6 based Internet resources initiating a connection into a VPC

#### Default DNS address for DHCP

For default settings the DHCP address of a subnet is always the base CIDR of the subnet plus 2.

E.g. if the base is `10.0.0.0/16` the DHCP address is `10.0.0.2`


### WAF

- Web Application Firewall
- Level 7 firewall that can be used to block web traffic 
- Can be used with ALB and CloudFront distributions


## Tips

Here are some things that I picked up while doing the practice exams and that can help to analyse questions and identify the correct answer(s):

- *"Scalable and cost effective"* storage is always a hint to pick DynamoDB, not RDS! Aurora could also be an option, but only if the question explicitly states *"Relational Database"*.
- Everytime you encounter "Slow connection" and "migration from on-premise to the cloud" expect Snowball to be one of the answers.
- Never pick reserved instances with workloads that are limited in time.
- Oracle RAC is not supported by RDS: all questions mentioning RAC will probably require you to spin up Oracle RAC in a dedicated EC2 instance.
- When TCO (Total Cost of Ownership) is mentioned, the answer is generally requiring you to use AWS Application Discovery Service.
- "Dedicated" vs "Reserved" instances. Sometimes used in the wrong way in the answers. Make sure you understand the difference so you can easily spot choices that can be easily removed. Dedicated: instances that are not shared with other AWS customers; Reserved: instances that you reserved (paid for) in advance.
- "Memcache" vs "Redis" (ElastiCache), always pick Redis, except when it's explicitly requested that the caching layer needs to be multithreaded.


## Conclusion

I want to give a huge shout out to [fourTheorem](https://fourtheorem.com) for supporting me in this endeavor and giving me time to study and access to paid material! ❤️ Also, thanks a million to my colleague [Marin](https://github.com/adminy) for reviewing this article and suggesting a few improvements! 🙌

This concludes what I had to share. Please do let me know if you found this material interesting and useful.

[Give me a nudge on Twitter](https://twitter.com/loige) (my DMs are ope) if you are preparing for the exam and there are topics that you want to discuss or if you have questions you want to ask. Chances are I won't have great answers for you, but we can still have fun chatting about AWS and cloud topic! 🙃

I wish you the very best for your exam!

See you on the next post!