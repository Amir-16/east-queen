import { motion } from 'framer-motion'

export default function PageLoader() {
  return (
    <div className="min-h-screen bg-navy-950 flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-10 h-10 border-2 border-white/10 border-t-gold-500 rounded-full"
      />
    </div>
  )
}
