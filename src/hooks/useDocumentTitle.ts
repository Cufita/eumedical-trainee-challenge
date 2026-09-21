import { useEffect } from 'react'

const SITE_NAME = 'eumedical'

// The patient area is a client-side SPA behind one static index.html title —
// without this, the browser tab never reflects which screen (or the 404
// page) is actually open.
export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title
    document.title = `${title} · ${SITE_NAME}`
    return () => {
      document.title = previous
    }
  }, [title])
}
