import styles from './Button.module.css';
import type { ButtonVariant } from './Button';

/**
 * Button styles for links that look like buttons (e.g. "Upload repair
 * estimate" navigates to a page, so it is a link, not a <button>).
 */
export function buttonClassName(variant: ButtonVariant = 'primary', fullWidth = false) {
  return [styles.button, styles[variant], fullWidth && styles.fullWidth].filter(Boolean).join(' ');
}
