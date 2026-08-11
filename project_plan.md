# East Queen Group — Lead Engineer Project Plan v3.0

**Author:** Lead Engineer  
**Date:** August 2026  
**Stack:** React 18 + Vite 5 + TypeScript 5 + Tailwind CSS 3.4 + Framer Motion 11  
**Live Domain:** eastqueengroup.com  
**Old Codebase:** `/home/amir/Projects/Frontend/old-eastqueen/` (PHP/jQuery/Bootstrap 3)

---

## 1. Executive Summary

A full revamp of eastqueengroup.com — replacing the PHP/Bootstrap 3 site with a modern React SPA.

**Non-negotiables:**
1. **All old URLs preserved** exactly as in `sitemap.xml` — no broken Google rankings
2. **All old content retained** — every word from every PHP page is preserved or improved
3. **Premium "Industrial Heritage" UI** — comparable to Shell, Maersk, Aramco visual language
4. **Best-in-class animations** — Framer Motion scroll-reveals, Swiper hero slider, 3D card flips
5. **Mobile-first** — fully responsive at 375px up to 1920px

---

## 2. Technology Stack

| Concern | Package | Version |
|---|---|---|
| Framework | React | 18.3 |
| Build | Vite | 5.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.4 |
| Animation | Framer Motion | 11.x |
| Smooth Scroll | Lenis | 1.1.x |
| Hero Slider | Swiper.js | 11.x |
| Carousel | Embla Carousel | 8.x |
| Lightbox | yet-another-react-lightbox | 3.x |
| Counter | react-countup | 6.x |
| Toast | react-hot-toast | 2.x |
| Icons | Lucide React | 0.4x |
| Routing | React Router v6 | 6.x |
| HTTP | axios + TanStack Query | — |
| Forms | Formspree (env: VITE_FORMSPREE_ENDPOINT) | — |
| SEO | react-helmet-async | 2.x |

**Still to install:** `swiper`, `react-helmet-async`

---

## 3. Design System — "Industrial Heritage"

### 3.1 Color Palette

The palette balances deep warmth (East Queen = royalty + gold) with industrial authority.
Inspired by Shell, Maersk, Aramco — serious, premium, globally credible.

```
── BACKGROUNDS ──────────────────────────────────────────────
PRIMARY DARK         #0D1220    near-black navy (main page bg)
SURFACE DARK         #141928    dark navy, section alternating bg
CARD SURFACE         #1E2535    elevated glass card bg
BORDER SUBTLE        #2A3450    separator lines, card borders

── ACCENT SYSTEM ────────────────────────────────────────────
ACCENT GOLD          #E8B94F    primary brand gold (logo-level, editorial)
ACCENT AMBER         #F59E0B    interactive: CTAs, buttons, links
AMBER HOVER          #D97706    button press / hover darken
GOLDEN GLOW          #FCD34D    number highlights, stat accents

── SECONDARY PALETTE ────────────────────────────────────────
MARITIME TEAL        #0E9E96    shipping / fisheries industry color
TEAL LIGHT           #2DD4BF    teal highlights, category tags

── TEXT ─────────────────────────────────────────────────────
TEXT PRIMARY         #F0F4F8    headings
TEXT SECONDARY       #94A3B8    body copy, descriptions
TEXT MUTED           #64748B    captions, meta, placeholders

── UTILITY ──────────────────────────────────────────────────
SUCCESS GREEN        #22C55E    fisheries / agriculture / growth
ERROR RED            #EF4444    form errors
STEEL GRAY           #475569    muted labels
```

### 3.2 Typography

```
HEADING    Playfair Display — editorial serif: section titles, H1-H3
BODY       Inter           — clean sans-serif: nav, body copy, UI
MONO       JetBrains Mono  — technical: statistics, spec codes, HS codes
```

**Type Scale:**

| Token | Size | Use |
|---|---|---|
| `text-7xl` | 72px | Hero headline |
| `text-5xl` | 48px | Page H1 |
| `text-4xl` | 36px | Section H2 |
| `text-2xl` | 24px | Section H3, card title |
| `text-xl` | 20px | Large labels |
| `text-lg` | 18px | Body lead paragraph |
| `text-base` | 16px | Body copy |
| `text-sm` | 14px | Captions, nav items |
| `text-xs` | 12px | Badges, micro-labels |

### 3.3 Spacing & Layout

```
section-padding:   py-20 md:py-28 lg:py-32
section-container: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
card-padding:      p-6 md:p-8
card-radius:       rounded-2xl
```

### 3.4 Global CSS Utility Classes

```css
.section-padding   → py-20 md:py-28 lg:py-32
.section-container → max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
.text-gradient-gold → bg-gradient-to-r from-amber-400 to-yellow-300 bg-clip-text text-transparent
.gold-rule         → h-[3px] w-12 bg-amber-500 rounded-full
.glass-dark        → bg-white/[0.06] backdrop-blur-md border border-white/[0.10]
.glass-white       → bg-white/90 backdrop-blur-xl border border-white/60
.animation-pause   → animation-play-state: paused
```

### 3.5 Elevation Layers

```
z-0   page background    #0D1220
z-1   section alternate  #141928
z-2   cards (glass-dark) bg-[#1E2535]/80 + border #2A3450
z-3   card hover         border-amber-500/40 + shadow-amber
z-top navbar, modals    bg-zinc-950/95 backdrop-blur-xl
```

---

## 4. URL Architecture — Matching Old Sitemap Exactly

> **Critical rule:** Every URL in `sitemap.xml` MUST resolve in the new site.
> Google has indexed these — breaking them = ranking loss.

### 4.1 Old Sitemap → New React Route Map (27 URLs)

| Old URL (from sitemap.xml) | Status | Component |
|---|---|---|
| `/` | ✅ correct | `<Home>` |
| `/about-east-queen` | ⚠️ fix route | `<About>` (was `/about`) |
| `/con-ariko-international` | ❌ build | `<CompanyDetail slug="ariko-international">` |
| `/con-east-queen-shipping` | ❌ build | `<CompanyDetail slug="east-queen-shipping">` |
| `/con-bay-gas` | ❌ build | `<CompanyDetail slug="bay-gas">` |
| `/con-syedpur-fisheries` | ❌ build | `<CompanyDetail slug="syedpur-fisheries">` |
| `/con-bsc-ltd` | ❌ build | `<CompanyDetail slug="bsc-limited">` |
| `/con-marinona-foodstaff` | ❌ build | `<CompanyDetail slug="marinona-foodstaff">` |
| `/export` | ✅ correct | `<Export>` |
| `/export-mill-scale` | ❌ build | `<ProductDetail slug="mill-scale" type="export">` |
| `/export-zinc-oxide` | ❌ build | `<ProductDetail slug="zinc-oxide" type="export">` |
| `/export-pet-flakes` | ❌ build | `<ProductDetail slug="pet-flakes" type="export">` |
| `/export-fresh-vegetables-and-fruits` | ❌ build | `<ProductDetail slug="vegetables-fruits" type="export">` |
| `/export-leather-goods` | ❌ build | `<ProductDetail slug="leather-goods" type="export">` |
| `/export-jute-made-products` | ❌ build | `<ProductDetail slug="jute-products" type="export">` |
| `/import` | ✅ correct | `<Import>` |
| `/import-aggregate` | ❌ build | `<ProductDetail slug="aggregate" type="import">` |
| `/import-gabbro` | ❌ redirect | `<Navigate to="/import-aggregate" replace>` |
| `/import-lime-stone` | ❌ build | `<ProductDetail slug="limestone" type="import">` |
| `/import-coal` | ❌ build | `<ProductDetail slug="coal" type="import">` |
| `/import-steel-scraps` | ❌ build | `<ProductDetail slug="steel-scraps" type="import">` |
| `/import-automobile-spare-parts` | ❌ build | `<ProductDetail slug="auto-spare-parts" type="import">` |
| `/gallery` | ✅ correct | `<Gallery>` |
| `/contact-us` | ⚠️ fix route | `<Contact>` (was `/contact`) |
| `/ship-breaking` | ✅ built | `<ShipBreaking>` |
| `/privacy-policy` | ❌ build | `<PrivacyPolicy>` |
| `/terms-and-conditions` | ❌ build | `<TermsConditions>` |

