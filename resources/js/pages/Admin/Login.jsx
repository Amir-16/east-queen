import { Head, useForm } from '@inertiajs/react'

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({
    email:    '',
    password: '',
    remember: false,
  })

  const submit = (e) => {
    e.preventDefault()
    post('/admin/login')
  }

  return (
    <>
      <Head title="Admin Login" />

      <div className="min-h-screen flex">

        {/* ── Left Panel: Form ── */}
        <div
          className="w-full lg:w-[46%] flex flex-col justify-center px-8 sm:px-14 xl:px-20 relative overflow-hidden"
          style={{ background: 'linear-gradient(160deg, #0a1628 0%, #0f2040 60%, #0d1a35 100%)' }}
        >
          {/* Decorative orbs */}
          <div className="absolute -top-32 -right-20 w-80 h-80 rounded-full pointer-events-none"
               style={{ background: 'radial-gradient(circle, rgba(209,160,84,0.10) 0%, transparent 70%)' }} />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full pointer-events-none"
               style={{ background: 'radial-gradient(circle, rgba(209,160,84,0.07) 0%, transparent 70%)' }} />

          <div className="relative z-10 w-full max-w-sm mx-auto">

            {/* Logo + Brand */}
            <div className="mb-10">
              <img
                src="/images/brand/logo-white.png"
                alt="East Queen Group"
                className="h-12 mb-6 drop-shadow-lg"
              />
              <h1 className="text-3xl font-bold text-white leading-tight"
                  style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                Welcome back
              </h1>
              <p className="mt-1.5 text-sm" style={{ color: 'rgba(209,160,84,0.70)', fontFamily: 'Inter, sans-serif' }}>
                Sign in to the East Queen Group admin portal
              </p>
            </div>

            {/* Error banner */}
            {errors.email && (
              <div className="mb-5 px-4 py-3 rounded-xl text-sm"
                   style={{ background: 'rgba(220,38,38,0.15)', border: '1px solid rgba(220,38,38,0.3)', color: '#fca5a5', fontFamily: 'Inter, sans-serif' }}>
                {errors.email}
              </div>
            )}

            <form onSubmit={submit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                       style={{ color: 'rgba(209,160,84,0.60)', fontFamily: 'Inter, sans-serif' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  required
                  placeholder="admin@eastqueengroup.com"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(209,160,84,0.18)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(209,160,84,0.55)')}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(209,160,84,0.18)')}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-2"
                       style={{ color: 'rgba(209,160,84,0.60)', fontFamily: 'Inter, sans-serif' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  required
                  placeholder="••••••••••••"
                  className="w-full rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 outline-none transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(209,160,84,0.18)',
                    fontFamily: 'Inter, sans-serif',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'rgba(209,160,84,0.55)')}
                  onBlur={(e)  => (e.target.style.borderColor = 'rgba(209,160,84,0.18)')}
                />
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2.5">
                <input
                  type="checkbox"
                  id="remember"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className="w-4 h-4 rounded accent-yellow-500"
                />
                <label htmlFor="remember" className="text-sm select-none"
                       style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>
                  Keep me signed in
                </label>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={processing}
                className="w-full rounded-xl py-3.5 text-sm font-bold tracking-wide transition-all duration-200 disabled:opacity-60"
                style={{
                  background: processing ? 'rgba(209,160,84,0.6)' : 'linear-gradient(135deg, #d4a44c 0%, #b8882e 100%)',
                  color: '#0a1628',
                  fontFamily: 'Inter, sans-serif',
                  boxShadow: processing ? 'none' : '0 4px 20px rgba(209,160,84,0.35)',
                }}
              >
                {processing ? 'Signing in…' : 'Sign in to Admin Panel'}
              </button>
            </form>

            <p className="mt-8 text-center text-xs" style={{ color: 'rgba(255,255,255,0.25)', fontFamily: 'Inter, sans-serif' }}>
              <a
                href="/"
                className="inline-flex items-center gap-1.5 transition-colors duration-150"
                style={{ color: 'rgba(209,160,84,0.50)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(209,160,84,0.90)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(209,160,84,0.50)')}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Website
              </a>
            </p>
          </div>
        </div>

        {/* ── Right Panel: Hero Image ── */}
        <div className="hidden lg:block lg:w-[54%] relative">
          <img
            src="/images/ship-breaking/coastal-view.jpeg"
            alt="East Queen Ship Breaking Yard"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(135deg, rgba(10,22,40,0.55) 0%, rgba(10,22,40,0.10) 50%, transparent 100%)' }} />
          <div className="absolute inset-0"
               style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 50%)' }} />

          {/* Bottom caption badge */}
          <div className="absolute bottom-10 left-10 right-10">
            <div className="inline-flex items-center gap-3 rounded-2xl px-5 py-4"
                 style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)' }}>
              <span className="w-2.5 h-2.5 rounded-full flex-shrink-0 animate-pulse"
                    style={{ background: '#d4a44c', boxShadow: '0 0 8px rgba(209,160,84,0.6)' }} />
              <div>
                <p className="text-white font-semibold text-sm leading-tight"
                   style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                  East Queen Group — Admin Panel
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter, sans-serif' }}>
                  Ship recycling · Trading · Maritime · Energy
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}
