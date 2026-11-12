import type { ClaimType } from '../api/types';

const dateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  timeZone: 'UTC',
});
const shortDateFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});
const money = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/** "2026-10-28" -> "Oct 28, 2026". Dates come from the API as ISO strings. */
export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T00:00:00Z`));

/** "2026-12-02" -> "Dec 2". */
export const formatShortDate = (iso: string) =>
  shortDateFormat.format(new Date(`${iso}T00:00:00Z`));

export const formatMoney = (amount: number) => money.format(amount);

export const claimTypeLabel = (type: ClaimType) => (type === 'auto' ? 'Auto' : 'Home');
