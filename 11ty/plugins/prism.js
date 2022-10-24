const prism = require('markdown-it-prism')

module.exports = function (eleventyConfig, config = {}) {
  eleventyConfig.amendLibrary('md', markdown => {
    markdown.use(prism)
    const originalRenderer = markdown.renderer.rules.fence
    markdown.renderer.rules.fence = function (tokens, idx, renderOptions, env, self) {
      return `<div class="code-highlight">${originalRenderer(tokens, idx, renderOptions, env, self)}</div>`
    }
  })
}
