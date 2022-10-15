const yaml = require('js-yaml')
const sass = require('sass')
const dateUtilsPlugin = require('./plugins/dateutils')
const excerptPlugin = require('./plugins/excerpt')
const htmlminPlugin = require('./plugins/htmlmin')
const readingTimePlugin = require('./plugins/readingtime')
const sassPlugin = require('./plugins/sass')

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({static: '.'})
  eleventyConfig.addPlugin(dateUtilsPlugin)
  eleventyConfig.addPlugin(excerptPlugin)
  eleventyConfig.addPlugin(htmlminPlugin)
  eleventyConfig.addPlugin(readingTimePlugin)
  eleventyConfig.addPlugin(sassPlugin, { sass })

  eleventyConfig.addCollection('posts', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/posts/**/*.md').reverse()
  })

  eleventyConfig.addCollection('speaking', function(collectionApi) {
    return collectionApi.getFilteredByGlob('src/speaking/**/*.md').reverse()
  })

  return {
    dir: {
      input: 'src',
    },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  }
}
