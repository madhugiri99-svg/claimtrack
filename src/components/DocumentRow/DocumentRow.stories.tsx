import type { Meta, StoryObj } from '@storybook/react-vite';
import { DocumentRow } from './DocumentRow';

const meta: Meta<typeof DocumentRow> = {
  title: 'Components/DocumentRow',
  component: DocumentRow,
  decorators: [(Story) => <div style={{ maxWidth: 343 }}>{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof DocumentRow>;

export const Needed: Story = {
  args: {
    name: 'Repair estimate',
    detail: 'Required · due Nov 18',
    status: 'pending',
    statusLabel: 'Needed',
  },
};
export const Received: Story = {
  args: {
    name: 'Police report',
    detail: 'Received Oct 29',
    status: 'approved',
    statusLabel: 'Received',
  },
};
export const LongFileName: Story = {
  args: {
    name: 'estimate_from_northside_auto_body_oct28.pdf',
    detail: '1.2 MB · Ready to submit',
    status: 'review',
    statusLabel: 'Ready',
  },
};
