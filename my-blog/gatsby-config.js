module.exports = {
  siteMetadata: {
    title: 'Luciano Mammino "Loige" - Web developer, entrepreneur, fighter, butterfly maker!',
    author: 'Luciano Mammino',
    description: 'The website of Luciano Mammino a.k.a. Loige, Web developer, entrepreneur, fighter, butterfly maker',
    siteUrl: 'https://loige.co/',
    twitterProfile: 'loige',
    disqusShortName: 'loige',
  },
  pathPrefix: '/',
  plugins: [
    `mario-banner`,
    'static-pages',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/speaking`,
        name: 'speaking',
      },
    },
    `gatsby-transformer-yaml`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/data`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1024,
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 90,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'content',
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers',
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-47248506-1',
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Luciano Mammino "Loige" - Web developer, entrepreneur, fighter, butterfly maker!`,
        short_name: `Loige.co`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#46c9e5`,
        display: `minimal-ui`,
        icon: `src/components/images/profile-pic.jpg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {}
    },
  ],
}
