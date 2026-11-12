import styles from './StatusBadge.module.css';

export type ClaimStatus = 'approved' | 'pending' | 'denied' | 'review';

const defaultLabels: Record<ClaimStatus, string> = {
  approved: 'Approved',
  pending: 'Pending',
  denied: 'Denied',
  review: 'In review',
};

type StatusBadgeProps = {
  /** Matches the Figma StatusBadge "Status" property. */
  status: ClaimStatus;
  /** Override the visible text, e.g. "Needed" or "Received" for documents. */
  label?: string;
};

/** Status is always carried by the text label; the color and dot only reinforce it. */
export function StatusBadge({ status, label }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[status]}`}>
      <span className={styles.dot} aria-hidden="true" />
      {label ?? defaultLabels[status]}
    </span>
  );
}
