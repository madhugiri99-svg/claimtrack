import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';

const meta: Meta<typeof Timeline> = {
  title: 'Components/Timeline',
  component: Timeline,
};
export default meta;
type Story = StoryObj<typeof Timeline>;

export const InProgress: Story = {
  args: {
    steps: [
      { title: 'Claim filed', detail: 'Oct 28, 2026', state: 'completed' },
      { title: 'Adjuster assigned', detail: 'Oct 29, 2026 · R. Alvarez', state: 'completed' },
      { title: 'Damage inspection', detail: 'Scheduled Nov 14, 2026', state: 'current' },
      { title: 'Estimate review', detail: 'After your estimate is uploaded', state: 'upcoming' },
      { title: 'Payment issued', detail: 'Expected by Dec 2, 2026', state: 'upcoming' },
    ],
  },
};
