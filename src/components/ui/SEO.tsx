import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
}

const SITE_NAME = 'East Queen Group'
const BASE_URL  = 'https://eastqueengroup.com'
const DEFAULT_DESC = 'East Queen Group — a diversified industrial conglomerate based in Bangladesh, specialising in international trade, ship breaking, LPG energy, fisheries, and commodity import/export since 1982.'
const DEFAULT_IMAGE = `${BASE_URL}/images/brand/og-image.png`

export default function SEO({ title, description = DEFAULT_DESC, image = DEFAULT_IMAGE, url }: SEOProps) {
  const fullTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} — Industrial Excellence Since 1982`
  const canonical = url ? `${BASE_URL}${url}` : BASE_URL

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type"        content="website" />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:site_name"   content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* Structured data — Organization */}
      <script type="application/ld+json">{JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'East Queen Group',
        url: BASE_URL,
        foundingDate: '1982',
        address: { '@type': 'PostalAddress', addressCountry: 'BD', addressLocality: 'Dhaka' },
        contactPoint: [
          { '@type': 'ContactPoint', telephone: '+8801713042261', contactType: 'customer service' },
        ],
      })}</script>
    </Helmet>
  )
}
