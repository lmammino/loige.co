import { SITE_DOMAIN } from '../consts'

type GetParams = {
  params: undefined
  props: undefined
  request: Request
}

export function GET(_params: GetParams) {
  return new Response(SITE_DOMAIN, {
    headers: { 'Content-Type': 'text/plain' },
  })
}
