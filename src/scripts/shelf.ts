/** Ties each box on the shelf to its ledger row: pointing at, focusing or tapping either lights both. */
const root = document.querySelector<HTMLElement>('[data-shelf]');
const pick = root?.querySelector<HTMLElement>('.pick');

function light(el: HTMLElement): void {
  const name = el.dataset.game;
  if (!root || !name) return;
  root.querySelectorAll('.on').forEach((e) => e.classList.remove('on'));
  root.querySelectorAll(`[data-game="${CSS.escape(name)}"]`).forEach((e) => e.classList.add('on'));
  const box = root.querySelector(`button[data-game="${CSS.escape(name)}"]`);
  if (pick && box) pick.textContent = box.getAttribute('aria-label') ?? name;
}

function onEvent(e: Event): void {
  const el = e.target instanceof Element ? e.target.closest<HTMLElement>('[data-game]') : null;
  if (el) light(el);
}

if (root) {
  root.addEventListener('pointerover', onEvent);
  root.addEventListener('focusin', onEvent);
  root.addEventListener('click', onEvent);
}
export {};
