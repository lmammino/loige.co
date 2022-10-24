const path = require('path')
const { copyFileSync } = require('node:fs')
const mkdirp = require('mkdirp')
const Image = require('@11ty/eleventy-img')

module.exports = function (eleventyConfig, options = {}) {
  function figure (html, caption) {
    return `<figure>${html}<figcaption>${caption}</figcaption></figure>`
  }

  eleventyConfig.amendLibrary('md', markdown => {
    const originalImage = markdown.renderer.rules.image
    const cache = new Map()
    markdown.renderer.rules.image = function (tokens, idx, options, env, self) {
    // TODO: add a cache to speed up development
      const page = env.page
      const token = tokens[idx]
      const imgSrc = token.attrGet('src')
      const imgAlt = token.content
      const imgTitle = token.attrGet('title')

      const imgExt = path.extname(imgSrc)
      const imageName = path.basename(imgSrc, imgExt)

      // don't treat non relative images in a special way
      if (imgSrc.startsWith('http')) {
        return originalImage(tokens, idx, options, env, self)
      }

      const sourcePath = path.join(path.dirname(page.inputPath), imgSrc)
      const outputDir = path.dirname(page.outputPath)

      if (cache.has(sourcePath)) {
        return cache.get(sourcePath)
      }

      const htmlOpts = { alt: imgAlt, loading: 'lazy', decoding: 'async' }
      if (imgTitle) {
        htmlOpts.title = imgTitle
      }

      // by default just copy images
      let widths = [null]
      let imgOpts = {
        outputDir,
        urlPath: page.url,
        svgShortCircuit: true,
        statsOnly: true,
        filenameFormat: function (id, src, width, format, options) {
          return `${imageName}${imgExt}`
        }
      }

      if (['.jpeg', '.jpg', '.png'].includes(imgExt)) {
        // but re-process jpegs and pngs
        widths = [250, 426, 580, 768]
        imgOpts = {
          ...imgOpts,
          statsOnly: false,
          widths: widths
            .concat(widths.map((w) => w * 2)) // generate 2x sizes
            .filter((v, i, s) => s.indexOf(v) === i), // dedupe
          formats: ['webp', 'jpeg', 'avif'],
          filenameFormat: function (id, src, width, format, options) {
            return `${imageName}-${id}-${width}.${format}`
          }
        }
      } else {
        // if it's not one of these formats just copy the image as it is to the final folder
        mkdirp.sync(outputDir)
        copyFileSync(sourcePath, path.join(outputDir, imgSrc))
      }

      Image(sourcePath, imgOpts)

      const metadata = Image.statsSync(sourcePath, imgOpts)

      let result = Image.generateHTML(metadata, {
        sizes: '(max-width: 768px) 100vw, 768px',
        ...htmlOpts
      })

      if (imgTitle) {
        result = figure(result, imgTitle)
      }

      cache.set(sourcePath, result)
      return result
    }
  })
}
