import { useRef, useState } from 'react'
import { LinkIcon, FilmIcon, XMarkIcon } from '@heroicons/react/24/outline'

// Read XSRF-TOKEN cookie — Laravel refreshes it on every response, so it's always fresh.
// Prefer this over the meta tag which can go stale after session rotation or server restart.
const getXsrfToken = () => {
    const match = document.cookie.match(/(?:^|;\s*)XSRF-TOKEN=([^;]*)/)
    return match ? decodeURIComponent(match[1]) : ''
}

const isStoragePath = (val) => Boolean(val) && val.startsWith('/storage/')

async function uploadVideo(file, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        const body = new FormData()
        body.append('video', file)

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100))
        })

        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const data = JSON.parse(xhr.responseText)
                    resolve(data.url)
                } catch {
                    reject(new Error('Invalid server response'))
                }
            } else {
                try {
                    const data = JSON.parse(xhr.responseText)
                    // Laravel validation errors: { message, errors: { field: [msg, …] } }
                    const first = data?.errors ? Object.values(data.errors).flat()[0] : null
                    reject(new Error(first ?? data?.message ?? `Upload failed (${xhr.status})`))
                } catch {
                    reject(new Error(`Upload failed (${xhr.status})`))
                }
            }
        })

        xhr.addEventListener('error', () => reject(new Error('Network error — upload failed')))
        xhr.addEventListener('abort', () => reject(new Error('Upload cancelled')))

        xhr.open('POST', '/admin/upload/video')
        xhr.withCredentials = true                                // send session cookie
        xhr.setRequestHeader('X-XSRF-TOKEN', getXsrfToken())     // cookie-based CSRF (always fresh)
        xhr.setRequestHeader('Accept', 'application/json')        // Laravel returns JSON errors, not HTML redirects
        xhr.send(body)
    })
}

