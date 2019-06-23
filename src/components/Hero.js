import React, { Component } from 'react'
import styled from '@emotion/styled'

import defaultBg from './images/default-bg.jpg'

const HeroContainer = styled.div`
  background-color: #46c9e5;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 100%;
  min-height: 300px;
  height: 50vh;
  display: table;

  &.small {
    max-height: 300px;
  }

  &.tiledBg {
    background-size: auto;
    background-repeat: repeat;
  }

  &.bottomRightBg {
    background-position: bottom right;
  }

  &.gradientOverlay {
    position: relative;
    z-index: -2;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-image: linear-gradient(to bottom right, #46c9e5, #d26ac2);
      opacity: 0.6;
      z-index: -1;
    }
  }

  @media (min-width: 780px) {
    height: 70vh;
  }
`

const HeroContent = styled.div`
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  font-weight: 700;
  color: #fff;
  padding: 0 2em;

  color: white;
  text-shadow: 1px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;

  @media (min-width: 780px) {
    font-size: 1.2em;
  }

  h1 {
    font-size: 2em;
    line-height: 1.6em;
  }

  h2 {
    font-size: 1.5em;
    margin: 0.5em 0 0 0;
    line-height: 1.6em;
  }

  &.textOverlay > * > span {
    background: #000000c4;
    display: inline;
    padding: 0.2em;
    box-decoration-break: clone;
    -webkit-box-decoration-break: clone;
  }
`

class Hero extends Component {
  render () {
    const { isSmall, children, className } = this.props
    const backgroundImage = this.props.backgroundImage || defaultBg

    return (
      <HeroContainer
        className={className}
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <HeroContent className={className}>{children}</HeroContent>
      </HeroContainer>
    )
  }
}

export default Hero
