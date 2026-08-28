export default function FormCard({ title, description, children, actions, headerAction, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl border border-light-200 shadow-card overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-light-200 flex items-start justify-between gap-4">
          <div className="min-w-0">
            {title && (
              <h3 className="font-display font-bold text-dark text-base">{title}</h3>
            )}
            {description && (
              <p className="text-dark-300 font-body text-sm mt-1 leading-relaxed">{description}</p>
            )}
          </div>
          {headerAction && <div className="flex-shrink-0">{headerAction}</div>}
        </div>
      )}

      <div className="p-4 sm:p-6">{children}</div>

      {actions && (
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-light-200 bg-light-100 flex flex-wrap items-center justify-end gap-3">
          {actions}
        </div>
      )}
    </div>
  )
}
