import React from 'react'
import styled, { css } from 'react-emotion'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/Hero'
import Article from '../components/Article'

const ContentContainer = styled('div')`
  min-height: 100vh;
  margin: 0 auto;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 1260px;
  display: flex;
  flex-direction: column;

  @media (min-width: 780px) {
    width: 90%;
  }
`

const Content = styled('section')`
  flex: 1;
  display: flex;
`

const Columns = styled('div')`
  display: flex;
  flex: 1;
`

const MainColumn = styled('main')`
  flex: 1;
  width: 100%;
  max-width: 860px;
`

const Sidebar = styled('aside')`
  width: 20%;
  background: #ccc
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pageContext
    const headerImage = post.frontmatter.header_img ? post.frontmatter.header_img.publicURL : undefined

    return (
      <Layout location={this.props.location}>
        <Helmet title={`${post.frontmatter.title} | ${siteTitle}`} />
        <Hero className="textOverlay" backgroundImage={headerImage}>
          <h1><span>{post.frontmatter.title}</span></h1>
        </Hero>
        <ContentContainer>
          <Content>
            <Columns>
              <MainColumn>
                <Article html={post.html}/>
              </MainColumn>
              <Sidebar>Some content here</Sidebar>
            </Columns>
          </Content>
        </ContentContainer>

        {/* <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul> */}
        <details>
          <summary>data</summary>
          <pre>
            {JSON.stringify(post, null, 2)}
          </pre>
        </details>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      timeToRead
      headings {
        value
        depth
      }
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        header_img {
          publicURL
        }
      }
    }
  }
`
