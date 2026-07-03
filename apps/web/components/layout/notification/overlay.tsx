import styles from "./notification.module.scss";

type OverlayProps = {
  open: boolean;
  onClose: () => void;
};

export function Overlay({ open, onClose }: OverlayProps) {
  return (
    <div
      role="presentation"
      className={styles.overlay}
      data-open={open ? "true" : "false"}
      onClick={onClose}
    />
  );
}
