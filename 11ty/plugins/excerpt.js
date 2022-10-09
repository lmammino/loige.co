const clip = require('text-clipper').default

module.exports = function (eleventyConfig, options = {}) {
  eleventyConfig.addFilter('excerpt', function (htmlString, chars = 512) {
    const clippedHtml = clip(htmlString, chars, { html: true, stripTags: true })
    return clippedHtml
  })
}