### 4.2 Complete App.tsx Route Table

```tsx
import { Navigate } from 'react-router-dom'

// ── Core pages ──────────────────────────────────────────────
<Route path="/"                               element={<Home />} />
<Route path="/about-east-queen"               element={<About />} />
<Route path="/export"                         element={<Export />} />
<Route path="/import"                         element={<Import />} />
<Route path="/gallery"                        element={<Gallery />} />
<Route path="/contact-us"                     element={<Contact />} />
<Route path="/ship-breaking"                  element={<ShipBreaking />} />

// ── Company/concern detail (6 routes) ───────────────────────
<Route path="/con-ariko-international"        element={<CompanyDetail slug="ariko-international" />} />
<Route path="/con-east-queen-shipping"        element={<CompanyDetail slug="east-queen-shipping" />} />
<Route path="/con-bay-gas"                    element={<CompanyDetail slug="bay-gas" />} />
<Route path="/con-syedpur-fisheries"          element={<CompanyDetail slug="syedpur-fisheries" />} />
<Route path="/con-bsc-ltd"                    element={<CompanyDetail slug="bsc-limited" />} />
<Route path="/con-marinona-foodstaff"         element={<CompanyDetail slug="marinona-foodstaff" />} />

// ── Export product detail (6 routes) ────────────────────────
<Route path="/export-mill-scale"              element={<ProductDetail slug="mill-scale"         type="export" />} />
<Route path="/export-zinc-oxide"              element={<ProductDetail slug="zinc-oxide"          type="export" />} />
<Route path="/export-pet-flakes"              element={<ProductDetail slug="pet-flakes"          type="export" />} />
<Route path="/export-fresh-vegetables-and-fruits" element={<ProductDetail slug="vegetables-fruits" type="export" />} />
<Route path="/export-leather-goods"           element={<ProductDetail slug="leather-goods"       type="export" />} />
<Route path="/export-jute-made-products"      element={<ProductDetail slug="jute-products"       type="export" />} />

// ── Import product detail (5 routes + 1 redirect) ───────────
<Route path="/import-aggregate"               element={<ProductDetail slug="aggregate"           type="import" />} />
<Route path="/import-gabbro"                  element={<Navigate to="/import-aggregate" replace />} />
<Route path="/import-lime-stone"              element={<ProductDetail slug="limestone"           type="import" />} />
<Route path="/import-coal"                    element={<ProductDetail slug="coal"                type="import" />} />
<Route path="/import-steel-scraps"            element={<ProductDetail slug="steel-scraps"        type="import" />} />
<Route path="/import-automobile-spare-parts"  element={<ProductDetail slug="auto-spare-parts"    type="import" />} />

// ── Soft redirects for currently broken internal URLs ────────
<Route path="/about"                          element={<Navigate to="/about-east-queen"  replace />} />
<Route path="/contact"                        element={<Navigate to="/contact-us"         replace />} />
<Route path="/companies"                      element={<Navigate to="/about-east-queen"  replace />} />
<Route path="/associates"                     element={<Navigate to="/about-east-queen"  replace />} />

// ── Legal ────────────────────────────────────────────────────
<Route path="/privacy-policy"                 element={<PrivacyPolicy />} />
<Route path="/terms-and-conditions"           element={<TermsConditions />} />

// ── Catch-all ────────────────────────────────────────────────
<Route path="*"                               element={<NotFound />} />
```

### 4.3 `vercel.json` — Server-side Redirects & Rewrites

```json
{
  "rewrites": [
    { "source": "/((?!api|images|videos).*)", "destination": "/index.html" }
  ],
  "redirects": [
    { "source": "/about",         "destination": "/about-east-queen",  "permanent": true  },
    { "source": "/contact",       "destination": "/contact-us",         "permanent": true  },
    { "source": "/import-gabbro", "destination": "/import-aggregate",   "permanent": true  },
    { "source": "/companies",     "destination": "/about-east-queen",   "permanent": false }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options",          "value": "SAMEORIGIN"                  },
        { "key": "X-Content-Type-Options",   "value": "nosniff"                     },
        { "key": "Referrer-Policy",           "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/videos/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/images/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=2592000" }]
    }
  ]
}
```

---

## 5. Navigation — Exact Old Site Mega-Menu

### 5.1 Navigation Data (`src/lib/constants.ts` — replace NAV_ITEMS)

```typescript
export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },

  { label: 'About Us', href: '/about-east-queen', children: [
    { label: 'Our Values',          href: '/about-east-queen#our_values' },
    { label: "Chairman's Message",  href: '/about-east-queen#chairman_message' },
  ]},

  { label: 'Our Companies', children: [
    { label: 'Ariko International',            href: '/con-ariko-international' },
    { label: 'East Queen Shipping Ltd.',       href: '/con-east-queen-shipping' },
    { label: 'Bay Gas LTD.',                   href: '/con-bay-gas' },
    { label: 'Syedpur Fisheries & Farms',      href: '/con-syedpur-fisheries' },
    { label: 'BSC Limited',                    href: '/con-bsc-ltd' },
    { label: 'Marinona Foodstaff Trading LLC', href: '/con-marinona-foodstaff' },
  ]},

  { label: 'Business Associates', children: [
    { label: 'Adnan PSF Industries Ltd.',            href: 'https://adnanpsf.com/',                external: true },
    { label: 'Icon Fashion',                          href: 'https://iconshopbd.com/',              external: true },
    { label: 'Alliance Leather Goods & Footwear',    href: 'https://www.alliancefootwearbd.com/', external: true },
    { label: 'Eco Trade International',               href: 'https://ecotradebd.com/',             external: true },
    { label: 'Allied Maritime Services',              href: 'https://allied-bd.com/',              external: true },
  ]},

  { label: 'Export', href: '/export', children: [
    { label: 'Mill Scale',                    href: '/export-mill-scale' },
    { label: 'Zinc Oxide',                    href: '/export-zinc-oxide' },
    { label: 'PET Flakes',                    href: '/export-pet-flakes' },
    { label: 'Fresh Vegetables and Fruits',   href: '/export-fresh-vegetables-and-fruits' },
    { label: 'Leather Goods',                 href: '/export-leather-goods' },
    { label: 'Jute and Jute-Made Products',   href: '/export-jute-made-products' },
  ]},

  { label: 'Import', href: '/import', children: [
    { label: 'Aggregate / Gabbro / Limestone', href: '/import-aggregate' },
    { label: 'Coal',                            href: '/import-coal' },
    { label: 'Steel Scraps',                    href: '/import-steel-scraps' },
    { label: 'Automobile Spare Parts',          href: '/import-automobile-spare-parts' },
  ]},

  { label: 'Gallery',       href: '/gallery' },
  { label: 'Ship Breaking', href: '/ship-breaking' },
  { label: 'Contact',       href: '/contact-us' },
]
```

### 5.2 Navbar Behavior Spec

- **Desktop**: horizontal bar. Items with `children` show mega-dropdown on hover/focus.
- **Mobile**: hamburger → full-height overlay, accordion expand per item with children.
- **Scroll effect**: transparent at top → `bg-[#0D1220]/95 backdrop-blur-xl` after 80px scroll.
- **Active state**: current page link → `text-amber-400` + optional left/bottom indicator.
- **External links**: `target="_blank" rel="noopener noreferrer"`.
- **Dropdown animation**: Framer `menuVariants` — `y: -8 → 0`, `opacity: 0 → 1`, 250ms ease.

