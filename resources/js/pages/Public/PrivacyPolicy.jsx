import { pageTransition } from '@/lib/motion'
import { motion } from 'framer-motion'
import LegalLayout from '@/components/public/ui/LegalLayout'

const sections = [
  {
    id:      'introduction',
    title:   'Introduction',
    content: (
      <>
        <p>East Queen Group ("we", "us", or "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and the choices available to you when you visit our website or contact us.</p>
        <p>By using our website you agree to the collection and use of information in accordance with this policy. If you disagree, please refrain from using our services.</p>
      </>
    ),
  },
  {
    id:      'data-collected',
    title:   'Data We Collect',
    content: (
      <>
        <p>We may collect the following categories of information:</p>
        <ul>
          <li><strong>Contact Information</strong> – name, email address, phone number, and company name provided through our contact form.</li>
          <li><strong>Usage Data</strong> – browser type, IP address, pages visited, and time spent on site via server logs and analytics tools.</li>
          <li><strong>Communication Records</strong> – any messages you send us via email or our contact form.</li>
        </ul>
        <p>We do not collect sensitive personal data such as financial information, government IDs, or health records.</p>
      </>
    ),
  },
  {
    id:      'how-we-use',
    title:   'How We Use Your Data',
    content: (
      <>
        <p>Information collected is used for the following purposes:</p>
        <ul>
          <li>To respond to your enquiries and provide requested information.</li>
          <li>To improve our website content and user experience.</li>
          <li>To comply with legal and regulatory obligations.</li>
          <li>To send occasional service updates if you have opted in.</li>
        </ul>
        <p>We do not sell, trade, or rent your personal information to third parties for marketing purposes.</p>
      </>
    ),
  },
  {
    id:      'cookies',
    title:   'Cookies & Tracking',
    content: (
      <>
        <p>Our website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device. We use:</p>
        <ul>
          <li><strong>Essential Cookies</strong> – required for basic site functionality.</li>
          <li><strong>Analytics Cookies</strong> – anonymous data about how visitors use the site (e.g., Google Analytics).</li>
        </ul>
        <p>You can disable cookies in your browser settings; however, some features may not function correctly as a result.</p>
      </>
    ),
  },
  {
    id:      'third-parties',
    title:   'Third-Party Services',
    content: (
      <>
        <p>We may use trusted third-party services to operate our website. These include:</p>
        <ul>
          <li>Google Analytics for website usage statistics.</li>
          <li>Google Maps for location display.</li>
          <li>Hosting and infrastructure providers.</li>
        </ul>
        <p>Each third party is bound by its own privacy policy. We encourage you to review their terms.</p>
      </>
    ),
  },
  {
    id:      'data-retention',
    title:   'Data Retention',
    content: (
      <>
        <p>We retain personal data only for as long as necessary to fulfil the purposes described in this policy or as required by applicable law. Contact form submissions are typically retained for 24 months unless a longer retention period is required for legal or business reasons.</p>
      </>
    ),
  },
  {
    id:      'your-rights',
    title:   'Your Rights',
    content: (
      <>
        <p>Depending on your jurisdiction, you may have the right to:</p>
        <ul>
          <li>Access the personal data we hold about you.</li>
          <li>Request correction of inaccurate data.</li>
          <li>Request deletion of your data ("right to be forgotten").</li>
          <li>Withdraw consent where processing is based on consent.</li>
          <li>Lodge a complaint with a supervisory authority.</li>
        </ul>
        <p>To exercise any of these rights, please contact us at <strong>contact@eastqueengroup.com</strong>.</p>
      </>
    ),
  },
  {
    id:      'changes',
    title:   'Changes to This Policy',
    content: (
      <>
        <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with a revised effective date. We encourage you to review this policy periodically. Continued use of the website following any changes constitutes acceptance of the revised policy.</p>
        <p><strong>Effective Date:</strong> 1 January 2024</p>
      </>
    ),
  },
]

export default function PrivacyPolicy() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <LegalLayout
        title="Privacy Policy"
        subtitle="How East Queen Group collects, uses, and protects your personal information."
        sections={sections}
        otherPage={{ label: 'Terms & Conditions', href: '/terms' }}
      />
    </motion.div>
  )
}
