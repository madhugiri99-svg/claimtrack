import type { ReactNode } from 'react';
import styles from './Alert.module.css';

export type AlertType = 'info' | 'warning' | 'error' | 'success';

type AlertProps = {
  /** Matches the Figma Alert "Type" property. */
  type: AlertType;
  title: string;
  children: ReactNode;
  /**
   * Set to true only when the alert appears in response to something the user
   * just did (a failed upload, a saved form). Then warnings and errors use
   * role="alert" (announced immediately) and info/success use role="status"
   * (announced politely).
   *
   * Leave false for alerts that are already on the page when it loads, such as
   * an "Action needed" banner. Those are read as normal content, so screen
   * reader users aren't interrupted every time the page opens.
   */
  announce?: boolean;
  className?: string;
};

export function Alert({ type, title, children, announce = false, className }: AlertProps) {
  const urgent = type === 'warning' || type === 'error';
  const role = announce ? (urgent ? 'alert' : 'status') : undefined;

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
