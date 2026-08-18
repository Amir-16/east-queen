import type { GalleryItem } from '@/types'

const V = 'video' as const

export const galleryItems: GalleryItem[] = [

  // ── IMAGES ──────────────────────────────────────────────────────────────────

  { id: 'i01', src: '/images/ship-breaking/scrap-urban-1.jpeg',               alt: 'Ship breaking yard',           category: 'operations', caption: 'East Queen — ship breaking operations, Chittagong yard' },
  { id: 'i02', src: '/images/ship-breaking/scrap-urban-2.jpeg',               alt: 'Steel scrap from vessels',     category: 'operations', caption: 'Processed steel scrap ready for re-rolling mills' },
  { id: 'i03', src: '/images/ship-breaking/coastal-view.jpeg',                alt: 'Coastal yard panorama',        category: 'operations', caption: 'Ship breaking yard — Bay of Bengal coastline, Chittagong' },
  { id: 'i04', src: '/images/shipping/bbg-master-night.jpeg',                 alt: 'EQ vessel at night',           category: 'operations', caption: 'East Queen Shipping fleet — bulk carrier at Chittagong port' },
  { id: 'i05', src: '/images/shipping/harmonia-arrival.jpeg',                 alt: 'Vessel arriving at port',      category: 'operations', caption: 'Vessel arrival — bulk cargo operations' },
  { id: 'i06', src: '/images/products/imports/aggregate/gabbro-1.jpeg',      alt: 'Gabbro aggregate stones',      category: 'products',   caption: 'Gabbro aggregate — imported from Oman for infrastructure projects' },
  { id: 'i07', src: '/images/products/imports/aggregate/aggregate-3.jpeg',   alt: 'Crushed aggregate stockpile',  category: 'products',   caption: 'Aggregate stockpile — BSC Limited supply yard' },
  { id: 'i08', src: '/images/products/imports/coal/hold-aerial-1.jpeg',      alt: 'Coal in vessel hold',          category: 'products',   caption: 'Thermal coal cargo — Ariko International import, 5,500 kcal/kg' },
  { id: 'i09', src: '/images/products/exports/mill-scale/mill-1.jpeg',       alt: 'Mill scale material',          category: 'products',   caption: 'Mill scale — processed and export-ready, Fe ≥ 68%' },
  { id: 'i10', src: '/images/products/exports/mill-scale/mill-3.jpeg',       alt: 'Mill scale bulk',              category: 'products',   caption: 'Bulk mill scale shipment — Chittagong port' },
  { id: 'i11', src: '/images/products/exports/pet-flakes/bales-1.jpeg',      alt: 'PET flake bales',              category: 'products',   caption: 'PET flake bales — recycled, washed, export grade ≥ 98% purity' },
  { id: 'i12', src: '/images/products/exports/pet-flakes/bales-indoor.jpeg', alt: 'PET flakes indoor stock',      category: 'products',   caption: 'PET flakes stockpile — ready for container loading' },
  { id: 'i13', src: '/images/products/exports/jute/jute-1.jpeg',             alt: 'Jute bales',                   category: 'products',   caption: "Golden jute — Bangladesh's finest natural fibre export" },
  { id: 'i14', src: '/images/products/exports/jute/jute-2.jpeg',             alt: 'Jute processing',              category: 'products',   caption: 'Jute yarn production — eco-friendly textile raw material' },
  { id: 'i15', src: '/images/products/exports/vegetables/eggplant-crate.jpeg', alt: 'Fresh vegetables',           category: 'products',   caption: 'Farm-fresh eggplant — phytosanitary certified, export to Middle East' },
  { id: 'i16', src: '/images/products/exports/fruits/fruits-1.jpeg',          alt: 'Tropical fruits export',      category: 'products',   caption: 'Tropical fruits from Bangladeshi farms — seasonal export' },
  { id: 'i17', src: '/images/companies/syedpur/farm-1.jpeg',                 alt: 'Syedpur Fisheries farm',       category: 'facilities', caption: 'Syedpur Fisheries & Farms — freshwater aquaculture ponds' },
  { id: 'i18', src: '/images/companies/syedpur/farm-2.jpeg',                 alt: 'Farm operations',              category: 'facilities', caption: 'Integrated farming operations — Syedpur, Chittagong' },
  { id: 'i19', src: '/images/companies/syedpur/coastal-land.jpeg',           alt: 'Coastal farmland',             category: 'facilities', caption: 'Coastal agricultural land — sustainable farming, Bangladesh' },
  { id: 'i20', src: '/images/products/exports/leather/leather-2.jpeg',       alt: 'Leather wallets',              category: 'products',   caption: 'Premium leather goods — Bangladesh tannery district, LWG certified' },
  { id: 'i21', src: '/images/products/exports/leather/leather-3.jpeg',       alt: 'Leather accessories',          category: 'products',   caption: 'Full-grain leather accessories — export to Europe & USA' },
  { id: 'i22', src: '/images/products/exports/zinc-ash/drums-closeup.jpeg',  alt: 'Zinc ash drums',               category: 'products',   caption: 'Zinc ash in drums — 70% Zn content, ready for export' },
  { id: 'i23', src: '/images/products/imports/steel-scrap/scrap-1.jpeg',     alt: 'HMS steel scrap',              category: 'products',   caption: 'HMS 1&2 steel scrap — imported for re-rolling mills' },

  // ── VIDEOS — Ship Breaking Yard ─────────────────────────────────────────────

  { id: 'sb01', type: V, src: '/videos/ship-breaking/yard-1.mp4', alt: 'Ship breaking yard footage',   category: 'operations', caption: 'Ship breaking yard — live dismantling operations, Sitakunda' },
  { id: 'sb02', type: V, src: '/videos/ship-breaking/yard-2.mp4', alt: 'Yard operations',              category: 'operations', caption: 'East Queen yard — gas-cutting and steel recovery operations' },
  { id: 'sb03', type: V, src: '/videos/ship-breaking/yard-3.mp4', alt: 'Dismantling operations',       category: 'operations', caption: 'Vessel dismantling — systematic top-to-bottom demolition' },
  { id: 'sb04', type: V, src: '/videos/ship-breaking/yard-4.mp4', alt: 'Scrap yard processing',        category: 'operations', caption: 'Scrap processing — steel plates sorted by grade' },
  { id: 'sb05', type: V, src: '/videos/ship-breaking/yard-5.mp4', alt: 'Ship breaking site',           category: 'operations', caption: 'Sitakunda ship breaking site — coastal operations view' },
  { id: 'sb06', type: V, src: '/videos/ship-breaking/yard-6.mp4', alt: 'Yard heavy equipment',         category: 'operations', caption: 'Heavy equipment operations — crane and cutting gear at work' },
  { id: 'sb07', type: V, src: '/videos/ship-breaking/yard-7.mp4', alt: 'Demolition in progress',       category: 'operations', caption: 'Demolition phase — superstructure removal operations' },
  { id: 'sb08', type: V, src: '/videos/ship-breaking/yard-8.mp4', alt: 'Steel recovery footage',       category: 'operations', caption: 'HMS steel recovery — sorted and dispatched to re-rolling mills' },
  { id: 'sb09', type: V, src: '/videos/ship-breaking/yard-9.mp4', alt: 'Full yard overview',           category: 'operations', caption: 'Full yard overview — East Queen ship recycling facility, Chittagong' },

  // ── VIDEOS — Operations ──────────────────────────────────────────────────────

  { id: 'op01', type: V, src: '/videos/operations/ops-1.mp4',    alt: 'Cargo operations',             category: 'operations', caption: 'East Queen Group — cargo handling and logistics operations' },
  { id: 'op02', type: V, src: '/videos/operations/ops-2.mp4',    alt: 'Industrial operations',        category: 'operations', caption: 'Industrial operations — bulk material handling at Chittagong' },
  { id: 'op03', type: V, src: '/videos/operations/ops-3.mp4',    alt: 'Operations site',              category: 'operations', caption: 'On-site operations — East Queen Group, August 2026' },
  { id: 'op04', type: V, src: '/videos/operations/ops-4.mp4',    alt: 'Yard crew at work',            category: 'operations', caption: 'Yard crew — precision operations and quality control' },
  { id: 'op05', type: V, src: '/videos/operations/coal-ops.mp4', alt: 'Coal handling operations',     category: 'operations', caption: 'Thermal coal operations — Ariko International import handling' },

  // ── VIDEOS — Export Operations ───────────────────────────────────────────────

  { id: 'ex01', type: V, src: '/videos/exports/export-ops-1.mp4', alt: 'Export cargo operations',    category: 'operations', caption: 'Export operations — container loading and documentation, Chittagong' },
  { id: 'ex02', type: V, src: '/videos/exports/export-ops-2.mp4', alt: 'Export loading footage',     category: 'operations', caption: 'Export loading — mill scale and PET flakes containerisation' },
  { id: 'ex03', type: V, src: '/videos/exports/export-ops-3.mp4', alt: 'Export yard operations',     category: 'operations', caption: 'Yard operations — export cargo preparation and staging' },
  { id: 'ex04', type: V, src: '/videos/exports/export-ops-4.mp4', alt: 'Container operations',       category: 'operations', caption: 'Container stuffing — export grade materials, CFS Chittagong' },
  { id: 'ex05', type: V, src: '/videos/exports/export-ops-5.mp4', alt: 'Export documentation',       category: 'operations', caption: 'Export documentation and quality inspection — East Queen Group' },

  // ── VIDEOS — Shipping / Vessel ───────────────────────────────────────────────

  { id: 'sh01', type: V, src: '/videos/shipping/vessel-1.mp4', alt: 'Vessel arrival footage',       category: 'operations', caption: 'Vessel arrival — bulk carrier berthing at Chittagong port' },
  { id: 'sh02', type: V, src: '/videos/shipping/vessel-2.mp4', alt: 'Ship operations',              category: 'operations', caption: 'East Queen Shipping — vessel operations and cargo discharge' },
  { id: 'sh03', type: V, src: '/videos/shipping/vessel-3.mp4', alt: 'Bulk carrier footage',         category: 'operations', caption: 'Bulk carrier in operation — East Queen Shipping fleet' },
  { id: 'sh04', type: V, src: '/videos/shipping/vessel-4.mp4', alt: 'Port operations',              category: 'operations', caption: 'Port operations — cargo handling and vessel management' },
  { id: 'sh05', type: V, src: '/videos/shipping/vessel-5.mp4', alt: 'Vessel loading',               category: 'operations', caption: 'Vessel loading operations — bulk cargo, Chittagong anchorage' },
  { id: 'sh06', type: V, src: '/videos/shipping/vessel-6.mp4', alt: 'Shipping operations',          category: 'operations', caption: 'Shipping operations — East Queen fleet, Bay of Bengal' },
  { id: 'sh07', type: V, src: '/videos/shipping/vessel-7.mp4', alt: 'Maritime operations',          category: 'operations', caption: 'Maritime operations — coastal navigation and vessel management' },
  { id: 'sh08', type: V, src: '/videos/shipping/vessel-8.mp4', alt: 'Vessel overview footage',      category: 'operations', caption: 'Fleet overview — East Queen Shipping bulk carrier operations' },

  // ── VIDEOS — Fisheries & Facilities ─────────────────────────────────────────

  { id: 'fi01', type: V, src: '/videos/fisheries/fisheries-1.mp4', alt: 'Fisheries operations',     category: 'facilities', caption: 'Syedpur Fisheries — freshwater aquaculture pond operations' },
  { id: 'fi02', type: V, src: '/videos/fisheries/fisheries-2.mp4', alt: 'Fish farm footage',         category: 'facilities', caption: 'Integrated fish farming — Syedpur Fisheries & Farms, Chittagong' },

  // ── VIDEOS — On-site WhatsApp Footage ───────────────────────────────────────

  { id: 'wa01', type: V, src: '/WhatsApp Video 2026-08-06 at 8.56.07 PM.mp4',       alt: 'On-site operations',    category: 'operations', caption: 'On-site operations — East Queen yard raw footage' },
  { id: 'wa02', type: V, src: '/WhatsApp Video 2026-08-06 at 8.56.07 PM (1).mp4',   alt: 'Yard footage',          category: 'operations', caption: 'Ship breaking yard — live operations footage' },
  { id: 'wa03', type: V, src: '/WhatsApp Video 2026-08-06 at 8.56.07 PM (2).mp4',   alt: 'Industrial footage',    category: 'operations', caption: 'Industrial yard — operations documentation' },
  { id: 'wa04', type: V, src: '/WhatsApp Video 2026-08-06 at 8.56.14 PM.mp4',       alt: 'Operations clip',       category: 'operations', caption: 'Industrial yard operations — August 2026' },
  { id: 'wa05', type: V, src: '/WhatsApp Video 2026-08-06 at 8.56.14 PM (1).mp4',   alt: 'Yard operations',       category: 'operations', caption: 'Yard operations — East Queen Group, Chittagong' },
  { id: 'wa06', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.01 PM.mp4',       alt: 'Site footage',          category: 'operations', caption: 'East Queen Group — on-site operations documentation' },
  { id: 'wa07', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.01 PM (1).mp4',   alt: 'Ship breaking',         category: 'operations', caption: 'Ship breaking operations — live footage' },
  { id: 'wa08', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.02 PM.mp4',       alt: 'Yard footage',          category: 'operations', caption: 'Chittagong yard — operational documentation' },
  { id: 'wa09', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.02 PM (1).mp4',   alt: 'Operations site',       category: 'operations', caption: 'East Queen operations — site visit footage' },
  { id: 'wa10', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.02 PM (2).mp4',   alt: 'Live operations',       category: 'operations', caption: 'Live operations — East Queen Group, 2026' },
  { id: 'wa11', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.03 PM.mp4',       alt: 'Industrial footage',    category: 'operations', caption: 'Industrial operations — East Queen yard' },
  { id: 'wa12', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.04 PM.mp4',       alt: 'Yard operations',       category: 'operations', caption: 'Yard operations — ship recycling, Chittagong' },
  { id: 'wa13', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.06 PM.mp4',       alt: 'Operations capture',    category: 'operations', caption: 'On-site operations capture — East Queen Group' },
  { id: 'wa14', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.13 PM.mp4',       alt: 'Site video',            category: 'operations', caption: 'East Queen operations — authentic site footage' },
  { id: 'wa15', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.19 PM.mp4',       alt: 'Operations doc',        category: 'operations', caption: 'Operations documentation — East Queen yard, 2026' },
  { id: 'wa16', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.23 PM.mp4',       alt: 'Yard crew',             category: 'operations', caption: 'Yard crew — precision operations at ship breaking site' },
  { id: 'wa17', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.24 PM.mp4',       alt: 'Industrial site',       category: 'operations', caption: 'Industrial site — East Queen Group operations' },
  { id: 'wa18', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.29 PM.mp4',       alt: 'Operations',            category: 'operations', caption: 'Chittagong operations — East Queen ship breaking' },
  { id: 'wa19', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.33 PM.mp4',       alt: 'Site documentation',    category: 'operations', caption: 'Site documentation — live operations, 2026' },
  { id: 'wa20', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.37 PM.mp4',       alt: 'Operations capture',    category: 'operations', caption: 'Operations capture — East Queen Group, Chittagong' },
  { id: 'wa21', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.43 PM.mp4',       alt: 'Yard footage',          category: 'operations', caption: 'Yard operations — East Queen ship breaking facility' },
  { id: 'wa22', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.47 PM.mp4',       alt: 'Ship breaking',         category: 'operations', caption: 'Ship breaking — continuous operations at Chittagong' },
  { id: 'wa23', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.48 PM.mp4',       alt: 'Operations',            category: 'operations', caption: 'East Queen operations — field documentation' },
  { id: 'wa24', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.48 PM (1).mp4',   alt: 'Yard capture',          category: 'operations', caption: 'Yard capture — East Queen ship breaking operations' },
  { id: 'wa25', type: V, src: '/WhatsApp Video 2026-08-06 at 9.02.53 PM.mp4',       alt: 'Yard operations',       category: 'operations', caption: 'Yard operations — East Queen ship breaking, August 2026' },
  { id: 'wa26', type: V, src: '/WhatsApp Video 2026-08-06 at 9.03.00 PM.mp4',       alt: 'Industrial operations', category: 'operations', caption: 'Industrial operations — East Queen Group' },
  { id: 'wa27', type: V, src: '/WhatsApp Video 2026-08-06 at 9.03.07 PM.mp4',       alt: 'Operations footage',    category: 'operations', caption: 'Live operations footage — East Queen Chittagong' },
  { id: 'wa28', type: V, src: '/WhatsApp Video 2026-08-06 at 9.04.25 PM.mp4',       alt: 'Fisheries',             category: 'facilities', caption: 'Syedpur Fisheries — freshwater aquaculture operations' },
  { id: 'wa29', type: V, src: '/WhatsApp Video 2026-08-06 at 9.04.32 PM.mp4',       alt: 'Fish farm',             category: 'facilities', caption: 'Integrated fish farming — Syedpur Fisheries & Farms' },
]
