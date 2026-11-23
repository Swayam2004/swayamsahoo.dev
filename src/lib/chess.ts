import { SOCIALS } from '../data/site';

export interface ChessStat {
  value: number;
  label: string;
  href: string;
}

const UA = { 'User-Agent': 'swayamsahoo.dev build (static site; ratings snapshot)' };
const LICHESS_USER = 'SwayamSahoo';
const CHESSCOM_USER = 'swayam1288';

/** Last known values, used when an API is unreachable at build time. */
const FALLBACK = { fide: 1638, lichessRapidPeak: 1894, lichessBlitzPeak: 1971, chesscomRapidPeak: 1860 } as const;

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: UA, signal: AbortSignal.timeout(8000) });
  if (!res.ok) throw new Error(`${url} → ${res.status}`);
  return res.json();
}

const num = (v: unknown): number | undefined => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);
const at = (v: unknown, ...path: string[]): unknown =>
  path.reduce<unknown>((acc, k) => (acc && typeof acc === 'object' ? (acc as Record<string, unknown>)[k] : undefined), v);

async function lichessPeak(perf: 'rapid' | 'blitz'): Promise<number | undefined> {
  try {
    return num(at(await getJson(`https://lichess.org/api/user/${LICHESS_USER}/perf/${perf}`), 'stat', 'highest', 'int'));
  } catch {
    return undefined;
  }
}

async function chesscomRapidPeak(): Promise<number | undefined> {
  try {
    return num(at(await getJson(`https://api.chess.com/pub/player/${CHESSCOM_USER}/stats`), 'chess_rapid', 'best', 'rating'));
  } catch {
    return undefined;
  }
}

export async function getChessStats(): Promise<ChessStat[]> {
  const [rapid, blitz, ccRapid] = await Promise.all([lichessPeak('rapid'), lichessPeak('blitz'), chesscomRapidPeak()]);
  return [
    { value: FALLBACK.fide, label: 'FIDE rating', href: 'https://ratings.fide.com' },
    { value: rapid ?? FALLBACK.lichessRapidPeak, label: 'Lichess rapid peak', href: SOCIALS.lichess.href },
    { value: blitz ?? FALLBACK.lichessBlitzPeak, label: 'Lichess blitz peak', href: SOCIALS.lichess.href },
    { value: ccRapid ?? FALLBACK.chesscomRapidPeak, label: 'Chess.com rapid peak', href: SOCIALS.chesscom.href },
  ];
}
