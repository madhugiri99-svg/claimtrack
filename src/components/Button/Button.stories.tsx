import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'View claim' },
  argTypes: { variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost'] } },
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Disabled: Story = { args: { disabled: true } };
export const Loading: Story = { args: { loading: true } };
export const WithIcon: Story = { args: { icon: 'upload', children: 'Upload repair estimate' } };

/** All Figma variants side by side. Tab through to see the focus ring. */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <Button variant="primary">View claim</Button>
      <Button variant="secondary">View claim</Button>
      <Button variant="ghost">View claim</Button>
      <Button disabled>View claim</Button>
    </div>
  ),
};
