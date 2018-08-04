import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import GitHubSlugger from 'github-slugger'

const PostSummaryContainer = styled('div')`

  ol {
    color: #6d6d6d;
    list-style: outside;
    padding: 0 0 0 1.25em;
  }

  ol li {
    font-size: 1em;

    a {
      color: #6d6d6d;
      display: inline-block;
      border-bottom: 1px solid transparent;
      margin-top: 5px;
      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: #000;
        outline-width: 0;
      }
    }

    &.depth-3 {
      font-size: .8em;
      padding-left: 1em;
      list-style: none;
    }

  }
`

class PostSummary extends Component {
  render() {
    const { headings } = this.props
    const slugger = GitHubSlugger()

    return (
      <PostSummaryContainer>
        <h3>Sections</h3>
        <ol>
          {headings.filter(({ depth }) => depth <= 3).map(({value, depth}) => {
            return (<li className={`depth-${depth}`} key={value}>
              <a href={`#${slugger.slug(value)}`}>{value}</a>
            </li>)
          } )}
        </ol>
      </PostSummaryContainer>
    )
  }
}

export default PostSummary
