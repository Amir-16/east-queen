import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PageHero from '../components/ui/PageHero'

import SectionTitle from '../components/ui/SectionTitle'
import ServiceCard from '../components/ui/ServiceCard'
import ContactCTASection from '../components/sections/home/ContactCTASection'
import { getServices } from '../services/serviceService'
import { SERVICE_CATEGORIES } from '../utils/constants'
import { staggerContainer } from '../utils/animations'

export default function Services() {
  const [services, setServices] = useState([])
  const [active, setActive] = useState('all')

  useEffect(() => { getServices().then(setServices) }, [])

  const filtered = active === 'all' ? services : services.filter((s) => s.category === active)

  return (
    <>
      <PageHero
        title="Our"
        highlight="Services"
        subtitle="Comprehensive technical services for sports, commercial, and residential projects across the UAE."
        breadcrumbs={[{ label: 'Services' }]}
        image="https://images.unsplash.com/photo-1544919982-b61976f0ba43?w=1920&q=80"
      />

      <section className="section-padding bg-light overflow-hidden">
        <div className="container-custom">
          <SectionTitle
            tag="What We Offer"
            title="End-to-End"
            highlight="Technical Solutions"
            description="From initial consultation and design through installation, refurbishment, and long-term maintenance — we handle it all."
          />

          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {SERVICE_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.value}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(cat.value)}
                className={`px-5 py-2 rounded-full font-display font-semibold text-sm transition-all duration-200 ${
                  active === cat.value
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-white text-dark-300 hover:bg-primary/10 hover:text-primary border border-light-200'
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filtered.map((service, i) => (
              <ServiceCard key={service.id} service={service} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  )
}
