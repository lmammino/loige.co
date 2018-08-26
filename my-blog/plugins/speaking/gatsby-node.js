const Promise = require('bluebird')
const path = require('path')

const speakingGraphql = `
{
  allMarkdownRemark(
    sort: {fields: [frontmatter___date], order: DESC},
    filter: {frontmatter: {status: {eq: "published"}, layout: {eq: "post"}}}
  ) {
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
          header_img {
            publicURL
          }
        }
      }
    }
  }
}
`

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const speakingIndex = path.resolve(
    path.join(__dirname, '../../src/templates/speaking-index.js')
  )

  return graphql(speakingGraphql).then(result => {
    if (result.errors) {
      console.error(result.errors)
      return Promise.reject(result.errors)
    }

    createPage({
      path: `/speaking/`,
      component: speakingIndex,
      context: {
        events: result.data.allMarkdownRemark.edges.map(e => e.node)
      }
    })

    return Promise.resolve()
  })
}
