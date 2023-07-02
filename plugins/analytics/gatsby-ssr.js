// based on https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-plugin-google-analytics/src/gatsby-ssr.js
const React = require('react')

const analyticsInitCode = `
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag(){dataLayer.push(arguments);}
  window.gtag('js', new Date());
  window.gtag('config', 'G-L3TVXXPHTW');
`

const Preconnect = React.createElement('link', {
  rel: 'preconnect',
  key: 'preconnect-google-analytics',
  href: 'https://www.google-analytics.com'
})

const DnsPrefetch = React.createElement('link', {
  rel: 'dns-prefetch',
  key: 'dns-prefetch-google-analytics',
  href: 'https://www.google-analytics.com'
})

const AnalyticsImport = React.createElement('script', {
  key: 'analyticsImport',
  src: 'https://www.googletagmanager.com/gtag/js?id=G-L3TVXXPHTW',
  async: true
})

const AnalyticsInit = React.createElement('script', {
  key: 'analyticsInit',
  dangerouslySetInnerHTML: {
    __html: analyticsInitCode
  }
})

exports.onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents([
    Preconnect,
    DnsPrefetch,
    AnalyticsImport,
    AnalyticsInit
  ])
}
