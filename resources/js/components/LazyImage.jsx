import { useState, useRef, useEffect } from 'react'

export default function LazyImage({ src, alt, className = '', style = {}, onClick }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { rootMargin: '300px' }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={style}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{ backgroundColor: '#c5d9c6', opacity: loaded ? 0 : 1 }}
      />
      {inView && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: loaded ? 1 : 0 }}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}
