import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

import Logo from '../Logo'

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
`

const Copyright = styled('p')`
  font-size: .8em;
  padding: 4px 0 0 40px;
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
              <Logo/>
              <Copyright>Copyright © Luciano Mammino 2014-{year}</Copyright>
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
                <ListTitle>Side Projects</ListTitle>
                <ListLink href="https://www.nodejsdesignpatterns.com">Node.js Design Patterns</ListLink>
                <ListLink href="https://serverlesslab.com">ServerlessLab</ListLink>
                <ListLink href="https://fullstackbulletin.com">FullStack Bulletin</ListLink>
                <ListLink href="https://middy.js.org">Middy</ListLink>
              </List>
            </FooterColumn>
            <FooterColumn>
              <List>
                <ListTitle>Follow me</ListTitle>
                <ListLink href="https://twitter.com/loige">Twitter</ListLink>
                <ListLink href="https://github.com/lmammino">GitHub</ListLink>
                <ListLink href="https://www.linkedin.com/in/lucianomammino">Linkedin</ListLink>
              </List>
            </FooterColumn>
          </FooterColumns>
        </FooterWrapper>
      </FooterContainer>
    )
  }
}

export default Footer
