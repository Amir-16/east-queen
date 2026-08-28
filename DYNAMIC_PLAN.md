# East Queen Group — Dynamic Website Plan
**Author:** Lead Engineer · **Date:** 2026-08-28
**Repo:** `~/Projects/LaravelProjects/eastqueen-backend`
**Design ref:** `~/Projects/Frontend/eastqueen-group` (read-only, never modify)

---

## 1. Goal

Make every content section of eastqueengroup.com editable through an admin
panel — no code deploy required. The public-facing React design (animations,
Tailwind classes, layout) must remain **pixel-identical** to the current SPA.

---

## 2. Architecture — Single Laravel + Inertia App

```
Browser
   │
   ▼
Laravel 11 (eastqueen-backend)
   ├── Public routes  /…           → Public\*Controller  →  Inertia::render('Public/Page', $props)
   ├── Admin routes   /admin/*     → Admin\*Controller   →  Inertia::render('Admin/Page', $props)
   └── resources/js/
         ├── pages/Admin/          ← existing admin UI (fully built, do not touch)
         ├── pages/Public/         ← porting from eastqueen-group/src/pages/
         ├── components/admin/     ← existing (do not touch)
         ├── components/public/    ← porting from eastqueen-group/src/components/
         └── lib/                  ← motion.js, cn.js (done)
```

**Why single Inertia app — not a separate SPA + REST API:**
- Data is Inertia page props — no CORS, no client cache, no TanStack Query.
- One build, one `.env`, one deployment target.
- Admin edits are immediately live on the next page request.
- The component code ports with minimal mechanical changes only.

---

## 3. What Is Already Done

### Backend infrastructure ✅

