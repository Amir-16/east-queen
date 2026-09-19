export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-east-queen' },
  {
    label: 'Companies',
    href: '/companies',
    children: [
      { label: 'Ariko International',       href: '/companies/ariko-international',   desc: 'International Trading & Export'   },
      { label: 'East Queen Shipping Ltd.',   href: '/companies/east-queen-shipping',   desc: 'Maritime & Ship Breaking'         },
      { label: 'Bay Gas Ltd.',               href: '/companies/bay-gas',               desc: 'LPG Energy Distribution'          },
      { label: 'Syedpur Fisheries & Farms',  href: '/companies/syedpur-fisheries',     desc: 'Fisheries & Agriculture'          },
      { label: 'BSC Limited',               href: '/companies/bsc-limited',           desc: 'Construction Materials'           },
      { label: 'Marinova Foodstuff Trading', href: '/companies/marinova-foodstuff',    desc: 'Food & Commodity Trading'         },
    ],
  },
  {
    label: 'Export',
    href: '/export',
    children: [
      { label: 'Mill Scale',                href: '/export-mill-scale'          },
      { label: 'Zinc Ash / Zinc Oxide',     href: '/export-zinc-oxide'          },
      { label: 'PET Flakes',                href: '/export-pet-flakes'          },
      { label: 'Fresh Vegetables & Fruits', href: '/export-vegetables-fruits'   },
      { label: 'Leather Goods',             href: '/export-leather-goods'       },
      { label: 'Jute & Jute Products',      href: '/export-jute-products'       },
      { label: 'Ready-Made Garments',       href: '/export-ready-made-garments' },
    ],
  },
  {
    label: 'Import',
    href: '/import',
    children: [
      { label: 'Aggregate Stones',          href: '/import-aggregate-stones'        },
      { label: 'Coal',                      href: '/import-coal'                    },
      { label: 'Steel Scrap (HMS)',          href: '/import-steel-scrap-hms'         },
      { label: 'Automobile Spare Parts',    href: '/import-automobile-spare-parts'  },
      { label: 'Limestone',                 href: '/import-limestone'               },
      { label: 'Clinker',                   href: '/import-clinker'                 },
      { label: 'Geo Synthetic Materials',   href: '/import-geo-synthetic-materials' },
      { label: 'Heavy Equipment',           href: '/import-heavy-equipment'         },
    ],
  },
  { label: 'Ship Breaking', href: '/ship-breaking' },
  { label: 'Gallery',       href: '/gallery'        },
  { label: 'Contact',       href: '/contact-us'     },
]

export const INDUSTRY_COLORS = {
  shipping:     'bg-slate-100 text-slate-700',
  energy:       'bg-gold-100  text-gold-700',
  fisheries:    'bg-teal-50   text-teal-700',
  food:         'bg-gold-50   text-gold-600',
  construction: 'bg-navy-800  text-slate-200',
  trading:      'bg-slate-100 text-slate-700',
  maritime:     'bg-slate-100 text-slate-700',
}
