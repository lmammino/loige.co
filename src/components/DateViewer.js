import React, { Component } from 'react'
import styled from '@emotion/styled'
import { css, ClassNames } from '@emotion/react'

import CalendarAltRegularIcon from './icons/CalendarAltRegular'

const calendarAltRegularStyle = css`
  margin: 0 0.25em 0 0;
`

const CalendarViewContainer = styled.span`
  vertical-align: middle;
  font-size: inherit;
  margin: 0 0.5em;
  display: inline-block;

  span {
    vertical-align: text-bottom;
  }
`

class DateViewer extends Component {
  render () {
    const { date, style, className } = this.props
    return (
      <ClassNames>
        { ({ css, cx }) => (
          <CalendarViewContainer style={style} className={css(className)}>
            <CalendarAltRegularIcon className={css(calendarAltRegularStyle)} />
            <span>{date}</span>
          </CalendarViewContainer>
        ) }
      </ClassNames>
    )
  }
}

export default DateViewer
