import TwitterIcon from './components/icons/Twitter.astro'
import TwitchIcon from './components/icons/Twitch.astro'
import YoutubeIcon from './components/icons/Youtube.astro'
import LinkedinIcon from './components/icons/Linkedin.astro'
import GithubIcon from './components/icons/Github.astro'

const site = {
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
