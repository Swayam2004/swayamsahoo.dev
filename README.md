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

The Worker serves `swayamsahoo.dev` as a Custom Domain (`routes` in `wrangler.jsonc`), which is also the default `site` for canonical, Open Graph, robots and sitemap URLs. Set `SITE_URL` only to build for a different origin.

Glossary of site terms: [CONTEXT.md](CONTEXT.md).
