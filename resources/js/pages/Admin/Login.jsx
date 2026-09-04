import { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'

/* ── Inline icons (no extra import needed) ──────────────────────── */
const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
  </svg>
)

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
  </svg>
)

const EyeIcon = ({ open }) => open ? (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
) : (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
  </svg>
)

const AlertIcon = () => (
  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round"
      d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
)

const STATS = [
  { value: '1982', label: 'Established' },
  { value: '6',    label: 'Companies'   },
  { value: '40+',  label: 'Years'       },
]

/* ── Input component to avoid repetition ─────────────────────────── */
function Field({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-[0.22em] mb-2"
             style={{ color: 'rgba(212,164,76,0.55)' }}>
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: 'rgba(212,164,76,0.40)' }}>
          <Icon />
        </span>
        {children}
      </div>
    </div>
  )
}

const inputBase = {
  background: 'rgba(255,255,255,0.05)',
  border:     '1px solid rgba(212,164,76,0.15)',
}
const inputFocus = {
  borderColor: 'rgba(212,164,76,0.50)',
  background:  'rgba(255,255,255,0.07)',
}
const inputBlur = {
  borderColor: 'rgba(212,164,76,0.15)',
  background:  'rgba(255,255,255,0.05)',
}

/* ── Page component ─────────────────────────────────────────────── */
function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email:    '',
    password: '',
    remember: false,
  })
  const [showPw, setShowPw] = useState(false)

  const submit = (e) => {
    e.preventDefault()
    post('/admin/login')
  }

  return (
    <>
      <Head title="Admin Login — East Queen Group" />

      <div className="min-h-screen flex">

        {/* ══ LEFT — Form Panel ═══════════════════════════════════════ */}
        <div
          className="w-full lg:w-[44%] flex flex-col relative overflow-hidden"
          style={{ background: 'linear-gradient(155deg, #07101f 0%, #0d1e38 55%, #091629 100%)' }}
        >
          {/* Ambient glow orbs */}
          <div className="absolute -top-48 -right-24 w-[28rem] h-[28rem] rounded-full pointer-events-none"
               style={{ background: 'radial-gradient(circle, rgba(212,164,76,0.11) 0%, transparent 65%)' }} />
          <div className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full pointer-events-none"
               style={{ background: 'radial-gradient(circle, rgba(212,164,76,0.07) 0%, transparent 65%)' }} />
          {/* Subtle dot texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
               style={{ backgroundImage: 'radial-gradient(circle, #d4a44c 1px, transparent 1px)', backgroundSize: '28px 28px' }} />

          {/* Logo — top-left */}
          <div className="relative z-10 px-10 pt-10 pb-0">
            <img
              src="/images/brand/logo-white.svg"
              alt="East Queen Group"
              className="h-14 w-auto object-contain"
              onError={(e) => { e.currentTarget.src = '/images/brand/logo.svg' }}
            />
          </div>

          {/* Form — vertically centred in remaining space */}
          <div className="relative z-10 flex-1 flex items-center px-8 sm:px-12 lg:px-14 xl:px-16">
            <div className="w-full max-w-[360px] mx-auto py-8">

              {/* Heading block */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3.5">
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse"
                        style={{ background: '#d4a44c', boxShadow: '0 0 6px rgba(212,164,76,0.60)' }} />
                  <span className="text-[9px] font-bold uppercase tracking-[0.35em]"
                        style={{ color: 'rgba(212,164,76,0.65)' }}>
                    Admin Portal
                  </span>
                </div>
                <h1 className="text-[2.1rem] font-bold text-white leading-tight tracking-tight"
                    style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  Welcome back
                </h1>
                <p className="mt-2 text-[13px] leading-relaxed"
                   style={{ color: 'rgba(255,255,255,0.36)' }}>
                  Authorised personnel only. Sign in to manage the East Queen Group platform.
                </p>
              </div>

              {/* Error banner */}
              {errors.email && (
                <div className="flex items-start gap-3 mb-6 px-4 py-3.5 rounded-xl text-sm"
                     style={{ background: 'rgba(220,38,38,0.12)', border: '1px solid rgba(220,38,38,0.25)', color: '#fca5a5' }}>
                  <AlertIcon />
                  <span>{errors.email}</span>
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">

                {/* Email */}
                <Field icon={MailIcon} label="Email Address">
                  <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    required
                    autoComplete="username"
                    className="w-full rounded-xl pl-10 pr-4 py-3 text-sm text-white outline-none transition-all duration-200"
                    style={inputBase}
                    onFocus={(e) => Object.assign(e.target.style, inputFocus)}
                    onBlur={(e)  => Object.assign(e.target.style, inputBlur)}
                  />
                </Field>

                {/* Password */}
                <Field icon={LockIcon} label="Password">
                  <input
                    type={showPw ? 'text' : 'password'}
                    value={data.password}
                    onChange={(e) => setData('password', e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full rounded-xl pl-10 pr-12 py-3 text-sm text-white outline-none transition-all duration-200"
                    style={inputBase}
                    onFocus={(e) => Object.assign(e.target.style, inputFocus)}
                    onBlur={(e)  => Object.assign(e.target.style, inputBlur)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.28)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(212,164,76,0.80)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.28)')}
                  >
                    <EyeIcon open={showPw} />
                  </button>
                </Field>

                {/* Remember me */}
                <label htmlFor="remember"
                       className="flex items-center gap-3 pt-0.5 cursor-pointer select-none group w-fit">
                  <span className="relative w-[18px] h-[18px] shrink-0">
                    <input
                      type="checkbox"
                      id="remember"
                      checked={data.remember}
                      onChange={(e) => setData('remember', e.target.checked)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="absolute inset-0 rounded flex items-center justify-center transition-all duration-150"
                          style={{
                            background: data.remember ? '#d4a44c' : 'rgba(255,255,255,0.06)',
                            border: `1px solid ${data.remember ? '#d4a44c' : 'rgba(255,255,255,0.18)'}`,
                          }}>
                      {data.remember && (
                        <svg className="w-2.5 h-2.5" fill="none" stroke="#07101f" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      )}
                    </span>
                  </span>
                  <span className="text-[13px] transition-colors duration-150"
                        style={{ color: 'rgba(255,255,255,0.38)' }}>
                    Keep me signed in
                  </span>
                </label>

                {/* Thin divider */}
                <div className="h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full rounded-xl py-3.5 text-[13px] font-bold tracking-wide transition-all duration-200 disabled:opacity-60 flex items-center justify-center gap-2.5"
                  style={{
                    background: processing
                      ? 'rgba(212,164,76,0.55)'
                      : 'linear-gradient(135deg, #d4a44c 0%, #c4903a 50%, #b8882e 100%)',
                    color: '#07101f',
                    boxShadow: processing
                      ? 'none'
                      : '0 4px 24px rgba(212,164,76,0.28), 0 1px 0 rgba(255,255,255,0.14) inset',
                  }}
                >
                  {processing ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Authenticating…
                    </>
                  ) : (
                    'Sign in to Admin Panel'
                  )}
                </button>
              </form>

              {/* Back link */}
              <div className="mt-8 text-center">
                <a
                  href="/"
                  className="inline-flex items-center gap-1.5 text-xs transition-colors duration-150"
                  style={{ color: 'rgba(212,164,76,0.38)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(212,164,76,0.80)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(212,164,76,0.38)')}
                >
                  <ArrowLeftIcon />
                  Back to public website
                </a>
              </div>
            </div>
          </div>

          {/* Copyright footer */}
          <div className="relative z-10 px-10 pb-8">
            <p className="text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.16)' }}>
              © {new Date().getFullYear()} East Queen Group. All rights reserved.
            </p>
          </div>
        </div>

        {/* ══ RIGHT — Hero Image Panel ════════════════════════════════ */}
        <div className="hidden lg:flex lg:w-[56%] relative overflow-hidden">
          <img
            src="/images/shipping/bbg-master-night.jpeg"
            alt="East Queen Group fleet"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ objectPosition: 'center 40%' }}
          />

          {/* Bleed into form panel */}
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to right, rgba(7,16,31,0.92) 0%, rgba(7,16,31,0.25) 30%, transparent 60%)' }} />
          {/* Bottom lift */}
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.08) 45%, transparent 65%)' }} />
          {/* Top vignette */}
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 22%)' }} />

          {/* Centre quote */}
          <div className="absolute inset-0 flex items-center justify-end pr-16 pl-12">
            <div className="max-w-xs">
              <div className="h-px w-10 mb-6"
                   style={{ background: 'rgba(212,164,76,0.55)' }} />
              <p className="text-white/65 text-[15px] leading-relaxed italic"
                 style={{ fontFamily: 'Playfair Display, Georgia, serif', textShadow: '0 1px 6px rgba(0,0,0,0.60)' }}>
                "Building Bangladesh's industrial future through maritime excellence and international trade."
              </p>
              <div className="h-px w-10 mt-6"
                   style={{ background: 'rgba(212,164,76,0.55)' }} />
            </div>
          </div>

          {/* Bottom row: stats + badge */}
          <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between">

            {/* Stats */}
            <div className="flex items-center gap-8">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <p className="text-2xl font-bold text-white leading-none"
                     style={{ fontFamily: 'Playfair Display, Georgia, serif', textShadow: '0 2px 10px rgba(0,0,0,0.60)' }}>
                    {value}
                  </p>
                  <p className="text-[9px] uppercase tracking-[0.22em] mt-1"
                     style={{ color: 'rgba(212,164,76,0.65)' }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

            {/* Secure badge */}
            <div className="inline-flex items-center gap-3 rounded-2xl px-5 py-3.5"
                 style={{
                   background:     'rgba(0,0,0,0.42)',
                   backdropFilter: 'blur(16px)',
                   border:         '1px solid rgba(255,255,255,0.10)',
                 }}>
              <span className="w-2 h-2 rounded-full shrink-0"
                    style={{ background: '#22c55e', boxShadow: '0 0 7px rgba(34,197,94,0.70)' }} />
              <div>
                <p className="text-white font-semibold text-[13px] leading-tight"
                   style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  East Queen Group
                </p>
                <p className="text-[10px] mt-0.5 uppercase tracking-wider"
                   style={{ color: 'rgba(255,255,255,0.38)' }}>
                  Secure Admin Panel
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

Login.layout = null

export default Login
