import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

class SimilarPosts extends Component {
  render() {
    const { similar } = this.props
    return (
      <ul>
        {similar.map((p) => {
          return (
            <li key={p.slug}>
              <Link to={`/${p.slug}`}>{p.title}</Link>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default SimilarPosts
