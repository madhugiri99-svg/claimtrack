import type { Meta, StoryObj } from '@storybook/react-vite';
import { ClaimCard } from './ClaimCard';

const meta: Meta<typeof ClaimCard> = {
  title: 'Components/ClaimCard',
  component: ClaimCard,
  args: {
    claimId: 'CLM-20481',
    type: 'Auto',
    title: 'Rear-end collision',
    meta: 'Filed Oct 28, 2026 · Adjuster: R. Alvarez',
    nextStep: 'Next step: Upload repair estimate',
    status: 'pending',
    href: '#',
  },
  decorators: [(Story) => <div style={{ maxWidth: 343 }}>{Story()}</div>],
};
export default meta;
type Story = StoryObj<typeof ClaimCard>;

export const Pending: Story = {};
export const InReview: Story = {
  args: {
    claimId: 'CLM-19807',
    type: 'Home',
    title: 'Water damage, basement',
    meta: 'Filed Sep 30, 2026 · Adjuster: K. Osei',
    nextStep: 'Next step: Inspection report in review',
    status: 'review',
  },
};
export const Paid: Story = {
  args: {
    claimId: 'CLM-17342',
    title: 'Windshield replacement',
    meta: 'Filed Jun 12, 2026 · Paid Jul 3, 2026',
    nextStep: '$4,250 paid to your bank account',
    status: 'approved',
  },
};
