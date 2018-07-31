import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

import GithubIcon from './icons/Github'
import TwitterIcon from './icons/Twitter'
import LinkedinIcon from './icons/Linkedin'

const FooterContainer = styled('footer')`
  background-color: #20232a;
  color: #ffffff;
  padding-top: 30px;
  padding-bottom: 50px;
  position: relative;
`

const FooterBorder = styled('span')`
  position: absolute;
  width: 100%;
  top: 0;
  height: 2px;
  display: block;
  transform-origin: left center 0px;
  transform: scaleX(1);
  z-index: 50;
  transition: transform 400ms ease 100ms;
  background: linear-gradient(90deg, #46c9e5, #d26ac2);
`

const FooterWrapper = styled('div')`
  padding-left: 20px;
  padding-right: 20px;
  max-width: 1260px;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 780px) {
    width: 90%;
  }
`

const FooterColumns = styled('div')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`

const FooterColumn = styled('div')`
  flex: 1 auto;
  margin-bottom: 1em;
  padding-right: 1em;
`

const FooterFullColumn = styled('div')`
  flex: 1 auto;
  margin-bottom: 1em;
  padding-right: 1em;
  width: 100%;

  @media (min-width: 780px) {
    width: auto;
  }
`

const List = styled('div')`
  display: inline-flex;
  flex-direction: column;
`

const ListTitle = styled('div')`
  color: #d26ac2;
  font-size: 14px;
  font-weight: bold;
  line-height: 3;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const ListLink = styled('a')`
  color: inherit;
  line-height: 2;
  text-decoration: none;

  &:hover {
    color: #46c9e5;
  }
`

const Copyright = styled('p')`
  font-size: .8em;
  padding: 4px 0 0 0;
  color: #ccc;

  a {
    color: inherit;
    font-weight: bold;
    text-decoration: none;
  }

  a:hover {
    color: #46c9e5;
    text-decoration: underline;
  }
`

const Heart = styled('span')`
  color: #d26ac2;

  &:hover {
    color: red;
  }
`

class Footer extends Component {
  render () {
    const year = (new Date()).getFullYear()
    return (
      <FooterContainer>
        <FooterBorder/>
        <FooterWrapper>
          <FooterColumns>
            <FooterFullColumn>
              <ListTitle>Loige.co</ListTitle>
              <Copyright>Copyright © Luciano Mammino 2014-{year}.</Copyright>
              <Copyright>Built with <a target="_blank" href="https://www.gatsbyjs.org">Gatsby</a>, Coffee and a lot of <Heart>❤︎</Heart>.</Copyright>
              <Copyright>Hosted on <a target="_blank" href="https://github.com/lmammino/loige.co">GitHub</a>.</Copyright>
              <Copyright>Theme inspired by React Documentation.</Copyright>
              <Copyright>Icons by <a target="_blank" href="https://fontawesome.com/">Font Awesome</a>.</Copyright>
            </FooterFullColumn>
            <FooterColumn>
              <List>
                <ListTitle>Explore</ListTitle>
                <ListLink href="/">Blog</ListLink>
                <ListLink href="/speaking">Speaking</ListLink>
                <ListLink href="/about">About</ListLink>
                <ListLink href="/comment-policy">Comment Policy</ListLink>
              </List>
            </FooterColumn>
            <FooterColumn>
              <List>
                <ListTitle>My Projects</ListTitle>
                <ListLink target="_blank" href="https://www.nodejsdesignpatterns.com">Node.js Design Patterns</ListLink>
                <ListLink target="_blank" href="https://serverlesslab.com">ServerlessLab</ListLink>
                <ListLink target="_blank" href="https://fullstackbulletin.com">FullStack Bulletin</ListLink>
                <ListLink target="_blank" href="https://middy.js.org">Middy</ListLink>
              </List>
            </FooterColumn>
            <FooterColumn>
              <List>
                <ListTitle>Follow me</ListTitle>
                <ListLink href="https://twitter.com/loige"><TwitterIcon/> Twitter</ListLink>
                <ListLink href="https://github.com/lmammino"><GithubIcon/> GitHub</ListLink>
                <ListLink href="https://www.linkedin.com/in/lucianomammino"><LinkedinIcon/> Linkedin</ListLink>
              </List>
            </FooterColumn>
          </FooterColumns>
        </FooterWrapper>
      </FooterContainer>
    )
  }
}

export default Footer
