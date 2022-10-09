const readingTime = require('reading-time')

module.exports = function (eleventyConfig, options = {}) {
  eleventyConfig.addFilter('readingTime', function (text) {
    const stats = readingTime(text)
    return Math.floor(stats.minutes)
  })
}
