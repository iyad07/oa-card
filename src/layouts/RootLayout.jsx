import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const { pathname } = useLocation()
  const isStaffRoute = pathname.startsWith('/staff')
  const isStaffEdit = pathname.startsWith('/staff/edit')
  const isStaffUpdate = pathname.startsWith('/staff/update')
  return (
    <div className={`min-h-screen bg-gray-50 grid ${isStaffRoute ? (isStaffEdit ? 'justify-items-center items-start' : isStaffUpdate ? 'justify-items-center items-center sm:place-items-center' : 'justify-items-center items-start lg:items-center') : 'justify-items-center items-center sm:place-items-center'}`}>
      <main className={`w-full px-6 ${isStaffEdit ? 'max-w-[850px]' : isStaffUpdate ? 'lg:max-w-[480px] sm:max-w-lg sm:px-4' : 'max-w-lg px-4'}  ${isStaffRoute ? 'py-4 sm:py-10' : 'pt-4 sm:py-6'}`}>
        <Outlet />
      </main>
    </div>
  )
}