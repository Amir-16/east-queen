export const COMPANY = {
  name: 'Jonith Bogdad Technical Services L.L.C',
  shortName: 'Jonith Bogdad',
  tagline: 'Building Excellence Across the UAE',
  description: 'Dubai-based technical services specializing in sports facilities, flooring systems, fencing solutions, and civil works.',
  phone: '+971 4 334 2290',
  mobile: '+971 54 395 9700',
  email: 'Info@jonith-bogdad.com',
  address: 'The Plaza, Office 17G, Deira Creek, Dubai, UAE',
  addressLine1: 'The Plaza, Office 17G',
  addressLine2: 'Deira Creek, Dubai, United Arab Emirates',
  whatsappUrl: 'https://wa.me/971543959700',
  whatsappNumber: '971543959700',
  googleMapsUrl: 'https://maps.google.com/?q=The+Plaza+Office+17G+Deira+Creek+Dubai+UAE',
  googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0!2d55.3047!3d25.2697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE2JzExLjAiTiA1NcKwMTgnMTYuOSJF!5e0!3m2!1sen!2sae!4v1620000000000!5m2!1sen!2sae',
}

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  {
    label: 'Services',
    path: '/services',
    children: [
      { label: 'Sports Facilities', path: '/services/sports-facilities' },
      { label: 'Flooring Solutions', path: '/services/flooring-solutions' },
      { label: 'Fencing & Safety', path: '/services/fencing-safety' },
      { label: 'Swimming Pool Works', path: '/services/swimming-pool' },
      { label: 'Civil & Construction', path: '/services/civil-works' },
      { label: 'Carpentry Works', path: '/services/carpentry' },
      { label: 'Refurbishment', path: '/services/refurbishment' },
      { label: "Kids' Play Areas & Recreation", path: '/services/kids-recreation' },
    ],
  },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
]

export const SERVICE_CATEGORIES = [
  { label: 'All', value: 'all' },
  { label: 'Sports', value: 'sports' },
  { label: 'Flooring', value: 'flooring' },
  { label: 'Fencing', value: 'fencing' },
  { label: 'Swimming Pool', value: 'swimming-pool' },
  { label: 'Civil Works', value: 'civil' },
  { label: 'Carpentry', value: 'carpentry' },
  { label: 'Maintenance', value: 'maintenance' },
  { label: 'Recreation', value: 'recreation' },
]
