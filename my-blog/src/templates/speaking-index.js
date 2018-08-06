import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { get } from 'lodash'
import Helmet from 'react-helmet'

import Layout from '../components/layout'

class SpeakingIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { events } = this.props.pageContext

    return (
      <Layout location={this.props.location} section="speaking">
        <Helmet title={siteTitle} />
        <div>
          <ul>
            { events.map(e => (
              <li key={e.frontmatter.slug}>
                {e.frontmatter.slug}
              </li>)) }
          </ul>
        </div>
      </Layout>
    )
  }
}

export default SpeakingIndex
