import React, { Component, Fragment } from 'react'
import get from 'lodash/get'

import PostPreview from './PostPreview'

class PostsList extends Component {
  render () {
    const { posts } = this.props

    if (!posts || posts.length === 0) {
      return <Fragment>No posts available in this section! :(</Fragment>
    }

    return (
      <Fragment>
        {posts.map(post => {
          const props = {
            slug: post.fields.slug,
            title: get(post, 'frontmatter.title', post.fields.slug),
            date: post.frontmatter.date,
            tags: post.frontmatter.tags,
            timeToRead: post.timeToRead,
            excerpt: post.excerpt
          }

          return <PostPreview key={props.slug} {...props} />
        })}
      </Fragment>
    )
  }
}

export default PostsList
