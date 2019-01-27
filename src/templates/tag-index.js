import React, { Component } from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import SEO from '../components/SEO'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'
import ArticleContainer from '../components/ArticleContainer'
import tagsBg from '../components/images/tags-bg.png'

const Content = styled('div')`
  min-height: 100vh;
  margin: 2em auto;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 820px;
  flex-direction: column;

  @media (min-width: 780px) {
    width: 90%;
  }
`

class TagIndex extends Component {
  render () {
    const { tag, posts } = this.props.pageContext
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location} section="blog">
        <SEO
          path={`tag/${tag}/`}
          pageData={{
            frontmatter: {
              title: `Posts published under #${tag} - ${siteTitle}`,
              meta_description: `Posts published under #${tag}`
            }
          }}
        />
        <Hero
          className="small tiledBg gradientOverlay"
          backgroundImage={tagsBg}
        >
          <h1>#{tag}</h1>
          <h2>
            {posts.length} post
            {posts.length > 1 ? 's' : ''} in this collection
          </h2>
        </Hero>
        <Content>
          <ArticleContainer>
            <PostsList posts={posts} />
          </ArticleContainer>
        </Content>
      </Layout>
    )
  }
}

export default TagIndex

export const pageQuery = graphql`
  query TagIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
