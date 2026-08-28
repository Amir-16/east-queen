import { useRef, useState } from 'react'
import { ArrowUpTrayIcon, LinkIcon, TrashIcon } from '@heroicons/react/24/outline'

async function uploadFile(file) {
    const csrf = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? ''
    const body = new FormData()
    body.append('image', file)
    const res = await fetch('/admin/upload/image', {
        method: 'POST',
        headers: { 'X-CSRF-TOKEN': csrf },
        body,
    })
    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err?.message ?? 'Upload failed')
    }
    const { url } = await res.json()
    return url
}

export default function GalleryField({ value = [], onChange, maxItems = 20 }) {
    const [urlInput,   setUrlInput]   = useState('')
    const [uploading,  setUploading]  = useState(false)
    const [progress,   setProgress]   = useState({ done: 0, total: 0 })
    const [uploadErrs, setUploadErrs] = useState([])
    const [dragging,   setDragging]   = useState(false)
    const fileRef = useRef(null)

    const items     = Array.isArray(value) ? value : []
    const remaining = maxItems - items.length

    // ── URL add ──────────────────────────────────────────────────────────────
    function addUrl() {
        const url = urlInput.trim()
        if (!url || remaining <= 0) return
        onChange([...items, url])
        setUrlInput('')
    }

    // ── Multi-file upload ─────────────────────────────────────────────────────
    async function uploadFiles(fileList) {
        const files = Array.from(fileList)
            .filter((f) => f.type.startsWith('image/'))
            .slice(0, remaining)

        if (!files.length) return

        setUploading(true)
        setUploadErrs([])
        setProgress({ done: 0, total: files.length })

        const uploaded = []
        const errs     = []

        for (const file of files) {
            try {
                uploaded.push(await uploadFile(file))
            } catch (err) {
                errs.push(`${file.name}: ${err.message}`)
            }
            setProgress((p) => ({ ...p, done: p.done + 1 }))
        }

        if (uploaded.length) onChange([...items, ...uploaded])
        if (errs.length)     setUploadErrs(errs)

        setUploading(false)
        if (fileRef.current) fileRef.current.value = ''
    }

    function handleFileInput(e) { uploadFiles(e.target.files) }

    function handleDrop(e) {
        e.preventDefault()
        setDragging(false)
        uploadFiles(e.dataTransfer.files)
    }

    function remove(idx) {
        onChange(items.filter((_, i) => i !== idx))
    }

    return (
        <div className="space-y-4">

            {/* ── Drop zone (multi-file) ─────────────────────────────────── */}
            {remaining > 0 && (
                <label
                    onDragOver={(e)  => { e.preventDefault(); setDragging(true) }}
                    onDragLeave={()  => setDragging(false)}
                    onDrop={handleDrop}
                    className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors select-none
                        ${dragging   ? 'border-admin-gold bg-admin-gold/10 scale-[1.01]' :
                          uploading  ? 'border-gray-200 bg-gray-50 cursor-wait' :
                                       'border-gray-300 hover:border-admin-gold hover:bg-admin-gold/5'}`}
                >
                    {uploading ? (
                        <>
                            <span className="w-8 h-8 border-2 border-gray-200 border-t-admin-gold rounded-full animate-spin" />
                            <span className="text-sm font-medium text-gray-600">
                                Uploading {progress.done} / {progress.total}…
                            </span>
                            <div className="w-48 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                                <div
                                    className="h-full bg-admin-gold transition-all duration-300"
                                    style={{ width: `${(progress.done / progress.total) * 100}%` }}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <ArrowUpTrayIcon className="w-9 h-9 text-gray-400" />
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">
                                    Drop images here or{' '}
                                    <span className="text-admin-gold underline underline-offset-2">browse files</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-0.5">
                                    Select multiple — JPEG, PNG, WebP · max 5 MB each · {remaining} slot{remaining !== 1 ? 's' : ''} remaining
                                </p>
                            </div>
                        </>
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        multiple
                        disabled={uploading || remaining <= 0}
                        onChange={handleFileInput}
                        className="sr-only"
                    />
                </label>
            )}

            {/* ── URL input ─────────────────────────────────────────────── */}
            {remaining > 0 && (
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            value={urlInput}
                            onChange={(e) => setUrlInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
                            placeholder="Or paste an image URL…"
                            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={addUrl}
                        disabled={!urlInput.trim()}
                        className="px-4 py-2 bg-admin-navy text-white text-sm font-medium rounded-lg hover:bg-admin-navy/90 disabled:opacity-50 transition-colors whitespace-nowrap"
                    >
                        Add URL
                    </button>
                </div>
            )}

            {/* ── Upload errors ─────────────────────────────────────────── */}
            {uploadErrs.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 space-y-1">
                    {uploadErrs.map((e, i) => (
                        <p key={i} className="text-xs text-red-600">{e}</p>
                    ))}
                </div>
            )}

            {/* ── Thumbnail grid ────────────────────────────────────────── */}
            {items.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {items.map((url, idx) => (
                        <div
                            key={idx}
                            className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50 aspect-video"
                        >
                            <img
                                src={url}
                                alt={`Gallery ${idx + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.opacity = '0.3' }}
                            />
                            {/* Delete button — always visible on mobile, hover-only on desktop */}
                            <button
                                type="button"
                                onClick={() => remove(idx)}
                                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all
                                           sm:opacity-0 sm:group-hover:opacity-100 opacity-100 shadow-sm"
                                title="Remove"
                            >
                                <TrashIcon className="w-3.5 h-3.5" />
                            </button>
                            <span className="absolute top-1 left-1 text-[10px] bg-black/50 text-white rounded px-1 leading-4 select-none">
                                {idx + 1}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* ── Counter ───────────────────────────────────────────────── */}
            <p className="text-xs text-gray-400">{items.length} / {maxItems} images</p>
        </div>
    )
}
