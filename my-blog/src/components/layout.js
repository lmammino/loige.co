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
    margin: 60px 0 0 0;
  }

  .content a {
    position: relative;
  }

  .content a:after {
    content: " ";
    display: inline-block;
    width: 0px;
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: #d26ac2;
    -webkit-transition: all .2s ease-out;
    transition: all .2s ease-out;
  }

  .content a:hover:after {
    width: 100%;
    -webkit-transition: all .2s ease-out;
    transition: all .2s ease-out;
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