| Item | Detail |
|---|---|
| All 17 migrations run | users, cache, jobs, stats, contacts, settings, timeline_entries, gallery_media, hero_slides, associates, process_steps, companies, products, marquee_items + hero_slides extension |
| All models | Company, Product, Associate, ProcessStep, MarqueeItem, HeroSlide, Stat, TimelineEntry, GalleryMedia, Setting, Contact, User |
| All admin controllers | CompanyController, ProductController, AssociateController, ProcessStepController, MarqueeItemController, HeroSlideController, GalleryMediaController, StatController, TimelineEntryController, SettingController, ContactController, UserController, ImageUploadController, VideoUploadController |
| All admin Inertia pages | Companies, Products, Associates, ProcessSteps, MarqueeItems, HeroSlides, Gallery, Stats, Timeline, Settings, Contacts, Users, Dashboard, Login |
| All seeders run | Companies: 6, Products: 15, Stats: 6, Associates: 5, HeroSlides: 3, Marquee: 10, ProcessSteps: 5, Timeline: 8, Gallery: 6 |
| Settings seeded | Groups: `company`, `chairman`, `seo`, `contact`, `about`, `social` |
| Admin auth | `EnsureIsAdmin` middleware, login/logout, User model |
| Traits | ManagesOrdering, CleansUploadedImages |
| Contact mailables | ContactInquiryMail, ContactAutoReplyMail, ContactReplyMail |
| Frontend infra | `tailwind.config.js` (EQ colors merged), `app.css` (EQ styles), `app.jsx` (EQ title + Lenis + PublicLayout routing), `lib/motion.js`, `lib/cn.js` |
| Packages installed | lenis, clsx, tailwind-merge (+ all sff-agro packages: framer-motion, swiper, lucide-react, react-countup, yet-another-react-lightbox, @dnd-kit/*, sonner, react-hook-form) |

### What is NOT done yet 🔲

- `resources/js/lib/constants.js` — NAV_ITEMS, CONTACT static fallback data
- `resources/js/components/public/` — all layout + section + UI components
- `resources/js/pages/Public/` — all public Inertia pages
- `app/Http/Controllers/Public/` — public page controllers
- `routes/web.php` — public route definitions
- `app/Http/Middleware/HandleInertiaRequests.php` — shared settings props
- `public/images/` — copy from `eastqueen-group/public/images/`

---

## 4. Settings Available (Seeded)

Passed as **shared Inertia props** via `HandleInertiaRequests::share()` so
every public page has access without a per-controller query.

| Group | Keys | Used by |
|---|---|---|
| `company` | name, short_name, tagline, est_year, address, email, phone, whatsapp, map_embed_url | Navbar top-bar, Footer, Contact page |
| `chairman` | name, title, photo_url, signature_url, message | ChairmanMessage section |
| `seo` | meta_title, meta_description, og_image | `<Head>` on every public page |
| `contact` | inquiry_email, cc_email | ContactController@store mail routing |
| `about` | mission, vision | About page (MissionVision section) |
| `social` | facebook, instagram, linkedin | Footer social links |

---

## 5. Public Routes — Full Map

Every URL the SPA currently serves must have an identical Laravel route.

### Core pages

| Method | URL | Controller@method | Inertia page | Key props passed |
|---|---|---|---|---|
| GET | `/` | `HomeController@index` | `Public/Home` | heroSlides, stats, companies, associates, marqueeItems, processSteps |
| GET | `/about-east-queen` | `AboutController@index` | `Public/About` | timeline |
| GET | `/mission-vision-purpose` | `AboutController@missionVision` | `Public/MissionVision` | — |
| GET | `/our-core-values` | `AboutController@coreValues` | `Public/CoreValues` | — |
| GET | `/export` | `ProductController@export` | `Public/Export` | exportProducts, processSteps |
| GET | `/import` | `ProductController@import` | `Public/Import` | importProducts, processSteps |
| GET | `/gallery` | `GalleryController@index` | `Public/Gallery` | galleryItems |
| GET | `/contact-us` | `ContactPageController@show` | `Public/Contact` | — |
| POST | `/contact-us` | `ContactPageController@store` | redirect back | — |
| GET | `/ship-breaking` | `ShipBreakingController@index` | `Public/ShipBreaking` | stats |

### Company / concern detail (6 fixed slugs)

| Method | URL | Controller@method | Inertia page | Props |
|---|---|---|---|---|
| GET | `/con-ariko-international` | `CompanyController@show` | `Public/CompanyDetail` | company, companies |
| GET | `/con-east-queen-shipping` | `CompanyController@show` | `Public/CompanyDetail` | company, companies |
| GET | `/con-bay-gas` | `CompanyController@show` | `Public/CompanyDetail` | company, companies |
| GET | `/con-syedpur-fisheries` | `CompanyController@show` | `Public/CompanyDetail` | company, companies |
| GET | `/con-bsc-ltd` | `CompanyController@show` | `Public/CompanyDetail` | company, companies |
| GET | `/con-marinona-foodstaff` | `CompanyController@show` | `Public/CompanyDetail` | company, companies |

> One route pattern: `Route::get('/con-{slug}', [CompanyController::class, 'show'])`.
> Controller maps slug to DB record.

### Export product detail (6)

| URL | slug prop |
|---|---|
| `/export-mill-scale` | `mill-scale` |
| `/export-zinc-oxide` | `zinc-oxide` |
| `/export-pet-flakes` | `pet-flakes` |
| `/export-fresh-vegetables-and-fruits` | `fresh-vegetables-and-fruits` |
| `/export-leather-goods` | `leather-goods` |
| `/export-jute-made-products` | `jute-made-products` |

> Pattern: `Route::get('/export-{slug}', [ProductController::class, 'show'])`.

### Import product detail (5 + 1 redirect)

| URL | slug prop |
|---|---|
| `/import-aggregate` | `aggregate` |
| `/import-lime-stone` | `lime-stone` |
| `/import-coal` | `coal` |
| `/import-steel-scraps` | `steel-scraps` |
| `/import-automobile-spare-parts` | `automobile-spare-parts` |
| `/import-gabbro` | → redirect to `/import-aggregate` |

> Pattern: `Route::get('/import-{slug}', [ProductController::class, 'show'])`.

### Soft redirects (preserve old SPA URLs)

```
/about      → /about-east-queen   (301)
/contact    → /contact-us         (301)
/companies  → /about-east-queen   (301)
/associates → /about-east-queen   (301)
```

### Legal & utility

| URL | Controller | Inertia page |
|---|---|---|
| `/privacy-policy` | `LegalController@privacy` | `Public/PrivacyPolicy` |
| `/terms-and-conditions` | `LegalController@terms` | `Public/TermsConditions` |
| `*` (catch-all) | — | `Public/NotFound` (via `Inertia::render` in 404 handler) |

---

## 6. Frontend Port Rules

**The only changes allowed in ported code are mechanical. Zero design rewrites.**

### 6.1 Mechanical substitutions

| SPA (eastqueen-group) | Inertia backend |
|---|---|
| `import { Link } from 'react-router-dom'` | `import { Link } from '@inertiajs/react'` |
| `<Link to="/path">` | `<Link href="/path">` |
| `import { useLocation } from 'react-router-dom'` | `import { usePage } from '@inertiajs/react'` → `const { url } = usePage()` |
| `import { Helmet }` / `<Helmet>` | `import { Head } from '@inertiajs/react'` / `<Head>` |
| `useCompanies()`, `useStats()`, etc. | Props: `export default function Home({ companies, stats })` |
| `useSettings('chairman')` | Shared prop: `const { chairmanSetting } = usePage().props` |
| `submitContact(form)` via axios | `router.post('/contact-us', form)` from `@inertiajs/react` |
| File extension `.tsx` | `.jsx` |
| `import '@/…'` | Same — alias already set to `resources/js/` in vite.config.js |
| `AnimatePresence` page transitions in `App.tsx` | Handled by Inertia's page lifecycle — wrap page content in `motion.div` |

### 6.2 Static fallback default-prop pattern

Every data-driven component keeps the static data as a **prop default**.
This means Phase A (foundation) works with zero DB wiring — the site renders
identically from defaults, and Phase B flips each section live by passing
real props from the controller.

```jsx
// resources/js/components/public/sections/StatsSection.jsx
const STATIC_STATS = [
  { value: 100, suffix: '+', label: 'Happy Clients' },
  { value: 500, suffix: '+', label: 'Employees' },
  { value: 400, suffix: '+', label: 'Complete Deliveries' },
  { value: 42,  suffix: '+', label: 'Years Established' },
]

export default function StatsSection({ stats = STATIC_STATS }) {
  // identical JSX — works with default or live data
}
```

```jsx
// resources/js/pages/Public/Home.jsx
export default function Home({ heroSlides, stats, companies, associates, marqueeItems, processSteps }) {
  return (
    <>
      <HeroSection heroSlides={heroSlides} />
      <StatsSection stats={stats} />
      <MarqueeStrip items={marqueeItems} />
      ...
    </>
  )
}
```

### 6.3 File map — SPA → Backend

```
eastqueen-group/src/                        eastqueen-backend/resources/js/
────────────────────────────────────────    ─────────────────────────────────────────────
lib/motion.ts                           →   lib/motion.js                     ✅ Done
lib/cn.ts                               →   lib/cn.js                         ✅ Done
lib/constants.ts                        →   lib/constants.js                  🔲
─── Layout ──────────────────────────────────────────────────────────────────────────────
components/layout/Navbar.tsx            →   components/public/layout/Navbar.jsx           🔲
components/layout/Footer.tsx            →   components/public/layout/Footer.jsx           🔲
components/layout/ScrollProgressBar.tsx →   components/public/layout/ScrollProgressBar.jsx 🔲
(new file)                              →   components/public/layout/PublicLayout.jsx     🔲
─── UI components ───────────────────────────────────────────────────────────────────────
components/ui/PageHero.tsx              →   components/public/ui/PageHero.jsx             🔲
components/ui/SectionHeader.tsx         →   components/public/ui/SectionHeader.jsx        🔲
components/ui/BackToTop.tsx             →   components/public/ui/BackToTop.jsx            🔲
components/ui/WhatsAppButton.tsx        →   components/public/ui/WhatsAppButton.jsx       🔲
components/ui/Button.tsx                →   components/public/ui/Button.jsx               🔲
components/ui/Badge.tsx                 →   components/public/ui/Badge.jsx                🔲
components/ui/LegalLayout.tsx           →   components/public/ui/LegalLayout.jsx          🔲
components/ui/StatCard.tsx              →   components/public/ui/StatCard.jsx             🔲
components/ui/PageLoader.tsx            →   components/public/ui/PageLoader.jsx           🔲
─── Section components ──────────────────────────────────────────────────────────────────
components/sections/HeroSection.tsx     →   components/public/sections/HeroSection.jsx    🔲
components/sections/MarqueeStrip.tsx    →   components/public/sections/MarqueeStrip.jsx   🔲
components/sections/StatsSection.tsx    →   components/public/sections/StatsSection.jsx   🔲
components/sections/ChairmanMessage.tsx →   components/public/sections/ChairmanMessage.jsx 🔲
components/sections/CompaniesPreview.tsx→   components/public/sections/CompaniesPreview.jsx 🔲
components/sections/ProductsHighlight.tsx→  components/public/sections/ProductsHighlight.jsx 🔲
components/sections/AssociatesTeaser.tsx→   components/public/sections/AssociatesTeaser.jsx 🔲
components/sections/ProcessStrip.tsx    →   components/public/sections/ProcessStrip.jsx   🔲
components/sections/GalleryMosaic.tsx   →   components/public/sections/GalleryMosaic.jsx  🔲
components/sections/AboutSnippet.tsx    →   components/public/sections/AboutSnippet.jsx   🔲
components/sections/ShipBreakingFeature.tsx→ components/public/sections/ShipBreakingFeature.jsx 🔲
components/sections/ShipHeroSection.tsx →   components/public/sections/ShipHeroSection.jsx 🔲
components/sections/MapVisual.tsx       →   components/public/sections/MapVisual.jsx      🔲
components/sections/ContactCTA.tsx      →   components/public/sections/ContactCTA.jsx     🔲
─── Pages ───────────────────────────────────────────────────────────────────────────────
pages/Home.tsx                          →   pages/Public/Home.jsx                         🔲
pages/About.tsx                         →   pages/Public/About.jsx                        🔲
pages/MissionVision.tsx                 →   pages/Public/MissionVision.jsx                🔲
pages/CoreValues.tsx                    →   pages/Public/CoreValues.jsx                   🔲
pages/Companies.tsx                     →   (merged into About — see §5 redirects)        🔲
pages/CompanyDetail.tsx                 →   pages/Public/CompanyDetail.jsx                🔲
pages/Export.tsx                        →   pages/Public/Export.jsx                       🔲
pages/Import.tsx                        →   pages/Public/Import.jsx                       🔲
pages/ProductDetail.tsx                 →   pages/Public/ProductDetail.jsx                🔲
pages/Associates.tsx                    →   (merged into About — see §5 redirects)        🔲
pages/Gallery.tsx                       →   pages/Public/Gallery.jsx                      🔲
pages/Contact.tsx                       →   pages/Public/Contact.jsx                      🔲
pages/ShipBreaking.tsx                  →   pages/Public/ShipBreaking.jsx                 🔲
pages/PrivacyPolicy.tsx                 →   pages/Public/PrivacyPolicy.jsx                🔲
pages/TermsConditions.tsx               →   pages/Public/TermsConditions.jsx              🔲
pages/NotFound.tsx                      →   pages/Public/NotFound.jsx                     🔲
```

---

## 7. Backend File Map — Laravel Controllers

```
app/Http/Controllers/Public/
├── HomeController.php
├── AboutController.php          (index, missionVision, coreValues)
├── CompanyController.php        (show — handles /con-{slug})
├── ProductController.php        (export, import, show)
├── GalleryController.php        (index)
├── ContactPageController.php    (show, store)
├── ShipBreakingController.php   (index)
└── LegalController.php          (privacy, terms)
```

---

## 8. HandleInertiaRequests — Shared Props

Settings needed on every public page are shared globally.
No per-controller query for these.

```php
// app/Http/Middleware/HandleInertiaRequests.php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => ['user' => $request->user()],

        // Cached — available on every public page automatically
        'companySetting' => fn() => cache()->remember(
            'eq_settings_company', 3600,
            fn() => Setting::group('company')
        ),
        'chairmanSetting' => fn() => cache()->remember(
            'eq_settings_chairman', 3600,
            fn() => Setting::group('chairman')
        ),
        'seoSetting' => fn() => cache()->remember(
            'eq_settings_seo', 3600,
            fn() => Setting::group('seo')
        ),
        'socialSetting' => fn() => cache()->remember(
            'eq_settings_social', 3600,
            fn() => Setting::group('social')
        ),
    ]);
}
```

Usage in any Inertia page component:
```jsx
const { companySetting, chairmanSetting } = usePage().props
```

---

## 9. Caching Strategy

```php
// Pattern used in every Public controller
$companies = cache()->remember('eq_companies', 3600, fn() =>
    Company::active()->ordered()->get()->toArray()
);
return Inertia::render('Public/Home', compact('companies', ...));
```

**Cache keys:**

| Key | Busted when |
|---|---|
| `eq_hero_slides` | HeroSlide saved/deleted |
| `eq_stats` | Stat saved/deleted |
| `eq_companies` | Company saved/deleted |
| `eq_products_export` | Product (type=export) saved/deleted |
| `eq_products_import` | Product (type=import) saved/deleted |
| `eq_associates` | Associate saved/deleted |
| `eq_process_steps` | ProcessStep saved/deleted |
| `eq_marquee` | MarqueeItem saved/deleted |
| `eq_timeline` | TimelineEntry saved/deleted |
| `eq_gallery` | GalleryMedia saved/deleted |
| `eq_settings_company` | Setting (group=company) saved/deleted |
| `eq_settings_chairman` | Setting (group=chairman) saved/deleted |
| `eq_settings_seo` | Setting (group=seo) saved/deleted |
| `eq_settings_social` | Setting (group=social) saved/deleted |

Observers are registered in `AppServiceProvider::boot()`.

---

## 10. Phased Roadmap

---

### Phase A — Public site foundation `(~2 days)`

**Deliverable:** Every public URL renders inside the Inertia app, pixel-identical
to the static SPA. Data comes from **static fallback defaults** — nothing dynamic
yet. Admin panel untouched and fully functional.

#### A1 — Shared frontend utilities
- [ ] `resources/js/lib/constants.js` — NAV_ITEMS, CONTACT, STATIC_STATS, static company names for marquee

#### A2 — Public layout layer
- [ ] `resources/js/components/public/layout/PublicLayout.jsx`
  Wraps: `<Navbar>`, `<ScrollProgressBar>`, `{children}`, `<Footer>`, `<BackToTop>`, `<WhatsAppButton>`, `<Toaster>` (sonner)
- [ ] `resources/js/components/public/layout/Navbar.jsx`
  Port from SPA. Swap `react-router-dom` → `@inertiajs/react`. `useLocation` → `usePage().url`. Companies list prop (or usePage shared prop).
- [ ] `resources/js/components/public/layout/Footer.jsx`
  Port. Companies list + `companySetting` from `usePage().props`.
- [ ] `resources/js/components/public/layout/ScrollProgressBar.jsx`
  Port as-is (no data dependency).

#### A3 — UI components
- [ ] `PageHero.jsx` — port as-is
- [ ] `SectionHeader.jsx` — port as-is
- [ ] `BackToTop.jsx` — port as-is
- [ ] `WhatsAppButton.jsx` — port as-is, phone from `usePage().props.companySetting`
- [ ] `Button.jsx`, `Badge.jsx`, `StatCard.jsx`, `PageLoader.jsx`, `LegalLayout.jsx` — port as-is

#### A4 — Section components (with static default props)
- [ ] `HeroSection.jsx` — default: 8 static slides hardcoded in component
- [ ] `StatsSection.jsx` — default: STATIC_STATS from constants.js
- [ ] `MarqueeStrip.jsx` — default: static company names
- [ ] `ChairmanMessage.jsx` — default: hardcoded fallback text (already in SPA)
- [ ] `CompaniesPreview.jsx` — default: static companies array
- [ ] `ProductsHighlight.jsx` — default: static export/import arrays
- [ ] `AssociatesTeaser.jsx` — default: static associates array
- [ ] `ProcessStrip.jsx` — default: static process steps
- [ ] `GalleryMosaic.jsx` — default: static gallery array
- [ ] `AboutSnippet.jsx`, `ShipBreakingFeature.jsx`, `ShipHeroSection.jsx` — port as-is
- [ ] `MapVisual.jsx`, `ContactCTA.jsx` — port as-is

#### A5 — Public Inertia pages
- [ ] `pages/Public/Home.jsx`
- [ ] `pages/Public/About.jsx`
- [ ] `pages/Public/MissionVision.jsx`
- [ ] `pages/Public/CoreValues.jsx`
- [ ] `pages/Public/CompanyDetail.jsx`
- [ ] `pages/Public/Export.jsx`
- [ ] `pages/Public/Import.jsx`
- [ ] `pages/Public/ProductDetail.jsx`
- [ ] `pages/Public/Gallery.jsx`
- [ ] `pages/Public/Contact.jsx` — uses `router.post('/contact-us', form)`
- [ ] `pages/Public/ShipBreaking.jsx`
- [ ] `pages/Public/PrivacyPolicy.jsx`
- [ ] `pages/Public/TermsConditions.jsx`
- [ ] `pages/Public/NotFound.jsx`

#### A6 — Laravel public controllers (initially pass empty props)
- [ ] `app/Http/Controllers/Public/HomeController.php` → `Inertia::render('Public/Home', [])`
- [ ] `app/Http/Controllers/Public/AboutController.php`
- [ ] `app/Http/Controllers/Public/CompanyController.php`
- [ ] `app/Http/Controllers/Public/ProductController.php`
- [ ] `app/Http/Controllers/Public/GalleryController.php`
- [ ] `app/Http/Controllers/Public/ContactPageController.php`
- [ ] `app/Http/Controllers/Public/ShipBreakingController.php`
- [ ] `app/Http/Controllers/Public/LegalController.php`

#### A7 — Routes & middleware
- [ ] `routes/web.php` — all public routes (§5 full map)
- [ ] `app/Http/Middleware/HandleInertiaRequests.php` — add shared settings props
- [ ] Register `PublicLayout.jsx` in `app.jsx` for non-`Admin/` pages (already done)

#### A8 — Assets
- [ ] Copy `eastqueen-group/public/images/` → `eastqueen-backend/public/images/`
- [ ] Copy `eastqueen-group/public/fonts/` → `eastqueen-backend/public/fonts/` (if any)
- [ ] Ensure `resources/views/app.blade.php` loads Google Fonts (Playfair Display, Inter, JetBrains Mono)

#### A — Ship gate
- `npm run build` — zero errors
- `php artisan serve` — every public URL loads
- Side-by-side visual comparison with `eastqueen-group` — pixel-identical
- Admin panel at `/admin` — fully functional, untouched

---

### Phase B — Wire DB data section by section `(~2 days)`

**Deliverable:** Each section reads live data from the DB. An admin edit →
page reflects the change on next request. Order = lowest risk first.

Each step: update the Public controller to pass real DB data → component
receives it as a prop → renders live data instead of the static default.
Add the model observer to bust the cache key.

| # | Section | Controller change | Model observer |
|---|---|---|---|
| B1 | `MarqueeStrip` | Pass `marqueeItems` from `MarqueeItem::active()->ordered()->get()` | `MarqueeItem` → bust `eq_marquee` |
| B2 | `StatsSection` | Pass `stats` from `Stat::ordered()->get()` | `Stat` → bust `eq_stats` |
| B3 | `ProcessStrip` | Pass `processSteps` from `ProcessStep::ordered()->get()` | `ProcessStep` → bust `eq_process_steps` |
| B4 | `AssociatesTeaser` | Pass `associates` from `Associate::active()->ordered()->get()` | `Associate` → bust `eq_associates` |
| B5 | `Timeline` (About) | Pass `timeline` from `TimelineEntry::ordered()->get()` | `TimelineEntry` → bust `eq_timeline` |
| B6 | `GalleryMosaic` / Gallery page | Pass `galleryItems` from `GalleryMedia::active()->ordered()->get()` | `GalleryMedia` → bust `eq_gallery` |
| B7 | `CompaniesPreview` / CompanyDetail | Pass `companies` from `Company::active()->ordered()->get()` | `Company` → bust `eq_companies` |
| B8 | `Export` / `Import` / `ProductDetail` | Pass products filtered by type | `Product` → bust `eq_products_export` / `eq_products_import` |
| B9 | `HeroSection` | Pass `heroSlides` from `HeroSlide::active()->ordered()->get()` | `HeroSlide` → bust `eq_hero_slides` |
| B10 | `ChairmanMessage` | Uses shared `chairmanSetting` prop (already in HandleInertiaRequests) | `Setting` (group=chairman) → bust `eq_settings_chairman` |
| B11 | `Footer` / `Contact` / `WhatsAppButton` | Uses shared `companySetting` prop | `Setting` (group=company) → bust `eq_settings_company` |
| B12 | `<Head>` SEO | Uses shared `seoSetting` prop | `Setting` (group=seo) → bust `eq_settings_seo` |

**B — Ship gate:**
- Every section renders live DB data
- Admin round-trip verified: edit in `/admin` → visible on public page after next load
- `npm run build` clean · `php artisan test` green

---

### Phase C — Contact form & settings polish `(~1 day)`

- [ ] Wire `ContactPageController@store`: validate via `ContactFormRequest`, create `Contact` record, fire `ContactInquiryMail` (to `contact.inquiry_email`) + `ContactAutoReplyMail` (to submitter)
- [ ] Verify admin `/admin/contacts` inbox shows new submissions
- [ ] Populate `map_embed_url` setting → rendered in Contact page iframe
- [ ] Populate `social.*` settings → rendered in Footer
- [ ] Test all Settings groups editable and saved correctly in admin
- [ ] `About` page: pass `aboutSetting` (mission, vision) from shared props or controller

**C — Ship gate:** Contact form → DB record + mail sent. All settings groups live.

---

### Phase D — Production deployment `(~1 day)`

- [ ] Set `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL=https://eastqueengroup.com`
- [ ] Configure DB credentials, `MAIL_*` (SMTP), `QUEUE_CONNECTION`
- [ ] `php artisan migrate --seed` on production DB
- [ ] `php artisan config:cache && php artisan route:cache && php artisan view:cache`
- [ ] `npm run build` on server
- [ ] DNS: point `eastqueengroup.com` to PHP host
- [ ] SSL certificate (Let's Encrypt / hosting panel)
- [ ] Retire `eastqueen-group` Vercel deployment
- [ ] Verify all 30+ URLs load correctly in production

---

## 11. Admin Panel — Current Navigation

```
/admin/dashboard
├── Content
│   ├── /admin/hero-slides       — drag-reorder · toggle active · image/video upload
│   ├── /admin/companies         — CRUD · drag-reorder · toggle active
│   ├── /admin/products          — CRUD · filter by type (export/import) · drag-reorder
│   ├── /admin/associates        — CRUD · drag-reorder · toggle active
│   ├── /admin/process-steps     — CRUD · drag-reorder
│   ├── /admin/marquee-items     — CRUD · drag-reorder · toggle active
│   ├── /admin/stats             — CRUD · drag-reorder
│   ├── /admin/timeline          — CRUD · drag-reorder
│   └── /admin/gallery           — CRUD · drag-reorder · toggle active · category filter
├── /admin/contacts              — inbox · status · notes · reply · export
├── /admin/settings              — company · chairman · seo · contact · about · social
└── /admin/users                 — admin user management
```

---

## 12. Data Model Quick Reference

All tables exist and are seeded. Migrations are in `database/migrations/`.

| Model | Table | Notable columns |
|---|---|---|
| `Company` | `companies` | slug (unique), name, tagline, description, long_description(json), services(json), logo, cover_image, gallery_images(json), color, sort_order, is_active |
| `Product` | `products` | slug (unique), type (export/import), name, category, icon, image, gallery_images(json), specs(json), tags(json), use_cases(json), sort_order, is_active |
| `Associate` | `associates` | name, logo, country, website, initials, color, sort_order, is_active |
| `ProcessStep` | `process_steps` | step_number, title, description, icon, sort_order |
| `MarqueeItem` | `marquee_items` | text, sort_order, is_active |
| `HeroSlide` | `hero_slides` | image_path, title, subtitle, description, cta_text, cta_url, media_type (image/video), video_url, is_active, sort_order |
| `Stat` | `stats` | label, value, suffix, icon, sort_order |
| `TimelineEntry` | `timeline_entries` | year, title, description, milestone, sort_order |
| `GalleryMedia` | `gallery_media` | category, type (image/video), src, thumbnail_src, title, caption, sort_order, is_active |
| `Setting` | `settings` | group, key, value, type, label, sort_order |
| `Contact` | `contacts` | name, company, email, phone, subject, message, status, admin_notes |

---

## 13. Risk Register

| Risk | Mitigation |
|---|---|
| EQ Tailwind palette (`navy`/`gold`) conflicts with admin colors | Admin uses `admin.*` prefix. EQ colors have no overlap. Build already passes. |
| Dynamic Tailwind classes from DB (`color` field on Company/Associate) | All variants added to `safelist` in `tailwind.config.js`. |
| Inertia page transition differs from SPA `AnimatePresence` | Wrap page content in `motion.div variants={pageTransition}` — same visual result. |
| `usePage().url` doesn't fully match `useLocation().pathname` for active nav | Test active-link detection in Navbar carefully. `usePage().url` returns full path. |
| Company detail slug mismatch (route `/con-{slug}` vs DB `slug` column) | Controller strips `/con-` prefix before DB lookup. Document slug conventions. |
| Large gallery page — all images loaded at once | GalleryMosaic already implements lazy loading via `loading="lazy"`. Keep as-is. |
| Contact form CSRF | Inertia handles CSRF automatically via the `X-XSRF-TOKEN` header. No extra work. |
| Images missing in production (copied manually) | Document image copy step in Phase D checklist. Consider S3 for production. |

---

## 14. Definition of Done

**A section is "dynamic" when:**
1. Admin user edits it at `/admin/*` and saves.
2. The change appears on the public page on next page load (cache busted by model observer).
3. No code deploy required.
4. `npm run build` clean · `php artisan test` green.
5. Visual parity confirmed against the `eastqueen-group` reference build.

**The project is complete when every row in Phase B is checked off.**

---

## 15. Execution Timeline

```
Week 1
  Day 1    Phase A1–A3   constants + PublicLayout + Navbar + Footer + UI components
  Day 2    Phase A4–A7   section components + pages + controllers + routes + assets
  Day 3    Phase A — ship gate: build clean, visual parity check, fix issues

Week 2
  Day 4    Phase B1–B6   MarqueeStrip → StatsSection → ProcessStrip → Associates → Timeline → Gallery
  Day 5    Phase B7–B12  Companies → Products → HeroSlides → Settings (shared props)
  Day 6    Phase B — ship gate: admin round-trip verification for every section

Week 3
  Day 7    Phase C       Contact form + settings polish
  Day 8    Phase D       Production deployment
```

**Total: 8 working days.** Backend is fully built. All DB work is done.
The remaining work is entirely frontend port + controller wiring.
