import { StatusBadge, type ClaimStatus } from '../StatusBadge/StatusBadge';
import styles from './ClaimCard.module.css';

type ClaimCardProps = {
  claimId: string;
  type: string;
  title: string;
  meta: string;
  nextStep: string;
  status: ClaimStatus;
  href: string;
};

/**
 * Mobile/tablet version of a claim in the list. The title is the only link,
 * stretched over the whole card, so the card is one tap target and one
 * tab stop, and the link's name is the claim title (not "click here").
 */
export function ClaimCard({ claimId, type, title, meta, nextStep, status, href }: ClaimCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>
          {type} · {claimId}
        </span>
        <StatusBadge status={status} />
      </div>
      <h3 className={styles.title}>
        <a href={href} className={styles.link}>
          {title}
        </a>
      </h3>
      <p className={styles.meta}>{meta}</p>
      <p className={styles.next}>{nextStep}</p>
    </article>
  );
}
