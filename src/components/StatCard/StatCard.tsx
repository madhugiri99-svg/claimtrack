import styles from './StatCard.module.css';

type StatCardProps = {
  label: string;
  value: string;
  detail?: string;
};

/**
 * Summary metric. Uses a description list so screen readers announce the
 * label and value together ("Open claims, 2, 1 needs your action").
 */
export function StatCard({ label, value, detail }: StatCardProps) {
  return (
    <dl className={styles.card}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{value}</dd>
      {detail && <dd className={styles.detail}>{detail}</dd>}
    </dl>
  );
}
