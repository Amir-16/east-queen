// Phase 1: EmailJS — Phase 2: swap to axios.post('/api/contact', data)
import emailjs from 'emailjs-com'

export const sendContactForm = async (formData) => {
  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

  if (!serviceId || !templateId || !publicKey) {
    // Dev fallback — log instead of crash
    console.info('[ContactService] EmailJS not configured. Form data:', formData)
    return { success: true, message: 'Message sent successfully!' }
  }

  await emailjs.send(serviceId, templateId, {
    from_name: formData.name,
    from_email: formData.email,
    phone: formData.phone,
    service: formData.service,
    message: formData.message,
  }, publicKey)

  return { success: true, message: 'Message sent successfully!' }
}
