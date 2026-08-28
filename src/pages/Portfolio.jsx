import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageHero from '../components/ui/PageHero'
import SectionTitle from '../components/ui/SectionTitle'
import ProjectCard from '../components/ui/ProjectCard'
import ContactCTASection from '../components/sections/home/ContactCTASection'
import { getProjects } from '../services/projectService'
import { staggerContainer, fadeInUp } from '../utils/animations'

const filters = [
  { label: 'All Projects', value: 'all' },
  { label: 'Sports', value: 'sports' },
  { label: 'Flooring', value: 'flooring' },
  { label: 'Fencing', value: 'fencing' },
  { label: 'Swimming Pool', value: 'swimming-pool' },
  { label: 'Civil Works', value: 'civil' },
  { label: 'Maintenance', value: 'maintenance' },
]

export default function Portfolio() {
  const [projects, setProjects] = useState([])
  const [active, setActive] = useState('all')

  useEffect(() => {
    getProjects({ category: active }).then(({ data }) => setProjects(data))
  }, [active])

  return (
    <>
      <PageHero
        title="Our"
        highlight="Portfolio"
        subtitle="Explore our completed projects across the UAE — quality you can see."
        breadcrumbs={[{ label: 'Portfolio' }]}
        image="https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=1920&q=80"
      />

      <section className="section-padding bg-light">
        <div className="container-custom">
          <SectionTitle
            tag="Our Work"
            title="Completed"
            highlight="Projects"
            description="Explore our portfolio of successfully delivered projects across the UAE — sports courts, flooring, fencing, and more."
          />

          {/* Filter bar */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((f) => (
              <motion.button
                key={f.value}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActive(f.value)}
                className={`px-5 py-2 rounded-full font-display font-semibold text-sm transition-all duration-200 ${
                  active === f.value
                    ? 'bg-primary text-white shadow-card'
                    : 'bg-white text-dark-300 hover:bg-primary/10 hover:text-primary border border-light-200'
                }`}
              >
                {f.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              variants={staggerContainer(0.07)}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

          {projects.length === 0 && (
            <div className="text-center py-20 text-dark-300">
              No projects found in this category yet.
            </div>
          )}
        </div>
      </section>

      <ContactCTASection />
    </>
  )
}
