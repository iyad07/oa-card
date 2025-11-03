import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RootLayout from './layouts/RootLayout.jsx'
import CardPage from './pages/CardPage.jsx'
import StaffEmailPage from './pages/staff_side/StaffEmailPage.jsx'
import VerifyPage from './pages/staff_side/VerifyPage.jsx'
import EditDigitalIDPage from './pages/staff_side/EditDigitalIDPage.jsx'
import UpdateCardPage from './pages/staff_side/UpdateCardPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<CardPage />} />
          <Route path="/staff/email" element={<StaffEmailPage />} />
          <Route path="/staff/verify" element={<VerifyPage />} />
          <Route path="/staff/edit" element={<EditDigitalIDPage />} />
          <Route path="/staff" element={<UpdateCardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
