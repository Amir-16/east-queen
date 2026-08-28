import { useRef, useState } from 'react'
import { LinkIcon, PhotoIcon } from '@heroicons/react/24/outline'

// Uses window.axios (configured in bootstrap.js) which automatically reads the
// XSRF-TOKEN cookie Laravel refreshes on every response — no stale CSRF issues.
async function uploadFile(file) {
    const body = new FormData()
    body.append('image', file)

    try {
        const { data } = await window.axios.post('/admin/upload/image', body, {
            headers: { 'Accept': 'application/json' },
        })
        return data.url
    } catch (err) {
        // Axios wraps validation (422) and CSRF (419) errors in err.response
        const res = err.response?.data ?? {}
        const first = res.errors ? Object.values(res.errors).flat()[0] : null
        throw new Error(first ?? res.message ?? `Upload failed (${err.response?.status ?? 'network error'})`)
    }
}

// Uploaded files come back as /storage/... paths; external URLs start with http
const isStoragePath = (val) => Boolean(val) && (val.startsWith('/storage/') || val.startsWith('/uploads/'))

export default function ImageField({ value = '', onChange, label = 'Image', error }) {
    // Auto-detect mode from initial value so editing an uploaded slide starts in upload mode
    const initialIsUpload = isStoragePath(value)

    const [mode,       setMode]       = useState(initialIsUpload ? 'upload' : 'url')
    const [urlInput,   setUrlInput]   = useState(initialIsUpload ? '' : value)
    const [uploadedUrl, setUploadedUrl] = useState(initialIsUpload ? value : '')
    const [uploading,  setUploading]  = useState(false)
    const [uploadErr,  setUploadErr]  = useState('')
    const fileRef = useRef(null)

    const preview = mode === 'url' ? urlInput : uploadedUrl

    const handleModeSwitch = (newMode) => {
        if (newMode === mode) return
        setMode(newMode)
        setUploadErr('')
        // Each mode owns its own value; switching propagates the new mode's current value
        onChange(newMode === 'url' ? urlInput : uploadedUrl)
    }

    const handleUrlChange = (url) => {
        setUrlInput(url)
        onChange(url)
    }

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0]
        if (!file) return
        if (file.size / 1024 / 1024 > 5) {
            setUploadErr('File is too large — maximum 5 MB')
            if (fileRef.current) fileRef.current.value = ''
            return
        }
        setUploading(true)
        setUploadErr('')
        try {
            const url = await uploadFile(file)
            setUploadedUrl(url)
            onChange(url)
            // Stay in upload mode — never put a storage path into the URL input
        } catch (err) {
            setUploadErr(err.message)
        } finally {
            setUploading(false)
            if (fileRef.current) fileRef.current.value = ''
        }
    }

    const clear = () => {
        if (mode === 'url') setUrlInput('')
        else setUploadedUrl('')
        setUploadErr('')
        onChange('')
        if (fileRef.current) fileRef.current.value = ''
    }

    return (
        <div className="space-y-2">
            {label && (
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {label}
                </label>
            )}

            {/* Mode toggle */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
                {[
                    { id: 'url',    Icon: LinkIcon,  text: 'URL'    },
                    { id: 'upload', Icon: PhotoIcon, text: 'Upload' },
                ].map(({ id, Icon, text }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => handleModeSwitch(id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                            ${mode === id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        <Icon className="w-3.5 h-3.5" />
                        {text}
                    </button>
                ))}
            </div>

            {/* URL input — type="text" avoids browser native URL validation on storage paths */}
            {mode === 'url' && (
                <input
                    type="text"
                    value={urlInput}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors
                        focus:outline-none focus:ring-2
                        ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-admin-gold/40 focus:border-admin-gold'}`}
                />
            )}

            {/* Upload zone — shown when no file uploaded yet */}
            {mode === 'upload' && !uploadedUrl && (
                <label className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-xl p-5 cursor-pointer transition-colors
                    ${uploading ? 'border-gray-200 bg-gray-50 cursor-wait' : 'border-gray-300 hover:border-admin-gold hover:bg-admin-gold/5'}`}
                >
                    {uploading ? (
                        <>
                            <span className="w-5 h-5 border-2 border-gray-300 border-t-admin-gold rounded-full animate-spin" />
                            <span className="text-xs text-gray-500">Uploading…</span>
                        </>
                    ) : (
                        <>
                            <PhotoIcon className="w-7 h-7 text-gray-400" />
                            <span className="text-xs text-gray-600">Click to choose an image</span>
                            <span className="text-xs text-gray-400">JPEG, PNG, WebP — max 5 MB</span>
                        </>
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        disabled={uploading}
                        onChange={handleFileChange}
                        className="sr-only"
                    />
                </label>
            )}

            {/* Replace-image row — shown after a file has been uploaded */}
            {mode === 'upload' && uploadedUrl && (
                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-admin-gold hover:bg-admin-gold/5 transition-colors">
                    <PhotoIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-600 flex-1">
                        {uploading ? 'Uploading…' : 'Click to replace image'}
                    </span>
                    {uploading && (
                        <span className="w-4 h-4 border-2 border-gray-300 border-t-admin-gold rounded-full animate-spin flex-shrink-0" />
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/gif"
                        disabled={uploading}
                        onChange={handleFileChange}
                        className="sr-only"
                    />
                </label>
            )}

            {uploadErr && <p className="text-xs text-red-600">{uploadErr}</p>}

            {/* Preview thumbnail */}
            {preview && (
                <div className="flex items-end gap-3">
                    <div className="relative w-32 h-24 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 group flex-shrink-0">
                        <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.style.opacity = '0.3' }}
                        />
                        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <button
                        type="button"
                        onClick={clear}
                        className="text-xs text-red-500 hover:text-red-700 font-medium underline underline-offset-2 flex-shrink-0"
                    >
                        Remove
                    </button>
                </div>
            )}

            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    )
}
