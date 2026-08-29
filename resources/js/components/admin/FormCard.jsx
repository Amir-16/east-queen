export default function FormCard({ title, description, children, actions, headerAction, className = '' }) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden ${className}`}
      style={{ border: '1px solid #E9EEF4', boxShadow: '0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)' }}
    >
      {(title || description || headerAction) && (
        <div
          className="px-5 py-4 flex items-start justify-between gap-4"
          style={{ borderBottom: '1px solid #F1F5F9' }}
        >
          <div className="min-w-0">
            {title && (
              <h3
                className="font-semibold text-slate-800 text-[14px] leading-snug"
                style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '-0.01em' }}
              >
                {title}
              </h3>
            )}
            {description && (
              <p className="text-slate-400 text-[12px] mt-0.5 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif' }}>
                {description}
              </p>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}

      <div className="p-5">{children}</div>

      {actions && (
        <div
          className="px-5 py-4 flex flex-wrap items-center justify-end gap-3"
          style={{ borderTop: '1px solid #F1F5F9', background: '#FAFBFC' }}
        >
          {actions}
        </div>
      )}
    </div>
  )
}
