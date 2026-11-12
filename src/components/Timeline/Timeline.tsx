import { Icon } from '../Icon/Icon';
import styles from './Timeline.module.css';

export type StepState = 'completed' | 'current' | 'upcoming';

export type TimelineStep = {
  title: string;
  detail: string;
  /** Matches the Figma TimelineStep "State" property. */
  state: StepState;
};

type TimelineProps = {
  steps: TimelineStep[];
  label?: string;
};

const stateText: Record<StepState, string> = {
  completed: 'Completed',
  current: 'Current step',
  upcoming: 'Upcoming',
};

/**
 * An ordered list, so screen readers announce "list, 5 items" and each position.
 * The current step has aria-current="step" and a visible "Current step" label;
 * completed and upcoming states get hidden text so state isn't shown by icon alone.
 */
export function Timeline({ steps, label = 'Claim progress' }: TimelineProps) {
  return (
    <ol className={styles.timeline} aria-label={label}>
      {steps.map((step) => (
        <li
          key={step.title}
          className={`${styles.step} ${styles[step.state]}`}
          aria-current={step.state === 'current' ? 'step' : undefined}
        >
          <span className={styles.marker} aria-hidden="true">
            {step.state === 'completed' && <Icon name="check" size={16} />}
            {step.state === 'current' && <span className={styles.dot} />}
          </span>
          <span className={styles.text}>
            <span className={styles.title}>{step.title}</span>
            <span className={styles.detail}>{step.detail}</span>
            {step.state === 'current' ? (
              <span className={styles.currentLabel}>{stateText.current}</span>
            ) : (
              <span className="visually-hidden">{stateText[step.state]}</span>
            )}
          </span>
        </li>
      ))}
    </ol>
  );
}
