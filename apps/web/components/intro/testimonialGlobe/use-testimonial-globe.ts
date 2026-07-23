"use client";

import { useEffect, useRef } from "react";

import type { Globe } from "cobe";

import type { GlobeMarker } from "./testimonial-globe-data";

const PHI_STEP = 0.004;
const THETA = 0.28;
const MAP_SAMPLES = 16000;
const MAX_DEVICE_PIXEL_RATIO = 2;

type UseTestimonialGlobeOptions = {
  markers: GlobeMarker[];
};

export function useTestimonialGlobe({ markers }: UseTestimonialGlobeOptions) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let disposed = false;
    let globe: Globe | null = null;
    let rafId = 0;
    let phi = 0;
    let width = 0;

    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let reduceMotion = reducedMotionQuery.matches;
    const onMotionChange = (e: MediaQueryListEvent) => {
      reduceMotion = e.matches;
    };
    reducedMotionQuery.addEventListener("change", onMotionChange);

    const stopLoop = () => {
      if (!rafId) return;
      cancelAnimationFrame(rafId);
      rafId = 0;
    };

    const render = () => {
      if (!reduceMotion) phi += PHI_STEP;
      globe?.update({ phi, width, height: width });
      rafId = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(render);
    };

    const currentDpr = () => Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);

    const resizeCanvas = () => {
      const dpr = currentDpr();
      width = wrap.offsetWidth * dpr;
      canvas.width = width;
      canvas.height = width;
      globe?.update({ width, height: width });
    };

    let resizeObserver: ResizeObserver | null = null;

    const buildGlobe = async () => {
      const { default: createGlobe } = await import("cobe");
      if (disposed) return;

      const dpr = currentDpr();
      width = wrap.offsetWidth * dpr;
      canvas.width = width;
      canvas.height = width;

      globe = createGlobe(canvas, {
        width,
        height: width,
        phi,
        theta: THETA,
        mapSamples: MAP_SAMPLES,
        mapBrightness: 6,
        baseColor: [0.94, 0.94, 0.96],
        markerColor: [0.31, 0.98, 0.08],
        glowColor: [0.94, 0.94, 0.96],
        dark: 0,
        diffuse: 1.2,
        devicePixelRatio: dpr,
        markers: markers.map((marker) => ({
          location: marker.location,
          size: marker.size,
        })),
      });

      resizeObserver = new ResizeObserver(resizeCanvas);
      resizeObserver.observe(wrap);

      startLoop();
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      void buildGlobe();
    };

    const scrollAncestor = (() => {
      let node = wrap.parentElement;
      while (node) {
        if (node.scrollHeight > node.clientHeight + 1) return node;
        node = node.parentElement;
      }
      return null;
    })();

    const isWrapVisible = () => {
      const r = wrap.getBoundingClientRect();
      return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
    };

    const onManualCheck = () => {
      if (isWrapVisible()) start();
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start();
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0, rootMargin: "200px 0px 200px 0px" },
    );

    intersectionObserver.observe(wrap);
    scrollAncestor?.addEventListener("scroll", onManualCheck, { passive: true });
    window.addEventListener("scroll", onManualCheck, { passive: true });
    requestAnimationFrame(onManualCheck);

    return () => {
      disposed = true;
      stopLoop();
      intersectionObserver.disconnect();
      scrollAncestor?.removeEventListener("scroll", onManualCheck);
      window.removeEventListener("scroll", onManualCheck);
      resizeObserver?.disconnect();
      reducedMotionQuery.removeEventListener("change", onMotionChange);
      globe?.destroy();
    };
  }, [markers]);

  return { wrapRef, canvasRef };
}
