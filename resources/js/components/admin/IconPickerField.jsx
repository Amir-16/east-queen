import { useState } from 'react'
import HeroIcon from '@/components/ui/HeroIcon'

const ICONS = [
    'trophy', 'shield-check', 'sparkles', 'star', 'heart',
    'light-bulb', 'rocket-launch', 'check-circle', 'check-badge',
    'clock', 'currency-dollar', 'beaker', 'arrow-path',
    'building-office-2', 'wrench-screwdriver', 'square-3-stack-3d',
    'calendar', 'face-smile', 'users',
]

export default function IconPickerField({ value = '', onChange, label = 'Icon' }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-sm font-medium text-gray-700">{label}</label>
            )}

            {/* Current value input + preview */}
            <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg bg-admin-navy/10 flex items-center justify-center flex-shrink-0 text-admin-navy">
                    {value
                        ? <HeroIcon name={value} className="w-5 h-5" />
                        : <span className="text-xs text-gray-400">?</span>
                    }
                </div>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onFocus={() => setOpen(true)}
                    placeholder="e.g. shield-check"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                />
                <button
                    type="button"
                    onClick={() => setOpen((v) => !v)}
                    className="text-xs px-3 py-2 border border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 whitespace-nowrap"
                >
                    {open ? 'Close' : 'Browse'}
                </button>
            </div>

            {/* Icon grid */}
            {open && (
                <div className="p-3 border border-gray-200 rounded-xl bg-gray-50 grid grid-cols-6 sm:grid-cols-9 gap-2">
                    {ICONS.map((name) => (
                        <button
                            key={name}
                            type="button"
                            title={name}
                            onClick={() => { onChange(name); setOpen(false) }}
                            className={[
                                'p-2 rounded-lg flex flex-col items-center gap-1 transition-all group',
                                value === name
                                    ? 'bg-admin-gold/20 ring-2 ring-admin-gold text-admin-gold'
                                    : 'hover:bg-white hover:shadow-sm text-gray-500 hover:text-admin-navy',
                            ].join(' ')}
                        >
                            <HeroIcon name={name} className="w-5 h-5" />
                            <span className="text-[9px] font-mono leading-tight text-center truncate w-full hidden sm:block">
                                {name}
                            </span>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
