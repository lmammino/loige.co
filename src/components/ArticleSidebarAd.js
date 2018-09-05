import React, { Component } from 'react'
import styled from 'react-emotion'

import bookCover from './images/book-cover-nodejs-design-patterns/200.jpg'

const ArticleSidebarAdContainer = styled('a')`
  background: #ffffcd;
  padding: 0.5em;
  font-size: 12px;
  display: block;

  color: inherit;
  text-decoration: none;
  border: 1px solid #ffffcd;
  margin: 0 0 1em 0;

  &:hover {
    border-color: #f89000;
  }
`

const Columns = styled('span')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Column = styled('span')`
  width: 50%;
  padding: 0 0 0 1em;
  display: block;

  &.left {
    max-width: 125px;
    padding: 0 0 0 1em !important;
  }

  @media (max-width: 1024px) and (min-width: 780px) {
    width: 100%;
    max-width: auto !important;
    margin: 0;

    &.left {
      padding: 0 0 0 1em;
    }

    h4 {
      padding: 1em 0 0.5em 0 !important;
    }
  }

  &:first-of-type {
    padding: 0;
  }

  h4 {
    padding: 0 0 0.5em 0;
    font-size: 14px;
  }
`

class ArticleSidebarAd extends Component {
  render () {
    return (
      <ArticleSidebarAdContainer
        rel="nofollow"
        target="_blank"
        href="https://loige.link/nodejs-book-ref-blog"
      >
        <Columns>
          <Column className="left">
            <img src={bookCover} style={{ width: '100%' }} />
          </Column>
          <Column>
            <h4>Node.js Design Patterns</h4>
            <p>
              Get the best out of Node.js by mastering its most powerful
              components and patterns to create modular and scalable
              applications with ease
            </p>
          </Column>
        </Columns>
      </ArticleSidebarAdContainer>
    )
  }
}

export default ArticleSidebarAd
