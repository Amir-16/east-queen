import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPinIcon, ArrowRightIcon } from '@heroicons/react/24/outline'

const categoryColors = {
  sports: 'bg-blue-100 text-blue-700',
  flooring: 'bg-amber-100 text-amber-700',
  fencing: 'bg-green-100 text-green-700',
  'swimming-pool': 'bg-cyan-100 text-cyan-700',
  civil: 'bg-orange-100 text-orange-700',
  maintenance: 'bg-purple-100 text-purple-700',
}

export default function ProjectCard({ project, index = 0 }) {
  const fromLeft = index % 2 === 0

  const variant = {
    hidden: {
      opacity: 0,
      x: fromLeft ? -120 : 120,
      scale: 0.92,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 70,
        damping: 18,
        delay: index * 0.08,
      },
    },
  }

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group overflow-hidden bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <Link to={`/portfolio/${project.slug}`} className="block">
        {/* Image */}
        <div className="relative h-60 overflow-hidden">
          <img
            src={project.coverImage}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />

          {/* Category badge */}
          <span className={`absolute top-4 right-4 text-xs font-display font-semibold px-3 py-1 rounded-full capitalize ${categoryColors[project.category] ?? 'bg-white/20 text-white'}`}>
            {project.category.replace('-', ' ')}
          </span>

          {/* Location */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-white/90 text-sm">
            <MapPinIcon className="w-4 h-4 text-accent flex-shrink-0" />
            {project.location}
          </div>

          {/* Top accent bar — comes from same side as entrance */}
          <div
            className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent
              scale-x-0 group-hover:scale-x-100 transition-transform duration-500
              ${fromLeft ? 'origin-left' : 'origin-right'}`}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-display font-bold text-base text-dark group-hover:text-primary transition-colors duration-200 leading-snug">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-dark-300 font-medium">{project.client}</p>
          <div className="mt-4 flex items-center gap-1.5 text-primary font-semibold text-sm group-hover:gap-3 transition-all duration-200">
            View Project
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Bottom accent bar */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary/20
            scale-x-0 group-hover:scale-x-100 transition-transform duration-500
            ${fromLeft ? 'origin-left' : 'origin-right'}`}
        />
      </Link>
    </motion.div>
  )
}
