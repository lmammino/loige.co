import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'

import Avatar from './Avatar'
import WithPeople from './WithPeople'
import ImagesSolidIcon from './icons/ImagesSolid'
import VideoSolidIcon from './icons/VideoSolid'

const Title = styled.h3`
  margin-top: 0 !important;
  padding-top: 0 !important;
`

const WithPeopleBlock = styled.section`
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
            {f.presentation_language === 'it_IT' && <span>{' '}<span aria-label="In Italian" title="In Italian">🇮🇹</span></span>}
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
            {f.with && f.with.length > 0 && (
              <WithPeopleBlock>
                <WithPeople people={f.with} prefix="With"/>
              </WithPeopleBlock>
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

export default SpeakingEntry
