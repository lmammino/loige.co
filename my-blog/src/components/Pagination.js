import React, { Component } from 'react'
import styled, { css } from 'react-emotion'
import { Link } from 'gatsby'

const PaginationContainer = styled('nav')`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 2rem 0;
  padding: 16px 0;
  max-width: 820px;
  color: #9EABB3;
  text-align: center;
`

const PageLabel = styled('span')`
  order: 1;
  width: 100%;
  padding: 16px 0;

  @media (min-width: 780px) {
    order: 2;
    width: auto;
  }
`

const pageLink = css`
  color: inherit;
  padding: 16px;
  border: #bfc8cd 1px solid;
  text-decoration: none;
  border-radius: 4px;
  transition: border 0.3s ease;
  min-width: 200px;
  width: 100%;

  &:hover {
    color: rgb(136, 144, 147);
    border-color: rgb(152, 160, 164);
  }

  @media (min-width: 780px) {
    width: auto;
  }
`

const Spacer = styled('div')`
  display: none;

  &.previous {
    order: 2;
  }

  &.next {
    order: 3;
  }

  @media (min-width: 780px) {
    min-width: 200px;
    display: block;

    &.previous {
      order: 1;
    }
  }
`

const pageLinkPrev = css`
  order: 2;

  @media (min-width: 780px) {
    order: 1;
  }
`

const pageLinkNext = css`
  order: 3;
`

class Pagination extends Component {
  render () {
    const { previous, next, currentPage, totalPages } = this.props
    const previousLabel = this.props.previousLabel || '← Newer Posts'
    const nextLabel = this.props.nextLabel || 'Older Posts →'
    return (
      <PaginationContainer>
        {previous ?
          <Link className={`${pageLink} ${pageLinkPrev}`} to={previous.href}>{previousLabel}</Link> :
          <Spacer className="previous"/>
        }
        <PageLabel>Page {currentPage} of {totalPages}</PageLabel>
        {next ?
          <Link className={`${pageLink} ${pageLinkNext}`} to={next.href}>{nextLabel}</Link> :
          <Spacer className="next"/>
        }
      </PaginationContainer>
    )
  }
}

export default Pagination
