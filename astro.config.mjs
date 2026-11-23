// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

const google = fontProviders.google();

/**
 * @param {string} name
 * @param {string} cssVariable
 * @param {[number, ...number[]]} weights
 * @param {[('normal'|'italic'), ...('normal'|'italic')[]]} [styles]
 * @param {string} [fallback]
 * @param {[string, ...string[]]} [subsets]
 */
const font = (name, cssVariable, weights, styles = ['normal'], fallback = 'serif', subsets = ['latin', 'latin-ext']) => ({
  provider: google,
  name,
  cssVariable,
  weights,
  styles,
  subsets,
  fallbacks: [fallback],
});

export default defineConfig({
  // canonical + Open Graph URLs; set SITE_URL to the workers.dev URL until the domain is live
  site: process.env.SITE_URL ?? 'https://swayamsahoo.dev',
  compressHTML: true,
  fonts: [
    // frontier
    // these three ship latin only; the macron is drawn in CSS, so latin-ext isn't needed
    font('UnifrakturMaguntia', '--f-frontier-black', [400], undefined, undefined, ['latin']),
    font('IM Fell English SC', '--f-frontier-sc', [400], undefined, undefined, ['latin']),
    font('IM Fell English', '--f-frontier-fell', [400], ['normal', 'italic'], undefined, ['latin']),
    font('Old Standard TT', '--f-frontier-serif', [400, 700], ['normal', 'italic']),
    // ROOT skins
    font('Grenze Gotisch', '--f-woodland-black', [600]),
    font('Fredericka the Great', '--f-marquise-black', [400]),
    font('Alegreya SC', '--f-root-sc', [500, 700]),
    font('Alegreya', '--f-root-serif', [400, 600], ['normal', 'italic']),
    // shared
    font('Courier Prime', '--f-mono', [400, 700], ['normal'], 'monospace'),
  ],
});
