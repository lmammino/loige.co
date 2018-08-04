import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'
import Pagination from '../components/Pagination'

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

  @media (min-width: 780px) {
    display: flex;
  }
`

const MainColumn = styled('main')`
  width: 100%;
  order: 2;

  @media (min-width: 780px) {
    order: 1;
    width: 75%;
  }
`

const Sidebar = styled('aside')`
  order: 1;
  background: #f7f7f7;
  padding: 1em;
  margin: 0 0 2em 0;
  width: 100%;

  h3 {
    margin: 0 0 .5em 0;
    position: relative;
    color: #5cb767;
  }

  @media (min-width: 780px) {
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
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { previous, next, currentPage, totalPages, posts } = this.props.pageContext
    const pagination = { previous, next, currentPage, totalPages }

    return (
      <Layout location={this.props.location} section={this.props.section}>
        <Helmet title={siteTitle} />
        <Hero className="bottomRightBg">
          <h1>Luciano Mammino</h1>
          <h2>Web developer, entrepreneur, fighter, butterfly maker!</h2>
        </Hero>
        <ContentContainer>
          <Content>
            <Columns>
              <MainColumn>
                <PostsList posts={posts}/>
                <Pagination {...pagination} />
              </MainColumn>
              <Sidebar>
                <div>
                  <h3>Some content here</h3>
                  <p>CIAO BIEDDA</p>
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
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
