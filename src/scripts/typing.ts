import { PASSAGES, type Passage } from '../data/passages';
import { SKINS, SKIN_META, type Skin } from '../data/skins';
import { TYPING_RECORD_WPM } from '../data/site';
import { drawShareCard } from './sharecard';

export type Device = 'desktop' | 'touch';

export interface Result {
  wpm: number;
  accuracy: number;
  seconds: number;
  device: Device;
  date: string;
  passageId: string;
}

const root = document.documentElement;
const $ = <T extends Element>(sel: string): T => {
  const el = document.querySelector<T>(sel);
  if (!el) throw new Error(`missing ${sel}`);
  return el;
};

const device: Device = matchMedia('(pointer: coarse)').matches ? 'touch' : 'desktop';
const pbKey = (d: Device): string => `typing.pb.${d}`;

export function readPB(d: Device): Result | null {
  try {
    const raw = localStorage.getItem(pbKey(d));
    return raw ? (JSON.parse(raw) as Result) : null;
  } catch {
    return null;
  }
}

const skinNow = (): Skin => {
  const s = root.dataset.skin;
  return (SKINS as readonly string[]).includes(s ?? '') ? (s as Skin) : 'frontier';
};

function pickPassage(exclude?: string): Passage {
  const skin = skinNow();
  const pool = PASSAGES.filter((p) => (!p.skin || p.skin === skin) && p.id !== exclude);
  return pool[Math.floor(Math.random() * pool.length)] ?? PASSAGES[0]!;
}

/* ---------- elements ---------- */
const textEl = $<HTMLDivElement>('#tt-text');
const input = $<HTMLTextAreaElement>('#tt-input');
const sourceEl = $<HTMLElement>('#tt-source');
const wpmEl = $<HTMLElement>('#tt-wpm');
const accEl = $<HTMLElement>('#tt-acc');
const timeEl = $<HTMLElement>('#tt-time');
const pbEl = $<HTMLElement>('#tt-pb');
const resultEl = $<HTMLElement>('#tt-result');
const resultLine = $<HTMLElement>('#tt-result-line');
const verdictEl = $<HTMLElement>('#tt-verdict');
const canvas = $<HTMLCanvasElement>('#tt-card');
const shareBtn = $<HTMLButtonElement>('#tt-share');
const copyBtn = $<HTMLButtonElement>('#tt-copy');
const dlLink = $<HTMLAnchorElement>('#tt-download');
const shareText = $<HTMLElement>('#tt-share-text');

/* ---------- state ---------- */
let passage = pickPassage();
let chars: HTMLSpanElement[] = [];
let startedAt = 0;
let keystrokes = 0;
let correctKeystrokes = 0;
let pos = 0;
let done = false;
let tick = 0;
let last: Result | null = null;
let lastWasPB = false;

function render(): void {
  textEl.replaceChildren(
    ...[...passage.text].map((c) => {
      const s = document.createElement('span');
      s.textContent = c;
      return s;
    }),
  );
  chars = [...textEl.children] as HTMLSpanElement[];
  chars[0]?.classList.add('cur');
  sourceEl.textContent = passage.source;
}

function showPB(): void {
  const pb = readPB(device);
  pbEl.textContent = pb ? `your best (${device}): ${pb.wpm} wpm · ${pb.accuracy}%` : `your best (${device}): none yet`;
}

function reset(newPassage = true): void {
  if (newPassage) passage = pickPassage(passage.id);
  startedAt = 0;
  keystrokes = 0;
  correctKeystrokes = 0;
  pos = 0;
  done = false;
  clearInterval(tick);
  input.value = '';
  input.disabled = false;
  input.dataset.paletteKey = ''; // no passage contains ? or /, so before the first keystroke they mean "commands"
  wpmEl.textContent = '0';
  accEl.textContent = '100';
  timeEl.textContent = '0.0';
  resultEl.hidden = true;
  render();
  input.focus({ preventScroll: true });
}

const minutes = (): number => (performance.now() - startedAt) / 60000;
const netWpm = (): number => (startedAt ? Math.round(pos / 5 / Math.max(minutes(), 1 / 600)) : 0);
const accuracy = (): number => (keystrokes ? Math.round((correctKeystrokes / keystrokes) * 100) : 100);

function updateStats(): void {
  wpmEl.textContent = String(netWpm());
  accEl.textContent = String(accuracy());
  timeEl.textContent = startedAt ? (minutes() * 60).toFixed(1) : '0.0';
}

function paint(wrongAt: number): void {
  chars.forEach((c, i) => {
    c.className = i < pos ? 'ok' : i === wrongAt ? 'bad' : '';
  });
  const cursor = wrongAt >= 0 ? wrongAt : pos;
  chars[cursor]?.classList.add('cur');
}

