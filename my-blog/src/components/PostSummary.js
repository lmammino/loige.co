import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import GitHubSlugger from 'github-slugger'

const PostSummaryContainer = styled('div')`

  ol {
    color: #6d6d6d;
    padding: 0 0 0 2em;
    list-style: decimal-leading-zero;
  }

  ol ol {
    padding: 0 0 0 .25em;
  }

  ol li {
    font-size: 1em;
    margin-top: 5px;

    a {
      color: #6d6d6d;
      border-bottom: 1px solid transparent;

      text-decoration: none;
      font-weight: bold;

      &:hover {
        color: #000;
        outline-width: 0;
      }
    }

    &.depth-3 {
      font-size: .8em;
      list-style: none;
    }

  }
`

class PostSummary extends Component {
  render() {
    const { headings } = this.props
    const nestedHeadings = headings
      .filter(({ depth }) => depth <= 3)
      .map((i) => {
        i.children = []
        return i
      })
      .reduce((acc, curr, i, arr) => {
        const prev = acc[acc.length - 1]
        if (prev && curr.depth > prev.depth) {
          prev.children.push(curr)
          return acc;
        }

        acc.push(curr)
        return acc
      }, [])
    const slugger = GitHubSlugger()

    return (
      <PostSummaryContainer>
        <h3>Sections</h3>
        <ol>
          {nestedHeadings.map(({value, depth, children}) => {
            return (<li className={`depth-${depth}`} key={value}>
              <a href={`#${slugger.slug(value)}`}>{value}</a>
              {children.length > 0 && <ol>
                {children.map(({value, depth}) => {
                  return (
                    <li className={`depth-${depth}`} key={value}>
                      <a href={`#${slugger.slug(value)}`}>{value}</a>
                    </li>
                  )
                })}
              </ol>}
            </li>)
          } )}
        </ol>
      </PostSummaryContainer>
    )
  }
}

export default PostSummary
