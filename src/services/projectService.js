import { projectsData } from '../data/projects.data'

export const getProjects = async (filters = {}) => {
  let data = [...projectsData]
  if (filters.category && filters.category !== 'all') {
    data = data.filter((p) => p.category === filters.category)
  }
  return { data, total: data.length }
}

export const getFeaturedProjects = async (limit = 6) => {
  return projectsData.filter((p) => p.featured).slice(0, limit)
}

export const getProjectBySlug = async (slug) => {
  return projectsData.find((p) => p.slug === slug) ?? null
}
