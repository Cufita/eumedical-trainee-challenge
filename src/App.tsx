import { Navigate, Route, Routes } from 'react-router-dom'
import { SitePage } from './components/pages/SitePage'
import { PatientShellTemplate } from './components/templates/patient/PatientShellTemplate'
import { DashboardPage } from './components/pages/patient/DashboardPage'
import { AppointmentsPage } from './components/pages/patient/AppointmentsPage'
import { StudiesPage } from './components/pages/patient/StudiesPage'
import { PrescriptionsPage } from './components/pages/patient/PrescriptionsPage'
import { ProfilePage } from './components/pages/patient/ProfilePage'
import { SupportPage } from './components/pages/patient/SupportPage'
import { NotFoundPage, PatientNotFoundPage } from './components/pages/NotFoundPage'

function App() {
  return (
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
  )
}

export default App
