import React, { Component } from 'react'
import styled from '@emotion/styled'
import { graphql, Link } from 'gatsby'
import { get } from 'lodash'

import SpeakingEntry from '../components/SpeakingEntry'
import SEO from '../components/SEO'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import speakingBg from '../components/images/speaking-bg.jpg'
import SpeakingMap from '../components/SpeakingMap'
import ArticleContainer from '../components/ArticleContainer'

const Content = styled.div`
  margin: 2em auto 4em;
  padding-left: 20px;
  padding-right: 20px;
  max-width: 820px;
  flex-direction: column;
  font-size: 16px;

  @media (min-width: 780px) {
    width: 90%;
    font-size: 17px;
  }

  h2 {
    margin: 2em 0 1em 0;
    color: #46c9e5;
    border: none;
  }

  h3 {
    margin: 0;
    padding: 1em 0 0 0;
  }

  p,
  ul {
    line-height: 1.7;
    margin: 1em 0 0 0;
    max-width: 42em;
  }

  p.slides-video {
    margin: 1em 0 0 0;

    a {
      display: inline-block;
      margin: 0 0 0 1em;

      &:first-of-type {
        margin: 0;
      }

      svg {
        vertical-align: text-bottom;
      }
    }
  }

  ul.topics {
    padding: 0 0 0 2em;

    a {
      font-weight: bold;
    }
  }

  ul.events {
    list-style: none;
    li {
      border-top: 1px solid #ececec;
      margin-top: 2em;
      padding-top: 2em;
      line-height: 1.2;

      &:first-of-type {
        border-top: none;
        margin-top: 0;
        padding-top: 0;
      }
    }
  }
`

const splitEventsByFutureAndPast = events => {
  const now = new Date().toISOString()
  const future = []
  const past = []

  events.forEach(e => {
    if (e.frontmatter.originalDate >= now) {
      future.unshift(e)
    } else {
      past.push(e)
    }
  })

  return { future, past }
}

class SpeakingIndex extends Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { events } = this.props.pageContext
    const { future, past } = splitEventsByFutureAndPast(events)

    return (
      <Layout location={this.props.location} section="speaking">
        <SEO
          path={'speaking/'}
          pageData={{
            frontmatter: {
              title: `Speaking (conferences and workshops) - ${siteTitle}`,
              meta_description:
              "Luciano Mammino's speaking engagements, conferences and workshops"
            }
          }}
        />
        <Hero className="small gradientOverlay" backgroundImage={speakingBg}>
          <h1>Speaking</h1>
        </Hero>
        <Content>
          <ArticleContainer>
            <p>
              I am quite involved with conferences and I love delivering
              technical talks and workshops.
            </p>
            <p>Lately I have been focusing on the following topics:</p>
            <ul className="topics">
              <li>
                <Link to="/tag/node-js">Node.js</Link>,{' '}
                <Link to="/tag/javascript">JavaScript</Link> and{' '}
                <Link to="/tag/design-patterns">Design Patterns</Link>
              </li>
              <li>
                <Link to="/tag/serverless">Serverless</Link> and{' '}
                <Link to="/tag/aws">AWS</Link>
              </li>
              <li>
                <strong>Systems architecture</strong> and{' '}
                <Link to="/tag/scalability">Scalability</Link>
              </li>
              <li>
                I am also learning{' '}
                <strong><Link to="/tag/rust">Rust</Link></strong>
              </li>
            </ul>
            <p>
              If you think I can be a good suit to talk or host a workshop, you
              can{' '}
              <strong>
                <a
                  href="http://loige.link/invite-me-to-a-conference"
                  target="_blank"
                  rel="nofollow noopener noreferrer"
                >
                  📩 invite me to your next cool conference
                </a>
              </strong>
              .
            </p>

            <p>Here you can find a list of my future and past engagements.</p>
          </ArticleContainer>
        </Content>
        <SpeakingMap events={events} />
        <Content>
          <ArticleContainer>
            <h2>Upcoming events</h2>
            {future.length > 0 && (
              <ul className="events">
                {future.map(e => (
                  <li key={e.frontmatter.slug}>
                    <SpeakingEntry event={e} />
                  </li>
                ))}
              </ul>
            )}
            {future.length === 0 && (
              <p>No future events planned at this time :(</p>
            )}

            <h2>Past events ({past.length})</h2>
            <ul className="events">
              {past.map(e => (
                <li key={e.frontmatter.slug}>
                  <SpeakingEntry event={e} />
                </li>
              ))}
            </ul>
          </ArticleContainer>
        </Content>
      </Layout>
    )
  }
}

export default SpeakingIndex

export const pageQuery = graphql`
  query SpeakingQuery {
    site {
      siteMetadata {
        title
        author
        siteUrl
        twitterProfile
        disqusShortName
      }
    }
  }
`
