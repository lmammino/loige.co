#!/usr/bin/env node

const { readdir, readFile } = require('fs').promises
const { join, basename } = require('path')
const frontmatter = require('front-matter')

// get all md files in src
const getPosts = async (src) => {
  const all = await readdir(src)
  const md = all
    .filter((name) => name.match(/\.md$/))
    .map((name) => join(src, name) )
  return md
}

const expandWithContent = async (posts) => {
  const expandedPosts = await Promise.all(
    posts.map(
      (path) => new Promise((resolve, reject) => {
        readFile(path, 'utf8')
          .then((content) => resolve({ path, ...frontmatter(content) }))
          .catch(reject)
      })
    )
  )

  return expandedPosts
}

const processPosts = async (expandedPosts, dest) => {
  const filesToCopy = {}
  const posts = {}
  const findResourcesRegex = /\]\((\/content.+)\)/g

  expandedPosts.forEach((post) => {
    const postDestDir = join(dest, post.attributes.slug)

    // mark the header image to be copied
    if (post.attributes.header_img) {
      const newHeaderLocation = join(postDestDir, basename(post.attributes.header_img))
      filesToCopy[post.attributes.header_img] = newHeaderLocation
      post.attributes.header_img = newHeaderLocation
    }

    // finds and replaces references to other assets in the post body
    post.body = post.body.replace(findResourcesRegex, (...args) => {
      console.log({ args })
    })
  })

  return ({ filesToCopy, posts })
}



const main = async () => {
  const [,, src, dest] = process.argv
  console.log(src, dest)

  const posts = await getPosts(src)
  const expanded = await expandWithContent(posts)
  const processed = processPosts(expanded, dest)
  // console.log(expanded)
  // console.log(processed)
}


main()
