#!/usr/bin/env node

const { createReadStream, createWriteStream, promises } = require('fs')
const { readdir, readFile, writeFile } = promises
const { join, basename, dirname } = require('path')
const frontmatter = require('front-matter')
const mkdirp = require('mkdirp-promise')
const YAML = require('yaml').default

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

const processPosts = async (expandedPosts, src, dest) => {
  const filesToCopy = []
  const posts = []
  const findResourcesRegex = /\]\((\/content([^\])]+))/g

  expandedPosts.forEach((post) => {
    const postDestDir = join(dest, `${post.attributes.date.substr(0,10)}_${post.attributes.slug}`)

    post.dest = join(postDestDir, 'index.md')

    // mark the header image to be copied
    if (post.attributes.header_img) {
      const oldHeaderLocation = join(src, post.attributes.header_img.replace(/^\/content\//, ''))
      const newHeaderLocation = join(postDestDir, basename(post.attributes.header_img))
      filesToCopy.push({ src: oldHeaderLocation, dest: newHeaderLocation })
      post.attributes.header_img = `./${basename(post.attributes.header_img)}`
    }

    // finds and replaces references to other assets in the post body
    post.body = post.body.replace(findResourcesRegex, (...args) => {
      const oldImageLocation = join(src, args[2])
      const newImageLocation = join(postDestDir, basename(args[2]))
      filesToCopy.push({ src: oldImageLocation, dest: newImageLocation })

      return `](./${basename(args[2])}`
    })

    post.content = `---\n${YAML.stringify(post.attributes)}---\n${post.body}`

    posts.push(post)
  })

  return ({ filesToCopy, posts })
}

const createDirIfNeeded = async (file) => {
  const dir = dirname(file)
  await mkdirp(dir)
}

const copyFiles = async (files) => {
  await files.reduce((acc, { src, dest }) => {
    acc.then(async () => {
      console.log(`- Copying \n\t${src} -> \n\t${dest}`)
      await createDirIfNeeded(dest)
      await new Promise((resolve, reject) => {
        createReadStream(src)
          .on('error', reject)
          .pipe(createWriteStream(dest))
          .on('error', reject)
          .on('finish', resolve)
      })
    })

    return acc
  }, Promise.resolve())
}

const copyPosts = async (posts) => {
  await posts.reduce((acc, post) => {
    acc.then(async () => {
      console.log(`- Writing ${post.dest}`)
      await createDirIfNeeded(post.dest)
      return writeFile(post.dest, post.content, 'utf8')
    })

    return acc
  }, Promise.resolve())
}

const main = async () => {
  const [,, src, dest] = process.argv

  const posts = await getPosts(src)
  const expanded = await expandWithContent(posts)
  const { filesToCopy, posts: postsToCopy } = await processPosts(expanded, src, dest)
  await copyFiles(filesToCopy)
  await copyPosts(postsToCopy)
}


main()
