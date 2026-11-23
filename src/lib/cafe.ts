// Layout for the café shelf on /shelf. Everything is in cm; the components scale it with --s (px per cm).
import { BOXES, TIERS, type Cm } from '../data/games';
import { boxArt } from './boxart';
import type { ShelfGame } from './shelf';

export const CLEARANCE = 36;
/** inner width of each unit, in cm */
export const WIDE = 204;
export const NARROW = 80;

export const dims = (name: string, card = false): Cm => BOXES[name]?.size ?? (card ? [14, 10, 4] : [28, 28, 7]);
const sizeOf = (g: ShelfGame): Cm => dims(g.name, g.tags.includes('Card'));

const hash = (s: string): number => {
  let h = 2166136261;
  for (const c of s) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/** classes for the generated look: box tone, cover pattern, accent */
export const look = (name: string): string =>
  `pt${hash(name) % 6} pat${hash(`${name}#art`) % 8} pa${hash(`${name}#acc`) % 4}`;
export const toneClass = (name: string): string => `pt${hash(name) % 6}`;

/** hand-picked spine colour plus a readable text colour for it */
export const spineStyle = (name: string): string => {
  const hex = BOXES[name]?.spine;
  const m = hex?.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i)?.[1];
  if (!m) return '';
  const full = m.length === 3 ? [...m].map((c) => c + c).join('') : m;
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255) as [number, number, number];
  const light = 0.2126 * r + 0.7152 * g + 0.0722 * b > 0.55;
  return `--bx:#${full};--bt:${light ? '#1a1410' : '#fbf6ee'};`;
};

const faceOut = (name: string): boolean => {
  const art = boxArt(name);
  return BOXES[name]?.face === true || (art.cover !== undefined && art.spine === undefined);
};

export const tierOf = (name: string): number => {
  const t = BOXES[name]?.tier;
  return t ? TIERS.indexOf(t) : -1;
};
export const isTiered = (games: readonly ShelfGame[]): boolean => games.some((g) => tierOf(g.name) >= 0);

export type Group =
  | { type: 'face'; game: ShelfGame }
  | { type: 'spines'; games: ShelfGame[] }
  | { type: 'stack'; games: ShelfGame[] };
export interface Level {
  label: string;
  groups: Group[];
  /** cm left over at the end, so a plant can fill it */
  free: number;
}

const GAP = 2;
const groupWidth = (gr: Group): number => {
  if (gr.type === 'face') return sizeOf(gr.game)[0];
  if (gr.type === 'spines') return gr.games.reduce((a, g) => a + sizeOf(g)[2] + 0.3, 0);
  return Math.max(...gr.games.map((g) => sizeOf(g)[0]));
};

const PATTERN = ['face', 'spines', 'stack', 'face', 'spines', 'stack', 'spines'] as const;

/** Greedy café packing: a face-out box, a run of spines, a flat stack, repeat, until a level is full. */
const pack = (games: readonly ShelfGame[], innerW: number, label: string, seed: number): Level[] => {
  const levels: Level[] = [];
  let cur: Level = { label, groups: [], free: innerW };
  let k = seed;
  let i = 0;
  // stop a spine run or stack before a box that has to face out
  const run = (from: number, n: number): ShelfGame[] => {
    const out: ShelfGame[] = [];
    for (const g of games.slice(from, from + n)) {
      if (faceOut(g.name)) break;
      out.push(g);
    }
    return out;
  };
  while (i < games.length) {
    const first = games[i];
    if (!first) break;
    const p = faceOut(first.name) ? 'face' : (PATTERN[k++ % PATTERN.length] ?? 'face');
    let gr: Group;
    if (p === 'face') {
      gr = { type: 'face', game: first };
    } else if (p === 'spines') {
      gr = { type: 'spines', games: run(i, 2 + (hash(first.name) % 3)) };
    } else {
      const take: ShelfGame[] = [];
      let h = 0;
      for (const g of run(i, 2 + (hash(first.name) % 2))) {
        if (take.length && h + sizeOf(g)[2] > CLEARANCE - 4) break;
        take.push(g);
        h += sizeOf(g)[2];
      }
      gr = { type: 'stack', games: take.sort((a, b) => sizeOf(b)[0] - sizeOf(a)[0]) };
    }
    const w = groupWidth(gr);
    if (cur.groups.length && w > cur.free) {
      levels.push(cur);
      cur = { label: '', groups: [], free: innerW };
    }
    cur.groups.push(gr);
    cur.free -= w + GAP;
    i += gr.type === 'face' ? 1 : gr.games.length;
  }
  if (cur.groups.length || cur.label) levels.push(cur);
  return levels;
};

