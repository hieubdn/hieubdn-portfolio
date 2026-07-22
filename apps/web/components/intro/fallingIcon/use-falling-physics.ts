"use client";

import { useEffect, useRef } from "react";

type MatterNamespace = typeof import("matter-js");

// Ported from the vanilla `initFallingText` enhancer (React Bits' FallingText,
// re-implemented on matter-js): chips are server-rendered, readable, and
// SEO-visible before any physics runs. On trigger, each chip's real
// `getBoundingClientRect()` becomes a matching Matter body — so it "breaks
// off" from exactly where it was standing, not from an arbitrary spawn point.
// Every animation frame, the body's position/angle is written straight back
// into the DOM element's style — matter-js only supplies the numbers, the
// pixels the user sees are the real `<img>` chips.

const WALL_THICKNESS = 50;
const WALL_OFFSET = WALL_THICKNESS / 2;
const RESIZE_DEBOUNCE_MS = 200;

type FallingPhysicsOptions = {
  gravity?: number;
  stiffness?: number;
  // Whether the section is currently the active/visible one (T2 on screen,
  // as opposed to covered by T1). Toggling this off and back on tears down
  // and re-arms everything below, so the fall replays every time the section
  // becomes visible again — not just the very first time.
  active?: boolean;
};

export function useFallingPhysics({
  gravity = 0.9,
  stiffness = 0.9,
  active = true,
}: FallingPhysicsOptions = {}) {
  const stageRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const canvasHostRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const stage = stageRef.current;
    const target = targetRef.current;
    const canvasHost = canvasHostRef.current;
    const banner = bannerRef.current;
    if (!stage || !target || !canvasHost || !active) return;

    let disposed = false;
    let cleanupPhysics: (() => void) | null = null;

    // The reveal banner drags independently of the physics bodies: the
    // pointer offset is carried in --drag-x/--drag-y and layered on top of
    // the CSS centring transform. stopPropagation keeps matter-js's mouse
    // constraint from grabbing a chip underneath at the same time.
    let removeDragListeners: (() => void) | null = null;
    if (banner) {
      let dragging = false;
      let startX = 0;
      let startY = 0;
      let baseX = 0;
      let baseY = 0;
      const readVar = (name: string) =>
        Number.parseFloat(banner.style.getPropertyValue(name)) || 0;

      const onPointerDown = (e: PointerEvent) => {
        e.preventDefault();
        e.stopPropagation();
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        baseX = readVar("--drag-x");
        baseY = readVar("--drag-y");
        banner.dataset.dragging = "true";
        banner.setPointerCapture(e.pointerId);
      };
      const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        banner.style.setProperty("--drag-x", `${baseX + (e.clientX - startX)}px`);
        banner.style.setProperty("--drag-y", `${baseY + (e.clientY - startY)}px`);
      };
      const endDrag = (e: PointerEvent) => {
        if (!dragging) return;
        dragging = false;
        delete banner.dataset.dragging;
        try {
          banner.releasePointerCapture(e.pointerId);
        } catch {
          // pointer already released
        }
      };

      banner.addEventListener("pointerdown", onPointerDown);
      banner.addEventListener("pointermove", onPointerMove);
      banner.addEventListener("pointerup", endDrag);
      banner.addEventListener("pointercancel", endDrag);

      removeDragListeners = () => {
        banner.removeEventListener("pointerdown", onPointerDown);
        banner.removeEventListener("pointermove", onPointerMove);
        banner.removeEventListener("pointerup", endDrag);
        banner.removeEventListener("pointercancel", endDrag);
      };
    }

    const reveal = () => {
      if (banner) banner.dataset.visible = "true";
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      // No physics for reduced-motion visitors — just show the banner.
      reveal();
      return () => {
        removeDragListeners?.();
      };
    }

    // Rebuilds the whole world from a fresh `getBoundingClientRect()` of the
    // stage. Called on first trigger and again (torn down + recreated) on
    // resize, so the render canvas and the floor/walls never drift out of
    // sync with however tall `.fallingStage` actually is right now.
    const buildWorld = (Matter: MatterNamespace) => {
      cleanupPhysics?.();
      cleanupPhysics = null;

      const rect = stage.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      if (width <= 0 || height <= 0) return;

      const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint, Body } =
        Matter;

      const engine = Engine.create();
      engine.world.gravity.y = gravity;

      const render = Render.create({
        element: canvasHost,
        engine,
        options: { width, height, background: "transparent", wireframes: false },
      });
      // Matter sizes the canvas element to the `options` snapshot above and
      // never touches it again; stretch it to the host div's current box so
      // it can never drift shorter/taller than `.fallingStage` itself.
      render.canvas.style.width = "100%";
      render.canvas.style.height = "100%";

      const wall = { isStatic: true, render: { fillStyle: "transparent" } };
      const floor = Bodies.rectangle(
        width / 2,
        height + WALL_OFFSET,
        width,
        WALL_THICKNESS,
        wall,
      );
      const leftWall = Bodies.rectangle(
        -WALL_OFFSET,
        height / 2,
        WALL_THICKNESS,
        height,
        wall,
      );
      const rightWall = Bodies.rectangle(
        width + WALL_OFFSET,
        height / 2,
        WALL_THICKNESS,
        height,
        wall,
      );
      const ceiling = Bodies.rectangle(
        width / 2,
        -WALL_OFFSET,
        width,
        WALL_THICKNESS,
        wall,
      );

      const chipEls = Array.from(
        target.querySelectorAll<HTMLElement>("[data-falling-chip]"),
      );
      const bodies = chipEls.map((elem) => {
        const r = elem.getBoundingClientRect();
        const x = r.left - rect.left + r.width / 2;
        const y = r.top - rect.top + r.height / 2;
        const body = Bodies.rectangle(x, y, r.width, r.height, {
          restitution: 0.8,
          frictionAir: 0.01,
          friction: 0.2,
          render: { fillStyle: "transparent" },
        });
        Body.setVelocity(body, { x: (Math.random() - 0.5) * 5, y: 0 });
        Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.05);
        return { elem, body };
      });

      for (const { elem } of bodies) {
        elem.style.position = "absolute";
        elem.style.margin = "0";
      }

      const mouse = Mouse.create(stage);
      // Don't let the physics surface swallow page/section scroll.
      const mouseEvents = mouse as unknown as {
        element: HTMLElement;
        mousewheel: EventListenerOrEventListenerObject;
      };
      mouseEvents.element.removeEventListener("wheel", mouseEvents.mousewheel);
      mouseEvents.element.removeEventListener(
        "DOMMouseScroll",
        mouseEvents.mousewheel,
      );
      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: { stiffness, render: { visible: false } },
      });
      render.mouse = mouse;

      World.add(engine.world, [
        floor,
        leftWall,
        rightWall,
        ceiling,
        mouseConstraint,
        ...bodies.map((b) => b.body),
      ]);

      const runner = Runner.create();
      Runner.run(runner, engine);
      Render.run(render);

      // Fades in the moment the icons start dropping — no waiting for the
      // pile to settle.
      reveal();

      let rafId = 0;
      const loop = () => {
        for (const { body, elem } of bodies) {
          elem.style.left = `${body.position.x}px`;
          elem.style.top = `${body.position.y}px`;
          elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
        }
        rafId = requestAnimationFrame(loop);
      };
      loop();

      cleanupPhysics = () => {
        cancelAnimationFrame(rafId);
        Runner.stop(runner);
        Render.stop(render);
        render.canvas.remove();
        render.textures = {};
        World.clear(engine.world, false);
        Engine.clear(engine);

        // Reset chips back to their plain server-rendered layout and hide
        // the banner again, so the next `buildWorld()` (next time this
        // section becomes active) measures the real top-of-stage rect and
        // replays the fall from scratch instead of from wherever it landed.
        for (const { elem } of bodies) {
          elem.style.position = "";
          elem.style.left = "";
          elem.style.top = "";
          elem.style.margin = "";
          elem.style.transform = "";
        }
        if (banner) {
          delete banner.dataset.visible;
          banner.style.removeProperty("--drag-x");
          banner.style.removeProperty("--drag-y");
        }
      };
    };

    let matterModule: MatterNamespace | null = null;
    let resizeTimer: number | undefined;
    const onResize = () => {
      if (!matterModule) return;
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (matterModule) buildWorld(matterModule);
      }, RESIZE_DEBOUNCE_MS);
    };

    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      void (async () => {
        matterModule = (await import("matter-js")).default;
        if (disposed) return;
        buildWorld(matterModule);
        window.addEventListener("resize", onResize);
      })();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      // Fire once the stage has scrolled up into roughly the top half of the
      // viewport, not the moment it peeks in from the bottom.
      { threshold: 0, rootMargin: "0px 0px -45% 0px" },
    );
    observer.observe(stage);

    return () => {
      disposed = true;
      observer.disconnect();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      removeDragListeners?.();
      cleanupPhysics?.();
    };
  }, [gravity, stiffness, active]);

  return { stageRef, targetRef, canvasHostRef, bannerRef };
}
