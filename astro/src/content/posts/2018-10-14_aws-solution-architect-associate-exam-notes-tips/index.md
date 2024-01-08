---
title: AWS Solution Architect Associate exam, my notes and tips
slug: aws-solution-architect-associate-exam-notes-tips
subtitle: null
date: 2018-10-21T11:57:00.000Z
updated: 2018-10-21T11:57:00.000Z
header_img: ./aws-solution-architect-associate-exam-notes-tips.jpg
status: published
tags:
  - aws
---

In this article, I will share some of my notes and tips that might be useful if you are studying to get the AWS Solution Architect Associate Certification.

I recently took this certification and I have to admit it was a little bit more challenging than I originally expected. I have been using a variety of AWS services professionally in the last 3 years, so I was optimistically expecting this practical experience to be enough. In reality, I had to spend some time to study and fill some gaps about important topics or details that I never had to deal with during my professional experience.

In this article, I will try to recap some of the topics I believe are important to know for this specific certification with a particular focus on things that I struggled a bit to remember or that I generally tripped over during the quiz simulations.

Hopefully, if you are preparing for the same certification, this article will be helpful to you! 😊

## Mindset

The exam is a classic quiz where you have to pick one or more answers. It's very easy to find simulations online, so you might be tempted to spend your time just doing that and use the quiz experience as a way to learn what's necessary to pass the exam.

While this might be good to understand the style of the questions and the depth of the topics covered, you shouldn't try to learn specific questions and answers by heart. In fact, studying quiz questions and memorizing answer is NOT a good study technique and it will be likely reducing your chances of passing the exam, rather than increasing it!

All the questions are quite reasonable, if you understood the theory behind all the different AWS services and you know the most important details (in terms of costs, configuration, availability, durability, etc.), you should be able to figure out the right answers.

I admit some questions might be tricky. For instance, you might get questions where more than one answer seems to be correct. In those cases, it might be helpful to try to reason by exclusion and look for all the answers that are definitely wrong. If this is still not helping you to come up to a definitive answer, you can still "flag" the question (yeah, that's an option in the examination platform) and come back to it later with a fresher mind.

Managing your time will be important too. Try not to spend more than 2 or 3 minutes per question. If you feel you are spending too much time on a question, again, you can flag it and come back to it later when you addressed all the others. In short, make sure you addressed all the questions you feel sure about and save some time to address and review the ones you are struggling with. Sometimes, a bit more reasoning will help you identify some key detail you were initially missing to unlock the right answer.

## Study and exercise material

I used a number of different sources to prepare for the exam.
The mandatory place to start with is the [official AWS Solution Architect Associate certification page](https://aws.amazon.com/certification/certified-solutions-architect-associate/). In this page you will find all the necessary details about the certification and links to the two most important official (FREE) resources:

- [The AWS Well-architected framework](https://aws.amazon.com/architecture/well-architected/)
- [Best practices: architecting for the cloud](https://d0.awsstatic.com/whitepapers/AWS_Cloud_Best_Practices.pdf)

I also used other unofficial resources. A big shout out goes to [A Cloud Guru](https://acloud.guru/), which offers a subscription that allows to watch all video series for all sorts of AWS certifications. In my personal opinion, the format of the courses is great. It is particularly focused on explaining the fundamental principles of every single service but it is also very practical in underlining what's really important to know in order to be ready the exam. Their platform also offers per topic quiz and exercises, but also a complete exam simulation app.

In the last few days of my preparation, I also found an interesting (and FREE) Android app called [
AWS Certified Solutions Architect Associate (by Magic Bytes Soft)](https://play.google.com/store/apps/details?id=com.magycbytes.aws). The app offers nice features to test your knowledge like flash cards and test sessions.

Finally, when you feel confident enough with the exam simulations, it might be a good idea to tackle the [official exam simulation by AWS Training](https://aws.amazon.com/training/) (paid) to have a better feeling of what the platform looks like and what kind of questions can you expect.

Take into account that some practical experience with AWS is very important. Of course you can understand all the concepts only at a theoretical level, but practice will be very important to fix those concepts in your mind and to understand why many details are important. So be sure you spend some time playing around with all the services you might not have used yet. In those cases, I found that trying to build a little side project that involves those services is often the most complete and rewarding experience.

## My Notes

Here's a collection of notes that I took during my studies, somewhat organized by topic/service. Again, these notes don't aim to be comprehensive but they might still be useful to recap some of the most important aspects of all the different services (that's at least why I compiled this list for myself).

### Cloud Computing and AWS concepts

#### Durability & Availability

- **Durability** can be described as the probability that you will eventually be able to get your object back from the storage system from one of the stores and archives (objects persist during time).
- **Availability** is the probability that you will be able to get an object back the moment that you ask for it (i.e. the object might still be persistent, but that doesn't necessarily mean you can read it all the time - think of momentary networking or system issues).

#### The Well-Architected Framework

The Well-Architected Framework is a guide that proposes a set of questions that you can use to evaluate how well your architecture is aligned to AWS practices.
It will help you design architectures that can achieve:

- Operational Excellence
- Security
- Reliability
- Performance Efficiency
- Cost Optimization

Those are sometimes referred to as **5 pillars**.

Sometimes, you’ll see a misleading “Availability” (pillar) in the possible answers of the quiz.

#### AWS Support plans

There are 4 plans available:

- Basic
- Developer
- Business
- Enterprise

In the quizzes, you’ll often see a misleading “Corporate” plan which does not exist

#### Web console SAML authentication flow

SAML allows configuring federated user access to the corporate AWS account (basically you can re-use your corporate user management system to grant access to AWS and avoid to replicate all your users into IAM).

1. The flow starts from the corporate portal (not on the AWS console)
2. The user triggers the auth on the corporate portal which verifies the user identity
3. The portal generates a SAML authentication response that includes assertions and attributes about the user
4. The client browser is then redirected to the AWS single sign-on endpoint posting the SAML assertion
5. The AWS console endpoint validates the SAML assertion and generates a redirect to access the management console (suing STS)
6. The browser follows the redirect which brings into the AWS console as an authenticated user

More info available in [Enabling SAML 2.0 Federated Users to Access the AWS Management Console](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_enable-console-saml.html).

### S3

AWS Object Storage Solution.

#### Consistency model

##### Read after write consistency:

- `PUT` (New files)

##### Eventual consistency:

- `PUT` (updates)
- `DELETE`

**Updates are atomic**: requesting a file immediately after an update will give you either the old data or the new data (no partially updated or corrupted data).

#### Storage classes

##### Frequent Access:

- `STANDARD`
- `REDUCED_REDUNDANCY (RRS)`: for non-critical and reproducible data, you might be losing up to 0.01% of all your objects per year

##### Infrequent Access (pay per read):

- `STANDARD_IA`: grant quick reads (small latency), but you pay per read.
- `ONEZONE_IA`: like `STANDARD_IA`, but stored only in one availability zone, less availability (if that specific zone is down you won't be able to access the files until the zone is back)

##### Archive

- `GLACIER`: data is archived and needs to be explicitly restored (which takes 3-5 hours) to be available again. Cheapest solution.

#### Durability & Availability table

| Class                |    Durability |        Availability |
| :