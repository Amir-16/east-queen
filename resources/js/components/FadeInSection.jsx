import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1]

const DIRS = {
  up:    { y: 48, x: 0  },
  down:  { y: -48, x: 0 },
  left:  { y: 0, x: 40  },
  right: { y: 0, x: -40 },
  none:  { y: 0, x: 0   },
}

export default function FadeInSection({ children, className = '', delay = 0, direction = 'up' }) {
  const { x, y } = DIRS[direction] ?? DIRS.up
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
