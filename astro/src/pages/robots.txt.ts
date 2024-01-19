import { SITE_URL } from '../consts'

type GetParams = {
  params: undefined
  props: undefined
  request: Request
}

export function GET(_params: GetParams) {
  const content = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap-index.xml`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
