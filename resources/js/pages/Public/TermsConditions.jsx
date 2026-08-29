import LegalLayout from '@/components/public/ui/LegalLayout'

const CONTACT_EMAIL = 'contact@eastqueengroup.com'

const sections = [
  {
    id: 'introduction',
    title: 'Agreement to Terms',
    content: (
      <p>
        Welcome to East Queen Group. By accessing and using this website, you accept and agree
        to be bound by the terms and provisions of this agreement. If you do not agree to these
        terms, please refrain from using our website.
      </p>
    ),
  },
  {
    id: 'use-of-website',
    title: 'Use of Website',
    content: (
      <p>
        This website is provided for informational purposes about East Queen Group and its
        subsidiaries. All content on this website is the exclusive property of East Queen Group
        and is protected by applicable copyright and trademark laws. You may not use this site
        for any unlawful purpose or in any way that could damage, disable, or impair the site.
      </p>
    ),
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: (
      <>
        <p>
          All content including text, images, graphics, logos, and videos on this website are
          owned by or licensed to East Queen Group. Unauthorized use, reproduction, or
          distribution of any content is strictly prohibited.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Text & Copy', 'Images & Graphics', 'Logos & Branding', 'Videos', 'Trade Marks'].map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-1.5 px-3 py-1.5
                         rounded-lg border border-slate-200 bg-slate-50
                         text-slate-600 text-[12px] font-medium"
            >
              <span className="w-1 h-1 rounded-full bg-navy-900" />
              {label}
            </span>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer',
    content: (
      <p>
        The information provided on this website is for general informational purposes only.
        While we strive to keep information up-to-date and accurate, East Queen Group makes no
        representations or warranties of any kind, express or implied, about the completeness,
        accuracy, or reliability of the information contained herein.
      </p>
    ),
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    content: (
      <p>
        East Queen Group shall not be liable for any indirect, incidental, special, consequential,
        or punitive damages resulting from your access to or use of (or inability to access or use)
        our website or any content provided hereon. Your sole remedy for dissatisfaction with the
        site is to stop using it.
      </p>
    ),
  },
  {
    id: 'external-links',
    title: 'External Links',
    content: (
      <p>
        Our website may contain links to external websites provided for your convenience.
        East Queen Group has no control over the content of those sites and accepts no
        responsibility for them or for any loss or damage that may arise from your use of them.
        We recommend reviewing the privacy policy of every site you visit.
      </p>
    ),
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    content: (
      <p>
        These terms and conditions are governed by and construed in accordance with the laws
        of Bangladesh. Any disputes relating to these terms and conditions will be subject to
        the exclusive jurisdiction of the courts of Bangladesh. If any provision of these terms
        is found to be invalid, the remaining provisions shall continue in full force.
      </p>
    ),
  },
  {
    id: 'contact',
    title: 'Contact',
    content: (
      <>
        <p>
          For any questions regarding these Terms &amp; Conditions, please contact us. We aim
          to respond to all legal enquiries within 3 business days.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-xl
                     bg-navy-950 text-white text-[13px] font-semibold
                     hover:bg-navy-800 transition-colors duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-gold-500" />
          {CONTACT_EMAIL}
        </a>
      </>
    ),
  },
]

export default function TermsConditions() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      eyebrow="Legal · Terms"
      date="Last Updated: June 2025"
      description="Please read these terms carefully before using our website. By accessing eastqueengroup.com you agree to be bound by the provisions outlined below."
      sections={sections}
      otherPage={{ label: 'View Privacy Policy', href: '/privacy-policy' }}
    />
  )
}
