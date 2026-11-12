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
  /** h3 under a page's h2 section (Overview); h2 when the list is the page's main content. */
  headingLevel?: 'h2' | 'h3';
};

/**
 * Mobile/tablet version of a claim in the list. The title is the only link,
 * stretched over the whole card, so the card is one tap target and one
 * tab stop, and the link's name is the claim title (not "click here").
 */
export function ClaimCard({
  claimId,
  type,
  title,
  meta,
  nextStep,
  status,
  href,
  headingLevel: Heading = 'h3',
}: ClaimCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <span className={styles.id}>
          {type} · {claimId}
        </span>
        <StatusBadge status={status} />
      </div>
      <Heading className={styles.title}>
        <a href={href} className={styles.link}>
          {title}
        </a>
      </Heading>
      <p className={styles.meta}>{meta}</p>
      <p className={styles.next}>{nextStep}</p>
    </article>
  );
}
