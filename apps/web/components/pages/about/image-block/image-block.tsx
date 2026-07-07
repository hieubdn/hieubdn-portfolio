import Image from "next/image";

import profileImg from "@/assets/image/profile-block/hieubdn.jpg";
import { Reveal } from "@/components/ui/reveal";

import styles from "./image-block.module.scss";

export default function ImageBlock() {
  return (
    <div className={styles.root}>
      <Reveal as="div" variant="scale" className={styles.frame}>
        <Image
          src={profileImg}
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 28vw"
          className={styles.image}
          priority
        />
      </Reveal>
    </div>
  );
}
