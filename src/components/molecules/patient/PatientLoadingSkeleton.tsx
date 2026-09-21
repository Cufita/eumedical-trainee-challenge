// Full-screen placeholder shown while the patient area's real data is on its
// way in (see PatientShellTemplate) — flat gray shapes tracing the shell it's
// about to become, shimmering like Instagram/Facebook/X skeletons. No logo,
// no copy: the shapes alone read as "loading".
export function PatientLoadingSkeleton() {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className="min-h-screen grid grid-cols-1 md:grid-cols-[264px_1fr] bg-cloud"
    >
      <aside className="bg-navy-2/5 p-5 flex flex-col gap-2 max-md:hidden">
        <div className="flex items-center gap-2 px-1.5 pb-6.5">
          <span className="skeleton size-6 rounded-full" />
          <span className="skeleton h-4 w-24 rounded-full" />
        </div>
        {Array.from({ length: 6 }).map((_, item) => (
          <span key={item} className="skeleton h-11 w-full rounded-xl" />
        ))}
      </aside>
      <main className="p-8.5 px-(--edge) max-w-[980px] w-full">
        <div className="flex justify-between items-center mb-7.5 gap-5">
          <span className="skeleton h-7 w-48 rounded-full" />
          <span className="skeleton size-11 shrink-0 rounded-full" />
        </div>
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, item) => (
            <div key={item} className="flex items-center gap-4 rounded-2xl bg-white p-5">
              <span className="skeleton size-11 shrink-0 rounded-full" />
              <div className="flex-1 flex flex-col gap-2">
                <span className="skeleton h-3 w-1/3 rounded-full" />
                <span className="skeleton h-3 w-2/3 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </main>
      <div aria-hidden="true" className="fixed inset-0 grid place-items-center">
        <div className="loading-dots">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}
