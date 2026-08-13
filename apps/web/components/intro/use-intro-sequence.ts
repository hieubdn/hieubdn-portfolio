"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { hasPlayedIntro, markIntroPlayed, setIntroActive } from "./intro-state";

export type IntroStage =
  | "t1"
  | "enteringT2"
  | "t2"
  | "closingToT1"
  | "closingToHome"
  | "closed";

const ANIMATION_MS = 650;
// Extra grace period after the CSS transition settles, so residual trackpad
// inertia can't immediately re-trigger the next transition.
const UNLOCK_BUFFER_MS = 200;
const WHEEL_THRESHOLD = 2;
const TOUCH_THRESHOLD_PX = 40;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useIntroSequence() {
  const [stage, setStage] = useState<IntroStage>(() =>
    hasPlayedIntro() ? "closed" : "t1",
  );
  const stageRef = useRef(stage);
  stageRef.current = stage;

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const t1Ref = useRef<HTMLDivElement | null>(null);
  const t2ScrollRef = useRef<HTMLDivElement | null>(null);
  const isLockedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);
  const touchTriggeredRef = useRef(false);
  const hasMarkedRef = useRef(false);

  useEffect(() => {
    if (hasMarkedRef.current) return;
    hasMarkedRef.current = true;
    if (stageRef.current !== "closed") {
      markIntroPlayed();
    }
  }, []);

  useEffect(() => {
    if (stage === "t1") {
      wrapperRef.current?.focus();
    }
  }, [stage]);

  // Runs before the home page's own scroll-reveal effects (this component
  // sits earlier in the tree), so Reveal instances can read the up-to-date
  // flag as soon as they mount.
  useEffect(() => {
    setIntroActive(stage !== "closed");
  }, [stage]);

  const transitionTimeoutRef = useRef<number | null>(null);

  // IntroOverlay only renders on the home route, so navigating away (e.g. the
  // browser back button) while `stage` hasn't reached "closed" unmounts this
  // hook without ever running the `settled === "closed"` branch below. Without
  // this cleanup, `introActive` would stay stuck `true` for the rest of the
  // SPA session, permanently blocking every scroll-reveal animation sitewide,
  // and the pending transition timeout would still fire `setStage` against a
  // dead instance.
  useEffect(() => {
    return () => {
      if (transitionTimeoutRef.current !== null) {
        window.clearTimeout(transitionTimeoutRef.current);
      }
      setIntroActive(false);
    };
  }, []);

  const runTransition = useCallback(
    (transitional: IntroStage, settled: IntroStage) => {
      if (isLockedRef.current) return;
      isLockedRef.current = true;
      setStage(transitional);
      const delay = prefersReducedMotion()
        ? 0
        : ANIMATION_MS + UNLOCK_BUFFER_MS;
      transitionTimeoutRef.current = window.setTimeout(() => {
        transitionTimeoutRef.current = null;
        setStage(settled);
        if (settled === "closed") {
          markIntroPlayed();
        }
        isLockedRef.current = false;
      }, delay);
    },
    [],
  );

  const goToT2 = useCallback(
    () => runTransition("enteringT2", "t2"),
    [runTransition],
  );
  const goToT1 = useCallback(
    () => runTransition("closingToT1", "t1"),
    [runTransition],
  );
  const goHome = useCallback(
    () => runTransition("closingToHome", "closed"),
    [runTransition],
  );

  // Lock background scroll for as long as the overlay is mounted.
  useEffect(() => {
    if (stage === "closed") return;
    const body = document.body;
    const html = document.documentElement;
    const prevBodyOverflow = body.style.overflow;
    const prevHtmlOverflow = html.style.overflow;
    body.style.overflow = "hidden";
    html.style.overflow = "hidden";
    return () => {
      body.style.overflow = prevBodyOverflow;
      html.style.overflow = prevHtmlOverflow;
    };
  }, [stage]);

  // T1: any downward intent advances to T2.
  useEffect(() => {
    const el = t1Ref.current;
    if (!el || stage === "closed") return;

    const onWheel = (e: WheelEvent) => {
      if (stageRef.current !== "t1" || isLockedRef.current) return;
      if (e.deltaY > WHEEL_THRESHOLD) {
        e.preventDefault();
        goToT2();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
      touchTriggeredRef.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (
        stageRef.current !== "t1" ||
        isLockedRef.current ||
        touchTriggeredRef.current
      )
        return;
      const startY = touchStartYRef.current;
      const currentY = e.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      if (startY - currentY > TOUCH_THRESHOLD_PX) {
        touchTriggeredRef.current = true;
        e.preventDefault();
        goToT2();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (stageRef.current !== "t1" || isLockedRef.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        goToT2();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [stage, goToT2]);

  // T2: boundary-triggered transitions back to T1 (top) or home (bottom);
  // everything else is native scrolling inside the panel.
  useEffect(() => {
    const el = t2ScrollRef.current;
    if (!el || stage === "closed") return;

    const atTop = () => el.scrollTop <= 0;
    const atBottom = () =>
      el.scrollTop + el.clientHeight >= el.scrollHeight - 1;

    const onWheel = (e: WheelEvent) => {
      if (stageRef.current !== "t2" || isLockedRef.current) return;
      if (e.deltaY < -WHEEL_THRESHOLD && atTop()) {
        e.preventDefault();
        goToT1();
      } else if (e.deltaY > WHEEL_THRESHOLD && atBottom()) {
        e.preventDefault();
        goHome();
      }
    };
    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
      touchTriggeredRef.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (
        stageRef.current !== "t2" ||
        isLockedRef.current ||
        touchTriggeredRef.current
      )
        return;
      const startY = touchStartYRef.current;
      const currentY = e.touches[0]?.clientY;
      if (startY == null || currentY == null) return;
      const delta = startY - currentY; // >0 => swiping up (scroll-down intent)
      if (delta < -TOUCH_THRESHOLD_PX && atTop()) {
        touchTriggeredRef.current = true;
        e.preventDefault();
        goToT1();
      } else if (delta > TOUCH_THRESHOLD_PX && atBottom()) {
        touchTriggeredRef.current = true;
        e.preventDefault();
        goHome();
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (stageRef.current !== "t2" || isLockedRef.current) return;
      if ((e.key === "ArrowUp" || e.key === "PageUp") && atTop()) {
        e.preventDefault();
        goToT1();
      } else if (
        (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") &&
        atBottom()
      ) {
        e.preventDefault();
        goHome();
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKeyDown);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [stage, goToT1, goHome]);

  return { stage, wrapperRef, t1Ref, t2ScrollRef, goToT2, goHome };
}
