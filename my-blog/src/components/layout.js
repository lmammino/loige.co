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

  @font-face {
    font-family: system;
    font-style: normal;
    font-weight: 300;
    src: local(".SFNSText"), local(".HelveticaNeueDeskInterface"), local(".LucidaGrandeUI"), local("Ubuntu"), local("Segoe UI"), local("Roboto"), local("DroidSans"), local("Tahoma");
  }

  body {
    font-family: "system";
    fill: currentColor;
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
