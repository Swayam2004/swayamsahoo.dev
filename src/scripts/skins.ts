import { SKINS, SKIN_META, type Skin } from '../data/skins';

const root = document.documentElement;
const reduceMotion = (): boolean => matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSkin = (v: unknown): v is Skin => typeof v === 'string' && (SKINS as readonly string[]).includes(v);

export const todayKey = (): string => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};

export const currentSkin = (): Skin => (isSkin(root.dataset.skin) ? root.dataset.skin : 'marquise');
export const isNight = (): boolean => root.dataset.ed === 'night';

function store(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage blocked: choices last for this page view only */
  }
}

type TransitionKind = 'circle' | 'fade';

function runTransition(update: () => void, kind: TransitionKind, from: Element): void {
  if (!document.startViewTransition || reduceMotion()) {
    update();
    return;
  }
  const box = from.getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  if (kind === 'fade') root.classList.add('vt-skin');
  const vt = document.startViewTransition(update);
  vt.finished.finally(() => root.classList.remove('vt-skin'));
  if (kind === 'circle') {
    vt.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 900, easing: 'cubic-bezier(.6,0,.3,1)', pseudoElement: '::view-transition-new(root)' },
      );
    });
  }
}

/* ---------- fireflies (woodland night) ---------- */
const flies: HTMLElement[] = Array.from({ length: 16 }, () => {
  const el = document.createElement('i');
  el.className = 'fly';
  el.setAttribute('aria-hidden', 'true');
  document.body.append(el);
  return el;
});

function releaseFlies(from: Element | null): void {
  const box = from?.getBoundingClientRect();
  flies.forEach((fly, i) => {
    const tx = Math.random() * innerWidth;
    const ty = 80 + Math.random() * (innerHeight - 160);
    fly.style.left = `${tx}px`;
    fly.style.top = `${ty}px`;
    fly.style.animationDelay = `${-Math.random() * 7}s, ${-Math.random() * 2}s`;
    fly.classList.add('on');
    if (box && !reduceMotion()) {
      fly.animate(
        [
          { transform: `translate(${box.left + box.width / 2 - tx}px, ${box.top + box.height / 2 - ty}px) scale(.4)` },
          { transform: 'none' },
        ],
        { duration: 1400 + i * 60, easing: 'cubic-bezier(.2,.7,.3,1)' },
      );
    }
  });
}
const hideFlies = (): void => flies.forEach((f) => f.classList.remove('on'));

/* ---------- editions ---------- */
const edButtons = document.querySelectorAll<HTMLButtonElement>('.edbtn');

function syncEditionLabels(): void {
  edButtons.forEach((btn) => {
    const skin = btn.dataset.for;
    if (!isSkin(skin)) return;
    const labels = SKIN_META[skin].editionLabels;
    btn.setAttribute('aria-label', isNight() ? labels.toDay : labels.toNight);
  });
}

function restart(el: Element, cls: string): void {
  el.classList.remove(cls);
  void (el as HTMLElement).offsetWidth;
  el.classList.add(cls);
}

edButtons.forEach((btn) =>
  btn.addEventListener('click', () => {
    const toNight = !isNight();
    runTransition(
      () => {
        if (toNight) root.dataset.ed = 'night';
        else delete root.dataset.ed;
        syncEditionLabels();
        if (btn.dataset.for === 'frontier' && !toNight) restart(btn, 'puff');
        if (btn.dataset.for === 'marquise') restart(btn, 'blink');
        if (currentSkin() === 'woodland') {
          if (toNight) releaseFlies(btn);
          else hideFlies();
        }
        // inside the update so listeners read the new edition, not the snapshot
        document.dispatchEvent(new CustomEvent('site:edition', { detail: { night: toNight } }));
      },
      'circle',
      btn,
    );
    store('edition', toNight ? 'night' : 'day');
  }),
);

/* ---------- skins ---------- */
const menu = document.querySelector<HTMLElement>('#skinmenu');
const menuBtn = document.querySelector<HTMLButtonElement>('.skinbtn');
const items = document.querySelectorAll<HTMLButtonElement>('#skinmenu [data-skin]');

function syncMenu(): void {
  items.forEach((b) => b.setAttribute('aria-checked', String(b.dataset.skin === currentSkin())));
}

function setMenu(open: boolean): void {
  if (!menu || !menuBtn) return;
  menu.hidden = !open;
  menuBtn.setAttribute('aria-expanded', String(open));
  if (open) (menu.querySelector<HTMLElement>('[aria-checked=true]') ?? items[0])?.focus();
}

export function applySkin(skin: Skin, from: Element | null = menuBtn): void {
  if (skin === currentSkin()) return;
  runTransition(
    () => {
      root.dataset.skin = skin;
      syncMenu();
      if (skin === 'woodland' && isNight()) releaseFlies(document.querySelector('.ed-woodland'));
      else hideFlies();
      // inside the update so listeners read the new skin, not the snapshot
      document.dispatchEvent(new CustomEvent('site:skin', { detail: { skin } }));
    },
    'fade',
    from ?? document.body,
  );
  store('skin.pick', JSON.stringify({ skin, date: todayKey() }));
}

export function nextSkin(): void {
  const i = SKINS.indexOf(currentSkin());
  applySkin(SKINS[(i + 1) % SKINS.length] ?? 'frontier');
}

menuBtn?.addEventListener('click', (e) => {
  e.stopPropagation();
  setMenu(menu?.hidden !== false);
});
document.addEventListener('click', (e) => {
  if (menu && !menu.hidden && !menu.contains(e.target as Node)) setMenu(false);
});
menu?.addEventListener('keydown', (e) => {
  const list = [...items];
  const i = list.indexOf(document.activeElement as HTMLButtonElement);
  if (e.key === 'Escape') {
    setMenu(false);
    menuBtn?.focus();
  } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    const n = (i + (e.key === 'ArrowDown' ? 1 : list.length - 1)) % list.length;
    list[n]?.focus();
  }
});
items.forEach((b) =>
  b.addEventListener('click', () => {
    setMenu(false);
    if (isSkin(b.dataset.skin)) applySkin(b.dataset.skin);
  }),
);

export function toggleEdition(): void {
  document.querySelector<HTMLButtonElement>(`.ed-${currentSkin()}`)?.click();
}

syncMenu();
syncEditionLabels();
if (currentSkin() === 'woodland' && isNight()) releaseFlies(null);

document.querySelectorAll<HTMLElement>('[data-today]').forEach((el) => {
  el.textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
});
