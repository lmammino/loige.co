import React, { Component } from 'react'
import styled from 'react-emotion'
import { Link } from 'gatsby'

import EyeRegularIcon from './icons/EyeRegular'

const PrevNextPostsContainer = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  font-size: 14px;
  min-height: 260px;

  @media (min-width: 780px) {
    flex-wrap: nowrap;
    font-size: 16px;
  }

  @media (min-width: 1024px) {
    height: 300px;
    font-size: 18px;
  }
`

const Item = styled('li')`
  width: 100%;
  text-align: center;
  min-height: 100%;
  background: black;
  background-size: cover;

  a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.8);
    height: 100%;
    transition: background 0.5s ease;
    padding: 1em;

    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }

    h4 {
      color: #fff;
      font-size: 1.2em;
    }

    p {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.8em;
      vertical-align: middle;
      line-height: 1em;

      svg {
        vertical-align: text-bottom;
      }
    }
  }
`

const CallToAction = styled('span')`
  display: inline-block;
  padding: 4px 10px 5px;
  text-transform: uppercase;
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.8);
`

class PrevNextPosts extends Component {
  render () {
    const { previous, next } = this.props
    const previousBg =
      previous && previous.frontmatter.header_img
        ? `url(${previous.frontmatter.header_img.publicURL})`
        : undefined
    const nextBg =
      next && next.frontmatter.header_img
        ? `url(${next.frontmatter.header_img.publicURL})`
        : undefined
    return (
      <PrevNextPostsContainer>
        {previous && (
          <Item style={{ backgroundImage: previousBg }}>
            <Link to={previous.fields.slug} rel="prev">
              <CallToAction>Read this next</CallToAction>
              <h4>{previous.frontmatter.title}</h4>
              <p>
                <EyeRegularIcon /> {previous.timeToRead} minutes read
              </p>
            </Link>
          </Item>
        )}

        {next && (
          <Item style={{ backgroundImage: nextBg }}>
            <Link to={next.fields.slug} rel="next">
              <CallToAction>You might enjoy</CallToAction>
              <h4>{next.frontmatter.title}</h4>
              <p>
                <EyeRegularIcon /> {next.timeToRead} minutes read
              </p>
            </Link>
          </Item>
        )}
      </PrevNextPostsContainer>
    )
  }
}

export default PrevNextPosts
