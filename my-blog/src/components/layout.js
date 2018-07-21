import React, { Component, Fragment } from 'react'
import Header from './Header'

import { injectGlobal } from 'emotion'

injectGlobal`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`

import headerBg from './header.jpg'

class Template extends Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <Fragment>
        <Header/>
        <header
          style={{
            backgroundColor: '#5B697F',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'bottom right',
            backgroundImage: `url(${headerBg})`,
            backgroundSize: 'cover',
            minHeight: '300px',
            height: '80vh',
            display: 'table',
            width: '100%'
          }}>
          <div
            style={{
              display: 'table-cell',
              verticalAlign: 'middle'
            }}
          >
            <h1>Luciano Mammino</h1>
            <h2>Web developer, entrepreneur, fighter, butterfly maker!</h2>

          </div>
        </header>
        <div>
          {children}
        </div>
      </Fragment>
    )
  }
}

export default Template
