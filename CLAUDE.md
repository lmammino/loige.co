# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal blog and website for Luciano Mammino (loige.co), built with Astro 5. The site features blog posts, speaking engagements, side projects, and external articles. Deployed via GitHub Pages with Cloudflare CDN.

## Development Commands

**Package Manager**: Must use `pnpm` (version 9+). The project enforces this with a preinstall hook.

- `pnpm install` - Install dependencies
- `pnpm dev` - Start dev server at http://localhost:4321
- `pnpm build` - Build static site (runs `astro check` then `astro build`)
- `pnpm preview` - Preview production build locally

**Node.js**: Requires version 20 or higher (CI uses Node 23.x)

**Running Scripts**: Use `pnpm tsx scripts/<script>.ts` to run utility scripts

## Code Style & Formatting

The project uses **Biome** for linting and formatting (not ESLint/Prettier):

- Run `pnpm biome check .` to check for issues
- Run `pnpm biome check --write .` to auto-fix
- Formatter: 2-space indentation, 80 character line width, single quotes, semicolons as needed
- All `recommended` rules enabled, plus `correctness.all` and `nursery.all` (except nodejs modules)
- Organize imports automatically

## Architecture

### Content Collections

Two main content collections defined in `src/content/config.ts`:

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
- **Compress**: HTML/JS compression (excluding images/SVG)
- **Critters**: Critical CSS inlining
- **Expressive Code**: Code syntax highlighting with dual themes (dark-plus, one-light)
- **MDX**: Enhanced Markdown support
- **TailwindCSS**: Via Vite plugin (Tailwind v4)

### Scripts

Located in `scripts/` (run with `pnpm tsx scripts/<name>.ts`):

- `postEnrichment.ts` - Uses AWS Bedrock (Claude v2) to generate subtitles and descriptions for blog posts that lack them (requires AWS credentials)
- `sendToOrama.ts` - Sends content to Orama Cloud for search indexing
- `search.ts` - Search-related utilities

## Deployment

Deployed via GitHub Actions (`.github/workflows/deploy.yml`):
- Triggers: Push to main, daily cron (00:01 UTC), manual dispatch
- Builds with Node 23.x and pnpm
- Requires system dependencies: `build-essential`, `libcairo2-dev`, `libpango1.0-dev`, `libjpeg-dev`, `libgif-dev`, `librsvg2-dev` (for Canvas)
- Deploys to GitHub Pages
- Purges Cloudflare CDN cache on successful deployment

## Important Notes

- Posts with filenames starting with `_` are excluded from the build (glob pattern filter)
- The site uses file-based routing - page URLs match the folder structure in `src/pages/`
- Speaking page rebuilds daily to ensure event dates are current
- Custom font (Atkinson Hyperlegible) used for OG image titles
- Site URL is `https://loige.co` - update `SITE_URL` in `src/consts.ts` if needed
- Canvas library requires native dependencies for OG image generation (libcairo2-dev, libpango1.0-dev, etc.)
