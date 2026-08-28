import { servicesData } from '../data/services.data'

export const getServices = async () => {
  return servicesData
}

export const getFeaturedServices = async () => {
  return servicesData.filter((s) => s.featured)
}

export const getServiceBySlug = async (slug) => {
  return servicesData.find((s) => s.slug === slug) ?? null
}

export const getServicesByCategory = async (category) => {
  if (category === 'all') return servicesData
  return servicesData.filter((s) => s.category === category)
}

export const getSubServiceBySlug = async (serviceSlug, subSlug) => {
  const service = servicesData.find((s) => s.slug === serviceSlug)
  if (!service) return null
  const subService = service.subServices?.find((ss) => ss.slug === subSlug)
  if (!subService) return null
  return { service, subService }
}
