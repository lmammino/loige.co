import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'

import Avatar from './Avatar'
import ImagesSolidIcon from './icons/ImagesSolid'
import VideoSolidIcon from './icons/VideoSolid'

const Title = styled.h3`
  margin-top: 0 !important;
  padding-top: 0 !important;
`

const WithPeople = styled.section`
  margin: 2em 0 0 0;
  color: #666;

  a {
    border: none
  }

  a:hover {
    border: none
  }
`

const SlidesVideo = styled.section`
  margin: 2em 0 0 0;
`

const EntryDetails = styled.div`
  margin-top: 1em;
  line-height: 1.5em;
`

class SpeakingEntry extends Component {
  render () {
    const { event } = this.props
    const { frontmatter: f } = event
    const withPeople = conjunctions(f.with)

    return (
      <div>
        <div
          className="event-wrapper"
          itemScope
          itemType="http://schema.org/Event"
        >
          <Title className="event-title" itemProp="name">
            {f.title}
            {f.is_workshop ? ' (workshop)' : ''}
          </Title>
          <EntryDetails>
            <p>
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
                  itemType="http://schema.org/Place"
                >
                  <span itemProp="name">{f.event_city}</span>
                  <span
                    aria-hidden="true"
                    style={{ display: 'none' }}
                    itemProp="address"
                  >
                    {f.event_location}
                  </span>
                </span>
                )
              </span>
              &nbsp; - <span itemProp="startDate">{f.date}</span>
            </p>
            {withPeople.length > 0 && (
              <WithPeople>
                With{' '}
                {withPeople.comaSeparated.map((person, index) => {
                  return (
                    <Fragment key={person.name}>
                      <Avatar link={person.link} name={person.name} image={person.image}/>
                      {index < withPeople.comaSeparated.length - 1 && ', '}
                    </Fragment>
                  )
                })}
                {withPeople.and && (
                  <Fragment key={withPeople.and.name}>
                    &nbsp;and{' '}
                    <Avatar link={withPeople.and.link} name={withPeople.and.name} image={withPeople.and.image}/>
                  </Fragment>
                )}
              </WithPeople>
            )}

            {(f.slides_link || f.video_link) && (
              <SlidesVideo className="slides-video">
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
              </SlidesVideo>
            )}

          </EntryDetails>
        </div>
      </div>
    )
  }
}

function conjunctions (arr) {
  const c = {
    comaSeparated: null,
    and: null,
    length: arr.length
  }

  if (arr.length === 1) {
    c.comaSeparated = arr
  } else {
    const last = arr[arr.length - 1]
    c.comaSeparated = arr.slice(0, arr.length - 1)
    c.and = last
  }

  return c
}

export default SpeakingEntry
