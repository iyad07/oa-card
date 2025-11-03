import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import CardPage from './pages/CardPage.jsx'
import StaffEmailPage from './pages/staff_side/StaffEmailPage.jsx'
import EditDigitalIDPage from './pages/staff_side/EditDigitalIDPage.jsx'
import UpdateCardPage from './pages/staff_side/UpdateCardPage.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<StaffEmailPage/>} />
          <Route path="/:name" element={<CardPage />} />
          <Route path="/scan/:id" element={<CardPage />} />
          <Route path="/staff" element={<StaffEmailPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route
            path="/staff/edit/:name"
            element={
              <ProtectedRoute>
                <EditDigitalIDPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/staff/update/:name"
            element={
              <ProtectedRoute>
                <UpdateCardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
