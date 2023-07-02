const React = require('react')

const analyticsInitCode = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-L3TVXXPHTW');
`

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
  setHeadComponents([AnalyticsImport, AnalyticsInit])
}
