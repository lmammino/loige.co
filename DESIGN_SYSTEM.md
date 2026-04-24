# loige.co design system

This document describes the standardized design language of loige.co after
the 2026-04 design system pass. It is the source of truth for visual and
interaction decisions across the site.

The system is implemented in `src/styles/global.css` (tokens) and in the
components under `src/components/`. No separate build step or tooling is
required — every token is a CSS custom property exposed to Tailwind v4 via
the `@theme` directive.

## Principles

1. **Readability first.** Long-form posts are the primary content. Every
   decision about typography, measure, and contrast defers to the reading
   experience.
2. **Tokens over ad-hoc values.** If a color, space, or motion value shows
   up twice, it becomes a token. Arbitrary `[13px]`-style values are reserved
   for genuinely one-off layout hacks.
3. **Mobile-first.** Every component works at 360px; breakpoint prefixes
   (`sm:`, `md:`, `lg:`, `xl:`) add capabilities as screens grow.
4. **Accessible by default.** WCAG 2.1 AA is the floor: ≥4.5:1 body text
   contrast, ≥3:1 UI contrast, visible keyboard focus on every interactive
   element, ≥44px tap targets for primary actions, and `prefers-reduced-motion`
   honoured.
5. **Two themes, one system.** `one-light` (default) and `dark-plus` share
   the same token names. Switching the `data-theme` attribute on `<html>`
   swaps the palette wholesale.

## Tokens

All tokens live in `src/styles/global.css`. Tailwind v4 picks them up via
`@theme`, so `--color-primary-500` becomes the utility `bg-primary-500`,
`text-primary-500`, `border-primary-500`, etc.

### Color scales

Five scales, each running `100` (lightest) → `900` (darkest) in the light
theme, inverted for dark. `500` is the canonical value of each.

| Scale       | `500` (light) | `500` (dark) | Role                                    |
| ----------- | ------------- | ------------ | --------------------------------------- |
| `bg`        | `#f7f7f7`     | `#1f1e1e`    | Page + surface backgrounds              |
| `text`      | `#151828`     | `#fbfbfb`    | Foreground text                         |
| `primary`   | `#22158a`     | `#6aaefc`    | Brand indigo — links, key actions       |
| `secondary` | `#8796b0`     | `#39899f`    | Supporting slate — secondary actions    |
| `accent`    | `#48ea5b`     | `#a8f874`    | Signature lime — emphasis, active state |

Use lighter shades (`100`-`300`) for surfaces and hover washes, middle shades
(`400`-`600`) for fills, darker shades (`700`-`900`) for text on lighter
surfaces and emphasis.

### Semantic aliases

Aliases point at specific scale stops and are the preferred way to express
intent (use `text-link` instead of `text-primary-700` when you literally mean
"link color").

| Token              | Purpose                                                    |
| ------------------ | ---------------------------------------------------------- |
| `link`             | Inline link color                                          |
| `link-hover`       | Link hover color                                           |
| `focus`            | Focus ring color (keyboard users)                          |
| `love`             | The heart in the footer — rose in both themes              |
| `success`          | Positive status (currently unused, reserved)               |
| `warning`          | Cautionary status (currently unused, reserved)             |
| `danger`           | Destructive or error status (currently unused, reserved)   |
| `display-bg`       | "Display" panel background — stable across themes          |
| `display-border`   | "Display" panel border                                     |
| `display-fg`       | "Display" foreground (e.g. now-playing song title)         |
| `display-muted`    | "Display" secondary foreground (e.g. artist / album)       |

The `display-*` tokens power the music widget in the hero and any future
panel that should read as a little hardware screen. They are intentionally
the same in both themes, because the panel is a decorative UI element whose
identity shouldn't flip with the page theme.

### Typography

Fonts are self-hosted:

- `--font-sans`: Atkinson (regular + bold), with Avenir / Montserrat / Corbel
  fallbacks for legacy systems.
- `--font-serif`: Charter / Bitstream Charter / Cambria.
- `--font-mono`: ui-monospace / Cascadia Code / Source Code Pro.

Body type inherits Tailwind's defaults (`text-xs` through `text-3xl`). For
hero- and section-scale headings, use the fluid display tokens:

