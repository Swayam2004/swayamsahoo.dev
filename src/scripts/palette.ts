import { COMMANDS, type Command } from '../data/commands';
import { SITE } from '../data/site';
import { nextSkin, toggleEdition } from './skins';

const dialog = document.querySelector<HTMLDialogElement>('#palette');
const filter = document.querySelector<HTMLInputElement>('#pal-filter');
const status = document.querySelector<HTMLElement>('#pal-status');
const rows = [...document.querySelectorAll<HTMLLIElement>('#pal-list [data-cmd]')];

let active = 0;
const visible = (): HTMLLIElement[] => rows.filter((r) => !r.hidden);

function select(i: number): void {
  const list = visible();
  if (!list.length) return;
  active = (i + list.length) % list.length;
  rows.forEach((r) => r.setAttribute('aria-selected', 'false'));
  const row = list[active];
  row?.setAttribute('aria-selected', 'true');
  row?.scrollIntoView({ block: 'nearest' });
  if (row && filter) filter.setAttribute('aria-activedescendant', row.id);
}

export function openPalette(): void {
  if (!dialog || dialog.open) return;
  if (filter) filter.value = '';
  rows.forEach((r) => (r.hidden = false));
  if (status) status.textContent = '';
  dialog.showModal();
  select(0);
  // on touch, keep the keyboard closed so the whole list stays visible
  if (!matchMedia('(pointer: coarse)').matches) filter?.focus();
  document.dispatchEvent(new CustomEvent('site:palette'));
}

async function run(cmd: Command): Promise<void> {
  const a = cmd.action;
  switch (a.kind) {
    case 'go':
      dialog?.close();
      if (a.newTab || /^https?:/.test(a.href)) {
        // anchor click keeps it a user gesture and lets Telegrams see the resume link
        const link = Object.assign(document.createElement('a'), { href: a.href, target: '_blank', rel: 'noopener' });
        document.body.append(link);
        link.click();
        link.remove();
      } else location.assign(a.href);
      return;
    case 'copy-email':
      try {
        await navigator.clipboard.writeText(SITE.email);
        if (status) status.textContent = 'Email copied';
      } catch {
        if (status) status.textContent = SITE.email;
      }
      return;
    case 'edition':
      dialog?.close();
      toggleEdition();
      return;
    case 'skin':
      dialog?.close();
      nextSkin();
      return;
    case 'reset':
      document.dispatchEvent(new CustomEvent('site:reset'));
      if (status) status.textContent = 'Progress reset';
      return;
  }
}

const byId = (id: string | undefined): Command | undefined => COMMANDS.find((c) => c.id === id);

rows.forEach((r, i) => {
  r.id = `pal-row-${i}`;
  r.addEventListener('click', () => {
    const cmd = byId(r.dataset.cmd);
    if (cmd) void run(cmd);
  });
  r.addEventListener('mousemove', () => select(visible().indexOf(r)));
});

filter?.addEventListener('input', () => {
  const q = filter.value.trim().toLowerCase();
  rows.forEach((r) => {
    const cmd = byId(r.dataset.cmd);
    r.hidden = Boolean(q) && !(cmd && `${cmd.label} ${cmd.hint}`.toLowerCase().includes(q));
  });
  select(0);
});

filter?.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    select(active + (e.key === 'ArrowDown' ? 1 : -1));
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const cmd = byId(visible()[active]?.dataset.cmd);
    if (cmd) void run(cmd);
  }
});

dialog?.addEventListener('click', (e) => {
  if (e.target === dialog) dialog.close(); // backdrop
});

document.querySelectorAll('[data-open-palette]').forEach((b) => b.addEventListener('click', openPalette));

/* ---------- global shortcuts ---------- */
const SECRET_START = 's'; // "swayam" (hidden Telegram) starts with the Shelf key
let pending: number | undefined;

document.addEventListener('keydown', (e) => {
  const target = e.target as HTMLElement | null;
  const typing = Boolean(target?.closest('input, textarea, select, [contenteditable]'));
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    if (dialog?.open) dialog.close();
    else openPalette();
    return;
  }
  if (dialog?.open || e.metaKey || e.ctrlKey || e.altKey) return;
  // / is the search key on many sites, so visitors try it. Fields marked data-palette-key
  // (the idle typing test) let both keys through; real text fields keep them.
  if ((e.key === '?' || e.key === '/') && (!typing || target?.closest('[data-palette-key]'))) {
    e.preventDefault();
    openPalette();
    return;
  }
  if (typing) return;
  if (pending !== undefined) {
    clearTimeout(pending);
    pending = undefined;
    return; // the next key arrived quickly: someone is typing a word, not a shortcut
  }
  const cmd = COMMANDS.find((c) => c.key === e.key.toLowerCase());
  if (!cmd) return;
  if (e.key.toLowerCase() === SECRET_START) {
    pending = window.setTimeout(() => {
      pending = undefined;
      void run(cmd);
    }, 450);
    return;
  }
  void run(cmd);
});
