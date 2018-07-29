import React from 'react'
import styled, { css } from 'react-emotion'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import { Link } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Hero from '../components/Hero'
import Article from '../components/Article'
import PostSummary from '../components/PostSummary'
import SocialShareBar from '../components/SocialShareBar'

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
  flex: 1;

  @media (min-width: 780px) {
    display: flex;
  }
`

const MainColumn = styled('main')`
  flex: 3;
  width: 100%;
`

const Sidebar = styled('aside')`
  flex: 1;
  background: #f7f7f7;
  padding: 1em;

  @media (min-width: 780px) {
    background: transparent;

    & > div {
      margin: 1em 0 0 0;
      position: sticky;
      overflow-y: auto;
      top: 50px;
    }
  }
`

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')
    const { previous, next } = this.props.pageContext
    const headerImage = post.frontmatter.header_img ? post.frontmatter.header_img.publicURL : undefined

    const shareOptions = {
      url: `${get(this.props, 'data.site.siteMetadata.siteUrl')}${post.frontmatter.slug}`,
      title: post.frontmatter.title,
      site: get(this.props, 'data.site.siteMetadata.siteUrl'),
      imageUrl: `${get(this.props, 'data.site.siteMetadata.siteUrl')}${headerImage}`,
      twitterProfile: get(this.props, 'data.site.siteMetadata.twitterProfile'),
    }

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
              <Sidebar>
                <div>
                  {post.headings.length && <PostSummary headings={post.headings}/>}
                  <h3>Share</h3>
                  <SocialShareBar {...shareOptions}/>
                </div>
              </Sidebar>
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
        siteUrl
        twitterProfile
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
        slug
        date(formatString: "MMMM DD, YYYY")
        header_img {
          publicURL
        }
      }
    }
  }
`
