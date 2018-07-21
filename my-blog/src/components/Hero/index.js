import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

import defaultBg from './defaultBg.jpg'

const HeroContent = styled('div')`
  background-color: #5B697F;
  background-repeat: no-repeat;
  background-position: bottom right;
  background-size: cover;
  width: 100%;
  min-height: 300px;
  height: 70vh;
  display: table;
`

class Hero extends Component {
  render () {
    const { isSmall, children } = this.props
    const backgroundImage = this.props.backgroundImage || defaultBg

    return (
      <HeroContent style={{
        backgroundImage: `url(${backgroundImage})`
      }}>
        {children}
      </HeroContent>
    )
  }
}

export default Hero
