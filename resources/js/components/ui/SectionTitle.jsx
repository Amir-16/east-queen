import { motion } from 'framer-motion'
import { fadeInUp } from '../../utils/animations'

export default function SectionTitle({ tag, title, highlight, description, center = true, light = false }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={`mb-14 ${center ? 'text-center' : ''}`}
    >
      {tag && (
        <span className="section-tag">
          <span className="w-8 h-0.5 bg-accent inline-block rounded" />
          {tag}
          <span className="w-8 h-0.5 bg-accent inline-block rounded" />
        </span>
      )}
      <h2 className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight ${light ? 'text-white' : 'text-dark'}`}>
        {title}{' '}
        {highlight && <span className="text-accent">{highlight}</span>}
      </h2>
      {description && (
        <p className={`mt-5 text-base sm:text-lg max-w-2xl leading-relaxed ${center ? 'mx-auto' : ''} ${light ? 'text-light-200' : 'text-dark-300'}`}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
