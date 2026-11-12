import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from './tokens.json';

// Contrast ratios checked against white, or against the paired
// status background for status foregrounds. Same values as the
// Figma Foundations page.
const contrast: Record<string, string> = {
  'color/text/primary': '14.6:1',
  'color/text/secondary': '5.9:1',
  'color/text/link': '5.0:1',
  'color/text/accent': '6.9:1',
  'color/action/primary': '5.0:1 (white text)',
  'color/action/primary-hover': '6.9:1 (white text)',
  'color/border/strong': '3.3:1 (UI)',
  'color/border/focus': '6.2:1',
  'color/decorative/brand-light': '2.6:1 — decorative only',
  'color/status/approved/fg': '4.8:1 on its bg',
  'color/status/pending/fg': '4.9:1 on its bg',
  'color/status/denied/fg': '5.8:1 on its bg',
  'color/status/review/fg': '5.5:1 on its bg',
};

const cssVar = (name: string) => `var(--${name.replaceAll('/', '-')})`;

function ColorTokens() {
  const entries = Object.entries(tokens.color);
  return (
    <div style={{ padding: 24, display: 'grid', gap: 16 }}>
      <h1 style={{ font: '700 2rem/1.25 var(--font-family)' }}>Color tokens</h1>
      <p style={{ color: 'var(--color-text-secondary)', maxWidth: 640 }}>
        Semantic tokens alias primitives. Components use only these. The brand teal (#2BB3B1) fails
        contrast at 2.6:1, so it is decorative only; text and buttons use #0E7C7B.
      </p>
      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          display: 'grid',
          gap: 16,
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        }}
      >
        {entries.map(([name, alias]) => (
          <li
            key={name}
            style={{
              background: 'var(--color-bg-surface)',
              border: '1px solid var(--color-border-default)',
              borderRadius: 'var(--radius-md)',
              padding: 12,
            }}
          >
            <div
              aria-hidden="true"
              style={{
                height: 48,
                borderRadius: 'var(--radius-sm)',
                background: cssVar(name),
                border: '1px solid var(--color-border-default)',
              }}
            />
            <p style={{ fontSize: 12, fontWeight: 600, marginTop: 8 }}>{name}</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {alias.replace(/[{}]/g, '')} · {cssVar(name)}
            </p>
            {contrast[name] && (
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{contrast[name]}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

const meta: Meta<typeof ColorTokens> = {
  title: 'Foundations/Colors',
  component: ColorTokens,
  parameters: { layout: 'fullscreen' },
};
export default meta;

export const AllColors: StoryObj<typeof ColorTokens> = {};