input.addEventListener('beforeinput', (e) => {
  if (done) {
    e.preventDefault();
    return;
  }
  if (e.inputType === 'insertFromPaste' || e.inputType === 'insertFromDrop') {
    e.preventDefault();
    return;
  }
  if (e.inputType.startsWith('insert') && e.data) {
    let clean = input.value.length === pos;
    let k = 0;
    for (const ch of e.data) {
      keystrokes++;
      if (clean && ch === passage.text[pos + k]) {
        correctKeystrokes++;
        k++;
      } else clean = false;
    }
    if (!startedAt) {
      delete input.dataset.paletteKey; // mid-test, ? and / are keystrokes
      startedAt = performance.now();
      tick = window.setInterval(updateStats, 200);
    }
  }
});

input.addEventListener('input', () => {
  if (done) return;
  let v = input.value.replace(/\n/g, ' ');
  let i = 0;
  while (i < v.length && v[i] === passage.text[i]) i++;
  // at most one wrong character may sit after the correct prefix
  if (v.length > i + 1) v = v.slice(0, i + 1);
  if (v !== input.value) input.value = v;
  pos = i;
  paint(v.length > i ? i : -1);
  updateStats();
  if (pos === passage.text.length) finish();
});

input.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    e.preventDefault();
    reset();
  }
});

/* ---------- results ---------- */
function shareMessage(r: Result): string {
  const line = SKIN_META[skinNow()].shareLine;
  const beat = r.wpm > TYPING_RECORD_WPM;
  return `${beat ? `${line}: ` : ''}typed ${r.wpm} wpm (${r.accuracy}% accuracy) on swayamsahoo.dev. The editor does ${TYPING_RECORD_WPM}. ⌨`;
}

function finish(): void {
  done = true;
  clearInterval(tick);
  updateStats();
  input.disabled = true;
  const r: Result = {
    wpm: netWpm(),
    accuracy: accuracy(),
    seconds: Math.round(minutes() * 600) / 10,
    device,
    date: new Date().toISOString().slice(0, 10),
    passageId: passage.id,
  };
  last = r;
  const pb = readPB(device);
  const newPB = !pb || r.wpm > pb.wpm;
  if (newPB) {
    try {
      localStorage.setItem(pbKey(device), JSON.stringify(r));
    } catch {
      /* storage blocked */
    }
  }
  showPB();
  lastWasPB = newPB;
  const beat = r.wpm > TYPING_RECORD_WPM;
  resultLine.textContent = `${r.wpm} wpm · ${r.accuracy}% accuracy · ${r.seconds}s`;
  showVerdict();
  resultEl.hidden = false;
  void drawCard();
  document.dispatchEvent(new CustomEvent('site:typing', { detail: { wpm: r.wpm, accuracy: r.accuracy, beat } }));
}

/** The verdict and share text use the skin's wording, so they're rewritten on every skin change. */
function showVerdict(): void {
  if (!last) return;
  verdictEl.textContent =
    last.wpm > TYPING_RECORD_WPM
      ? `${SKIN_META[skinNow()].shareLine}. You beat the editor's ${TYPING_RECORD_WPM}.`
      : `${TYPING_RECORD_WPM - last.wpm} wpm short of the editor.${lastWasPB ? ' New personal best, though.' : ''}`;
  shareText.textContent = shareMessage(last);
}

async function drawCard(): Promise<void> {
  if (!last) return;
  await drawShareCard(canvas, { ...last, skin: skinNow(), night: root.dataset.ed === 'night', record: TYPING_RECORD_WPM });
  canvas.toBlob((blob) => {
    if (!blob) return;
    if (dlLink.href.startsWith('blob:')) URL.revokeObjectURL(dlLink.href);
    dlLink.href = URL.createObjectURL(blob);
  }, 'image/png');
}

shareBtn.addEventListener('click', async () => {
  if (!last) return;
  const text = shareMessage(last);
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png'));
  const file = blob ? new File([blob], 'typing-test.png', { type: 'image/png' }) : null;
  try {
    if (file && navigator.canShare?.({ files: [file] })) {
      await navigator.share({ files: [file], text });
      return;
    }
    if (navigator.share) {
      await navigator.share({ text, url: location.href });
      return;
    }
  } catch {
    return; // user closed the share sheet
  }
  dlLink.click();
});

copyBtn.addEventListener('click', async () => {
  if (!last) return;
  try {
    await navigator.clipboard.writeText(shareMessage(last));
    copyBtn.textContent = 'copied ✓';
    setTimeout(() => (copyBtn.textContent = 'copy text'), 1600);
  } catch {
    copyBtn.textContent = 'copy failed';
  }
});

document.querySelector('#tt-restart')?.addEventListener('click', () => reset());
document.querySelector('#tt-again')?.addEventListener('click', () => reset());
textEl.addEventListener('click', () => input.focus());
document.addEventListener('site:skin', () => {
  if (!startedAt) reset();
  else if (done) {
    showVerdict();
    void drawCard();
  }
});
document.addEventListener('site:edition', () => {
  if (done) void drawCard();
});

showPB();
render();
