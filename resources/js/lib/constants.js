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
      { label: 'Marinona Foodstaff Trading', href: '/companies/marinona-foodstaff',    desc: 'Food & Commodity Trading'         },
    ],
  },
  {
    label: 'Export',
    href: '/export',
    children: [
      { label: 'Mill Scale',                  href: '/export-mill-scale'                  },
      { label: 'Zinc Oxide',                  href: '/export-zinc-oxide'                  },
      { label: 'PET Flakes',                  href: '/export-pet-flakes'                  },
      { label: 'Fresh Vegetables & Fruits',   href: '/export-fresh-vegetables-and-fruits' },
      { label: 'Leather Goods',               href: '/export-leather-goods'               },
      { label: 'Jute Made Products',          href: '/export-jute-made-products'          },
    ],
  },
  {
    label: 'Import',
    href: '/import',
    children: [
      { label: 'Aggregate / Gabbro',        href: '/import-aggregate'              },
      { label: 'Coal',                      href: '/import-coal'                   },
      { label: 'Steel Scraps',              href: '/import-steel-scraps'           },
      { label: 'Automobile Spare Parts',    href: '/import-automobile-spare-parts' },
      { label: 'Lime Stone / Clinker',      href: '/import-lime-stone'             },
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
