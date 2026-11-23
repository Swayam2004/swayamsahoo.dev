import { SKINS, SKIN_META, type Skin } from '../data/skins';
import { LEVELS, TELEGRAMS, TOAST_WORD, TOTAL_POINTS } from '../data/telegrams';

interface State {
  earned: Record<string, string>;
  dispatches: string[];
}

const KEY = 'telegrams';
const SECRET = 'swayam';

function load(): State {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null') as Partial<State> | null;
    return { earned: s?.earned ?? {}, dispatches: s?.dispatches ?? [] };
  } catch {
    return { earned: {}, dispatches: [] };
  }
}

let state = load();
const save = (): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage blocked: progress lasts for this page view */
  }
};

const skin = (): Skin => {
  const s = document.documentElement.dataset.skin;
  return (SKINS as readonly string[]).includes(s ?? '') ? (s as Skin) : 'frontier';
};

const points = (): number => TELEGRAMS.reduce((sum, t) => sum + (state.earned[t.id] ? t.points : 0), 0);
const level = (p: number): number => LEVELS.reduce((lvl, need, i) => (p >= need ? i + 1 : lvl), 1);

function renderBoxes(): void {
  const p = points();
  const lvl = level(p);
  document.querySelectorAll<HTMLElement>('[data-telegrams]').forEach((box) => {
    box.querySelector('[data-points]')!.textContent = String(p);
    box.querySelector('[data-level]')!.textContent = String(lvl);
    box.querySelectorAll<HTMLElement>('[data-rank-skin]').forEach((el) => {
      const s = el.dataset.rankSkin as Skin;
      el.textContent = (SKIN_META[s].ranks[lvl - 1] ?? '').toUpperCase();
    });
    const bar = box.querySelector<HTMLElement>('.bar');
    bar?.style.setProperty('--p', `${(p / TOTAL_POINTS) * 100}%`);
    bar?.setAttribute('aria-valuenow', String(p));
    box.querySelectorAll<HTMLElement>('[data-telegram]').forEach((li) => {
      const t = TELEGRAMS.find((x) => x.id === li.dataset.telegram);
      if (!t) return;
      const got = Boolean(state.earned[t.id]);
      li.classList.toggle('locked', !got);
      const label = li.querySelector('.t');
      if (label) label.textContent = t.hidden && !got ? '??? (hidden)' : t.title;
    });
  });
}

/* ---------- toast ---------- */
let toastWrap: HTMLElement | null = null;
function toast(title: string, pts: number): void {
  if (!toastWrap) {
    toastWrap = document.createElement('div');
    toastWrap.className = 'toasts';
    toastWrap.setAttribute('role', 'status');
    toastWrap.setAttribute('aria-live', 'polite');
    document.body.append(toastWrap);
  }
  const el = document.createElement('div');
  el.className = 'toast';
  const kicker = document.createElement('span');
  kicker.className = 'k';
  kicker.textContent = `${TOAST_WORD[skin()]} · +${pts}`;
  const body = document.createElement('span');
  body.className = 'b';
  body.textContent = skin() === 'frontier' ? `${title.toUpperCase()} STOP` : title;
  el.append(kicker, body);
  toastWrap.append(el);
  setTimeout(() => el.classList.add('out'), 3600);
  setTimeout(() => el.remove(), 4200);
}

export function earn(id: string): void {
  if (state.earned[id]) return;
  const t = TELEGRAMS.find((x) => x.id === id);
  if (!t) return;
  state.earned[id] = new Date().toISOString();
  save();
  renderBoxes();
  toast(t.title, t.points);
}

export function resetProgress(): void {
  state = { earned: {}, dispatches: [] };
  save();
  renderBoxes();
}

/* ---------- triggers ---------- */
document.addEventListener('site:edition', () => earn('lit-lamp'));
document.addEventListener('site:skin', () => earn('changed-coats'));
document.addEventListener('site:palette', () => earn('found-wire'));
document.addEventListener('site:typing', (e) => {
  earn('sat-typewriter');
  if ((e as CustomEvent<{ beat: boolean }>).detail.beat) earn('beat-editor');
});
document.addEventListener('site:visit', (e) => {
  if ((e as CustomEvent<{ page: string }>).detail.page === 'shelf') earn('visited-parlour');
});

document.addEventListener('click', (e) => {
  const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href]');
  if (!a) return;
  if (a.pathname === '/resume.pdf' || a.dataset.track === 'resume') earn('pulled-record');
  if (a.dataset.track === 'dispatch') {
    if (!state.dispatches.includes(a.href)) {
      state.dispatches.push(a.href);
      save();
    }
    if (state.dispatches.length >= 3) earn('read-dispatches');
  }
});

let typed = '';
document.addEventListener('keydown', (e) => {
  const target = e.target as HTMLElement | null;
  if (target?.closest('input, textarea, [contenteditable]') || e.key.length !== 1) return;
  typed = (typed + e.key.toLowerCase()).slice(-SECRET.length);
  if (typed === SECRET) earn('said-name');
});

document.querySelectorAll('[data-reset-progress]').forEach((b) => b.addEventListener('click', resetProgress));
document.addEventListener('site:reset', resetProgress);

if (location.pathname.startsWith('/shelf')) earn('visited-parlour');
renderBoxes();
// let the page settle before the first toast
setTimeout(() => earn('opened-paper'), 900);
