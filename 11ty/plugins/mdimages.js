const path = require('path')
const markdown = require('markdown-it')()
const Image = require('@11ty/eleventy-img')

module.exports = function (eleventyConfig, options = {}) {
  function figure (html, caption) {
    return `<figure>${html}<figcaption>${caption}</figcaption></figure>`
  }

  const originalImage = markdown.renderer.rules.image
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
    if (!imgSrc.startsWith('./')) {
      return originalImage(tokens, idx, options, env, self)
    }

    const sourcePath = path.join(path.dirname(page.inputPath), imgSrc)
    const outputDir = path.dirname(page.outputPath)

    const parsed = (imgTitle || '').match(
      /^(?<skip>@skip(?:\[(?<width>\d+)x(?<height>\d+)\])? ?)?(?:\?\[(?<sizes>.*?)\] ?)?(?<caption>.*)/
    ).groups

    const htmlOpts = { alt: imgAlt, loading: 'lazy', decoding: 'async' }
    if (parsed.caption) {
      htmlOpts.title = parsed.caption
    }

    if (parsed.skip) {
      const options = { ...htmlOpts }
      if (parsed.sizes) {
        options.sizes = parsed.sizes
      }

      const metadata = { jpeg: [{ url: sourcePath }] }
      if (parsed.width && parsed.height) {
        metadata.jpeg[0].width = parsed.width
        metadata.jpeg[0].height = parsed.height
      }

      const generated = Image.generateHTML(metadata, options)

      if (parsed.caption) {
        return figure(generated, parsed.caption)
      }
      return generated
    }

    const widths = [250, 426, 580, 768]
    const imgOpts = {
      widths: widths
        .concat(widths.map((w) => w * 2)) // generate 2x sizes
        .filter((v, i, s) => s.indexOf(v) === i), // dedupe
      // TODO: gif lose animation anyway, so we should just copy them as they are...
      formats: [imgExt === '.gif' ? 'gif' : ('webp', 'jpeg', 'avif')],
      urlPath: page.url,
      outputDir: outputDir,
      filenameFormat: function (id, src, width, format, options) {
        return `${imageName}-${id}-${width}.${format}`
      }
    }

    Image(sourcePath, imgOpts)

    const metadata = Image.statsSync(sourcePath, imgOpts)

    const generated = Image.generateHTML(metadata, {
      sizes: parsed.sizes || '(max-width: 768px) 100vw, 768px',
      ...htmlOpts
    })

    if (parsed.caption) {
      return figure(generated, parsed.caption)
    }
    return generated
  }

  eleventyConfig.setLibrary('md', markdown)
}
