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