/** All levels for the collection. Tiered: one run of levels per tier, unranked games last. */
export const levelsFor = (games: readonly ShelfGame[], innerW: number): Level[] => {
  if (!isTiered(games)) return pack(games, innerW, '', 0);
  const runs = [...TIERS.map((label, t) => ({ label, t })), { label: 'Not ranked yet', t: -1 }];
  return runs.flatMap(({ label, t }, n) => {
    const list = games.filter((g) => tierOf(g.name) === t);
    if (!list.length) return t < 0 ? [] : [{ label, groups: [], free: innerW }];
    return pack(list, innerW, label, n);
  });
};

// ---- top of the unit: casual games left lying around ----

export interface TopBox {
  name: string;
  orient: 'face' | 'flat' | 'spine';
  /** stand a face-out box on its short edge */
  turn: boolean;
  tilt: number;
  dx: number;
}
export type TopGroup = { type: 'stack'; boxes: TopBox[] } | { type: 'stand'; box: TopBox } | { type: 'plant' };

/** small seeded PRNG, so every build lays the top out the same way */
const rng = (seed: number): (() => number) => {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const PLANT_CM = 12;
const TOP_GAP = 4;
const MAX_PILE = 4;
const topWidth = (gr: TopGroup): number => {
  if (gr.type === 'plant') return PLANT_CM;
  if (gr.type === 'stack') return Math.max(...gr.boxes.map((b) => dims(b.name)[0]));
  const [w, h, d] = dims(gr.box.name);
  return gr.box.orient === 'spine' ? d : gr.box.turn ? h : w;
};

/**
 * Casual boxes along the top of a unit `width` cm wide: short stacks and boxes standing up, shuffled, slightly crooked.
 * When they don't fit, big boxes stand on edge, then neighbours pile up (never past four), then the plant goes.
 */
export const topLayout = (names: readonly string[], seed: number, width: number): TopGroup[] => {
  const r = rng(seed);
  const tilt = (max: number): number => Math.round((r() * 2 - 1) * max * 10) / 10;
  const pool = [...names];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [pool[i], pool[j]] = [pool[j] as string, pool[i] as string];
  }
  const flatBox = (name: string, base = false): TopBox => ({ name, orient: 'flat', turn: false, tilt: base ? 0 : tilt(3), dx: base ? 0 : tilt(2) });
  // biggest at the bottom, listed top first
  const pile = (boxes: readonly TopBox[]): TopGroup => {
    const sorted = [...boxes].sort((a, b) => dims(a.name)[0] - dims(b.name)[0]);
    return { type: 'stack', boxes: sorted.map((b, i) => (i === sorted.length - 1 ? { ...b, tilt: 0, dx: 0 } : b)) };
  };
  const groups: TopGroup[] = [];
  while (pool.length) {
    const name = pool.shift() as string;
    if (dims(name)[0] <= 24 && (pool.length === 0 || r() < 0.4)) {
      groups.push({ type: 'stand', box: { name, orient: 'face', turn: r() < 0.5, tilt: tilt(4), dx: 0 } });
      continue;
    }
    groups.push(pile([name, ...pool.splice(0, Math.floor(r() * 2) + (pool.length ? 1 : 0))].map((n) => flatBox(n))));
  }
  const total = (withPlant: boolean): number =>
    groups.reduce((a, g) => a + topWidth(g) + TOP_GAP, withPlant ? PLANT_CM + TOP_GAP : 0);

  if (total(true) > width) {
    // stand big boxes on edge, out of their stacks
    const stood = groups.flatMap((g): TopGroup[] => {
      if (g.type !== 'stack') return [g];
      const big = g.boxes.filter((b) => dims(b.name)[0] > 24);
      const rest = g.boxes.filter((b) => dims(b.name)[0] <= 24);
      if (!big.length) return [g];
      const stands = big.map((b): TopGroup => ({ type: 'stand', box: { ...b, orient: 'spine', tilt: 0, dx: 0 } }));
      return [...stands, ...(rest.length ? [pile(rest)] : [])];
    });
    groups.splice(0, groups.length, ...stood);
  }
  const toFlat = (g: TopGroup): TopBox[] =>
    g.type === 'stack' ? g.boxes : g.type === 'stand' && g.box.orient === 'face' ? [flatBox(g.box.name)] : [];
  while (total(true) > width) {
    // merge the neighbouring pair with the fewest boxes, so piles stay even
    let best = -1;
    let bestN = MAX_PILE + 1;
    for (let i = 0; i < groups.length - 1; i++) {
      const a = toFlat(groups[i] as TopGroup);
      const b = toFlat(groups[i + 1] as TopGroup);
      if (!a.length || !b.length) continue;
      if (a.length + b.length < bestN) {
        best = i;
        bestN = a.length + b.length;
      }
    }
    if (best < 0) break;
    groups.splice(best, 2, pile([...toFlat(groups[best] as TopGroup), ...toFlat(groups[best + 1] as TopGroup)]));
  }
  if (total(true) <= width) groups.splice(1 + Math.floor(r() * Math.max(1, groups.length - 1)), 0, { type: 'plant' });
  return groups;
};
