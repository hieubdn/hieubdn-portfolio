import type { ReactNode } from "react";

import { TestimonialGlobe } from "./testimonial-globe";
import type { GlobeMarker } from "./testimonial-globe-data";
import styles from "./testimonial-globe-section.module.scss";

type TestimonialGlobeSectionProps = {
  title: ReactNode;
  subtitle: ReactNode;
  markers?: GlobeMarker[];
  className?: string;
};

export function TestimonialGlobeSection({
  title,
  subtitle,
  markers,
  className = "",
}: TestimonialGlobeSectionProps) {
  return (
    <div className={`${styles.root} ${className}`}>
      <div className={styles.copy}>
        <h2 className={styles.title}>{title}.</h2>
        <span className={styles.subtitle}>{subtitle}</span>
      </div>
      <TestimonialGlobe markers={markers} />
    </div>
  );
}
