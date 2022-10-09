const yaml = require('js-yaml')
const sass = require('sass')
const htmlminPlugin = require('./plugins/htmlmin')
const sassPlugin = require('./plugins/sass')

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({ 'public': 'public' })
  eleventyConfig.addPlugin(htmlminPlugin)
  eleventyConfig.addPlugin(sassPlugin, { sass })

  return {
    dir: {
      input: 'src',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
}
