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
        htmlWhitespaceSensitivity: 'strict',
      },
    },
    {
      files: '*.{md,mdx}',
      options: {
        // Never reformat code inside fenced code blocks: expressive-code
        // annotations (collapse={..}, line highlights) are line-number based
        // and reflowing the code silently breaks them; code samples in
        // published posts are also deliberate as written.
        embeddedLanguageFormatting: 'off',
      },
    },
  ],
}
