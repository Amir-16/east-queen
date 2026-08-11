import { motion } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function TermsConditions() {
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
              <span className="text-amber-400">Terms & Conditions</span>
            </motion.nav>
            <motion.h1 variants={fadeUp} className="font-display text-4xl md:text-5xl font-bold">
              Terms & Conditions
            </motion.h1>
            <motion.p variants={fadeUp} className="text-zinc-400 mt-3 text-sm italic">
              Last updated: June 2025
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
              Welcome to East Queen Group. By accessing and using this website, you accept and agree to be bound
              by the terms and provisions of this agreement.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Use of Website</h2>
            <p>
              This website is provided for informational purposes about East Queen Group and its subsidiaries.
              All content on this website is the exclusive property of East Queen Group and is protected by
              applicable copyright and trademark laws.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Intellectual Property</h2>
            <p>
              All content including text, images, graphics, logos, and videos on this website are owned by
              or licensed to East Queen Group. Unauthorized use, reproduction, or distribution of any content
              is strictly prohibited.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Disclaimer</h2>
            <p>
              The information provided on this website is for general informational purposes only. While we
              strive to keep information up-to-date and accurate, East Queen Group makes no representations
              or warranties of any kind, express or implied, about the completeness, accuracy, or reliability
              of the information.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Limitation of Liability</h2>
            <p>
              East Queen Group shall not be liable for any indirect, incidental, special, consequential, or
              punitive damages resulting from your access to or use of (or inability to access or use) our
              website or any content provided hereon.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">External Links</h2>
            <p>
              Our website may contain links to external websites. These links are provided for your convenience.
              East Queen Group has no control over the content of those sites and accepts no responsibility for
              them or for any loss or damage that may arise from your use of them.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of Bangladesh.
              Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction
              of the courts of Bangladesh.
            </p>

            <h2 className="font-display text-2xl font-bold text-white">Contact</h2>
            <p>
              For any questions regarding these Terms & Conditions, please contact us at:{' '}
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
