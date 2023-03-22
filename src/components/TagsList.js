import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { css, ClassNames } from '@emotion/react'
import { Link } from 'gatsby'

import TagsSolidIcon from './icons/TagsSolid'

const slugify = text =>
  text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text

const TagsContainer = styled.span`
  vertical-align: middle;
  margin: 0 0.5em 0 1em;
  display: inline-block;

  a {
    color: inherit;
    font-weight: bold;
    text-decoration: none;
    vertical-align: text-bottom;
  }
`

const tagsSolidIconStyle = css`
  margin: 0 0.25em 0 0;
`

const TagsSeparator = styled.span`
  vertical-align: text-bottom;
`

class TagsList extends Component {
  render () {
    const { tags } = this.props

    if (!tags || tags.length === 0) return []

    return (
      <ClassNames>
        { ({ css, cx }) => (
          <TagsContainer {...this.props}>
            <TagsSolidIcon className={css(tagsSolidIconStyle)} />
            {tags.map((tag, i) => {
              return (
                <Fragment key={tag}>
                  <Link to={`/tag/${slugify(tag)}`}>#{tag}</Link>
                  {i < tags.length - 1 ? <TagsSeparator>, </TagsSeparator> : ''}
                </Fragment>
              )
            })}
          </TagsContainer>
        )}
      </ClassNames>
    )
  }
}

export default TagsList
