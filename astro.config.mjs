// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

const google = fontProviders.google();

/**
 * @param {string} name
 * @param {string} cssVariable
 * @param {[number, ...number[]]} weights
 * @param {[('normal'|'italic'), ...('normal'|'italic')[]]} [styles]
 * @param {string} [fallback]
 */
const font = (name, cssVariable, weights, styles = ['normal'], fallback = 'serif') => ({
  provider: google,
  name,
  cssVariable,
  weights,
  styles,
  /** @type {[string, ...string[]]} */
  subsets: ['latin', 'latin-ext'],
  fallbacks: [fallback],
});

export default defineConfig({
  site: 'https://swayamsahoo.dev',
  compressHTML: true,
  fonts: [
    // frontier
    font('UnifrakturMaguntia', '--f-frontier-black', [400]),
    font('IM Fell English SC', '--f-frontier-sc', [400]),
    font('IM Fell English', '--f-frontier-fell', [400], ['normal', 'italic']),
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
