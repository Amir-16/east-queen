import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-950 text-white"
    >
      {/* Hero */}
      <section className="py-24 bg-zinc-900/40 border-b border-zinc-800">
        <div className="section-container">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.nav variants={fadeUp} className="flex items-center gap-2 text-zinc-400 text-sm mb-4">
              <Link to="/" className="hover:text-amber-400 transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-amber-400">Privacy Policy</span>
            </motion.nav>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold">
              Privacy Policy
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-400 mt-3 text-sm italic">
              Effective Date: June 2025
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="section-container max-w-4xl">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="prose prose-invert prose-zinc max-w-none text-zinc-300 leading-relaxed space-y-6"
          >
            <p>
              East Queen Group is committed to protecting your privacy. This Privacy Policy outlines how we collect,
              use, and safeguard your personal information when you visit our website (www.eastqueengroup.com).
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Interpretation and Definitions</h2>
            <h3 className="font-display text-lg font-semibold text-amber-400">Interpretation</h3>
            <p>
              The words of which the initial letter is capitalized have meanings defined under the following conditions.
              The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
            </p>

            <h3 className="font-display text-lg font-semibold text-amber-400">Definitions</h3>
            <p>For the purposes of this Privacy Policy:</p>
            <ul className="space-y-2 list-disc list-inside text-zinc-300">
              <li><strong className="text-white">Account</strong> means a unique account created for You to access our Service or parts of our Service.</li>
              <li><strong className="text-white">Affiliate</strong> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.</li>
              <li><strong className="text-white">Company</strong> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to East Queen Group.</li>
              <li><strong className="text-white">Cookies</strong> are small files that are placed on Your computer, mobile device or any other device by a website.</li>
              <li><strong className="text-white">Country</strong> refers to Bangladesh.</li>
              <li><strong className="text-white">Device</strong> means any device that can access the Service such as a computer, a cellphone or a digital tablet.</li>
              <li><strong className="text-white">Personal Data</strong> is any information that relates to an identified or identifiable individual.</li>
              <li><strong className="text-white">Service</strong> refers to the Website.</li>
            </ul>

            <h2 className="font-display text-2xl font-bold text-white">Information We Collect</h2>
            <p>
              We may collect personal information that you voluntarily provide to us when you contact us through our website,
              including your name, email address, phone number, and message content. We use this information solely to
              respond to your inquiries.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">How We Use Your Information</h2>
            <p>
              We use the collected information to respond to your queries, improve our services, and communicate
              with you about our products and services. We do not sell, trade, or otherwise transfer your personal
              information to outside parties.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:contact@eastqueengroup.com" className="text-amber-400 hover:text-amber-300">
                contact@eastqueengroup.com
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