---

## 6. Page-by-Page Blueprint

### 6.1 Home (`/`)

**Top-to-bottom section order:**

#### § HeroSlider
- **Engine**: Swiper.js with `EffectFade` + `Autoplay` modules
- **Slides**: 4 full-screen video slides
  - Slide 1 (Trade): `videos/hero/hero-exports.mp4` — "Empowering Trade, Connecting the World" / subtext: "Building Global Links with Reliable Supply"
  - Slide 2 (Shipping): `videos/hero/hero-shipping.mp4` — "Maritime Excellence" / subtext: "East Queen Shipping — Chittagong to the World"
  - Slide 3 (Yard): `videos/hero/hero-yard.mp4` — "From Scrap to Strength" / subtext: "Pioneers in sustainable ship recycling since 1981"
  - Slide 4 (Operations): `videos/hero/hero-operations.mp4` — "Industrial Excellence Since 1982" / subtext: "A Legacy Built on Integrity and Innovation"
- **Video**: `<video autoPlay muted loop playsInline poster={posterImg}>`
- **Overlay**: `bg-gradient-to-r from-[#0D1220]/85 via-[#0D1220]/50 to-transparent`
- **Text animation**: Framer `wordVariants` — per-word stagger 0.08s, `y: 20px → 0`, `opacity: 0 → 1`
- **CTAs per slide**: "Request a Callback" → `/contact-us` (amber fill) + "Our Services" (outline)
- **Swiper config**: `effect: 'fade'`, `speed: 1500`, `autoplay: { delay: 6000 }`, `loop: true`
- **Pagination**: bottom dots, clickable, amber active color

#### § ServicesStrip
- 3 feature cards immediately below hero (offset slightly upward, z-above)
- Card 1: 🏭 **Global Export Solutions** — "We export high-quality industrial raw materials..." → `/export`
- Card 2: 🚢 **Trusted Import Partner** — "We import essential materials like HMS 1/2, coal, limestone..." → `/import`
- Card 3: ⚓ **Ship Breaking & Recycling** — "Scrap Bangla contribute to sustainable recycling..." → `/ship-breaking`
- Style: `glass-dark` cards with amber left border on hover, icon + title + excerpt + arrow
- Animation: `fadeUp` stagger with 100ms delay

#### § AboutSnippet
- Left (50%): text content
  - H2: "Welcome to East Queen Group"
  - Gold rule divider
  - Body: "Established in 1982, East Queen Group is a diversified conglomerate engaged in ship breaking, industrial raw materials, limestone, coal, auto spare parts, LPG gas cylinder filling and distribution, fisheries, and poultry farming..."
  - 4 bullet points (✓ style):
    1. Trusted by global buyers and suppliers for over 15 years.
    2. Stringent quality control and compliance with international standards.
    3. Strong financial backing and banking relations with leading local banks.
    4. Seamless logistics, documentation, and customer support.
  - CTA: "Learn More About Us" → `/about-east-queen`
- Right (50%): `images/hero/old-single-img-six.jpg` with subtle shadow frame
- Animation: `fadeLeft` (left) + `fadeRight` (right)

#### § StatsSection
- Dark strip `#141928`, 4 animated counters
- 100+ Happy Clients | 500+ Employees | 400+ Complete Deliveries | 42+ Years Established
- Font: JetBrains Mono for numbers, amber color
- `react-countup` with scroll trigger, `useInView`

#### § ChairmanMessage
- Full text from `section_chairman_message.php` (all 5 paragraphs verbatim)
- Left (45%): photo `images/team/chairman.jpeg` in amber-bordered elegant frame
- Right (55%): message text with clipReveal animation
- Signature block: "Warm regards, / **A K M ABU TAHER BSc.** / Chairman, EAST QUEEN GROUP"
- Optional: animated signature draw (`images/team/chairman-signature.png`) via SVG stroke

#### § Timeline
- Section title: "Our Journey — Growing Through Vision, Built on Trust"
- Dark background `#0D1220` with subtle grid pattern
- 4 milestones in horizontal row (grid on desktop, stack on mobile):
  - **1982** — "Laying the Foundation": "Our story began with a vision to connect Bangladesh to global trade. We started small, focusing on industrial raw materials and building strong supplier networks."
  - **2013** — "Expanding Horizons": "We expanded operations to serve clients across Asia and the Middle East, establishing ARIKO International as a trusted name in export-import services."
  - **2017** — "Diversifying Strengths": "With the formation of EAST QUEEN GROUP, we launched new concerns like Icon Shop BD and Adnan PSF Ltd., entering retail and recycling markets."
  - **2023** — "Digital Transformation": "To streamline trade and improve global reach, we launched East Queen Group — a digital gateway for industrial raw materials and sustainable solutions."
- Each milestone: amber year number + divider dot + H3 title + body text
- Animation: `fadeUp` stagger per milestone

#### § CompaniesSection
- Section title: "Our Concerns & Global Partners"
- Subtitle: "Trusted Alliances and Strategic Divisions Driving Global Trade"
- 6 company cards in 3×2 grid → each links to `/con-{slug}`
- **CompanyCard 3D Flip Animation:**
  - Front face: company logo / name / industry icon + tagline
  - Back face: dark `#1E2535`, list of 4 services, "View More →" button
  - Trigger: `rotateY(180deg)` on hover, CSS `perspective: 1000px`, `transform-style: preserve-3d`
  - Duration: 500ms ease-in-out
- Below cards: **CSS Marquee Logo Strip** (9 concern logos from `images/slides/con-1.png` through `con-9.png`)
  - Infinite leftward scroll, 30s loop, pause on hover

#### § AssociatesBrief
- Section title: "Business Associates"
- 5 partner cards: name + initials logo + description + external link
- Grayscale(1) → grayscale(0) color reveal on hover
- Animation: `stagger` `fadeUp`

#### § ContactCTA
- Full-width amber-to-gold gradient section
- H2: "Your Trusted Global Partner in Industrial Materials and Recyclables"
- 2 CTA buttons: "Get In Touch" → `/contact-us` | "WhatsApp Us" → `wa.me/+8801713042261`

---

### 6.2 About (`/about-east-queen`)

#### § PageHero
- Background: `images/hero/page-title-bg.jpg`
- Title: "About East Queen Group"
- Breadcrumb: Home → About Us

#### § AboutContent
- Full text from `about-east-queen.php`:
  - "East Queen Group is one of Bangladesh's oldest and most respected industrial conglomerates, proudly rooted in Chattogram since 1968. With over five decades of experience..."
  - "Founded by visionary entrepreneur M. A. Taher, East Queen Group has grown through resilience, integrity, and strategic foresight. Today, we are known not only for being the 4th largest and oldest ship recycler in Bangladesh but also for our dynamic expansion into new industries and markets..."
  - "Our operations are driven by a commitment to quality, sustainable growth, and long-term partnerships. Across all our ventures, we maintain a culture of professionalism, innovation, and ethical business practices."
- Right image: `images/hero/old-single-img-six.jpg`

#### § MissionVisionValues (anchor: `#our_values`)
- 3-card row in `#141928` section:
  - **Our Vision**: "To lead Bangladesh's industrial transformation by delivering excellence, fostering innovation, and building global partnerships that create value for generations."
  - **Our Mission**: "To be recognized as a national and international benchmark in exporting, importing, manufacturing, and infrastructure development — through consistent performance, transparency, and customer satisfaction."
  - **Our Spirit**: "Enterprise is our spirit."
- Cards: glass-dark + amber top border + Lucide icon
- Animation: `stagger` `fadeUp`

