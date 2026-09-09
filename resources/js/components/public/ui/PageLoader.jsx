import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { router } from '@inertiajs/react'

export default function PageLoader() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const offStart  = router.on('start',  () => setLoading(true))
    const offFinish = router.on('finish', () => setLoading(false))
    return () => { offStart(); offFinish() }
  }, [])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ backgroundColor: 'rgba(13,11,30,0.88)', backdropFilter: 'blur(8px)' }}
        >
          {/* Spinner rig */}
          <div className="relative flex items-center justify-center w-32 h-32">

            {/* Outer ring — brand red, clockwise */}
            <motion.span
              className="absolute inset-0 rounded-full"
              style={{
                border: '3px solid transparent',
                borderTopColor: '#E21F2F',
                borderRightColor: 'rgba(226,31,47,0.25)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
            />

            {/* Middle ring — navy purple, counter-clockwise */}
            <motion.span
              className="absolute rounded-full"
              style={{
                inset: 14,
                border: '2.5px solid transparent',
                borderBottomColor: '#4D4890',
                borderLeftColor: 'rgba(77,72,144,0.3)',
              }}
              animate={{ rotate: -360 }}
              transition={{ duration: 1.7, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner ring — lighter red, clockwise slow */}
            <motion.span
              className="absolute rounded-full"
              style={{
                inset: 28,
                border: '2px solid transparent',
                borderTopColor: '#F76169',
                borderRightColor: 'rgba(247,97,105,0.2)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Logo — breathe pulse */}
            <motion.img
              src="/images/brand/logo-white.svg"
              alt=""
              className="w-10 h-10 object-contain relative z-10"
              animate={{ scale: [1, 1.1, 1], opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Animated dot trail */}
          <div className="flex items-center gap-1.5 mt-6">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: '#E21F2F' }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.7, 1, 0.7] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.18,
                }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
