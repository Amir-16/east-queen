import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowRightIcon,
  CheckCircleIcon,
  CheckBadgeIcon,
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'
import PageHero from '../components/ui/PageHero'
import ContactCTASection from '../components/sections/home/ContactCTASection'
import { getServiceBySlug, getServices } from '../services/serviceService'
import { staggerContainer, fadeInUp, fadeInLeft, fadeInRight } from '../utils/animations'
import { COMPANY } from '../utils/constants'

const processIcons = [
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  WrenchScrewdriverIcon,
  CheckBadgeIcon,
]

export default function ServiceDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [service, setService] = useState(null)
  const [others, setOthers] = useState([])

  useEffect(() => {
    getServiceBySlug(slug).then(setService)
    getServices().then((all) => setOthers(all.filter((s) => s.slug !== slug).slice(0, 5)))
  }, [slug])

  if (!service) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <>
      <PageHero
        title={service.title}
        subtitle={service.subtitle}
        breadcrumbs={[{ label: 'Services', path: '/services' }, { label: service.title }]}
        image={service.coverImage}
      />

      {/* ── Overview + Sidebar ── */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <motion.div
                variants={fadeInLeft}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <span className="section-tag">
                  <span className="w-6 h-0.5 bg-accent inline-block rounded" />
                  Service Overview
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-dark mt-2 mb-4 leading-tight">
                  {service.title}
                </h2>
                <p className="text-dark-300 leading-relaxed text-base">{service.description}</p>
              </motion.div>

              {/* Highlight Pills */}
              {service.highlights?.length > 0 && (
                <motion.div
                  variants={staggerContainer(0.08)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3"
                >
                  {service.highlights.map((h) => (
                    <motion.div
                      key={h}
                      variants={fadeInUp}
                      className="flex items-center gap-2 bg-primary/5 border border-primary/15 rounded-xl px-4 py-3"
                    >
                      <SparklesIcon className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-xs font-display font-semibold text-dark leading-tight">{h}</span>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {/* Key Features */}
              {service.keyFeatures?.length > 0 && (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="card p-7 border-l-4 border-accent"
                >
                  <h3 className="font-display font-bold text-dark text-lg mb-5 flex items-center gap-2">
                    <CheckBadgeIcon className="w-5 h-5 text-accent" />
                    What's Included
                  </h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.keyFeatures.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-dark-300">
                        <CheckCircleIcon className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* CTA Card */}
              <div className="card p-6 bg-gradient-primary text-white sticky top-24">
                <h4 className="font-display font-bold text-lg mb-1">Request This Service</h4>
                <p className="text-white/70 text-sm mb-5">Get a free quote tailored to your project requirements.</p>
                <Link to="/contact" className="btn-primary w-full justify-center mb-3">
                  Get Free Quote
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
                <a
                  href={COMPANY.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-display font-semibold text-sm px-5 py-3 rounded-lg transition-colors w-full"
                >
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </a>

                {/* Quick contact details */}
                <div className="mt-5 pt-5 border-t border-white/15 space-y-2">
                  <a href={`tel:${COMPANY.mobile}`} className="flex items-center gap-2 text-white/70 hover:text-white text-xs transition-colors">
                    <span className="text-accent">📞</span> {COMPANY.mobile}
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-white/70 hover:text-white text-xs transition-colors break-all">
                    <span className="text-accent">✉</span> {COMPANY.email}
                  </a>
                </div>
              </div>

              {/* Other Services */}
              <div className="card p-6">
                <h4 className="font-display font-bold text-dark text-base mb-4 pb-3 border-b border-light-200">
                  Other Services
                </h4>
                <ul className="space-y-3">
                  {others.map((s) => (
                    <li key={s.id}>
                      <Link
                        to={`/services/${s.slug}`}
                        className="flex items-center gap-2 text-dark-300 hover:text-primary text-sm transition-colors font-medium group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 group-hover:scale-125 transition-transform" />
                        {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sub-Services ── */}
      {service.subServices?.length > 0 && (
        <section className="section-padding bg-light overflow-hidden">
          <div className="container-custom">
            {/* Section header */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-14"
            >
              <div>
                <span className="section-tag">
                  <span className="w-8 h-0.5 bg-accent inline-block rounded" />
                  What We Deliver
                </span>
                <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-dark leading-tight mt-3">
                  Our <span className="text-accent">{service.title}</span>
                </h2>
                <p className="mt-3 text-dark-300 text-sm max-w-lg">
                  Explore every specialisation we offer under this service. Each one is delivered by dedicated experts with the right equipment and certifications.
                </p>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 bg-primary text-white font-display font-bold text-sm px-5 py-2.5 rounded-full shadow-card">
                  <CheckCircleIcon className="w-4 h-4" />
                  {service.subServices.length} Services Available
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.subServices.map((sub, i) => {
                const subPath = `/services/${service.slug}/${sub.slug}`
                const fromLeft = i % 2 === 0

                const cardVariant = {
                  hidden: { opacity: 0, x: fromLeft ? -110 : 110, scale: 0.9 },
                  visible: {
                    opacity: 1, x: 0, scale: 1,
                    transition: { type: 'spring', stiffness: 65, damping: 18, delay: i * 0.07 },
                  },
                }

                return (
                  <motion.div
                    key={sub.id}
                    variants={cardVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                    onClick={() => navigate(subPath)}
                    className="group relative h-72 sm:h-80 overflow-hidden rounded-2xl shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer"
                  >
                    {/* Background Image */}
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Base gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-dark/10" />
                    {/* Colour wash on hover */}
                    <div className="absolute inset-0 bg-primary/25 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Top accent bar — sweeps from entrance side */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-primary/80
                        scale-x-0 group-hover:scale-x-100 transition-transform duration-500
                        ${fromLeft ? 'origin-left' : 'origin-right'}`}
                    />

                    {/* Side accent line */}
                    <div
                      className={`absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary/60 to-transparent
                        scale-y-0 group-hover:scale-y-100 transition-transform duration-700
                        ${fromLeft ? 'left-0 origin-top' : 'right-0 origin-bottom'}`}
                    />

                    {/* Number badge */}
                    <div className="absolute top-4 left-4 w-10 h-10 bg-accent rounded-xl flex items-center justify-center font-display font-black text-white text-sm shadow-accent group-hover:scale-110 transition-transform duration-300">
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Highlight tags — slide in from the right on hover */}
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-1.5">
                      {sub.highlights?.slice(0, 2).map((h, hi) => (
                        <span
                          key={h}
                          className="text-xs font-display font-semibold bg-dark/60 backdrop-blur-sm text-white/90 px-2.5 py-1 rounded-full
                            opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                          style={{ transitionDelay: hi === 0 ? '60ms' : '130ms' }}
                        >
                          {h}
                        </span>
                      ))}
                    </div>

                    {/* Bottom content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      {/* Title */}
                      <h4 className="font-display font-bold text-white text-xl leading-tight group-hover:text-accent transition-colors duration-300">
                        {sub.title}
                      </h4>

                      {/* Animated underline divider */}
                      <div
                        className={`h-px bg-gradient-to-r from-accent to-transparent mt-2
                          scale-x-0 group-hover:scale-x-100 transition-transform duration-500
                          ${fromLeft ? 'origin-left' : 'origin-right'}`}
                      />

                      {/* Description — expands on hover */}
                      <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-out">
                        <p className="text-white/70 text-sm leading-relaxed mt-2 line-clamp-2">
                          {sub.description}
                        </p>
                      </div>

                      {/* CTA buttons — appear on hover */}
                      <div
                        className="max-h-0 overflow-hidden group-hover:max-h-14 transition-all duration-500 ease-out"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center gap-3 mt-4">
                          <Link
                            to={subPath}
                            className="inline-flex items-center gap-1.5 bg-accent hover:bg-accent/90 text-white font-display font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
                          >
                            View Details
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                          </Link>
                          <Link
                            to="/contact"
                            className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/25 hover:bg-white/20 text-white font-display font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
                          >
                            Enquire
                            <ArrowRightIcon className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Our Process ── */}
      {service.process?.length > 0 && (
        <section className="section-padding bg-white overflow-hidden">
          <div className="container-custom">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="section-tag">
                <span className="w-8 h-0.5 bg-accent inline-block rounded" />
                How We Work
                <span className="w-8 h-0.5 bg-accent inline-block rounded" />
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-dark leading-tight mt-3">
                Our <span className="text-accent">Process</span>
              </h2>
              <p className="mt-5 text-dark-300 text-base max-w-xl mx-auto leading-relaxed">
                A clear, structured approach that ensures every project is delivered on time, on budget, and to the highest quality standard.
              </p>
            </motion.div>

            <div className="relative">
              {/* Connecting line — desktop */}
              <div
                className="hidden lg:block absolute h-0.5 bg-gradient-primary opacity-20"
                style={{ top: '2.5rem', left: '12.5%', right: '12.5%' }}
              />

              <motion.div
                variants={staggerContainer(0.12)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {service.process.map((step, i) => {
                  const StepIcon = processIcons[i] ?? CheckBadgeIcon
                  return (
                    <motion.div
                      key={step.title}
                      variants={fadeInUp}
                      className="flex flex-col items-center text-center"
                    >
                      {/* Icon */}
                      <div className="relative mb-6">
                        <div className="w-20 h-20 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-card-hover">
                          <StepIcon className="w-9 h-9 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-accent rounded-full flex items-center justify-center font-display font-black text-white text-xs shadow-accent">
                          {i + 1}
                        </div>
                      </div>
                      <h4 className="font-display font-bold text-dark text-base mb-2">{step.title}</h4>
                      <p className="text-dark-300 text-sm leading-relaxed">{step.desc}</p>
                    </motion.div>
                  )
                })}
              </motion.div>
            </div>
          </div>
        </section>
      )}

      <ContactCTASection />
    </>
  )
}
