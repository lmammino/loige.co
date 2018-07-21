import React, { Component, Fragment } from 'react'
import { Link } from 'gatsby'

import { rhythm, scale } from '../utils/typography'
import headerBg from './header.jpg'

class Template extends Component {
  render() {
    const { location, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`

    return (
      <Fragment>
        <nav>
          <Link>Logo</Link>
          <Link>Blog</Link>
          <Link>Speaking</Link>
          <Link>About</Link>
        </nav>
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
        <div
          style={{
            marginLeft: 'auto',
            marginRight: 'auto',
            maxWidth: rhythm(24),
            padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
          }}
        >
          {children}
        </div>
      </Fragment>
    )
  }
}

export default Template
