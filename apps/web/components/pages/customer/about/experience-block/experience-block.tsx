import styles from "./experience-block.module.scss";

type Props = {
  title: string;
  body: string;
};

export default function ExperienceBlock({ title, body }: Props) {
  return (
    <div className={styles.root}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.body}>{body}</p>
    </div>
  );
}
