import React, { Component } from 'react'
import styled, { css } from 'react-emotion'

import TwitterIcon from '../icons/Twitter'
import FacebookIcon from '../icons/Facebook'
import LinkedinIcon from '../icons/Linkedin'
import PinterestIcon from '../icons/Pinterest'
import EmailIcon from '../icons/Email'

const icons = {
  twitter: <TwitterIcon/>,
  facebook: <FacebookIcon/>,
  linkedin: <LinkedinIcon/>,
  pinterest: <PinterestIcon/>,
  email: <EmailIcon/>
}

const buildLink = {
  twitter(url, title, site, imageUrl, twitterProfile) {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&source=${encodeURIComponent(site)}&related=${twitterProfile}&via=${twitterProfile}`
  },

  facebook(url, title, site, imageUrl, twitterProfile) {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
  },

  linkedin(url, title, site, imageUrl, twitterProfile) {
    return `http://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&source=${encodeURIComponent(site)}`
  },

  pinterest(url, title, site, imageUrl, twitterProfile) {
    return `https://pinterest.com/pin/create/button/?media=${encodeURIComponent(imageUrl)}&url=${encodeURIComponent(url)}&is_video=false&description=${encodeURIComponent(title)}`
  },

  email(url, title, site, imageUrl, twitterProfile) {
    return `mailto:?&body=%0A${encodeURIComponent(title)}%0A%0A${encodeURIComponent(url)}&subject=${encodeURIComponent(title)}`
  }
}

const socials = ['twitter', 'facebook', 'linkedin', 'pinterest', 'email']

class SocialShareBar extends Component {
  render() {
    const { url, title, site, imageUrl, twitterProfile } = this.props

    return (
      <ul>
        { socials.map((social) => {
          return (<li key={social}>
            <a
              target="_blank"
              href={buildLink[social](url, title, site, imageUrl, twitterProfile)}
              title={`Share via ${social}`}
              >
              {icons[social]}
            </a>
          </li>)
        }) }
      </ul>
    )
  }
}

export default SocialShareBar
