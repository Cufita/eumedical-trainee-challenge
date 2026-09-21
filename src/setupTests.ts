import '@testing-library/jest-dom/vitest'

// jsdom implements neither API; several components (scroll-triggered reveals,
// prefers-reduced-motion checks) rely on both, so tests that render them need
// a stand-in rather than a runtime crash.
if (!window.matchMedia) {
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }) as unknown as MediaQueryList
}

if (typeof window.IntersectionObserver === 'undefined') {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null
    readonly rootMargin: string = ''
    readonly thresholds: ReadonlyArray<number> = []
    observe = () => {}
    unobserve = () => {}
    disconnect = () => {}
    takeRecords = () => []
  }
  const mock = MockIntersectionObserver as unknown as typeof IntersectionObserver
  window.IntersectionObserver = mock
  globalThis.IntersectionObserver = mock
}

// @headlessui/react's `anchor` prop positions dropdowns/popovers via
// floating-ui, which observes size changes to keep them positioned —
// jsdom implements neither, so opening any anchored Menu/Popover in a
// test throws without this stand-in.
if (typeof window.ResizeObserver === 'undefined') {
  class MockResizeObserver implements ResizeObserver {
    observe = () => {}
    unobserve = () => {}
    disconnect = () => {}
  }
  const mock = MockResizeObserver as unknown as typeof ResizeObserver
  window.ResizeObserver = mock
  globalThis.ResizeObserver = mock
}
