import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import SectionTitle from '../../ui/SectionTitle'
import ProjectCard from '../../ui/ProjectCard'
import { getFeaturedProjects } from '../../../services/projectService'

export default function PortfolioSection() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    getFeaturedProjects(6).then(setProjects)
  }, [])

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-custom">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <SectionTitle
            tag="Our Work"
            title="Featured"
            highlight="Projects"
            description="A showcase of our best work across the UAE — from sports courts to industrial flooring."
            center={false}
          />
          <Link
            to="/portfolio"
            className="flex-shrink-0 flex items-center gap-2 text-primary font-display font-semibold text-sm hover:text-primary-dark transition-colors group"
          >
            View All Projects
            <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