| Token            | Min (≤360px) | Max (≥1280px) | Use for                            |
| ---------------- | ------------ | ------------- | ---------------------------------- |
| `text-display-sm`| 28px         | 36px          | Tertiary page titles               |
| `text-display-md`| 36px         | 52px          | Secondary page titles, post titles |
| `text-display-lg`| 44px         | 72px          | Primary page titles                |
| `text-display-xl`| 48px         | 96px          | The homepage hero only             |

Line heights: `leading-tight` (1.2) for display, `leading-snug` (1.35) for
subheads, `leading-normal` (1.55) for body, `leading-relaxed` (1.65) is the
body default set on `<body>`, `leading-loose` (1.8) for airy intros.

### Layout / measure

| Token                  | Value      | Purpose                                         |
| ---------------------- | ---------- | ----------------------------------------------- |
| `--container-reading`  | 576px      | Narrow reading column (intro blocks)            |
| `--container-prose`    | 672px      | Default prose measure — ~65-70ch at body size   |
| `--breakpoint-xl`      | 1280px     | Max page width (Tailwind default, referenced    |
|                        |            | as `max-w-(--breakpoint-xl)`)                    |

Utility classes `measure` and `measure-narrow` apply the prose and reading
widths respectively, so `<article class="measure mx-auto">` sets up a proper
column without memorising pixel values.

### Motion

| Token              | Value                               | Use for                              |
| ------------------ | ----------------------------------- | ------------------------------------ |
| `--duration-fast`  | 120ms                               | Color transitions, small hovers      |
| `--duration-base`  | 200ms                               | Default transitions, card lifts      |
| `--duration-slow`  | 320ms                               | Image reveals, parallax settle       |
| `--ease-standard`  | `cubic-bezier(0.2, 0, 0, 1)`        | Default easing                       |
| `--ease-emphasized`| `cubic-bezier(0.3, 0, 0, 1)`        | For emphasis moments                 |

All animations automatically reduce to near-zero under
`prefers-reduced-motion: reduce`.

### Radii & elevation

Radii use Tailwind defaults: `rounded-sm` (2px) for pills, `rounded-md` (6px)
for buttons, `rounded-lg` (8px) for cards, `rounded-xl` (12px) for images,
`rounded-full` for chips and avatars.

Shadows use Tailwind defaults: `shadow-md` (resting card), `shadow-lg`
(hover / active card), `shadow-xl` (hero-sized imagery).

## Components

### Button

`src/components/Button.astro`

```astro
<Button variant="primary" size="md" href="/blog">Read the blog</Button>
<Button variant="secondary" size="sm" href="/rss">RSS</Button>
<Button variant="ghost" href="#">Cancel</Button>
<Button isDisabled>Save</Button>
```

| Prop         | Type                              | Default     | Notes                                  |
| ------------ | --------------------------------- | ----------- | -------------------------------------- |
| `href`       | `string`                          | —           | Renders as `<a>` unless `isDisabled`   |
| `label`      | `string`                          | —           | Or pass children via slot              |
| `variant`    | `'primary' \| 'secondary' \| 'ghost'` | `'primary'` | Visual weight                      |
| `size`       | `'sm' \| 'md' \| 'lg'`            | `'md'`      | Type size + padding + tap target       |
| `isDisabled` | `boolean`                         | `false`     | Renders as non-interactive `<span>`    |
| `isPrimary`  | `boolean`                         | —           | **Deprecated.** Use `variant` instead. |
| `class`      | `string`                          | —           | Appended to composed classes           |

**States:** idle, hover (darker fill), active (darkest fill), focus-visible
(global ring), disabled (washed out, `cursor-not-allowed`).

**Tap targets:** `sm` = 40px min, `md` = 44px min, `lg` = 52px min.

### Prose

`src/components/Prose.astro`

```astro
<Prose>
  <p>Long-form content goes here.</p>
</Prose>

<!-- opt out of the measured column -->
<Prose wide>
  <p>I really want to be full-bleed.</p>
</Prose>
```

By default, Prose wraps children in a measured column
(`max-width: var(--container-prose)`, centered). The first paragraph renders
slightly larger as a lede. Links get a 2-pixel underline with offset-4,
animating on hover. Inline code sits in a subtle pill; block code uses
`prose-pre` styling from `@tailwindcss/typography`.

### BlogCard

`src/components/BlogCard.astro`

