const getPriority = edge => {
  switch (true) {
    case ['/comment-policy'].includes(edge.node.path):
      return 0.2
    case edge.node.path.startsWith('/tag/'):
    case edge.node.path.startsWith('/page/'):
      return 0.5
    default:
      return 0.7
  }
}

const getChangeFreq = edge => {
  switch (true) {
    case ['/about', '/comment-policy'].includes(edge.node.path):
      return 'monthly'
    default:
      return 'daily'
  }
}

module.exports = {
  resolve: 'gatsby-plugin-sitemap',
  options: {
    createLinkInHead: true,
    exclude: [
      '/dev-404-page',
      '/404',
      '/404.html',
      '/offline-plugin-app-shell-fallback',
      '**/image_fb',
      '**/image_tw'
    ],
    serialize: ({ site, allSitePage }) =>
      allSitePage.edges.map(edge => {
        return {
          url: site.siteMetadata.siteUrl + edge.node.path,
          changefreq: getChangeFreq(edge),
          priority: getPriority(edge)
        }
      })
  }
}
