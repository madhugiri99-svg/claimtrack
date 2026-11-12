import type { ReactNode } from 'react';
import { Icon } from '../Icon/Icon';
import { StatusBadge, type ClaimStatus } from '../StatusBadge/StatusBadge';
import styles from './DocumentRow.module.css';

type DocumentRowProps = {
  name: string;
  detail: string;
  status: ClaimStatus;
  statusLabel: string;
  /** Optional action, e.g. an upload button for a needed document. */
  action?: ReactNode;
};

export function DocumentRow({ name, detail, status, statusLabel, action }: DocumentRowProps) {
  return (
    <div className={styles.row}>
      <span className={styles.icon}>
        <Icon name="file" size={20} />
      </span>
      <div className={styles.text}>
        <p className={styles.name}>{name}</p>
        <p className={styles.detail}>{detail}</p>
      </div>
      <StatusBadge status={status} label={statusLabel} />
      {action}
    </div>
  );
}
