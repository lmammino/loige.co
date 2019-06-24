import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

const SimilarPostsList = styled.ul`
  color: #6d6d6d;
  list-style: outside;
  padding: 0 0 0 1.25em;

  li {
    margin: 0.75em 0 0 0;

    &:first-of-type {
      margin-top: 0;
    }
  }

  a {
    color: #6d6d6d;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    color: #000;
  }
`

class SimilarPosts extends Component {
  render () {
    const { similar } = this.props
    return (
      <SimilarPostsList>
        {similar.map(p => {
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
