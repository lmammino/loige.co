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

  &:hover {
    color: rgb(136, 144, 147);
    border-color: rgb(152, 160, 164);
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
    return (
      <PaginationContainer>
        {previous && <Link className={`${pageLink} ${pageLinkPrev}`} to={previous.href}>← Newer Posts</Link>}
        <PageLabel>Page {currentPage} of {totalPages}</PageLabel>
        {next && <Link className={`${pageLink} ${pageLinkNext}`} to={next.href}>Older Posts →</Link>}
      </PaginationContainer>
    )
  }
}

export default Pagination
