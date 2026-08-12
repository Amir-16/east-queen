import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollProgressBar from '@/components/layout/ScrollProgressBar'
import PageLoader from '@/components/ui/PageLoader'
import BackToTop from '@/components/ui/BackToTop'
import WhatsAppButton from '@/components/ui/WhatsAppButton'

// Core pages
const Home         = lazy(() => import('@/pages/Home'))
const About        = lazy(() => import('@/pages/About'))
const Export       = lazy(() => import('@/pages/Export'))
const Import       = lazy(() => import('@/pages/Import'))
const Gallery      = lazy(() => import('@/pages/Gallery'))
const Contact      = lazy(() => import('@/pages/Contact'))
const ShipBreaking = lazy(() => import('@/pages/ShipBreaking'))

// Company detail pages (6)
const CompanyDetail = lazy(() => import('@/pages/CompanyDetail'))

// Product detail pages (shared template)
const ProductDetail = lazy(() => import('@/pages/ProductDetail'))

// About sub-pages
const MissionVision = lazy(() => import('@/pages/MissionVision'))
const CoreValues    = lazy(() => import('@/pages/CoreValues'))

// Legal & utility
const PrivacyPolicy   = lazy(() => import('@/pages/PrivacyPolicy'))
const TermsConditions = lazy(() => import('@/pages/TermsConditions'))
const NotFound        = lazy(() => import('@/pages/NotFound'))

export default function App() {
  const location = useLocation()

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <Suspense fallback={<PageLoader />}>
            <Routes location={location} key={location.pathname}>

              {/* ── Core pages ────────────────────────────────────── */}
              <Route path="/"                  element={<Home />} />
              <Route path="/about-east-queen"        element={<About />} />
              <Route path="/mission-vision-purpose"  element={<MissionVision />} />
              <Route path="/our-core-values"         element={<CoreValues />} />
              <Route path="/export"            element={<Export />} />
              <Route path="/import"            element={<Import />} />
              <Route path="/gallery"           element={<Gallery />} />
              <Route path="/contact-us"        element={<Contact />} />
              <Route path="/ship-breaking"     element={<ShipBreaking />} />

              {/* ── Company/concern detail (6) ────────────────────── */}
              <Route path="/con-ariko-international"   element={<CompanyDetail slug="ariko-international" />} />
              <Route path="/con-east-queen-shipping"   element={<CompanyDetail slug="east-queen-shipping" />} />
              <Route path="/con-bay-gas"               element={<CompanyDetail slug="bay-gas" />} />
              <Route path="/con-syedpur-fisheries"     element={<CompanyDetail slug="syedpur-fisheries" />} />
              <Route path="/con-bsc-ltd"               element={<CompanyDetail slug="bsc-limited" />} />
              <Route path="/con-marinona-foodstaff"    element={<CompanyDetail slug="marinona-foodstaff" />} />

              {/* ── Export product detail (6) ─────────────────────── */}
              <Route path="/export-mill-scale"                    element={<ProductDetail slug="mill-scale"              type="export" />} />
              <Route path="/export-zinc-oxide"                    element={<ProductDetail slug="zinc-oxide"               type="export" />} />
              <Route path="/export-pet-flakes"                    element={<ProductDetail slug="pet-flakes"               type="export" />} />
              <Route path="/export-fresh-vegetables-and-fruits"   element={<ProductDetail slug="vegetables-fruits"        type="export" />} />
              <Route path="/export-leather-goods"                 element={<ProductDetail slug="leather-goods"            type="export" />} />
              <Route path="/export-jute-made-products"            element={<ProductDetail slug="jute-products"            type="export" />} />

              {/* ── Import product detail (5 + 1 redirect) ──────────── */}
              <Route path="/import-aggregate"                     element={<ProductDetail slug="aggregate"                type="import" />} />
              <Route path="/import-gabbro"                        element={<Navigate to="/import-aggregate" replace />} />
              <Route path="/import-lime-stone"                    element={<ProductDetail slug="limestone"                type="import" />} />
              <Route path="/import-coal"                          element={<ProductDetail slug="coal"                     type="import" />} />
              <Route path="/import-steel-scraps"                  element={<ProductDetail slug="steel-scraps"             type="import" />} />
              <Route path="/import-automobile-spare-parts"        element={<ProductDetail slug="auto-spare-parts"         type="import" />} />

              {/* ── Soft redirects from old/wrong internal URLs ──────── */}
              <Route path="/about"       element={<Navigate to="/about-east-queen" replace />} />
              <Route path="/contact"     element={<Navigate to="/contact-us"        replace />} />
              <Route path="/companies"   element={<Navigate to="/about-east-queen" replace />} />
              <Route path="/associates"  element={<Navigate to="/about-east-queen" replace />} />

              {/* ── Legal pages ──────────────────────────────────────── */}
              <Route path="/privacy-policy"       element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsConditions />} />

              {/* ── Catch-all 404 ────────────────────────────────────── */}
              <Route path="*" element={<NotFound />} />

            </Routes>
          </Suspense>
        </AnimatePresence>
      </main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
    </>
  )
}
