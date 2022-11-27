// calculates related/similar posts per matching categories
function getSimilarPosts (url, tags, postsByTag, limit = 5) {
  let similar = []
  tags &&
    tags.forEach(tag => {
      similar = similar.concat(postsByTag[tag])
    })

  return similar
    .filter(p => p.url !== url) // removes post itself
    .sort((a, b) => a.url.localeCompare(b.url)) // sorts by url
    .map(p => ({
      // augment data per post
      url: p.url,
      title: p.data.title,
      publishedAt: p.date,
      score: 1
    }))
    .reduce((acc, curr, i, a) => {
      // counts same occurrences
      const prev = a[i - 1]
      if (prev && curr.url === prev.url) {
        curr.score = ++prev.score
      }

      if (prev && curr.url !== prev.url) {
        acc.push(prev)
      }

      if (i === a.length - 1) {
        acc.push(curr)
      }

      return acc
    }, [])
    .sort((a, b) => {
      // sort by count DESC, date DESC
      if (a.score === b.score) {
        const dateA = a.publishedAt
        const dateB = b.publishedAt

        return dateB.getTime() - dateA.getTime()
      }

      return b.score - a.score
    })
    .slice(0, limit) // take top n
}

module.exports = function (eleventyConfig, config = {}) {
  let postsByTag = null

  eleventyConfig.addFilter('similar', (url, tags, posts, limit = 5) => {
    // posts are indexed once and then cached
    if (!postsByTag) {
      postsByTag = {}
      for (const post of posts) {
        for (const tag of post.data.tags) {
          if (!postsByTag[tag]) {
            postsByTag[tag] = []
          }
          postsByTag[tag].push(post)
        }
      }
    }

    return getSimilarPosts(url, tags, postsByTag, limit)
  })
}
