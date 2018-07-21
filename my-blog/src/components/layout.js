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
`

class Template extends Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <Fragment>
        <Header/>
        {children}
        <Footer/>
      </Fragment>
    )
  }
}

export default Template
