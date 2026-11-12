import { useDeferredValue, useId, useState } from 'react';
import { Link } from 'react-router';
import { useClaims } from '../api/queries';
import type { ClaimStatus, ClaimSummary } from '../api/types';
import { Alert } from '../components/Alert/Alert';
import { Button } from '../components/Button/Button';
import { ClaimCard } from '../components/ClaimCard/ClaimCard';
import { Icon } from '../components/Icon/Icon';
import { SearchField } from '../components/SearchField/SearchField';
import { Skeleton } from '../components/Skeleton/Skeleton';
import { StatusBadge } from '../components/StatusBadge/StatusBadge';
import { claimTypeLabel, formatDate } from '../utils/format';
import styles from './ClaimsList.module.css';

const statusOptions: { value: ClaimStatus | 'all'; label: string }[] = [
  { value: 'all', label: 'All statuses' },
  { value: 'pending', label: 'Pending' },
  { value: 'review', label: 'In review' },
  { value: 'approved', label: 'Approved' },
  { value: 'denied', label: 'Denied' },
];

const nextStepText = (c: ClaimSummary) =>
  c.status === 'pending' || c.status === 'review' ? `Next step: ${c.nextStep}` : c.nextStep;

type ClaimsListProps = {
  /** Heading level depends on the page: h2 on Overview, h1 on My claims. */
  headingLevel: 'h1' | 'h2';
  headingRef?: React.Ref<HTMLHeadingElement>;
};

export function ClaimsList({ headingLevel: Heading, headingRef }: ClaimsListProps) {
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<ClaimStatus | 'all'>('all');
  const deferredQ = useDeferredValue(q.trim());
  const claims = useClaims({ q: deferredQ, status, sort: 'newest' });
  const headingId = useId();
  const statusId = useId();

  const count = claims.data?.length;
  const filtered = deferredQ !== '' || status !== 'all';

  return (
    <section aria-labelledby={headingId} className={styles.section}>
      <div className={styles.header}>
        <Heading id={headingId} ref={headingRef} tabIndex={-1} className={styles.heading}>
          Your claims{count !== undefined && !filtered ? ` (${count})` : ''}
        </Heading>
        <div className={styles.controls}>
          <SearchField
            label="Search claims"
            placeholder="Claim ID or description"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={styles.search}
          />
          <div className={styles.selectField}>
            <label htmlFor={statusId} className={styles.selectLabel}>
              Status
            </label>
            <select
              id={statusId}
              className={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value as ClaimStatus | 'all')}
            >
              {statusOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Announces result counts politely as people search or filter. */}
      <p className="visually-hidden" aria-live="polite">
        {claims.isSuccess && filtered ? `${count} ${count === 1 ? 'claim' : 'claims'} found` : ''}
      </p>

      {claims.isPending && <ListSkeleton />}

      {claims.isError && (
        <div className={styles.errorBlock}>
          <Alert type="error" title="We couldn’t load your claims" announce>
            {claims.error.message}
          </Alert>
          <Button variant="secondary" onClick={() => claims.refetch()}>
            Try again
          </Button>
        </div>
      )}

      {claims.isSuccess && count === 0 && (
        <div className={styles.empty}>
          <p className={styles.emptyTitle}>No claims match your search</p>
          <p className={styles.emptyText}>Try a different claim ID or clear the status filter.</p>
          <Button
            variant="secondary"
            onClick={() => {
              setQ('');
              setStatus('all');
            }}
          >
            Clear search and filter
          </Button>
        </div>
      )}

      {claims.isSuccess && count !== 0 && (
        <>
          {/* Cards on phone and tablet */}
          <ul className={styles.cardList}>
            {claims.data.map((c) => (
              <li key={c.id}>
                <ClaimCard
                  claimId={c.id}
                  type={claimTypeLabel(c.type)}
                  title={c.title}
                  meta={`Filed ${formatDate(c.filedDate)} · Adjuster: ${c.adjusterName}`}
                  nextStep={nextStepText(c)}
                  status={c.status}
                  href={`#/claims/${c.id}`}
                  headingLevel={Heading === 'h1' ? 'h2' : 'h3'}
                />
              </li>
            ))}
          </ul>

          {/* Table on desktop */}
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <caption className="visually-hidden">Your claims, newest first</caption>
              <thead>
                <tr>
                  <th scope="col">Claim ID</th>
                  <th scope="col">Claim</th>
                  <th scope="col">Type</th>
                  <th scope="col">Filed</th>
                  <th scope="col">Status</th>
                  <th scope="col">Next step</th>
                  <th scope="col">
                    <span className="visually-hidden">Open</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {claims.data.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link to={`/claims/${c.id}`} className={styles.idLink}>
                        <span className="visually-hidden">{c.title}, </span>
                        {c.id}
                      </Link>
                    </td>
                    <td>{c.title}</td>
                    <td className={styles.muted}>{claimTypeLabel(c.type)}</td>
                    <td className={styles.muted}>{formatDate(c.filedDate)}</td>
                    <td>
                      <StatusBadge status={c.status} />
                    </td>
                    <td>{c.nextStep}</td>
                    <td className={styles.chevron} aria-hidden="true">
                      <Icon name="chevron-right" size={20} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </section>
  );
}

function ListSkeleton() {
  return (
    <div className={styles.cardList} aria-busy="true">
      <p className="visually-hidden">Loading your claims…</p>
      {[0, 1, 2].map((i) => (
        <div key={i} className={styles.skeletonCard}>
          <Skeleton width="40%" height={12} />
          <Skeleton width="70%" height={20} />
          <Skeleton width="90%" height={14} />
        </div>
      ))}
    </div>
  );
}
