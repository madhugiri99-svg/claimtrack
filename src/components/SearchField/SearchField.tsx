import { useId, type InputHTMLAttributes } from 'react';
import { Icon } from '../Icon/Icon';
import styles from './SearchField.module.css';

type SearchFieldProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  /** Always visible, never placeholder-only. Matches the Figma SearchField "Label" property. */
  label: string;
};

export function SearchField({ label, className, id, ...rest }: SearchFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrap}>
        <Icon name="search" size={20} className={styles.icon} />
        <input id={inputId} type="search" className={styles.input} {...rest} />
      </div>
    </div>
  );
}
