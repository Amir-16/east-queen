import { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import { format, parseISO, formatDistanceToNow } from 'date-fns'
import { AdminLayout, StatusBadge, FormCard } from '@/components/admin'
import {
    ArrowLeftIcon, EnvelopeIcon, PhoneIcon, WrenchScrewdriverIcon,
    ClockIcon, GlobeAltIcon, CheckCircleIcon, ChatBubbleLeftEllipsisIcon,
    PaperAirplaneIcon, XMarkIcon,
} from '@heroicons/react/24/outline'
import { CheckBadgeIcon } from '@heroicons/react/24/solid'

const STATUS_CONFIG = {
    new: { label: 'New', next: ['read', 'replied'], bg: 'bg-red-50', border: 'border-red-200' },
    read: { label: 'Read', next: ['replied'], bg: 'bg-amber-50', border: 'border-amber-200' },
    replied: { label: 'Replied', next: ['read'], bg: 'bg-green-50', border: 'border-green-200' },
}

const STATUS_BUTTON = {
    read: { label: 'Mark as Read', cls: 'bg-amber-100 text-amber-700 hover:bg-amber-200' },
    replied: { label: 'Mark as Replied', cls: 'bg-green-100 text-green-700 hover:bg-green-200' },
    new: { label: 'Mark as New', cls: 'bg-red-100   text-red-700   hover:bg-red-200' },
}

export default function ShowContact() {
    const { contact } = usePage().props

    const [notes, setNotes] = useState(contact.admin_notes ?? '')
    const [savingNotes, setSavingNotes] = useState(false)
    const [changingStatus, setChangingStatus] = useState(false)

    const defaultSubject = `Re: Your enquiry about ${contact.service || 'our services'}`
    const defaultBody = `Dear ${contact.name},\n\nThank you for reaching out to Sff Agro\n\n`

    const [compose, setCompose] = useState(false)
    const [emailSubject, setEmailSubject] = useState(defaultSubject)
    const [emailBody, setEmailBody] = useState(defaultBody)
    const [sending, setSending] = useState(false)

    function openCompose() {
        setEmailSubject(defaultSubject)
        setEmailBody(defaultBody)
        setCompose(true)
    }

    function handleSendReply() {
        if (!emailSubject.trim() || !emailBody.trim()) return
        setSending(true)
        router.post(`/admin/contacts/${contact.id}/reply`, {
            subject: emailSubject,
            body: emailBody,
        }, {
            preserveState: true,
            onSuccess: () => setCompose(false),
            onFinish: () => setSending(false),
        })
    }

    const cfg = STATUS_CONFIG[contact.status] ?? STATUS_CONFIG.new

    function handleStatusChange(status) {
        setChangingStatus(true)
        router.patch(`/admin/contacts/${contact.id}/status`, { status }, {
            preserveState: true,
            onFinish: () => setChangingStatus(false),
        })
    }

    function handleSaveNotes() {
        setSavingNotes(true)
        router.patch(`/admin/contacts/${contact.id}/notes`, { admin_notes: notes }, {
            preserveState: true,
            onFinish: () => setSavingNotes(false),
        })
    }

    const whatsappHref = contact.phone
        ? `https://wa.me/${contact.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hi ${contact.name}, thank you for reaching out to Jonith Bogdad.`)}`
        : null

    return (
        <AdminLayout title="Inquiry Detail" subtitle={contact.name}>
            <Head title={`Inquiry from ${contact.name} — Admin`} />

            {/* ── Breadcrumb ── */}
            <div className="flex items-center gap-2 mb-6 text-sm">
                <button
                    type="button"
                    onClick={() => router.visit('/admin/contacts')}
                    className="inline-flex items-center gap-1.5 text-gray-500 hover:text-admin-navy transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Inquiries
                </button>
                <span className="text-gray-300">/</span>
                <span className="text-gray-600 font-medium truncate">{contact.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* ════════════════════════════════ LEFT: contact details + message */}
                <div className="lg:col-span-2 space-y-5">

                    {/* Contact info */}
                    <FormCard
                        title="Contact Information"
                        headerAction={<StatusBadge status={contact.status} />}
                    >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Detail
                                icon={<EnvelopeIcon className="w-4 h-4" />}
                                label="Email"
                            >
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="text-primary hover:underline font-medium"
                                >
                                    {contact.email}
                                </a>
                            </Detail>

                            <Detail
                                icon={<PhoneIcon className="w-4 h-4" />}
                                label="Phone"
                            >
                                {contact.phone ? (
                                    <div className="flex items-center gap-2">
                                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline font-medium">
                                            {contact.phone}
                                        </a>
                                        {whatsappHref && (
                                            <a
                                                href={whatsappHref}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium hover:bg-green-200 transition-colors"
                                            >
                                                WhatsApp ↗
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <span className="text-gray-400">Not provided</span>
                                )}
                            </Detail>

                            <Detail
                                icon={<WrenchScrewdriverIcon className="w-4 h-4" />}
                                label="Service Interest"
                            >
                                {contact.service
                                    ? <span className="font-medium text-gray-700">{contact.service}</span>
                                    : <span className="text-gray-400">Not specified</span>
                                }
                            </Detail>

                            <Detail
                                icon={<ClockIcon className="w-4 h-4" />}
                                label="Received"
                            >
                                <span className="font-medium text-gray-700">
                                    {format(parseISO(contact.created_at), 'd MMM yyyy, HH:mm')}
                                </span>
                                <span className="text-xs text-gray-400 ml-1.5">
                                    ({formatDistanceToNow(parseISO(contact.created_at), { addSuffix: true })})
                                </span>
                            </Detail>

                            {contact.ip_address && (
                                <Detail
                                    icon={<GlobeAltIcon className="w-4 h-4" />}
                                    label="IP Address"
                                >
                                    <span className="text-gray-500 font-mono text-sm">{contact.ip_address}</span>
                                </Detail>
                            )}
                        </div>
                    </FormCard>

                    {/* Message */}
                    <FormCard title="Message">
                        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                                {contact.message}
                            </p>
                        </div>
                    </FormCard>

                    {/* Quick Reply */}
                    <FormCard title="Quick Reply Actions">
                        {!compose ? (
                            <div className="flex flex-wrap gap-3">
                                <button
                                    type="button"
                                    onClick={openCompose}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-admin-navy text-white text-sm font-medium rounded-lg hover:bg-admin-navy/90 transition-colors"
                                >
                                    <EnvelopeIcon className="w-4 h-4" />
                                    Reply via Email
                                </button>
                                {whatsappHref && (
                                    <a
                                        href={whatsappHref}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        <PhoneIcon className="w-4 h-4" />
                                        Reply via WhatsApp
                                    </a>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {/* Compose header */}
                                <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                        <EnvelopeIcon className="w-4 h-4 text-admin-gold" />
                                        Compose Email
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => setCompose(false)}
                                        className="text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </div>

                                {/* To (read-only) */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
                                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm">
                                        <span className="font-medium text-gray-700">{contact.name}</span>
                                        <span className="text-gray-400">&#8249;{contact.email}&#8250;</span>
                                    </div>
                                </div>

                                {/* Subject */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Subject</label>
                                    <input
                                        type="text"
                                        value={emailSubject}
                                        onChange={(e) => setEmailSubject(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold"
                                    />
                                </div>

                                {/* Body */}
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Message</label>
                                    <textarea
                                        rows={8}
                                        value={emailBody}
                                        onChange={(e) => setEmailBody(e.target.value)}
                                        placeholder="Write your reply here…"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-y font-mono"
                                    />
                                    <p className="text-xs text-gray-400 mt-1">
                                        {emailBody.length}/5000 characters
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center gap-3 pt-1">
                                    <button
                                        type="button"
                                        disabled={sending || !emailSubject.trim() || !emailBody.trim()}
                                        onClick={handleSendReply}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-admin-navy text-white text-sm font-medium rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                                    >
                                        {sending ? (
                                            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending…</>
                                        ) : (
                                            <><PaperAirplaneIcon className="w-4 h-4" /> Send Reply</>
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCompose(false)}
                                        className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </FormCard>
                </div>

                {/* ════════════════════════════════ RIGHT: status + notes */}
                <div className="space-y-5">

                    {/* Status panel */}
                    <div className={`rounded-xl border p-5 ${cfg.bg} ${cfg.border}`}>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">Status</p>
                        <div className="flex items-center gap-2 mb-4">
                            <StatusBadge status={contact.status} />
                            <span className="text-sm text-gray-600">
                                {contact.status === 'new' && 'Awaiting review'}
                                {contact.status === 'read' && 'Viewed by admin'}
                                {contact.status === 'replied' && 'Response sent'}
                            </span>
                        </div>

                        <p className="text-xs font-medium text-gray-500 mb-2">Change status:</p>
                        <div className="flex flex-col gap-2">
                            {cfg.next.map((s) => {
                                const btn = STATUS_BUTTON[s]
                                return (
                                    <button
                                        key={s}
                                        type="button"
                                        disabled={changingStatus}
                                        onClick={() => handleStatusChange(s)}
                                        className={`inline-flex items-center justify-center gap-2 text-sm font-medium px-3 py-2 rounded-lg transition-colors disabled:opacity-50 ${btn.cls}`}
                                    >
                                        <CheckCircleIcon className="w-4 h-4" />
                                        {btn.label}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Admin notes */}
                    <FormCard title="Admin Notes" description="Private — not visible to the client">
                        <textarea
                            rows={6}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add internal notes about this inquiry…"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-admin-gold/40 focus:border-admin-gold resize-none"
                        />
                        <button
                            type="button"
                            disabled={savingNotes}
                            onClick={handleSaveNotes}
                            className="mt-3 w-full inline-flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 bg-admin-navy text-white rounded-lg hover:bg-admin-navy/90 disabled:opacity-60 transition-colors"
                        >
                            {savingNotes
                                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</>
                                : <><CheckBadgeIcon className="w-4 h-4" /> Save Notes</>
                            }
                        </button>
                    </FormCard>

                    {/* Timeline */}
                    <FormCard title="Timeline">
                        <ol className="space-y-3 text-sm">
                            <TimelineItem
                                icon={<EnvelopeIcon className="w-3.5 h-3.5" />}
                                color="bg-blue-100 text-blue-600"
                                label="Inquiry submitted"
                                time={contact.created_at}
                            />
                            {contact.status !== 'new' && (
                                <TimelineItem
                                    icon={<CheckCircleIcon className="w-3.5 h-3.5" />}
                                    color="bg-amber-100 text-amber-600"
                                    label="Marked as read"
                                    time={contact.updated_at}
                                />
                            )}
                            {contact.status === 'replied' && (
                                <TimelineItem
                                    icon={<ChatBubbleLeftEllipsisIcon className="w-3.5 h-3.5" />}
                                    color="bg-green-100 text-green-600"
                                    label="Marked as replied"
                                    time={contact.updated_at}
                                />
                            )}
                        </ol>
                    </FormCard>
                </div>
            </div>
        </AdminLayout>
    )
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Detail({ icon, label, children }) {
    return (
        <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-gray-400 mb-1">
                {icon}
                {label}
            </div>
            <div className="text-sm">{children}</div>
        </div>
    )
}

function TimelineItem({ icon, color, label, time }) {
    return (
        <li className="flex items-start gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${color}`}>
                {icon}
            </div>
            <div>
                <p className="font-medium text-gray-700">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                    {format(parseISO(time), 'd MMM yyyy, HH:mm')}
                </p>
            </div>
        </li>
    )
}
