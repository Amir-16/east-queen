export const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')

export const truncate = (text, maxLength = 120) =>
  text.length > maxLength ? `${text.slice(0, maxLength)}...` : text

export const formatPhone = (phone) => phone.replace(/\s/g, '')

export const getWhatsAppLink = (number, message = '') => {
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${number}${message ? `?text=${encoded}` : ''}`
}
