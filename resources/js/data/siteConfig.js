// ─── SITE-WIDE CONFIGURATION ───────────────────────────────────────────────
// Edit this file to customise every label, metric, colour, and link
// without touching any component.

export const SITE = {
  name: 'Syedpur Fisheries & Farms',
  tagline: 'Precision Aquaculture & Agribusiness',
  group: 'East Queen Group',
  founded: 2010,
  acreage: 65,
  ponds: 38,
  annualCapacity: '800 MT',
  location: 'Syedpur, Sitakundu, Chattogram, Bangladesh',
  email: 'shahrear@scrapbangla.com',
  phone1: '+8801713042261',
  phone2: '+8801713118999',
  website: 'https://eastqueengroup.com',
  scrap: 'https://scrapbangla.com',
}

export const FINANCIALS = [
  { label: 'Total Project Valuation', value: '$6.25M', sub: 'Fixed + Working Capital', color: 'gold' },
  { label: 'Phase-1 Capital Target', value: '$1.20M', sub: '52% Equity | 48% Debt', color: 'green' },
  { label: 'Revenue by 2028E', value: '$5.44M', sub: 'Up from $1.41M in 2024', color: 'cyan' },
  { label: 'Net Profit by 2028E', value: '$2.65M', sub: 'After Tax', color: 'green' },
  { label: 'Payback Period', value: '1.65 Yrs', sub: 'Optimised Intensive Mode', color: 'gold' },
  { label: 'DSCR', value: '1.5×', sub: 'Low-risk credit profile', color: 'cyan' },
]

export const STATS = [
  { value: 65, suffix: '+', label: 'Acres of Land', icon: 'land' },
  { value: 38, suffix: '', label: 'Active Ponds', icon: 'pond' },
  { value: 800, suffix: ' MT', label: 'Annual Capacity', icon: 'fish' },
  { value: 50, suffix: ' KW', label: 'Solar Plant', icon: 'solar' },
  { value: 176, suffix: '+', label: 'Paddle Aerators', icon: 'aerate' },
  { value: 8000, suffix: ' MT', label: 'Feed Mill / Year', icon: 'mill' },
]

export const TECHNOLOGY = [
  {
    id: 'rbras',
    title: 'RB-RAS Technology',
    subtitle: 'Raceway Bottom-clean Recirculating Aquaculture System',
    description:
      'Convex-shaped pond design generates a natural water vortex that continuously collects waste to a central extraction point — eliminating manual cleaning and slashing the Feed Conversion Ratio.',
    metrics: [
      { label: 'Old FCR', value: '1.5', unit: '' },
      { label: 'New FCR', value: '0.6–0.8', unit: '' },
      { label: 'Profit Uplift', value: '2×', unit: '' },
    ],
    icon: 'recycle',
    color: 'primary',
  },
  {
    id: 'iot',
    title: 'IoT Precision Farming',
    subtitle: '5-Dimensional Real-Time Water Quality Matrix',
    description:
      'Sensors continuously measure pH, Ammonia Nitrogen, Dissolved Oxygen, Salinity, and Temperature. Data streams to a DTU and syncs with the proprietary Folon mobile system for automated aerator control and instant alerts.',
    metrics: [
      { label: 'Parameters', value: '5', unit: 'Dimensions' },
      { label: 'Platform', value: 'Folon', unit: 'App' },
      { label: 'Response', value: 'Real-Time', unit: '' },
    ],
    icon: 'wifi',
    color: 'cyan',
  },
  {
    id: 'solar',
    title: 'Green Energy Integration',
    subtitle: '50 KW Solar Power Plant on Buffalo Shade Rooftops',
    description:
      'A rooftop solar array powers 176 high-efficiency paddle aerators, freshwater/waste-drain pumps, water treatment filters, and 10 containerised cold-storage units for export-grade seafood processing.',
    metrics: [
      { label: 'Capacity', value: '50 KW', unit: '' },
      { label: 'Aerators', value: '176', unit: 'Units' },
      { label: 'Cold Storage', value: '10', unit: 'Units' },
    ],
    icon: 'sun',
    color: 'gold',
  },
]

