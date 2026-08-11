export interface Company {
  id: string
  name: string
  tagline: string
  description: string          // short (card/hero subtitle)
  longDescription?: string[]   // full paragraphs for detail page
  industry: 'shipping' | 'energy' | 'fisheries' | 'food' | 'construction' | 'trading'
  services: string[]
  logo?: string
  coverImage?: string
  galleryImages?: string[]     // 3-6 images for detail page gallery
  founded?: number
  teamSize?: number
  website?: string
  pdfUrl?: string
  exportItems?: string[]
  importItems?: string[]
  color: string
}

export interface Product {
  id: string
  urlSlug: string              // MUST match old sitemap URL segment exactly
  type: 'export' | 'import'
  name: string
  category: string
  description: string          // short (card preview)
  longDescription?: string[]   // array of paragraphs for detail page
  detailTitle?: string         // H2 on detail page
  icon: string
  image?: string               // hero/card image
  galleryImages?: string[]     // 3-4 images for detail gallery strip
  useCases?: string[]          // bullet list (import products)
  specs?: Record<string, string>
  tags?: string[]
}

export interface Associate {
  id: string
  name: string
  logo?: string
  country?: string
  website?: string             // external URL
  description?: string
  initials: string
  color: string
}

export interface GalleryItem {
  id: string
  src: string
  thumbnail?: string
  alt: string
  category: 'operations' | 'facilities' | 'team' | 'products'
  caption?: string
  width?: number
  height?: number
}

export interface TimelineEvent {
  year: number
  title: string
  description: string
  milestone?: boolean
}

export interface NavItem {
  label: string
  href?: string                // omit for dropdown-only parent items
  external?: boolean           // true = target="_blank"
  children?: NavItem[]
}

export interface StatItem {
  value: number
  suffix: string
  label: string
}

export interface ProcessStep {
  step: number
  title: string
  description: string
  icon: string
}