#### § ChairmanMessage (anchor: `#chairman_message`)
- Same component as Home — full 5-paragraph message
- Photo + signature block
- `id="chairman_message"` for old-site anchor links to work

#### § Timeline
- Same 4-milestone data as Home

#### § WhyChooseUs
- 4 alternating left/right rows:
  1. 15+ years of trusted global partnerships
  2. Stringent international quality standards
  3. Strong financial & banking relations
  4. Seamless logistics & documentation

---

### 6.3 Company Detail (`/con-{slug}`)

**One template component — `CompanyDetail.tsx` — 6 data entries**

#### § PageHero
- Background: `company.coverImage` with dark overlay gradient
- Title: company full name
- Subtitle: company tagline
- Breadcrumb: Home → Our Companies → [Company Name]

#### § CompanyOverview (two-column, matches old `/con-*` layout)
- **Left (35%):**
  - Company logo (`company.logo`)
  - PDF download button (if `company.pdfUrl`) — "📄 Download Portfolio"
  - "Visit Our Website" button (if `company.website`) — external link
- **Right (65%):**
  - Full `company.longDescription` (multi-paragraph)
  - Two-column list: Export items | Import items (for Ariko)
  - Or: Services list (for other companies)

#### § KeyFacts strip
- 4 quick facts: Founded: YEAR | Team: N members | Industry: label | Based: City
- Font: JetBrains Mono, amber accent

#### § RelatedSection
- Context-sensitive: if shipping/ship-breaking → show ship-breaking video; if fisheries → show farm gallery
- CTA to related product pages

#### § ConcernsMarquee
- Same logo marquee as Home

---

**Company Data — Full Content:**

**Ariko International** (`slug: 'ariko-international'`, route: `/con-ariko-international`)
- Founded: 2009 | Team: 25 | Based: Chittagong
- Logo: `images/brand/logo.png` (use until specific logo available)
- Cover: `images/products/exports/mill-scale/mill-1.jpeg`
- PDF: `images/brand/ariko-profile.pdf`
- Website: `https://scrapbangla.com/`
- Long description: "ARIKO International, located in Chittagong, the commercial capital of Bangladesh. Registered in 2009, ARIKO International has established itself as a key player in both export and import markets. Our company is a leading exporter of mill scale, zinc ash, PET flakes, ready-made garments (RMG), fresh fruits, jute and jute-made goods and leather goods. Additionally, we import a range of essential materials and products, including aggregate stones such as Gabbro and Limestone, coal, and automobile spare parts. Our dedication to quality and customer satisfaction has allowed us to grow into a 25-member company with strong business relationships across South-East Asia, the Middle East, Europe, and the American markets."
- Export list: Mill Scale | Zinc Ash | PET Flakes | Ready-Made Garments (RMG) | Fresh Fruits | Jute and Jute-made Goods | Leather Goods
- Import list: Aggregate Stones (Gabbro, Limestone) | Coal | Automobile Spare Parts | Geo Synthetic Material | Clinker | Decorative Stones (Red Shale) | Heavy Equipments

**East Queen Shipping Ltd.** (`slug: 'east-queen-shipping'`, route: `/con-east-queen-shipping`)
- Founded: 1982 | Based: Sitakunda, Chattogram
- Cover: `images/shipping/bbg-master-night.jpeg`
- Long description (from old PHP, verbatim): "In Bangladesh, the backbone of the country's rapidly growing construction industry lies in the steady and reliable supply of construction-grade rods, primarily derived from ship scrap materials. Playing a pivotal role in this vital supply chain is East Queen Shipping Limited, a pioneer and leading name in the ship breaking industry. With decades of experience, the company has been instrumental in supporting national infrastructure and development projects through the consistent supply of high-quality steel. Established in 1982 with financial backing from Arab Bangladesh Bank Limited, East Queen Shipping Limited quickly rose to prominence in both the local and international steel markets. Headquartered in Sitakunda, Chattogram, the company operates its own ship breaking yard spanning approximately five acres. Under the visionary leadership of its founder and current Chairman, Mr. A K M Abu Taher, BSc, East Queen Shipping Limited has built a solid reputation for reliability, efficiency, and environmental responsibility in ship dismantling operations. Over the years, the company has successfully dismantled numerous large vessels, including MV Southland Star, MV Trevizond, TT World Renowned, Castrillo-de-Montiaragon, MV Caravos Sprit, and MV Negav Pioneer — collectively contributing thousands of metric tons of high-grade scrap steel to the construction sector."
- Services: Ship Breaking | Marine Recycling | Scrap Metal Processing | Maritime Consulting
- Additional: Launched Syedpur Steels Limited (1994, BSBA affiliated)

**Bay Gas LTD.** (`slug: 'bay-gas'`, route: `/con-bay-gas`)
- Founded: —
- Cover: `images/hero/old-services-03.jpg`
- Description: "A licensed LPG gas cylinder filling and distribution company serving residential, commercial, and industrial customers with reliable and safe gas supply chains across Bangladesh."
- Services: LPG Distribution | Cylinder Filling | Industrial Energy Supply | Safety Compliance

**Syedpur Fisheries & Farms** (`slug: 'syedpur-fisheries'`, route: `/con-syedpur-fisheries`)
- Founded: 2008
- Cover: `images/companies/syedpur/farm-1.jpeg`
- Gallery: 6 images from `images/companies/syedpur/`
- Description: "Integrated agri-business covering freshwater fisheries, poultry farming, and fresh produce supply to domestic and international export markets."
- Services: Freshwater Fisheries | Poultry Farming | Fresh Produce Export | Farm Management

**BSC Limited** (`slug: 'bsc-limited'`, route: `/con-bsc-ltd`)
- Founded: 2012
- Cover: `images/products/imports/aggregate/aggregate-1.png`
- Description: "Supplier of high-grade construction materials and industrial raw goods — aggregate, limestone, coal, and steel — serving infrastructure projects across Bangladesh."
- Services: Aggregate Supply | Limestone Trading | Coal Supply | Construction Logistics

**Marinona Foodstaff Trading LLC** (`slug: 'marinona-foodstaff'`, route: `/con-marinona-foodstaff`)
- Founded: 2018
- Cover: `images/products/exports/vegetables/cabbage-field.jpeg`
- Description: "International food trading company specializing in the procurement and distribution of quality food commodities to global markets with strict halal compliance."
- Services: Food Commodity Trading | International Procurement | Quality Assurance | Halal Certification

---

### 6.4 Export List (`/export`)

#### § PageHero
- Title: "Export Products"
- Subtitle: "Your Trusted Global Partner in Industrial Materials and Recyclables"

#### § ExportGrid
- 6 product cards, responsive 3-2-1 grid
- Each card: product image (top, fixed height) + name + short description + "Read More" → `/export-{slug}`
- Hover: image zoom (scale 1.05) + amber border glow
- Animation: `stagger` `fadeUp`

#### § ProcessStrip
- 5-step horizontal process with animated SVG line:
  1. Client Inquiry → 2. Sample & Inspection → 3. Contract & LC → 4. Production & QC → 5. Shipment & Delivery
- SVG dashed line draws left-to-right on scroll entry (Framer Motion `pathLength`)

#### § ConcernsMarquee

---

### 6.5 Export Product Detail (`/export-{slug}`)

**Template: `ProductDetail.tsx` with `type="export"`**

#### § PageHero
- Background: `product.image`
- Title: product name
- Breadcrumb: Home → Export → [Product Name]

#### § ProductLayout (sidebar left / content right — exact old site layout)
- **Left sidebar (30%):**
  - Nav list of all 6 export products
  - Active item: amber text + 3px left amber border
  - Hover: transition color 200ms
