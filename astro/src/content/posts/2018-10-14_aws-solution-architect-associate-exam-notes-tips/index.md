---
title: >-
  AWS Solution Architect Associate exam, my notes and tips
slug: aws-solution-architect-associate-exam-notes-tips
subtitle: null
date: 2018-10-21T11:57:00.000Z
updated: 2018-10-21T11:57:00.000Z
author: Luciano Mammino
author_slug: luciano-mammino
header_img: ./aws-solution-architect-associate-exam-notes-tips.jpg
fb_img: ./aws-solution-architect-associate-exam-notes-tips-fb.png
tw_img: ./aws-solution-architect-associate-exam-notes-tips-tw.png
status: published
language: en_US
meta_title: null
meta_description: null
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
| :------------------- | ------------: | ------------------: |
| `STANDARD`           | 99,999999999% |              99,99% |
| `STANDARD_IA`        | 99,999999999% |           **99,9%** |
| `ONEZONE_IA`         | 99,999999999% |           **99,5%** |
| `GLACIER`            | 99,999999999% | 99,99%<sup>\*</sup> |
| `REDUCED_REDUNDANCY` |    **99,99%** |              99,99% |

<legend><sup>*</sup> After restore</legend>

- Durability is always _11 nines_ (99,999999999%) except for `REDUCED_REDUNDANCY`, suitable for cases where you might afford to lose files (e.g. you can regenerate them).
- Availability is almost always 99,99% except for `STANDARD_IA` (99,9%) and `ONEZONE_IA` (99,5%), these are suitable for cases where you rarely have to access the data, but when you need to it has to be as fast as STANDARD (can’t wait hours like with GLACIER).

#### Encryption features

- **SSE-S3**: fully managed encryption at rest (don’t have to worry about encryption keys)
- **SSE-C**: encryption at rest with custom encryption keys (to be provided together with the uploaded or download the file). The key is not stored by AWS. Use this option if you want to maintain your own encryption keys, but don’t want to implement or leverage a client-side encryption library.
- **SSE-KMS**: encryption at rest using keys managed through the KMS service. Allows to define fine grained permissions based on the permissions of KMS keys. Best solution for compliance (PCI-DSS, HIPAA, etc.).

#### MFA Delete

For extra security S3 supports the option “MFA on delete” which requests a user to enter an MFA code to be able to delete a file. Protects against accidental or unauthorized deletions.

#### Transfer optimizations

- If latency is an issue you can use **S3 transfer acceleration**.
- If transfer speed is a problem or you have to transfer big files through HTTP you can use **multi-part upload**.
- If you need to transfer massive amount of data into AWS and it might take too long to do that on the wire you can use **Snowball**.
- If your storage needs to exist also on premise (hybrid cloud storage), you can use **Storage gateway**.
- **Storage gateway** offers 2 main volume modes:
  - **Cached volumes**: stores files in the cloud and keeps a local cache to speed up reads
  - **Stored volumes**: optimized for low latency, stores files locally and asynchronously sends back up point-in-time snapshots to S3.

#### Cross Region Replication (CRR)

Cross-region replication requires the following:

- Both source and destination buckets must have versioning enabled.
- The source and destination buckets must be in different AWS Regions (that’s why it’s called cross-region!)
- Amazon S3 must have permissions to replicate objects from the source bucket to the destination bucket on your behalf.
- If the owner of the source bucket doesn't own the object in the bucket, the object owner must grant the bucket owner `READ` and `READ_ACP` permissions with the object ACL.

#### Defaults / Limits

- Max object size: 5TB
- Min object size: 0bytes, except for S3 IA that has a min size of 128kb.
- Default maximum number of buckets per region: 100
- Bucket/Object url format: `http://${BUCKET_NAME}.s3.amazonaws.com/${OBJECT_KEY}`

#### Other

