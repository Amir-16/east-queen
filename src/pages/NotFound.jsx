import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { fadeInUp } from '../utils/animations'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center px-4">
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
        className="text-center"
      >
        <div className="font-display font-black text-[160px] leading-none text-white/5 select-none">404</div>
        <div className="-mt-16">
          <h1 className="font-display font-black text-5xl text-white mb-4">Page Not Found</h1>
          <p className="text-white/60 text-lg mb-10">The page you're looking for doesn't exist or has been moved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <HomeIcon className="w-5 h-5" />
              Go Home
            </Link>
            <button onClick={() => window.history.back()} className="btn-outline">
              <ArrowLeftIcon className="w-5 h-5" />
              Go Back
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
