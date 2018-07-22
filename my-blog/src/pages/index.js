import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'

const HeroContent = styled('div')`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
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
  color: #000;
`

const Columns = styled('div')`
  display: flex;
  flex: 1;
`

const MainColumn = styled('main')`
  flex: 1;
`

const Sidebar = styled('aside')`
  width: 20%;
  background: #ccc
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
        <ContentContainer>
          <Content>
            <Columns>
              <MainColumn>
                <PostsList posts={posts}/>
              </MainColumn>
              <Sidebar>Some content here</Sidebar>
            </Columns>
          </Content>
        </ContentContainer>
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
          excerpt(pruneLength: 512)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            title
            tags
          }
        }
      }
    }
  }
`
