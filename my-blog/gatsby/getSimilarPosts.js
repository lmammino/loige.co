// calculates related/similar posts per matching categories
const getSimilarPosts = (slug, tags, postsByTag, postsBySlug, limit = 5) => {

  let similar = []
  tags.forEach((tag) => {
    similar = similar.concat(postsByTag[tag].map((p) => p.node.fields.slug))
  })

  return similar
    .filter((p) => p !== slug) // removes post itself
    .sort() // sort alphabetically
    .map((p) => ({ // augment data per post
      slug: p,
      title: postsBySlug[p].node.frontmatter.title,
      publishedAt: postsBySlug[p].node.frontmatter.date,
      score: 1
    }))
    .reduce((acc, curr, i, a) => { // counts same occurrences
			const prev = a[i -1]
      if (prev && curr.slug === prev.slug) {
        curr.score = ++prev.score
      }

      if (prev && curr.slug !== prev.slug) {
        acc.push(prev)
      }

      if (i === a.length - 1) {
      	acc.push(curr)
      }

			return acc
    }, [])
    .sort((a, b) => {
      if (a.score === b.score) {
        const dateA = new Date(a.publishedAt)
        const dateB = new Date(b.publishedAt)

        return dateB.getTime() - dateA.getTime()
      }

      return b.score - a.score
    }) // sort by count DESC, date DESC
    .slice(0, limit)
}

module.exports = getSimilarPosts
