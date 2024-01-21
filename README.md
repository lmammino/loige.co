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

## 2. Make sure you have up-to-date versions of Node.js and pnpm

Expected Node.js version: `20` or higher and `pnpm` version `8` or higher.

```bash
node -v
pnpm -v
```

If you have `corepack` installed, you can easily enable `pnpm` with:

```bash
corepack enable
corepack prepare pnpm@8 --activate
```

Alternatively, check out the [pnpm official installation instructions](https://pnpm.io/installation).

## 3. Install dependencies

```bash
pnpm install
```

## 4. Run the dev server

```bash
pnpm dev
```

The website should now be accessible at [http://localhost:4321](http://localhost:4321)

## 5. Build the static website

```bash
pnpm build
```

The static website will be available in the `./dist` folder.

## 6. Deploy the website

The website is deployed through [GitHub Actions](./.github/workflows/deploy.yml), so if you want to suggest some updates, open a PR and I will review it as soon as possible. Once merged into `main`, a deployment will kick in automatically.

## Contributing

Everyone is very welcome to contribute to this project.
You can contribute just by submitting bugs or suggesting improvements by
[opening an issue on GitHub](https://github.com/lmammino/loige.co/issues).

## License

Licensed under [MIT License](LICENSE). © Luciano Mammino.
