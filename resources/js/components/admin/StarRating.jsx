import { useState } from 'react'
import { StarIcon as StarSolid } from '@heroicons/react/24/solid'
import { StarIcon as StarOutline } from '@heroicons/react/24/outline'

export default function StarRating({
  value    = 0,
  onChange,
  readonly = false,
  label,
  size     = 'md',
}) {
  const [hovered, setHovered] = useState(0)

  const sizeClass = { sm: 'w-4 h-4', md: 'w-6 h-6', lg: 'w-7 h-7' }[size] ?? 'w-6 h-6'

  return (
    <div className="space-y-1">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-dark-300 font-body">
          {label}
        </label>
      )}

      <div
        className={`flex items-center gap-0.5 ${readonly ? '' : 'cursor-pointer'}`}
        onMouseLeave={() => !readonly && setHovered(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = readonly ? star <= value : star <= (hovered || value)
          return (
            <button
              key={star}
              type="button"
              disabled={readonly}
              onClick={() => !readonly && onChange(star)}
              onMouseEnter={() => !readonly && setHovered(star)}
              className={`p-0.5 transition-transform ${readonly ? 'cursor-default' : 'hover:scale-110'}`}
            >
              {filled
                ? <StarSolid  className={`${sizeClass} text-admin-gold`} />
                : <StarOutline className={`${sizeClass} text-light-200`} />
              }
            </button>
          )
        })}
        {!readonly && (
          <span className="ml-1.5 text-sm font-body text-dark-300">
            {hovered || value || 0}/5
          </span>
        )}
      </div>
    </div>
  )
}
