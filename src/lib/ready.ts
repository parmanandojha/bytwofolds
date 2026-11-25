// Lets hero animation wait for the preloader or a page transition.
let ready = false;
const waiting = new Set<() => void>();
export function markReady() {
  if (ready) return;
  ready = true;
  waiting.forEach((f) => f());
  waiting.clear();
}
/** Called when a transition covers the page, so the next hero waits for the uncover. */
export function markBusy() { ready = false; }
export function onReady(f: () => void) {
  if (ready) { f(); return () => {}; }
  waiting.add(f);
  return () => { waiting.delete(f); };
}
