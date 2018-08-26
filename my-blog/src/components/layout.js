import React, { Component, Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'

import { injectGlobal } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    font-style: normal;
    font-weight: 400;
    fill: currentColor;
    margin: 60px 0 0 0;
  }

  code, pre {
    font-family: source-code-pro,Menlo,Monaco,Consolas,Courier New,monospace;
    font-weight: 300;
  }

  .content a {
    text-decoration: none;
  }

  .content a:hover {
    text-decoration: underline;
  }
`

class Template extends Component {
  render () {
    const { location, section, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <Fragment>
        <Header section={section} />
        {children}
        <Footer />
      </Fragment>
    )
  }
}

export default Template
