import styles from './Skeleton.module.css';

type SkeletonProps = { height?: number | string; width?: number | string; radius?: string };

/** Placeholder block shown while data loads. Hidden from screen readers; pages announce loading in text. */
export function Skeleton({
  height = 16,
  width = '100%',
  radius = 'var(--radius-md)',
}: SkeletonProps) {
  return (
    <span
      className={styles.skeleton}
      style={{ height, width, borderRadius: radius }}
      aria-hidden="true"
    />
  );
}
