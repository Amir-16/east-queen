import { useState, useCallback } from 'react'
import { Toaster } from 'sonner'
import AdminSidebar from './AdminSidebar'
import AdminHeader  from './AdminHeader'
import FlashToast   from './FlashToast'

export default function AdminLayout({ title = '', subtitle = '', children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const closeSidebar  = useCallback(() => setSidebarOpen(false), [])
  const toggleSidebar = useCallback(() => setSidebarOpen((o) => !o), [])

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#F5F0E8', fontFamily: 'Inter, sans-serif' }}>
      <AdminSidebar open={sidebarOpen} onClose={closeSidebar} />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          aria-hidden="true"
          onClick={closeSidebar}
        />
      )}

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <AdminHeader title={title} subtitle={subtitle} onMenuToggle={toggleSidebar} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-7">
          {children}
        </main>
      </div>

      <FlashToast />
      <Toaster
        position="top-right"
        richColors
        expand={false}
        duration={4000}
        toastOptions={{ style: { fontFamily: 'Inter, sans-serif', borderRadius: '12px' } }}
      />
    </div>
  )
}