export const PROJECTS = [
  {
    id: 'fisheries',
    category: 'Aquaculture',
    title: 'Premium Fisheries Network',
    description: '38 active production ponds across 65 acres delivering over 800 MT annually. Upgrading to RB-RAS for precision, higher density, and lower mortality.',
    image: '/media/fish/fish-feeding-evening.jpg',
    gallery: [
      '/media/fish/fish-feeding-frenzy-01.jpg',
      '/media/fish/fish-feeding-frenzy-02.jpg',
      '/media/fish/fish-feeding-frenzy-03.jpg',
      '/media/fish/fish-harvest-tilapia-shrimp.jpg',
      '/media/fish/fish-harvest-pangash.jpg',
    ],
    tags: ['RB-RAS', 'High Density', 'Export Grade'],
    status: 'Operational',
    statusColor: 'green',
  },
  {
    id: 'paddy',
    category: 'Crop Farming',
    title: 'Paddy & Grain Fields',
    description: 'High-yield paddy cultivation integrated with the farm ecosystem — crop residues feed the livestock feed mill and organic blackfly protein loop.',
    image: '/media/farm/farm-pond-wide-02.jpg',
    gallery: [
      '/media/farm/farm-pond-panorama.jpg',
      '/media/farm/farm-pond-wide-01.jpg',
      '/media/farm/farm-pond-wide-03.jpg',
    ],
    tags: ['Paddy', 'Integrated Farming', 'Organic'],
    status: 'Operational',
    statusColor: 'green',
  },
  {
    id: 'fruits',
    category: 'Fruits & Orchards',
    title: 'Fruits & Orchard Belt',
    description: 'Integrated orchard system across pond embankments — papaya, banana, mango, and sunflower grown organically, watered by pond overflow, sold fresh to market.',
    image: '/media/fruits/fruits-papaya-tree.jpg',
    gallery: [
      '/media/fruits/fruits-sunflower.jpg',
      '/media/fruits/fruits-banana-grove-01.jpg',
      '/media/fruits/fruits-banana-grove-02.jpg',
      '/media/fruits/fruits-banana-birds.jpg',
      '/media/fruits/fruits-mango-pond.jpg',
      '/media/fruits/fruits-mixed-orchard.jpg',
    ],
    tags: ['Papaya', 'Banana', 'Mango', 'Organic'],
    status: 'Operational',
    statusColor: 'green',
  },
  {
    id: 'livestock',
    category: 'Animal Husbandry',
    title: 'Cattle, Buffalo & Livestock',
    description: 'Free-roaming cattle and buffalo graze the pond embankments year-round. Solar-powered shades and an 8,000 MT/year integrated feed mill close the circular economy loop.',
    image: '/media/cattle/cattle-buffalo-sunset.jpg',
    gallery: [
      '/media/cattle/cattle-cows-grazing.jpg',
      '/media/farm/farm-pond-panorama.jpg',
    ],
    tags: ['Buffalo', 'Cattle', 'Feed Mill'],
    status: 'Operational',
    statusColor: 'green',
  },
  {
    id: 'solar',
    category: 'Green Energy',
    title: '50 KW Solar Power Plant',
    description: 'Rooftop solar panels mounted on buffalo shade structures power the entire operation: aerators, pumps, cold storage, and processing units.',
    image: null,
    gallery: [],
    tags: ['Renewable', '50 KW', 'Off-grid'],
    status: 'In Development',
    statusColor: 'gold',
  },
  {
    id: 'blackfly',
    category: 'BioProtein',
    title: 'Organic Blackfly Protein',
    description: 'BSF larvae cultivation converts organic farm waste into high-protein feed, reducing external input costs and closing the nutrient cycle entirely.',
    image: null,
    gallery: [],
    tags: ['BSF Larvae', 'Zero Waste', 'Circular'],
    status: 'Planned',
    statusColor: 'cyan',
  },
  {
    id: 'research',
    category: 'Innovation Hub',
    title: 'Agro Research Center & Resort',
    description: 'A dedicated R&D and training facility combined with an agro-tourism study resort — attracting researchers, investors, and agricultural students.',
    image: null,
    gallery: [],
    tags: ['R&D', 'Agro-Tourism', 'Education'],
    status: 'Planned',
    statusColor: 'cyan',
  },
]

