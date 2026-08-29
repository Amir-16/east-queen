import LegalLayout from '@/components/public/ui/LegalLayout'

const CONTACT_EMAIL = 'contact@eastqueengroup.com'

const sections = [
  {
    id: 'introduction',
    title: 'Our Commitment to Privacy',
    content: (
      <p>
        East Queen Group is committed to protecting your privacy. This Privacy Policy outlines
        how we collect, use, and safeguard your personal information when you visit our website
        (www.eastqueengroup.com). By using our site you agree to the terms described below.
      </p>
    ),
  },
  {
    id: 'interpretation',
    title: 'Interpretation & Definitions',
    content: (
      <>
        <p>
          The words of which the initial letter is capitalised have meanings defined under the
          following conditions. These definitions shall have the same meaning regardless of
          whether they appear in singular or plural.
        </p>

        <div className="mt-6 grid gap-3">
          {[
            { term: 'Account',       def: 'A unique account created for You to access our Service or parts of our Service.' },
            { term: 'Affiliate',     def: 'An entity that controls, is controlled by, or is under common control with a party — where "control" means ownership of 50% or more of the shares, equity interest, or other voting securities.' },
            { term: 'Company',       def: 'Referred to as "the Company", "We", "Us" or "Our" in this Agreement — refers to East Queen Group.' },
            { term: 'Cookies',       def: 'Small files placed on Your computer, mobile device, or any other device by a website, containing browsing history details.' },
            { term: 'Country',       def: 'Refers to Bangladesh.' },
            { term: 'Device',        def: 'Any device that can access the Service — such as a computer, a cellphone, or a digital tablet.' },
            { term: 'Personal Data', def: 'Any information that relates to an identified or identifiable individual.' },
            { term: 'Service',       def: 'Refers to the Website.' },
          ].map(({ term, def }) => (
            <div
              key={term}
              className="flex gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100
                         hover:border-gold-200/60 transition-colors duration-200"
            >
              <span className="shrink-0 font-semibold text-slate-900 text-[13px] w-28">{term}</span>
              <span className="text-slate-500 text-[14px] leading-relaxed">{def}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'information-collected',
    title: 'Information We Collect',
    content: (
      <p>
        We may collect personal information that you voluntarily provide when you contact us
        through our website — including your name, email address, phone number, and message
        content. We use this information solely to respond to your inquiries and do not collect
        any data through automated tracking or analytics without your knowledge.
      </p>
    ),
  },
  {
    id: 'how-we-use',
    title: 'How We Use Your Information',
    content: (
      <>
        <p>
          We use the collected information to respond to your queries, improve our services,
          and communicate with you about our products and offerings. We do not sell, trade,
          or otherwise transfer your personal information to outside parties.
        </p>
        <div className="mt-5 grid sm:grid-cols-2 gap-3">
          {[
            'Respond to your inquiries promptly',
            'Improve our website and services',
            'Communicate about relevant offerings',
            'Maintain accurate business records',
          ].map((point) => (
            <div
              key={point}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200"
            >
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gold-500 shrink-0" />
              <span className="text-slate-600 text-[13px] leading-snug">{point}</span>
            </div>
          ))}
        </div>
      </>
    ),
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: (
      <>
        <p>
          If you have any questions about this Privacy Policy or how we handle your personal
          data, please do not hesitate to reach out. We aim to respond to all privacy
          enquiries within 2 business days.
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-xl
                     bg-navy-950 text-white text-[13px] font-semibold
                     hover:bg-navy-800 transition-colors duration-200 group"
        >
          <span className="w-2 h-2 rounded-full bg-gold-500" />
          {CONTACT_EMAIL}
        </a>
      </>
    ),
  },
]

export default function PrivacyPolicy() {
  return (
    <LegalLayout
      title="Privacy Policy"
      eyebrow="Legal · Privacy"
      date="Effective Date: June 2025"
      description="East Queen Group is committed to protecting your privacy. Read how we collect, use, and safeguard the personal information you share with us."
      sections={sections}
      otherPage={{ label: 'View Terms & Conditions', href: '/terms-and-conditions' }}
    />
  )
}