- S3 can be used to host (static) websites (URL schemas: `<bucket-name>.s3-website-<AWS-region>.amazonaws.com` and `<bucket-name>.s3-website.<AWS-region>.amazonaws.com`). You can use Cloudfront as a CDN to make the website fast globally.
- S3 website can be configured to do redirects.
- Glacier files can be restored through the web console or the S3 API (RestoreRequest action).
- Only the owner of an Amazon S3 bucket can permanently delete a version.
- S3 can achieve at least 3,500 PUT/POST/DELETE and 5,500 GET requests per second per prefix in a bucket (you can use random prefixes to increase the throughput in data-intensive applications).
- You can write objects directly to an edge location (for instance, this is useful if you are letting users of an app upload files directly to S3 and you want to reduce latency world wide).

### SQS

AWS distributed queue service.

#### Types of queue

- **Standard**
  - Extremely high throughput (AWS defines it “nearly unlimited”), highly distributed
  - Messages are guaranteed to be delivered “at-least-once” (sometimes a message can be delivered more than once)
  - Best-effort ordering (messages are generally delivered in order, but they might be occasionally out of order)
- **FIFO (First-In-First-Out)**:
  - Limited number of transactions per second (3000 TPS with batching, 300 TPS without)
  - Guarantees "in-order" delivery and "exactly-once" processing

#### Configuration options

- **Visibility Timeout** (default 30s, min 0, max 12hrs): if a consumer receives a message from the queue, that message is made invisible to other consumers as long as the Visibility Timeout option specifies. This is done to prevent other consumers to pick up the same message again and give some time to the current process to complete the processing and delete the message. If the current consumer crashes before removing the message, once the Visibility Timeout expires, another consumer will be able to pick up the message again.
- **Delay Seconds** (default 0, min 0, max 15min): allows to postpone the delivery of a message. Once added to the queue, a message will remain invisible to consumers for the amount of seconds specified in the Delay Seconds attribute. This attribute can be specified globally at the queue level (in this case the queue is referred as Delay Queue) or at the message level.

Delay queues are similar to visibility timeouts because both features make messages unavailable to consumers for a specific period of time. The difference between the two is that, for delay queues, a message is hidden when it is first added to queue, whereas for visibility timeouts a message is hidden only after it is consumed from the queue

#### Long polling

Long polling helps reduce the cost of using Amazon SQS by eliminating the number of empty responses (when there are no messages available for a `ReceiveMessage` request). By default, Amazon SQS uses short polling, to enable Long polling you have to specify a positive value for the `WaitTimeSeconds` attribute in the `ReceiveMessage` request.

#### Defaults

Messages Max retention (14 days).

### EC2 / EBS / ELB / ECS

Compute solutions (virtual servers, etc.).

#### Types of virtual machines images (AMI)

- **HVM** (hardware virtual machine): fully virtualised hardware and boot. Recommended for best performance.
- **PV** (paravirtual): uses a special boot loader, can run on hardware that does not have direct support for virtualisation. Recommended for old generation instances.

#### Metadata API

- Prefer instance attached roles and metadata API rather than having dedicated access keys saved into every machine
- Public IP is not managed through metadata API (read only)
- Metadata API is available at the following endpoint `http://169.254.169.254/latest/meta-data/`

#### Dedicated hosting

An Amazon EC2 Dedicated Host is a physical server with EC2 instance capacity fully dedicated to your use. Dedicated Hosts can help you address compliance requirements and reduce costs by allowing you to use your existing server-bound software licenses.
There are 2 different dedicated hosting modes (tenancy):

- **Dedicated Hosts**: gives you additional visibility and control over how instances are placed on a physical server, and you can consistently deploy your instances to the same physical server over time. As a result, Dedicated Hosts enable you to use your existing server-bound software licenses and address corporate compliance and regulatory requirements.
- **Dedicated instances**: less configurable (no host billing, no visibility of sockets and cores, can’t add capacity).

You can change the tenancy of Dedicated instances from "dedicated" to “host”. After you’ve stopped your Dedicated instances, you can change the tenancy to "host" using the `ModifyInstancePlacement` API or the AWS Management Console.

