import { useEffect, useState, type CSSProperties } from 'react'
import { Outlet } from 'react-router-dom'
import { PatientSidebar } from '../../organisms/patient/PatientSidebar'
import { PatientTopBar } from '../../organisms/patient/PatientTopBar'
import { PatientLoadingSkeleton } from '../../molecules/patient/PatientLoadingSkeleton'

// Simulates the round-trip to fetch the patient's profile/appointments on
// first entry to the area — long enough for the skeleton to actually read
// as a loading state, short enough not to feel like a stall.
const SIMULATED_LOAD_MS = 500

export function PatientShellTemplate() {
  const [collapsed, setCollapsed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setIsLoading(false), SIMULATED_LOAD_MS)
    return () => window.clearTimeout(timeout)
  }, [])

  if (isLoading) {
    return <PatientLoadingSkeleton />
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] bg-cloud">
      <PatientTopBar />
      <div
        className="grid grid-cols-1 md:grid-cols-[var(--sidebar-w)_1fr] transition-[grid-template-columns] duration-200"
        style={{ '--sidebar-w': collapsed ? '76px' : '240px' } as CSSProperties}
      >
        <PatientSidebar collapsed={collapsed} onToggleCollapsed={() => setCollapsed((c) => !c)} />
        <main className="p-8.5 px-(--edge) w-full max-md:pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
