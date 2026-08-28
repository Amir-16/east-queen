import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion } from 'framer-motion'
import { PhoneIcon, EnvelopeIcon, MapPinIcon, CheckCircleIcon, UserCircleIcon } from '@heroicons/react/24/outline'
import PageHero from '../components/ui/PageHero'
import { COMPANY } from '../utils/constants'
import { sendContactForm } from '../services/contactService'
import { fadeInLeft, fadeInRight, fadeInUp, scaleIn, staggerContainer } from '../utils/animations'

const services = [
  'Sports Facilities', 'Flooring Solutions', 'Fencing & Safety',
  'Swimming Pool Works', 'Civil & Construction', 'Carpentry Works',
  'Refurbishment & Maintenance', 'Other',
]

const contactInfo = [
  { icon: PhoneIcon, label: 'Landline', value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
  { icon: PhoneIcon, label: 'Mobile / WhatsApp', value: COMPANY.mobile, href: `tel:${COMPANY.mobile}` },
  { icon: EnvelopeIcon, label: 'Email', value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: MapPinIcon, label: 'Office', value: `${COMPANY.addressLine1}, ${COMPANY.addressLine2}`, href: COMPANY.googleMapsUrl },
]

const slideFromRight = {
  hidden: { opacity: 0, x: 180 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const teamContacts = [
  {
    initial: 'M',
    name: 'Mosa',
    role: 'Project Manager',
    email: 'mosa12302133@gmail.com',
    gradient: 'from-primary to-primary/70',
  },
  {
    initial: 'I',
    name: 'General Info',
    role: 'General Inquiries',
    email: 'info@jonith-bogdad.com',
    gradient: 'from-accent to-accent/70',
  },
]

export default function Contact() {
  const [status, setStatus] = useState('idle')
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setStatus('loading')
    try {
      await sendContactForm(data)
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <PageHero
        title="Get In"
        highlight="Touch"
        subtitle="We're here to help. Reach out for a free consultation and quote."
        breadcrumbs={[{ label: 'Contact' }]}
        image="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
      />

      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:col-span-2 space-y-6"
            >
              <motion.div variants={fadeInLeft}>
                <span className="section-tag">
                  <span className="w-6 h-0.5 bg-accent inline-block rounded" />
                  Contact Information
                </span>
                <h2 className="font-display font-bold text-3xl text-dark mt-2 mb-3">
                  Let's Start a <span className="text-primary">Conversation</span>
                </h2>
                <p className="text-dark-300 leading-relaxed text-sm">
                  Whether you have a project in mind or just want to learn more, our team is ready to help.
                </p>
              </motion.div>

              {contactInfo.map((info) => (
                <motion.a
                  key={info.label}
                  variants={fadeInLeft}
                  href={info.href}
                  target={info.href.startsWith('http') ? '_blank' : undefined}
                  rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-start gap-4 p-5 card hover:border-primary/20 border border-transparent group"
                >
                  <div className="w-11 h-11 bg-primary/10 group-hover:bg-primary rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-200">
                    <info.icon className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-200" />
                  </div>
                  <div>
                    <div className="text-xs text-dark-300 font-medium mb-0.5">{info.label}</div>
                    <div className="font-display font-semibold text-dark text-sm group-hover:text-primary transition-colors duration-200 break-all">{info.value}</div>
                  </div>
                </motion.a>
              ))}

              {/* WhatsApp */}
              <motion.a
                variants={fadeInLeft}
                href={COMPANY.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-500 hover:bg-green-600 text-white font-display font-semibold px-6 py-4 rounded-xl transition-colors duration-200 w-full"
              >
                <svg className="w-6 h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Chat on WhatsApp
              </motion.a>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="lg:col-span-3"
            >
              <div className="card p-8 sm:p-10">
                {status === 'success' ? (
                  <motion.div
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="text-center py-12"
                  >
                    <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                    <h3 className="font-display font-bold text-2xl text-dark mb-2">Message Sent!</h3>
                    <p className="text-dark-300">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                    <button onClick={() => setStatus('idle')} className="btn-primary-dark mt-6">Send Another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                      <h3 className="font-display font-bold text-2xl text-dark mb-1">Send Us a Message</h3>
                      <p className="text-dark-300 text-sm">Fill in the form and we'll get back to you within 24 hours.</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-display font-semibold text-dark mb-2">Full Name *</label>
                        <input
                          {...register('name', { required: 'Name is required' })}
                          className="input-field"
                          type="text"
                          placeholder="John Smith"
                          autoComplete="name"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-display font-semibold text-dark mb-2">Email Address *</label>
                        <input
                          {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                          className="input-field"
                          placeholder="john@company.com"
                          type="email"
                        />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-xs font-display font-semibold text-dark mb-2">Phone Number</label>
                        <input
                          {...register('phone')}
                          className="input-field"
                          placeholder="+971 50 000 0000"
                          type="tel"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-display font-semibold text-dark mb-2">Service Required</label>
                        <select {...register('service')} className="input-field">
                          <option value="">Select a service...</option>
                          {services.map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-display font-semibold text-dark mb-2">Message *</label>
                      <textarea
                        {...register('message', { required: 'Message is required' })}
                        className="input-field resize-none"
                        rows={5}
                        placeholder="Tell us about your project requirements, location, and timeline..."
                      />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                    </div>

                    {status === 'error' && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again or contact us directly.</p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-primary w-full justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === 'loading' ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </span>
                      ) : 'Send Message'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Direct Contacts */}
          <div className="mt-16">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="text-center mb-10"
            >
              <span className="section-tag justify-center">
                <span className="w-6 h-0.5 bg-accent inline-block rounded" />
                Direct Contacts
                <span className="w-6 h-0.5 bg-accent inline-block rounded" />
              </span>
              <h2 className="font-display font-bold text-2xl text-dark mt-3">
                Reach Our <span className="text-primary">Team Directly</span>
              </h2>
            </motion.div>

            <motion.div
              variants={staggerContainer(0.18, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 overflow-hidden max-w-2xl mx-auto"
            >
              {teamContacts.map((person) => (
                <motion.div
                  key={person.email}
                  variants={slideFromRight}
                  className="card p-7 flex flex-col items-center text-center group hover:border-primary/20 border border-transparent hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Avatar */}
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${person.gradient} flex items-center justify-center mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <span className="font-display font-bold text-2xl text-white">{person.initial}</span>
                  </div>

                  {/* Info */}
                  <h3 className="font-display font-bold text-dark text-lg leading-tight">{person.name}</h3>
                  <span className="mt-1 mb-4 inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {person.role}
                  </span>

                  {/* Email */}
                  <a
                    href={`mailto:${person.email}`}
                    className="flex items-center gap-2 text-dark-300 hover:text-primary transition-colors duration-200 text-sm font-medium break-all"
                  >
                    <EnvelopeIcon className="w-4 h-4 flex-shrink-0 text-primary" />
                    {person.email}
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 rounded-3xl overflow-hidden shadow-card h-80"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.150706591624!2d55.30289831500695!3d25.26949398386228!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5cdbfc8a8b5d%3A0x6b5b7de8a25eff74!2sDeira%20Creek%2C%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Jonith Bogdad Office Location"
            />
          </motion.div>
        </div>
      </section>
    </>
  )
}
