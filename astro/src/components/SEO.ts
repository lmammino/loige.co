import type { AstroGlobal } from 'astro'
import {
  FB_APP_ID,
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL,
  TWITTER_HANDLE,
} from '../consts'

export type SEOProps = {
  title: string
  description: string
  image: string
  image_width: number
  image_height: number
  image_alt: string
  generator: string
  canonical: string
  sitemap: string
  rss: {
    url: string
    title: string
  }
  fbAppId: string
  twitter: {
    handle: string
    cardType: string
  }
  ogType: 'website' | 'article'
}

export type PartialSEOProps = Partial<SEOProps>

export function defaultSEOProps(astro: AstroGlobal): SEOProps {
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/loige-co.jpg`,
    image_width: 1200,
    image_height: 630,
    image_alt: `Cover picture for ${SITE_TITLE}`,
    generator: astro.generator,
    canonical: `${SITE_URL}${astro.url.pathname}`,
    sitemap: `${SITE_URL}/sitemap-index.xml`,
    rss: {
      url: `${SITE_URL}/rss.xml`,
      title: `Blog of ${SITE_TITLE} - ${SITE_DESCRIPTION}`,
    },
    fbAppId: FB_APP_ID,
    twitter: {
      handle: TWITTER_HANDLE,
      cardType: 'summary_large_image',
    },
    ogType: 'website',
  }
}
