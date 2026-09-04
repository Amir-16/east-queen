import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import PageHead from '@/components/public/ui/PageHead'
import { Home as HomeIcon } from 'lucide-react'
import { stagger, fadeUp } from '@/lib/motion'

export default function NotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-navy-950 flex items-center justify-center"
    >
      <PageHead title="Page Not Found" noIndex />
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="text-center px-6"
      >
        <motion.p variants={fadeUp} className="font-mono text-gold-500 text-sm tracking-widest uppercase mb-4">
          404
        </motion.p>
        <motion.h1 variants={fadeUp} className="font-playfair text-6xl md:text-8xl font-bold text-white mb-6">
          Page Not Found
        </motion.h1>
        <motion.p variants={fadeUp} className="text-white/40 text-lg max-w-md mx-auto mb-10">
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold-500 text-navy-950 px-8 py-4 rounded-lg font-semibold hover:bg-gold-400 transition-colors"
          >
            <HomeIcon className="w-4 h-4" />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Bypass PublicLayout — the 404 page is a full-screen standalone view
NotFound.layout = (page) => page
