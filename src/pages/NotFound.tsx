import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { fadeUp, stagger } from '@/lib/motion'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-zinc-950 flex items-center justify-center"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="text-center px-6"
      >
        <motion.p variants={fadeUp} className="font-mono text-amber-500 text-sm tracking-widest uppercase mb-4">
          404
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-display text-6xl md:text-8xl font-bold text-white mb-6">
          Page Not Found
        </motion.h1>
        <motion.p variants={fadeUp} className="text-zinc-400 text-lg max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-amber-500 text-zinc-900 px-8 py-4 rounded-lg font-semibold hover:bg-amber-400 transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
