import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

const SimilarPostsList = styled('ul')`
  list-style: circle;
  padding: 0 0 0 1.25em;

  li {
    margin: .75em 0 0 0;

    &:first-of-type {
      margin-top: 0;
    }
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    color: #6d6d6d;
  }
`

class SimilarPosts extends Component {
  render() {
    const { similar } = this.props
    return (
      <SimilarPostsList>
        {similar.map((p) => {
          return (
            <li key={p.slug}>
              <Link to={`/${p.slug}`}>{p.title}</Link>
            </li>
          )
        })}
      </SimilarPostsList>
    )
  }
}

export default SimilarPosts
