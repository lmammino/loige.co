const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')

module.exports = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    const blogIndex = path.resolve('./src/templates/blog-index.js')
    const tagIndex = path.resolve('./src/templates/tag-index.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
              edges {
                node {
                  timeToRead
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
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const posts = result.data.allMarkdownRemark.edges

        const perPage = 10
        const postsByTag = {}
        const postsByPage = {}

        // Create blog posts pages.
        _.each(posts, (post, index) => {
          const previous = index === posts.length - 1 ? null : posts[index + 1].node;
          const next = index === 0 ? null : posts[index - 1].node;

          // fill postsByTag
          _.each(post.node.frontmatter.tags, (tag) => {
            if (!postsByTag[tag]) {
              postsByTag[tag] = []
            }

            postsByTag[tag].push(post)
          })

          // fill postsByPage
          const currentPage = Math.floor(index / perPage) + 1
          const path = currentPage === 1 ? '/' : `/page/${currentPage}`
          if (!postsByPage[path]) {
            postsByPage[path] = []
          }
          postsByPage[path].push(post)

          createPage({
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              slug: post.node.fields.slug,
              previous,
              next,
            },
          })
        })

        // Create paginated blog indexes
        const pagePaths = Object.keys(postsByPage)
        _.each(pagePaths, (path, index) => {
          const previous = index === 0 ? null : { page: index, href: pagePaths[index - 1] }
          const next = index === pagePaths.length - 1 ? null : { page: index + 2, href: pagePaths[index + 1] }

          createPage({
            path,
            component: blogIndex,
            context: {
              posts: postsByPage[path].map((p) => p.node),
              previous,
              next,
              currentPage: index + 1,
              totalPages: pagePaths.length
            },
          })
        })

        // Create blog indexes by tags
        const tags = Object.keys(postsByTag)
        _.each(tags, (tag, index) => {
          createPage({
            path: `/tag/${tag}`,
            component: tagIndex,
            context: {
              posts: postsByTag[tag].map((p) => p.node),
              tag
            },
          })
        })
      })
    )
  })
}
