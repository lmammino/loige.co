---
uuid: 9f447a1e-6076-4a63-a58e-f2009df02ce7
layout: post
title: "Create resources conditionally with CDK"
slug: "create-resources-conditionally-with-cdk"
subtitle: "Using deploy-time Cloudformation conditions"
date: "2021-11-01T09:15:00.000Z"
updated: "2021-11-01T09:15:00.000Z"
author: Luciano Mammino
author_slug: luciano-mammino
header_img: "./create-resources-conditionally-with-cdk.png"
fb_img: "./create-resources-conditionally-with-cdk-fb.png"
tw_img: "./create-resources-conditionally-with-cdk-tw.png"
status: published
language: en_US
meta_title: null
meta_description: Learn how you can use Cloudformation conditions with CDK to be able to create resources using deploy-time conditions.
written_with: []
tags:
  - aws
  - cdk
  - javascript
  - typescript
---

Did you ever need to create a resource based on a condition in CDK? I recently needed to do that and finding a viable solution for this problem took me longer than I originally anticipated. In this article I will try to summarise what I learned and present my solution.

In short, we will learn about the [`CfnCondition` construct](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.CfnCondition.html) and how it can be used to create CloudFormation conditions. Then we will see how to attach condition to low level construct. Throughout this article, we will discuss these concepts with a practical example: creating or importing an S3 bucket based on the value of an SSM parameter.


## Create or import an S3 bucket based on a condition with CDK

Let's start with a practical example: we want to define a stack using CDK and we need to be able to import or create an S3 bucket depending on a specific condition. Let's also make a use case: our stack will be deployed to multiple environments (development, staging, production, etc.). In the production environment we will need to use a bucket that is already created, while in the other environments we want to create the bucket as part of the stack.

If our condition can be expressed statically (e.g. using an environment variable or a value in the CDK context) then things are easy and we should be able to do something like this:

```typescript
import * as cdk from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'

export class ExampleStack extends cdk.Stack {
  constructor (scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const myBucket = process.env['CREATE_BUCKET'] === 'true'
      ? new s3.Bucket(this, 'MyBucket')
      : s3.Bucket.fromBucketAttributes(this, 'MyBucket', {
          bucketName: 'theNameOfTheBucketToImport'
        })
  }
}
```

But what if we try to replace our expression (`process.env['CREATE_BUCKET'] === 'true'`) with something that depends on other resources on our AWS account? For example, what if we use the value from an SSM parameter?

Let's see how that might look like:

```typescript
// ⚠️ NOTE: This does not work!
import * as cdk from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'
import * as ssm from '@aws-cdk/aws-ssm'

export class ExampleStack extends cdk.Stack {
  constructor (scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const shouldCreateBucket = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'ShouldCreateBucket',
      {
        parameterName: `/ExampleStack/Config/ShouldCreateBucket`
      }
    ).stringValue

    const myBucket = shouldCreateBucket === 'true'
      ? new s3.Bucket(this, 'MyBucket')
      : s3.Bucket.fromBucketAttributes(this, 'MyBucket', {
          bucketName: 'theNameOfTheBucketToImport'
        })
  }
}
```

If you read the comment at the top of the snippet, you know already this does not work as expected. But what is actually happening here?

