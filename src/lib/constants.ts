import type { NavItem, StatItem } from '@/types'

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About Us',
    href: '/about-east-queen',
  },
  {
    label: 'Our Companies',
    children: [
      { label: 'Ariko International',           href: '/con-ariko-international'  },
      { label: 'East Queen Shipping Ltd.',       href: '/con-east-queen-shipping'  },
      { label: 'Bay Gas LTD.',                   href: '/con-bay-gas'              },
      { label: 'Syedpur Fisheries & Farms',      href: '/con-syedpur-fisheries'    },
      { label: 'BSC Limited',                    href: '/con-bsc-ltd'              },
      { label: 'Marinona Foodstaff Trading LLC', href: '/con-marinona-foodstaff'   },
    ],
  },
  {
    label: 'Associates',
    href: '/about-east-queen',
  },
  {
    label: 'Export',
    href: '/export',
    children: [
      { label: 'Mill Scale',                href: '/export-mill-scale'                 },
      { label: 'Zinc Oxide',                href: '/export-zinc-oxide'                 },
      { label: 'PET Flakes',                href: '/export-pet-flakes'                 },
      { label: 'Fresh Vegetables & Fruits', href: '/export-fresh-vegetables-and-fruits' },
      { label: 'Leather Goods',             href: '/export-leather-goods'              },
      { label: 'Jute Made Products',        href: '/export-jute-made-products'         },
    ],
  },
  {
    label: 'Import',
    href: '/import',
    children: [
      { label: 'Aggregate',                href: '/import-aggregate'                },
      { label: 'Coal',                     href: '/import-coal'                     },
      { label: 'Steel Scraps',             href: '/import-steel-scraps'             },
      { label: 'Automobile Spare Parts',   href: '/import-automobile-spare-parts'   },
      { label: 'Lime Stone',               href: '/import-lime-stone'               },
    ],
  },
  {
    label: 'Gallery',
    href: '/gallery',
  },
  {
    label: 'Ship Breaking',
    href: '/ship-breaking',
  },
  {
    label: 'Contact',
    href: '/contact-us',
  },
]

export const STATS: StatItem[] = [
  { value: 100, suffix: '+', label: 'Happy Clients'        },
  { value: 500, suffix: '+', label: 'Employees'            },
  { value: 400, suffix: '+', label: 'Complete Deliveries'  },
  { value: 42,  suffix: '+', label: 'Years Established'    },
]

export const CONTACT = {
  phones: ['+880 1713 042261', '+880 1723 870250'],
  emails: ['shahrear@eastqueengroup.com', 'contact@eastqueengroup.com'],
  address: 'Dhaka, Bangladesh',
  hours:   'Sunday – Thursday, 9:00 AM – 5:00 PM (BST)',
}

export const INDUSTRY_COLORS: Record<string, string> = {
  shipping:     'bg-slate-100 text-slate-700',
  energy:       'bg-gold-100  text-gold-700',
  fisheries:    'bg-teal-50   text-teal-700',
  food:         'bg-gold-50   text-gold-600',
  construction: 'bg-navy-800  text-slate-200',
  trading:      'bg-slate-100 text-slate-700',
}
