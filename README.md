# Phani Gopaluni — Portfolio

Live site: https://gopaluniphani.github.io/

This repository contains the portfolio application source, runtime assets, and GitHub Pages build configuration.

## Local development

```sh
npm ci
npm run dev
```

## Build and preview

```sh
npm run lint
npm run build
python3 -m http.server 3001 --directory out
```

The static website is generated in `out/`. Generated output and dependencies stay local and are ignored by Git. Source, fonts, optimized artwork, and build configuration are versioned here.

## Deployment

Pushes to `main` build the site and deploy only `out/` to GitHub Pages. The workflow can also be started manually in Actions. The source repository is public, but planning notes, design references, and agent instructions are excluded.
