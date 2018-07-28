import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

class Article extends Component {
  render() {
    const { html } = this.props
    return (
      <article dangerouslySetInnerHTML={{ __html: html }}/>
    )
  }
}

export default Article
