import { useEffect } from 'react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title       = 'Confirm Delete',
  message,
  confirmLabel = 'Delete',
  loading      = false,
}) {
  useEffect(() => {
    if (!isOpen) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-dark/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-admin-lg p-6 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
          <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
        </div>

        <h2 className="font-display font-bold text-dark text-lg text-center mb-2">{title}</h2>
        {message && (
          <p className="font-body text-dark-300 text-sm text-center leading-relaxed mb-6">{message}</p>
        )}

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl border border-light-200 text-dark-400 font-body font-medium text-sm
                       hover:bg-light-100 transition-colors duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-body font-semibold text-sm
                       transition-colors duration-200 disabled:opacity-60
                       flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="12" />
                </svg>
                Deleting…
              </>
            ) : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
