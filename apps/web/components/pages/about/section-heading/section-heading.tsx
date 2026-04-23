import styles from "./section-heading.module.scss";

type Props = {
  title: string;
};

export default function SectionHeading({ title }: Props) {
  return (
    <h2 className={styles.root}>
      <span className={styles.inner}>{title}</span>
    </h2>
  );
}