- **Right content area (70%):**
  - Lead image: `product.image` (full width, 350px height)
  - H4: `product.detailTitle` (e.g., "Premium-Grade Mill Scale Exports")
  - 5-paragraph `product.longDescription`
  - Spec table: 2-column key/value grid, striped rows
  - Tags: amber pill badges
  - CTA strip: "Enquire Now" → `/contact-us` + WhatsApp link

---

**Export Product Detail Data:**

| URL | Data slug | Detail Title | Key Image |
|---|---|---|---|
| `/export-mill-scale` | `mill-scale` | "Premium-Grade Mill Scale Exports" | `mill-scale/mill-1.jpeg` |
| `/export-zinc-oxide` | `zinc-oxide` | "Industrial Zinc Ash / Zinc Oxide Solutions" | `zinc-ash/drums-closeup.jpeg` |
| `/export-pet-flakes` | `pet-flakes` | "Recycled PET Flakes for Sustainable Futures" | `pet-flakes/bales-1.jpeg` |
| `/export-fresh-vegetables-and-fruits` | `vegetables-fruits` | "Farm to Global Market: Fresh Vegetables & Fruits" | `vegetables/cabbage-field.jpeg` |
| `/export-leather-goods` | `leather-goods` | "Premium Leather Goods — LWG Certified" | `leather/leather-2.jpeg` |
| `/export-jute-made-products` | `jute-products` | "Bangladesh's Golden Fibre: Jute & Jute-Made Products" | `jute/jute-1.jpeg` |

**Note on Zinc Oxide:** Old URL is `/export-zinc-oxide`, data id is `zinc-ash`. Page title should say "Zinc Ash / Zinc Oxide" — both terms used. This is not a naming error; zinc ash and zinc oxide are both exported under this product line.

---

### 6.6 Import List (`/import`)

Same structure as Export List. 8 products shown in grid. Sidebar nav (in detail pages) shows 4 items matching old site.

---

### 6.7 Import Product Detail (`/import-{slug}`)

**Template: `ProductDetail.tsx` with `type="import"`**

