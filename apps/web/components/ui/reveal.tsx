"use client";

import type {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementType,
  ReactNode,
} from "react";

import { useScrollReveal } from "@/hooks/use-scroll-reveal";

import styles from "./reveal.module.scss";

export type RevealVariant = "up" | "fade" | "left" | "right" | "scale";

const VARIANT_CLASS_NAME: Record<RevealVariant, string | undefined> = {
  up: styles.revealUp,
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
  variant = "up",
  delayMs = 0,
  threshold,
  className = "",
  style,
  children,
  ...rest
}: RevealProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const { elementRef, isVisible } = useScrollReveal<Element>({ threshold });

  const revealClassName = [
    styles.reveal,
    VARIANT_CLASS_NAME[variant],
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