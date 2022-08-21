import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css, ClassNames } from '@emotion/react'
import NavLink from './NavLink'
import Logo from './Logo'

import GithubIcon from './icons/Github'
import TwitterIcon from './icons/Twitter'
import LinkedinIcon from './icons/Linkedin'
import YoutubeIcon from './icons/Youtube'
import TwitchIcon from './icons/Twitch'

const HeaderComponent = styled.header`
  background-color: rgba(32, 35, 42, 0.95);
  color: #ffffff;
  display: block;
  position: auto;
  z-index: 2000;
  width: 100%;
  top: 0;
  left: 0;

  @media (min-width: 780px) {
    position: fixed;
  }
`

const HeaderCenterContainer = styled.div`
  padding-left: 4px;
  padding-right: 4px;
  margin-left: auto;
  margin-right: auto;
  max-width: 1260px;

  @media (min-width: 780px) {
    width: 90%;
    padding-left: 20px;
    padding-right: 20px;
  }
`

const HeaderFlexContainer = styled.div`
  display: flex;
  height: 60px;
`

const LogoStyle = css`
  display: none;

  @media (min-width: 540px) {
    display: flex;
  }
`

const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 60%;

  @media (min-width: 1180px) {
    width: 60%;
  }
`

const SocialLinksContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  overflow-x: auto;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  width: 40%;

  @media (min-width: 1180px) {
    width: 40%;
  }
`

const socialIconStyle = css`
  width: 16px;
  height: 16px;
  color: #fff;
  fill: currentColor;

  @media (min-width: 540px) {
    width: 24px;
    height: 24px;
  }

  @media (min-width: 1180px) {
    margin: 0 0 0 0;
  }
`

const socialLinkStyle = css`
  color: #fff;
  text-decoration: none;
  text-align: center;
  padding: 5px 4px;
  white-space: nowrap;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  transition: background 150ms;
  border-radius: 0.5em;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  @media (min-width: 780px) {
    padding: 5px 10px;
  }
`

const HeaderBorder = styled.span`
  height: 2px;
  display: block;
  transform-origin: left center 0px;
  transform: scaleX(1);
  z-index: 50;
  transition: transform 400ms ease 100ms;
  background: linear-gradient(90deg, #46c9e5, #d26ac2);
`

class Header extends Component {
  render () {
    const { section } = this.props
    return (
      <ClassNames>
        { ({ css, cx }) => (
          <HeaderComponent>
            <HeaderCenterContainer>
              <HeaderFlexContainer>
                <Logo className={css(LogoStyle)} />
                <Nav>
                  <NavLink active={section === 'blog'} to="/">
                  Blog
                  </NavLink>
                  <NavLink active={section === 'speaking'} to="/speaking">
                  Speaking
                  </NavLink>
                  <NavLink active={section === 'about'} to="/about">
                  About
                  </NavLink>
                </Nav>
                <SocialLinksContainer>

                  <a
                    rel="nofollow"
                    className={css(socialLinkStyle)}
                    href="https://twitter.com/loige"
                  >
                    <TwitterIcon
                      className={css(socialIconStyle)}
                      alt={'Luciano\'s Twitter profile'}
                    />
                  </a>

                  <a
                    rel="nofollow"
                    className={css(socialLinkStyle)}
                    href="https://twitch.tv/loige"
                  >
                    <TwitchIcon
                      className={css(socialIconStyle)}
                      alt={'Luciano\'s Twitch profile'}
                    />
                  </a>

                  <a
                    rel="nofollow"
                    className={css(socialLinkStyle)}
                    href="https://www.youtube.com/loige"
                  >
                    <YoutubeIcon
                      className={css(socialIconStyle)}
                      alt={'Luciano\'s YouTube profile'}
                    />
                  </a>

                  <a
                    rel="nofollow"
                    className={css(socialLinkStyle)}
                    href="https://www.linkedin.com/in/lucianomammino/"
                  >
                    <LinkedinIcon
                      className={css(socialIconStyle)}
                      alt={'Luciano\'s LinkedIn profile'}
                    />
                  </a>

                  <a
                    rel="nofollow"
                    className={css(socialLinkStyle)}
                    href="https://github.com/lmammino"
                  >
                    <GithubIcon
                      className={css(socialIconStyle)}
                      alt={'Luciano\'s GitHub profile'}
                    />
                  </a>
                </SocialLinksContainer>
              </HeaderFlexContainer>
            </HeaderCenterContainer>
            <HeaderBorder />
          </HeaderComponent>
        )}
      </ClassNames>
    )
  }
}

export default Header