Sidebar nav shows 4 items (matching old site's menu):
1. Aggregate / Gabbro / Limestone → `/import-aggregate`
2. Coal → `/import-coal`
3. Steel Scraps → `/import-steel-scraps`
4. Automobile Spare Parts → `/import-automobile-spare-parts`

| URL | Detail Title | Key Image |
|---|---|---|
| `/import-aggregate` | "Import Premium-Grade Aggregate for Industrial Excellence" | `aggregate/aggregate-1.png` |
| `/import-coal` | "Reliable Coal Import for Bangladesh's Energy Needs" | `coal/hold-aerial-1.jpeg` |
| `/import-steel-scraps` | "HMS Steel Scrap Import — Fueling Bangladesh's Steel Industry" | `steel-scrap/scrap-1.jpeg` |
| `/import-automobile-spare-parts` | "Genuine Automobile Spare Parts Import" | `hero/old-services-04.jpg` |
| `/import-lime-stone` | "Limestone & Gabbro — Construction Grade Import" | `limestone/lime-1.jpeg` |

---

### 6.8 Gallery (`/gallery`)

#### § PageHero

#### § FilterBar
- Buttons: All | Operations | Products | Facilities | Team
- Active: amber background, smooth Framer layout animation

#### § MasonryGrid
- 24 real images from `gallery.ts`
- Click: `yet-another-react-lightbox` with Zoom + Captions plugins
- Framer `AnimatePresence` + `layout` prop on grid container

---

### 6.9 Contact (`/contact-us`)

#### § PageHero
- Title: "Contact Us"

#### § OfficesRow (3 cards — exact from old `contact-us.php`)
- **Chittagong Office**: House 146, Road 1/1, CDA R/A, Agrabad, Chattogram-4100, Bangladesh | Phone: +880 31 2521504 | Fax: +880 31 2521564
- **Dhaka Office**: House #19, Road #55, Gulshan-2, Dhaka-1212, Bangladesh | Tel: +88-02-9840654, +88-02-9840817, +88-02-8824204, +88-02-8829335 | Fax: +88-02-8821042, +88-02-9861809
- **Dubai Office**: Sunshine Building-2, M-Floor M05 M06, Omar Bin Al Khattab Road Fish Roundabout, Naif, Deira, Dubai-UAE | Tel: +971528669813
- Animation: `stagger` `fadeUp`

#### § ContactLayout (two-column)
- **Left (60%)**: Contact form (Name, Email, Phone, Subject, Message, Submit)
  - Backend: Formspree `VITE_FORMSPREE_ENDPOINT`
  - Client validation: required fields
  - Success feedback: `react-hot-toast` ✓
- **Right (40%)**: Contact info sidebar
  - Email: shahrear@eastqueengroup.com | contact@eastqueengroup.com
  - Phone: +880 1713 042261 | +880 1723 870250
  - Hours: Sunday–Thursday, 9:00 AM – 5:00 PM (BST)
  - WhatsApp direct link

#### § MapSection
- Google Maps iframe for Chittagong office (Agrabad)
- Fallback: `images/contact/map-static.png`

---

### 6.10 Ship Breaking (`/ship-breaking`) — Update Existing

Current page has good structure. **Update content to match old `ship-breaking.php`:**

Add missing facts:
- Legacy begins **1981** (not 1995 as current page says)
- East Queen Shipping Limited: registered as limited company in **1984**, member of BSBA
- Syedpur Steels Limited launched **1994** (also BSBA-affiliated)
- Yard location: **Bhatiari, Sitakunda, Chattogram** (specific, not generic "Chittagong")
- Vessel names dismantled: MV Southland Star, MV Trevizond, TT World Renowned, Castrillo-de-Montiaragon, MV Caravos Sprit, MV Negav Pioneer
- Update stat "30+ Years" → correct to "40+ Years" (since 1981)

---

### 6.11 Privacy Policy (`/privacy-policy`)

- PageHero (title: "Privacy Policy")
- Full legal text from `privacy-policy.php` verbatim
- Effective Date: June 2025
- Sections: Interpretation, Definitions, Data Collection, Data Usage, Rights, Contact

### 6.12 Terms & Conditions (`/terms-and-conditions`)

- PageHero (title: "Terms and Conditions")
- Full legal text from `terms-and-conditions.php`

---

## 7. Animation Master Specification

### 7.1 Framer Motion Variants (`src/lib/motion.ts`)

**Existing (keep all):**
```typescript
fadeUp, fadeDown, fadeLeft, fadeRight, scaleIn
stagger, staggerFast, staggerSlow
slideUp, slideIn, pageTransition
overlayVariants, menuVariants
goldLineVariants, wordVariants
```

**Add:**
```typescript
// Text clip reveal (chairman message — left-to-right content wipe)
clipReveal: {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  show:   { clipPath: 'inset(0 0% 0 0)', transition: { duration: 1.0, ease: 'easeOut' } }
}

// Rotate + pop (icon accents)
rotatePop: {
  hidden: { scale: 0, rotate: -30 },
  show:   { scale: 1, rotate: 0, transition: { type: 'spring', stiffness: 200, damping: 12 } }
}

// Blur in (hero text fallback)
blurIn: {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  show:   { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7 } }
}

// Pop in (modal / toast style)
popIn: {
  hidden: { opacity: 0, scale: 0.85 },
  show:   { opacity: 1, scale: 1,   transition: { type: 'spring', stiffness: 300, damping: 20 } }
}

// Per-word hero text stagger
heroWord: {
  hidden: { y: 30, opacity: 0 },
  show:   { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}
```

### 7.2 Animation Catalog

| Element | Type | Trigger | Duration |
|---|---|---|---|
| Page enter/exit | opacity 0↔1 | route change (AnimatePresence) | 400ms |
| Section H2 headings | `fadeUp` | scroll (once) | 600ms |
| Gold rule divider | `goldLineVariants` width 0→12 | scroll | 500ms |
| Card grids | `stagger` + `fadeUp` | scroll | 100ms each |
| Company cards (desktop) | 3D `rotateY(180deg)` flip | hover | 500ms ease |
| Associate logos | `filter: grayscale(1)→(0)` | hover | 300ms |
| Hero slide text | `heroWord` stagger per word | slide enter | 80ms per word |
| Hero crossfade | Swiper `effect: 'fade'` | autoplay 6s | 1500ms |
| Stats counters | `react-countup` | `useInView` | 2000ms |
| Stats digits | `scale(1→1.1→1)` pulse | countup end | 150ms |
| Chairman text | `clipReveal` | scroll (once) | 1000ms |
| Chairman photo | `fadeRight` + subtle parallax | scroll | 700ms |
| Timeline dots | amber `scale` pulse ring | scroll | 800ms stagger |
| Process SVG line | Framer `pathLength: 0→1` | scroll | 1500ms |
| Gallery item enter | `scaleIn` | layout / filter | 300ms |
| Gallery lightbox | `popIn` | click | 250ms |
| Navbar bg | opacity 0→0.95 | scroll 80px | 200ms |
| Mega-menu | `menuVariants` y:-8→0 + opacity | hover | 250ms |
| Back-to-top | `fadeUp` appear | scroll 500px | 300ms |
| WhatsApp button | spring scale + ping ring | page load +2s | spring |
| Scroll progress bar | linear `width` | scroll | — |
| Page loader | fade out | lazy chunk loaded | 500ms |

### 7.3 Hero Slider — Swiper Config

```typescript
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'

const swiperConfig = {
  modules: [Autoplay, EffectFade, Navigation, Pagination],
  effect: 'fade' as const,
  fadeEffect: { crossFade: true },
  autoplay: { delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true },
  speed: 1500,
  loop: true,
  pagination: { clickable: true },
  navigation: false,    // rely on pagination dots only
  preloadImages: false,
  lazy: true,
}
```

### 7.4 Company Card 3D Flip

```css
.card-flip-container {
  perspective: 1000px;
  height: 320px;
}
.card-flip-inner {
  transform-style: preserve-3d;
  transition: transform 500ms ease-in-out;
}
.card-flip-container:hover .card-flip-inner {
  transform: rotateY(180deg);
}
.card-front, .card-back {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
}
.card-back {
  transform: rotateY(180deg);
  background: #1E2535;
  border: 1px solid rgba(245, 158, 11, 0.3);
}
```

### 7.5 CSS Marquee (Logo Strip)

```css
.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee 30s linear infinite;
}
.marquee-track:hover { animation-play-state: paused; }

@keyframes marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
```

---

## 8. Component Library

### 8.1 Layout (`src/components/layout/`)

| Component | Status | Priority |
|---|---|---|
| `Navbar.tsx` | ⚠️ rebuild | 🔴 Phase 1 |
| `Footer.tsx` | ⚠️ update links | 🟡 Phase 9 |
| `ScrollProgressBar.tsx` | ✅ | — |
| `PageHero.tsx` | ✅ | — |

### 8.2 UI (`src/components/ui/`)

| Component | Status | Priority |
|---|---|---|
| `BackToTop.tsx` | ✅ | — |
| `WhatsAppButton.tsx` | ✅ | — |
| `PageLoader.tsx` | ✅ | — |
| `StatCard.tsx` | ✅ | — |
| `SectionHeader.tsx` | ✅ | — |
| `ProductSidebar.tsx` | ❌ build | 🔴 Phase 5 |
| `SpecTable.tsx` | ❌ build | 🔴 Phase 5 |
| `BreadcrumbNav.tsx` | ❌ build | 🟡 Phase 4 |
| `KeyFactsStrip.tsx` | ❌ build | 🟡 Phase 6 |

### 8.3 Cards (`src/components/cards/`)

| Component | Status | Priority |
|---|---|---|
| `CompanyCard.tsx` | ⚠️ upgrade (3D flip) | 🔴 Phase 7 |
| `AssociateCard.tsx` | ✅ | ⚠️ add grayscale hover |
| `ProductCard.tsx` | ❌ build | 🔴 Phase 5 |

### 8.4 Sections (`src/components/sections/`)

| Component | Status | Priority |
|---|---|---|
| `HeroSlider.tsx` | ❌ replace HeroSection | 🔴 Phase 3 |
| `ServicesStrip.tsx` | ❌ build | 🟡 Phase 7 |
| `AboutSnippet.tsx` | ✅ | — |
| `StatsSection.tsx` | ✅ | — |
| `ChairmanMessage.tsx` | ❌ build | 🔴 Phase 7 |
| `TimelineSection.tsx` | ❌ build | 🔴 Phase 7 |
| `CompaniesSection.tsx` | ❌ build | 🔴 Phase 7 |
| `MarqueeStrip.tsx` | ✅ | — |
| `AssociatesBrief.tsx` | ❌ build | 🟡 Phase 7 |
| `ContactCTA.tsx` | ✅ | — |
| `ProcessStrip.tsx` | ❌ build | 🟡 Phase 4 |
| `MapSection.tsx` | ❌ build | 🟡 Phase 9 |

### 8.5 Pages (`src/pages/`)

| Page | Status | Route | Priority |
|---|---|---|---|
| `Home.tsx` | ✅ (needs sections) | `/` | Phase 7 |
| `About.tsx` | ⚠️ wrong URL | `/about-east-queen` | 🔴 Phase 1 |
| `CompanyDetail.tsx` | ❌ build | `/con-*` | Phase 6 |
| `Export.tsx` | ✅ | `/export` | — |
| `ProductDetail.tsx` | ❌ build | `/export-*` `/import-*` | 🔴 Phase 5 |
| `Import.tsx` | ✅ | `/import` | — |
| `Gallery.tsx` | ✅ | `/gallery` | — |
| `Contact.tsx` | ⚠️ wrong URL | `/contact-us` | 🔴 Phase 1 |
| `ShipBreaking.tsx` | ✅ (needs update) | `/ship-breaking` | Phase 10 |
| `PrivacyPolicy.tsx` | ❌ build | `/privacy-policy` | Phase 9 |
| `TermsConditions.tsx` | ❌ build | `/terms-and-conditions` | Phase 9 |
| `NotFound.tsx` | ✅ | `/*` | — |

---

## 9. Data Layer

### 9.1 Type Updates (`src/types/index.ts`)

```typescript
interface Company {
  id: string
  urlSlug: string        // matches route: 'ariko-international', 'bay-gas', etc.
  name: string
  tagline: string
  description: string    // short (existing)
  longDescription?: string   // full multi-paragraph from old PHP
  industry: 'shipping' | 'energy' | 'fisheries' | 'food' | 'construction' | 'trading'
  services: string[]
  logo?: string
  coverImage?: string
  founded?: number
  teamSize?: number
  website?: string
  pdfUrl?: string        // for company portfolio download
  exportItems?: string[] // Ariko only
  importItems?: string[] // Ariko only
  color: string
}

interface Product {
  id: string
  urlSlug: string        // MUST match old site URL segment exactly
  name: string
  category: string
  description: string    // short (for cards)
  longDescription?: string   // 5 paragraphs (for detail page)
  detailTitle?: string   // H4 on detail page (e.g., "Premium-Grade Mill Scale Exports")
  icon: string
  image?: string         // hero/card image
  galleryImages?: string[]   // 3-4 images for detail page gallery strip
  useCases?: string[]    // for import products (bullet list)
  specs?: Record<string, string>
  tags?: string[]
  type: 'export' | 'import'
}

interface NavItem {
  label: string
  href?: string           // omit for dropdown-only parent items
  external?: boolean      // true = target="_blank"
  children?: NavItem[]
}
```

### 9.2 URL Slug Mapping

**Export products** (urlSlug must match old URL exactly):

| id | urlSlug | Route |
|---|---|---|
| `mill-scale` | `mill-scale` | `/export-mill-scale` |
| `zinc-ash` | `zinc-oxide` | `/export-zinc-oxide` |
| `pet-flakes` | `pet-flakes` | `/export-pet-flakes` |
| `vegetables-fruits` | `fresh-vegetables-and-fruits` | `/export-fresh-vegetables-and-fruits` |
| `leather-goods` | `leather-goods` | `/export-leather-goods` |
| `jute-products` | `jute-made-products` | `/export-jute-made-products` |

**Import products:**

| id | urlSlug | Route |
|---|---|---|
| `aggregate-limestone-gabbro` | `aggregate` | `/import-aggregate` |
| `coal` | `coal` | `/import-coal` |
| `steel-scraps` | `steel-scraps` | `/import-steel-scraps` |
| `auto-spare-parts` | `automobile-spare-parts` | `/import-automobile-spare-parts` |
| `clinker` | `lime-stone` | `/import-lime-stone` |

### 9.3 Assets Still Needed

```bash
# Copy company logos from old site
cp /home/amir/Projects/Frontend/old-eastqueen/images/slides/con-{1..9}.png \
   /home/amir/Projects/Frontend/eastqueen-group/public/images/brand/concerns/

# Copy Ariko PDF
cp /home/amir/Projects/Frontend/old-eastqueen/images/doc/ariko-international-profile.pdf \
   /home/amir/Projects/Frontend/eastqueen-group/public/images/brand/

# Copy old hero/service images
cp /home/amir/Projects/Frontend/old-eastqueen/images/slides/service-{1,2,3,4,5,6,7,12,14,15,16}.png \
   /home/amir/Projects/Frontend/eastqueen-group/public/images/hero/
```

---

## 10. Asset Map (Complete)

### 10.1 Images Already Organized ✅

```
public/images/
├── brand/         logo.png, logo-white.png, favicon.png, qr-code.png
├── team/          chairman.jpeg, chairman-signature.png, chairman-signature-alt.png
├── contact/       map-static.png, map-footer.png
├── hero/          page-title-bg.jpg, old-single-img-*.jpg, old-services-0*.jpg
├── companies/
│   └── syedpur/   20 images (farm, coastal, frozen fish)
├── shipping/      18 images (vessels, port)
├── ship-breaking/ 15 images (yard, scrap)
├── associates/
│   ├── adnan/     adnan-slide.png
│   └── icon-fashion-*.jpeg (15 images)
└── products/
    ├── exports/
    │   ├── mill-scale/    7 images
    │   ├── zinc-ash/      15 images
    │   ├── pet-flakes/    26 images
    │   ├── vegetables/    20 images
    │   ├── fruits/        20 images
    │   ├── leather/       20 images
    │   ├── jute/          15 images
    │   └── frozen-fish/   11 images
    └── imports/
        ├── aggregate/     49 images
        ├── coal/          19 images
        ├── limestone/     6 images
        └── steel-scrap/   5 images

Total: 378 images
```

### 10.2 Videos (Organized ✅)

```
public/videos/
├── hero/          4 files (hero-shipping, hero-yard, hero-operations, hero-exports)
├── shipping/      8 files (vessel-1 through vessel-8)
├── ship-breaking/ 9 files (yard-1 through yard-9)
├── operations/    5 files (ops-1-4, coal-ops)
├── fisheries/     2 files
└── exports/       5 files

Total: 33 videos
```

---

## 11. Footer Architecture

**4-column layout on desktop, 2×2 on tablet, stacked on mobile:**

**Column 1 — Quick Links**
Home | About Us | Ship Breaking | Gallery | Contact Us

**Column 2 — Our Companies**
Ariko International → `/con-ariko-international`
East Queen Shipping → `/con-east-queen-shipping`
Bay Gas LTD. → `/con-bay-gas`
Syedpur Fisheries → `/con-syedpur-fisheries`
BSC Limited → `/con-bsc-ltd`
Marinona Foodstaff → `/con-marinona-foodstaff`

**Column 3 — Export Products**
Mill Scale | Zinc Oxide | PET Flakes | Fresh Vegetables & Fruits | Leather Goods | Jute Products

**Column 4 — Contact**
📍 House 146, Road 1/1, CDA R/A, Agrabad, Chattogram-4100
📞 +880 1713 042261
✉️ contact@eastqueengroup.com
⏰ Sun–Thu, 9 AM–5 PM BST

**Bottom bar:**
© 2026 East Queen Group. All Rights Reserved. | [Privacy Policy](/privacy-policy) | [Terms & Conditions](/terms-and-conditions)

---

## 12. SEO Configuration

### 12.1 Per-Page Meta Tags (react-helmet-async)

```tsx
// Install: npm install react-helmet-async
// Wrap root: <HelmetProvider><App /></HelmetProvider>

// Example for a product detail page:
<Helmet>
  <title>Mill Scale Export from Bangladesh | East Queen Group</title>
  <meta name="description" content="Premium-grade mill scale exported from Bangladesh. Fe content ≥68%, bulk & jumbo bags, min 500 MT. East Queen Group — trusted global supplier since 1982." />
  <meta property="og:title"       content="Mill Scale Export | East Queen Group" />
  <meta property="og:description" content="Premium mill scale for steelmaking and sintering. SGS inspected, competitive pricing." />
  <meta property="og:url"         content="https://eastqueengroup.com/export-mill-scale" />
  <meta property="og:image"       content="https://eastqueengroup.com/images/products/exports/mill-scale/mill-1.jpeg" />
  <link rel="canonical"           href="https://eastqueengroup.com/export-mill-scale" />
</Helmet>
```

### 12.2 Updated `public/sitemap.xml`

Must include all 27 old URLs + new detail pages. Priority table:
- `/` → 1.00
- `/about-east-queen`, `/ship-breaking`, `/export`, `/import` → 0.90
- `/export-*`, `/import-*`, `/con-*` → 0.80
- `/gallery`, `/contact-us` → 0.80
- `/privacy-policy`, `/terms-and-conditions` → 0.40

### 12.3 `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://eastqueengroup.com/sitemap.xml
```

---

## 13. Performance Budget

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |
| Lighthouse Performance | ≥ 90 |
| Initial JS gzip | < 400KB |
| Hero video (each) | < 5MB |
| Hero image fallback | < 200KB WebP |

**Performance techniques:**
- `loading="lazy"` on all non-hero images
- Video `preload="none"` + `poster` image (no bandwidth waste until user reaches hero)
- React `lazy()` + `Suspense` on all routes ✅
- Lenis smooth scroll (no IntersectionObserver spam) ✅
- CSS marquee instead of JS marquee (zero re-renders)
- Framer Motion `once: true` on all `whileInView` (no re-animation on scroll back)
- Google Fonts preconnect in `index.html` ✅
- `will-change: transform` only on active animating elements
- WebP conversion for key product images (ffmpeg or Squoosh)
- Hero videos: `ffmpeg -i input.mp4 -vcodec h264 -crf 28 -preset slow output.mp4`

---

## 14. Implementation Phases

### Phase 1 — URL & Route Fix 🔴 CRITICAL (do first, zero visual impact)

- [ ] Change `About.tsx` route: `/about` → `/about-east-queen` in `App.tsx`
- [ ] Change `Contact.tsx` route: `/contact` → `/contact-us` in `App.tsx`
- [ ] Add `<Navigate>` redirects: `/about→/about-east-queen`, `/contact→/contact-us`, `/companies→/about-east-queen`, `/associates→/about-east-queen`
- [ ] Add `<Navigate replace>` for `/import-gabbro→/import-aggregate`
- [ ] Update ALL internal links across ALL components from `/about`→`/about-east-queen`, `/contact`→`/contact-us`
- [ ] Update `NAV_ITEMS` in `constants.ts` with full mega-menu structure (as per §5.1)
- [ ] Update `NavItem` type to support `external`, `children`, optional `href`
- [ ] Build `vercel.json` with rewrites + redirects (as per §4.3)
- [ ] Run `npm run build` — verify 0 TypeScript errors

### Phase 2 — Data Layer Completion

- [ ] Add `urlSlug` to Company, Product types
- [ ] Add `longDescription`, `detailTitle`, `galleryImages` to Product
- [ ] Add `longDescription`, `pdfUrl`, `website`, `exportItems`, `importItems` to Company
- [ ] Populate all `longDescription` for 6 export products (copy from old PHP pages)
- [ ] Populate all `longDescription` for 5 import products
- [ ] Populate all `longDescription` for 6 companies
- [ ] Update `urlSlug` values (especially `zinc-oxide`, `fresh-vegetables-and-fruits`, etc.)
- [ ] Update `timeline.ts` → 4 milestones matching old site exactly
- [ ] Copy `con-1.png` through `con-9.png` (concern logos) from old site
- [ ] Copy `ariko-international-profile.pdf` from old site
- [ ] Copy service images (`service-*.png`) from old-site slides folder

### Phase 3 — Hero Slider (Swiper)

- [ ] `npm install swiper`
- [ ] Build `HeroSlider.tsx`: 4 video slides, Framer word-stagger text per slide
- [ ] Replace `<HeroSection>` with `<HeroSlider>` in `Home.tsx`
- [ ] Mobile poster image fallback for slow connections
- [ ] Test on iOS (autoplay muted requirement)

### Phase 4 — Navbar Mega-Menu

- [ ] Rebuild `Navbar.tsx` from scratch
- [ ] Desktop: horizontal nav, hover mega-dropdown with `menuVariants`
- [ ] Mobile: hamburger + full-height overlay, accordion per section
- [ ] Scroll effect: transparent → glass on 80px scroll
- [ ] Highlight active route (amber color)
- [ ] All external associate links: `target="_blank"`
- [ ] Build `BreadcrumbNav.tsx` (used across all inner pages)

### Phase 5 — ProductDetail Template

- [ ] Build `ProductDetail.tsx` (sidebar + content layout)
- [ ] Build `ProductSidebar.tsx` (nav list component)
- [ ] Build `SpecTable.tsx` (key/value spec grid)
- [ ] Wire all 6 export routes → `<ProductDetail type="export">`
- [ ] Wire all 5 import routes → `<ProductDetail type="import">`
- [ ] Add Helmet SEO per product page
- [ ] Test all 11 product detail URLs resolve

### Phase 6 — CompanyDetail Template

- [ ] Build `CompanyDetail.tsx`
- [ ] Build `KeyFactsStrip.tsx`
- [ ] Wire all 6 `/con-*` routes
- [ ] Add logo, PDF download, website link logic
- [ ] Add Helmet SEO per company
- [ ] Test all 6 company detail URLs resolve

### Phase 7 — Home Page Sections

- [ ] Add `ServicesStrip.tsx` below HeroSlider
- [ ] Build `ChairmanMessage.tsx` (full text + photo + signature animation)
- [ ] Build `TimelineSection.tsx` (4 milestones)
- [ ] Build `CompaniesSection.tsx` (cards + marquee)
- [ ] Upgrade `CompanyCard.tsx` to 3D flip CSS
- [ ] Build `AssociatesBrief.tsx` (logos + external links)
- [ ] Update `Home.tsx` to include all sections in correct order
- [ ] Upgrade `MarqueeStrip.tsx` to use con-*.png logos (not placeholders)

### Phase 8 — About Page Enhancement

- [ ] Confirm route is `/about-east-queen` ← Phase 1 dependency
- [ ] Add `#our_values` anchor to MissionVisionValues section
- [ ] Add `#chairman_message` anchor to ChairmanMessage section
- [ ] Add full about text from old PHP
- [ ] Add Timeline section
- [ ] Add WhyChooseUs alternating rows

### Phase 9 — Contact, Legal, Footer

- [ ] Confirm route is `/contact-us` ← Phase 1 dependency
- [ ] Add 3-office cards row (Chittagong, Dhaka, Dubai)
- [ ] Wire Formspree (register endpoint, add to .env, test submission)
- [ ] Build `MapSection.tsx` (Google Maps iframe)
- [ ] Build `PrivacyPolicy.tsx` (text from old site)
- [ ] Build `TermsConditions.tsx` (text from old site)
- [ ] Update `Footer.tsx` with all company links, product links, legal links

### Phase 10 — Ship Breaking Update

- [ ] Update `ShipBreaking.tsx` with correct history (1981, 1984, 1994)
- [ ] Add vessel names list
- [ ] Correct "40+ Years" stat (not "30+")
- [ ] Add Bhatiari yard location
- [ ] Add Syedpur Steels Limited mention

### Phase 11 — SEO, Performance & Deploy

- [ ] `npm install react-helmet-async`
- [ ] Wrap root in `<HelmetProvider>` in `main.tsx`
- [ ] Add `<Helmet>` to all pages (title, description, OG, canonical)
- [ ] Create `public/sitemap.xml` with all 27+ URLs
- [ ] Create `public/robots.txt`
- [ ] Compress hero videos with ffmpeg (target < 5MB each)
- [ ] WebP conversion for product hero images
- [ ] Lighthouse audit — fix anything below 90
- [ ] Cross-browser test: Chrome, Firefox, Safari, Edge, Samsung Internet
- [ ] Mobile test: 375px iPhone SE, 390px iPhone 14, 768px iPad
- [ ] Deploy to Vercel (`vercel --prod`)
- [ ] Connect custom domain `eastqueengroup.com`
- [ ] Verify all 27 old URLs resolve correctly on live domain
- [ ] Submit updated sitemap to Google Search Console

---

## 15. Key Design Decisions

**1. URL Strategy:** Use React Routes matching old URLs exactly. Only 2 fixes needed in App.tsx — everything else is additive (new routes, not changes).

**2. DRY Templates:** Single `ProductDetail.tsx` handles all 11 product pages; single `CompanyDetail.tsx` handles all 6 company pages. Data-driven via `slug` prop.

**3. Zinc Oxide naming:** Old URL is `/export-zinc-oxide`. Data id is `zinc-ash`. Keep old URL for SEO. Page title: "Zinc Ash / Zinc Oxide Solutions" — acknowledges both trade names.

**4. Mega-menu:** Rebuild Navbar completely with TypeScript mega-menu. No external library — pure Framer Motion + CSS, keeping bundle small.

**5. Video hero:** Swiper + HTML5 `<video autoPlay muted loop playsInline>`. `poster` image for slow connections. iOS requires `muted` for autoplay.

**6. Associates:** External links only — no internal detail pages. Old site also used external links.

**7. Import sidebar:** Old site's left nav showed only 4 items (Aggregate, Coal, Steel Scraps, Auto Parts). Match exactly. Other imports (Limestone, Gabbro) accessible from list page only.

**8. Company logos (con-*.png):** Copy 9 logo images from old site for the marquee strip. These are the actual concern logos — cannot be recreated in React.

**9. Color system:** "Industrial Heritage" (#0D1220 navy-black + amber #F59E0B + teal #0E9E96) gives warmth and premium feel without being cold/corporate. Works for shipping, fisheries, energy, and food sectors alike.

**10. Phase 1 first:** URL routing fix takes 1 hour but protects existing SEO. Do it before any visual work.

---

*v3.0 — This is the authoritative plan. Previous versions superseded. All 27 old sitemap URLs mapped. Start with Phase 1.*
