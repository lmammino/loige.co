import React, { Component } from 'react'
import styled from '@emotion/styled'
import { Link } from 'gatsby'

import ProfileImage from './images/profile-pic.jpg'

const HelloContainer = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  padding: 1em;
  border-radius: 1em;
  margin: -2em 0 2em 0;

  @media (min-width: 1024px) {
    margin-top: 0;
  }

  p,
  span {
    line-height: 1.7em;
    text-rendering: geometricPrecision;
    color: #3a4145;
    max-width: 820px;
    margin: 0 auto;

    a {
      color: inherit;
      font-weight: bold;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .picture {
    text-align: center;
    display: block;

    h3 {
      color: #000;
    }

    img {
      border-radius: 50%;
    }
  }
`

class Hello extends Component {
  render () {
    return (
      <HelloContainer>
        <span className="picture">
          <img src={ProfileImage} alt="Luciano Mammino's profile picture" />
          <h3>Hello :)</h3>
        </span>
        <p>
          I am Luciano a.k.a. <em>loige</em>, a passionate Web Developer
          currently working as Solution Architect at Vectra, Dublin. You can
          read some of my posts in this page, or{' '}
          <Link to="/about">know more about myself and my side projects</Link>{' '}
          or about my <Link to="/speaking">talks and workshops</Link>.
        </p>
      </HelloContainer>
    )
  }
}

export default Hello
