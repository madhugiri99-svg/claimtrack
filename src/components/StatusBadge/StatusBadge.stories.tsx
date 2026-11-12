import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  args: { status: 'pending' },
};
export default meta;
type Story = StoryObj<typeof StatusBadge>;

export const Pending: Story = {};
export const Approved: Story = { args: { status: 'approved' } };
export const Denied: Story = { args: { status: 'denied' } };
export const InReview: Story = { args: { status: 'review' } };
export const CustomLabel: Story = { args: { status: 'approved', label: 'Received' } };

export const AllStatuses: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16 }}>
      <StatusBadge status="approved" />
      <StatusBadge status="pending" />
      <StatusBadge status="denied" />
      <StatusBadge status="review" />
    </div>
  ),
};
