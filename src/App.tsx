import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { CitizenPage } from './pages/CitizenPage'
import { DashboardPage } from './pages/DashboardPage'
import { ParamsPage } from './pages/ParamsPage'
import { RegistryPage } from './pages/RegistryPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="registry" element={<RegistryPage />} />
          <Route path="citizens/:id" element={<CitizenPage />} />
          <Route path="params" element={<ParamsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
