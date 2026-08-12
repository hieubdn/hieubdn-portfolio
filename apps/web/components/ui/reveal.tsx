"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";
import { useEffect, useState } from "react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

import styles from "./reveal.module.scss";

export type RevealVariant = "up" | "down" | "fade" | "left" | "right" | "scale" | "random";

type ResolvedRevealVariant = Exclude<RevealVariant, "random">;

// The 4 directions "random" picks from — fade/scale are looks, not directions.
const RANDOM_DIRECTIONS: readonly ResolvedRevealVariant[] = ["up", "down", "left", "right"];

function pickRandomDirection(): ResolvedRevealVariant {
  return RANDOM_DIRECTIONS[Math.floor(Math.random() * RANDOM_DIRECTIONS.length)]!;
}

const VARIANT_CLASS_NAME: Record<ResolvedRevealVariant, string | undefined> = {
  up: styles.revealUp,
  down: styles.revealDown,
  fade: styles.revealFade,
  left: styles.revealLeft,
  right: styles.revealRight,
  scale: styles.revealScale,
};

type RevealOwnProps<T extends ElementType> = {
  as?: T;
  variant?: RevealVariant;
  delayMs?: number;
  threshold?: number;
  className?: string;
  children: ReactNode;
};

type RevealProps<T extends ElementType> = RevealOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps<T>>;

// Shared scroll-triggered entrance animation. Renders as `as` (default "div")
// with no extra wrapper element, so it can sit directly on CSS grid items
// (e.g. the home/about/projects block grids) without breaking `grid-area`.
export function Reveal<T extends ElementType = "div">({
  as,
  variant = "random",
  delayMs = 0,
  threshold,
  className = "",
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const { elementRef, isVisible } = useScrollReveal<Element>({ threshold });

  // "random" must resolve to a fixed direction per instance, but not via
  // Math.random() during render — that would pick a different class on the
  // server vs. the client and trip a hydration mismatch. Render a stable
  // fallback first, then randomize once the client has mounted.
  const [resolvedVariant, setResolvedVariant] = useState<ResolvedRevealVariant>(
    variant === "random" ? "up" : variant,
  );

  useEffect(() => {
    setResolvedVariant(variant === "random" ? pickRandomDirection() : variant);
  }, [variant]);

  const revealClassName = [
    styles.reveal,
    VARIANT_CLASS_NAME[resolvedVariant],
    isVisible ? styles.isVisible : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const revealStyle: CSSProperties = {
    ...style,
    ["--reveal-delay" as string]: `${delayMs}ms`,
  };

  return (
    <Component ref={elementRef} className={revealClassName} style={revealStyle} {...rest}>
      {children}
    </Component>
  );
}