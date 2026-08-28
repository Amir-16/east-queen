import {
  TrophyIcon,
  Square3Stack3DIcon,
  ShieldCheckIcon,
  BeakerIcon,
  BuildingOffice2Icon,
  WrenchScrewdriverIcon,
  ArrowPathIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline'

const iconMap = {
  'trophy': TrophyIcon,
  'square-3-stack-3d': Square3Stack3DIcon,
  'shield-check': ShieldCheckIcon,
  'beaker': BeakerIcon,
  'building-office-2': BuildingOffice2Icon,
  'wrench-screwdriver': WrenchScrewdriverIcon,
  'arrow-path': ArrowPathIcon,
  'sparkles': SparklesIcon,
}

export default function ServiceIcon({ name, className = 'w-6 h-6' }) {
  const Icon = iconMap[name] ?? TrophyIcon
  return <Icon className={className} />
}
