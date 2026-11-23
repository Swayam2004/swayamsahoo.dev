// Physical facts about each game box, for the /shelf drawing. Plays and dates live in playlog.ts.

export const TIERS = ['Goated', 'Great', 'Good', 'Okay okay'] as const;
export type Tier = (typeof TIERS)[number];

/** Box size in cm: [width, height, depth]. Face-out shows w×h, a spine d×h, lying flat w×d. Rough real sizes. */
export type Cm = readonly [w: number, h: number, d: number];

export interface Box {
  size: Cm;
  /** always shelve this one face-out (a cover image alone also does this, unless a spine image exists) */
  face?: boolean;
  /** hex colour for the spine and flat sides, picked by hand from the real box */
  spine?: string;
  /** tier list placement; the shelf switches to tiers once any game has one */
  tier?: Tier;
}

/**
 * Box art: drop `src/assets/boxes/<slug>.(jpg|png|webp)` for the cover and `<slug>-spine.*` for the side.
 * The slug is the name in lowercase with runs of other characters turned into "-": "Heat: Pedal to the Metal" → heat-pedal-to-the-metal.
 */
export const BOXES: Record<string, Box> = {
  'Brass Birmingham': { size: [30, 30, 8] },
  'Terraforming Mars': { size: [30, 30, 7] },
  Root: { size: [37, 27, 7] },
  'Lords of Waterdeep': { size: [30, 30, 8] },
  Viticulture: { size: [30, 30, 8] },
  Istanbul: { size: [30, 30, 7] },
  Catan: { size: [30, 30, 7] },
  Archipelago: { size: [30, 30, 8] },
  'Heat: Pedal to the Metal': { size: [30, 30, 8] },
  Harmonies: { size: [25, 25, 7] },
  Gizmos: { size: [27, 27, 7] },
  Upstart: { size: [30, 30, 7] },
  'Camel Up': { size: [30, 30, 8] },
  'Res Arcana': { size: [20, 20, 6] },
  Codenames: { size: [23, 16, 6] },
  Avalon: { size: [18, 13, 4] },
  Daggerheart: { size: [30, 30, 8] },
  'River of Gold': { size: [30, 30, 7] },
  Splendor: { size: [25, 25, 7] },
  'Lost Cities': { size: [21, 15, 5] },
  'Point Salad': { size: [13, 9, 4] },
  'Knoq Out': { size: [14, 10, 4] },
  Kursi: { size: [13, 9, 4] },
  Parikrama: { size: [19, 13, 4] },
  Nayakas: { size: [26, 26, 7] },
  // casual
  'Game of Life': { size: [40, 27, 7] },
  'UNO Liar': { size: [14, 9, 3] },
  'UNO No Mercy': { size: [15, 10, 4] },
  '5 Alive': { size: [13, 9, 3] },
  TRIO: { size: [12, 12, 3] },
  'The Mind': { size: [11, 8, 2.5] },
  '7 UP': { size: [10, 7, 2.5] },
  UNO: { size: [14, 9, 3] },
  'UNO Flip': { size: [14, 9, 3] },
  'Monopoly Deal': { size: [14, 9.5, 3] },
};

/** Casual games played but never logged (no dates). Shown on top of the shelf and in Extras, never counted. */
export const CASUAL: readonly string[] = ['TRIO', 'The Mind', '7 UP', 'UNO', 'UNO Flip', 'Monopoly Deal'];
