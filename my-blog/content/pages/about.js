import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { get } from 'lodash'

import Layout from '../../src/components/layout'
import ArticleContainer from '../../src/components/ArticleContainer'

const AboutPage = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const lastPosts = get(props, 'data.lastPosts.edges')
  return (
    <Layout section="about">
      <Helmet title={`About loige - ${siteTitle}`} />
      <ArticleContainer style={{ minHeight: '80vh' }}>
        <h1 style={{ marginTop: '4em' }}>Hello, this is Luciano :)</h1>
        <p>
          Since I started navigating the great Internet, my nickname has been
          <em>&quot;loige&quot;</em>, that&apos;s why this website is called{' '}
          <em>&quot;loige.co&quot;</em>.
        </p>
        <p>
          I am a passionate software engineer born in 1987, the same year that
          “Super Mario Bros” was released in Europe, which, by chance is my
          favourite game!
        </p>
        <p>
          I started coding early at the age of 12, hacking away with my
          father&apos;s old i386 armed only with MS-DOS and the QBasic
          interpreter and I have been professionally a software developer for
          more than 10 years. I am currently a Solution Architect at Vectra AI
          in Dublin where I am working on automating the hunt for cyberattackers
          and speeding-up incident response. I love the fullstack web, Node.js
          and Serverless so I co-authored the book "Node.js design patterns"
          (http://amzn.to/1ZF279B), launched fstack.link (a semi-automated
          newsletter for Fullstack developers) and Serverlesslab.com (in-house
          serverless training).
        </p>
        <h2>Since you are here...</h2>
        <p>Why don&#39;t you have a look at one of my latest articles?</p>
        <ul>
          {lastPosts.map(p => (
            <li key={p.node.fields.slug}>
              <Link to={`/${p.node.fields.slug}`}>
                {p.node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </ArticleContainer>
    </Layout>
  )
}

export default AboutPage

export const pageQuery = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        author
        siteUrl
        twitterProfile
        disqusShortName
      }
    }

    lastPosts: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
      filter: {
        frontmatter: { status: { eq: "published" }, layout: { eq: "post" } }
      }
    ) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
