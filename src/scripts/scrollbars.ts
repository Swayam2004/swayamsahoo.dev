/** Marks whatever is scrolling with .scrolling so the themed scrollbar shows, then hides it after a pause. */
const IDLE_MS = 800;
const root = document.documentElement;
const timers = new WeakMap<Element, number>();
let inGutter = false;

function show(el: Element): void {
  el.classList.add('scrolling');
  clearTimeout(timers.get(el));
  timers.set(
    el,
    window.setTimeout(() => {
      if (el !== root || !inGutter) el.classList.remove('scrolling');
    }, IDLE_MS),
  );
}

document.addEventListener('scroll', (e) => show(e.target instanceof Element ? e.target : root), {
  capture: true,
  passive: true,
});

// the page's own scrollbar has no :hover CSS can reach, so reveal it while the pointer is in the gutter
document.addEventListener(
  'mousemove',
  (e) => {
    const now = e.clientX >= root.clientWidth;
    if (now === inGutter) return;
    inGutter = now;
    if (now) root.classList.add('scrolling');
    else show(root);
  },
  { passive: true },
);
