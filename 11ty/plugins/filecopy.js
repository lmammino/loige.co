const path = require('path')
const { createReadStream, createWriteStream } = require('fs')
const { pipeline } = require('stream/promises')
const mkdirp = require('mkdirp')

module.exports = function (eleventyConfig, config = {}) {
  const processed = new Map()

  eleventyConfig.addAsyncFilter('filecopy', async function (filePath, ctx) {
    try {
      if (!filePath) {
        return
      }

      const filename = path.basename(filePath)
      const sourcePath = path.join(path.dirname(this.ctx.page.inputPath), filePath)
      const outputDir = path.dirname(this.ctx.page.outputPath)
      const outputPath = path.join(outputDir, filename)
      const outputUrl = `${this.ctx.page.url}${filename}`

      if (!sourcePath) {
        throw new Error(`File not found: ${sourcePath}`)
      }

      if (processed.has(sourcePath)) {
        return processed.get(sourcePath)
      }

      await mkdirp(outputDir)
      await pipeline(createReadStream(sourcePath), createWriteStream(outputPath))

      processed.set(sourcePath, outputUrl)
      return outputUrl
    } catch (err) {
      const getStackTrace = function () {
        const obj = {}
        Error.captureStackTrace(obj, getStackTrace)
        return obj.stack
      }
      eleventyConfig.logger.error(`${err.toString()}\n${getStackTrace()}`)
    }
  })
}
