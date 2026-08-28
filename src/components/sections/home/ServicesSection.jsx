import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import SectionTitle from '../../ui/SectionTitle'
import ServiceCard from '../../ui/ServiceCard'
import { getServices } from '../../../services/serviceService'

export default function ServicesSection() {
  const [services, setServices] = useState([])

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  return (
    <section className="section-padding bg-light overflow-hidden">
      <div className="container-custom">
        <SectionTitle
          tag="What We Do"
          title="Our Core"
          highlight="Services"
          description="From sports courts to industrial flooring, we deliver end-to-end technical solutions across the UAE with uncompromising quality and craftsmanship."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/services" className="btn-primary-dark">
            Explore All Services
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
