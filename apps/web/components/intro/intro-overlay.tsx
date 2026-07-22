"use client";

import { IntroPanelOne } from "./intro-panel-one";
import { IntroPanelTwo } from "./intro-panel-two";
import { useIntroSequence } from "./use-intro-sequence";
import styles from "./intro-overlay.module.scss";

// Full-viewport overlay that sits on top of the already-rendered home page.
// It never changes the route: it only intercepts scroll/touch/keyboard input
// while active, and unmounts once the sequence finishes, letting the home
// page (already sitting underneath, unscrolled) show through.
export function IntroOverlay() {
  const { stage, wrapperRef, t1Ref, t2ScrollRef, goToT2, goHome } =
    useIntroSequence();

  if (stage === "closed") return null;

  const t1Visible = stage === "t1" || stage === "closingToT1";
  const t2Visible = stage !== "t1";
  const isFlyingHome = stage === "closingToHome";

  return (
    <div
      ref={wrapperRef}
      className={`${styles.wrapper} ${isFlyingHome ? styles.flyAway : ""}`}
      role="region"
      aria-label="Intro"
      tabIndex={-1}
    >
      <div
        ref={t1Ref}
        className={`${styles.panel} ${styles.panelT1} ${
          t1Visible ? "" : styles.hiddenUp
        }`}
        aria-hidden={!t1Visible}
        inert={!t1Visible}
      >
        <IntroPanelOne onAdvance={goToT2} />
      </div>
      <div
        className={`${styles.panel} ${styles.panelT2} ${
          t2Visible ? "" : styles.hiddenDown
        }`}
        aria-hidden={!t2Visible}
        inert={!t2Visible}
      >
        <IntroPanelTwo
          scrollRef={t2ScrollRef}
          onFinish={goHome}
          active={t2Visible}
        />
      </div>
    </div>
  );
}
