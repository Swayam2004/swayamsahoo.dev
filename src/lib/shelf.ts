import { CASUAL } from '../data/games';
import { PLAY_LOG, type Session, type Tag } from '../data/playlog';

export interface ShelfGame {
  name: string;
  plays: number;
  hosted: number;
  lastPlayed: string;
  firstPlayed: string;
  tags: readonly Tag[];
  notes: readonly string[];
}

function group(sessions: readonly Session[]): ShelfGame[] {
  const map = new Map<string, Session[]>();
  for (const s of sessions) map.set(s.game, [...(map.get(s.game) ?? []), s]);
  return [...map.entries()]
    .map(([name, list]) => {
      const dates = list.map((s) => s.date).sort();
      return {
        name,
        plays: list.length,
        hosted: list.filter((s) => s.hosted).length,
        firstPlayed: dates[0] ?? '',
        lastPlayed: dates[dates.length - 1] ?? '',
        tags: [...new Set(list.flatMap((s) => s.tags))],
        notes: [...new Set(list.flatMap((s) => (s.note ? [s.note] : [])))],
      };
    })
    .sort((a, b) => b.plays - a.plays || b.lastPlayed.localeCompare(a.lastPlayed));
}

const counted = PLAY_LOG.filter((s) => !s.extra);
const extras = group(PLAY_LOG.filter((s) => s.extra));

export const SHELF = {
  games: group(counted),
  extras,
  /** played but never logged; no dates, never counted */
  casual: CASUAL.filter((name) => !extras.some((g) => g.name === name)),
  stats: {
    games: new Set(counted.map((s) => s.game)).size,
    sessions: counted.length,
    hosted: counted.filter((s) => s.hosted).length,
    since: [...counted.map((s) => s.date)].sort()[0] ?? '',
  },
} as const;

export const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
