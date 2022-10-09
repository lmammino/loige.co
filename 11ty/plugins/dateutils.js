const dateFns = require('date-fns')

module.exports = function (eleventyConfig, options = {}) {
  eleventyConfig.addFilter('dateFormat', function (date, format) {
    const d = typeof date === 'string' ? dateFns.parseISO(date) : date
    return dateFns.format(d, format)
  })
}