#### EBS backups and snapshots

You can back up the data on your Amazon EBS volumes to Amazon S3 by taking point-in-time snapshots. Snapshots are incremental backups, which means that only the blocks on the device that have changed after your most recent snapshot are saved. This minimizes the time required to create the snapshot and saves on storage costs by not duplicating data.

- A snapshot is **constrained to the region** where it was created. After you create a snapshot of an EBS volume, you can use it to create new volumes in the same region. You can also **copy snapshots across regions**, making it possible to use multiple regions for geographical expansion, data center migration, and disaster recovery.
- While snapshots are per region, volumes created from snapshots are tied to only a given availability zone in that region, so EBS Volumes cannot be attached to an EC2 instance in another AZ.
- To take **application consistent snapshots**: Shut down the EC2 instance and detach the EBS volume, then take the snapshot.
- The most resilient way to backup EBS disks is to take regular snapshots.

#### EBS encryption:

- Snapshots of encrypted volumes are automatically encrypted.
- Volumes that are created from encrypted snapshots are automatically encrypted.
- When you copy an unencrypted snapshot that you own, you can encrypt it during the copy process.
- When you copy an encrypted snapshot that you own, you can re-encrypt it with a different key during the copy process.

#### Other:

- Cannot use pre-existing MS Windows licenses
- Important things when selecting an instance: I/O and memory requirements.
- ELB: AWS CloudTrail can be enabled to record Application Load Balancer API calls for your account and deliver log files
- To create EC2 instances using the VMDK files you can use the VM Import/Export service
- Placement groups cannot be extended across availability zones

#### Limits / Defaults / SLA

- Uptime SLA for Amazon EC2 and EBS within a given region is 99,95%
- Maximum number of VMWare VMs that can be migrated concurrently is 50

#### ECS

AWS Containers Service.

- With ECS tasks, you can specify an IAM role that can be used by the containers in a task. This is a more fine-grained and secure way to handle permissions at container level rather than at instance level.

### Dynamo DB

AWS NoSQL database.

#### Provisioned Throughput

When you create a table or index in Amazon DynamoDB, you must specify your capacity requirements for read and write activity. By defining your throughput capacity in advance, DynamoDB can reserve the necessary resources to meet the read and write activity your application requires, while ensuring consistent, low-latency performance.

You specify throughput capacity in terms of **read capacity units** and **write capacity units**.

- One **read capacity unit** represents one strongly consistent read per second, or two eventually consistent reads per second (you can read twice as much if you opt for an eventually consistent read), for an item up to 4 KB in size. If you need to read an item that is larger than 4 KB, DynamoDB will need to consume additional read capacity units. The total number of read capacity units required depends on the item size, and whether you want an eventually consistent or strongly consistent read.
- One **write capacity unit** represents one write per second for an item up to 1 KB in size. If you need to write an item that is larger than 1 KB, DynamoDB will need to consume additional write capacity units. The total number of write capacity units required depends on the item size.

| Operation                    | Capacity Unit Size |
| ---------------------------- | -----------------: |
| READ                         |               4 KB |
| READ (eventually consistent) |               8 KB |
| WRITE                        |               1 KB |

For example, suppose that you create a table with 5 read capacity units and 5 write capacity units. With these settings, your application could:

- Perform strongly consistent reads of up to 20 KB per second (4 KB × 5 read capacity units).
- Perform eventually consistent reads of up to 40 KB per second (8 KB × 5 read capacity units, twice as much read throughput).
- Write up to 5 KB per second (1 KB × 5 write capacity units).

If you exceed your allocated capacity your will get a `400 Bad Request` response (HTTP API) or a `ProvisionedThroughputExceededException` (SDK). The SDK can offer automatic retry with exponential backoff.

#### Limits

The cumulative size of attributes per item must fit within the maximum DynamoDB item size (400 KB).

