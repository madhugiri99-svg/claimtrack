import { usePageTitle } from '../layout/usePageTitle';
import { ClaimsList } from './ClaimsList';
import styles from './Page.module.css';

export function MyClaimsPage() {
  const headingRef = usePageTitle('My claims');
  return (
    <div className={styles.page}>
      <ClaimsList headingLevel="h1" headingRef={headingRef} />
    </div>
  );
}
