---
title: 8 invitations to try Keybase.io
slug: 8-invitations-to-try-keybase-io
subtitle: Keybase.io makes encryption and authentication easy by linking crypto
  keys to social media profiles
date: 2015-05-26T22:25:45.000Z
updated: 2015-05-27T11:22:09.000Z
header_img: ./8-invitations-to-try-keybase-io.jpg
status: published
tags:
  - security
  - cryptography
description: Keybase.io is a new service that combines asymmetric cryptography
  with a social network. It allows users to easily share public keys and
  authenticate messages by linking keys to profiles on Twitter, GitHub, Reddit,
  etc. The service provides encrypted messaging and bitcoin wallet pairing to
  make adopting cryptography seamless.
---

Hello dear developers,
today I finally got my invitation to access the private beta of [Keybase.io](https://keybase.io)! 😎 🎉
For those who are not aware of this new service, Keybase.io is a website and a command line application that makes easier to adopt asymmetric cryptography to encrypt and authenticate messages. But it's not just this, it's also a _"directory of people"_, as they like to say. It's like a social network, where everyone can easily share its public key and attach it to its social profiles (like Twitter, Github or Reddit). You can also pair your bitcoin address with it...

![Keybase.io illustration](./keybase-io-robot.jpg)
...and furthermore the website is full of wonderful illustrations a-la-Dropbox :D

## A quick demo

Just to give you a practical idea of how it works, let's suppose I want to send a super-secret message to my twitter friend Daniel Li ([@d4nyll](https://twitter.com/d4nyll)).
Once I have the Keybase command line app installed (and configured) I can just run:

```bash
$ keybase encrypt twitter://d4nyll -m "Hey pal, I finally crafted the perfect plan to rule this World. Give me a ring-3"
```

and it will print out a weird message that only Daniel, with his private key will be able to decrypt:

```plaintext
-----BEGIN PGP MESSAGE-----
Comment: GPGTools - https://gpgtools.org

hQEMA8ev5aoujuM4AQgAo5xTWEBmso9cNpAt4e9W854dq9LPR6pB3LoBTAKO8QBI
pc/+UWezWCX49SX4zO2omrqRCMrtNy4UAeU9WyAxGQDTIRGcmiOM0p+JuInG9P2S
D4YCz2HwX6p7/P3gLuRpqU8VteInXWeIAFFj7piaCZSeHG8w1/wiPhx46GjByqUJ
80dzrew7o0bxg3Fi5uuFlnKEIOMUgjMWbCGEBArvdeGO1XElrSMU475klUfrvFyS
Z3106Np2VMDdIfQEbpomCBjqj+woc36Cfbx3aPzI8Gi+dmYd3zP8PsMgjcbIuxb2
quAzUtQwcJIAKR35E4l0OUzC0sCNLgddUCLqCoBCttJ+AWeGsGx+PlVWpXTVOr+j
Udc+wIYvblTxaogQVJLSl8HF/9321gp3duPF9CKWinbQfw6Rh7UQX6JoRaXBgVo3
tn2k+/Iq1gDZhyoeAq7pSGzV0J3GPPiY+SVbmjjzQIftW7pvuIhDT1iKKMloUyyt
Y+yURG9sqr92QGVDLX/x
=mmvL
-----END PGP MESSAGE-----
```

Now I just need to copy and paste this message to Daniel through Skype, an email, Slack or whatever.

Daniel will be able to easily decrypt the message through the same command line app or though the Keybase website.

The clear advantage is that I don't need to go around and find a person public key every time I want to send an encrypted message to someone. With Keybase I just have to remember his username from Twitter, Github or whatever.

It's still a little bit boring that I have to transfer my message manually, but the Keybase team has already developed a set of [APIs](https://keybase.io/docs/api/1.0) that, I guess, makes possible to fill the gap in terms of integration with other messaging apps.

The command line application has a lot of other handy features like messages certification and verification (signature) and in case you dislike the command line (which is unlikely if you are reading this blog), you can do pretty much everything directly on the website.

## Do you want to give it a try?

As you probably have guessed from the title of this post and the first paragraph Keybase is still in private beta and you need an invite to use it. If you haven't already received your **I have 8 invite code that I am willing to share**. They go to the **first 8 persons who will leave a comment\*** here 😉

<div style="background:rgb(226, 114, 114); color: #fff; padding: 1em; margin: 1em">
    <strong>Update (27 may 2015 12:20 GMT)</strong>: Invites are over :( <br/>I will try to request new ones. If you want you can keep commenting and I will give new eventual invites in the order of entry.
</div>

What are you waiting for?

PS: In case you want to "Track" (verify+follow) me on Keybase, check out [my Keybase profile](https://keybase.io/loige).