```astro
<BlogCard post={post} isBig={index === 0} />
```

16:9 cover image, title, 3-line description clamp, publication date.
`isBig` promotes the card to span 2 columns on `md+` screens. On hover: the
card lifts half a pixel, image scales 2%, title shifts to `primary-600`,
ring appears.

### ProjectCard

`src/components/ProjectCard.astro`

Same general API as BlogCard but takes raw `title`/`href`/`image`/`imageAlt`.
Images are grayscale (85%) at rest and color on hover. Opens in a new tab.

### Header

Sticky top nav. Translucent `bg-bg-500/95` with backdrop blur so content
peeks through when scrolled. Mobile: hamburger toggles a stacked menu.
`md+`: inline menu. Active section is underlined with `accent-500`.

### Footer

Four-column footer on `md+`, stacked on mobile. Dark radial gradient
anchored to `primary-700`/`primary-900`. Social icons are 16×16 `currentColor`
SVGs wrapped in text-and-icon anchors for legibility.

### TagsList

Pill-shaped links with a post-count badge. Each pill is a full `<a>`
wrapped in `<li>`. Hover swaps the surface and brightens the count badge.

### ThemeSwitcher

Icon button that toggles `data-theme` on `<html>`. Uses a Moon (active in
dark mode) and Sun (active in light mode) SVG. The `text-accent-700` /
`text-text-400` colouring keeps both icons legible across themes.

## Patterns

### Page container

Nearly every top-level page section uses:

```astro
<div class="bg-bg-500">
  <div class="mx-auto max-w-(--breakpoint-xl) px-8 py-16">
    <!-- content -->
  </div>
</div>
```

This gives a consistent 1280px max, 32px horizontal padding, and 64px
vertical rhythm. Vary `py-*` (typically `py-8`, `py-16`, or `py-24`) based
on section importance.

### Prose inside a page

Default to `<Prose>` without any `max-w-*` override — it handles its own
measure. Only pass `wide` if the surrounding layout already constrains
width intentionally.

### Card grids

```astro
<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
  {posts.map((post, i) => <BlogCard post={post} isBig={i === 0} />)}
</div>
```

Three breakpoints: 1 column on mobile, 2 columns at `md` (768px), 3 columns
at `lg` (1024px). Gap grows from 16px to 32px on `lg`.

### Focus-visible rings

There's a global `:focus-visible { outline: 2px solid var(--color-focus); }`
rule. Components do **not** need to add their own focus styles unless they
want something fancier. Never use `focus:outline-none` without providing a
replacement.

## Accessibility checklist

Every component in this system meets:

- Body text contrast ≥ 4.5:1 (WCAG AA)
- Large text / UI contrast ≥ 3:1
- Visible keyboard focus on every `<a>`, `<button>`, and input
- Tap targets ≥ 44×44 for primary actions (buttons, navigation)
- All icon-only buttons have `<span class="sr-only">` labels
- All images have meaningful `alt` or empty `alt=""` when decorative
- Animations respect `prefers-reduced-motion`

## Migration notes

Components still using raw Tailwind palette colors (`zinc-*`, `lime-*`,
`slate-*`, `yellow-*`, `red-*`) should migrate to token-based colors:

| Old                      | New                          |
| ------------------------ | ---------------------------- |
| `bg-zinc-900`            | `bg-display-bg`              |
| `border-zinc-700`        | `border-display-border`      |
| `text-lime-500`          | `text-display-fg`            |
| `text-lime-600`          | `text-display-muted`         |
| `text-slate-400`         | `text-text-400`              |
| `text-yellow-500`        | `text-accent-700`            |
| `text-red-400`           | `text-love`                  |

The `Button` component's `isPrimary` prop still works but emits nothing to
the DOM — prefer `variant="primary"` or `variant="secondary"` in new code.

## Roadmap

Open items that would extend the system further but are out of scope for
this pass:

1. Replace Disqus with a static-friendly comment solution (perf + a11y).
2. Build a proper Storybook / Ladle pattern library so components can be
   exercised in isolation.
3. Move away from per-component inline colour classes entirely in favour
   of semantic `role="…"` style utilities (`bg-surface-primary`,
   `bg-surface-secondary`, etc.).
4. Audit speaking page parallax images and bounds under
   `prefers-reduced-motion`.
