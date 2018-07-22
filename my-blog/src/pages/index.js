import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { graphql } from 'gatsby'
import { Link } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Hero from '../components/Hero'

const HeroContent = styled('div')`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
  ${'' /* text-shadow: 0 1px 3px #000; */}
  color: #FFF;
  padding: 0 2em;

  color: white;
  text-shadow:
    1px 3px 0 #000,
   -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
     1px 1px 0 #000;

  @media (min-width: 780px) {
    font-size: 1.2em;
  }
`

class BlogIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    return (
      <Layout location={this.props.location} section={this.props.section}>
        <Helmet title={siteTitle} />
        <Hero>
          <HeroContent>
            <h1>Luciano Mammino</h1>
            <h2>Web developer, entrepreneur, fighter, butterfly maker!</h2>
          </HeroContent>
        </Hero>
        {posts.map(({ node }) => {
          const title = get(node, 'frontmatter.title') || node.fields.slug
          return (
            <div key={node.fields.slug}>
              <h3>
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
