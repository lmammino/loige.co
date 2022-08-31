const path = require('path')
const fs = require('fs/promises')
const crypto = require('crypto')
const mkdirp = require('mkdirp')

module.exports = function (eleventyConfig, config = {}) {
  const defaultConfig = {
    outputPath: 'public',
    minify: process.env.NODE_ENV === 'production',
    sourceMap: true,
    includePaths: ['node_modules'],
    watchTarget: `${eleventyConfig.dir.input}/**/*.scss`,
    sass: null
  }

  const conf = { ...defaultConfig, ...config }
  const { sass } = conf

  if (!sass) {
    eleventyConfig.logger.warn('Sass plugin requires a sass instance (`sass` option)')
    return
  }

  const processed = new Map()
  eleventyConfig.addWatchTarget(conf.watchTarget)
  eleventyConfig.on('eleventy.beforeWatch', async (changedFiles) => {
    if (changedFiles.some((file) => file.endsWith('.scss'))) {
      processed.clear()
    }
  })

  eleventyConfig.addAsyncFilter('sass', async function (filePath, ctx) {
    const sourcePath = path.join(path.dirname(this.ctx.page.inputPath), filePath)
    if (processed.has(sourcePath)) {
      return processed.get(sourcePath)
    }

    const loadPaths = [
      eleventyConfig.dir.input,
      eleventyConfig.dir.includes || '_includes',
      ...conf.includePaths
    ]

    const result = await sass.compileAsync(sourcePath, {
      style: conf.minify ? 'compressed' : 'expanded',
      sourceMap: conf.sourceMap,
      loadPaths
    })

    const outputPath = path.join(eleventyConfig.dir.output, conf.outputPath)
    const fileHash = crypto.createHash('md5').update(result.css).digest('hex').substring(0, 8)
    const destFileName = `${path.basename(filePath, '.scss')}.${fileHash}.css`
    const destFileMapName = `${destFileName}.map`
    const destFilePath = path.join(outputPath, destFileName)
    const destFileUrl = `/${conf.outputPath}/${destFileName}`
    const destFileMapPath = path.join(outputPath, destFileMapName)

    let cssOutput = result.css
    if (conf.sourceMap) {
      cssOutput += `\n/*# sourceMappingURL=${destFileMapName} */`
    }

    await mkdirp(outputPath)
    eleventyConfig.logger.log(`Writing ${destFilePath} from ${sourcePath} (sass)`)
    await fs.writeFile(destFilePath, cssOutput)

    if (conf.sourceMap) {
      eleventyConfig.logger.log(`Writing ${destFileMapPath} from ${sourcePath} (sass)`)
      const fileMapOutput = JSON.stringify(result.sourceMap)
      await fs.writeFile(destFileMapPath, fileMapOutput)
    }

    processed.set(sourcePath, destFileUrl)
    return destFileUrl
  })
}
