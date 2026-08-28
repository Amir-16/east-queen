import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { X, TrendingUp } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function AnnouncementBar() {
  const [show, setShow] = useState(true)

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden"
          style={{
            background: 'linear-gradient(90deg, #060d18 0%, #071d35 35%, #071d35 65%, #060d18 100%)',
            borderBottom: '1px solid rgba(34,211,238,0.1)',
          }}
        >
          <div className="section-pad max-content relative flex items-center justify-center py-2.5">
            <div className="flex items-center gap-2.5 flex-wrap justify-center">
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <TrendingUp size={12} style={{ color: '#e5c76b', flexShrink: 0 }} />
              </motion.div>
              <p className="text-[11px] sm:text-xs font-medium" style={{ color: 'rgba(220,238,221,0.78)' }}>
                Phase-1 Investment Now Open ·{' '}
                <span style={{ color: '#e5c76b', fontWeight: 700 }}>$1.20M Target</span>
                {' '}· 1.65-yr Payback · 52% Equity Committed ·{' '}
                <Link
                  to="/partnership"
                  style={{ color: '#22d3ee', fontWeight: 700, textDecoration: 'underline', textUnderlineOffset: 3 }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#22d3ee')}
                >
                  Explore Partnership →
                </Link>
              </p>
            </div>
            <button
              onClick={() => setShow(false)}
              className="absolute right-3 sm:right-6 lg:right-12 xl:right-20 2xl:right-28 p-1.5 rounded-md transition-colors duration-200"
              style={{ color: 'rgba(220,238,221,0.28)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(220,238,221,0.8)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(220,238,221,0.28)')}
              aria-label="Dismiss announcement"
            >
              <X size={13} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
