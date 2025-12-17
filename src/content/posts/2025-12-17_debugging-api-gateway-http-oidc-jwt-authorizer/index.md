---
title: Debugging AWS API Gateway HTTP with OIDC-JWT authorizers
slug: debugging-api-gateway-http-oidc-jwt-authorizer
subtitle: "How FailOnWarnings can save you hours of debugging silent deployment failures"
date: 2025-12-17T10:00:00.000Z
updated: 2025-12-17T10:00:00.000Z
header_img: ./debugging-api-gateway-http-oidc-jwt-authorizer.jpg
status: published
tags:
  - aws
  - serverless
  - api-gateway
  - jwt
  - authentication
description: "Learn how to debug silent failures in AWS API Gateway HTTP when your OIDC provider doesn't implement the .well-known/openid-configuration endpoint. Enable FailOnWarnings to catch these issues before they break your production deployment."
---

Recently, I was working on an AWS project that required authenticating API requests using OIDC-based JWT tokens. I was using API Gateway HTTP (also known as API Gateway v2) with its built-in JWT authorizer, which seemed like the perfect fit for the job. What should have been a straightforward configuration turned into hours of debugging a mysterious issue: my deployment succeeded, but routes were disappearing from the console and authentication simply wasn't working.

This article is a companion to my previous piece on [debugging custom API Gateway authorizers](/debugging-custom-apigateway-authorizers), where I covered how to enable CloudWatch logging for REST API Gateway. This time, we're tackling a different beast: silent failures in HTTP API Gateway when your OIDC provider doesn't fully comply with the specification.

## TL;DR

If you're using AWS API Gateway HTTP with a JWT authorizer and your OIDC provider doesn't implement the `/.well-known/openid-configuration` endpoint, your deployment will appear successful but your authorizer won't be created and your routes will silently disappear.

**The fix:** Add `FailOnWarnings: true` to your HTTP API resource (e.g., `AWS::Serverless::HttpApi` in SAM or `AWS::ApiGatewayV2::Api` in CloudFormation). This will make the deployment fail with a clear error message instead of silently breaking your API.

If you're in a hurry, jump straight to [the solution](#the-solutions).


## API Gateway HTTP and the built-in JWT Authorizer

AWS offers two main flavors of API Gateway: **REST API (v1)** and **HTTP API (v2)**. HTTP API is the newer, lighter, and cheaper option. It's designed for simpler use cases and offers better performance at a lower cost. One of its nice features is the built-in support for JWT authorizers, which allows you to validate OIDC-based tokens without writing any custom code.

When you configure a JWT authorizer, you typically provide:

- An **issuer URL**: the base URL of your OIDC provider (e.g., `https://oidc.loige.co`)
- An **audience**: the intended recipient of the token (your API)
- An **identity source**: where to find the token (usually `$request.header.Authorization`)

Here's what a basic AWS SAM template looks like:

```yaml
# template.yaml (AWS SAM)
Resources:
  MyApi:
    Type: AWS::Serverless::HttpApi
    Properties:
      StageName: v1
      Auth:
        Authorizers:
          MyJwtAuthorizer:
            IdentitySource: $request.header.Authorization
            JwtConfiguration:
              issuer: "https://oidc.loige.co"
              audience:
                - "my-api-audience"
        DefaultAuthorizer: MyJwtAuthorizer
```