export const GALLERY_MEDIA = [
  // ── Fish ──────────────────────────────────────────────────────────────────
  { id: 1,  category: 'fish',   type: 'image', src: '/media/fish/fish-feeding-evening.jpg',          title: 'Golden Hour Feeding',            caption: 'Evening feeding session at our premium ponds' },
  { id: 2,  category: 'fish',   type: 'image', src: '/media/fish/fish-feeding-frenzy-01.jpg',        title: 'Thousands of Fish',              caption: 'Morning feeding — high-density aquaculture in action' },
  { id: 3,  category: 'fish',   type: 'image', src: '/media/fish/fish-feeding-frenzy-02.jpg',        title: 'Dense Pond Activity',            caption: 'Precision feeding in our RB-RAS production ponds' },
  { id: 4,  category: 'fish',   type: 'image', src: '/media/fish/fish-feeding-frenzy-03.jpg',        title: 'Feeding Frenzy',                 caption: 'Silver fish surfacing during feed time' },
  { id: 5,  category: 'fish',   type: 'image', src: '/media/fish/fish-harvest-tilapia-shrimp.jpg',   title: 'Tilapia & Shrimp Harvest',       caption: 'Daily mixed harvest — tilapia, shrimp, and pangash' },
  { id: 6,  category: 'fish',   type: 'image', src: '/media/fish/fish-harvest-pangash.jpg',          title: 'Pangash Harvest',                caption: 'Premium pangash catfish ready for market' },
  // ── Cattle ────────────────────────────────────────────────────────────────
  { id: 7,  category: 'cattle', type: 'image', src: '/media/cattle/cattle-buffalo-sunset.jpg',       title: 'Buffalo Family at Sunset',       caption: 'Our livestock roam freely across the farm embankments' },
  { id: 8,  category: 'cattle', type: 'image', src: '/media/cattle/cattle-cows-grazing.jpg',         title: 'Cattle Grazing by the Pond',     caption: 'Red cows graze on organic embankment grass' },
  // ── Fruits ────────────────────────────────────────────────────────────────
  { id: 9,  category: 'fruits', type: 'image', src: '/media/fruits/fruits-papaya-tree.jpg',          title: 'Papaya Orchard',                 caption: 'Green papayas growing beside the fish ponds' },
  { id: 10, category: 'fruits', type: 'image', src: '/media/fruits/fruits-sunflower.jpg',            title: 'Sunflower Fields',               caption: 'Sunflowers grown along the pond banks' },
  { id: 11, category: 'fruits', type: 'image', src: '/media/fruits/fruits-banana-grove-01.jpg',      title: 'Banana Grove',                   caption: 'Banana trees lining the pond canals' },
  { id: 12, category: 'fruits', type: 'image', src: '/media/fruits/fruits-banana-grove-02.jpg',      title: 'Banana Canal',                   caption: 'Integrated banana cultivation along the waterway' },
  { id: 13, category: 'fruits', type: 'image', src: '/media/fruits/fruits-banana-birds.jpg',         title: 'Wildlife in the Orchard',        caption: 'Cormorants resting on banana trees — a sign of ecosystem health' },
  { id: 14, category: 'fruits', type: 'image', src: '/media/fruits/fruits-mango-pond.jpg',           title: 'Mango Tree by the Pond',         caption: 'Mango orchard integrated with the aquaculture system' },
  { id: 15, category: 'fruits', type: 'image', src: '/media/fruits/fruits-mixed-orchard.jpg',        title: 'Mixed Orchard Zone',             caption: 'Taro, banana and mango in our lush orchard belt' },
  // ── Farm ──────────────────────────────────────────────────────────────────
  { id: 16, category: 'farm',   type: 'image', src: '/media/farm/farm-pond-wide-02.jpg',             title: 'Crystal Clear Pond',             caption: 'RB-RAS technology keeps water pristine year-round' },
  { id: 17, category: 'farm',   type: 'image', src: '/media/farm/farm-pond-panorama.jpg',            title: 'Farm Panorama',                  caption: 'Wide view of our 65-acre integrated agro hub' },
  { id: 18, category: 'farm',   type: 'image', src: '/media/farm/farm-pond-wide-01.jpg',             title: 'Production Pond',                caption: 'One of our 38 active aquaculture ponds' },
  { id: 19, category: 'farm',   type: 'image', src: '/media/farm/farm-pond-wide-03.jpg',             title: 'Pond Network',                   caption: 'Interconnected pond systems for optimised water management' },
  { id: 20, category: 'farm',   type: 'image', src: '/media/farm/farm-pond-mango-dusk.jpg',          title: 'Dusk at the Farm',               caption: 'Serene pond landscape framed by mango trees' },
  { id: 21, category: 'farm',   type: 'image', src: '/media/farm/farm-pond-egret.jpg',               title: 'Egret by the Pond',              caption: 'Native wildlife thriving in our balanced ecosystem' },
  // ── Team ──────────────────────────────────────────────────────────────────
  { id: 22, category: 'team',   type: 'image', src: '/media/team/team-pond-visit.jpg',               title: 'Site Inspection',                caption: 'Farm leadership at one of our production ponds' },
  { id: 23, category: 'team',   type: 'image', src: '/media/team/team-orchard-visit.jpg',            title: 'Orchard Walk',                   caption: 'Our agronomy team inspecting the fruit orchards' },
  // ── Videos ────────────────────────────────────────────────────────────────
  { id: 24, category: 'videos', type: 'video', src: '/media/videos/video-01.mp4',  title: 'Farm Walkthrough',          caption: 'A tour of our integrated agro facility' },
  { id: 25, category: 'videos', type: 'video', src: '/media/videos/video-02.mp4',  title: 'Fish Farm Activity',        caption: 'Live footage from our aquaculture ponds' },
  { id: 26, category: 'videos', type: 'video', src: '/media/videos/video-03.mp4',  title: 'Pond Operations',           caption: 'Daily operations at the fish ponds' },
  { id: 27, category: 'videos', type: 'video', src: '/media/videos/video-04.mp4',  title: 'Agro Hub Overview',         caption: 'Overview of the full agro ecosystem' },
  { id: 28, category: 'videos', type: 'video', src: '/media/videos/video-05.mp4',  title: 'Cattle & Livestock',        caption: 'Our livestock operations on the embankments' },
  { id: 29, category: 'videos', type: 'video', src: '/media/videos/video-06.mp4',  title: 'Nature & Wildlife',         caption: 'Wildlife thriving in our balanced ecosystem' },
  { id: 30, category: 'videos', type: 'video', src: '/media/videos/video-07.mp4',  title: 'Feeding Session',           caption: 'Fish feeding at our precision ponds' },
  { id: 31, category: 'videos', type: 'video', src: '/media/videos/video-08.mp4',  title: 'Farm at Evening',           caption: 'The farm as the sun goes down' },
  { id: 32, category: 'videos', type: 'video', src: '/media/videos/video-09.mp4',  title: 'Orchard Tour',              caption: 'Walking through our fruit orchards' },
  { id: 33, category: 'videos', type: 'video', src: '/media/videos/video-10.mp4',  title: 'Fish Harvest',              caption: 'Harvesting fresh fish from our ponds' },
  { id: 34, category: 'videos', type: 'video', src: '/media/videos/video-11.mp4',  title: 'Water Management',          caption: 'Aerator and pump operations' },
  { id: 35, category: 'videos', type: 'video', src: '/media/videos/video-12.mp4',  title: 'Farm Ecosystem',            caption: 'The integrated circular economy at work' },
  { id: 36, category: 'videos', type: 'video', src: '/media/videos/video-13.mp4',  title: 'Agricultural Overview',     caption: 'A comprehensive look at our agro hub' },

  // New site photos
  { id: 37, category: 'farm',   type: 'image', src: '/media/farm/farm-site-view-01.jpg', title: 'Farm Grounds',   caption: 'On-site view of our integrated agro facility' },
  { id: 38, category: 'farm',   type: 'image', src: '/media/farm/farm-site-view-02.jpg', title: 'Our Agro Hub',   caption: 'A closer look at the farm infrastructure' },

  // New videos
  { id: 39, category: 'videos', type: 'video', src: '/media/videos/video-14.mp4',  title: 'Farm Site Tour',            caption: 'Ground-level tour of the farm infrastructure' },
  { id: 40, category: 'videos', type: 'video', src: '/media/videos/video-15.mp4',  title: 'Daily Farm Life',           caption: 'A day in the life at Syedpur Fisheries & Farms' },
  { id: 41, category: 'videos', type: 'video', src: '/media/videos/video-16.mp4',  title: 'Agro Hub Activity',         caption: 'Live activity across the 65-acre farm' },
]

