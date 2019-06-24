import React, { Component, Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'

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
