import React, { Component, Fragment } from 'react'
import get from 'lodash/get'

import PostPreview from '../PostPreview'

class PostsList extends Component {
  render () {
    const { posts } = this.props

    if (!posts || posts.length === 0) {
      return (
        <Fragment>No posts available in this section! :(</Fragment>
      )
    }

    return (
      <Fragment>
        {posts.map(({ node }) => {
          const props = {
            slug : node.fields.slug,
            title : get(node, 'frontmatter.title', node.fields.slug),
            date : node.frontmatter.date,
            tags : node.frontmatter.tags,
            excerpt : node.excerpt,
          }

          return (
            <PostPreview key={props.slug} {...props}/>
          )
        })}
      </Fragment>
    )
  }
}

export default PostsList
