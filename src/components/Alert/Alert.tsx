import type { ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

type AlertProps = {
  /** Matches the Figma Alert "Type" property. */
  type: AlertType;
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Warnings and errors use role="alert" so they are announced right away;
 * info and success use role="status" so they don't interrupt.
 * The type is also named in the title text, not only by color.
 */
export function Alert({ type, title, children, className }: AlertProps) {
  const role = type === 'warning' || type === 'error' ? 'alert' : 'status';
  return (
    <div role={role} className={[styles.alert, styles[type], className].filter(Boolean).join(' ')}>
      <span className={styles.accent} aria-hidden="true" />
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <div className={styles.message}>{children}</div>
      </div>
    </div>
  );
}
