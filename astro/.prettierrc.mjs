/** @type {import("prettier").Config} */
export default {
  tabWidth: 2,
  useTabs: false,
  semi: false,
  singleQuote: true,
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
