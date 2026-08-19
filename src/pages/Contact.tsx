import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { pageTransition, stagger, fadeUp, fadeLeft, fadeRight } from '@/lib/motion'
import PageHero from '@/components/ui/PageHero'
import { CONTACT } from '@/lib/constants'

const subjects = [
  'General Inquiry',
  'Export Products',
  'Import Products',
  'Business Partnership',
  'Careers',
  'Other',
]

const infoItems = [
  { icon: MapPin, label: 'Office', values: [CONTACT.address] },
  { icon: Phone, label: 'Phone', values: CONTACT.phones },
  { icon: Mail, label: 'Email', values: CONTACT.emails },
  { icon: Clock, label: 'Hours', values: [CONTACT.hours] },
]

export default function Contact() {
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '', subject: '', message: '',
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
      if (!endpoint) throw new Error('No endpoint')
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      toast.success("Message sent! We'll respond within 24 hours.")
      setForm({ name: '', company: '', email: '', phone: '', subject: '', message: '' })
    } catch {
      toast.error('Could not send message. Please email us directly.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Reach out for export, import, partnership, or general inquiries."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
        image="https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&q=80"
      />

      {/* Info bar */}
      <div className="bg-navy-900 py-12">
        <div className="section-container">
          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {infoItems.map(({ icon: Icon, label, values }) => (
              <motion.div key={label} variants={fadeUp} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-gold-500/15 border border-gold-500/20 flex items-center justify-center shrink-0">
                  <Icon size={16} className="text-gold-400" />
                </div>
                <div>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5">{label}</p>
                  {values.map((v) => (
                    <p key={v} className="text-white/75 text-sm leading-relaxed">{v}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <section className="section-padding bg-slate-50">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Form — 3 cols */}
            <motion.div
              className="lg:col-span-3"
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-8 lg:p-10">
                <h2 className="font-playfair font-bold text-navy-900 text-h3 mb-2">Send a Message</h2>
                <p className="text-slate-500 text-sm mb-8">Fill in the form below and we'll get back to you within one business day.</p>

                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Full Name *</label>
                      <input type="text" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} placeholder="John Smith" required className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-200 bg-slate-50 focus:bg-white" />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Company Name</label>
                      <input type="text" value={form.company} onChange={(e) => setForm((p) => ({ ...p, company: e.target.value }))} placeholder="Your Company" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-200 bg-slate-50 focus:bg-white" />
                    </motion.div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address *</label>
                      <input type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} placeholder="john@company.com" required className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-200 bg-slate-50 focus:bg-white" />
                    </motion.div>
                    <motion.div variants={fadeUp}>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Phone Number</label>
                      <input type="tel" value={form.phone} onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))} placeholder="+880 1700 000000" className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-200 bg-slate-50 focus:bg-white" />
                    </motion.div>
                  </div>

                  <motion.div variants={fadeUp}>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Subject *</label>
                    <select
                      value={form.subject}
                      onChange={(e) => setForm((p) => ({ ...p, subject: e.target.value }))}
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-navy-900 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-200 bg-slate-50 focus:bg-white"
                    >
                      <option value="">Select a subject...</option>
                      {subjects.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Message *</label>
                    <textarea
                      value={form.message}
                      onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                      rows={5}
                      required
                      placeholder="Describe your inquiry in detail..."
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500 transition-colors duration-200 bg-slate-50 focus:bg-white resize-none"
                    />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2.5 px-8 py-4 bg-gold-500 hover:bg-gold-600 disabled:opacity-60 text-white font-bold rounded-xl transition-all duration-200 text-sm hover:shadow-gold-glow"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-navy-900/30 border-t-navy-900 rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                  </motion.div>
                </motion.form>
              </div>
            </motion.div>

            {/* Info — 2 cols */}
            <motion.div
              className="lg:col-span-2 space-y-6"
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Map placeholder */}
              <div className="bg-navy-900 rounded-2xl overflow-hidden h-56 relative">
                <iframe
                  title="East Queen Group Location"
                  src="https://maps.google.com/maps?q=Dhaka,Bangladesh&z=12&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              {/* Contact details card */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-card p-7 space-y-5">
                <h3 className="font-semibold text-navy-900 text-sm uppercase tracking-widest border-b border-slate-100 pb-4">
                  Contact Details
                </h3>
                {infoItems.map(({ icon: Icon, label, values }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gold-50 flex items-center justify-center shrink-0">
                      <Icon size={14} className="text-gold-500" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                      {values.map((v) => (
                        <p key={v} className="text-navy-900 text-sm font-medium">{v}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Webmail */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-5 text-center">
                <p className="text-slate-500 text-xs mb-2">Staff access</p>
                <a href="mailto:contact@eastqueengroup.com" className="text-gold-500 hover:text-gold-600 text-sm font-semibold transition-colors">
                  Staff Webmail Login →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
