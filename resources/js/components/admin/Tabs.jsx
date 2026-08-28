export default function Tabs({ tabs = [], active, onChange }) {
    return (
        <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex gap-1 overflow-x-auto" aria-label="Tabs">
                {tabs.map((tab) => {
                    const isActive = active === tab.id
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => onChange(tab.id)}
                            className={[
                                'px-4 py-2.5 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                                isActive
                                    ? 'border-admin-gold text-admin-gold'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                            ].join(' ')}
                        >
                            {tab.label}
                            {tab.badge != null && (
                                <span className={[
                                    'ml-2 rounded-full px-1.5 py-0.5 text-xs font-semibold',
                                    isActive ? 'bg-admin-gold/20 text-admin-gold' : 'bg-gray-100 text-gray-500',
                                ].join(' ')}>
                                    {tab.badge}
                                </span>
                            )}
                        </button>
                    )
                })}
            </nav>
        </div>
    )
}
