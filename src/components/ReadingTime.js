import React, { Component, Fragment } from 'react'
import styled from '@emotion/styled'
import { css, ClassNames, jsx } from '@emotion/react'

import EyeRegularIcon from './icons/EyeRegular'

const eyeRegularStyle = css`
  margin: 0 0.25em 0 0;
`

const ReadingTimeContainer = styled.span`
  vertical-align: middle;
  font-size: inherit;
  margin: 0 0.5em;
  display: inline-block;

  span {
    vertical-align: text-bottom;
  }
`

class ReadingTime extends Component {
  render () {
    const { time } = this.props
    return (
      <ReadingTimeContainer title={`${time} minute${time > 1 ? 's' : ''} read`}>
        <ClassNames>
          { ({ css, cx }) => (
            <Fragment>
              <EyeRegularIcon className={css(eyeRegularStyle)} />
              <span>{time} min</span>
            </Fragment>
          )}
        </ClassNames>
      </ReadingTimeContainer>
    )
  }
}

export default ReadingTime
