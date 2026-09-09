import './bootstrap'
import '../css/app.css'
import './styles/index.css'

import { createInertiaApp, router } from '@inertiajs/react'
import { createRoot }               from 'react-dom/client'
import { useEffect, useRef }        from 'react'
import Lenis                        from 'lenis'
import PublicLayout                 from './components/public/layout/PublicLayout'
import { LenisContext }             from './lib/lenisContext'

function LenisProvider({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    lenisRef.current = lenis

    let running = true
    function raf(time) {
      if (!running) return
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Lenis owns scroll — reset to top on every Inertia navigation
    const off = router.on('navigate', () => {
      lenis.scrollTo(0, { immediate: true })
    })

    return () => {
      running = false
      off()
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <LenisContext.Provider value={lenisRef}>{children}</LenisContext.Provider>
}

// Stable reference so Inertia treats this as a persistent layout and never remounts LenisProvider
const publicLayout = (p) => <LenisProvider><PublicLayout>{p}</PublicLayout></LenisProvider>

createInertiaApp({
  title: (title) => title ? `${title} — East Queen Group` : 'East Queen Group',

  resolve: async (name) => {
    const pages = import.meta.glob('./pages/**/*.jsx')
    const page = await pages[`./pages/${name}.jsx`]()

    if (!name.startsWith('Admin/')) {
      if (page.default.layout === undefined) {
        page.default.layout = publicLayout
      }
    }
    return page
  },

  setup({ el, App, props }) {
    createRoot(el).render(<App {...props} />)
  },

  progress: false,
})
