import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import NavLink from './NavLink'
import Logo from './Logo'

import GithubIcon from './icons/Github'
import TwitterIcon from './icons/Twitter'
import LinkedinIcon from './icons/Linkedin'

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
  max-width: 1260px;

  @media (min-width: 780px) {
    width: 90%;
  }
`

const HeaderFlexContainer = styled('div')`
  display: flex;
  height: 60px;
`

const LogoStyle = css`
  display: none;

  @media (min-width: 540px) {
    display: flex;
  }
`

const Nav = styled('nav')`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 70%;

  @media (min-width: 1180px) {
    width: 60%;
  }
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
  width: 30%;

  @media (min-width: 1180px) { {
    width: 40%;
  }
`

const socialIconStyle = css`
  width: 24px;
  height: 24px;
  color: #fff;
  fill: currentColor;
  margin: 0 .5em 0 0;
`

const socialLinkStyle = css`
  color: #FFF;
  text-decoration: none;
  padding: 5px 4px;
  white-space: nowrap;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:hover {
    text-decoration: underline;
  }

  span {
    display: none
  }

  @media (min-width: 780px) {
    padding: 5px 10px;
  }

  @media (min-width: 1180px) {
    width: 60%;

    span {
      display: inline-block;
    }

    img {
      margin-right: 1em;
    }
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
            <Logo className={LogoStyle}/>
            <Nav>
              <NavLink active to="/">Blog</NavLink>
              <NavLink to="/speaking">Speaking</NavLink>
              <NavLink to="/about">About</NavLink>
            </Nav>
            <SocialLinksContainer>
              <a rel="nofollow" className={socialLinkStyle} href="https://github.com/lmammino">
                <GithubIcon className={socialIconStyle} alt={`Luciano's GitHub profile`}/>
                <span>GitHub</span>
              </a>
              <a rel="nofollow" className={socialLinkStyle} href="https://twitter.com/loige">
                <TwitterIcon className={socialIconStyle} alt={`Luciano's Twitter profile`}/>
                <span>Twitter</span>
              </a>
              <a rel="nofollow" className={socialLinkStyle} href="https://www.linkedin.com/in/lucianomammino/">
                <LinkedinIcon className={socialIconStyle} alt={`Luciano's LinkedIn profile`}/>
                <span>LinkedIn</span>
              </a>
            </SocialLinksContainer>
          </HeaderFlexContainer>
        </HeaderCenterContainer>
        <HeaderBorder/>
      </HeaderComponent>
    )
  }
}

export default Header
