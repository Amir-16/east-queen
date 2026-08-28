import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPinIcon, UserIcon, CalendarIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import PageHero from '../components/ui/PageHero'
import ContactCTASection from '../components/sections/home/ContactCTASection'
import { getProjectBySlug } from '../services/projectService'
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../utils/animations'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [project, setProject] = useState(null)

  useEffect(() => { getProjectBySlug(slug).then(setProject) }, [slug])

  if (!project) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <>
      <PageHero
        title={project.title}
        breadcrumbs={[{ label: 'Portfolio', path: '/portfolio' }, { label: project.title }]}
        image={project.coverImage}
      />

      <section className="section-padding bg-white">
        <div className="container-custom">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm mb-10 transition-colors">
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Portfolio
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Images */}
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-4"
            >
              <div className="rounded-2xl overflow-hidden">
                <img src={project.coverImage} alt={project.title} className="w-full h-96 object-cover" />
              </div>
              {project.images?.slice(1).map((img, i) => (
                <div key={i} className="rounded-2xl overflow-hidden">
                  <img src={img} alt={`${project.title} ${i + 2}`} className="w-full h-64 object-cover" loading="lazy" />
                </div>
              ))}

              <div className="pt-6">
                <h3 className="font-display font-bold text-dark text-xl mb-3">Project Overview</h3>
                <p className="text-dark-300 leading-relaxed">{project.description}</p>
              </div>
            </motion.div>

            {/* Details Sidebar */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="card p-6">
                <h4 className="font-display font-bold text-dark text-base mb-5 pb-3 border-b border-light-200">Project Details</h4>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <UserIcon className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <div className="text-xs text-dark-300 font-medium">Client</div>
                      <div className="font-display font-semibold text-dark text-sm">{project.client}</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPinIcon className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <div className="text-xs text-dark-300 font-medium">Location</div>
                      <div className="font-display font-semibold text-dark text-sm">{project.location}</div>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                      <div className="text-xs text-dark-300 font-medium">Completed</div>
                      <div className="font-display font-semibold text-dark text-sm">{project.completedAt}</div>
                    </div>
                  </li>
                  <li>
                    <div className="text-xs text-dark-300 font-medium mb-2">Category</div>
                    <span className="inline-block bg-primary/10 text-primary font-semibold text-xs px-3 py-1 rounded-full capitalize">
                      {project.category.replace('-', ' ')}
                    </span>
                  </li>
                  {project.tags?.length > 0 && (
                    <li>
                      <div className="text-xs text-dark-300 font-medium mb-2">Tags</div>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((t) => (
                          <span key={t} className="text-xs bg-light text-dark-300 px-2.5 py-1 rounded-full capitalize">{t}</span>
                        ))}
                      </div>
                    </li>
                  )}
                </ul>
              </div>

              <div className="card p-6 bg-gradient-primary text-white">
                <h4 className="font-display font-bold text-base mb-2">Similar Project?</h4>
                <p className="text-white/70 text-sm mb-4">Let us build one for you. Get in touch for a free consultation.</p>
                <Link to="/contact" className="btn-primary w-full justify-center text-sm">Get a Quote</Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ContactCTASection />
    </>
  )
}
