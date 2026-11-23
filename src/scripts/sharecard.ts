import { SKIN_META, type Skin } from '../data/skins';

export interface CardData {
  wpm: number;
  accuracy: number;
  seconds: number;
  device: 'desktop' | 'touch';
  date: string;
  skin: Skin;
  night: boolean;
  record: number;
}

const W = 1200;
const H = 630;

/** Reads the live skin tokens so the card matches whatever the visitor is looking at. */
function tokens(): Record<'paper' | 'ink' | 'ink2' | 'muted' | 'red' | 'rule' | 'soft' | 'black' | 'sc' | 'fell' | 'mono', string> {
  const cs = getComputedStyle(document.documentElement);
  const v = (name: string, fallback: string): string => cs.getPropertyValue(name).trim() || fallback;
  return {
    paper: v('--paper', '#ece0c5'),
    ink: v('--ink', '#22170d'),
    ink2: v('--ink2', '#4a3726'),
    muted: v('--muted', '#7a6347'),
    red: v('--red', '#8e1b16'),
    rule: v('--rule', '#2a1c10'),
    soft: v('--soft', '#bfa77f'),
    black: v('--black', 'serif'),
    sc: v('--sc', 'serif'),
    fell: v('--fell', 'serif'),
    mono: v('--mono', 'monospace'),
  };
}

function emblem(ctx: CanvasRenderingContext2D, skin: Skin, x: number, y: number, size: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(size / 24, size / 24);
  ctx.beginPath();
  if (skin === 'frontier') {
    ctx.fill(new Path2D('M12 2l2.6 6.2 6.6.5-5 4.4 1.5 6.5L12 16.2 6.3 19.6l1.5-6.5-5-4.4 6.6-.5z'));
  } else if (skin === 'woodland') {
    ctx.scale(1.5, 1.5);
    ctx.fill(new Path2D('M8 1L3 8h3l-3 4h4v3h2v-3h4l-3-4h3z'));
  } else {
    ctx.scale(1.5, 1.5);
    ctx.fill(new Path2D('M4.6 11a3.4 3 0 1 0 6.8 0a3.4 3 0 1 0-6.8 0M1.6 7a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0M4.4 3.8a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0M8.4 3.8a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0M11.2 7a1.6 1.6 0 1 0 3.2 0a1.6 1.6 0 1 0-3.2 0'));
  }
  ctx.restore();
}

let generation = 0;

export async function drawShareCard(canvas: HTMLCanvasElement, d: CardData): Promise<void> {
  const draw = ++generation;
  const t = tokens();

  await Promise.allSettled(
    [`64px ${t.black}`, `40px ${t.sc}`, `italic 28px ${t.fell}`, `24px ${t.mono}`].map((f) => document.fonts.load(f)),
  );
  // a quicker skin switch started a newer draw while this one waited on fonts
  if (draw !== generation) return;

  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  ctx.fillStyle = t.paper;
  ctx.fillRect(0, 0, W, H);
  const glow = ctx.createRadialGradient(W / 2, H / 2, H / 3, W / 2, H / 2, W * 0.75);
  glow.addColorStop(0, 'rgba(0,0,0,0)');
  glow.addColorStop(1, d.night ? 'rgba(0,0,0,.35)' : 'rgba(60,35,12,.18)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // frame
  ctx.strokeStyle = t.rule;
  ctx.lineWidth = 3;
  ctx.strokeRect(28, 28, W - 56, H - 56);
  ctx.lineWidth = 1;
  ctx.strokeRect(38, 38, W - 76, H - 76);

  ctx.fillStyle = t.ink;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'alphabetic';

  // masthead
  ctx.font = `76px ${t.black}`;
  ctx.fillText('The Atman Times', W / 2, 130);
  const mw = ctx.measureText('The Atman Times').width;
  const aw = ctx.measureText('The ').width;
  const capW = ctx.measureText('A').width;
  ctx.fillRect(W / 2 - mw / 2 + aw + capW * 0.2, 62, capW * 0.6, 5);

  ctx.font = `italic 24px ${t.fell}`;
  ctx.fillStyle = t.ink2;
  ctx.fillText(`${SKIN_META[d.skin].label} edition · ${d.date}`, W / 2, 168);
  ctx.fillStyle = t.rule;
  ctx.fillRect(70, 188, W - 140, 3);
  ctx.fillRect(70, 195, W - 140, 1);

  // headline
  const beat = d.wpm > d.record;
  ctx.fillStyle = t.red;
  ctx.font = `30px ${t.sc}`;
  ctx.fillText(beat ? SKIN_META[d.skin].shareLine.toUpperCase() : 'TYPING TEST RESULT', W / 2, 250);

  // big number + unit, centred as one group
  ctx.fillStyle = t.ink;
  ctx.textAlign = 'left';
  ctx.font = `150px ${t.sc}`;
  const nw = ctx.measureText(String(d.wpm)).width;
  ctx.font = `44px ${t.sc}`;
  const uw = ctx.measureText('wpm').width;
  const x0 = W / 2 - (nw + 18 + uw) / 2;
  ctx.font = `150px ${t.sc}`;
  ctx.fillText(String(d.wpm), x0, 400);
  ctx.font = `44px ${t.sc}`;
  ctx.fillText('wpm', x0 + nw + 18, 400);
  ctx.textAlign = 'center';

  ctx.font = `26px ${t.mono}`;
  ctx.fillStyle = t.ink2;
  ctx.fillText(`${d.accuracy}% accuracy · ${d.seconds}s · ${d.device}`, W / 2, 460);

  ctx.font = `italic 28px ${t.fell}`;
  ctx.fillStyle = t.ink;
  ctx.fillText(
    beat ? `Faster than the editor's ${d.record} wpm.` : `The editor's record stands at ${d.record} wpm.`,
    W / 2,
    515,
  );

  ctx.fillStyle = t.soft;
  ctx.fillRect(70, 545, W - 140, 1);
  ctx.font = `22px ${t.mono}`;
  ctx.fillStyle = t.muted;
  ctx.fillText('swayamsahoo.dev/typing', W / 2, 580);

  ctx.fillStyle = t.red;
  emblem(ctx, d.skin, 70, 556, 30);
  emblem(ctx, d.skin, W - 100, 556, 30);
}
