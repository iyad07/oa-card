import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const { pathname } = useLocation()
  const isStaffRoute = pathname.startsWith('/staff')
  const isStaffEdit = pathname.startsWith('/staff/edit')
  const isStaffUpdate = pathname.startsWith('/staff/update')
  return (
    <div className={`min-h-screen bg-gray-50 grid ${isStaffRoute ? (isStaffEdit ? 'justify-items-center items-start' : 'justify-items-center items-start lg:items-center') : 'place-items-center'}`}>
      <main className={`w-full ${isStaffEdit ? 'max-w-[850px]' : isStaffUpdate ? 'max-w-[450px]' : 'max-w-sm'} px-4 ${isStaffRoute ? 'py-10' : 'py-6'}`}>
        <Outlet />
      </main>
    </div>
  )
}