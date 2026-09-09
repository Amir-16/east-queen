import { Toaster } from 'sonner'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollProgressBar from './ScrollProgressBar'
import BackToTop from '@/components/public/ui/BackToTop'
import WhatsAppButton from '@/components/public/ui/WhatsAppButton'
import PageLoader from '@/components/public/ui/PageLoader'

export default function PublicLayout({ children }) {
  return (
    <>
      <PageLoader />
      <ScrollProgressBar />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <BackToTop />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </>
  )
}
