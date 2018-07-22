import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

import CalendarAltRegularIcon from '../icons/CalendarAltRegular'

const calendarAltRegularStyle = css`
  margin: 0 .25em 0 0;
`

const CalendarViewContainer = styled('span')`
  vertical-align: middle;
  font-size: inherit;

  span {
    vertical-align: text-bottom;
  }
`

class DateViewer extends Component {
  render() {
    const { date } = this.props
    return (
      <CalendarViewContainer>
        <CalendarAltRegularIcon className={calendarAltRegularStyle}/>
        <span>{date}</span>
      </CalendarViewContainer>
    )
  }
}

export default DateViewer
