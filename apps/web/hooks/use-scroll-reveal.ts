"use client";

import { useEffect, useRef, useState } from "react";

import { isIntroActive, subscribeIntroActive } from "@/components/intro/intro-state";

type ScrollRevealOptions = {
  threshold?: number;
  rootMargin?: string;
};

const DEFAULT_THRESHOLD = 0.15;
const DEFAULT_ROOT_MARGIN = "0px 0px -10% 0px";

// Reveals once and stops observing: replaying the animation every time an
// already-seen section re-enters the viewport reads as noisy, not delightful.
export function useScrollReveal<T extends Element>({
  threshold = DEFAULT_THRESHOLD,
  rootMargin = DEFAULT_ROOT_MARGIN,
}: ScrollRevealOptions = {}) {
  const elementRef = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return;
    }

    let observer: IntersectionObserver | null = null;
    let unsubscribeIntro: (() => void) | null = null;

    // The home page's content sits in the DOM (and in-viewport) underneath
    // the intro overlay while it plays, so starting the observer right away
    // would let it fire — and finish animating — while still hidden behind
    // the overlay. Wait for the intro to actually close before observing.
    const startObserving = () => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setIsVisible(true);
            observer?.unobserve(element);
          }
        },
        { threshold, rootMargin },
      );
      observer.observe(element);
    };

    if (isIntroActive()) {
      unsubscribeIntro = subscribeIntroActive(() => {
        if (isIntroActive()) return;
        unsubscribeIntro?.();
        unsubscribeIntro = null;
        startObserving();
      });
    } else {
      startObserving();
    }

    return () => {
      observer?.disconnect();
      unsubscribeIntro?.();
    };
  }, [threshold, rootMargin]);

  return { elementRef, isVisible };
}