---
title: Invite-only microsites with Next.js and AirTable
slug: invite-only-microsites-with-nextjs-and-airtable
subtitle: Build an invite-only website with Next.js, AirTable, custom React
  hooks, and Vercel deploy
date: 2022-08-09T07:40:00.000Z
updated: 2022-08-09T07:40:00.000Z
header_img: ./invite-only-microsites-with-nextjs-and-airtable.jpg
status: published
tags:
  - javascript
  - typescript
  - react
  - nextjs
  - jwt
description: Learn how to create a private, invite-only website using Next.js,
  AirTable, custom React hooks, and Vercel deploy. The post covers backend APIs
  in Next.js, data storage with AirTable, validating access with invite codes,
  collecting user input, and deploying the final app.
---

I recently needed to create an invite-only Next.js-powered microsite (for my wedding 🌸) and in this article I'm going to show you how I went about creating invite codes and how I implemented code validation in the app, using Next.js API endpoints and [AirTable](https://airtable.com/invite/r/fQpMoVmw) as a lightweight backend.

## The use case and the tech stack

24 June 2022 was the best day of my life.

Seriously, I got married with the human being I love the most and everything was just perfect.

But we are not here to talk about my wedding, right?

Well, we kinda are, but in a nerdy kind of way that only software engineers can (hopefully) appreciate. OK, don't tell my wife I said that... 🤫

Specifically, we will discuss how to implement an invite-only microsite to share information with all the people invited to a private event.

Just to put things in context, let's wear the PM hat for a second, and let's discuss what kind of requirements did I impose on myself while building my wedding website:

- I wanted to be able to iterate quickly, mostly focusing on content and design, not much on infrastructure.
- I wanted to build a simple solution that would be easy to host, maintain and update.
- I wanted to have a very lightweight backend, possibly something managed.
- Even better if I could give access to the data storage to someone else (my wife) so that we could collaborate on managing the data about the guests.
- If I could host everything very cheaply (if not even freely), that would be great.

For all the reasons above I settled for adopting the following pieces of tech:

- **Next.js** for building a statically rendered frontend and the backend APIs
- A private **GitHub** repository for managing the code of the Next.js app
- **Vercel** for hosting the project
- **AirTable** to store and manage all the data (invite codes, guests, rsvp, etc.)

Keep in mind that Next.js is free and open source, GitHub can be used for free (even if you want to keep your repo private), and Vercel and AirTable have both generous free plans that are more than enough for this kind of use case.

With the stack above I ended up spending 0 money and I was able to complete the project in a couple of weekends! 🤑👌

## Making a Next.js site private

On top of the requirements discussed above, my wedding website had 2 additional constraints:

- Every different guest should see something different (the website would look like a custom invite letter for them).
- People without an invite code should not be able to access any content on the website.

The following illustration shows how I went about making that happen in the context of a React SPA (Single Page Application):

![Illustration showing how to make a React SPA built with Next.js invite-only using AirTable as a data storage](./how-to-make-a-react-spa-invite-only.png)

Please boost my ego for a second, isn't this a beautiful illustration? 😜

OK, let's be serious:

