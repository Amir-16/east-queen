import { Head, usePage } from '@inertiajs/react'

const SITE_NAME = 'East Queen Group'

export default function PageHead({ title, description, image, noIndex = false }) {
  const { seo } = usePage().props

  const resolvedTitle       = title ? `${title} | ${SITE_NAME}` : (seo?.meta_title ?? SITE_NAME)
  const resolvedDescription = description ?? seo?.meta_description ?? ''
  const resolvedImage       = image ?? seo?.og_image ?? ''

  return (
    <Head title={resolvedTitle}>
      {resolvedDescription && <meta name="description" content={resolvedDescription} />}

      <meta property="og:type"  content="website" />
      <meta property="og:title" content={resolvedTitle} />
      {resolvedDescription && <meta property="og:description" content={resolvedDescription} />}
      {resolvedImage       && <meta property="og:image"       content={resolvedImage} />}

      <meta name="twitter:card"  content="summary_large_image" />
      <meta name="twitter:title" content={resolvedTitle} />
      {resolvedDescription && <meta name="twitter:description" content={resolvedDescription} />}
      {resolvedImage       && <meta name="twitter:image"       content={resolvedImage} />}

      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Head>
  )
}