> **Note on IaC tools**: Throughout this article, I'll use AWS SAM for the examples, but the same configuration options are available whether you're using raw CloudFormation (with `AWS::ApiGatewayV2::Api` and `AWS::ApiGatewayV2::Authorizer`), AWS CDK, Terraform, Pulumi, or other Infrastructure as Code tools. The key properties like `FailOnWarnings` and `JwtConfiguration` map to the underlying [AWS API Gateway V2 API](https://docs.aws.amazon.com/apigatewayv2/latest/api-reference/apis.html), so you'll find equivalent settings in whatever tool you prefer.

This is convenient because AWS handles all the heavy lifting: fetching the public keys from your OIDC provider, validating the token signature, checking claims, and so on.

> **REST API vs HTTP API**: If you're using REST API Gateway (v1), you won't find this built-in JWT authorizer feature. Instead, you need to implement a custom Lambda authorizer. I've built an open-source project called [`oidc-authorizer`](https://github.com/lmammino/oidc-authorizer) that does exactly this. It's a high-performance Rust-based Lambda authorizer that handles OIDC token validation. It's available on [GitHub](https://github.com/lmammino/oidc-authorizer) and the [Serverless Application Repository (SAR)](https://serverlessrepo.aws.amazon.com/applications/eu-west-1/795006566846/oidc-authorizer), and it's highly configurable to support various OIDC providers.


## The Problem

The trouble starts when you're working with an OIDC provider that doesn't fully implement the OIDC specification. Specifically, the issue arises when the provider doesn't expose the `/.well-known/openid-configuration` endpoint.

When you configure a JWT authorizer with an issuer URL like `https://oidc.loige.co`, AWS assumes it can fetch the OIDC discovery document from `https://oidc.loige.co/.well-known/openid-configuration`. This is standard behavior according to the [OpenID Connect Discovery specification](https://openid.net/specs/openid-connect-discovery-1_0.html).

> **How OIDC JWT validation works**: When validating a JWT token, the authorizer needs to verify that the token's signature is authentic. To do this, it needs the public key that corresponds to the private key used to sign the token. The OIDC discovery endpoint (`/.well-known/openid-configuration`) is a standardized way to find out where to get these public keys. It returns a JSON document that includes (among other things) a `jwks_uri` field pointing to the JSON Web Key Set (JWKS) endpoint. The JWKS endpoint returns the actual public keys. Without the discovery endpoint, the authorizer has no way to know where to find the keys needed to validate tokens.

Here's what happens when your OIDC provider doesn't implement this endpoint:

1. You deploy your infrastructure (SAM, CloudFormation, CDK, Terraform, etc.)
2. The deployment **succeeds** (no errors!)
3. But when you check the API Gateway console, something is wrong:
   - Your routes that use the authorizer are **missing**
   - The authorizer itself **doesn't exist**
   - You might notice a subtle error banner in the "Stages" section

This is incredibly frustrating because there's no obvious indication that anything went wrong. Your deployment completed successfully, your stack shows a green checkmark, but your API is broken.

I spent a good amount of time scratching my head, checking IAM permissions, reviewing my template syntax, and wondering if I had somehow misconfigured everything. The real culprit was much simpler: the OIDC provider I was integrating with didn't expose the discovery endpoint.


## The Solutions

### Solution 1: Enable FailOnWarnings

The first and most important fix is to add `FailOnWarnings: true` to your HTTP API resource. Here's how it looks in an AWS SAM template:

```yaml {6}
# template.yaml (AWS SAM)
Resources:
  MyApi:
    Type: AWS::Serverless::HttpApi
    Properties:
      FailOnWarnings: true  # This is the key!
      StageName: v1
      Auth:
        Authorizers:
          MyJwtAuthorizer:
            IdentitySource: $request.header.Authorization
            JwtConfiguration:
              issuer: "https://oidc.loige.co"
              audience:
                - "my-api-audience"
        DefaultAuthorizer: MyJwtAuthorizer
```

If you're using other IaC tools, look for the equivalent property:

- **CloudFormation**: [`FailOnWarnings`](https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-apigatewayv2-api.html#cfn-apigatewayv2-api-failonwarnings) in the `AWS::ApiGatewayV2::Api` resource
- **Terraform**: [`fail_on_warnings`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/apigatewayv2_api#fail_on_warnings-1) in the `aws_apigatewayv2_api` resource
- **CDK**: Unfortunately, the high-level [`HttpApi`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigatewayv2.HttpApi.html) construct doesn't expose this option directly. You'll need to use the lower-level [`CfnHttpApi`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sam.CfnHttpApi.html) construct or use an [escape hatch](https://repost.aws/knowledge-center/cdk-retrieve-construct-objects) to access the underlying CloudFormation resource and to set `failOnWarnings` on it.

With this setting enabled, instead of silently swallowing the error and deploying a broken API, your deployment will fail with a clear error message:

```plaintext
Resource handler returned message: "Warnings found during import:
Unable to create Authorizer 'MyJwtAuthorizer': Caught exception when
connecting to https://oidc.loige.co/.well-known/openid-configuration
for issuer https://oidc.loige.co. Please try again later.
```

This error message tells you exactly what's wrong: AWS couldn't connect to the OIDC discovery endpoint. Now you know where to look!

I strongly recommend **always enabling `FailOnWarnings: true`** on your HTTP API resources. It's much better to have a deployment fail loudly than to end up with a broken API in production that you might not notice until users start complaining.


### Solution 2: Ensure your OIDC provider is compliant

Once you know the problem, you can verify it by testing the discovery endpoint manually:

```bash
curl https://oidc.loige.co/.well-known/openid-configuration
```

If this returns a `404`, a connection error, or anything other than a valid JSON document with OIDC metadata, you've found your culprit.

The ideal solution is to use an OIDC provider that fully implements the specification. Most major identity providers (Auth0, Okta, Azure AD, AWS Cognito, Keycloak, etc.) do implement the discovery endpoint correctly.

If you're working with a provider that doesn't, you have a few options:

1. **Talk to the provider**: They might be able to add support for the discovery endpoint
2. **Use a different provider**: If possible, switch to a compliant OIDC provider
3. **Implement a custom Lambda authorizer**: If you're stuck with a non-compliant provider, you'll need to write your own authorizer logic


### Alternative: Custom Lambda Authorizer

If your OIDC provider doesn't support the discovery endpoint and you can't change providers, your only option is to implement a custom Lambda authorizer. This approach:

- Gives you full control over the token validation logic
- Allows you to hardcode the JWKS endpoint or public keys
- Works with both REST API and HTTP API Gateway

The downside is added complexity and cost (Lambda invocations). If you're using REST API Gateway, check out my [`oidc-authorizer`](https://github.com/lmammino/oidc-authorizer) project which might serve as inspiration or even a ready-to-use solution. Keep in mind that this particular project is designed for REST API Gateway, but the validation logic could be adapted for HTTP API as well.


## Summary

Debugging API Gateway issues can be tricky, especially when deployments succeed but things don't work as expected. The key takeaways from this article are:

1. **Always enable `FailOnWarnings: true`** on your HTTP API Gateway resources. This simple setting can save you hours of debugging by making failures explicit rather than silent.

2. **Understand the OIDC flow**: The built-in JWT authorizer relies on the OIDC discovery endpoint to find the public keys needed for token validation. If your provider doesn't implement this endpoint, the authorizer simply won't work.

3. **Test your OIDC provider**: Before diving into complex debugging, verify that your OIDC provider exposes the `/.well-known/openid-configuration` endpoint correctly.

I hope this article saves you some of the headaches I experienced. If you found it useful or have questions, feel free to reach out in the [comments](#comments) below or on [Bluesky](https://bsky.app/profile/loige.co).
