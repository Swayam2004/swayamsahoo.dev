import type { Skin } from './skins';

export interface Telegram {
  id: string;
  title: string;
  hint: string;
  points: number;
  icon: string;
  /** title and hint stay masked until earned */
  hidden?: boolean;
}

export const TELEGRAMS: readonly Telegram[] = [
  { id: 'opened-paper', title: 'Opened the paper', hint: 'Visit the site', points: 10, icon: '♟' },
  { id: 'read-dispatches', title: 'Read the Dispatches', hint: 'Open three project links', points: 30, icon: '♞' },
  { id: 'pulled-record', title: 'Pulled the record', hint: 'Open the resume', points: 20, icon: '✎' },
  { id: 'sat-typewriter', title: 'Sat at the typewriter', hint: 'Finish a typing test', points: 30, icon: '⌨' },
  { id: 'beat-editor', title: 'Beat the editor', hint: 'Type faster than 104 wpm', points: 100, icon: '★' },
  { id: 'visited-parlour', title: 'Visited the parlour', hint: 'Open the board-game shelf', points: 20, icon: '♜' },
  { id: 'lit-lamp', title: 'Lit the lamp', hint: 'Switch the edition', points: 20, icon: '☾' },
  { id: 'changed-coats', title: 'Changed coats', hint: 'Switch the skin', points: 30, icon: '❦' },
  { id: 'found-wire', title: 'Found the wire', hint: 'Open the command list', points: 20, icon: '⌘' },
  { id: 'said-name', title: 'Said the name', hint: 'Type a certain name anywhere', points: 50, icon: '✦', hidden: true },
];

export const TOTAL_POINTS = TELEGRAMS.reduce((sum, t) => sum + t.points, 0);

/** Points needed to reach levels 1–5. */
export const LEVELS = [0, 60, 130, 210, 300] as const;

export const TOAST_WORD: Record<Skin, string> = {
  frontier: 'Telegram',
  woodland: 'Sympathy',
  marquise: 'Victory point',
};
