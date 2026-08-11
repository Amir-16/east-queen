import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'
import AssociateCard from '@/components/cards/AssociateCard'
import { associates } from '@/data'
import { stagger } from '@/lib/motion'

export default function AssociatesTeaser() {
  const preview = associates.slice(0, 8)

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <SectionHeader
            eyebrow="Business Associates"
            title="Trusted Partners Across the Globe"
            subtitle="Our network spans Bangladesh, the Middle East, Asia, and Europe — built on trust and mutual growth."
          />
          <Link
            to="/associates"
            className="group inline-flex items-center gap-2 text-gold-500 hover:text-gold-600 font-semibold text-sm transition-colors duration-200 shrink-0 self-start lg:self-auto"
          >
            View All Partners
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {preview.map((associate) => (
            <AssociateCard key={associate.id} associate={associate} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
