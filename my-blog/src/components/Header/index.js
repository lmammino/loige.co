import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import NavLink from './NavLink'
import Logo from '../Logo'

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
  background: linear-gradient(90deg, #46c9e5, #d26ac2);
`

class Header extends Component {
  render() {
    return (
      <HeaderComponent>
        <HeaderCenterContainer>
          <HeaderFlexContainer>
            <Logo/>
            <Nav>
              <NavLink active to="/">Blog</NavLink>
              <NavLink to="/speaking">Speaking</NavLink>
              <NavLink to="/about">About</NavLink>
            </Nav>
            <SocialLinksContainer>
              <a className={socialLinkStyle} href="https://github.com/lmammino">GitHub</a>
              <a className={socialLinkStyle} href="https://twitter.com/loige">Twitter</a>
              <a className={socialLinkStyle} href="https://www.linkedin.com/in/lucianomammino/">LinkedIn</a>
            </SocialLinksContainer>
          </HeaderFlexContainer>
        </HeaderCenterContainer>
        <HeaderBorder/>
      </HeaderComponent>
    )
  }
}

export default Header
