import { pageTransition } from '@/lib/motion'
import { motion } from 'framer-motion'
import LegalLayout from '@/components/public/ui/LegalLayout'

const sections = [
  {
    id:      'acceptance',
    title:   'Acceptance of Terms',
    content: (
      <>
        <p>By accessing or using the East Queen Group website ("Site"), you agree to be bound by these Terms and Conditions. If you do not agree to all the terms stated herein, please discontinue use of this Site immediately.</p>
        <p>These terms apply to all visitors, users, and anyone who accesses or uses the Site.</p>
      </>
    ),
  },
  {
    id:      'use-of-site',
    title:   'Use of the Site',
    content: (
      <>
        <p>You agree to use this Site for lawful purposes only and in a manner that does not infringe on the rights of others. Specifically, you must not:</p>
        <ul>
          <li>Transmit spam, unsolicited communications, or disruptive content.</li>
          <li>Attempt to gain unauthorised access to our systems or networks.</li>
          <li>Use automated means (bots, scrapers) to access or harvest site content without prior written consent.</li>
          <li>Impersonate East Queen Group or any of its employees or representatives.</li>
        </ul>
      </>
    ),
  },
  {
    id:      'intellectual-property',
    title:   'Intellectual Property',
    content: (
      <>
        <p>All content on this Site — including text, images, graphics, logos, and software — is the property of East Queen Group or its licensors and is protected by applicable copyright, trademark, and intellectual property laws.</p>
        <p>You may not reproduce, distribute, modify, or create derivative works without our express written permission. Limited personal and non-commercial use is permitted provided attribution is maintained.</p>
      </>
    ),
  },
  {
    id:      'disclaimer',
    title:   'Disclaimer of Warranties',
    content: (
      <>
        <p>The information on this Site is provided on an "as is" and "as available" basis without any warranty of any kind, either expressed or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
        <p>East Queen Group makes no warranty that the Site will be uninterrupted, timely, secure, or error-free.</p>
      </>
    ),
  },
  {
    id:      'limitation-of-liability',
    title:   'Limitation of Liability',
    content: (
      <>
        <p>To the maximum extent permitted by applicable law, East Queen Group shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, this Site or its content.</p>
        <p>In no event shall our total liability to you for all claims exceed the amount paid by you, if any, for accessing the Site.</p>
      </>
    ),
  },
  {
    id:      'third-party-links',
    title:   'Third-Party Links',
    content: (
      <>
        <p>Our Site may contain links to third-party websites for convenience. These links do not constitute an endorsement of those sites. East Queen Group has no control over the content of linked third-party sites and accepts no liability for any loss or damage arising from your use of them.</p>
        <p>We encourage you to read the terms and privacy policies of any third-party sites you visit.</p>
      </>
    ),
  },
  {
    id:      'governing-law',
    title:   'Governing Law',
    content: (
      <>
        <p>These Terms shall be governed by and construed in accordance with the laws of the People's Republic of Bangladesh. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Bangladesh.</p>
      </>
    ),
  },
  {
    id:      'changes',
    title:   'Changes to Terms',
    content: (
      <>
        <p>East Queen Group reserves the right to modify these Terms at any time. Changes will take effect immediately upon posting to the Site. Your continued use of the Site following any changes constitutes your acceptance of the new Terms.</p>
        <p><strong>Last Updated:</strong> 1 January 2024</p>
      </>
    ),
  },
  {
    id:      'contact',
    title:   'Contact Us',
    content: (
      <>
        <p>If you have any questions about these Terms and Conditions, please contact us:</p>
        <ul>
          <li><strong>Email:</strong> contact@eastqueengroup.com</li>
          <li><strong>Phone:</strong> +880 1713 042261</li>
          <li><strong>Address:</strong> Dhaka, Bangladesh</li>
        </ul>
      </>
    ),
  },
]

export default function TermsConditions() {
  return (
    <motion.div variants={pageTransition} initial="initial" animate="animate" exit="exit">
      <LegalLayout
        title="Terms & Conditions"
        subtitle="Please read these terms carefully before using the East Queen Group website."
        sections={sections}
        otherPage={{ label: 'Privacy Policy', href: '/privacy-policy' }}
      />
    </motion.div>
  )
}
