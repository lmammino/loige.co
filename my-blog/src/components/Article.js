import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { injectGlobal } from 'emotion'

const colors = {
  char: '#D8DEE9',
  comment: '#999999',
  keyword: '#c5a5c5',
  lineHighlight: '#14161a',
  primitive: '#5a9bcf',
  string: '#8dc891',
  variable: '#d7deea',
  boolean: '#ff8b50',
  punctuation: '#5FB3B3',
  tag: '#fc929e',
  function: '#79b6f2',
  className: '#FAC863',
  method: '#6699CC',
  operator: '#fc929e',
}

injectGlobal`
  .gatsby-highlight {
    font-size: 15px;
    line-height: 1.7;
    background: #282c34;
    color: #ffffff;
    border-radius: 10px;
    overflow: auto;
    tab-size: 1.5em;

    margin: 1.5em -1em 1.5em 0;
    padding: 1em;

    @media (min-width: 780px) {
      margin-left: -2em;
      padding-left: 2em;
      padding-right: 2em;
      font-size: 16px;
    }

    .token.attr-name {
      color: ${colors.keyword};
    }

    .token.comment,
    .token.block-comment,
    .token.prolog,
    .token.doctype,
    .token.cdata {
      color: ${colors.comment};
    }

    .token.property,
    .token.number,
    .token.function-name,
    .token.constant,
    .token.symbol,
    .token.deleted {
      color: ${colors.primitive};
    }

    .token.boolean {
      color: ${colors.boolean};
    }

    .token.tag {
      color: ${colors.tag};
    }

    .token.string {
      color: ${colors.string};
    }

    .token.punctuation {
      color: ${colors.punctuation};
    }

    .token.selector,
    .token.char,
    .token.builtin,
    .token.inserted {
      color: ${colors.char};
    }

    .token.function {
      color: ${colors.function};
    }

    .token.operator,
    .token.entity,
    .token.url,
    .token.variable {
      color: ${colors.variable};
    }

    .token.attr-value {
      color: ${colors.string};
    }

    .token.keyword {
      color: ${colors.keyword};
    }

    .token.atrule,
    .token.class-name {
      color: ${colors.className};
    }

    .token.important {
      font-weight: 400;
    }

    .token.bold {
      font-weight: 700;
    }
    .token.italic {
      font-style: italic;
    }

    .token.entity' {
      cursor: help;
    }
  }

  .gatsby-highlight > pre {
    height: auto !important;
    margin: 1rem;
    white-space: pre-wrap;
    word-break: break-word;
  }

  .gatsby-highlight + .gatsby-highlight {
    margin-top: 20px,
  }

  .gatsby-highlight-code-line {
    background-color: #14161a;
    display: block;
    margin: -0.125rem calc(-1rem - 15px);
    padding: 0.125rem calc(1rem + 15px);
  }
`

const ArticleContainer = styled('article')`
  margin: 2em 0;
  line-height: 25px;
  padding: 0 1em;

  code {
    white-space: pre-wrap;
    word-break: break-word;
  }

  @media (min-width: 780px) {
    padding: 0 2em;
  }

  & a {
    background-color: rgba(187,239,253,0.3);
    border-bottom: 1px solid rgba(0,0,0,0.2);
    text-decoration: none;
    color: inherit;

    &:hover {
      background-color: #bbeffd;
      border-bottom-color: #1a1a1a;
    }

    &.anchor, &.gatsby-resp-image-link {
      background-color: transparent;
      border: none;
    }
  }

  & > p:first-child {
    font-size: 18px;
    font-weight: 300;
    color: #6d6d6d;

    & a, & strong {
      font-weight: 400;
    }

    @media (min-width: 780px) {
      font-size: 24px;
    }
  }

  & p {
    margin: 1em 0 0 0;
    font-size: 16px;
    line-height: 1.7;
    max-width: 42em;

    @media (min-width: 780px) {
      font-size: 17px;
      line-height: 1.7;
    }
  }

  & h2, & h3 {
    margin: 2em 0 0 0;
  }

  & p > code, & li > code {
    background: rgba(255,229,100,0.2);
    color: inherit;
    display: inline-block;
    padding: 0 .3em;
  }

  & p > code, & li > code, & p > a > code, & li > a > code {
    padding: 0 3px;
    font-size: inherit;
    word-break: break-word;
  }

  & h2 {
    border-top: 1px solid #ececec;
    margin-top: 2em;
    padding-top: 2em;
    line-height: 1.2;
    font-size: 20px;

    &:first-child {
      border-top: 0;
      margin-top: 0;
      padding-top: 0;
    }

    @media (min-width: 780px) {
      font-size: 35px;
    }
  }

  & hr + h2 {
    border-top: 0;
    margin-top: 0;
  }

  & h3 {
    padding-top: 45px;
    font-size: 18px;

    @media (min-width: 780px) {
      font-size: 25px;
      line-height: 1.3;
    }
  }

  & h2 + h3, & h2 + h3:first-of-type {
    padding-top: 30px;
  }

  & h4 {
    font-size: 20px;
    color: #6d6d6d;
    line-height: 1.3;
    margin-top: 50px;
    font-weight: 400;
  }

  & h4 + p {
    margin-top: 20px;
  }

  & ol, & ul {
    margin-top: 20px;
    font-size: 16px;
    padding-left: 2em;

    & p, & p:first-of-type {
      font-size: 16px;
      margin-top: 0;
      line-height: 1.2;
    }

    & li {
      margin-top: 10px;
    }

    & ol, & ul {
      margin-left: 20px;
      margin-top: 10px;
    }
  }

  & img {
    max-width: 100%;
  }

  & ol {
    list-style: decimal;
  }

  & ul {
    list-style: disc;
  }

  & blockquote {
    background-color: rgba(255,229,100,0.3);
    border-left-color: #ffe564;
    border-left-width: 9px;
    border-left-style: solid;
    padding: 20px 45px 20px 26px;
    margin: 1em 0 2em -1em;

    @media (min-width: 780px) {
      margin-left: -2em;
    }

    & p {
      margin-top: 15px;

      &:first-of-type {
        font-weight: 700;
        margin-top: 0;
      }

      &:nth-of-type(2) {
        margin-top: 0;
      }
    }
  }
`

class Article extends Component {
  render() {
    const { html } = this.props
    return (
      <ArticleContainer dangerouslySetInnerHTML={{ __html: html }}/>
    )
  }
}

export default Article
