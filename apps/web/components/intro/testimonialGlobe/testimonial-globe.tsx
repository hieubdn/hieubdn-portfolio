"use client";

import { TESTIMONIAL_GLOBE_MARKERS, type GlobeMarker } from "./testimonial-globe-data";
import { useTestimonialGlobe } from "./use-testimonial-globe";
import styles from "./testimonial-globe.module.scss";

type TestimonialGlobeProps = {
  markers?: GlobeMarker[];
};

export function TestimonialGlobe({
  markers = TESTIMONIAL_GLOBE_MARKERS,
}: TestimonialGlobeProps) {
  const { wrapRef, canvasRef } = useTestimonialGlobe({ markers });

  return (
    <div className={styles.globeWrap} ref={wrapRef}>
      <canvas ref={canvasRef} className={styles.globeCanvas} aria-hidden="true" />
    </div>
  );
}
