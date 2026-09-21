// Suspense fallback shown while a route's lazy-loaded chunk is fetched — reuses
// the same "loading-dots" indicator as PatientLoadingSkeleton so a slow chunk
// download reads as brand-consistent loading, not a blank flash.
export function RouteLoadingFallback() {
  return (
    <div role="status" aria-label="Cargando" className="min-h-screen grid place-items-center bg-cloud">
      <div className="loading-dots">
        <span />
        <span />
        <span />
      </div>
    </div>
  )
}
