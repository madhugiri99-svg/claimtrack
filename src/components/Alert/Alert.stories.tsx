import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../Button/Button';
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

/** Already on the page when it loads, so it is not announced (no live role). */
export const Warning: Story = {
  args: {
    type: 'warning',
    title: 'Action needed',
    children: 'We need one more document to keep your claim moving.',
  },
};

/** Shown after a failed upload, so it is announced right away (role="alert"). */
export const ErrorAlert: Story = {
  name: 'Error',
  args: {
    type: 'error',
    title: 'Upload failed',
    children: 'Files must be PDF, JPG or PNG under 10 MB.',
    announce: true,
  },
};

/** Shown after a successful upload, so it is announced politely (role="status"). */
export const Success: Story = {
  args: {
    type: 'success',
    title: 'Document received',
    children: 'We’ll review it within 2 business days.',
    announce: true,
  },
};

/**
 * Try with a screen reader: the alert is announced only when it appears
 * after pressing the button, not when the page first loads.
 */
export const AnnouncedAfterAction: Story = {
  render: function Render() {
    const [shown, setShown] = useState(false);
    return (
      <div style={{ display: 'grid', gap: 16 }}>
        <Button variant="secondary" onClick={() => setShown(true)}>
          Submit document
        </Button>
        {shown && (
          <Alert type="success" title="Document received" announce>
            We’ll review it within 2 business days.
          </Alert>
        )}
      </div>
    );
  },
};
