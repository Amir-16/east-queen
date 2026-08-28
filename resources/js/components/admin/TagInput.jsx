import { useRef, useState } from 'react'
import { XMarkIcon } from '@heroicons/react/20/solid'

export default function TagInput({
  value       = [],
  onChange,
  placeholder = 'Add tag…',
  label,
  error,
  maxTags,
}) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const addTag = (raw) => {
    const tag = raw.trim().replace(/[,;]+$/, '').toLowerCase()
    if (!tag || value.includes(tag)) return
    if (maxTags && value.length >= maxTags) return
    onChange([...value, tag])
    setInput('')
  }

  const removeTag = (tag) => onChange(value.filter((t) => t !== tag))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag(input)
    } else if (e.key === 'Backspace' && !input && value.length) {
      onChange(value.slice(0, -1))
    }
  }

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-dark-300 font-body">
          {label}
        </label>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className={`
          flex flex-wrap gap-1.5 p-2 min-h-[42px] rounded-xl border cursor-text
          ${error ? 'border-red-300' : 'border-light-200'}
          focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-colors
        `}
      >
        {value.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 pl-2.5 pr-1.5 py-0.5 rounded-full
                       bg-accent/15 border border-accent/30 text-accent-dark text-xs font-body font-medium"
          >
            {tag}
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTag(tag) }}
              className="hover:text-red-500 transition-colors rounded-full"
            >
              <XMarkIcon className="w-3 h-3" />
            </button>
          </span>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => input.trim() && addTag(input)}
          placeholder={value.length ? '' : placeholder}
          className="flex-1 min-w-[100px] outline-none bg-transparent text-sm font-body text-dark placeholder-dark-300"
        />
      </div>

      <p className="text-xs text-dark-300 font-body">Press Enter or comma to add a tag</p>

      {error && <p className="text-xs text-red-600 font-body">{error}</p>}
    </div>
  )
}
