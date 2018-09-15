import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import SEO from '../components/SEO'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import Article from '../components/Article'
import ArticleSidebarAd from '../components/ArticleSidebarAd'
import PostSummary from '../components/PostSummary'
import SocialShareBar from '../components/SocialShareBar'
import SimilarPosts from '../components/SimilarPosts'
import PrevNextPosts from '../components/PrevNextPosts'

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
  margin: 0 0 2em 0;

  h3 {
    margin: 0 0 0.5em 0;
    position: relative;
    color: #5cb767;
  }

  @media (min-width: 780px) {
    background: transparent;
    margin: 0 0 1em 0;

    & > div {
      margin: 1em 0 0 0;
      position: sticky;
      overflow-y: auto;
      top: 70px;
    }
  }
`

class BlogPostTemplate extends Component {
  render () {
    const post = this.props.data.markdownRemark
    const { previous, next, similar } = this.props.pageContext
    const headerImage = post.frontmatter.header_img
      ? post.frontmatter.header_img.publicURL
      : undefined
    const disqusShortName = get(
      this.props,
      'data.site.siteMetadata.disqusShortName'
    )
    const site = get(this.props, 'data.site.siteMetadata.siteUrl')

    const shareOptions = {
      url: `${site}${post.frontmatter.slug}`,
      title: post.frontmatter.title,
      site,
      imageUrl: `${site}${headerImage}`,
      twitterProfile: get(this.props, 'data.site.siteMetadata.twitterProfile')
    }

    return (
      <Layout location={this.props.location} section="blog">
        <SEO path={`${post.frontmatter.slug}`} pageData={post} isBlogPost />
        <Hero className="textOverlay" backgroundImage={headerImage}>
          <h1>
            <span>{post.frontmatter.title}</span>
          </h1>
        </Hero>
        <ContentContainer>
          <Content>
            <Columns>
              <MainColumn>
                <Article
                  post={post}
                  site={site}
                  disqusShortName={disqusShortName}
                />
              </MainColumn>
              <Sidebar>
                <ArticleSidebarAd />
                <div>
                  {post.headings.length > 0 && (
                    <PostSummary headings={post.headings} />
                  )}
                  <h3 style={{ marginTop: '1em' }}>Share</h3>
                  <SocialShareBar {...shareOptions} />
                  {similar.length > 0 && (
                    <Fragment>
                      <h3 style={{ marginTop: '1em' }}>Similar posts</h3>
                      <SimilarPosts similar={similar} />
                    </Fragment>
                  )}
                </div>
              </Sidebar>
            </Columns>
          </Content>
        </ContentContainer>

        <PrevNextPosts previous={previous} next={next} />
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostQuery($slug: String!) {
    site {
      siteMetadata {
        title
        author
        siteUrl
        twitterProfile
        disqusShortName
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt
      timeToRead
      headings {
        value
        depth
      }
      html
      frontmatter {
        title
        meta_description
        slug
        author
        tags
        date(formatString: "MMMM DD, YYYY")
        dateISO: date
        header_img {
          publicURL
        }
        fb_img {
          publicURL
        }
        tw_img {
          publicURL
        }
      }
    }
  }
`