1. The user loads the application by visiting the website with a personal invite code (passed as a query string parameter). When the page is loaded the React application starts on the client side. The app displays only a loading spinner at this stage.
2. The first thing that the application does is to read the invite code from the URL. At this point, it can call the backend (a Next.js API endpoint running on Vercel) to get the invite code validated. In turn, the backend requests the data storage (an AirTable spreadsheet) to check if the code exists (in which case it's valid). If the code exists, the backend also returns the custom information associated with that invite code. For instance, the name of the invited person.
3. If the code is valid, the application has all the information to render the private website.
4. If it is not valid, an error message is displayed instead.

## Let's build an invite-only website!

No, I am not going to show you my private wedding website (sorry, not sorry)!

Instead, we are going to build a more fictional example in this article: an invite-only website for a **secret pizza party**.
Here's what different invites will look like:

![Examples of different invites on our website](./sample-invites-pizza-party.png)

As you can see from the picture, every guest (with a valid invite code) will get a custom invite page with their name, favorite color, etc.

If you want to see a preview, check out the following links:

- [Leonardo's invite](https://secret-pizza-party.vercel.app/?code=14b25700-fe5b-45e8-a9be-4863b6239fcf)
- [Michelangelo's invite](https://secret-pizza-party.vercel.app/?code=ce7d5886-2166-4aee-8038-548f68b9739d)
- [Raffaello's invite](https://secret-pizza-party.vercel.app/?code=ef7ab7b7-33d5-43b9-ad73-e73bb8fd8e77)
- [Donatello's invite](https://secret-pizza-party.vercel.app/?code=b0cbb4a4-8a31-4bc1-bee9-d6fe39c1a6b3)

Of course, if the invite code is missing or if it's not valid, an [error page](https://secret-pizza-party.vercel.app/?invite=invalid) is displayed.

If you are curious to take a look at the code, it's all [public and hosted on GitHub](https://github.com/lmammino/secret-pizza-party) (did you give it a star already?)...

## Handling sensitive data in a SPA

Sorry, I have to pause here for a second because before we get our hands dirty, we need to talk about... **Security**! Security always comes first! 👷‍♀️

It's important to keep in mind that, with this particular design, all the UI logic and the content are already available in the JavaScript bundle representing the Single Page Application.

On top of that, the website is hosted on Vercel, so it's publicly available on the internet.

Even if we end up displaying the "invalid invite" message to the user, a crafty user could still download all the frontend JavaScript code for our application and understand what should have been visualized with a valid invite.

Let me show you what I mean with a picture:

![Disclosing sensitive information in the JavaScript bundled code](./disclosing-sensitive-information-in-bundled-code.png)

In a dummy version of this website, I was keeping all the sensitive data (for instance here, the date and place of the event) hardcoded in my JSX code. This means that an experienced user, even if they don't have a valid invite code, could technically have a peek at the JavaScript bundle and extrapolate a lot of sensitive information.

For this reason, it's important to keep any sensitive information outside the frontend code. In the case of a wedding website, you probably wouldn't want to disclose to the entire world things like the event date, the location, emergency phone numbers, etc.

All the data that we need to keep private (only available to someone with a valid invite code) must be fetched doing an API call to the backend.

In a way, we can imagine the invite code as an API key that gives people access not just to the website, but also to all the sensitive data that the website will display.

Of course, make sure to keep your repository private, otherwise, that might become another way to access sensitive information embedded in your API code...

Finally, it's also important that your user understand that they shouldn't be sharing their unique URL with other people. So make sure to warn them when you send them the invite URL.

In summary, here are some good security rules we will abide by:

1. The website is public
2. We are enforcing access control from the client side
3. The client-side cannot be trusted (all its code is publicly accessible)
4. A backend needs to be used to validate the code and return any sensitive information that needs to be accessible only with a valid invite code.
5. For extra security, keep your repo private and make sure your user won't share their invite URL with other people!

## Generating and storing invite codes

We said we are going to be using [AirTable](https://airtable.com/invite/r/fQpMoVmw) as storage for invite code and related information.

AirTable is a SaaS that allows you to easily manage different kinds of datasets. You can do a lot through its web interface, but you can also use the data programmatically, turning it into a convenience database for simple types of applications.

For this particular use case, Airtable offers a [public REST API](https://support.airtable.com/hc/en-us/articles/203313985-Public-REST-API) and SDKs in various programming languages, including [JavaScript](https://github.com/airtable/airtable.js).

We can start by creating a new _base_ (which is kinda a workspace in AirTable lingo) and create a grid data view into it.

This first data table will contain all our invite codes, so let's call it **invites**:

![An example of how we could structure the AirTable table](./airtable-sample-table.png)

As displayed in the picture above we are adding a few fields there:

- `invite`: a UUID that represents the invite code
- `name`: the name of the invited guest
- `favouriteColor`the favorite color of the guest
- `weapon`the weapons of the guest (small note: in real life I am not pro weapons, but if you haven't got it yet, we are talking about Mutant Ninja Turtles™️ here... 😝)

This makes sense for our fictional example. In a more generic use case, you'll be adding here all the pieces of information that are unique for every single guest.
Note that on this website we also have a mini RSVP form. This means that we will be able to collect some data from the users. This is also something that we will be storing in AirTable.

<details style="margin-top: 1em">
  <summary>Are you following along and want an easy way to import this table into your Airtable base? (expand here)</summary>

  <div style="background: #eee; margin-top: 1em; padding: 1em; border: 2px dotted #ccc; border-radius: 10px;">

Airtable allows to import data into a base from a CSV, so here's my example data in CSV format:

```plaintext
invite,name,favouriteColor,weapon
14b25700-fe5b-45e8-a9be-4863b6239fcf,Leonardo,blue,Twin Katana
ce7d5886-2166-4aee-8038-548f68b9739d,Michelangelo,orange,Nunchaku
ef7ab7b7-33d5-43b9-ad73-e73bb8fd8e77,Raffaello,red,Twin Sai
b0cbb4a4-8a31-4bc1-bee9-d6fe39c1a6b3,Donatello,purple,Bo
```

  </div>
</details>

## Reading invite codes using the AirTable SDK

> **Note**: from this point I will assume that you have already scaffolded your Next.js application. If you need help doing that you can check out [The official Next.js docs](https://nextjs.org/learn/basics/create-nextjs-app) or just run the following command:
>
> ```bash
> npx create-next-app@latest --typescript --use-npm
> ```
>
> Also note that, at the time of writing, I am using **Next.js version 12.2**. If you are reading this in a distant future, you might have to change something in the following code examples!

Because we are using TypeScript, the first thing that we want to do is spend a few minutes to think how to represent our invites.

The easiest thing I could come up with was to create a file called `types/invite.ts` with the following definition:

```typescript
export interface Invite {
  code: string
  name: string
  favouriteColor: string
  weapon: string
  coming?: boolean
}
```

This should probably be enough for our use case.

Now is the time to start writing some code to interact with the data on our AirTable _base_.

To do that, the first thing we need to install the `airtable` package:

```bash
npm i --save airtable
```

We will also need to grab our Airtable API KEY from the [AirTable account page](https://airtable.com/account) and the _base ID_ from the [API page](https://airtable.com/api) (select your workspace and the API docs should show you the _base ID_ in the introduction section).

For development convenience we are going to store these two variables as environment variables:

```bash
export AIRTABLE_API_KEY="put your api key here"
export AIRTABLE_BASE_ID="put your base id here"
```

If you go back to the API docs, you might appreciate that the docs are automatically generated for your workspace. You should see a section called "invites table" describing all the fields available in our grid!

![Example of documentation page for AirTable](./airtable-api-documentation-page.png)

Isn't this an awesome way to provide documentation?! And you can even get a bunch of `curl` and JavaScript code examples.

What we want to do right now is to be able to retrieve a record by invite code. One way to do that is to list all the records and use a filter to try to match based on our invite code field. We can visit the section _List records_ to have a feeling for how we could do that. If we switch to the JavaScript code example we will see something like this:

```javascript
var Airtable = require('airtable')
var base = new Airtable({ apiKey: 'YOUR_API_KEY' }).base('YOUR_BASE_ID')

base('invites')
  .select({
    // Selecting the first 3 records in Grid view:
    maxRecords: 3,
    view: 'Grid view',
  })
  .eachPage(
    function page(records, fetchNextPage) {
      // This function (`page`) will get called for each page of records.

      records.forEach(function (record) {
        console.log('Retrieved', record.get('invite'))
      })

      // To fetch the next page of records, call `fetchNextPage`.
      // If there are more records, `page` will get called again.
      // If there are no more records, `done` will get called.
      fetchNextPage()
    },
    function done(err) {
      if (err) {
        console.error(err)
        return
      }
    },
  )
```

OK Airtable, you did such a great job with the auto-generated docs, but come on! What kind of JavaScript is this?! Still using `var`, _CommonJS_, and _callbacks_? 😢

Well, I guess we will need to roll up our sleeves and do a bit of extra work to make this nice and modern...

Let's start by creating a new file called `utils/airtable.ts` and let's create a helper function there to get an invite by id:

```typescript
import Airtable from 'airtable'
import { Invite } from '../types/invite'

// make sure all the necessary env vars are set
if (!process.env.AIRTABLE_API_KEY) {
  throw new Error('AIRTABLE_API_KEY is not set')
}
if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error('AIRTABLE_BASE_ID is not set')
}

// create a new Airtable client and gets a reference to the
// airtable base containing our invites
const airtable = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY })
const base = airtable.base(process.env.AIRTABLE_BASE_ID)

// get an invite by invite code (promisified)
export function getInvite(inviteCode: string): Promise<Invite> {
  return new Promise((resolve, reject) => {
    base('invites')
      // runs a query on the `invites` table
      .select({
        filterByFormula: `{invite} = ${escape(inviteCode)}`,
        maxRecords: 1,
      })
      // reads the first page of results
      .firstPage((err, records) => {
        if (err) {
          // propagate errors
          console.error(err)
          return reject(err)
        }

        // if the record could not be found
        // we consider it an error
        if (!records || records.length === 0) {
          return reject(new Error('Invite not found'))
        }

        // otherwise we create an invite object from the first record
        // (there should be only one with the give code) and return it
        const result = {
          code: String(records[0].fields.invite),
          name: String(records[0].fields.name),
          favouriteColor: String(records[0].fields.favouriteColor),
          weapon: String(records[0].fields.weapon),
          coming:
            typeof records[0].fields.coming === 'undefined'
              ? undefined
              : records[0].fields.coming === 'yes',
        }

        resolve(result)
      })
  })
}
```

I left enough comments in the code, that an additional explanation should not be necessary!
We are essentially using the `airtable` SDK and building a nicer promise-based interface to get an invite by invite code.

Ok, for the eagle-eyed ones, you are probably wondering where the heck is that `escape` function coming from?! I elided it from the code to keep things simple. The TLDR; is that **it makes things more secure** by reducing the risk of _injections_.

<details style="margin-top: 1em">
  <summary>But "the how" needs a bit of a long-ish explanation (expand here if you are curious. Yes, you should be!).</summary>

  <div style="background: #eee; margin-top: 1em; padding: 1em; border: 2px dotted #ccc; border-radius: 10px;">
  
  Every time you use user input to construct some kind of query, your spider senses should be immediately triggered! 🕷

The invite code is, in fact, user-controlled. It's part of the query string in the URL. A user can decide to change that and try to see what happens with different values.

If the user inputs `?code=14b25700-fe5b-45e8-a9be-4863b6239fcf` as invite code, with a naïve string interpolation, we would be producing the following Airtable formula:

```plaintext
{invite} = '14b25700-fe5b-45e8-a9be-4863b6239fcf'
```

But what if a very evil user tries something like `?code=%27%20>%3D%200%20%26%20%27` (`?code=' >= 0 & '` unencoded)?!

In this case, we end up constructing the following Airtable formula:

```plaintext
{invite} = '' >= 0 & ''
```

Which always evaluates to `1` (`true`) for every record in the table! So this very evil user is now accessing your private website without having to know a valid code. They will just get the code of the first record that Airtable matches in the table! If you don't believe me you can try this attack by yourself [with this link](https://secret-pizza-party-fgpypfb66-lmammino.vercel.app/?code=%27%20%3E%3D%200%20%26%20%27) (running on a [vulnerable branch](https://github.com/lmammino/secret-pizza-party/tree/vulnerable) of the app where we don't perform the escape).

This is like [SQL injections](https://owasp.org/www-community/attacks/SQL_Injection) but for Airtable filter formulas! 😱

The `escape` function, allows us to try to sanitize user input and escape dangerous characters like `'` and `"` which might allow a malicious actor to alter the structure of our filter formula.

If you are curious this is my basic implementation of the `escape` function (the one I used in this project), but I have to say I am quite disappointed that Airtable does not provide a built-in utility for this in their SDK and that they don't warn their users about this threat in their docs... 🙁

```ts
function escape(value: string): string {
  if (value === null || typeof value === 'undefined') {
    return 'BLANK()'
  }

  if (typeof value === 'string') {
    const escapedString = value
      .replace(/'/g, "\\'")
      .replace(/\r/g, '')
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
    return `'${escapedString}'`
  }

  if (typeof value === 'number') {
    return String(value)
  }

  if (typeof value === 'boolean') {
    return value ? '1' : '0'
  }

  throw Error('Invalid value received')
}
```

Note that **this function does not claim to be perfect or comprehensive**. I haven't extensively tested it, nor do I know all the bells and whistles of the formula syntax to be able to do that. If you are doing something like this in your code, make sure to test this extensively.

PS: I nudged Airtable [on Twitter](https://twitter.com/loige/status/1555622372085997569) (with no response) and [their community forum](https://community.airtable.com/t/standard-way-to-prevent-formula-injections-when-using-airtable-as-a-backend-through-sdk/50283) (well, let's just say that the thread wasn't received particularly well by some members of the community and that the conversation derailed a little...). I also reached out to their support channels and, hopefully, this will get somewhere...

  </div>

</details>

Now that we have created this utility function, we can use it in an API to be able to provide code validation and invite data to the frontend.

## Next.js invite endpoint

I am generally not a big fan of convention-based frameworks like Next.js. Conventions cannot be comprehensive and sometimes you find yourself trying to adapt your problem to whatever convention the framework is forcing you to use, rather than adopting the optimal approach for the problem at hand.

In any case, I find that I enjoy using Next.js for small personal projects. The level of productivity is generally quite high and Next.js can make your life easy in many different ways.

One of the features that I love the most is how easy it is to build APIs for the frontend application.

To create an API endpoint you just need to create a file under `pages/api`. For instance, if you want to create a hello world API, you could simply create the following file in `pages/api/hello.ts`:

```ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ message: string }>,
) {
  return res.status(200).json({ message: 'Hello World' })
}
```

Now you can simply call this API by sending a request to `http://localhost:3000/api/hello`. The convention says that the API path follows the file name (`hello.ts` -> `/api/hello`):

```plaintext
❯ curl -i http://localhost:3000/api/hello
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8
ETag: "19-c6Hfa5VVP+Ghysj+6y9cPi5QQbk"
Content-Length: 25
Vary: Accept-Encoding
Date: Sun, 07 Aug 2022 16:25:20 GMT
Connection: keep-alive
Keep-Alive: timeout=5

{"message":"Hello World"}
```

If you want to learn more about how to create API endpoints with Next.js check out the [official documentation](https://nextjs.org/docs/api-routes/introduction).

Ok, so let's use what we just learned to create an API endpoint that allows the frontend to validate the user invite code and retrieve the related invite data. Let's create write our code in `pages/api/invite.ts`:

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { InviteResponse } from '../../types/invite'
import { getInvite } from '../../utils/airtable'
import messages from '../../data/messages'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<InviteResponse | { error: string }>,
) {
  // if the request is not a GET, return an error
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // if the code is missing we return a 400 error
  if (!req.query.code) {
    return res.status(400).json({ error: 'Missing invite code' })
  }

  // If there are multiple invite codes (?code=x&code=y)
  // we pick the first one and ignore the rest
  const code = Array.isArray(req.query.code)
    ? req.query.code[0]
    : req.query.code

  try {
    // we use our Airtable utility to get the invite data for a given code
    // and return the result to the user
    const invite = await getInvite(code)
    res.status(200).json({ invite, messages })
  } catch (err) {
    // In case of error we return either a 401 or a 500 error:
    // - if the code was not found we return 401
    // - otherwise we return a generic 500 server error
    const e = err as Error
    res
      .status(e.message === 'Invite not found' ? 401 : 500)
      .json({ error: e.message })
  }
}
```

Once again the code is sufficiently commented out, so, hopefully, it's easy enough to follow.

But there are a few details that we need to discuss: what the `InviteResponse` type is and what the `messages` variable is.

`InviteResponse` is a type that I have sneakily added to `types/invite.ts`, which now looks like this:

```ts
import { Messages } from '../data/messages'

export interface Invite {
  // ... (unchanged, elided for brevity)
}

export interface InviteResponse {
  invite: Invite
  messages: Messages
}
```

The idea is that when a user has a valid code we want this API to return 2 different pieces of information:

1. All the data associated with the invite (inside `invite`)
2. All the sensitive messages that the UI will need to display to _authenticated_ users.

All the messages are stored in `data/messages.ts`, which currently looks like this:

```ts
const messages = {
  title: 'Secret Pizza Party!',
  date_and_place: 'Dec 31st 2022 - 122 and 1/8th, New York City',
  invitation:
    'You have been invited to the most awesome secret pizza party of the year!',
  question: 'Are you coming?',
  answer1: 'Cowabunga! (yes)',
  answer2: 'Nitwits! (no)',
  secret_person: 'Shredder',
}

export type Messages = typeof messages
export default messages
```

The reason why we return these messages from the API (rather than embedding them in the frontend application code) is that this way these messages won't be included in the JavaScript bundle. So, a user without an invite code won't be able to extract potentially sensitive information from the JavaScript bundle of the frontend application.

## Invite validation in React

Great!

At this point, we have a _mini-database_ (if we want to call our AirTable table like that) and an API to get invite data.

We can finally start to work on the frontend!

The first thing that we can do is to build a **custom React hook** that can do the following:

1. Grab the invite code from the current URL
2. Call the invite API using the invite code
3. Expose the returned invite data and the messages
4. Also, expose possible errors throughout the process

I am going to go ahead and show you the code (`components/hooks/useInvite.tsx`), but if you want to review React docs on how to build custom hooks [here's the page](https://reactjs.org/docs/hooks-custom.html).

Our custom hook will be using React's built-in [`useState`](https://reactjs.org/docs/hooks-state.html) hook to handle state and [`useEffect`](https://reactjs.org/docs/hooks-effect.html) to run code on component mount.

```tsx
import { useState, useEffect } from 'react'
import { InviteResponse } from '../../types/invite'

// Defines the endpoint based on the current window location
const API_BASE =
  typeof window !== 'undefined' && window.location.origin + '/api'
const INVITE_ENDPOINT = API_BASE + '/invite'

// Helper function that uses fetch to invoke the invite API endpoint
async function fetchInvite(code: string): Promise<InviteResponse> {
  const requestUrl = new URL(INVITE_ENDPOINT)
  requestUrl.searchParams.append('code', code)
  const response = await fetch(requestUrl)
  if (!response.ok) {
    throw new Error('Invalid code')
  }
  const invite = await response.json()
  return invite
}

// The custom hook
export default function useInvite(): [InviteResponse | null, string | null] {
  // This hook has the inviteResponse and a possilbe error as state.
  const [inviteResponse, setInviteResponse] = useState<InviteResponse | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)

  // We want to make the API call when the component using the hook
  // is mounted so we use the useEffect hook.
  useEffect(() => {
    // We read the code from the current window URL.
    const url = new URL(window.location.toString())
    const code = url.searchParams.get('code')

    if (!code) {
      // If there is no code, we set an error message.
      setError('No code provided')
    } else {
      // If we have a code, we get the associated data.
      // In case of success or failure we update the state accordingly.
      fetchInvite(code)
        .then(setInviteResponse)
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [])

  // We return the state variables.
  return [inviteResponse, error]
}
```

We can now import this hook into any component and use it like this:

```tsx
import React from 'react'
import useInvite from './hooks/useInvite'

export default function SomeExampleComponent() {
  const [inviteResponse, error] = useInvite()

  // there was an error
  if (error) {
    return <div>... some error happened</div>
  }

  // still loading the data from the backend
  if (!inviteResponse) {
    return <div>Loading ...</div>
  }

  // has the data!
  return <div>actual component markup when inviteResponse is available</div>
}
```

Note how the hook nicely abstracts the data fetching operation, but we still need to keep into account that this operation will be asynchronous and we need to handle the 3 possible states: _loading_, success, and error.

The code above is very similar to the actual `Home` component in our application. There isn't much value in showing the entire source code here once you understand the idea, but if you are curious you can find the full source in [`components/Home.tsx`](https://github.com/lmammino/secret-pizza-party/blob/main/components/Home.tsx).

At this point, the only thing that is missing is to use the `Home` component in the single page that we are going to have in our Next.js application (it's a Single Page Application after all).

In Next.js, page components are components inside the `page` directory. In our case we will only have the index page, so the component is [`pages/index.tsx`](https://github.com/lmammino/secret-pizza-party/blob/main/pages/index.tsx).

Finally, if you run the application locally, you should have a loading screen and then a success error (with a valid invite code) or an error (if you didn't provide a code or if you have an invalid one). 🎉

## Collecting user data

So far we have only been reading data from our Airtable table, but nothing is stopping us from also writing data into it!

For example, once a user reaches their invite page, they have an option to RSVP to the event. How are we going to store their answer?

The simplest idea that comes to mind is to add a new column to our table for the field "coming":

![Airtable option field to track whether guests are coming or not](./airtable-option-field-coming.png)

The field we added is a **single select** type of field. We added two possible values: **yes** and **no**. In alternative we could have used a boolean field, but with this approach it we actually can manage 3 possible states for user RSVP:

- _unknown_ (the gues hasn't submitted their RSVP yet)
- _coming_ ("yes")
- _not coming_ ("no")

Now you know why we have originally defined a `coming` field (optional boolean) in our `Invite` interface and why we were popoluating it in our `utils/airtable.ts` helper file! 🙃

In order to be allow our guests to submit their RSVP we need to do 4 main changes:

1. Update the Airtable utility file with a function to update the `coming` field for a recod
2. Create a new API endpoint to collects RSVP (using the new utility function from point 1.)
3. Update our `useInvite` hook to provide functionality to submit the RSVP (and handle progress)
4. Update the frontend to use the new functionality provided by the `useInvite` hook

We'll be doing some good amount of refactoring to introduce these changes, so let's roll up our sleeves and warm up our keyboards!

### The RSVP Airtable utility

In Airtable, every record in a table has a unique ID. If we know the ID we can use it to update one or more fields in that record.

In our application we have been using the invite code as unique ID and we already have some code written to be able to fetch a record by invite code.

It would be a good idea to refactor that code and extract the part that fetches a raw Airtable record. This way we can use this functionality in both our _retrieval_ and _update_ function (the latter which we still have to write).

So let's open our file `utils/airtable.ts` again and add the following changes:

```ts
import Airtable, { FieldSet, Record } from 'airtable'
// ...

export function getInviteRecord(inviteCode: string): Promise<Record<FieldSet>> {
  return new Promise((resolve, reject) => {
    base('invites')
      // runs a query on the `invites` table
      .select({
        filterByFormula: `{invite} = ${escape(inviteCode)}`,
        maxRecords: 1,
      })
      // reads the first page of results
      .firstPage((err, records) => {
        if (err) {
          // propagate errors
          console.error(err)
          return reject(err)
        }

        // if the record could not be found
        // we consider it an error
        if (!records || records.length === 0) {
          return reject(new Error('Invite not found'))
        }

        // returns the first record
        resolve(records[0])
      })
  })
}
```

You might have noticed that this function is almost identical to the `getInvite` function we wrote before, we are just returning the raw Airtable record, rather than mapping its data to an `Invite` object.

So it makes sense to avoid duplication and refactor our `getInvite`:

```ts
export async function getInvite(inviteCode: string): Promise<Invite> {
  const inviteRecord = await getInviteRecord(inviteCode)

  return {
    code: String(inviteRecord.fields.invite),
    name: String(inviteRecord.fields.name),
    favouriteColor: String(inviteRecord.fields.favouriteColor),
    weapon: String(inviteRecord.fields.weapon),
    coming:
      typeof inviteRecord.fields.coming === 'undefined'
        ? undefined
        : inviteRecord.fields.coming === 'yes',
  }
}
```

The function is now an `async` function. It simply calls our new utility method and performs the mapping to an `Invite` object. Pretty simple, right?

Ok, now we can finally write the utility that allows us to update the `coming` field for a given record (by it's invite code). Let's call it `updateRsvp`:

```ts
export async function updateRsvp(
  inviteCode: string,
  rsvp: boolean,
): Promise<void> {
  // gets the raw Airtable id of the record to update
  const { id } = await getInviteRecord(inviteCode)

  return new Promise((resolve, reject) => {
    base('invites').update(id, { coming: rsvp ? 'yes' : 'no' }, (err) => {
      if (err) {
        return reject(err)
      }

      resolve()
    })
  })
}
```

One thing to remark here is that we are using the Airtable `update` method, which allows us to mutate a subset of fields (in our case only the `coming` field) and leave unchanged all the other fields. If you'll ever want to entirely replace a record, well, there's a `replace` method for that!

### The RSVP endpoint

Now we can put our `updateRsvp` utility to good use and expose it through an API endpoint. To do that we can create a new API route by adding the file `pages/api/rsvp.ts`:

```ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { updateRsvp } from '../../utils/airtable'

type RequestBody = { coming?: boolean }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ updated: boolean } | { error: string }>,
) {
  // if the request is not a PUT, return an error
  if (req.method !== 'PUT') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  // if the code is missing we return a 400 error
  if (!req.query.code) {
    return res.status(400).json({ error: 'Missing invite code' })
  }

  const reqBody = req.body as RequestBody

  // if the code is missing we return a 400 error
  if (typeof reqBody.coming === 'undefined') {
    return res.status(400).json({ error: 'Missing `coming` field in body' })
  }

  // If there are multiple invite codes (?code=x&code=y)
  // we pick the first one and ignore the rest
  const code = Array.isArray(req.query.code)
    ? req.query.code[0]
    : req.query.code

  try {
    await updateRsvp(code, reqBody.coming)
    return res.status(200).json({ updated: true })
  } catch (err) {
    // In case of error we return either a 401 or a 500 error:
    // - if the code was not found we return 401
    // - otherwise we return a generic 500 server error
    const e = err as Error
    res
      .status(e.message === 'Invite not found' ? 401 : 500)
      .json({ error: e.message })
  }
}
```

A few things to note here:

- The API endpoint is now live at `http://localhost:3000/api/rsvp`.
- This API receives 2 pieces of information: the invite code as a query string parameter and the `coming` field in the request body (encoded as a JSON object with just the `coming` field).
- This API is a `PUT` endpoint. We are receiving some partial data to update a record so it makes sense to use PUT.
- We are not being entirely _RESTful_ (mostly for simplicity). If we wanted to be _RESTful_ we should have created a `PUT` endpoint on the `/api/invite/{code}` path. This is possible in Next.js but it's slightly more involved, so I went for a simpler solution (since this is a small pet project).

### `useInvite` hook version 2

Ok, now that we have an API to update to submit an RSVP, we can update the `useInvite` hook to take advantage of this functionality. Be warned: we'll also be doing some decent amount of refactoring here... Let's update the `useInvite` code in `components/hooks/useInvite.tsx`:

```tsx
// ...

// adds the URL of the new endpoint
const RSVP_ENDPOINT = API_BASE + '/rsvp'

// type for the data returned by the hook
// since we want to return 4 different pieces of information
// it's better to organise them in an object, rather tha using
// an array
interface HookResult {
  inviteResponse: InviteResponse | null
  error: string | null
  updating: boolean
  updateRsvp: (coming: boolean) => Promise<void>
}

// ...

// Helper function that invokes the rsvp API endpoint
async function updateRsvpRequest(code: string, coming: boolean): Promise<void> {
  const requestUrl = new URL(RSVP_ENDPOINT)
  requestUrl.searchParams.append('code', code)
  const response = await fetch(requestUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ coming }),
  })
  if (!response.ok) {
    throw new Error('Failed to update RSVP')
  }
}

export default function useInvite(): HookResult {
  const [inviteResponse, setInviteResponse] = useState<InviteResponse | null>(
    null,
  )
  const [error, setError] = useState<string | null>(null)
  // new state field to track when an RSVP update is in progress
  const [updating, setUpdating] = useState<boolean>(false)

  useEffect(() => {
    const url = new URL(window.location.toString())
    const code = url.searchParams.get('code')

    if (!code) {
      setError('No code provided')
    } else {
      fetchInvite(code)
        .then(setInviteResponse)
        .catch((err) => {
          setError(err.message)
        })
    }
  }, [])

  // new hook function that exposes the ability to update the current invite by
  // providing a value for the `coming` field
  async function updateRsvp(coming: boolean) {
    if (inviteResponse) {
      setUpdating(true)
      await updateRsvpRequest(inviteResponse.invite.code, coming)
      // updates the current invite response, by cloning the original
      // object and updating the `coming` property.
      setInviteResponse({
        ...inviteResponse,
        invite: { ...inviteResponse.invite, coming },
      })
      setUpdating(false)
    }
  }

  // We return the state variables and the updateRsvp function.
  return { inviteResponse, error, updating, updateRsvp }
}
```

Some code was omitted. You should have gotten an idea for the main changes, but feel free to check the full content of the file [in the repository](https://github.com/lmammino/secret-pizza-party/blob/main/components/hooks/useInvite.tsx) in case you are following along and using this as an hands-on tutorial.

### Using the updated hook

I have mixed feelings when it comes to hooks and react. They are sometimes hard to use correctly because of the many rules around them, but to be honest, once you get the gist of them, they are pretty darn convenient.

In this case, our `useInvite` hook can deliver us a lot of value. In fact, it encapsulates all the business logic and lifecycle management to deal with loading and updating invites for the current user. When using this hook in a component, we don't really have to worry too much about all of these concers: we can literally just access the data and decide when to trigger an update, the hook will handle everything else and trigger a re-render when necessary.

Let's see how we can use the hook now. Again, there isn't much point in showing all our actual code, so let's observe a simplified example that illustrates the point (you can still [see the complete file in the repository](https://github.com/lmammino/secret-pizza-party/blob/main/components/Home.tsx)).

```tsx
import React, { ChangeEvent } from 'react'
import useInvite from './hooks/useInvite'

// ...

export default function Home() {
  // We are now destructuring all the hook attributes and functions
  //  - inviteResponse: the invite response (when available)
  //  - error: an error message (if there was an error loading the data)
  //  - updating: a boolean that will be true if an update is in progress
  //  - updateRsvp: the function that allows us to update the current invite (coming or not)
  const { inviteResponse, error, updating, updateRsvp } = useInvite()

  if (error) {
    // There was an error loading the data
    return <div>Duh! {error}</div>
  }

  if (!inviteResponse) {
    // Still loading the invite data
    return <div>Loading...</div>
  }

  // Utility function to trigger an update when the user
  // checks one of the radio buttons to RSVP
  function onRsvpChange(e: ChangeEvent<HTMLInputElement>) {
    const coming = e.target.value === 'yes'
    updateRsvp(coming)
  }

  // Data loaded correctly: we can display the UI!
  return (
    <div>
      <fieldset disabled={updating}>
        <legend>Are you coming?</legend>

        <label htmlFor="yes">
          <input
            type="radio"
            id="yes"
            name="coming"
            value="yes"
            onChange={onRsvpChange}
            checked={inviteResponse.invite.coming === true}
          />
          YES
        </label>

        <label htmlFor="no">
          <input
            type="radio"
            id="no"
            name="coming"
            value="no"
            onChange={onRsvpChange}
            checked={inviteResponse.invite.coming === false}
          />
          NO
        </label>
      </fieldset>
    </div>
  )
}
```

Note how the two `input` have an `onChange={onRsvpChange}` to actually trigger the change when the user checks one of the radio buttons. `onRsvpChange` will in turn invoke `updateRsvp` from the hook, using the value of the selected radio button (`"yes"` or `"no"` will turn into `true` or `false`).

We also control the input, by specifying `checked={inviteResponse.invite.coming === <value>}`, so that the input updates accordingly when the data is actually changed by the `useInvite` hook.

### Working app

At this point we should have a working application!

One thing that I really like about Airtable is that, when you are looking at a table in their web UI, if the underlying data changes, you'll see a flash that showcases the change.

This is a pretty great way to test how our application is actually changing the data in real-time:

![Airtable dynamic table update animation](./airtable-dynamic-table-update-example.gif)

Cool, isn't it? 😎

## Deploying to Vercel

Now we have a fully functional application. We are able to get users in only if they have a valid invite code and we can even register their RSVP.

But all of this is running on our local machine, so how do we put it online?

Next.js websites can be deployed in a number of places, but being a Vercel product, it should be no surprise the deploying on Vercel is the easiest option (at least for what I have tried).

This is roughly the list of steps that you should take to deploy on Vercel (from GitHub):

- Once you have all your code in a repository on GitHub, you can create an account on [Vercel](https://vercel.com/) by logging in using GitHub.
- At this point, you can create a new project (there's a big button for that) and then select **import Git Repository**.
- From that window you should see a list containing all your GitHub repositories.
- Select the repository with your code and cick on **import**.
- At this point Vercel will automatically build your code and deploy it, giving you a **.vercel.app** unique domain.
- If you want, you can also customise the domain and provide a custom one!

What happened behind the scens is that Vercel has deployed all your static assets (HTML, CSS, JavaScript, images,etc) to a CDN and all your API code to a serverless runtime that will be spawn up on demand when new requests arrive.

The best part is that, once you have done all of this and you have your website online, Vercel has already setup a simple but effective CI/CD workflow for you:

- Every time you deploy to your `main` branch, Vercel will automatically build and release the changes
- If you deploy on another branch, Vercel will deploy and release the changes, but on a temporary URL that you can use to preview your changes.

![Vercel Application dashboard](./vercel-application-dashboard.png)

That's it! You can finally share your invite-only website will all your guests, and I am sure they are going to love it! 😜

## A backend-less alternative approach

Before we wrap up, I want to give a quick mention to an idea I had while I was writing this post.

If we relax a bit our requirements removing the fact that we might want to collect user data (RSVP), there migth be a _"backend-less"_ alternative implementation.

Rather than using random invite codes, we could, in fact, use [JSON Web Tokens](/whats-in-a-jwt).

We could embed all the necessary information into the token paylos:

```bash
❯ jwtinfo "eyJhbGciOiJFUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTGVvbmFyZG8iLCJmYXZvdXJpdGVDb2xvciI6ImJsdWUiLCJ3ZWFwb24iOiJUd2luIEthdGFuYSJ9.Ac69w5qHwnpzX3DZX4np-AZxcYcUA2D1aW64O2wB53v277MmamEuALJp6un2LTkYAeyciCz8eY6bRMNf9tq9e_KRAZcznffZf-vNUnzaWh9TgFhKuEdn2kI8B4d4NBP0TSW6iq-PLNVfwzldjilYA-QJRevcztSmcc-cEpZHukQdUHjy" | jq .

{
  "favouriteColor": "blue",
  "name": "Leonardo",
  "weapon": "Twin Katana"
}
```

Yes, you should totally check out [the story of this cool `jwtinfo` command](/learning-rust-through-open-source-and-live-code-reviews)!

The JWT signature should be generated using an asymmetric algorithm like `ES512`. At that point the frontend could embed the public key and use it to validate tokens and decide to show the information or not.

This would a be a very simple approach and it's not free from flaws, for example:

- All the information needs to be embedded in the token
- You won't have a way to fetch private information from an API, so you are forced to put more stuff into the token or end up leaking sensitive information in your JavaScript bundle

Still this simple approach might be good enough for simple websites that might be building for your friends and family!

Plus, you'd get to use JWT, which is a cool technology! 😜

As always, keep in mind that in technology there isn't a perfect solution, just a different set of tradeoffs!

## Conclusion

In this post we learned how to build an invite only Single Page Application using Next.js and Airtable as a data storage layer.

In the process we also saw how to create backend APIs with Next.js, how to create custom hook to simplify data fetching and update from the frontend and how to deploy our final creation to Vercel.

I am curious to know what you think about this approach and if you are thinking to use this for some personal or work projects.

Do let me know in the comments and, if you found this post valuable, consider [following me on Twitter](https://twitter.com/loige) and sharing this article!

Thank you and see you in the next article! 👋
