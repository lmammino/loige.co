import React, { Component } from 'react'
import styled from '@emotion/styled'

const Container = styled.a`
  background: transparent !important;
  white-space: nowrap !important;
  color: #000 !important;

  &:hover {
    text-decoration: underline !important;
  }
`

const ImgAvatar = styled.img`
  border-radius: 50%;
  width: 2em;
  height: 2em;
  vertical-align: middle;
  display: inline-block;
  margin: 0 .5em 0 0;
  overflow: hidden;
`

const TextAvatar = styled.div`
  border-radius: 50%;
  width: 32px;
  height: 32px;
  line-height: 32px;
  vertical-align: middle;
  display: inline-block;
  margin: 0 .5em;
  background: #46c9e5;
  text-align: center;
  font-weight: bold;
  font-size: .7em;
  box-sizing: border-box;
`

class Avatar extends Component {
  render () {
    return (
      <Container
        href={this.props.link}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        {this.props.image ? (<ImgAvatar alt={`${this.props.name}'s profile picture`} src={this.props.image}/>) : (<TextAvatar>{initials(this.props.name)}</TextAvatar>)}
        {this.props.name}
      </Container>
    )
  }
}

function initials (name) {
  return name
    .split(' ', 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
}

export default Avatar
