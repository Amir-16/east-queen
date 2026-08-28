import { useState, useEffect, useRef } from 'react'

export function useCountUp(end, duration = 2000, start = 0) {
  const [count, setCount] = useState(start)
  const [isActive, setIsActive] = useState(false)
  const countRef = useRef(start)
  const frameRef = useRef(null)

  const startCounting = () => setIsActive(true)

  useEffect(() => {
    if (!isActive) return

    const startTime = performance.now()
    const range = end - start

    const step = (currentTime) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      countRef.current = Math.floor(start + range * eased)
      setCount(countRef.current)

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(step)
      }
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [isActive, end, start, duration])

  return { count, startCounting }
}
