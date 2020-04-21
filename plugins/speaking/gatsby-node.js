const Promise = require('bluebird')
const path = require('path')

const speakingGraphql = `
{
  allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {status: {eq: "published"}, layout: {eq: "speaking"}}}) {
    edges {
      node {
        fields {
          slug
        }
        frontmatter {
          date(formatString: "DD MMMM, YYYY")
          originalDate: date
          title
          slug
          event_name
          event_link
          event_city
          event_location
          event_location_gps
          language
          presentation_language
          is_workshop
          slides_link
          video_link
          with {
            name
            link
            image
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
      path: '/speaking/',
      component: speakingIndex,
      context: {
        events: result.data.allMarkdownRemark.edges.map(e => e.node)
      }
    })

    return Promise.resolve()
  })
}
