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
        const blogPosts = {}
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

          blogPosts[post.node.fields.slug] = {
            path: post.node.fields.slug,
            component: blogPost,
            context: {
              tags: post.node.frontmatter.tags,
              slug: post.node.fields.slug,
              previous,
              next,
            },
          }
        })

        // calculates related/similar posts per matching categories
        const getRelatedPosts = (slug, tags, postsByTag) => {

          let similar = []
          tags.forEach((tag) => {
            similar = similar.concat(postsByTag[tag].map((p) => p.node.fields.slug))
          })

          let prev = null

          return similar
            .filter((p) => p !== slug) // removes post itself
            .sort() // sort alphabetically
            .reduce((acc, curr, i, slugs) => { // counts same occurrences
              if (!prev) {
                prev = { slug: curr, count: 1 }
                return acc
              }

              if (prev.slug === curr) {
                prev.count++
                return acc
              }

              if (prev.slug !== curr || i === slugs.length -1) {
                acc.push(prev)
                prev = null
              }

              return acc
            }, [])
            .sort((a, b) => b.count - a.count) // sort by count
            .map((p) => p.slug)
        }

        // trigger the createPage API for every post
        _.each(Object.keys(blogPosts), (slug, index) => {
          // calculates the related posts before creating the page
          const postPage = blogPosts[slug]
          postPage.context.similar = getRelatedPosts(slug, postPage.context.tags, postsByTag)

          createPage(postPage)
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
