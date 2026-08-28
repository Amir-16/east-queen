import './bootstrap'
import '../css/app.css'
import './styles/index.css'

import { createInertiaApp } from '@inertiajs/react'
import { createRoot }        from 'react-dom/client'
import { useEffect }         from 'react'
import Lenis                 from 'lenis'
import AdminLayout           from './components/admin/AdminLayout'
import PublicLayout          from './components/public/layout/PublicLayout'

function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
  return children
}

createInertiaApp({
  title: (title) => title ? `${title} — East Queen Group` : 'East Queen Group',

  resolve: async (name) => {
    const pages = import.meta.glob('./pages/**/*.jsx')
    const page = await pages[`./pages/${name}.jsx`]()

    if (name.startsWith('Admin/')) {
      if (page.default.layout === undefined) {
        page.default.layout = (p) => <AdminLayout>{p}</AdminLayout>
      }
    } else {
      if (page.default.layout === undefined) {
        page.default.layout = (p) => <LenisProvider><PublicLayout>{p}</PublicLayout></LenisProvider>
      }
    }
    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },

  progress: {
    color: '#E21F2F',
    showSpinner: false,
  },
})
