import type { APIContext } from 'astro'
import { SITE_DOMAIN } from '../consts'

export function GET(_params: APIContext) {
  return new Response(SITE_DOMAIN, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
