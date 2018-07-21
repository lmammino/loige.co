import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

const navLinkStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #ffffff;
  transition: color 0.2s ease-out;
  padding-left: 15px;
  padding-right: 15px;
  font-weight: 300;
  text-decoration: none;

  @media (min-width: 1280px) {
    padding-left: 20px;
    padding-right: 20px;
    font-size: 18px;
  }
`

const navLinkActiveStyle = css`
  color: #FCBA63;
  position: relative;
  ${'' /* border-bottom: 4px solid #FCBA63; */}
`

const LinkUnderline = styled('span')`
  position: absolute;
  bottom: -1px;
  height: 4px;
  left: 0px;
  right: 0px;
  z-index: 1;
  background: #FCBA63;
`

class NavLink extends Component {
  render() {
    const { to, active, children } = this.props
    return (
      <Link className={`${navLinkStyle}${ active ? ` ${navLinkActiveStyle}` : '' }`} to={to}>
        { active && <LinkUnderline/> }
        {children}
      </Link>
    )
  }
}

export default NavLink
