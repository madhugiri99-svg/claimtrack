import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  decorators: [(Story) => <div style={{ maxWidth: 480 }}>{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { type: 'info', title: 'Info', children: 'Your adjuster has been assigned.' },
};
export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Action needed',
    children: 'We need one more document to keep your claim moving.',
  },
};
export const ErrorAlert: Story = {
  name: 'Error',
  args: {
    type: 'error',
    title: 'Upload failed',
    children: 'Files must be PDF, JPG or PNG under 10 MB.',
  },
};
export const Success: Story = {
  args: {
    type: 'success',
    title: 'Document received',
    children: 'We’ll review it within 2 business days.',
  },
};
