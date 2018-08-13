const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return graphql(
  `
  {
    allFile(filter: {sourceInstanceName: {eq: "pages"}, extension: {eq: "js" }}) {
      edges {
        node {
          name
          relativePath
        }
      }
    }
  }
  `)
    .then((result) => {
      result.data.allFile.edges.forEach((edge) => {
        const {name, relativePath} = edge.node
        const component = path.resolve(`./content/pages/${relativePath}`)
        createPage({
          path: name === '404' ? '404.html' : `/${name}`,
          component,
          context: {},
        })
      })
    })
}
