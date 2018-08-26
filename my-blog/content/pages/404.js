import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import { get } from 'lodash'

import Layout from '../../src/components/layout'
import ArticleContainer from '../../src/components/ArticleContainer'

const NotFoundPage = props => {
  const siteTitle = get(props, 'data.site.siteMetadata.title')
  const lastPosts = get(props, 'data.lastPosts.edges')
  return (
    <Layout>
      <Helmet title={`PAGE NOT FOUND - ${siteTitle}`} />
      <ArticleContainer style={{ minHeight: '80vh' }}>
        <h1 style={{ marginTop: '4em' }}>PAGE NOT FOUND!</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.😢</p>
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
