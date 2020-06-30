module.exports = {
  resolve: 'gatsby-plugin-feed',
  options: {
    query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              site_url: siteUrl
            }
          }
        }
      `,
    feeds: [
      {
        title: 'Luciano Mammino "Loige" - Cloud developer, entrepreneur, fighter, butterfly maker!',
        serialize: ({ query: { site, allMarkdownRemark } }) => {
          return allMarkdownRemark.edges.map(edge => {
            const siteMetadata = site.siteMetadata
            const pageMetadata = edge.node.frontmatter
            const pageImageFb =
              pageMetadata.fb_img &&
              `${siteMetadata.siteUrl}${pageMetadata.fb_img.publicURL.replace(
                /^\/+/g,
                ''
              )}`
            const pageImageTw =
              pageMetadata.tw_img &&
              `${siteMetadata.siteUrl}${pageMetadata.tw_img.publicURL.replace(
                /^\/+/g,
                ''
              )}`
            const image =
              pageImageFb || pageImageTw || siteMetadata.defaultImage
            return Object.assign({}, edge.node.frontmatter, {
              description: edge.node.excerpt,
              url: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
              guid: site.siteMetadata.siteUrl + '/' + edge.node.fields.slug,
              custom_elements: [
                {
                  'content:encoded': `<p><img src="${image}"/></p>${
                    edge.node.html
                  }`
                }
              ]
            })
          })
        },
        query: `
            {
              allMarkdownRemark(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
                filter: {frontmatter: {status: {eq: "published"}, layout: {eq: "post"}}}
              ) {
                edges {
                  node {
                    excerpt
                    html
                    fields { slug }
                    frontmatter {
                      title
                      date
                      fb_img {
                        publicURL
                      }
                    }
                  }
                }
              }
            }
          `,
        output: '/rss.xml'
      }
    ]
  }
}
