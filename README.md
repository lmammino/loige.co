# Luciano Mammino - Cloud Architect & Full Stack Developer (Personal Blog)

[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)
[![Deploy](https://github.com/lmammino/loige.co/actions/workflows/deploy.yml/badge.svg)](https://github.com/lmammino/loige.co/actions/workflows/deploy.yml)
[![GitHub stars](https://img.shields.io/github/stars/lmammino/loige.co.svg)](https://github.com/lmammino/loige.co/stargazers)
[![GitHub license](https://img.shields.io/github/license/lmammino/loige.co.svg)](https://github.com/lmammino/loige.co/blob/main/LICENSE)

My blog, built with [Astro](https://astro.build). All open-source!

![The default](./public/loige-co.jpg)

If you want to run this locally (maybe you found a typo or an error in one of my articles and want to fix it), you can follow these instructions:

## 1. Clone the repo

```bash
git clone https://github.com/lmammino/loige.co.git
```

## 2. Install the toolchain with mise (recommended)

This project uses [mise](https://mise.jdx.dev) to install and pin the exact
versions of Node.js, pnpm and [lefthook](https://lefthook.dev) (git hooks),
locked in [`mise.lock`](./mise.lock):

```bash
mise install
```

<details>
<summary>Manual alternative (without mise)</summary>

You need Node.js `22.12.0` or higher (`26` is what mise pins) and `pnpm` `11`:

```bash
node -v
pnpm -v
```

To install pnpm, check out the [pnpm official installation instructions](https://pnpm.io/installation)
(recent Node.js versions no longer bundle corepack).
Note that without mise you won't get lefthook, so the pre-commit hooks
(formatting/linting) won't run locally — CI will still enforce them.

</details>

## 3. Install dependencies

```bash
pnpm install
```

This also installs the git hooks (via lefthook), which auto-format and lint
staged files on commit.

## 4. Run the dev server

```bash
mise run dev # or: pnpm dev
```

The website should now be accessible at [http://localhost:4321](http://localhost:4321)

## 5. Build the static website

```bash
mise run build # or: pnpm build
```

The static website will be available in the `./dist` folder.

All the project commands are defined as mise tasks (the same ones CI runs) —
list them with:

```bash
mise tasks
```

The main ones: `dev`, `build`, `preview`, `check` (astro check), `lint`
(Biome), `lint:fix`, `format:check` / `format` (Prettier), and `ci` (what the
CI pipeline runs).

## 6. Deploy the website

The website is deployed through [GitHub Actions](./.github/workflows/deploy.yml), so if you want to suggest some updates, open a PR and I will review it as soon as possible. Once merged into `main`, a deployment will kick in automatically.

## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/loige.co/issues).

## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
