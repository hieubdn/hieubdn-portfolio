import styles from "./section-heading.module.scss";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  title: string;
};

export default function SectionHeading({ title }: Props) {
  return (
    <Reveal as="h2" variant="left" className={styles.root}>
      <Reveal as="span" delayMs={40} className={styles.title}>
        {title}
      </Reveal>
    </Reveal>
  );
}
