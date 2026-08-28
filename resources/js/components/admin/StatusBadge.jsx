const STYLES = {
  new:      'bg-red-100 text-red-700 border-red-200',
  read:     'bg-amber-100 text-amber-700 border-amber-200',
  replied:  'bg-green-100 text-green-700 border-green-200',
  active:   'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-light-100 text-dark-300 border-light-200',
  featured: 'bg-amber-100 text-amber-700 border-amber-200',
  draft:    'bg-slate-100 text-slate-600 border-slate-200',
}

const LABELS = {
  new:      'New',
  read:     'Read',
  replied:  'Replied',
  active:   'Active',
  inactive: 'Inactive',
  featured: 'Featured',
  draft:    'Draft',
}

export default function StatusBadge({ status = 'inactive' }) {
  const key   = String(status).toLowerCase()
  const style = STYLES[key] ?? STYLES.inactive
  const label = LABELS[key] ?? status

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold font-body border ${style}`}>
      {label}
    </span>
  )
}
