import React, { Component } from 'react'
import styled from 'react-emotion'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'
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
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { tag, posts } = this.props.pageContext

    return (
      <Layout location={this.props.location} section="blog">
        <Helmet title={siteTitle} />
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
          <PostsList posts={posts} />
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
