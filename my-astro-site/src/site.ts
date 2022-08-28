import type { ImageMetadata } from '@astrojs/image'
import defaultImage from './components/images/page-image-fb.jpg'
import TwitterIcon from './components/icons/Twitter.astro'
import TwitchIcon from './components/icons/Twitch.astro'
import YoutubeIcon from './components/icons/Youtube.astro'
import LinkedinIcon from './components/icons/Linkedin.astro'
import GithubIcon from './components/icons/Github.astro'

const site = {
  metadata: {
    title:
      'Luciano Mammino "Loige" - FullStack & Cloud developer, fighter, butterfly maker!',
    author: 'Luciano Mammino',
    description:
      'The website of Luciano Mammino a.k.a. Loige: FullStack & Cloud developer, fighter, butterfly maker',
    siteUrl: 'https://loige.co/',
    defaultImage: defaultImage as unknown as ImageMetadata,
    twitterProfile: 'loige',
    disqusShortName: 'loige',
    fbAppId: '231187154413670'
  },
  hero: {
    title: 'Luciano Mammino',
    subtitle: 'Cloud developer, entrepreneur, fighter, butterfly maker!',
  },
  startYear: 2014,
  currentYear: new Date().getFullYear(),
  social: [
    {
      name: 'Twitter',
      href: 'https://twitter.com/loige',
      Icon: TwitterIcon
    },
    {
      name: 'Twitch',
      href: 'https://twitch.tv/loige',
      Icon: TwitchIcon
    },
    {
      name: 'Youtube',
      href: 'https://www.youtube.com/loige',
      Icon: YoutubeIcon
    },
    {
      name: 'Linkedin',
      href: 'https://www.linkedin.com/in/lucianomammino/',
      Icon: LinkedinIcon
    },
    {
      name: 'Github',
      href: 'https://github.com/lmammino',
      Icon: GithubIcon
    }
  ],
  projects: [
    { name: 'Node.js Design Patterns', href: 'https://www.nodejsdesignpatterns.com' },
    { name: 'AWS Bites', href: 'https://awsbites.com' },
    { name: 'FullStack Bulletin', href: 'https://fullstackbulletin.com' },
    { name: 'Middy', href: 'https://middy.js.org' },
  ]
}

export default site
