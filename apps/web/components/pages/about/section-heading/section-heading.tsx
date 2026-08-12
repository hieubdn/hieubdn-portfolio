import styles from "./section-heading.module.scss";
import { Reveal } from "@/components/ui/reveal";

type Props = {
  title: string;
};

export default function SectionHeading({ title }: Props) {
  return (
    <Reveal as="h2" variant="left" className={styles.root}>
      <span className={styles.title}>{title}</span>
    </Reveal>
  );
}
