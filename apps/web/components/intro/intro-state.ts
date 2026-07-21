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
