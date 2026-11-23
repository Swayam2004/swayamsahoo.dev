# swayamsahoo.dev

Personal site of Swayam Sahoo, printed as a newspaper: *The Ātman Times*. The look follows whatever game I'm playing (skins), with a small game layer on top.

Astro 7 + TypeScript (strict), static output, deployed to Cloudflare Workers static assets.

```sh
nvm use          # Node 22.23.5 (.nvmrc)
npm install
npm run dev      # local dev server
npm run build    # astro check && astro build → dist/
```

## Deploy (Cloudflare Workers static assets)

```sh
npx wrangler login   # once, opens the browser
npm run deploy
```

The Worker serves `swayamsahoo.dev` through `routes` in `wrangler.jsonc`. The workers.dev address is off. Canonical, Open Graph, robots and sitemap URLs all default to `https://swayamsahoo.dev`. To build for another origin, set `SITE_URL`.

Glossary of site terms: [CONTEXT.md](CONTEXT.md).
