import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { get } from 'lodash'

import Layout from '../components/layout'
import ResponsiveWrapper from '../components/ResponsiveWrapper'
import ArticleContainer from '../components/ArticleContainer'
import ToadPicture from '../components/images/toad.png'

const NotFoundPage = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const lastPosts = get(props, 'data.lastPosts.edges')
  return (
    <Layout>
      <Helmet title={`PAGE NOT FOUND - ${siteTitle}`} />
      <ResponsiveWrapper>
        <ArticleContainer style={{ minHeight: '80vh' }}>
          <h1 style={{ marginTop: '4em', textAlign: 'center' }}>
            <span style={{ color: '#ce1318', fontWeight: 'bolder' }}>
              404 Error
            </span>
          </h1>
          <h1 style={{ textAlign: 'center' }}>
            Thank you for your visit
            <br />
            But the page you were looking for is in Another Castle
            <sup>1</sup>
          </h1>
          <p style={{ textAlign: 'center' }}>
            You’re either misspelling the URL or requesting a page that&apos;s
            no longer here.
          </p>
          <p style={{ textAlign: 'center' }}>
            <img
              src={ToadPicture}
              style={{ width: '60px', margin: '1em' }}
              alt="Super Mario's Toad"
            />
          </p>
          <p style={{ textAlign: 'center' }}>
            <small>
              <sup>1</sup>
              Yes, this was another{' '}
              <a
                target="_blank"
                rel="noreferrer noopener"
                href="https://knowyourmeme.com/memes/but-our-princess-is-in-another-castle"
              >
                Super Mario&trade; reference
              </a>
              ...
            </small>
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
      </ResponsiveWrapper>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query PageNotFoundQuery {
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
