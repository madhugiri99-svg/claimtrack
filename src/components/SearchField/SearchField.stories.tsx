import type { Meta, StoryObj } from '@storybook/react-vite';
import { SearchField } from './SearchField';

const meta: Meta<typeof SearchField> = {
  title: 'Components/SearchField',
  component: SearchField,
  args: { label: 'Search claims', placeholder: 'Claim ID or description' },
  decorators: [(Story) => <div style={{ maxWidth: 343 }}>{Story()}</div>],
};
export default meta;

export const Default: StoryObj<typeof SearchField> = {};
