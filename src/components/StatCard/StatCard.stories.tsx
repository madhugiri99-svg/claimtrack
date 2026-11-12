import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta: Meta<typeof StatCard> = {
  title: 'Components/StatCard',
  component: StatCard,
  args: { label: 'Open claims', value: '2', detail: '1 needs your action' },
  decorators: [(Story) => <div style={{ maxWidth: 280 }}>{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {};
export const Currency: Story = {
  args: { label: 'Paid this year', value: '$4,250', detail: 'Across 1 closed claim' },
};
export const WithoutDetail: Story = { args: { detail: undefined } };
