import { SITE, SOCIALS } from './site';

export type CommandAction =
  | { kind: 'go'; href: string; newTab?: boolean }
  | { kind: 'copy-email' }
  | { kind: 'edition' }
  | { kind: 'skin' }
  | { kind: 'reset' };

export interface Command {
  id: string;
  label: string;
  hint: string;
  /** single-key shortcut on desktop */
  key?: string;
  action: CommandAction;
}

export const COMMANDS: readonly Command[] = [
  { id: 'home', label: 'Home', hint: 'front page', key: 'h', action: { kind: 'go', href: '/' } },
  { id: 'projects', label: 'Projects', hint: 'every project', key: 'p', action: { kind: 'go', href: '/projects/' } },
  { id: 'resume', label: 'Resume', hint: 'opens the PDF in a new tab', key: 'r', action: { kind: 'go', href: SITE.resume, newTab: true } },
  { id: 'shelf', label: 'Board games', hint: 'the shelf', key: 's', action: { kind: 'go', href: '/shelf/' } },
  { id: 'typing', label: 'Typing test', hint: 'beat 104 wpm', key: 't', action: { kind: 'go', href: '/typing/' } },
  { id: 'email', label: 'Copy email', hint: SITE.email, key: 'c', action: { kind: 'copy-email' } },
  { id: 'github', label: 'GitHub', hint: 'Swayam2004', action: { kind: 'go', href: SOCIALS.github.href } },
  { id: 'linkedin', label: 'LinkedIn', hint: 'swayamsahoo1223', action: { kind: 'go', href: SOCIALS.linkedin.href } },
  { id: 'lichess', label: 'Lichess', hint: 'SwayamSahoo', action: { kind: 'go', href: SOCIALS.lichess.href } },
  { id: 'chesscom', label: 'Chess.com', hint: 'swayam1288', action: { kind: 'go', href: SOCIALS.chesscom.href } },
  { id: 'edition', label: 'Toggle day / night', hint: 'switch the edition', key: 'e', action: { kind: 'edition' } },
  { id: 'skin', label: 'Switch skin', hint: 'next skin', key: 'k', action: { kind: 'skin' } },
  { id: 'reset', label: 'Reset progress', hint: 'clear Telegrams', action: { kind: 'reset' } },
];
