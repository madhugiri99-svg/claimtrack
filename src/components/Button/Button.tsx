import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';
import { Icon, type IconName } from '../Icon/Icon';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Matches the Figma Button "Style" property. */
  variant?: ButtonVariant;
  fullWidth?: boolean;
  loading?: boolean;
  icon?: IconName;
  children: ReactNode;
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  loading = false,
  icon,
  disabled,
  className,
  children,
  onClick,
  type = 'button',
  ...rest
}: ButtonProps) {
  const inactive = Boolean(disabled || loading);
  const classes = [styles.button, styles[variant], fullWidth && styles.fullWidth, className]
    .filter(Boolean)
    .join(' ');

  // aria-disabled (instead of the native attribute) keeps the button in the tab
  // order, so keyboard and screen reader users can still find it and hear why.
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (inactive) {
      event.preventDefault();
      return;
    }
    onClick?.(event);
  };

  return (
    <button
      type={type}
      className={classes}
      aria-disabled={inactive || undefined}
      aria-busy={loading || undefined}
      onClick={handleClick}
      {...rest}
    >
      {icon && <Icon name={icon} size={20} />}
      <span>{loading ? 'Please wait…' : children}</span>
    </button>
  );
}
