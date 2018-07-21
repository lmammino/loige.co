import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'
import NavLink from './NavLink'

import mario from './mario.svg'

const HeaderComponent = styled('header')`
  background-color: rgba(32, 35, 42, .95);
  color: #ffffff;
  display: block;
  position: fixed;
  z-index: 1;
  width: 100%;
  top: 0;
  left: 0;
`

const HeaderCenterContainer = styled('div')`
  padding-left: 20px;
  padding-right: 20px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 1340px) {
    max-width: 1260px;
  }

  @media (min-width: 780px) {
    width: 90%;
  }
`

const HeaderFlexContainer = styled('div')`
  display: flex;
  height: 60px;
`

const logoStyle = css`
  color: #FCBA63;
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
  font-weight: 700;
  font-size: 20px;
  line-height: 20px;
`

const Nav = styled('nav')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 60%;
`

const SocialLinksContainer = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 60%;
`

const socialLinkStyle = css`
  color: #FFF;
  text-decoration: none;
  padding: 5px 10px;
  white-space: nowrap;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }
`

const HeaderBorder = styled('span')`
  height: 2px;
  display: block;
  transform-origin: left center 0px;
  transform: scaleX(1);
  z-index: 50;
  transition: transform 400ms ease 100ms;
  background: linear-gradient(90deg, rgb(210, 106, 194), rgb(70, 201, 229));
`

class Header extends Component {
  render() {
    return (
      <HeaderComponent>
        <HeaderCenterContainer>
          <HeaderFlexContainer>
            <Link to="/" className={logoStyle}>
              <img className={logoImageStyle} height="30px" src={mario} alt="Loige"/>
              <span className={logoTextStyle}>Loige</span>
            </Link>
            <Nav>
              <NavLink active to="/">Blog</NavLink>
              <NavLink to="/speaking">Speaking</NavLink>
              <NavLink to="/about">About</NavLink>
            </Nav>
            <SocialLinksContainer>
              <a className={socialLinkStyle} href="https://github.com/lmammino">GitHub</a>
              <a className={socialLinkStyle} href="https://twitter.com/loige">Twitter</a>
              <a className={socialLinkStyle} href="https://linkedin.com/lucianomammino">LinkedIn</a>
            </SocialLinksContainer>
          </HeaderFlexContainer>
        </HeaderCenterContainer>
        <HeaderBorder/>
      </HeaderComponent>
    )
  }
}

export default Header