Dynamic values like SSM Parameters are not known during the [_construct_ phase](https://docs.aws.amazon.com/cdk/latest/guide/apps.html#lifecycle), which is the lifecycle phase in which our TypeScript code gets executed and CDK collects all the resources that we want to include in the stack. In this phase, CDK will use a [_Token_](https://docs.aws.amazon.com/cdk/latest/guide/tokens.html) to represent these values in the context of TypeScript.

So, in the example above, `shouldCreateBucket` will not contain the actual string value that is stored in the SSM parameter `/ExampleStack/Config/ShouldCreateBucket`. It will still be a sting value but it will contain something that will look like `${Token[TOKEN.55]}`.

Because of this, our TypeScript expression is effectively the following:

```typescript
'${Token[TOKEN.55]}' === 'true'
```

Which means that this expression will always evaluate to `false`. Therefore, we are always importing the bucket and never creating it, regardless of the actual value in our SSM parameter.

Of course, this is not what we want. But, how do we fix it?


## Using `CfnCondition` with CDK

The way to solve this problem is to use the concept of [_condition_ in CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/conditions-section-structure.html).

Conditions exists in CloudFormation to support use cases like ours. They allow to define the circumstances under which certain entities are created or configured for a given stack.

Since we are working with CDK, we can use the concept of condition with the low level `CfnCondition` construct.

Let's see how we can create a condition based on the SSM parameter from the previous example:

```typescript
import * as cdk from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'
import * as ssm from '@aws-cdk/aws-ssm'

export class ExampleStack extends cdk.Stack {
  constructor (scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const shouldCreateBucket = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'ShouldCreateBucket',
      {
        parameterName: `/ExampleStack/Config/ShouldCreateBucket`
      }
    ).stringValue

    // here's the condition
    const shouldCreateBucketCondition = new cdk.CfnCondition(
      this,
      'ShouldCreateBucketCondition',
      {
        // a condition needs an expression
        expression: cdk.Fn.conditionEquals(shouldCreateBucket, 'true')
      }
    )

    // ...
  }
}
```

As you can see, a condition is created as any other resource by instantiating an object from the `cdk.CfnCondition` construct. Note that this is more of a logical resource as it does not create an actual resource on AWS. The interesting part is the `expression` attribute.

This attribute is used to define an expression that gets evaluated to determine the value of the condition which, at deployment time, needs to be either `true` or `false`.

Here we are using [`cdk.Fn.conditionEquals`](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Fn.html#static-conditionwbrequalslhs-rhs) to indicate that the condition will be `true` if `shouldCreateBucket` matches the string `'true'`. There are other functions you can use to create more complicated conditions including thing like _and_ or _or_ operators. Check out the [documentation of the `Fn` class](https://docs.aws.amazon.com/cdk/api/latest/docs/@aws-cdk_core.Fn.html#class-fn) if you want to find out more.

This allow us to evaluate the expression at deployment time when the actual value of the SSM parameter will be available, therefore this condition will work as intended.

Now, this condition alone doesn't really do much. We need to _attach_ the condition to a resource to tell CDK (and CloudFormation) to actually create the given resource only if the condition holds true.


## Attaching a condition to a CDK resource

This is where things get a little bit hairy and where I needed to spend a little bit of time to find a working solution.

I was expecting to be able to do something like this:

```typescript
// ⚠️ NOTE: This does not work!

// ...
const myBucket = new s3.Bucket(this, 'MyBucket', {
  condition: shouldCreateBucketCondition // NOPE!
})

// or

myBucket.setCondition(shouldCreateBucketCondition) // NOPE!

// ...
```

Eventually I figured out that I can't specify a condition on a high level construct such as `s3.Bucket` and that I need to [fallback to the equivalent level 0 construct](https://docs.aws.amazon.com/cdk/latest/guide/cfn_layer.html#cfn_layer_cfn) (`s3.CfnBucket` in this case).

Doing this is not really obvious and the final _downcast_ looks like this:

```typescript
const cfnMyBucket = myBucket.node.defaultChild as s3.CfnBucket
```

Once we have an instance of `s3.CfnBucket`, we can specify a condition with:

```typescript
cfnMyBucket.cfnOptions.condition = someCfnCondition
```

So if we put what we have learned together, this is how our conditional creation of a bucket might look like:

```typescript
import * as cdk from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'
import * as ssm from '@aws-cdk/aws-ssm'

export class ExampleStack extends cdk.Stack {
  constructor (scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    const shouldCreateBucket = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'ShouldCreateBucket',
      {
        parameterName: `/ExampleStack/Config/ShouldCreateBucket`
      }
    ).stringValue

    const shouldCreateBucketCondition = new cdk.CfnCondition(
      this,
      'ShouldCreateBucketCondition',
      {
        expression: cdk.Fn.conditionEquals(shouldCreateBucket, 'true')
      }
    )

    const myBucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'my-special-bucket'
    })
    (myBucket.node.defaultChild as s3.CfnBucket).cfnOptions.condition = shouldCreateBucketCondition
  }
}
```

The final point to address is to figure out how to import the bucket if our condition does not hold.

After thinking about this for a while, I realised that we can always import the bucket. Based in our condition, one of two things can happen:

  1. The bucket will be created (if the SSM parameter value is `true`)
  2. The bucket is already there (otherwise)

In both cases, if we know the unique name of the bucket, we can import it using `s3.Bucket.fromBucketAttributes`:

```typescript
const importedOrCreatedBucket = s3.Bucket.fromBucketAttributes(this, 'ImportedOrCreatedBucket', {
  bucketName: 'my-special-bucket'
})
```

The code above will give us a valid reference to the bucket in both cases. We can use this _generic_ reference in our stack every time we want to do something with the bucket, for instance grant a permission to another resource:

```typescript
importedOrCreatedBucket.grantReadWrite(someEc2Instance)
```


## Conclusion

In summary, creating a resource conditionally with CDK requires us to do the following:

  1. define a `cdk.CfnCondition` with a given expression
  2. downcast the resource we want to create conditionally to it's level 0 construct equivalent (e.g. from `s3.Bucket` to `s3.CfnBucket`)
  3. attach the condition to the lower level construct using `cfnResource.cfnOptions.condition = myCondition`
  4. finally, if we need to reference this resource in the rest of our stack, we can import the resource using some attribute that will be know regardless if we just created the resource or if we are importing it (e.g. `s3.Bucket.fromBucketAttributes`)

Our final snippet will look like this:

```typescript
import * as cdk from '@aws-cdk/core'
import * as s3 from '@aws-cdk/aws-s3'
import * as ssm from '@aws-cdk/aws-ssm'

export class ExampleStack extends cdk.Stack {
  constructor (scope: cdk.Construct, id: string, props: cdk.StackProps) {
    super(scope, id, props)

    // read the SSM parameter
    const shouldCreateBucket = ssm.StringParameter.fromStringParameterAttributes(
      this,
      'ShouldCreateBucket',
      {
        parameterName: `/ExampleStack/Config/ShouldCreateBucket`
      }
    ).stringValue

    // define the condition comparing the value of the SSM parmater to 'true'
    const shouldCreateBucketCondition = new cdk.CfnCondition(
      this,
      'ShouldCreateBucketCondition',
      {
        expression: cdk.Fn.conditionEquals(shouldCreateBucket, 'true')
      }
    )

    // creates the bucket
    const myBucket = new s3.Bucket(this, 'MyBucket', {
      bucketName: 'my-special-bucket'
    })
    // attaches a condition to the creation of the bucket
    (myBucket.node.defaultChild as s3.CfnBucket).cfnOptions.condition = shouldCreateBucketCondition

    // import the bucket by name (regardless if it was just created or already existed)
    const importedOrCreatedBucket = s3.Bucket.fromBucketAttributes(this, 'ImportedOrCreatedBucket', {
      bucketName: 'my-special-bucket'
    })

    // from now on only use `importedOrCreatedBucket`
  }
}
```

And this is all that I have to share for today!

I hope you will find this useful and please let me know if you end up implementing something like this. I am still learning many of the CDK nuances, so I'd appreciate any feedback. Maybe there are other ways to achieve the same results.

Make sure to leave a comment below and to [connect on Twitter](https://twitter.com/intent/user?screen_name=loige) so we can keep the conversation going.

Until then, see you on the next post 👋
