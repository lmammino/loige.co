import React, { Component, Fragment } from 'react'
import styled from 'react-emotion'
import { graphql, Link } from 'gatsby'
import { get } from 'lodash'

import SEO from '../components/SEO'
import Layout from '../components/layout'
import Hero from '../components/Hero'
import speakingBg from '../components/images/speaking-bg.jpg'
import ImagesSolidIcon from '../components/icons/ImagesSolid'
import VideoSolidIcon from '../components/icons/VideoSolid'
import SpeakingMap from '../components/SpeakingMap'
import ArticleContainer from '../components/ArticleContainer'

const Content = styled('div')`
  margin: 2em auto;
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

const conjunctions = arr => {
  const conjunctions = {
    comaSeparated: null,
    and: null,
    length: arr.length
  }

  if (arr.length === 1) {
    conjunctions.comaSeparated = arr
  } else {
    const last = arr[arr.length - 1]
    conjunctions.comaSeparated = arr.slice(0, arr.length - 1)
    conjunctions.and = last
  }

  return conjunctions
}

class SpeakingEntry extends Component {
  render () {
    const { event } = this.props
    const { frontmatter: f } = event
    const withPeople = conjunctions(f.with)

    return (
      <div
        className="event-wrapper"
        itemScope
        itemType="http://schema.org/Event"
      >
        <h3 className="event-title" itemProp="name">
          {f.title}
          {f.is_workshop ? ' (workshop)' : ''}
        </h3>
        <p style={{ marginTop: '1em' }}>
          <span>
            <a
              itemProp="url"
              href={f.event_link}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              {f.event_name}
            </a>{' '}
            (
            <span
              itemProp="location"
              itemScope
              itemType="http://schema.org/Text"
            >
              {f.event_city}
            </span>
            )
          </span>
          &nbsp; - <span itemProp="startDate">{f.date}</span>
          {withPeople.length > 0 && (
            <span>
              &nbsp; - with{' '}
              {withPeople.comaSeparated.map((person, index) => {
                return (
                  <Fragment key={person.name}>
                    <a
                      href={person.link}
                      rel="nofollow noopener noreferrer"
                      target="_blank"
                    >
                      {person.name}
                    </a>
                    {index < withPeople.comaSeparated.length - 1 && ', '}
                  </Fragment>
                )
              })}
              {withPeople.and && (
                <Fragment>
                  &nbsp;and{' '}
                  <a
                    href={withPeople.and.link}
                    rel="nofollow noopener noreferrer"
                    target="_blank"
                  >
                    {withPeople.and.name}
                  </a>
                </Fragment>
              )}
            </span>
          )}
        </p>
        {(f.slides_link || f.video_link) && (
          <p className="slides-video">
            {f.slides_link && (
              <a
                href={f.slides_link}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <ImagesSolidIcon /> Slides
              </a>
            )}{' '}
            {f.video_link && (
              <a
                href={f.video_link}
                rel="nofollow noopener noreferrer"
                target="_blank"
              >
                <VideoSolidIcon /> Video
              </a>
            )}
          </p>
        )}
      </div>
    )
  }
}

class SpeakingIndex extends Component {
  render () {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { events } = this.props.pageContext
    const { future, past } = splitEventsByFutureAndPast(events)

    return (
      <Layout location={this.props.location} section="speaking">
        <SEO
          path={`speaking/`}
          pageData={{
            frontmatter: {
              title: `Speaking events: conference talks and workshops - ${siteTitle}`
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
