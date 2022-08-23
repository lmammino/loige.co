export function blog(page?: number) {
  return page === 1 || typeof page === 'undefined' ? '/' : `/page/${page}`
}

export function speaking() {
  return '/speaking'
}

export function about() {
  return '/about'
}

export function post(slug: string) {
  return `/${slug}`
}

export function tag(tag: string) {
  return `/tag/${tag}`
}

export function commentPolicy() {
  return '/comment-policy'
}