// Generated from the private play log (venues removed). Edit by hand from here on.
export type Tag = 'Card' | 'RPG' | 'Made in India';

export interface Session {
  date: string;
  game: string;
  hosted: boolean;
  tags: readonly Tag[];
  /** very casual games: shown, not counted */
  extra: boolean;
  /** expansions or modules used */
  note?: string;
}

export const PLAY_LOG: readonly Session[] = [
  {date: "2026-05-24", game: "River of Gold", hosted: false, tags: [], extra: false},
  {date: "2026-05-31", game: "Heat: Pedal to the Metal", hosted: false, tags: [], extra: false},
  {date: "2026-07-10", game: "Splendor", hosted: false, tags: ["Card"], extra: false},
  {date: "2026-07-10", game: "Codenames", hosted: false, tags: [], extra: false},
  {date: "2026-07-10", game: "Avalon", hosted: false, tags: [], extra: false},
  {date: "2026-07-17", game: "Lost Cities", hosted: false, tags: ["Card"], extra: false},
  {date: "2026-07-17", game: "Splendor", hosted: false, tags: ["Card"], extra: false},
  {date: "2026-07-26", game: "Viticulture", hosted: false, tags: [], extra: false},
  {date: "2026-08-28", game: "Terraforming Mars", hosted: false, tags: [], extra: false},
  {date: "2026-08-30", game: "Lords of Waterdeep", hosted: false, tags: [], extra: false},
  {date: "2026-09-06", game: "Istanbul", hosted: false, tags: [], extra: false},
  {date: "2026-09-06", game: "Point Salad", hosted: false, tags: ["Card"], extra: false},
  {date: "2026-09-06", game: "Knoq Out", hosted: false, tags: ["Card", "Made in India"], extra: false},
  {date: "2026-09-14", game: "Upstart", hosted: false, tags: [], extra: false},
  {date: "2026-09-14", game: "Game of Life", hosted: false, tags: [], extra: true},
  {date: "2026-09-14", game: "UNO Liar", hosted: false, tags: [], extra: true},
  {date: "2026-09-14", game: "5 Alive", hosted: false, tags: [], extra: true},
  {date: "2026-09-20", game: "Daggerheart", hosted: false, tags: ["RPG"], extra: false},
  {date: "2026-09-25", game: "Archipelago", hosted: false, tags: [], extra: false},
  {date: "2026-09-26", game: "Archipelago", hosted: false, tags: [], extra: false},
  {date: "2026-09-27", game: "Gizmos", hosted: false, tags: [], extra: false},
  {date: "2026-09-27", game: "Harmonies", hosted: false, tags: [], extra: false},
  {date: "2026-10-01", game: "Catan", hosted: false, tags: [], extra: false},
  {date: "2026-10-04", game: "Lords of Waterdeep", hosted: true, tags: [], extra: false},
  {date: "2026-10-11", game: "Catan", hosted: true, tags: [], extra: false},
  {date: "2026-10-12", game: "5 Alive", hosted: true, tags: [], extra: true},
  {date: "2026-10-14", game: "Catan", hosted: false, tags: [], extra: false},
  {date: "2026-10-18", game: "Res Arcana", hosted: false, tags: [], extra: false},
  {date: "2026-10-18", game: "Camel Up", hosted: false, tags: [], extra: false},
  {date: "2026-10-21", game: "Kursi", hosted: false, tags: ["Card", "Made in India"], extra: false},
  {date: "2026-10-21", game: "Parikrama", hosted: false, tags: ["Card", "Made in India"], extra: false},
  {date: "2026-10-22", game: "Nayakas", hosted: false, tags: ["Made in India"], extra: false},
  {date: "2026-10-22", game: "Lords of Waterdeep", hosted: true, tags: [], extra: false},
  {date: "2026-10-28", game: "Root", hosted: false, tags: [], extra: false},
  {date: "2026-10-28", game: "Brass Birmingham", hosted: false, tags: [], extra: false},
  {date: "2026-11-06", game: "Root", hosted: false, tags: [], extra: false},
  {date: "2026-11-07", game: "UNO No Mercy", hosted: false, tags: [], extra: true},
  {date: "2026-11-15", game: "Heat: Pedal to the Metal", hosted: false, tags: [], extra: false, note: "Garage, Road, Weather Modules"},
  {date: "2026-11-22", game: "Istanbul", hosted: true, tags: [], extra: false, note: "Coffee Expansion"},
];
