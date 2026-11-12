import type { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    // Show axe-core accessibility results in the a11y panel for every story.
    a11y: { test: 'todo' },
  },
};

export default preview;
