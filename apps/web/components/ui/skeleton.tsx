import styles from "./skeleton.module.scss";

type SkeletonProps = {
  className?: string;
  "aria-hidden"?: boolean;
};

export function Skeleton({ className = "", ...rest }: SkeletonProps) {
  return (
    <div
      className={`${styles.skeleton} ${className}`.trim()}
      {...rest}
    />
  );
}
