import React, { Component } from 'react'
import { css } from 'react-emotion'
import { Link } from 'gatsby'

import mario from './images/mario.svg'

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
      <Link
        to="/"
        className={`${logoStyle}${
          this.props.className ? ` ${this.props.className}` : ''
        }`}
      >
        <img className={logoImageStyle} height="30px" src={mario} alt="Loige" />
        <span className={logoTextStyle}>Loige</span>
      </Link>
    )
  }
}

export default Logo