export default function VideoField({ value = '', onChange, label = 'Video', error }) {
    const initialIsUpload = isStoragePath(value)

    const [mode,        setMode]        = useState(initialIsUpload ? 'upload' : 'link')
    const [linkInput,   setLinkInput]   = useState(initialIsUpload ? '' : value)
    const [uploadedUrl, setUploadedUrl] = useState(initialIsUpload ? value : '')
    const [uploading,   setUploading]   = useState(false)
    const [progress,    setProgress]    = useState(0)
    const [uploadErr,   setUploadErr]   = useState('')
    const [dragOver,    setDragOver]    = useState(false)
    const fileRef = useRef(null)

    const currentSrc = mode === 'link' ? linkInput : uploadedUrl

    const switchMode = (next) => {
        if (next === mode) return
        setMode(next)
        setUploadErr('')
        onChange(next === 'link' ? linkInput : uploadedUrl)
    }

    const handleLinkChange = (val) => {
        setLinkInput(val)
        onChange(val)
    }

    const runUpload = async (file) => {
        if (!file) return
        const MB = file.size / 1024 / 1024
        if (MB > 20) {
            setUploadErr('File is too large — maximum 20 MB')
            return
        }
        const allowed = ['video/mp4', 'video/quicktime', 'video/webm']
        if (!allowed.includes(file.type)) {
            setUploadErr('Only MP4, MOV, or WebM files are allowed')
            return
        }

        setUploading(true)
        setUploadErr('')
        setProgress(0)

        try {
            const url = await uploadVideo(file, setProgress)
            setUploadedUrl(url)
            onChange(url)
        } catch (err) {
            setUploadErr(err.message)
        } finally {
            setUploading(false)
            setProgress(0)
            if (fileRef.current) fileRef.current.value = ''
        }
    }

    const handleFileInput = (e) => runUpload(e.target.files?.[0])

    const handleDrop = (e) => {
        e.preventDefault()
        setDragOver(false)
        runUpload(e.dataTransfer.files?.[0])
    }

    const clear = () => {
        if (mode === 'link') { setLinkInput(''); onChange('') }
        else { setUploadedUrl(''); onChange('') }
        setUploadErr('')
        if (fileRef.current) fileRef.current.value = ''
    }

    return (
        <div className="space-y-2.5">
            {label && (
                <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {label}
                </label>
            )}

            {/* Mode toggle */}
            <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5 gap-0.5">
                {[
                    { id: 'link',   Icon: LinkIcon,  text: 'Link / Path' },
                    { id: 'upload', Icon: FilmIcon,  text: 'Upload File' },
                ].map(({ id, Icon, text }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => switchMode(id)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all
                            ${mode === id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-700'}`}
                    >
                        <Icon className="w-3.5 h-3.5" />
                        {text}
                    </button>
                ))}
            </div>

            {/* Link / path input */}
            {mode === 'link' && (
                <div>
                    <input
                        type="text"
                        value={linkInput}
                        onChange={(e) => handleLinkChange(e.target.value)}
                        placeholder="/media/videos/video-01.mp4  or  https://…"
                        className={`w-full px-3 py-2 text-sm rounded-lg border transition-colors
                            focus:outline-none focus:ring-2
                            ${error ? 'border-red-300 focus:ring-red-200' : 'border-gray-300 focus:ring-green-200 focus:border-green-500'}`}
                    />
                    <p className="mt-1 text-xs text-gray-400">
                        Use this for existing seeder paths or external video URLs.
                    </p>
                </div>
            )}

            {/* Upload zone */}
            {mode === 'upload' && !uploadedUrl && (
                <label
                    className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-8 cursor-pointer transition-colors
                        ${uploading  ? 'border-gray-200 bg-gray-50 cursor-wait'
                        : dragOver   ? 'border-green-500 bg-green-50'
                        :              'border-gray-300 hover:border-green-500 hover:bg-green-50/50'}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                >
                    {uploading ? (
                        <div className="w-full space-y-2 px-4">
                            <div className="flex justify-between text-xs text-gray-500">
                                <span>Uploading…</span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-green-500 rounded-full transition-all duration-200"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                                <FilmIcon className="w-6 h-6 text-green-600" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-medium text-gray-700">
                                    {dragOver ? 'Drop to upload' : 'Click or drag a video here'}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">MP4, MOV, WebM — max 20 MB</p>
                            </div>
                        </>
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
                        disabled={uploading}
                        onChange={handleFileInput}
                        className="sr-only"
                    />
                </label>
            )}

            {/* Replace row — shown after a successful upload */}
            {mode === 'upload' && uploadedUrl && (
                <label className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:border-green-400 hover:bg-green-50/50 transition-colors">
                    <FilmIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-xs text-gray-600 flex-1 truncate">
                        {uploading ? `Uploading… ${progress}%` : 'Click to replace video'}
                    </span>
                    {uploading && (
                        <span className="w-4 h-4 border-2 border-gray-200 border-t-green-500 rounded-full animate-spin flex-shrink-0" />
                    )}
                    <input
                        ref={fileRef}
                        type="file"
                        accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm"
                        disabled={uploading}
                        onChange={handleFileInput}
                        className="sr-only"
                    />
                </label>
            )}

            {uploadErr && (
                <p className="text-xs text-red-600 font-medium">{uploadErr}</p>
            )}

            {/* Video preview */}
            {currentSrc && (
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-black group">
                    <video
                        src={currentSrc}
                        controls
                        preload="metadata"
                        className="w-full max-h-52 object-contain"
                        onError={(e) => { e.currentTarget.style.opacity = '0.3' }}
                    />
                    <button
                        type="button"
                        onClick={clear}
                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 hover:bg-red-600 text-white flex items-center justify-center transition-colors"
                        title="Remove"
                    >
                        <XMarkIcon className="w-4 h-4" />
                    </button>
                </div>
            )}

            {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
    )
}
