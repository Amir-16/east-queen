/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/views/**/*.blade.php',
    './resources/js/**/*.{js,jsx}',
  ],
  safelist: [
    // Dynamic color classes stored in DB (company cards, associate cards)
    'from-navy-900', 'to-navy-800', 'from-navy-800', 'to-navy-700',
    'from-teal-600', 'to-teal-500', 'from-teal-500', 'to-teal-400',
    'from-gold-600', 'to-gold-500', 'from-gold-500', 'to-gold-400',
    'from-slate-700', 'to-slate-600',
    'bg-gradient-to-br', 'bg-gradient-to-r',
    // Admin gradient presets
    'from-primary', 'to-primary/70',
    'from-accent', 'to-accent/70',
    'from-green-600', 'to-green-400',
    'from-purple-600', 'to-purple-400',
    'from-red-600', 'to-red-400',
    'from-slate-600', 'to-slate-400',
  ],
  theme: {
    extend: {
      colors: {
        // ── EQ Public Site: Deep Navy-Purple ─────────────────
        navy: {
          950: '#0D0B1E',
          900: '#16143E',
          800: '#231F5A',
          700: '#3A3572',
          600: '#4D4890',
        },
        // ── EQ Public Site: Brand Red (gold alias = red for EQ) ──
        gold: {
          50:  '#FFF5F5',
          100: '#FFECEC',
          200: '#FFCDD0',
          300: '#FFA3A8',
          400: '#F76169',
          500: '#E21F2F',
          600: '#C01A27',
          700: '#9B1520',
        },
        // ── EQ Public Site: Teal secondary ───────────────────
        teal: {
          50:  '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
        },
        // ── Neutral ───────────────────────────────────────────
        slate: {
          50:  '#F8F9FB',
          100: '#F1F3F7',
          200: '#E2E6ED',
          600: '#6B7280',
          700: '#4B5563',
          900: '#111827',
        },
        // ── Admin Panel Colours (unchanged) ───────────────────
        admin: {
          navy:          '#1A2E1A',
          'navy-light':  '#243D22',
          'navy-border': '#2D4A2A',
          gold:          '#4A8C2A',
          'gold-hover':  '#3D7522',
          'sidebar-text':'#C8DEB8',
          'page-bg':     '#F2F6F0',
        },
      },
      fontFamily: {
        // EQ Public
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        inter:    ['Inter', 'system-ui', 'sans-serif'],
        mono:     ['"JetBrains Mono"', 'monospace'],
        // Admin (kept for compatibility)
        sans:    ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      fontSize: {
        display: ['clamp(2.8rem,6vw,5.5rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        hero:    ['clamp(2.2rem,4.5vw,4rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        h1:      ['clamp(1.9rem,3.5vw,3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        h2:      ['clamp(1.6rem,2.8vw,2.25rem)',{ lineHeight: '1.2', letterSpacing: '-0.01em' }],
        h3:      ['clamp(1.15rem,2vw,1.6rem)', { lineHeight: '1.3' }],
        h4:      ['clamp(1rem,1.5vw,1.25rem)', { lineHeight: '1.4' }],
        stat:    ['clamp(2.8rem,5vw,4rem)',    { lineHeight: '1',    letterSpacing: '-0.02em' }],
      },
      boxShadow: {
        card:        '0 2px 16px rgba(17,24,39,0.07)',
        hover:       '0 12px 40px rgba(17,24,39,0.14)',
        gold:        '0 0 0 2px #E21F2F',
        deep:        '0 24px 64px rgba(13,11,30,0.45)',
        'gold-glow': '0 4px 32px rgba(226,31,47,0.32)',
        'sm-card':   '0 1px 8px rgba(17,24,39,0.06)',
        // Admin shadows
        green:       '0 4px 20px rgba(26,74,133,0.22)',
        earth:       '0 4px 20px rgba(180,130,20,0.18)',
        accent:      '0 4px 20px rgba(74,140,42,0.40)',
        'admin-box': '0 4px 24px rgba(26,46,26,0.25)',
      },
      borderRadius: {
        sm:      '4px',
        DEFAULT: '8px',
        lg:      '12px',
        xl:      '20px',
        '2xl':   '28px',
      },
      animation: {
        marquee:     'marquee 40s linear infinite',
        'fade-in':   'fadeIn 0.55s ease-out forwards',
        float:       'float 3.5s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'pulse-slow':'pulse 3s infinite',
        'slide-in':  'slideIn 0.25s ease-out',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-6px)' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':      { opacity: '0.5', transform: 'scale(0.8)' },
        },
        slideIn: {
          '0%':   { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      backgroundImage: {
        'gradient-admin': 'linear-gradient(160deg, #1A2E1A 0%, #243D22 60%, #1e2d1c 100%)',
        'grid-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M0 0h32v1H0zM0 0v32h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        'dots-pattern':
          "url(\"data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23E21F2F' fill-opacity='0.07'%3E%3Ccircle cx='2' cy='2' r='1.5'/%3E%3C/g%3E%3C/svg%3E\")",
        'light-grid':
          "url(\"data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23111827' fill-opacity='0.04'%3E%3Cpath d='M0 0h32v1H0zM0 0v32h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        snappy: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