export const PARTNERSHIP_PILLARS = [
  {
    id: 'technical',
    icon: 'wrench',
    title: 'Technical Assistance',
    description: 'Collaboration on engineering design, structural solar grid optimisation, and advanced high-efficiency steel structures to house automated RB-RAS facilities.',
    partner: 'JFE Shoji Corporation, Japan',
    color: 'primary',
  },
  {
    id: 'financial',
    icon: 'trending-up',
    title: 'Financial Support / JV',
    description: 'Direct equity investment or structured project finance to complete the $6.25 Million modernisation program and accelerate international export operations.',
    partner: 'Open to institutional investors',
    color: 'gold',
  },
  {
    id: 'market',
    icon: 'globe',
    title: 'Market Integration',
    description: 'Building a robust international supply chain to market sustainably produced organic seafood, fish, and dairy derivatives into East Asian markets.',
    partner: 'East Asian Distribution Networks',
    color: 'cyan',
  },
]

export const TIMELINE = [
  { year: '2010', title: 'Foundation',          desc: 'Started with 2 ponds and a vision for sustainable aquaculture.',                              done: true  },
  { year: '2024', title: 'Scale-Up',            desc: '38 ponds, 65 acres, 800+ MT capacity. $1.41M revenue.',                                      done: true  },
  { year: '2025', title: 'RB-RAS Rollout',      desc: 'Deploying Raceway Bottom-clean Recirculating Aquaculture Systems across all ponds.',          done: false },
  { year: '2026', title: 'Solar + IoT',         desc: '50 KW solar plant live. Folon IoT sensors monitoring all 5 water parameters.',               done: false },
  { year: '2027', title: 'Feed Mill & Marketplace', desc: '8,000 MT/year feed mill operational. Agro Marketplace soft launch.',                     done: false },
  { year: '2028', title: 'Precision Agro Hub',  desc: 'Full ecosystem running. $5.44M revenue | $2.65M net profit. Export to East Asia.',           done: false },
]

export const NAV_LINKS = [
  { label: 'Home',        href: '/'            },
  { label: 'Projects',    href: '/projects'    },
  { label: 'Gallery',     href: '/gallery'     },
  { label: 'Technology',  href: '/technology'  },
  { label: 'Partnership', href: '/partnership' },
  { label: 'Marketplace', href: '/marketplace', badge: 'Soon' },
  { label: 'Contact',     href: '/contact'     },
]
