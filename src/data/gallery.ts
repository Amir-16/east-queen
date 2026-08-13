import type { GalleryItem } from '@/types'

const V = 'video' as const   // shorthand keeps rows compact

export const galleryItems: GalleryItem[] = [

  // ── IMAGES ─────────────────────────────────────────────────────────────

  { id: '1',  src: '/images/ship-breaking/scrap-urban-1.jpeg',               alt: 'Ship breaking yard', category: 'operations', caption: 'East Queen — ship breaking operations, Chittagong yard' },
  { id: '2',  src: '/images/ship-breaking/scrap-urban-2.jpeg',               alt: 'Steel scrap from vessels', category: 'operations', caption: 'Processed steel scrap ready for re-rolling mills' },
  { id: '3',  src: '/images/ship-breaking/coastal-view.jpeg',                alt: 'Coastal yard panorama', category: 'operations', caption: 'Ship breaking yard — Bay of Bengal coastline, Chittagong' },
  { id: '4',  src: '/images/shipping/bbg-master-night.jpeg',                 alt: 'EQ vessel at night', category: 'operations', caption: 'East Queen Shipping fleet — bulk carrier at Chittagong port' },
  { id: '5',  src: '/images/shipping/harmonia-arrival.jpeg',                 alt: 'Vessel arriving at port', category: 'operations', caption: 'Vessel arrival — bulk cargo operations' },
  { id: '6',  src: '/images/products/imports/aggregate/gabbro-1.jpeg',      alt: 'Gabbro aggregate stones', category: 'products', caption: 'Gabbro aggregate — imported from Oman for infrastructure projects' },
  { id: '7',  src: '/images/products/imports/aggregate/aggregate-3.jpeg',   alt: 'Crushed aggregate stockpile', category: 'products', caption: 'Aggregate stockpile — BSC Limited supply yard' },
  { id: '8',  src: '/images/products/imports/coal/hold-aerial-1.jpeg',      alt: 'Coal in vessel hold', category: 'products', caption: 'Thermal coal cargo — Ariko International import, 5,500 kcal/kg' },
  { id: '9',  src: '/images/products/exports/mill-scale/mill-1.jpeg',       alt: 'Mill scale material', category: 'products', caption: 'Mill scale — processed and export-ready, Fe ≥ 68%' },
  { id: '10', src: '/images/products/exports/mill-scale/mill-3.jpeg',       alt: 'Mill scale bulk', category: 'products', caption: 'Bulk mill scale shipment — Chittagong port' },
  { id: '11', src: '/images/products/exports/pet-flakes/bales-1.jpeg',      alt: 'PET flake bales', category: 'products', caption: 'PET flake bales — recycled, washed, export grade ≥ 98% purity' },
  { id: '12', src: '/images/products/exports/pet-flakes/bales-indoor.jpeg', alt: 'PET flakes indoor stock', category: 'products', caption: 'PET flakes stockpile — ready for container loading' },
  { id: '13', src: '/images/products/exports/jute/jute-1.jpeg',             alt: 'Jute bales', category: 'products', caption: "Golden jute — Bangladesh's finest natural fibre export" },
  { id: '14', src: '/images/products/exports/jute/jute-2.jpeg',             alt: 'Jute processing', category: 'products', caption: 'Jute yarn production — eco-friendly textile raw material' },
  { id: '15', src: '/images/products/exports/vegetables/eggplant-crate.jpeg', alt: 'Fresh vegetables', category: 'products', caption: 'Farm-fresh eggplant — phytosanitary certified, export to Middle East' },
  { id: '16', src: '/images/products/exports/fruits/fruits-1.jpeg',          alt: 'Tropical fruits export', category: 'products', caption: 'Tropical fruits from Bangladeshi farms — seasonal export' },
  { id: '17', src: '/images/companies/syedpur/farm-1.jpeg',                 alt: 'Syedpur Fisheries farm', category: 'facilities', caption: 'Syedpur Fisheries & Farms — freshwater aquaculture ponds' },
  { id: '18', src: '/images/companies/syedpur/farm-2.jpeg',                 alt: 'Farm operations', category: 'facilities', caption: 'Integrated farming operations — Syedpur, Chittagong' },
  { id: '19', src: '/images/companies/syedpur/coastal-land.jpeg',           alt: 'Coastal farmland', category: 'facilities', caption: 'Coastal agricultural land — sustainable farming, Bangladesh' },
  { id: '20', src: '/images/products/exports/leather/leather-2.jpeg',       alt: 'Leather wallets', category: 'products', caption: 'Premium leather goods — Bangladesh tannery district, LWG certified' },
  { id: '21', src: '/images/products/exports/leather/leather-3.jpeg',       alt: 'Leather accessories', category: 'products', caption: 'Full-grain leather accessories — export to Europe & USA' },
  { id: '22', src: '/images/products/exports/zinc-ash/drums-closeup.jpeg',  alt: 'Zinc ash drums', category: 'products', caption: 'Zinc ash in drums — 70% Zn content, ready for export' },
  { id: '23', src: '/images/products/imports/steel-scrap/scrap-1.jpeg',     alt: 'HMS steel scrap', category: 'products', caption: 'HMS 1&2 steel scrap — imported for re-rolling mills' },
  { id: '24', src: '/images/team/chairman.jpeg',                            alt: 'Chairman East Queen Group', category: 'team', caption: 'Chairman — East Queen Group, leading since 1968' },

  // ── VIDEOS — On-site Footage (WhatsApp originals, deduplicated) ─────────

  { id: 'wa01', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%208.56.07%20PM.mp4',       alt: 'On-site operations', category: 'operations', caption: 'On-site operations — East Queen yard footage' },
  { id: 'wa02', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%208.56.07%20PM%20(1).mp4', alt: 'Yard operations footage', category: 'operations', caption: 'Ship breaking yard — live operations footage' },
  { id: 'wa04', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%208.56.14%20PM.mp4',       alt: 'Industrial operations', category: 'operations', caption: 'Industrial yard operations — August 2026' },
  { id: 'wa06', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.01%20PM.mp4',       alt: 'Operations footage', category: 'operations', caption: 'East Queen Group — on-site operations' },
  { id: 'wa07', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.01%20PM%20(1).mp4', alt: 'Ship breaking footage', category: 'operations', caption: 'Ship breaking operations — live footage' },
  { id: 'wa08', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.02%20PM.mp4',       alt: 'Yard footage', category: 'operations', caption: 'Chittagong yard — operational footage' },
  { id: 'wa09', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.02%20PM%20(1).mp4', alt: 'Operations site', category: 'operations', caption: 'East Queen operations — site visit footage' },
  { id: 'wa10', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.02%20PM%20(2).mp4', alt: 'Live operations footage', category: 'operations', caption: 'Live operations — East Queen Group, 2026' },
  { id: 'wa11', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.03%20PM.mp4',       alt: 'Industrial footage', category: 'operations', caption: 'Industrial operations — East Queen yard' },
  { id: 'wa12', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.04%20PM.mp4',       alt: 'Yard operations', category: 'operations', caption: 'Yard operations — ship recycling, Chittagong' },
  { id: 'wa13', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.06%20PM.mp4',       alt: 'Operations capture', category: 'operations', caption: 'On-site operations capture — East Queen Group' },
  { id: 'wa14', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.13%20PM.mp4',       alt: 'Site operations video', category: 'operations', caption: 'East Queen operations — authentic site footage' },
  { id: 'wa15', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.19%20PM.mp4',       alt: 'Operations documentation', category: 'operations', caption: 'Operations documentation — East Queen yard, 2026' },
  { id: 'wa16', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.23%20PM.mp4',       alt: 'Yard crew at work', category: 'operations', caption: 'Yard crew — precision operations at ship breaking site' },
  { id: 'wa17', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.24%20PM.mp4',       alt: 'Industrial site footage', category: 'operations', caption: 'Industrial site — East Queen Group operations' },
  { id: 'wa18', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.29%20PM.mp4',       alt: 'Operations video', category: 'operations', caption: 'Chittagong operations — East Queen ship breaking' },
  { id: 'wa19', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.33%20PM.mp4',       alt: 'Site documentation', category: 'operations', caption: 'Site documentation — live operations, 2026' },
  { id: 'wa20', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.37%20PM.mp4',       alt: 'Operations capture', category: 'operations', caption: 'Operations capture — East Queen Group, Chittagong' },
  { id: 'wa21', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.43%20PM.mp4',       alt: 'Yard operations footage', category: 'operations', caption: 'Yard operations — East Queen ship breaking facility' },
  { id: 'wa22', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.47%20PM.mp4',       alt: 'Ship breaking footage', category: 'operations', caption: 'Ship breaking — continuous operations at Chittagong' },
  { id: 'wa23', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.48%20PM.mp4',       alt: 'Operations documentation', category: 'operations', caption: 'East Queen operations — field documentation' },
  { id: 'wa25', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.02.53%20PM.mp4',       alt: 'Operations yard footage', category: 'operations', caption: 'Yard operations — East Queen ship breaking, August 2026' },
  { id: 'wa26', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.03.00%20PM.mp4',       alt: 'Industrial operations', category: 'operations', caption: 'Industrial operations — East Queen Group' },
  { id: 'wa27', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.03.07%20PM.mp4',       alt: 'Operations footage', category: 'operations', caption: 'Live operations footage — East Queen Chittagong' },
  { id: 'wa28', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.04.25%20PM.mp4',       alt: 'Fisheries operations', category: 'facilities', caption: 'Syedpur Fisheries — freshwater aquaculture operations' },
  { id: 'wa29', type: V, src: '/WhatsApp%20Video%202026-08-06%20at%209.04.32%20PM.mp4',       alt: 'Fish farm footage', category: 'facilities', caption: 'Integrated fish farming — Syedpur Fisheries & Farms' },
]
