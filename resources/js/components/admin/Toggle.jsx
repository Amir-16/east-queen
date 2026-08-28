export default function Toggle({ checked = false, onChange, disabled = false, label }) {
  return (
    <label
      className={`inline-flex items-center gap-2.5 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`
          relative inline-flex w-10 h-6 rounded-full transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-admin-gold/50 focus:ring-offset-1
          ${checked ? 'bg-admin-gold' : 'bg-light-200'}
        `}
      >
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
            ${checked ? 'translate-x-4' : 'translate-x-0'}
          `}
        />
      </button>
      {label && (
        <span className="text-sm font-body text-dark-400 select-none">{label}</span>
      )}
    </label>
  )
}
