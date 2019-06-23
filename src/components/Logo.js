import React, { Component } from 'react'
import { css, ClassNames } from '@emotion/core'
import { Link } from 'gatsby'

import logo from './images/luciano8bit.svg'

const logoStyle = css`
  color: #46c9e5;
  display: flex;
  margin-right: 10px;
  height: 100%;
  text-decoration: none;
  flex-direction: center;
  align-items: center;

  @media (min-width: 600px) {
    width: calc(100% / 6);
  }
`

const logoImageStyle = css`
  display: inline-block;
  vertical-align: top;
`

const logoTextStyle = css`
  margin-left: 10px;
  font-weight: bold;
  font-size: 20px;
  line-height: 20px;
`

class Logo extends Component {
  render () {
    return (
      <ClassNames>
        { ({ css, cx }) => (
          <Link
            to="/"
            className={`${css(logoStyle)}${
              this.props.className ? ` ${this.props.className}` : ''
            }`}
          >
            <img className={css(logoImageStyle)} height="60px" src={logo} alt="Loige" />
            <span className={css(logoTextStyle)}>Loige</span>
          </Link>
        )}
      </ClassNames>
    )
  }
}

export default Logo
