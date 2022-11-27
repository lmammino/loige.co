const yaml = require('js-yaml')
const sass = require('sass')
const slugify = require("slugify")
// TODO: for now this uses a manually linked version of 
// the plugin from `https://github.com/lmammino/eleventy-plugin-toc/tree/feat-parse-headers`
// alternatively use https://github.com/ds300/patch-package with the changes
// in the following PR: https://github.com/jdsteinbach/eleventy-plugin-toc/pull/39
const pluginTOC = require('eleventy-plugin-toc')
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents")
const dateUtilsPlugin = require('./plugins/dateutils')
const excerptPlugin = require('./plugins/excerpt')
const filecopyPlugin = require('./plugins/filecopy')
const htmlminPlugin = require('./plugins/htmlmin')
const mdImagesPlugin = require('./plugins/mdimages')
const prismPlugin = require('./plugins/prism')
const readingTimePlugin = require('./plugins/readingtime')
const sassPlugin = require('./plugins/sass')
const similarPosts = require('./plugins/similarPosts')

function markdownItSlugify(s) {
	return slugify(removeExtraText(s), { lower: true, remove: /[\=\":’'`,]/g });
}

function removeExtraText(s) {
	let newStr = String(s).replace(/[?!]/g, "");
	newStr = newStr.replace(/<[^>]*>/g, "");
	return newStr;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yml", contents => yaml.load(contents));
  eleventyConfig.addPassthroughCopy({static: '.'})
  eleventyConfig.addPlugin(dateUtilsPlugin)
  eleventyConfig.addPlugin(excerptPlugin)
  eleventyConfig.addPlugin(filecopyPlugin)
  eleventyConfig.addPlugin(htmlminPlugin)
  eleventyConfig.addPlugin(mdImagesPlugin)
  eleventyConfig.addPlugin(prismPlugin)
  eleventyConfig.addPlugin(readingTimePlugin)
  eleventyConfig.addPlugin(sassPlugin, { sass })
  eleventyConfig.addPlugin(similarPosts)
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3'],
    wrapperClass: 'post__sidebar--toc',
    extractText: function(el) {
      return el.text().replace('Jump to heading', '').replace('#', '').trim()
    }
  })
  eleventyConfig.amendLibrary('md', markdown => {
    markdown.use(markdownItAnchor, {
      slugify: markdownItSlugify,
      level: [1,2,3,4],
      permalink: markdownItAnchor.permalink.linkInsideHeader({
        symbol: `
          <span class="sr-only">Jump to heading</span>
          <span aria-hidden="true">#</span>
        `,
        class: "direct-link",
        placement: 'before'
      })
    })
    .use(markdownItToc, {
      includeLevel: [2, 3],
      slugify: markdownItSlugify,
      format: function(heading) {
        return removeExtraText(heading);
      },
      transformLink: function(link) {
        // remove backticks from markdown code
        return link.replace(/\%60/g, "");
      }
    });
  })

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
