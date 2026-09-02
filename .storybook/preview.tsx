import type { Preview } from '@storybook/nextjs-vite'
// @ts-ignore -- CSS is bundled by Storybook/Vite at runtime.
import '../app/globals.css'
// @ts-ignore -- CSS is bundled by Storybook/Vite at runtime.
import './preview.css'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo'
    }
  },
};

export default preview;