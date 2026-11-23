export const SKINS = ['frontier', 'woodland', 'marquise'] as const;
export type Skin = (typeof SKINS)[number];

export interface SkinMeta {
  id: Skin;
  label: string;
  game: string;
  note: string;
  editionLabels: { toNight: string; toDay: string };
  ranks: readonly [string, string, string, string, string];
  shareLine: string;
}

export const SKIN_META: Record<Skin, SkinMeta> = {
  frontier: {
    id: 'frontier',
    label: 'Frontier',
    game: 'RDR',
    note: 'RDR · playing Nov 2026',
    editionLabels: { toNight: 'Light the lamp', toDay: 'Blow out the lamp' },
    ranks: ['Greenhorn', 'Drifter', 'Deputy', 'Sheriff', 'Legend'],
    shareLine: 'Out-typed the editor',
  },
  woodland: {
    id: 'woodland',
    label: 'Woodland',
    game: 'ROOT',
    note: 'ROOT · Woodland Alliance, first win',
    editionLabels: { toNight: 'Open the firefly jar', toDay: 'Close the jar' },
    ranks: ['Sapling', 'Sympathizer', 'Officer', 'Commander', 'Folk Hero'],
    shareLine: 'Outran the cats',
  },
  marquise: {
    id: 'marquise',
    label: 'Marquise',
    game: 'ROOT',
    note: 'ROOT · Marquise de Cat',
    editionLabels: { toNight: 'Wake the cat', toDay: 'Let the cat sleep' },
    ranks: ['Kitten', 'Recruit', 'Foreman', 'Overseer', 'Marquise'],
    shareLine: 'Overworked the keys',
  },
};

/** Section headings: the flavor word per skin is the main heading, the plain word sits beside it. */
export const SECTIONS = {
  projects: { plain: 'Projects', frontier: 'Dispatches', woodland: 'Clearings', marquise: 'Workshops' },
  experience: { plain: 'Experience', frontier: 'Employment', woodland: 'Bases', marquise: 'Sawmills' },
  typing: { plain: 'Typing Test', frontier: 'The Typewriter', woodland: 'The Revolt', marquise: 'Overwork' },
  chess: { plain: 'Chess', frontier: 'The Board', woodland: 'Officers', marquise: 'The Keep' },
  achievements: { plain: 'Achievements', frontier: 'Telegrams', woodland: 'Sympathy', marquise: 'Victory Points' },
  games: { plain: 'Board Games', frontier: 'The Parlour', woodland: 'The Clearing', marquise: 'The Mess Hall' },
} as const satisfies Record<string, { plain: string } & Record<Skin, string>>;

export type SectionKey = keyof typeof SECTIONS;
