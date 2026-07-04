"use client";

import { useEffect, useRef } from "react";

import { useLocaleText } from "@/components/layout/setting/translate/locale-provider";
import hdwebsoftLogo from "@/assets/image/company/hdwebsoft.png";
import fidovnLogo from "@/assets/image/company/fidovn.jpg";
import phase2Logo from "@/assets/image/company/Phase2.png";
import mindxLogo from "@/assets/image/company/mindx.png";
import optoroLogo from "@/assets/image/company/optoro.jpg";
import styles from "./company.module.scss";

const MARQUEE_DURATION_SEC = 10;

const COMPANIES = [
  { id: "hdwebsoft", label: "HDWEBSOFT", logo: hdwebsoftLogo },
  { id: "fidovn", label: "FidoVN", logo: fidovnLogo },
  { id: "mindx", label: "MindX", logo: mindxLogo },
  { id: "optoro", label: "Optoro", logo: optoroLogo },
  { id: "phase2", label: "Phase2", logo: phase2Logo },
] as const;

type CompanyId = (typeof COMPANIES)[number]["id"];

const LOGO_CLASS = {
  hdwebsoft: styles.logoHdwebsoft,
  fidovn: styles.logoFidovn,
  mindx: styles.logoMindx,
  optoro: styles.logoOptoro,
  phase2: styles.logoPhase2,
} as Record<CompanyId, string>;

function CompanyMarqueeSegment({ repeatIndex }: { repeatIndex: number }) {
  return (
    <div className={styles.segment}>
      {COMPANIES.map((company) => (
        // Marquee: plain img avoids SSR/client mismatch from next/image in this layout.
        // eslint-disable-next-line @next/next/no-img-element -- intentional for hydration-stable markup
        <img
          key={`${repeatIndex}-${company.id}`}
          src={company.logo.src}
          width={company.logo.width}
          height={company.logo.height}
          alt={company.label}
          className={`${styles.logoCompany} ${LOGO_CLASS[company.id]}`}
          decoding="async"
          loading="lazy"
          draggable={false}
        />
      ))}
    </div>
  );
}

export default function CompanyBlock() {
  const { t } = useLocaleText();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let rafId = 0;
    let offsetPx = 0;
    let lastTime: number | null = null;

    const loopWidth = () => {
      const w = track.scrollWidth;
      return w > 0 ? w / 2 : 0;
    };

    const tick = (now: number) => {
      if (document.visibilityState === "hidden") {
        lastTime = null;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const lw = loopWidth();
      if (lw <= 0) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (lastTime === null) lastTime = now;
      const dt = Math.min((now - lastTime) / 1000, 0.064);
      lastTime = now;

      const speed = lw / MARQUEE_DURATION_SEC;
      offsetPx = (offsetPx + speed * dt) % lw;
      track.style.transform = `translate3d(${-offsetPx}px, 0, 0)`;

      rafId = requestAnimationFrame(tick);
    };

    const ro = new ResizeObserver(() => {
      const lw = loopWidth();
      if (lw > 0) offsetPx %= lw;
    });
    ro.observe(track);

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  return (
    <div className={styles.root} aria-label={t("company.block.ariaLabel")}>
      <section className={styles.marqueeSection}>
        <div className={styles.viewport} aria-hidden>
          <div ref={trackRef} className={styles.track}>
            <CompanyMarqueeSegment repeatIndex={0} />
            <CompanyMarqueeSegment repeatIndex={1} />
          </div>
        </div>
      </section>
      <p className={styles.footer}>{t("company.block.footer")}</p>
    </div>
  );
}
