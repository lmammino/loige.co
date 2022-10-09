const htmlmin = require('html-minifier')

module.exports = function (eleventyConfig, options = {}) {
  if (process.env.NODE_ENV === 'production') {
    eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
      if (outputPath.endsWith('.html')) {
        return htmlmin.minify(content, {
          useShortDoctype: true,
          removeComments: true,
          collapseWhitespace: true
        })
      }

      return content
    })
  }
}