### Redshift

AWS analytics database (columnar data storage).

To be able to export data into an S3 bucket from a Redshift instance in a private VPC and make sure data doesn’t leave VPC:

- Enable Amazon Redshift Enhanced VPC routing
- Create and configure an Amazon S3 VPC endpoint

### RDS

AWS Relational Database System. Allows to easily deploy single-machine or distributed instances of the most common databases (Oracle, SQL Server, MySQL, MariaDB, PostgreSQL) and Amazon's own distributed relational database "Aurora".

#### Replication

- Read replica replication is asynchronous
- Replicas across AZs are synchronous
- Read replicas are good for heavy queries (e.g. analytical queries for back office operations)
- Read replica is supported for MySQL, MariaDB, and PostgreSQL as well as Amazon Aurora

#### Encryption

- To migrate an unencrypted DB to an encrypted one: create a new DB Instance with encryption enabled and then manually migrate your data into it.

#### Automatic failover of Multi AZ deployments

Events that would cause Amazon RDS to initiate a failover to the standby replica:

- An Availability Zone outage
- The primary DB instance fails
- The DB instance's server type is changed
- The operating system of the DB instance is undergoing software patching
- A manual failover of the DB instance was initiated using Reboot with failover

#### Limits

- Maximum retention period for automated backup: 35 days

#### Other

- Amazon RDS enables automated backups settings depends on the DB engine selected
- RDS Provisioned IOPS (SSD) Storage is preferable for high-performance OLTP workloads
- default metrics for RDS: The number of current connections to the database

### VPC

Amazon Virtual Private Cloud. Allows you to create complex private networks in the cloud.

#### Availability zones names

Availability Zones consist of one or more discrete data centers. Every account has references to availability zones per regions shuffled. As such, 'eu-west-1b’ for instance, is not necessarily the same physical location for 'eu-west-1b’ in another account (important in some latency related questions).

#### How to enable site to site VPN:

- Hardware VPN enabled on VPC
- On premise customer gateway
- Virtual private gateway
  - Peering connections do not support Edge to Edge
  - Default of 5 elastic IPs per region
  - To enable network access logging you can:
- Make use of an OS level logging tools such as iptables and log events to CloudWatch or S3.
- Set up a Flow Log for the group of instances and forward them to CloudWatch

You can use a network address translation (NAT) gateway to enable instances in a private subnet to connect to the internet or other AWS services, but prevent the internet from initiating a connection with those instances

5 elastic IPS/region max by default

### Cloudwatch

Service that allows you to collect metrics, logs and monitor all the other provisioned services (EC2, Load Balancers, etc). It also allows you to create dashboards and manage alerts.

#### Defaults

Metrics retention for a deleted EC2 (15 months)

### Cloudfront

AWS content delivery network.

- Can support multi-language resources or other variation of resources using query string parameters by setting cache based on all (or some) queries bring parameters (e.g. `http://d111111abcdef8.cloudfront.net/main.html?language=fr`)
- There is a cost when clearing cache (path invalidation): first 1,000 paths requested for invalidation each month are FREE. Thereafter, $0.005 per path requested for invalidation

### SWF

Simple Workflow Service, allows to define and run background workflow composed by parallel or sequential steps. Also described as a _fully-managed state tracker and task coordinator_.

- Preferred to SQS with cases like order management where there might be manual steps (eg. packing and shipping a parcel) or message delivery needs to be more reliable (only once & in order).
- When a workflow is not making progress is probably because of a missing manual interaction.

## Closing off

This is all I have for you. Again this is not comprehensive (E.g. I didn't have notes for services like Lambda or SNS), so please don't rely exclusively on this (and if you do don't hold me responsible 😜).

At this point let me just wish you "Good luck" and let me know how it goes.

A huge thanks goes to [Padraig O'Brien](https://twitter.com/Podgeypoos79) and [Vectra.ai](https://vectra.ai) for supporting this achievement! 🙏
