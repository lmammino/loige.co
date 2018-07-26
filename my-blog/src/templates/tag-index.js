import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Hero from '../components/Hero'

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

class TagIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { tag, posts } = this.props.pageContext

    return (
      <Layout location={this.props.location} section="blog">
        <Helmet title={siteTitle} />
        <Hero>
          <HeroContent>
            <h1>#{tag}</h1>
            <h2>{posts.length} post{posts.length > 1 ? 's' : ''} in this collection</h2>
          </HeroContent>
        </Hero>
      </Layout>
      // <Layout location={this.props.location} section={this.props.section}>
      //   <Helmet title={siteTitle} />
      //   <Hero>
      //     <HeroContent>
      //       <h1>Luciano Mammino</h1>
      //       <h2>Web developer, entrepreneur, fighter, butterfly maker!</h2>
      //     </HeroContent>
      //   </Hero>
      //   <ContentContainer>
      //     <Content>
      //       <Columns>
      //         <MainColumn>
      //           <PostsList posts={posts}/>
      //           <Pagination {...pagination} />
      //         </MainColumn>
      //         <Sidebar>Some content here</Sidebar>
      //       </Columns>
      //     </Content>
      //   </ContentContainer>
      // </Layout>
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
