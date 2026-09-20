import { Route, Routes } from 'react-router-dom'
import { SitePage } from './components/site/SitePage'
import { AppShell } from './components/patient/AppShell'
import { Dashboard } from './components/patient/Dashboard'
import { Appointments } from './components/patient/Appointments'
import { History } from './components/patient/History'
import { Documents } from './components/patient/Documents'
import { Prescriptions } from './components/patient/Prescriptions'
import { Profile } from './components/patient/Profile'

function App() {
  return (
    <Routes>
      <Route path="/" element={<SitePage />} />
      <Route path="/paciente" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="consultas" element={<Appointments />} />
        <Route path="historial" element={<History />} />
        <Route path="documentos" element={<Documents />} />
        <Route path="recetas" element={<Prescriptions />} />
        <Route path="perfil" element={<Profile />} />
      </Route>
    </Routes>
  )
}

export default App
