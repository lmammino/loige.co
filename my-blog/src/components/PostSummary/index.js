import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import GitHubSlugger from 'github-slugger'

const PostSummaryContainer = styled('div')`

  ol {
    list-style: none;
  }

  ol li {
    font-size: 1em;

    a {
      color: #1a1a1a;
      display: inline-block;
      border-bottom: 1px solid transparent;
      margin-top: 5px;
      text-decoration: none;

      &:hover {
        color: #6d6d6d;
        outline-width: 0;
      }
    }

    &.depth-3 {
      font-size: .8em;
      padding-left: 1em;
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
