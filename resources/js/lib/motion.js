export const ease = {
  smooth: [0.25, 0.1, 0.25, 1],
  snappy: [0.34, 1.56, 0.64, 1],
  slow:   [0.43, 0.13, 0.23, 0.96],
  out:    [0.0, 0.0, 0.2, 1],
}

export const fadeUp = {
  hidden:  { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.smooth } },
}

export const fadeDown = {
  hidden:  { opacity: 0, y: -32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.smooth } },
}

export const fadeLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: ease.smooth } },
}

export const fadeRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: ease.smooth } },
}

export const scaleIn = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: ease.smooth } },
}

export const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
}

export const staggerSlow = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, ease: ease.smooth } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.3, ease: ease.out } },
}

export const overlayVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit:    { opacity: 0, transition: { duration: 0.25 } },
}

export const menuVariants = {
  hidden:  { opacity: 0, x: '100%' },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: ease.smooth } },
  exit:    { opacity: 0, x: '100%', transition: { duration: 0.3, ease: ease.out } },
}

export const goldLineVariants = {
  hidden:  { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, delay: 0.2, ease: ease.smooth } },
}

export const wordVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.smooth } },
}
