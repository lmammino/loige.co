import React from 'react'
import { graphql } from 'gatsby'
import { get } from 'lodash'

import SEO from '../../src/components/SEO'
import Layout from '../../src/components/layout'
import ResponsiveWrapper from '../../src/components/ResponsiveWrapper'
import ArticleContainer from '../../src/components/ArticleContainer'

const CommentPolicy = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  return (
    <Layout section="blog">
      <SEO
        path={`comment-policy/`}
        pageData={{
          frontmatter: {
            title: `Blog comment policy - ${siteTitle}`,
            meta_description:
              "Luciano Mammino's Blog comment policy. TLDR: be polite and do your best to deliver great stuff and share your passion"
          }
        }}
      />
      <ResponsiveWrapper>
        <ArticleContainer>
          <h1 style={{ marginTop: '4em' }}>Comment Policy</h1>
          <p>
            Whatever&apos;s going on in the software development industry, good
            or bad, I believe the best course of action is to be polite and do
            your best to deliver great stuff and share your passion for this
            industry we love.
          </p>

          <blockquote>
            <p>Code is a way to change the World</p>
          </blockquote>

          <p>
            This is one of my personal mottos and one of my core belief! I want
            you to embrace it while you are in this space.
          </p>

          <p>
            Naturally, internet arguments happen and that&apos;s ok: that&apos;s
            communication at work. Having arguments doesn&apos;t mean you have
            to be mean (pun intended), but it means having constructive
            discussions where you have space to compare different points of
            view, respecting other people ideas.
          </p>

          <p>
            Here&apos;s our site terms to keep everyone sane and the environment
            positive and constructive:
          </p>

          <h2 id="howisthissitemoderated">How is this site moderated?</h2>

          <p>Generally speaking, don&apos;t be unpolite or offensive.</p>

          <p>
            I use this as a general guide to what is ok and isn&apos;t on our
            sites. It is not to be interpreted verbatim. Ultimately, it is at my
            discretion how these rules are enforced. Please don&apos;t get
            banned (or get your comments deleted) for something that could have
            easily been avoided.
          </p>

          <p>Here&apos;s some examples of things I might not tolerate:</p>

          <h3 id="1hatespeechwillnotbetoleratedunderanycircumstances">
            1. Hate speech will not be tolerated under any circumstances
          </h3>

          <p>
            If you can&apos;t imagine saying something out loud in the middle of
            a real-life coffee shop, you can&apos;t do that here. If you want to
            call somebody something but wouldn&apos;t wear that on your t-shirt
            to PAX, you can&apos;t do that here. We don&apos;t want to censor
            anybody, but using hate speech or hateful or victimizing terms, even
            as an innocent joke, are just not cool.
          </p>

          <p>
            Examples: making rape jokes, using gay as a negative slur, being
            homo/transphobic, stigmatizing minority groups with pseudoscience,
            making fun of a new user&apos;s minor mistake to the point where
            they never come back. Please treat others with the same respect you
            were afforded when you joined us.
          </p>

          <h3 id="2dontpostnsfwcontentflametrollreadersadminsormoderators">
            2. Don&apos;t post NSFW content, flame, troll readers, admins, or
            moderators
          </h3>

          <p>
            If you attack an individual you&apos;ll be asked to go. Fight
            topics, not people.
          </p>

          <p>
            Of course, some content have NSFW elements and our editorial may
            contain some as well - just use common sense. Our sites are not for
            children but there may be some present.
          </p>

          <p>
            Example: I am pretty tolerant about dark humor, but not if your
            boner jokes are making people cringe. If a mod decision is made and
            you continue to come back at them, mock them, make memes, create
            faux accounts, change your avatar, etc. You will be banned. In some
            cases your comments will be completely removed.
          </p>

          <h3 id="3dontpostaboutillegalactivitiescontent">
            3. Don&apos;t post about illegal activities/content
          </h3>

          <p>
            I don&apos;t care how much money you&apos;re saving by denying
            income to our favorite content creators. It&apos;s sad, it gets you
            in trouble. It&apos;s not edgy to talk about piracy.
          </p>

          <p>
            Example: How to get around copyrighted material, how to modify
            hardware, all that stuff is just too gray area or outright illegal.
            I will delete this type of comments without notice.
          </p>

          <h3 id="4dontrepresentyourselfasstafforotherlivingpersons">
            4. Don&apos;t represent yourself as staff or other living persons
          </h3>

          <p>
            While we appreciate people&apos;s enthusiasm, often times the 💩
            hits the fan and people will come complaining to us about something
            we have no involvement in.
          </p>

          <p>
            Example: Please do not post content and label it as &quot;Official
            [WHATEVER] Whatever&quot;. You are welcome to run any type of event
            or contest on your personal blog that you would like, so long as it
            could not be mistaken for an editorial feature of the same type
            officially promoted by this website or other organisations.
          </p>

          <h3 id="5dontcopyandpasteotherpeoplesworkandpassitoffasyourowncontent">
            5. Don&apos;t copy and paste other people&apos;s work and pass it
            off as your own content.
          </h3>

          <p>So tacky.</p>

          <h3 id="6dontpostcopyrightedwork">
            6. Don&apos;t post copyrighted work.
          </h3>

          <p>
            Examples: links with copyrighted content such as books, video
            courses, magazine scans, embargoed screenshots, and other stuff that
            isn&apos;t explicitly made available to the public. Every post
            containing this type of content or any reference that might easily
            lead to it will be immediately removed without notice.
          </p>

          <h3 id="7dontbeablackholeofperpetualnegativityandsorrowandavoidflamewars">
            7. Don&apos;t be a black hole of perpetual negativity and sorrow and
            avoid flame wars
          </h3>

          <p>
            Communities are a great place to vent and find like minded people.
            They are not places where you can come kick a dog to feel better
            about yourself or your decisions.
          </p>

          <p>
            Example: Posting a comment saying &quot;technology XYZ sucks&quot;
            but not without enough context to to make sure people can understand
            your reasoning.
          </p>

          <p>
            Be positive, if you don&apos;t like something, talk about possible
            alternatives, migration paths and compare things in a nice way.
            Avoid flame wars at all costs!
          </p>

          <h3 id="8noadvertisingorunapprovedcharityfundraisingofanykind">
            8. No advertising or unapproved charity/fundraising of any kind
          </h3>

          <p>
            If you&apos;re a developer and want to use a comment here to talk
            about your updates here, great!{' '}
            <strong>But only, and only if</strong> they are relevant to the
            topic being discussed in the specific page.
          </p>

          <p>
            If you&apos;re posting what looks like a one time drive-by to make a
            quick sale, your comment will be deleted. This is a community, not a
            bulletin board. You can join us, but flyer posting is frowned upon.
          </p>

          <p>
            Don&apos;t spam, take your shill elsewhere. If you want to raise
            money for charity reach me on Twitter with a private message before
            posting anything related these topic here, otherwise I might decide
            to delete your comments without notice.
          </p>

          <h2 id="somethingimissed">Something I missed</h2>

          <p>
            Ask yourself: &quot;Was I shutting the 💩 up and talking about
            software development, which is the point of this website?&quot; If
            the answer is no, you&apos;ve probably 💩-posted. Go back and try
            again.
          </p>

          <p>
            These rules are a general guide I use to moderate the site.
            Ultimately, please respect my decisions.
          </p>

          <h2 id="whathappenswhenyoubreakarule">
            What happens when you break a rule
          </h2>

          <p>
            Regularly checking back and considering these Terms of Service will
            surely mean you&apos;ll never have your comments deleted or your
            account banned. Please do check your email from time to time as
            email warnings will usually be sent before a critical mod decision
            is made.
          </p>

          <p>
            Banning means you won&apos;t be able to use the site. In some
            extreme cases, your account and all of your posts may be deleted (in
            the case of an account full of hate speech, spam, etc)
          </p>

          <p>Banned users may appeal the block by contacting me on Twitter.</p>

          <h2 id="reportanincident">REPORT AN INCIDENT</h2>

          <p>
            If you&apos;re reporting anything unsavory your confidentiality will
            of course be respected. Please do report incidents even if
            you&apos;re not directly involved and you will never be named for
            spotting the troublemaker.
          </p>

          <p>
            Send me a link, preferably with a screenshot, to my Twitter account.
          </p>

          <h2 id="whythismatters">WHY THIS MATTERS</h2>

          <p>
            Basic self-preservation, folks. This keeps this sites out of hot
            water.
          </p>

          <p>
            Help me keep this site open to all and we&apos;ll be here for years
            to come.
          </p>

          <p>
            Help us keep these doors open by making this site safe and fun to
            read and use. Likewise, we hold ourselves up to these standards to
            make sure you enjoy the time you spend with the content provided
            here.
          </p>

          <p>TLDR Don&apos;t suck!</p>

          <p>
            (Note: This policy was heavily inspired by &nbsp;
            <a href="https://www.destructoid.com/community-blogs-terms-and-conditions-77513.phtml">
              destructoid community blogs terms and conditions
            </a>
            &nbsp; that was edited - and appreciated - by like 10,000 people).
          </p>
        </ArticleContainer>
      </ResponsiveWrapper>
    </Layout>
  )
}

export default CommentPolicy

export const pageQuery = graphql`
  query CommentPolicyQuery {
    site {
      siteMetadata {
        title
        author
        siteUrl
        twitterProfile
        disqusShortName
      }
    }
  }
`
