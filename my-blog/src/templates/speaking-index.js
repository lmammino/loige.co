import React, { Component, Fragment } from 'react'
import styled, { css } from 'react-emotion'
import { get } from 'lodash'
import Helmet from 'react-helmet'

import Layout from '../components/layout'
import Hero from '../components/Hero'
import PostsList from '../components/PostsList'
import speakingBg from '../components/images/speaking-bg.jpg'
import ImagesSolidIcon from '../components/icons/ImagesSolid'
import VideoSolidIcon from '../components/icons/VideoSolid'

const Content = styled('div')`
  min-height: 100vh;
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

  a {
    color: inherit;
  }

  h2 {
    margin: 2em 0 1em 0;
  }

  p {
    line-height: 1.7;
    margin: 1em 0 0 0;
    max-width: 42em;
  }

  p.slides-video {
    a {
      color: #6d6d6d;
      display: inline-block;
      margin: 0 0 0 1em;
      text-decoration: none;
      border-bottom: 1px solid transparent;

      &:hover {
        border-bottom: 1px solid #6d6d6d;
      }

      &:first-of-type {
        margin: 0;
      }

      svg {
        vertical-align: text-bottom;
      }
    }
  }

  ul {
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

const splitEventsByFutureAndPast = (events) => {
  const now = (new Date()).toISOString()
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

const conjunctions = (arr) => {
  const conjunctions = {
    comaSeparated: null,
    and: null,
    length: arr.length
  }

  if (arr.length == 1) {
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
    console.log(f)

    return (
      <div className="event-wrapper" itemScope itemType="http://schema.org/Event">
        <p>
          <strong className="event-title" itemProp="name">"{f.title}"</strong>
          <span>{f.is_workshop ? ` (workshop)` : ''}</span><br/>
          <span><a href={f.event_link} target="_blank">{f.event_name}</a></span>
          &nbsp; - <span>{f.date}</span>
          {withPeople.length > 0 && <span>
            &nbsp;with {withPeople.comaSeparated.map((person, index) => {
              return (
                <Fragment key={person.name}>
                  <a href={person.link} target="_blank">
                    {person.name}
                  </a>
                  {index < withPeople.comaSeparated.length - 1 && ', '}
                </Fragment>
              )
            })}
            { withPeople.and && <Fragment>
              &nbsp;and <a href={withPeople.and.link} target="_blank">
                {withPeople.and.name}
              </a>
            </Fragment> }
          </span>}
        </p>
        { (f.slides_link || f.video_link) && <p className="slides-video">
          {f.slides_link && <a href={f.slides_link} target="_blank">
            <ImagesSolidIcon/> Slides
          </a>} {f.video_link && <a href={f.video_link} target="_blank">
            <VideoSolidIcon/> Video
          </a>}
        </p> }
      </div>
    )
  }
}

class SpeakingIndex extends Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const { events } = this.props.pageContext
    const { future, past } = splitEventsByFutureAndPast(events)

    return (
      <Layout location={this.props.location} section="speaking">
        <Helmet title={siteTitle} />
        <Hero className='small gradientOverlay' backgroundImage={speakingBg}>
          <h1>Speaking</h1>
        </Hero>
        <Content>
          <div>
            <p>I am quite involved with conferences and I love delivering technical talks and workshops.</p>
            <p>If you think I can be a good suit to talk or host a workshop, you can use this form to <strong><a href="http://loige.link/invite-me-to-a-conference" target="_blank">📩 invite me to your next cool conference</a></strong>.</p>

            <p>Here you can find a list of my future and past involvements.</p>

            <h2>Upcoming events</h2>
            { future.length > 0 && <ul>
              { future.map(e => (
                <li key={e.frontmatter.slug}>
                  <SpeakingEntry event={e}/>
                </li>)) }
            </ul> }
            { future.length === 0 && <p>
              No future events planned at this time :(
            </p> }

            <h2>Past events ({past.length})</h2>
            <ul>
              { past.map(e => (
                <li key={e.frontmatter.slug}>
                  <SpeakingEntry event={e}/>
                </li>)) }
            </ul>
          </div>
        </Content>
      </Layout>
    )
  }
}

export default SpeakingIndex
