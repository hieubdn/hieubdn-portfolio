"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef } from "react";

import amazonIcon from "@/assets/image/skill/amazon-icon.svg";
import datadogIcon from "@/assets/image/skill/datadoghq-icon.svg";
import dockerIcon from "@/assets/image/skill/docker-icon.svg";
import drupalIcon from "@/assets/image/skill/drupal-icon.svg";
import expressIcon from "@/assets/image/skill/expressjs-icon.svg";
import figmaIcon from "@/assets/image/skill/figma-icon.svg";
import flutterIcon from "@/assets/image/skill/flutterio-icon.svg";
import gcpIcon from "@/assets/image/skill/google_cloud-icon.svg";
import mongoIcon from "@/assets/image/skill/mongodb-icon.svg";
import mysqlIcon from "@/assets/image/skill/mysql-icon.svg";
import nestIcon from "@/assets/image/skill/nestjs-icon.svg";
import nextIcon from "@/assets/image/skill/nextjs-icon.svg";
import nodeIcon from "@/assets/image/skill/nodejs-icon.svg";
import postgresIcon from "@/assets/image/skill/postgresql-icon.svg";
import pythonIcon from "@/assets/image/skill/python-icon.svg";
import reactIcon from "@/assets/image/skill/reactjs-icon.svg";
import serverlessIcon from "@/assets/image/skill/serverless-icon.svg";
import starIcon from "@/assets/image/skill/star1.svg";
import tsIcon from "@/assets/image/skill/typescriptlang-icon.svg";

import styles from "./skill.module.scss";

const MARQUEE_DURATION_SEC = 48;

const SKILLS = [
    { name: "React", icon: reactIcon },
    { name: "Next.js", icon: nextIcon },
    { name: "TypeScript", icon: tsIcon },
    { name: "Node.js", icon: nodeIcon },
    { name: "NestJS", icon: nestIcon },
    { name: "Express", icon: expressIcon },
    { name: "Python", icon: pythonIcon },
    { name: "Flutter", icon: flutterIcon },
    { name: "Docker", icon: dockerIcon },
    { name: "PostgreSQL", icon: postgresIcon },
    { name: "MySQL", icon: mysqlIcon },
    { name: "MongoDB", icon: mongoIcon },
    { name: "Amazon Web Services", icon: amazonIcon },
    { name: "Google Cloud", icon: gcpIcon },
    { name: "Serverless", icon: serverlessIcon },
    { name: "Datadog", icon: datadogIcon },
    { name: "Figma", icon: figmaIcon },
    { name: "Drupal", icon: drupalIcon },
] as const;

function SkillMarqueeSegment() {
    return (
        <div className={styles.segment}>
            {SKILLS.map((skill) => (
                <Fragment key={skill.name}>
                    <Image
                        src={starIcon}
                        alt=""
                        width={18}
                        height={18}
                        className={styles.star}
                        unoptimized
                    />
                    <div className={styles.skillDetail}>
                        <Image
                            src={skill.icon}
                            alt=""
                            width={32}
                            height={32}
                            className={styles.logo}
                            unoptimized
                        />
                        <span className={styles.name}>{skill.name}</span>
                    </div>
                </Fragment>
            ))}
        </div>
    );
}

export default function SkillSection() {
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
        <section
            className={styles.skillSection}
            aria-label="Kỹ năng và công nghệ"
        >
            <div className={styles.viewport} aria-hidden>
                <div ref={trackRef} className={styles.track}>
                    <SkillMarqueeSegment />
                    <SkillMarqueeSegment />
                </div>
            </div>
        </section>
    );
}
