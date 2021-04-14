module.exports = {
  siteMetadata: {
    title:
      'Luciano Mammino "Loige" - FullStack & Cloud developer, fighter, butterfly maker!',
    author: 'Luciano Mammino',
    description:
      'The website of Luciano Mammino a.k.a. Loige: FullStack & Cloud developer, fighter, butterfly maker',
    siteUrl: 'https://loige.co/',
    defaultImage: 'https://loige.co/page-image-fb.jpg',
    twitterProfile: 'loige',
    disqusShortName: 'loige',
    fbAppId: '231187154413670'
  },
  pathPrefix: '/',
  plugins: [
    'mario-banner',
    'blog',
    'speaking',
    'static-pages',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/pages`,
        name: 'pages'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/posts`,
        name: 'posts'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/speaking`,
        name: 'speaking'
      }
    },
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/data`
      }
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        useMozJpeg: false,
        stripMetadata: true,
        defaultQuality: 75,
        plugins: []
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1024,
              linkImagesToOriginal: false,
              withWebp: true,
              quality: 90
            }
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'content'
            }
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
            options: {
              wrapperStyle: 'margin-bottom: 1.0725rem'
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              noInlineHighlight: true
            }
          },
          'gatsby-remark-smartypants',
          'gatsby-remark-autolink-headers'
        ]
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-47248506-1'
      }
    },
    require('./gatsby-sitemap'),
    require('./gatsby-rss'),
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Luciano Mammino "Loige" - FullStack & Cloud developer, fighter, butterfly maker!',
        short_name: 'Loige.co',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#20232a',
        display: 'minimal-ui',
        icon: 'src/components/images/apple-icon-precomposed.png'
      }
    },
    'gatsby-plugin-offline',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-emotion',
      options: {}
    }
  ]
}
