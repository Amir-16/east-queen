import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'

/**
 * String mode (default): value is string[]
 * Object mode (fields prop provided): value is object[]
 *   fields = [{ key, label, placeholder }]
 */
export default function RepeaterField({
  value    = [],
  onChange,
  label,
  addLabel = '+ Add Item',
  placeholder = 'Enter value…',
  fields,
  maxItems,
  error,
}) {
  const isObj = Boolean(fields?.length)

  const add = () => {
    const item = isObj ? Object.fromEntries(fields.map((f) => [f.key, ''])) : ''
    onChange([...value, item])
  }

  const remove = (i) => onChange(value.filter((_, idx) => idx !== i))

  const update = (i, val) => {
    const next = [...value]
    next[i] = val
    onChange(next)
  }

  const updateField = (i, key, val) => {
    const next = [...value]
    next[i] = { ...next[i], [key]: val }
    onChange(next)
  }

  const canAdd = !maxItems || value.length < maxItems

  const inputClass =
    'flex-1 px-3 py-2 text-sm font-body rounded-xl border border-light-200 ' +
    'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors'

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-semibold uppercase tracking-wide text-dark-300 font-body">
          {label}
        </label>
      )}

      <div className="space-y-2">
        {value.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            {isObj ? (
              <div
                className="flex-1 grid gap-2"
                style={{ gridTemplateColumns: `repeat(${fields.length}, 1fr)` }}
              >
                {fields.map((f) => (
                  <input
                    key={f.key}
                    type="text"
                    value={item[f.key] ?? ''}
                    onChange={(e) => updateField(i, f.key, e.target.value)}
                    placeholder={f.placeholder ?? f.label}
                    className={inputClass}
                  />
                ))}
              </div>
            ) : (
              <input
                type="text"
                value={item}
                onChange={(e) => update(i, e.target.value)}
                placeholder={placeholder}
                className={inputClass}
              />
            )}
            <button
              type="button"
              onClick={() => remove(i)}
              className="p-2 mt-0.5 rounded-lg text-dark-300 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
              title="Remove"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {canAdd && (
        <button
          type="button"
          onClick={add}
          className="flex items-center gap-1.5 text-sm font-body font-medium text-primary hover:text-primary-dark transition-colors mt-1"
        >
          <PlusIcon className="w-4 h-4" />
          {addLabel}
        </button>
      )}

      {maxItems && (
        <p className="text-xs font-body text-dark-300">{value.length}/{maxItems} items</p>
      )}

      {error && <p className="text-xs text-red-600 font-body">{error}</p>}
    </div>
  )
}
