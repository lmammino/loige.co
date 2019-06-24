import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import TagsList from './TagsList'
import DateViewer from './DateViewer'
import ReadingTime from './ReadingTime'
import profilePic from './images/profile-pic.jpg'

const Post = styled.article`
  margin: 2rem 0 1rem;
  max-width: 820px;

  &:first-of-type {
    margin-top: 0;
  }

  position: relative;
  margin: 4rem 0;
  padding-bottom: 4rem;
  border-bottom: #ebf2f6 1px solid;
  word-wrap: break-word;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;

  &::after {
    display: block;
    content: '';
    width: 7px;
    height: 7px;
    border: #e7eef2 1px solid;
    position: absolute;
    bottom: -5px;
    left: 50%;
    margin-left: -5px;
    background: #fff;
    border-radius: 100%;
    box-shadow: #fff 0 0 0 5px;
  }
`

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: bolder;
  letter-spacing: -1px;
  line-height: 1.15em;
  margin: 0 0 0.4em 0;
  max-width: 820px;
  text-rendering: geometricPrecision;
`

const Excerpt = styled.p`
  margin: 0;
  font-size: 1em;
  line-height: 1.7em;
  text-rendering: geometricPrecision;
  color: #3a4145;
  padding: 0 1em 0 0;
  max-width: 820px;
`

const Footer = styled.footer`
  margin: 0.75rem 0 0 0;
  font-size: 1rem;
  line-height: 1.5rem;
  color: #6d6d6d;
  vertical-align: middle;
`

const ProfilePic = styled.img`
  width: 24px;
  height: 24px;
  float: left;
  margin-right: 9px;
  border-radius: 100%;
`

const ReadThePost = styled.p`
  text-align: center;
  margin-top: 2rem !important;
  width: auto;

  a {
    color: inherit;
    padding: 16px;
    border: #bfc8cd 1px solid;
    text-decoration: none;
    border-radius: 4px;
    transition: border 0.3s ease;
    min-width: 200px;
    width: 100%;

    &:hover {
      color: rgb(136, 144, 147);
      border-color: rgb(152, 160, 164);
    }
  }

  @media (min-width: 1024px) {
    text-align: left;
    max-width: 100% !important;
  }
`

class PostPreview extends Component {
  render () {
    const { title, slug, excerpt, date, timeToRead, tags } = this.props
    return (
      <Post className="content">
        <header>
          <Title>
            <Link style={{ boxShadow: 'none' }} to={`/${slug}`}>
              {title}
            </Link>
          </Title>
        </header>
        <section>
          <Excerpt dangerouslySetInnerHTML={{ __html: excerpt }} />
        </section>
        <Footer>
          <ProfilePic
            src={profilePic}
            alt="Luciano Mammino's Profile picture"
          />
          <Link to="/about">Luciano Mammino</Link>
          <TagsList tags={tags} />
          <DateViewer date={date} />
          <ReadingTime time={timeToRead} />
          <ReadThePost>
            <Link to={`/${slug}`}>Read the post →</Link>
          </ReadThePost>
        </Footer>
      </Post>
    )
  }
}

export default PostPreview
