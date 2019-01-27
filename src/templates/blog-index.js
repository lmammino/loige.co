import React, { Component } from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import SEO from '../components/SEO'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import ArticleSidebarAd from '../components/ArticleSidebarAd'
import Hello from '../components/Hello'
import PostsList from '../components/PostsList'
import Pagination from '../components/Pagination'
import ArticleContainer from '../components/ArticleContainer'

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
  display: flex;
  flex-wrap: wrap;

  @media (min-width: 1024px) {
    display: flex;
  }
`

const MainColumn = styled('main')`
  width: 100%;
  order: 2;

  h3:first-of-type {
    margin-top: 0;
    padding-top: 0;
  }

  article {
    margin-top: 0;
    padding-top: 0;
  }

  @media (min-width: 1024px) {
    order: 1;
    width: 75%;
    margin-top: 2em;
  }
`

const Sidebar = styled('aside')`
  order: 1;
  padding: 1em;
  margin: 0 0 2em 0;
  width: 100%;

  h3 {
    margin: 0 0 0.5em 0;
    position: relative;
    color: #5cb767;
  }

  @media (min-width: 1024px) {
    background: transparent;
    margin: 0 0 1em 0;
    order: 2;
    width: 25%;

    & > div {
      margin: 1em 0 0 0;
      position: sticky;
      overflow-y: auto;
      top: 70px;
    }
  }
`

class BlogIndex extends Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const siteDescription = get(
      this,
      'props.data.site.siteMetadata.description'
    )
    const {
      previous,
      next,
      currentPage,
      totalPages,
      posts
    } = this.props.pageContext
    const pagination = { previous, next, currentPage, totalPages }

    return (
      <Layout location={this.props.location} section="blog">
        <SEO
          pageData={{
            frontmatter: {
              title: `${siteTitle}${
                currentPage === 1
                  ? ''
                  : ` - Page ${currentPage} of ${totalPages}`
              }`,
              meta_description: `${siteDescription} - Blog, page ${currentPage} of ${totalPages}`
            }
          }}
        />
        <Hero className="bottomRightBg">
          <h1>Luciano Mammino</h1>
          <h2>Web developer, entrepreneur, fighter, butterfly maker!</h2>
        </Hero>
        <ContentContainer>
          <Content>
            <Columns>
              <MainColumn>
                <ArticleContainer>
                  <PostsList posts={posts} />
                  <Pagination {...pagination} />
                </ArticleContainer>
              </MainColumn>
              <Sidebar>
                <div>
                  <Hello />
                  <ArticleSidebarAd />
                </div>
              </Sidebar>
            </Columns>
          </Content>
        </ContentContainer>
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query BlogIndexQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
