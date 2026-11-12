import { Link } from 'react-router';
import { useClaims, useSummary } from '../api/queries';
import { Alert } from '../components/Alert/Alert';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { StatCard } from '../components/StatCard/StatCard';
import { usePageTitle } from '../layout/usePageTitle';
import { formatMoney, formatShortDate } from '../utils/format';
import { ClaimsList } from './ClaimsList';
import styles from './Page.module.css';

export function OverviewPage() {
  const summary = useSummary();
  const actionClaims = useClaims({ sort: 'newest' });
  const headingRef = usePageTitle('Overview');
  const s = summary.data;
  const needsAction = actionClaims.data?.find((c) => c.actionNeeded);

  return (
    <div className={styles.page}>
      <div className={styles.intro}>
        <h1 ref={headingRef} tabIndex={-1} className={styles.title}>
          {s ? `Hi, ${s.firstName}` : 'Overview'}
        </h1>
        <p className={styles.subtitle}>Here’s where your claims stand today.</p>
      </div>

      {needsAction && (
        <Alert type="warning" title="Action needed">
          Claim {needsAction.id} needs your input: {needsAction.nextStep.toLowerCase()}.{' '}
          <Link to={`/claims/${needsAction.id}`}>Go to claim {needsAction.id}</Link>
        </Alert>
      )}

      <section aria-label="Summary">
        {summary.isError ? (
          <Alert type="error" title="We couldn’t load your summary">
            {summary.error.message}
          </Alert>
        ) : (
          <div className={styles.stats}>
            {s ? (
              <>
                <StatCard
                  label="Open claims"
                  value={String(s.openClaims)}
                  detail={
                    s.actionsNeeded
                      ? `${s.actionsNeeded} ${s.actionsNeeded === 1 ? 'needs' : 'need'} your action`
                      : 'Nothing needed from you'
                  }
                />
                <StatCard
                  label="Paid this year"
                  value={formatMoney(s.paidThisYear)}
                  detail={`Across ${s.closedClaimsThisYear} closed ${s.closedClaimsThisYear === 1 ? 'claim' : 'claims'}`}
                />
                <StatCard
                  label="Next payment"
                  value={s.nextPayment ? formatShortDate(s.nextPayment.date) : 'None'}
                  detail={
                    s.nextPayment
                      ? `Expected for ${s.nextPayment.claimId}`
                      : 'No payments scheduled'
                  }
                />
              </>
            ) : (
              [0, 1, 2].map((i) => (
                <div key={i} className={styles.statSkeleton} aria-hidden="true">
                  <Skeleton width="50%" height={14} />
                  <Skeleton width="40%" height={32} />
                  <Skeleton width="70%" height={12} />
                </div>
              ))
            )}
          </div>
        )}
      </section>

      <ClaimsList headingLevel="h2" />
    </div>
  );
}
