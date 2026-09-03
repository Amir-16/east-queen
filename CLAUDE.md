# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Stack

Laravel 11 + Inertia.js v2 + React 19 + Tailwind CSS v3. The `src/` directory is the **legacy** standalone React SPA (Vite + react-router-dom) — it is being retired and should not be modified. All active development happens inside `resources/js/`.

## Commands

```bash
# Install / boot
composer install
npm install
php artisan migrate --seed          # seeds all tables with demo data

# Development (run both together)
php artisan serve                   # Laravel on :8000
npm run dev                         # Vite HMR

# Production
npm run build                       # emits to public/build/

# Useful artisan commands
php artisan tinker
php artisan cache:clear
php artisan config:clear
php artisan db:seed --class=ProductSeeder   # reseed a single table
```

No test runner is configured yet (`phpunit.xml` exists but no Feature/Unit tests have been written).

## Architecture

### Request / Response Flow

```
Browser
  │
  ├─ GET  /admin/*   → Admin\*Controller  → Inertia::render('Admin/PageName', $props)
  ├─ GET  /…         → Public\*Controller → Inertia::render('Public/PageName', $props)
  └─ GET  /api/v1/*  → Api\*Controller    → response()->json($data)
```

Laravel renders a single Blade view (`resources/views/app.blade.php`). Inertia resolves the page component from `resources/js/pages/{Admin,Public}/PageName.jsx`.

The Vite entry point is **`resources/js/app.jsx`** (not `src/`). The `@` alias resolves to `resources/js/`.

### Shared Props (Always Available in Every Page)

`HandleInertiaRequests::share()` injects these into every Inertia response:

| Key | Source | Cache |
|-----|--------|-------|
| `company` | `Setting::group('company')` | 3600 s |
| `chairman` | `Setting::group('chairman')` | 3600 s |
| `seo` | `Setting::group('seo')` | 3600 s |
| `adminUser` | `Auth::user()` | none |
| `unreadContacts` | `Contact::unread()->count()` | 60 s |

Access in any page component via `usePage().props.company`, or destructure from the page props.

### PublicLayout & Smooth Scroll

`resources/js/app.jsx` wraps every Public page with `LenisProvider` (smooth scroll) + `PublicLayout` automatically — unless the page sets its own `layout`. Admin pages handle their own layout via `AdminLayout`.

### Settings Model

`Setting` stores all editable site text as key/value rows grouped by `group`. Use dot notation:

```php
Setting::get('company.phone')          // single value
Setting::group('company')              // Collection: key → value
Setting::set('company.phone', '+880…') // upsert
```

Settings are invalidated with `cache()->forget('settings.{group}')` after admin updates.

### Static Data Still Hardcoded

These `resources/js/data/` files contain **hardcoded arrays** that still need to be replaced with Inertia props from the database:

| File | Content | Consuming pages |
|------|---------|-----------------|
| `data/timeline.js` | Company milestones | `Public/About.jsx` |
| `data/companies.js` | Company cards | `Public/Companies.jsx`, `Public/Home.jsx` |
| `data/associates.js` | Partner logos | `Public/Associates.jsx` |
| `data/exports.js` | Export products + process steps | `Public/Export.jsx` |
| `data/imports.js` | Import products + process steps | `Public/Import.jsx` |
| `data/gallery.js` | Media items | `Public/Gallery.jsx` |
| `lib/constants.js` | `NAV_ITEMS` hardcoded nav links | `Navbar.jsx` |

The database models and API controllers (`/api/v1/*`) for all of the above **already exist** — these data files just haven't been wired to Inertia props yet.

### Model Conventions

- **`CleansUploadedImages` trait** — add `protected array $storageImages = ['image']` to auto-delete old storage files when a model is updated or deleted.
- **Active + Ordered scopes** — every content model has `scopeActive()` (filters `is_active = true`) and `scopeOrdered()` (sorts by `sort_order` then `id`).
- **`ManagesOrdering` concern** — Admin controllers mix in `reorder(Request $request)` to handle the DnD reorder `POST` endpoint; expects `{ items: [{ id, sort_order }, …] }`.

### API Caching Pattern

All API controllers extend `BaseApiController` and use `$this->cached('api.key', 3600, fn () => …)`. Clear these keys in the admin controller after mutations:

```php
cache()->forget('api.products');
cache()->forget('api.product.' . $slug);
```

### Admin Auth

Guard: custom `auth.admin` middleware (`EnsureIsAdmin`). Login at `/admin/login`. The admin section uses session-based auth (not Sanctum).

### File Uploads

- Images → `POST /admin/upload/image` → `ImageUploadController` → stored in `storage/app/public/uploads/`
- Videos → `POST /admin/upload/video` → `VideoUploadController`
- Public symlink: `php artisan storage:link`

### Frontend Conventions

- Animations: **Framer Motion** (`resources/js/lib/motion.js` exports shared variant presets).
- Class merging: `cn()` from `resources/js/lib/cn.js` (wraps `clsx` + `tailwind-merge`).
- Admin drag-and-drop reorder: **@dnd-kit** via `<SortableList>` component.
- Toasts: **Sonner** on public pages; **SweetAlert2** on admin pages.
- The `FlashToast` component reads Inertia flash messages (`flash.success`, `flash.error`) set via `Inertia::flash()`.
