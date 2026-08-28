import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion'

export default function AnimatedCounter({ end, suffix = '', duration = 2.2 }) {
  const ref  = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const count  = useMotionValue(0)
  const rounded = useTransform(count, v => Math.floor(v).toLocaleString())

  useEffect(() => {
    if (!inView) return
    const c = animate(count, end, { duration, ease: [0.22, 1, 0.36, 1] })
    return c.stop
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
