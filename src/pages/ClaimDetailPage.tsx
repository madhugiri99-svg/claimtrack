import { Link, useParams } from 'react-router';
import { ApiError } from '../api/client';
import { useClaim } from '../api/queries';
import type { Claim, ClaimDocument } from '../api/types';
import { Alert } from '../components/Alert/Alert';
import { Button } from '../components/Button/Button';
import { buttonClassName } from '../components/Button/buttonClassName';
import { DocumentRow } from '../components/DocumentRow/DocumentRow';
import { Icon } from '../components/Icon/Icon';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { StatusBadge } from '../components/StatusBadge/StatusBadge';
import { Timeline } from '../components/Timeline/Timeline';
import { usePageTitle } from '../layout/usePageTitle';
import { claimTypeLabel, formatDate, formatMoney } from '../utils/format';
import page from './Page.module.css';
import styles from './ClaimDetailPage.module.css';

export function ClaimDetailPage() {
  const { id = '' } = useParams();
  const claim = useClaim(id);
  const headingRef = usePageTitle(claim.data ? claim.data.title : `Claim ${id}`, claim.isSuccess);

  if (claim.isPending) return <DetailSkeleton />;

  if (claim.isError) {
    const notFound = claim.error instanceof ApiError && claim.error.status === 404;
    return (
      <div className={page.page}>
        <BackLink to="/claims" label="All claims" />
        <Alert type="error" title={notFound ? 'Claim not found' : 'We couldn’t load this claim'}>
          {claim.error.message}
        </Alert>
        {!notFound && (
          <Button variant="secondary" onClick={() => claim.refetch()}>
            Try again
          </Button>
        )}
      </div>
    );
  }

  const c = claim.data;
  const neededDoc = c.documents.find((d) => d.required && d.status === 'needed');

  return (
    <div className={page.page}>
      <BackLink to="/claims" label="All claims" />

      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <div className={styles.meta}>
            <span>
              {claimTypeLabel(c.type)} · {c.id}
            </span>
            <StatusBadge status={c.status} />
          </div>
          <h1 ref={headingRef} tabIndex={-1} className={page.title}>
            {c.title}
          </h1>
          <p className={page.subtitle}>
            Incident {formatDate(c.incidentDate)} · Filed {formatDate(c.filedDate)}
          </p>
        </div>
        {neededDoc && (
          <div className={styles.headerAction}>
            <Link
              to={`/claims/${c.id}/upload/${neededDoc.id}`}
              className={buttonClassName('primary')}
            >
              Upload {neededDoc.name.toLowerCase()}
            </Link>
          </div>
        )}
      </div>

      {neededDoc && (
        // Phone: the warning comes first, then a full-width button (matches the Figma mobile frame).
        <div className={styles.action}>
          <Alert type="warning" title={`We need your ${neededDoc.name.toLowerCase()}`}>
            Upload it{neededDoc.dueDate ? ` by ${formatDate(neededDoc.dueDate)}` : ''} so we can
            schedule your payment.
          </Alert>
          <Link
            to={`/claims/${c.id}/upload/${neededDoc.id}`}
            className={`${buttonClassName('primary', true)} ${styles.mobileAction}`}
          >
            Upload {neededDoc.name.toLowerCase()}
          </Link>
        </div>
      )}

      <div className={styles.grid}>
        <section className={`${styles.card} ${styles.timeline}`} aria-labelledby="progress-heading">
          <h2 id="progress-heading" className={styles.cardTitle}>
            Claim progress
          </h2>
          <Timeline steps={c.timeline} />
        </section>

        <div className={styles.details}>
          {c.decision ? <DecisionCard claim={c} /> : <PayoutCard claim={c} />}
          <AdjusterCard claim={c} />
        </div>

        <section className={styles.documents} aria-labelledby="docs-heading">
          <h2 id="docs-heading" className={styles.cardTitle}>
            Documents
          </h2>
          <ul className={styles.docList}>
            {c.documents.map((d) => (
              <li key={d.id}>
                <DocumentRow {...documentRowProps(d)} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function documentRowProps(d: ClaimDocument) {
  if (d.status === 'needed') {
    return {
      name: d.name,
      detail: `Required${d.dueDate ? ` · due ${formatDate(d.dueDate)}` : ''}`,
      status: 'pending' as const,
      statusLabel: 'Needed',
    };
  }
  const when = d.receivedDate ? `Received ${formatDate(d.receivedDate)}` : 'Received';
  return {
    name: d.name,
    detail: d.fileName ? `${d.fileName} · ${when}` : when,
    status: d.status === 'in_review' ? ('review' as const) : ('approved' as const),
    statusLabel: d.status === 'in_review' ? 'In review' : 'Received',
  };
}

function PayoutCard({ claim }: { claim: Claim }) {
  const p = claim.payout;
  return (
    <section className={styles.card} aria-labelledby="payout-heading">
      <h2 id="payout-heading" className={styles.cardTitle}>
        Payout
      </h2>
      {p.estimate === null ? (
        <p className={styles.muted}>
          We’ll show your payout here once your adjuster finishes the review.
        </p>
      ) : (
        <>
          <dl className={styles.rows}>
            <div className={styles.row}>
              <dt>{p.estimateConfirmed ? 'Approved estimate' : 'Preliminary estimate'}</dt>
              <dd>{formatMoney(p.estimate)}</dd>
            </div>
            <div className={styles.row}>
              <dt>Your deductible</dt>
              <dd>
                <span aria-hidden="true">− </span>
                <span className="visually-hidden">minus </span>
                {formatMoney(p.deductible)}
              </dd>
            </div>
            {p.amount !== null && (
              <div className={`${styles.row} ${styles.total}`}>
                <dt>{p.paidDate ? 'Paid' : 'Expected payout'}</dt>
                <dd>{formatMoney(p.amount)}</dd>
              </div>
            )}
          </dl>
          <p className={styles.note}>
            {p.paidDate
              ? `Paid by ${p.method.toLowerCase()} on ${formatDate(p.paidDate)}.`
              : `Paid by ${p.method.toLowerCase()}${p.expectedDate ? `, expected by ${formatDate(p.expectedDate)}` : ''}.`}
            {!p.estimateConfirmed &&
              ' The amount may change after your repair estimate is reviewed.'}
          </p>
        </>
      )}
    </section>
  );
}

function DecisionCard({ claim }: { claim: Claim }) {
  const d = claim.decision!;
  return (
    <section className={`${styles.card} ${styles.decision}`} aria-labelledby="decision-heading">
      <h2 id="decision-heading" className={styles.cardTitle}>
        Why this claim was denied
      </h2>
      <p>{d.reason}</p>
      <p className={styles.muted}>Based on {d.policySection}.</p>
      <div className={styles.appeal}>
        <p className={styles.appealTitle}>You can appeal until {formatDate(d.appealBy)}</p>
        <p className={styles.muted}>
          If you have new information, like a roofer’s report, contact your adjuster to start an
          appeal.
        </p>
      </div>
    </section>
  );
}

function AdjusterCard({ claim }: { claim: Claim }) {
  const a = claim.adjuster;
  return (
    <section className={styles.card} aria-labelledby="adjuster-heading">
      <h2 id="adjuster-heading" className={styles.cardTitle}>
        Your adjuster
      </h2>
      <div>
        <p className={styles.strong}>{a.name}</p>
        <p className={styles.muted}>{a.responseTime}</p>
      </div>
      <div className={styles.contact}>
        <a
          href={`tel:${a.phone.replace(/[^\d+]/g, '')}`}
          className={buttonClassName('secondary', true)}
        >
          <Icon name="phone" size={20} />
          Call<span className="visually-hidden"> {a.name}</span>
        </a>
        <a href={`mailto:${a.email}`} className={buttonClassName('secondary', true)}>
          <Icon name="mail" size={20} />
          Email<span className="visually-hidden"> {a.name}</span>
        </a>
      </div>
    </section>
  );
}

function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className={page.backLink}>
      <Icon name="chevron-left" size={20} />
      {label}
    </Link>
  );
}

function DetailSkeleton() {
  return (
    <div className={page.page} aria-busy="true">
      <p className="visually-hidden" role="status">
        Loading claim…
      </p>
      <Skeleton width={120} height={20} />
      <Skeleton width="60%" height={32} />
      <div className={styles.grid}>
        <Skeleton height={320} radius="var(--radius-lg)" />
        <Skeleton height={320} radius="var(--radius-lg)" />
        <Skeleton height={320} radius="var(--radius-lg)" />
      </div>
    </div>
  );
}
