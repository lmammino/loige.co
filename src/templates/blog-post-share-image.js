import React, { Component, Fragment } from 'react'
import styled, { injectGlobal } from 'react-emotion'
import { graphql } from 'gatsby'

import Logo from '../components/Logo'
import ReadingTime from '../components/ReadingTime'

injectGlobal`
  html, body {
    margin: 0;
    padding: 0;
  }

  div.preview {
    box-sizing: border-box;
    background-size: cover;
    background-position: center;
    padding: 2em;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    justify-content: space-between;
  }

  h1, h2 {
    color: white;
  }

  h1 {
    font-size: 2em;
  }

  h2 {
    font-size: 1.6em;
  }

  h1 > span,
  h2 > span {
    background: rgba(0,0,0,.75);
    display: inline-block;
    padding: .2em;
  }

  h2 > span > svg {
    vertical-align: text-bottom;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-style: normal;
    font-weight: 400;
    fill: currentColor;
  }
`

class BlogPostShareImage extends Component {
  render () {
    const post = this.props.data.markdownRemark
    const { width, height, type } = this.props.pageContext
    return (
      <div
        className="preview"
        style={{
          fontSize: type === 'facebook' ? '24px' : '12px',
          backgroundImage: `url(${post.frontmatter.header_img.publicURL})`,
          width: `${width}px`,
          height: `${height}px`
        }}
      >
        <h2>
          <Logo />
        </h2>
        <h1>
          <span>{post.frontmatter.title}</span>
        </h1>
        <h2>
          <ReadingTime time={post.timeToRead} />
        </h2>
      </div>
    )
  }
}

export default BlogPostShareImage

export const pageQuery = graphql`
  query BlogPostShareImageQuery($slug: String!) {
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
      timeToRead
      headings {
        value
        depth
      }
      html
      frontmatter {
        title
        slug
        author
        tags
        date(formatString: "MMMM DD, YYYY")
        header_img {
          publicURL
        }
      }
    }
  }
`
