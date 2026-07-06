# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog and website for Luciano Mammino (loige.co), built with Astro 7. The site features blog posts, speaking engagements, side projects, and external articles. Deployed via GitHub Pages with Cloudflare CDN.

## Development Commands

**Toolchain**: managed by [mise](https://mise.jdx.dev) (`mise.toml` + `mise.lock` pin Node.js, pnpm and lefthook). Run `mise install` once. Project commands are defined as **mise tasks** — the same tasks CI and the git hooks run — list them with `mise tasks`.

- `mise run dev` - Start dev server at http://localhost:4321
- `mise run build` - Build static site (runs `astro check` then `astro build`)
- `mise run preview` - Preview production build locally
- `mise run lint` / `mise run lint:fix` - Biome check / auto-fix
- `mise run format:check` / `mise run format` - Prettier check / write
- `mise run ci` - Everything CI runs (lint + format check + build)

The equivalent `pnpm` scripts (`pnpm dev`, `pnpm build`, ...) still work.

**Package Manager**: Must use `pnpm` (enforced with a preinstall hook; version pinned in `mise.toml` and `packageManager`).

**Node.js**: Requires version 22.12.0 or higher (pinned via mise; CI uses the same pin)

**Running Scripts**: Use `pnpm tsx scripts/<script>.ts` to run utility scripts

## Code Style & Formatting

Two tools with a strict split of ownership (enforced in CI and by the lefthook pre-commit hook, which auto-fixes staged files):

- **Biome** (`biome.json`): lints AND formats `js/ts/jsx/tsx/json/jsonc/css` (Tailwind 4 syntax enabled via `css.parser.tailwindDirectives`). It also lints (but does NOT format) `.astro` frontmatter — `noUnusedImports`/`noUnusedVariables`/`useImportType` are off for `.astro` because Biome cannot see template usage.
- **Prettier** (`.prettierrc.mjs` + `prettier-plugin-astro`): formats `.astro`, markdown and yaml (everything Biome doesn't own — see `.prettierignore`).
- Formatter style: 2-space indentation, 80 character line width, single quotes, semicolons as needed; imports organized by Biome.
- **IMPORTANT**: never reformat code inside markdown fenced code blocks (Prettier is configured with `embeddedLanguageFormatting: 'off'` for md). Expressive-code annotations like `collapse={1-13}` and line highlights are line-number based, so reflowing code silently breaks them.

## Architecture

### Content Collections

Two main content collections defined in `src/content.config.ts` (Content Layer API, `glob()` loaders):

1. **posts**: Blog posts stored in `src/content/posts/` (glob pattern: `**/[^_]*.md(x)?`)

   - Each post has frontmatter: title, subtitle, description, date, updated, header_img, status (published/draft), tags
   - Posts organized in date-prefixed folders (e.g., `2014-01-16_finally-first/`)

2. **speaking**: Speaking engagements stored in `src/content/speaking/`
   - Includes event details, location, dates, slides/video links, co-speakers

### Key Utilities (`src/utils/posts.ts`)

- `getTagsFromPosts()` - Extracts tags with counts from posts
- `getPostsByTag()` - Groups posts by tag
- `getSimilarPosts()` - Finds related posts based on tag matching (relevancy score)
- `getAbsoluteUrl()` / `getShareUrl()` - Generate URLs for posts

### Page Structure

- `src/pages/[...slug].astro` - Main blog post renderer (dynamic routing)
- `src/pages/blog/` - Blog listing with pagination
- `src/pages/tag/` - Tag-based filtering
- `src/pages/speaking.astro` - Speaking page
- `src/pages/og/[...slug].png.ts` - Dynamic OG image generation using Canvas

### OG Image Generation

Located in `src/pages/og/[...slug].png.ts`. Uses `node-canvas` to generate 1200x630px social media images:

- Draws header image with gradient overlay
- Renders title text with automatic line wrapping (Atkinson Hyperlegible font)
- Adds "loige.co" footer

### Configuration & Constants

`src/consts.ts` contains all site-wide constants:

- Site metadata (domain, URL, author, title, description)
- Social media links
- Analytics IDs (Facebook App ID, Google Analytics GTAG)

### Integrations (astro.config.ts)

- **Sitemap**: Automatic sitemap generation
- **Compress**: HTML/JS compression (CSS pass deliberately disabled — its csso minifier drops `@media (width>=...)` range-syntax queries, killing all responsive styles; images/SVG excluded too)
- **Critters**: Critical CSS inlining
- **Expressive Code**: Code syntax highlighting with dual themes (dark-plus, one-light), collapsible sections and opt-in line numbers
- **MDX**: Enhanced Markdown support
- **TailwindCSS**: Via Vite plugin (Tailwind v4)

Deliberately pinned legacy behavior (do not "simplify" away):

- `compressHTML: true` (Astro 7 default `'jsx'` strips whitespace between inline elements)
- `markdown.processor: unified()` (the Astro 7 default Sätteri pipeline mangles posts embedding raw HTML: autolinks URLs inside `<a>` tags, re-escapes entities)

### Scripts

Located in `scripts/` (run with `pnpm tsx scripts/<name>.ts`):

- `postEnrichment.ts` - Uses AWS Bedrock (Claude v2) to generate subtitles and descriptions for blog posts that lack them (requires AWS credentials)
- `sendToOrama.ts` - Sends content to Orama Cloud for search indexing
- `search.ts` - Search-related utilities

## CI & Deployment

Two GitHub Actions workflows, both installing the toolchain via mise (`jdx/mise-action`, versions resolved from `mise.lock`):

- `.github/workflows/ci.yml`: runs on pull requests — `mise run lint`, `mise run format:check`, `mise run build`
- `.github/workflows/deploy.yml`: push to main, daily cron (00:01 UTC), manual dispatch — builds and deploys to GitHub Pages, then purges the Cloudflare CDN cache
- Both require system dependencies: `build-essential`, `libcairo2-dev`, `libpango1.0-dev`, `libjpeg-dev`, `libgif-dev`, `librsvg2-dev` (for Canvas)

## Important Notes

- Posts with filenames starting with `_` are excluded from the build (glob pattern filter)
- The site uses file-based routing - page URLs match the folder structure in `src/pages/`
- Speaking page rebuilds daily to ensure event dates are current
- Custom font (Atkinson Hyperlegible) used for OG image titles
- Site URL is `https://loige.co` - update `SITE_URL` in `src/consts.ts` if needed
- Canvas library requires native dependencies for OG image generation (libcairo2-dev, libpango1.0-dev, etc.)
