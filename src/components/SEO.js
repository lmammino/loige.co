// based on the work of Jason Lengstorf
// https://github.com/jlengstorf/lengstorf.com/blob/master/src/templates/blog-post.js
import React from 'react'
import Helmet from 'react-helmet'

import { siteMetadata } from '../../gatsby-config'

const getSchemaOrgJSONLD = ({
  isBlogPost,
  url,
  title,
  image,
  description,
  datePublished
}) => {
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url,
      name: title,
      alternateName: siteMetadata.title
    }
  ]

  return isBlogPost
    ? [
      ...schemaOrgJSONLD,
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': url,
              name: title,
              image
            }
          }
        ]
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url,
        name: title,
        alternateName: siteMetadata.title,
        headline: title,
        image: {
          '@type': 'ImageObject',
          url: image
        },
        description,
        author: {
          '@type': 'Person',
          name: 'Luciano Mammino'
        },
        publisher: {
          '@type': 'Organization',
          url: siteMetadata.siteUrl,
          name: 'Luciano Mammino',
          logo: {
            '@context': 'http://schema.org',
            itemtype: 'https://schema.org/ImageObject',
            url: 'https://loige.co/favicon.ico'
          }
        },
        mainEntityOfPage: {
          '@type': 'WebSite',
          '@id': siteMetadata.siteUrl
        },
        datePublished
      }
    ]
    : schemaOrgJSONLD
}

const SEO = ({ path, pageData, isBlogPost, children }) => {
  const pageMetadata = pageData.frontmatter || {}

  const title = pageMetadata.title || siteMetadata.title
  const description =
    pageMetadata.meta_description ||
    pageData.excerpt ||
    siteMetadata.description
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
  const image = pageImageFb || pageImageTw || siteMetadata.defaultImage
  const url = `${siteMetadata.siteUrl}${path}`
  const datePublished = isBlogPost ? pageMetadata.dateISO : false

  const schemaOrgJSONLD = getSchemaOrgJSONLD({
    isBlogPost,
    url,
    title,
    image,
    description,
    datePublished
  })

  return (
    <Helmet title={title}>
      {/* Set language */}
      <html lang="en" />

      {/* General tags */}
      <link type="text/plain" rel="author" href="https://loige.co/humans.txt" />
      <link rel="canonical" content={url} />
      <meta name="description" content={description} />
      <meta name="image" content={image} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={pageImageFb || image} />
      <meta property="fb:app_id" content={siteMetadata.fbAppId} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={siteMetadata.twitterProfile} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={pageImageTw || image} />

      {/* Allow passing extra data to helmet from the outside */}
      {children && children}
    </Helmet>
  )
}

SEO.defaultProps = {
  isBlogPost: false,
  path: '',
  pageData: {}
}

export default SEO
