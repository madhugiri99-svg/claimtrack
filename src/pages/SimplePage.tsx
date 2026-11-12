import { Link } from 'react-router';
import { usePageTitle } from '../layout/usePageTitle';
import styles from './Page.module.css';

type SimplePageProps = { title: string; message: string };

/** Used for pages outside the MVP scope (Documents, Help) and for unknown URLs. */
export function SimplePage({ title, message }: SimplePageProps) {
  const headingRef = usePageTitle(title);
  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
          {title}
        </h1>
        <p className={styles.subtitle}>{message}</p>
      </div>
      <p>
        <Link to="/">Back to overview</Link>
      </p>
    </div>
  );
}
