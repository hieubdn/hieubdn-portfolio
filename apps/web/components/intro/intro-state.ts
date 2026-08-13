// Module-scoped (not sessionStorage/localStorage) on purpose: a full page
// reload re-executes this module from scratch (flag resets, intro replays),
// while client-side route changes within the same SPA session keep the
// module alive (flag stays true, intro does not replay).
let hasPlayed = false;

export function hasPlayedIntro(): boolean {
  return hasPlayed;
}

export function markIntroPlayed(): void {
  hasPlayed = true;
}

// While the intro overlay covers the screen, the home page underneath is
// still laid out and in-viewport, so scroll-reveal observers would fire
// (and finish animating) behind it — by the time the overlay closes,
// everything already looks statically "there" instead of animating in.
// `useScrollReveal` checks this flag and defers observing until the intro
// actually closes, so above-the-fold content reveals right as it's exposed.
let introActive = false;
const introActiveListeners = new Set<() => void>();

export function isIntroActive(): boolean {
  return introActive;
}

export function setIntroActive(active: boolean): void {
  if (introActive === active) return;
  introActive = active;
  introActiveListeners.forEach((listener) => listener());
}

export function subscribeIntroActive(listener: () => void): () => void {
  introActiveListeners.add(listener);
  return () => introActiveListeners.delete(listener);
}
