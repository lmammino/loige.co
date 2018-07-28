import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

import EyeRegularIcon from '../icons/EyeRegular'

const eyeRegularStyle = css`
  margin: 0 .25em 0 0;
`

const ReadingTimeContainer = styled('span')`
  vertical-align: middle;
  font-size: inherit;
  margin: 0 .5em;
  display: inline-block;

  span {
    vertical-align: text-bottom;
  }
`

class ReadingTime extends Component {
  render() {
    const { time } = this.props
    return (
      <ReadingTimeContainer title={`${time} minute${time > 1 ? 's' : ''} read`}>
        <EyeRegularIcon className={eyeRegularStyle}/>
        <span>{time} min</span>
      </ReadingTimeContainer>
    )
  }
}

export default ReadingTime
