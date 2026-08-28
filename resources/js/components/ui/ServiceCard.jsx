import { motion } from 'framer-motion'
import { Link } from '@inertiajs/react'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { truncate } from '../../utils/helpers'
import ServiceIcon from './ServiceIcon'

export default function ServiceCard({ service, index = 0 }) {
  const fromLeft = index % 2 === 0

  const variant = {
    hidden:  { opacity: 0, x: fromLeft ? -120 : 120, scale: 0.92 },
    visible: {
      opacity: 1, x: 0, scale: 1,
      transition: { type: 'spring', stiffness: 70, damping: 18, delay: index * 0.08 },
    },
  }

  return (
    <motion.div
      variants={variant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="group cursor-pointer overflow-hidden relative bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300"
    >
      <Link href={`/services/${service.slug}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <img
            src={service.coverImage}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />

          <div className="absolute top-4 left-4 w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-accent transition-transform duration-300 group-hover:scale-110">
            <ServiceIcon name={service.icon} className="w-5 h-5 text-white" />
          </div>

          {service.subServices?.length > 0 && (
            <div className="absolute bottom-4 right-4 bg-dark/60 backdrop-blur-sm text-white text-xs font-display font-semibold px-2.5 py-1.5 rounded-lg">
              {service.subServices.length} Services
            </div>
          )}

          <div
            className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-transparent
              scale-x-0 group-hover:scale-x-100 transition-transform duration-500
              ${fromLeft ? 'origin-left' : 'origin-right'}`}
          />
        </div>

        <div className="p-6">
          <h3 className="font-display font-bold text-lg text-dark group-hover:text-primary transition-colors duration-200 leading-snug">
            {service.title}
          </h3>
          <p className="mt-2 text-sm text-dark-300 leading-relaxed">
            {truncate(service.subtitle, 75)}
          </p>

          <div className="mt-5 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-primary font-display font-semibold text-sm group-hover:gap-3 transition-all duration-300">
              Learn More
              <ArrowRightIcon className="w-4 h-4" />
            </span>
            <span className="text-xs text-dark-300/60 font-medium">
              {service.category?.replace('-', ' ')}
            </span>
          </div>
        </div>

        <div
          className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary/20
            scale-x-0 group-hover:scale-x-100 transition-transform duration-500
            ${fromLeft ? 'origin-left' : 'origin-right'}`}
        />
      </Link>
    </motion.div>
  )
}
