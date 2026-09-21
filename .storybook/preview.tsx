import type { Preview } from '@storybook/react-vite'
import '../src/index.css'

// No global react-router decorator here on purpose: components that need a
// Router (NavLink, useNavigate, Outlet, Link) wrap themselves per-story with
// their own <MemoryRouter> — often with a specific `initialEntries` route —
// and nesting a second Router around that throws ("You cannot render a
// <Router> inside another <Router>").
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
      test: 'todo',
    },
  },
}

export default preview
