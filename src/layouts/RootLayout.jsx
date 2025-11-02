import { Outlet, useLocation } from 'react-router-dom'

export default function RootLayout() {
  const { pathname } = useLocation()
  const isStaffRoute = pathname.startsWith('/staff')
  const isStaffEdit = pathname.startsWith('/staff/edit')
  const isStaffUpdate = pathname.startsWith('/staff/update')
  return (
    <div className={`min-h-screen bg-gray-50 grid ${isStaffRoute ? (isStaffEdit ? 'justify-items-center items-start' : isStaffUpdate ? 'justify-items-center items-center' : 'justify-items-center items-start lg:items-center') : 'place-items-center'}`}>
      <main className={`w-full ${isStaffEdit ? 'max-w-[850px]' : isStaffUpdate ? 'lg:max-w-[480px] sm:max-w-sm px-4' : 'max-w-sm'}  ${isStaffRoute ? 'py-10' : 'py-6'}`}>
        <Outlet />
      </main>
    </div>
  )
}