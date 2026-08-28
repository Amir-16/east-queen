import { usePage, Head } from '@inertiajs/react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar      from './Navbar'
import Footer      from './Footer'
import ScrollToTop from './ScrollToTop'

const EASE = [0.22, 1, 0.36, 1]

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export default function PageLayout({ children }) {
  const { url, props: { seo = {} } } = usePage()

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#fdfcf8' }}>
      {/* Global SEO meta — individual pages can override via their own <Head> */}
      {seo.meta_title       && <Head title={seo.meta_title} />}
      {seo.meta_description && <Head><meta name="description"        content={seo.meta_description} /></Head>}
      {seo.keywords         && <Head><meta name="keywords"           content={seo.keywords} /></Head>}
      {seo.canonical_url    && <Head><link rel="canonical"           href={seo.canonical_url} /></Head>}
      {seo.og_image         && <Head><meta property="og:image"       content={seo.og_image} /></Head>}
      {seo.meta_title       && <Head><meta property="og:title"       content={seo.meta_title} /></Head>}
      {seo.meta_description && <Head><meta property="og:description" content={seo.meta_description} /></Head>}

      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <PageWrapper key={url}>
            {children}
          </PageWrapper>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}
