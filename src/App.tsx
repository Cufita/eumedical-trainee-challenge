import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RouteLoadingFallback } from './components/molecules/RouteLoadingFallback'

// Route-level code splitting: the public site and each patient-area screen
// only download when actually visited, instead of one ~1.1MB bundle every
// visitor pays for regardless of which half of the app they came for.
const SitePage = lazy(() => import('./components/pages/SitePage').then((m) => ({ default: m.SitePage })))
const PatientShellTemplate = lazy(() =>
  import('./components/templates/patient/PatientShellTemplate').then((m) => ({ default: m.PatientShellTemplate })),
)
const DashboardPage = lazy(() =>
  import('./components/pages/patient/DashboardPage').then((m) => ({ default: m.DashboardPage })),
)
const AppointmentsPage = lazy(() =>
  import('./components/pages/patient/AppointmentsPage').then((m) => ({ default: m.AppointmentsPage })),
)
const StudiesPage = lazy(() =>
  import('./components/pages/patient/StudiesPage').then((m) => ({ default: m.StudiesPage })),
)
const PrescriptionsPage = lazy(() =>
  import('./components/pages/patient/PrescriptionsPage').then((m) => ({ default: m.PrescriptionsPage })),
)
const ProfilePage = lazy(() =>
  import('./components/pages/patient/ProfilePage').then((m) => ({ default: m.ProfilePage })),
)
const SupportPage = lazy(() =>
  import('./components/pages/patient/SupportPage').then((m) => ({ default: m.SupportPage })),
)
const NotFoundPage = lazy(() =>
  import('./components/pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
)
const PatientNotFoundPage = lazy(() =>
  import('./components/pages/NotFoundPage').then((m) => ({ default: m.PatientNotFoundPage })),
)

function App() {
  return (
    <Suspense fallback={<RouteLoadingFallback />}>
      <Routes>
        <Route path="/" element={<SitePage />} />
        <Route path="/paciente" element={<PatientShellTemplate />}>
          <Route index element={<DashboardPage />} />
          <Route path="consultas" element={<AppointmentsPage />} />
          <Route path="estudios" element={<StudiesPage />} />
          <Route path="recetas" element={<PrescriptionsPage />} />
          <Route path="perfil" element={<ProfilePage />} />
          <Route path="soporte" element={<SupportPage />} />
          <Route path="historial" element={<Navigate to="/paciente/consultas" replace />} />
          <Route path="documentos" element={<Navigate to="/paciente/estudios" replace />} />
          <Route path="*" element={<PatientNotFoundPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

export default App
