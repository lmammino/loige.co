import React, { Component } from 'react'
import styled from '@emotion/styled'

import TwitterIcon from './icons/Twitter'
import FacebookIcon from './icons/Facebook'
import LinkedinIcon from './icons/LinkedinAlternate'
import PinterestIcon from './icons/Pinterest'
import EmailIcon from './icons/Email'

const SocialShareBarContainer = styled.ul`
  list-style: none;
  font-size: 30px;
  padding: 0.2em 0;

  li {
    display: inline-block;
    margin: 0 0.2em 0 0;

    a {
      color: #6d6d6d;
    }

    a.twitter:hover {
      color: #00aced;
    }

    a.facebook:hover {
      color: #3b5998;
    }

    a.linkedin:hover {
      color: #007bb6;
    }

    a.pinterest:hover {
      color: #cb2027;
    }

    a.email:hover {
      color: black;
    }
  }
`

const icons = {
  twitter: <TwitterIcon />,
  facebook: <FacebookIcon />,
  linkedin: <LinkedinIcon />,
  pinterest: <PinterestIcon />,
  email: <EmailIcon />
}

const buildLink = {
  twitter (url, title, site, imageUrl, twitterProfile) {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      title
    )}&url=${encodeURIComponent(url)}&source=${encodeURIComponent(
      site
    )}&related=${twitterProfile}&via=${twitterProfile}`
  },

  facebook (url, title, site, imageUrl, twitterProfile) {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`
  },

  linkedin (url, title, site, imageUrl, twitterProfile) {
    return `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}&source=${encodeURIComponent(site)}`
  },

  pinterest (url, title, site, imageUrl, twitterProfile) {
    return `https://pinterest.com/pin/create/button/?media=${encodeURIComponent(
      imageUrl
    )}&url=${encodeURIComponent(
      url
    )}&is_video=false&description=${encodeURIComponent(title)}`
  },

  email (url, title, site, imageUrl, twitterProfile) {
    return `mailto:?&body=%0A${encodeURIComponent(
      title
    )}%0A%0A${encodeURIComponent(url)}&subject=${encodeURIComponent(title)}`
  }
}

const socials = ['twitter', 'facebook', 'linkedin', 'pinterest', 'email']

class SocialShareBar extends Component {
  render () {
    const { url, title, site, imageUrl, twitterProfile } = this.props

    return (
      <SocialShareBarContainer>
        {socials.map(social => {
          return (
            <li key={social}>
              <a
                rel="nofollow noopener noreferrer"
                className={social}
                target="_blank"
                href={buildLink[social](
                  url,
                  title,
                  site,
                  imageUrl,
                  twitterProfile
                )}
                title={`Share via ${social}`}
              >
                {icons[social]}
              </a>
            </li>
          )
        })}
      </SocialShareBarContainer>
    )
  }
}

export default SocialShareBar
