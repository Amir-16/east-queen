# Jonith Bogdad — Full-Stack Dynamisation Master Plan
**Lead Solutions Architect & Engineer:** Amir-16
**Version:** 3.0 | **Date:** 2026-07-29 | **Status:** Ready for Execution

---

## 1. Executive Summary

Convert the static React 19 / Vite SPA into a fully dynamic, database-driven full-stack application.
Every word, image, number, and setting on the public site is editable from a **custom-built admin
panel powered by Inertia.js + React + Laravel** — same technology stack as the public site, zero
third-party admin frameworks.

**Stack:** Laravel 11 · Inertia.js v2 · React 19 · Tailwind CSS 3 · MySQL 8
**Admin:** 100% custom React admin UI served via Inertia — not Filament, not Nova
**Repo:** Monorepo — one Laravel project, React migrated into `resources/js/`
**Deploy:** VPS (Nginx + PHP 8.3-FPM) or Laravel Forge

---

## 2. Architecture

```
┌──────────────────────────────────────────────────────────────────────┐
│                              BROWSER                                 │
│                                                                      │
│   PUBLIC SITE (/)                      ADMIN PANEL (/admin/*)        │
│   Inertia React pages                  Inertia React pages           │
│   PublicLayout.jsx                     AdminLayout.jsx               │
│   Framer Motion · Swiper               Custom DataTable · Charts     │
│   Tailwind (light theme)               Tailwind (navy/gold theme)    │
└──────────────┬──────────────────────────────────┬────────────────────┘
               │  Inertia XHR / full-page          │  Inertia XHR
               ▼                                   ▼
┌──────────────────────────────────────────────────────────────────────┐
│                           LARAVEL 11                                 │
│                                                                      │
│  routes/web.php          routes/admin.php (auth:admin middleware)    │
│  Public Controllers      Admin Controllers                           │
│  HandleInertiaRequests   ContactInquiryMail · AutoReplyMail          │
│  Eloquent Models         Form Request Validation                     │
└──────────────────────────────────────┬───────────────────────────────┘
                                       │ Eloquent ORM
                                       ▼
┌──────────────────────────────────────────────────────────────────────┐
│                             MySQL 8                                  │
│                                                                      │
│  services       sub_services     projects        project_images      │
│  testimonials   stats            contacts        team_contacts       │
│  settings       about_content    why_choose_items core_values        │
│  users                                                               │
└──────────────────────────────────────────────────────────────────────┘
```

---

## 3. Full Project Structure

```
jonith-bogdad/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   ├── Public/
│   │   │   │   ├── HomeController.php
│   │   │   │   ├── AboutController.php
│   │   │   │   ├── ServiceController.php
│   │   │   │   ├── PortfolioController.php
│   │   │   │   └── ContactController.php
│   │   │   └── Admin/
│   │   │       ├── DashboardController.php
│   │   │       ├── ServiceController.php
│   │   │       ├── SubServiceController.php
│   │   │       ├── ProjectController.php
│   │   │       ├── TestimonialController.php
│   │   │       ├── StatController.php
│   │   │       ├── ContactController.php
│   │   │       ├── TeamContactController.php
│   │   │       ├── WhyChooseController.php
│   │   │       ├── CoreValueController.php
│   │   │       ├── SettingController.php
│   │   │       ├── AboutController.php
│   │   │       ├── UserController.php
│   │   │       └── Auth/
│   │   │           ├── LoginController.php
│   │   │           └── LogoutController.php
│   │   ├── Middleware/
│   │   │   ├── HandleInertiaRequests.php
│   │   │   └── EnsureIsAdmin.php
│   │   └── Requests/
│   │       ├── ContactFormRequest.php
│   │       ├── Admin/
│   │       │   ├── ServiceRequest.php
│   │       │   ├── SubServiceRequest.php
│   │       │   ├── ProjectRequest.php
│   │       │   ├── TestimonialRequest.php
│   │       │   └── SettingRequest.php
│   ├── Mail/
│   │   ├── ContactInquiryMail.php
│   │   └── ContactAutoReplyMail.php
│   └── Models/
│       ├── Service.php
│       ├── SubService.php
│       ├── Project.php
│       ├── ProjectImage.php
│       ├── Testimonial.php
│       ├── Stat.php
│       ├── Contact.php
│       ├── TeamContact.php
│       ├── Setting.php
│       ├── AboutContent.php
│       ├── WhyChooseItem.php
│       ├── CoreValue.php
│       └── User.php
├── database/
│   ├── migrations/        (14 migration files)
│   └── seeders/           (10 seeder files)
├── resources/
│   ├── js/
│   │   ├── app.jsx                     ← Inertia bootstrap
│   │   ├── components/
│   │   │   ├── layout/                 ← public layout (unchanged)
│   │   │   ├── sections/               ← public sections (unchanged)
│   │   │   ├── ui/                     ← public UI (unchanged)
│   │   │   └── admin/                  ← NEW: admin-only components
│   │   │       ├── AdminLayout.jsx
│   │   │       ├── AdminSidebar.jsx
│   │   │       ├── AdminHeader.jsx
│   │   │       ├── DataTable.jsx
│   │   │       ├── StatCard.jsx
│   │   │       ├── StatusBadge.jsx
│   │   │       ├── ImageField.jsx
│   │   │       ├── RepeaterField.jsx
│   │   │       ├── SortableList.jsx
│   │   │       ├── ConfirmModal.jsx
│   │   │       ├── FormCard.jsx
│   │   │       └── InquiryChart.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx                ← adapted (Inertia props)
│   │   │   ├── About.jsx               ← adapted
│   │   │   ├── Services.jsx            ← adapted
│   │   │   ├── ServiceDetail.jsx       ← adapted
│   │   │   ├── SubServiceDetail.jsx    ← adapted
│   │   │   ├── Portfolio.jsx           ← adapted
│   │   │   ├── ProjectDetail.jsx       ← adapted
│   │   │   ├── Contact.jsx             ← adapted
│   │   │   ├── NotFound.jsx            ← adapted
│   │   │   └── Admin/
│   │   │       ├── Login.jsx
│   │   │       ├── Dashboard.jsx
│   │   │       ├── Services/
│   │   │       │   ├── Index.jsx
│   │   │       │   ├── Create.jsx
│   │   │       │   └── Edit.jsx
│   │   │       ├── SubServices/
│   │   │       │   ├── Index.jsx
│   │   │       │   ├── Create.jsx
│   │   │       │   └── Edit.jsx
│   │   │       ├── Projects/
│   │   │       │   ├── Index.jsx
│   │   │       │   ├── Create.jsx
│   │   │       │   └── Edit.jsx
│   │   │       ├── Testimonials/
│   │   │       │   ├── Index.jsx
│   │   │       │   ├── Create.jsx
│   │   │       │   └── Edit.jsx
│   │   │       ├── Stats/
│   │   │       │   └── Index.jsx
│   │   │       ├── Contacts/
│   │   │       │   ├── Index.jsx
│   │   │       │   └── Show.jsx
│   │   │       ├── WhyChoose/
│   │   │       │   ├── Index.jsx
│   │   │       │   └── Edit.jsx
│   │   │       ├── CoreValues/
│   │   │       │   ├── Index.jsx
│   │   │       │   └── Edit.jsx
│   │   │       ├── Team/
│   │   │       │   ├── Index.jsx
│   │   │       │   └── Edit.jsx
│   │   │       ├── Settings/
│   │   │       │   └── Index.jsx
│   │   │       ├── About/
│   │   │       │   └── Index.jsx
│   │   │       └── Users/
│   │   │           ├── Index.jsx
│   │   │           └── Edit.jsx
│   │   ├── utils/
│   │   └── styles/
│   └── views/
│       ├── app.blade.php
│       └── emails/
│           ├── contact-inquiry.blade.php
│           └── contact-autoreply.blade.php
├── routes/
│   ├── web.php            ← public routes
│   └── admin.php          ← admin routes (auth:admin)
└── vite.config.js
```

---

## 4. Database Schema (Complete)

### `services`
```sql
id            BIGINT PK AUTO_INCREMENT
slug          VARCHAR(120) UNIQUE NOT NULL
category      VARCHAR(60)  NOT NULL
title         VARCHAR(120) NOT NULL
subtitle      VARCHAR(255)
description   TEXT
icon          VARCHAR(80)
cover_image   VARCHAR(512)
featured      BOOLEAN      DEFAULT FALSE
highlights    JSON
key_features  JSON
process       JSON           -- [{"title":"...","desc":"..."}]
sort_order    SMALLINT     DEFAULT 0
is_active     BOOLEAN      DEFAULT TRUE
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

### `sub_services`
```sql
id            BIGINT PK AUTO_INCREMENT
service_id    BIGINT FK → services.id (cascade)
slug          VARCHAR(120) NOT NULL
title         VARCHAR(120) NOT NULL
description   TEXT
image         VARCHAR(512)
highlights    JSON
features      JSON
gallery       JSON           -- ["url1","url2","url3","url4"]
sort_order    SMALLINT     DEFAULT 0
is_active     BOOLEAN      DEFAULT TRUE
created_at    TIMESTAMP
updated_at    TIMESTAMP
UNIQUE (service_id, slug)
```

### `projects`
```sql
id            BIGINT PK AUTO_INCREMENT
slug          VARCHAR(120) UNIQUE NOT NULL
title         VARCHAR(150) NOT NULL
category      VARCHAR(60)
client        VARCHAR(120)
location      VARCHAR(120)
completed_at  DATE
cover_image   VARCHAR(512)
description   TEXT
tags          JSON           -- ["tennis","sports","school"]
featured      BOOLEAN      DEFAULT FALSE
sort_order    SMALLINT     DEFAULT 0
is_active     BOOLEAN      DEFAULT TRUE
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

### `project_images`
```sql
id            BIGINT PK AUTO_INCREMENT
project_id    BIGINT FK → projects.id (cascade)
image_url     VARCHAR(512) NOT NULL
sort_order    SMALLINT DEFAULT 0
```

### `testimonials`
```sql
id            BIGINT PK AUTO_INCREMENT
name          VARCHAR(100) NOT NULL
company       VARCHAR(120)
role          VARCHAR(100)
rating        TINYINT      DEFAULT 5
message       TEXT         NOT NULL
avatar        VARCHAR(512)
is_active     BOOLEAN      DEFAULT TRUE
sort_order    SMALLINT     DEFAULT 0
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

### `stats`
```sql
id            BIGINT PK AUTO_INCREMENT
label         VARCHAR(80)  NOT NULL
value         INT          NOT NULL
suffix        VARCHAR(10)  DEFAULT '+'
icon          VARCHAR(80)
sort_order    SMALLINT     DEFAULT 0
```

### `contacts`
```sql
id            BIGINT PK AUTO_INCREMENT
name          VARCHAR(100) NOT NULL
email         VARCHAR(150) NOT NULL
phone         VARCHAR(30)
service       VARCHAR(80)
message       TEXT         NOT NULL
status        ENUM('new','read','replied') DEFAULT 'new'
admin_notes   TEXT
ip_address    VARCHAR(45)
created_at    TIMESTAMP
updated_at    TIMESTAMP
INDEX (status, created_at)
```

### `team_contacts`
```sql
id            BIGINT PK AUTO_INCREMENT
initial       CHAR(1)      NOT NULL
name          VARCHAR(80)  NOT NULL
role          VARCHAR(80)
email         VARCHAR(150)
gradient_class VARCHAR(80) DEFAULT 'from-primary to-primary/70'
sort_order    SMALLINT     DEFAULT 0
is_active     BOOLEAN      DEFAULT TRUE
```

### `settings`
```sql
id            BIGINT PK AUTO_INCREMENT
key           VARCHAR(100) UNIQUE NOT NULL
value         TEXT
group         VARCHAR(60)  NOT NULL    -- company|seo|hero|cta|social
label         VARCHAR(120)
```

### `about_content`
```sql
id            BIGINT PK AUTO_INCREMENT
key           VARCHAR(80)  UNIQUE NOT NULL
value         TEXT
type          VARCHAR(30)  DEFAULT 'text'
label         VARCHAR(120)
```

### `why_choose_items`
```sql
id            BIGINT PK AUTO_INCREMENT
icon          VARCHAR(80)
title         VARCHAR(100) NOT NULL
description   TEXT
sort_order    SMALLINT     DEFAULT 0
is_active     BOOLEAN      DEFAULT TRUE
```

### `core_values`
```sql
id            BIGINT PK AUTO_INCREMENT
icon          VARCHAR(80)
title         VARCHAR(100) NOT NULL
description   TEXT
sort_order    SMALLINT     DEFAULT 0
is_active     BOOLEAN      DEFAULT TRUE
```

### `users` (admin accounts)
```sql
id            BIGINT PK AUTO_INCREMENT
name          VARCHAR(100)
email         VARCHAR(150) UNIQUE
password      VARCHAR(255)
is_admin      BOOLEAN      DEFAULT FALSE
remember_token VARCHAR(100)
created_at    TIMESTAMP
updated_at    TIMESTAMP
```

---

## 5. Admin UI Design System

### 5.1 Colour Palette

```
-- Sidebar & nav --
sidebar-bg          #0F1D35   (deep navy)
sidebar-text        #CBD5E1   (slate-300)
sidebar-active-bg   #1A2F4E   (navy lighter)
sidebar-active-text #C9A84C   (gold)
sidebar-border      #1E3A5F

-- Content area --
page-bg             #F1F5F9   (slate-100)
card-bg             #FFFFFF
card-border         #E2E8F0

-- Brand --
primary             #0F1D35   (navy — form labels, headings)
accent              #C9A84C   (gold — CTA buttons, active, badges)
accent-hover        #B8972F

-- Semantic --
success             #16A34A
danger              #DC2626
warning             #D97706
info                #2563EB
new-badge           #DC2626   (red)
read-badge          #D97706   (amber)
replied-badge       #16A34A   (green)
```

### 5.2 Typography

```
Font family:  inherit from public site (font-display = Inter/Sora, font-body = Inter)
Headings:     font-display font-bold text-primary
Labels:       text-xs font-semibold uppercase tracking-wide text-slate-500
Values:       text-sm text-slate-700
Nav items:    text-sm font-medium
```

### 5.3 Reusable Admin Components

| Component | Description |
|---|---|
| `AdminLayout` | Full shell: sidebar + header + `<main>` slot |
| `AdminSidebar` | Dark navy sidebar with nav groups, badge, collapse |
| `AdminHeader` | Top bar: page title, breadcrumb, user avatar, "View Site" link |
| `DataTable` | Sortable table: columns, search, pagination, bulk select |
| `StatCard` | Dashboard stat card: icon, value, label, trend arrow |
| `StatusBadge` | Coloured pill: new/read/replied/active/inactive |
| `FormCard` | White card wrapper with section heading for form groups |
| `ImageField` | Toggle Upload ↔ URL, preview thumbnail |
| `RepeaterField` | Add/remove/reorder list of text inputs or objects |
| `SortableList` | Drag-and-drop row reorder (using @dnd-kit/sortable) |
| `ConfirmModal` | Delete / destructive action confirmation dialog |
| `InquiryChart` | 30-day bar chart using Recharts |
| `TagInput` | Comma-separated tag input with pill UI |
| `StarRating` | Clickable 1–5 star input |
| `Toggle` | iOS-style on/off switch for is_active / featured |

---

## 6. Admin Panel Design

### 6.1 Login Page

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   Background: #0F1D35 full-screen with subtle diagonal pattern  │
│                                                                  │
│              ┌──────────────────────────────────┐               │
│              │   ◈  JONITH BOGDAD               │  ← white logo │
│              │      Technical Services          │               │
│              │                                  │               │
│              │  ──────────────────────────────  │               │
│              │                                  │               │
│              │  Admin Login                     │               │
│              │                                  │               │
│              │  Email                           │               │
│              │  ┌──────────────────────────┐   │               │
│              │  │  admin@jonith-bogdad.com  │   │               │
│              │  └──────────────────────────┘   │               │
│              │                                  │               │
│              │  Password                        │               │
│              │  ┌──────────────────────────┐   │               │
│              │  │  ••••••••••••••          │   │               │
│              │  └──────────────────────────┘   │               │
│              │                                  │               │
│              │  ┌──────────────────────────┐   │               │
│              │  │  Sign In  ──────────────▶│   │  ← gold btn  │
│              │  └──────────────────────────┘   │               │
│              │                                  │               │
│              └──────────────────────────────────┘               │
│                                                                  │
└──────────────────────────────────────────────────────────────────┘
```

Login component: `pages/Admin/Login.jsx`
Laravel route: `GET /admin/login` → `Auth\LoginController@showLogin`
Laravel route: `POST /admin/login` → `Auth\LoginController@login`

### 6.2 Admin Shell Layout

```
┌─────────────┬────────────────────────────────────────────────────┐
│  SIDEBAR    │  HEADER                                            │
│  240px      │  "Services"  /  Admin / Services         👤 Admin  │
│  #0F1D35    ├────────────────────────────────────────────────────┤
│             │                                                    │
│  ◈ JONITH   │   PAGE CONTENT                                     │
│    BOGDAD   │                                                    │
│             │   (each admin page renders here)                   │
│  ─ CONTENT  │                                                    │
│  Services   │                                                    │
│  Sub-Svcs   │                                                    │
│  Portfolio  │                                                    │
│  Reviews    │                                                    │
│  Why Us     │                                                    │
│  Values     │                                                    │
│  Team       │                                                    │
│  Stats      │                                                    │
│             │                                                    │
│  ─ INBOX    │                                                    │
│  Inquiries🔴│   ← red badge = unread count                       │
│             │                                                    │
│  ─ CONFIG   │                                                    │
│  Settings   │                                                    │
│  About Pg   │                                                    │
│  Admins     │                                                    │
│             │                                                    │
│  ─────────  │                                                    │
│  View Site↗ │                                                    │
│  Sign Out   │                                                    │
└─────────────┴────────────────────────────────────────────────────┘
```

### 6.3 Dashboard

```
┌──────────────────────────────────────────────────────────────────┐
│  Dashboard                                   Tuesday 29 Jul 2026 │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐  │
│  │ ◻ Services  │ │ ◻ Projects  │ │ ✉ Inquiries │ │ ★ Reviews │  │
│  │     8       │ │     8       │ │     47      │ │     4     │  │
│  │  active svc │ │  in portf.  │ │  🔴 3 new   │ │  ★★★★★    │  │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────┐  ┌──────────────────┐  │
│  │  Inquiries — Last 30 Days            │  │  Recent Inqs.    │  │
│  │                                      │  │                  │  │
│  │  8 │           ▄                     │  │  Ahmed A.  🔴NEW │  │
│  │  6 │      ▄    █    ▄                │  │  Sports · 2h ago │  │
│  │  4 │  ▄   █    █    █    ▄           │  │  ──────────────  │  │
│  │  2 │  █   █    █    █    █   ▄       │  │  Sarah T.  🟡RD  │  │
│  │    └──────────────────────────────   │  │  Floor · 1d ago  │  │
│  │     W1  W2  W3  W4  W5  W6  W7       │  │  ──────────────  │  │
│  └──────────────────────────────────────┘  │  [View All →]    │  │
│                                            └──────────────────┘  │
│  ┌──────────────────────────────────────────────────────────┐    │
│  │  Quick Actions                                           │    │
│  │  [+ Add Service]  [+ Add Project]  [+ Add Testimonial]  │    │
│  └──────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

---

## 7. Admin Pages Detail

### Services Index
```
┌──────────────────────────────────────────────────────────────────┐
│  Services                               [+ New Service]           │
│  8 services · 30 sub-services total                               │
├────┬───────────┬──────────┬────────────┬───────┬──────┬──────────┤
│ ≡  │  Cover    │  Title   │  Category  │ Feat. │ Act. │ Actions  │
├────┼───────────┼──────────┼────────────┼───────┼──────┼──────────┤
│ ⠿  │ [thumb]   │ Sports   │ sports     │  ★   │  ●   │ Edit Del │
│ ⠿  │ [thumb]   │ Flooring │ flooring   │  ★   │  ●   │ Edit Del │
│ ⠿  │ [thumb]   │ Fencing  │ fencing    │      │  ●   │ Edit Del │
└────┴───────────┴──────────┴────────────┴───────┴──────┴──────────┘
⠿ = drag handle (reorder)   ● = active toggle   ★ = featured toggle
```

### Service Create / Edit (Tabs)
```
[Basic Info] [Highlights & Features] [Process Steps] [Sub-Services]

Tab 1 — Basic Info:
  Title *         Slug * (auto)      Category * (select)
  Subtitle        Icon (heroicon)
  Description (textarea, rich)
  Cover Image (ImageField: Upload ↔ URL)
  Featured (Toggle)     Active (Toggle)

Tab 2 — Highlights & Features:
  Highlights  (RepeaterField: up to 6 text items)
  Key Features (RepeaterField: unlimited text items)

Tab 3 — Process Steps:
  Process (RepeaterField: [{title, desc}] pairs, drag to reorder)

Tab 4 — Sub-Services:
  Inline table of sub-services for this service
  Columns: Image | Title | Active | Sort | Edit | Delete
  [+ Add Sub-Service] button → modal or separate Create page
```

### Sub-Service Create / Edit
```
  Parent Service (read-only label)
  Title *        Slug * (auto)
  Description (textarea)
  Image (ImageField)
  Highlights (RepeaterField: up to 6 text items)
  Features (RepeaterField: unlimited text items)
  Gallery (RepeaterField: up to 6 image URLs/uploads, drag reorder)
  Active (Toggle)    Sort Order (number)
```

### Projects Index
```
┌───┬──────────┬──────────────────┬──────────┬──────────┬───┬───┬────────┐
│ ≡ │  Cover   │  Title           │ Category │ Featured │ ● │   │ Actions│
├───┼──────────┼──────────────────┼──────────┼──────────┼───┼───┼────────┤
│   Filter: All ▾  Sports  Flooring  Fencing  Pool  Civil  Carpentry  ...  │
└───┴──────────┴──────────────────┴──────────┴──────────┴───┴───┴────────┘
```

### Project Create / Edit (Tabs)
```
[Project Info] [Images & Gallery]

Tab 1 — Info:
  Title *       Slug * (auto)     Category * (select)
  Client        Location          Completed Date (date picker)
  Description (textarea)
  Tags (TagInput — gold pills)
  Featured (Toggle)   Active (Toggle)

Tab 2 — Images:
  Cover Image (ImageField)
  Gallery Images (RepeaterField: up to 8, drag reorder)
```

### Testimonials Index
```
┌──────────┬──────────┬───────┬────────┬──────────────────┬───┬────────┐
│  Avatar  │  Name    │ Comp. │ Rating │  Message preview  │ ● │ Actions│
└──────────┴──────────┴───────┴────────┴──────────────────┴───┴────────┘
```

### Testimonial Create / Edit
```
  Name *       Company      Role
  Rating (StarRating 1–5)
  Message * (textarea)
  Avatar (ImageField)
  Active (Toggle)    Sort Order (number)
```

### Inquiry Inbox (Contacts)
```
┌──────────────────────────────────────────────────────────────────┐
│  Inquiries                    Filter: [All ▾]  [Export CSV]      │
│  47 total  ·  🔴 3 new  ·  🟡 12 read  ·  🟢 32 replied          │
├────────┬──────────┬────────────┬──────────┬────────────┬─────────┤
│ Status │  Name    │   Email    │  Service │  Received  │ Actions │
├────────┼──────────┼────────────┼──────────┼────────────┼─────────┤
│ 🔴 NEW │ Ahmed A. │ ahmed@...  │ Sports   │ 2h ago     │  View   │
│ 🟡 RD  │ Sarah T. │ sarah@...  │ Flooring │ 1d ago     │  View   │
│ 🟢 RPL │ Mohammed │ m@...      │ Civil    │ 3d ago     │  View   │
└────────┴──────────┴────────────┴──────────┴────────────┴─────────┘
```

### Inquiry Detail (Show)
```
┌──────────────────────────────────────────────────────────────────┐
│  ← Back to Inquiries                           🔴 NEW            │
│  Inquiry from Ahmed Al Rashidi · 29 Jul 2026 at 14:32           │
├──────────────────────────────────────────────────────────────────┤
│  Name:     Ahmed Al Rashidi                                      │
│  Email:    ahmed@company.ae            [📧 Reply by Email]       │
│  Phone:    +971 50 123 4567            [📱 WhatsApp]             │
│  Service:  Sports Facilities                                     │
├──────────────────────────────────────────────────────────────────┤
│  Message:                                                        │
│  "We are looking for a tennis court installation for our         │
│   school in Jumeirah. Please contact us with pricing."          │
├──────────────────────────────────────────────────────────────────┤
│  Admin Notes:                                                    │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Followed up by phone on 30 Jul...                         │  │
│  └────────────────────────────────────────────────────────────┘  │
│                                                                  │
│  [Mark as Read]   [Mark as Replied]   [Save Notes]              │
└──────────────────────────────────────────────────────────────────┘
```

### Stats (Inline Edit)
```
┌──────────────────────────────────────────────────────────────────┐
│  Stats & Numbers                              [+ Add Stat]        │
├─────┬──────────────────────┬───────┬────────┬────────────────────┤
│  ≡  │  Label               │ Value │ Suffix │ Actions            │
├─────┼──────────────────────┼───────┼────────┼────────────────────┤
│  ⠿  │  Projects Completed  │  500  │   +    │  Edit  Delete      │
│  ⠿  │  Years Experience    │   10  │   +    │  Edit  Delete      │
│  ⠿  │  Happy Clients       │  350  │   +    │  Edit  Delete      │
│  ⠿  │  Expert Team Members │   50  │   +    │  Edit  Delete      │
└─────┴──────────────────────┴───────┴────────┴────────────────────┘
```

### Site Settings (Tabbed Page)
```
[Company Info] [Homepage Hero] [Contact CTA] [SEO] [Social Links]

Tab: Company Info
  Company Full Name      Short Name
  Tagline                Description (textarea)
  Phone (Landline)       Mobile / WhatsApp
  Email Address          WhatsApp Number (digits)
  Address Line 1         Address Line 2
  Google Maps Embed URL (textarea)
  [Save Changes ─────▶]

Tab: Homepage Hero
  Hero Headline          Hero Highlight Word
  Hero Subtitle
  CTA Button 1 Label     CTA Button 1 URL
  CTA Button 2 Label     CTA Button 2 URL
  Hero Background Image (ImageField)
  [Save Changes ─────▶]

Tab: Contact CTA Section
  Headline               Highlight Word
  Subtitle
  [Save Changes ─────▶]

Tab: SEO
  Home Title         Home Meta Description
  About Title        About Meta Description
  Services Title     Services Meta Description
  Portfolio Title    Portfolio Meta Description
  Contact Title      Contact Meta Description
  [Save Changes ─────▶]

Tab: Social Links
  WhatsApp URL      LinkedIn URL
  Instagram URL     Facebook URL
  [Save Changes ─────▶]
```

### About Page Content (Tabbed Page)
```
[Story] [Services List] [Vision & Mission]

Tab: Story
  Story Heading
  Story Paragraph 1 (textarea)
  Story Paragraph 2 (textarea)
  Story Image (ImageField)
  Badge Number (e.g. "10+")     Badge Label (e.g. "Years in UAE")
  [Save Changes ─────▶]

Tab: Capability List
  (RepeaterField: 8 capability text items, drag to reorder)
  [Save Changes ─────▶]

Tab: Vision & Mission
  Vision Heading      Vision Text (textarea)
  Mission Heading
  Mission Items (RepeaterField: text items)
  [Save Changes ─────▶]
```

### Why Choose Us / Core Values (same layout)
```
┌─────┬────────────┬─────────────────────────┬──────┬───────────┐
│  ≡  │  Icon      │  Title                  │  ●   │  Actions  │
├─────┼────────────┼─────────────────────────┼──────┼───────────┤
│  ⠿  │ trophy     │ Quality First           │  ●   │ Edit  Del │
│  ⠿  │ lightbulb  │ Innovation              │  ●   │ Edit  Del │
└─────┴────────────┴─────────────────────────┴──────┴───────────┘
[+ Add Item]

Edit modal / page:
  Icon * (heroicon name, with live preview)
  Title *
  Description (textarea)
  Active (Toggle)    Sort Order (number)
```

### Team Contacts
```
┌─────┬────────────┬───────────┬────────────────┬──────┬─────────┐
│  ≡  │  Avatar    │  Name     │  Role          │  ●   │ Actions │
├─────┼────────────┼───────────┼────────────────┼──────┼─────────┤
│  ⠿  │  [M]       │  Mosa     │ Project Manager│  ●   │ Edit Del│
│  ⠿  │  [I]       │  General  │ General Inquir.│  ●   │ Edit Del│
└─────┴────────────┴───────────┴────────────────┴──────┴─────────┘

Edit:
  Initial (1 char) — live avatar preview with gradient
  Name *    Role    Email
  Gradient (select: navy/gold/green/etc.)
  Active (Toggle)    Sort Order (number)
```

### Admin Users
```
┌────────────────┬────────────────────────┬──────────────┬────────┐
│  Name          │  Email                 │  Created     │ Actions│
├────────────────┼────────────────────────┼──────────────┼────────┤
│  Amir          │  amir@jonith...        │  29 Jul 2026 │  Edit  │
└────────────────┴────────────────────────┴──────────────┴────────┘
[+ Invite Admin]

Edit: Name   Email   New Password (optional)   Confirm Password
```

---

## 8. Admin Routes (`routes/admin.php`)

```php
<?php
// All routes grouped under /admin prefix + auth:admin middleware

Route::prefix('admin')->name('admin.')->group(function () {

    // ── Auth ────────────────────────────────────────────────────
    Route::get('/login',  [LoginController::class,  'show'])->name('login');
    Route::post('/login', [LoginController::class,  'login']);
    Route::post('/logout',[LogoutController::class, 'logout'])->name('logout');

    // ── Protected ───────────────────────────────────────────────
    Route::middleware('auth:admin')->group(function () {

        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        // Services
        Route::resource('services',     Admin\ServiceController::class);
        Route::resource('sub-services', Admin\SubServiceController::class);
        Route::patch('services/{service}/toggle-active',
                    [Admin\ServiceController::class, 'toggleActive'])->name('services.toggle');
        Route::patch('services/{service}/toggle-featured',
                    [Admin\ServiceController::class, 'toggleFeatured'])->name('services.featured');
        Route::post('services/reorder',
                    [Admin\ServiceController::class, 'reorder'])->name('services.reorder');

        // Projects
        Route::resource('projects', Admin\ProjectController::class);
        Route::post('projects/reorder', [Admin\ProjectController::class, 'reorder'])
             ->name('projects.reorder');

        // Testimonials
        Route::resource('testimonials', Admin\TestimonialController::class);
        Route::post('testimonials/reorder', [Admin\TestimonialController::class, 'reorder'])
             ->name('testimonials.reorder');

        // Stats
        Route::resource('stats', Admin\StatController::class)->except(['show']);
        Route::post('stats/reorder', [Admin\StatController::class, 'reorder'])
             ->name('stats.reorder');

        // Contacts (inbox — no create/update conventional form)
        Route::get('contacts',                [Admin\ContactController::class, 'index'])
             ->name('contacts.index');
        Route::get('contacts/{contact}',      [Admin\ContactController::class, 'show'])
             ->name('contacts.show');
        Route::patch('contacts/{contact}/status',
                    [Admin\ContactController::class, 'updateStatus'])->name('contacts.status');
        Route::patch('contacts/{contact}/notes',
                    [Admin\ContactController::class, 'updateNotes'])->name('contacts.notes');
        Route::get('contacts/export',         [Admin\ContactController::class, 'export'])
             ->name('contacts.export');

        // Why Choose Us
        Route::resource('why-choose', Admin\WhyChooseController::class)->except(['show']);
        Route::post('why-choose/reorder', [Admin\WhyChooseController::class, 'reorder'])
             ->name('why-choose.reorder');

        // Core Values
        Route::resource('core-values', Admin\CoreValueController::class)->except(['show']);
        Route::post('core-values/reorder', [Admin\CoreValueController::class, 'reorder'])
             ->name('core-values.reorder');

        // Team
        Route::resource('team', Admin\TeamContactController::class)->except(['show']);
        Route::post('team/reorder', [Admin\TeamContactController::class, 'reorder'])
             ->name('team.reorder');

        // Settings (single page, save by group)
        Route::get('settings',          [Admin\SettingController::class, 'index'])
             ->name('settings.index');
        Route::put('settings/{group}',  [Admin\SettingController::class, 'update'])
             ->name('settings.update');

        // About page content (single page, save by section)
        Route::get('about',             [Admin\AboutController::class, 'index'])
             ->name('about.index');
        Route::put('about/{section}',   [Admin\AboutController::class, 'update'])
             ->name('about.update');

        // Admin users
        Route::resource('users', Admin\UserController::class)->except(['show']);

        // Image upload (shared endpoint)
        Route::post('upload', [Admin\UploadController::class, 'store'])
             ->name('upload');
    });
});
```

---

## 9. Public Routes (`routes/web.php`)

```php
<?php
Route::get('/',                          [Public\HomeController::class,      'index'])->name('home');
Route::get('/about',                     [Public\AboutController::class,     'index'])->name('about');
Route::get('/services',                  [Public\ServiceController::class,   'index'])->name('services.index');
Route::get('/services/{slug}',           [Public\ServiceController::class,   'show'])->name('services.show');
Route::get('/services/{slug}/{subSlug}', [Public\ServiceController::class,   'subShow'])->name('services.sub');
Route::get('/portfolio',                 [Public\PortfolioController::class, 'index'])->name('portfolio.index');
Route::get('/portfolio/{slug}',          [Public\PortfolioController::class, 'show'])->name('portfolio.show');
Route::get('/contact',                   [Public\ContactController::class,   'index'])->name('contact.index');
Route::post('/contact',                  [Public\ContactController::class,   'store'])->name('contact.store');
```

---

## 10. Inertia Shared Props (Middleware)

```php
// app/Http/Middleware/HandleInertiaRequests.php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'company' => cache()->remember('settings.company', 3600, fn() =>
            Setting::where('group', 'company')->pluck('value', 'key')
        ),
        'seo' => cache()->remember('settings.seo', 3600, fn() =>
            Setting::where('group', 'seo')->pluck('value', 'key')
        ),
        'navServices' => cache()->remember('nav.services', 3600, fn() =>
            Service::active()->ordered()->select('slug','title')->get()
        ),
        'flash' => [
            'success' => session('flash.success'),
            'error'   => session('flash.error'),
        ],
        // Admin-only shared (only on /admin routes)
        'adminUser' => $request->is('admin*')
            ? optional($request->user())->only('id','name','email')
            : null,
        'unreadContacts' => $request->is('admin*')
            ? cache()->remember('contacts.unread', 60, fn() =>
                Contact::where('status','new')->count()
              )
            : null,
    ]);
}
```

---

## 11. Package List

### Laravel (composer.json)
```json
{
  "require": {
    "laravel/framework": "^11.0",
    "inertiajs/inertia-laravel": "^2.0",
    "tightenco/ziggy": "^2.0",
    "spatie/laravel-sitemap": "^7.0"
  }
}
```
No Filament. No Nova. No third-party admin.

### Node (package.json) — delta from current
```
ADD:
  @inertiajs/react           ^2.0
  @dnd-kit/core              ^6.0    ← drag-and-drop
  @dnd-kit/sortable          ^7.0
  recharts                   ^2.12   ← dashboard chart
  date-fns                   ^3.0    ← date formatting in admin

REMOVE:
  react-router-dom           (Inertia handles routing)
  emailjs-com                (Laravel Mail replaces)
```

---

## 12. Phase-by-Phase Implementation

---

<<<<<<< HEAD
### PHASE 1 — Laravel + Inertia Foundation
**Goal:** New Laravel project running with Inertia + React, Vite building, no errors.
**Duration:** Days 1–3

#### Tasks
- [ ] `composer create-project laravel/laravel jonith-bogdad`
- [ ] `composer require inertiajs/inertia-laravel tightenco/ziggy`
- [ ] Configure `.env` (DB name, credentials, app URL, mail placeholders)
- [ ] Install Node packages: `npm install @inertiajs/react @dnd-kit/core @dnd-kit/sortable recharts date-fns`
- [ ] Remove `react-router-dom` and `emailjs-com` from package.json
- [ ] Configure `vite.config.js`:
  ```js
  import laravel from 'laravel-vite-plugin'
  import react from '@vitejs/plugin-react'
  export default defineConfig({
    plugins: [
      laravel({ input: ['resources/js/app.jsx'], refresh: true }),
      react(),
    ],
  })
  ```
- [ ] Update `tailwind.config.js` content paths to include `resources/js/**/*.jsx`
- [ ] Create `resources/views/app.blade.php` (Inertia root template)
- [ ] Create `resources/js/app.jsx` (Inertia bootstrap with `createInertiaApp`)
- [ ] Copy all existing React files from `src/` → `resources/js/` (components/, pages/, utils/, styles/)
- [ ] Create placeholder `pages/Admin/Login.jsx` and `pages/Admin/Dashboard.jsx`
- [ ] `npm run dev` — confirm Vite builds clean
- [ ] `php artisan serve` — confirm base page loads in browser

#### Deliverable
Vite building, Inertia responding, all existing React components available.

---

### PHASE 2 — Database, Models & Seeders
**Goal:** All 14 tables created, Eloquent models ready, all existing static data seeded.
**Duration:** Days 3–7

#### Migrations (create in this order)
- [ ] `create_users_table` (add `is_admin` column)
- [ ] `create_services_table`
- [ ] `create_sub_services_table`
- [ ] `create_projects_table`
- [ ] `create_project_images_table`
- [ ] `create_testimonials_table`
- [ ] `create_stats_table`
- [ ] `create_contacts_table`
- [ ] `create_team_contacts_table`
- [ ] `create_settings_table`
- [ ] `create_about_content_table`
- [ ] `create_why_choose_items_table`
- [ ] `create_core_values_table`
- [ ] `php artisan migrate` — all tables created, zero errors

#### Models
- [ ] `Service` — casts: highlights/key_features/process → array; scopes: active, ordered, featured
- [ ] `SubService` — casts: highlights/features/gallery → array; belongsTo Service
- [ ] `Project` — casts: tags → array; hasMany ProjectImage; scopes: active, featured, ordered
- [ ] `ProjectImage` — belongsTo Project
- [ ] `Testimonial` — scopes: active, ordered
- [ ] `Stat` — scope: ordered
- [ ] `Contact` — scope: new (where status=new)
- [ ] `TeamContact` — scopes: active, ordered
- [ ] `Setting` — static helper: `Setting::get('company.phone')`
- [ ] `AboutContent` — static helper: `AboutContent::get('story.paragraph_1')`
- [ ] `WhyChooseItem` — scopes: active, ordered
- [ ] `CoreValue` — scopes: active, ordered
- [ ] `User` — add `is_admin` bool cast

#### Seeders (seed from existing static data files)
- [ ] `ServiceSeeder` — 8 services from `services.data.js`
- [ ] `SubServiceSeeder` — 30 sub-services (run inside ServiceSeeder)
- [ ] `ProjectSeeder` — 8 projects + images from `projects.data.js`
- [ ] `TestimonialSeeder` — 4 testimonials from `testimonials.data.js`
- [ ] `StatSeeder` — 4 stats from `stats.data.js`
- [ ] `SettingSeeder` — all COMPANY constants from `constants.js` → settings table
- [ ] `AboutContentSeeder` — story text, vision, mission, capability list from `About.jsx`
- [ ] `WhyChooseSeeder` — Why Choose Us cards (extract from `WhyChooseUsSection.jsx`)
- [ ] `CoreValueSeeder` — 4 core values from `About.jsx`
- [ ] `TeamContactSeeder` — Mosa + General Info from `Contact.jsx`
- [ ] `AdminUserSeeder` — create first admin user from `.env` values
- [ ] `php artisan db:seed` — all seeders pass, verify row counts in each table

#### Deliverable
`php artisan tinker` → `Service::with('subServices')->count()` → 8, `SubService::count()` → 30

---

### PHASE 3 — Public Site Controllers
**Goal:** All 9 public pages return correct Inertia renders with real DB data.
**Duration:** Days 7–10

#### Controllers
- [ ] `Public\HomeController::index`
  - Props: `services` (featured, with subServices), `projects` (featured, 6), `stats`, `testimonials`, `whyChooseItems`
- [ ] `Public\AboutController::index`
  - Props: `stats`, `coreValues`, `about` (pluck value,key from about_content)
- [ ] `Public\ServiceController::index`
  - Props: `services` (all active, with subServices)
- [ ] `Public\ServiceController::show($slug)`
  - Props: `service` (with active subServices) or 404
- [ ] `Public\ServiceController::subShow($slug, $subSlug)`
  - Props: `service`, `subService` or 404
- [ ] `Public\PortfolioController::index`
  - Props: `projects`, `activeCategory`, `categories` (distinct list)
  - Accept `?category=` query string
- [ ] `Public\PortfolioController::show($slug)`
  - Props: `project` (with images) or 404
- [ ] `Public\ContactController::index`
  - Props: none (company + navServices come from shared middleware)
- [ ] `Public\ContactController::store`
  - Validate via `ContactFormRequest`
  - Create `Contact` record
  - Dispatch `ContactInquiryMail` and `ContactAutoReplyMail`
  - Return `back()->with('flash', ['success' => true])`
- [ ] `HandleInertiaRequests::share` — company, seo, navServices, flash, adminUser, unreadContacts
- [ ] Register all public routes in `web.php`
- [ ] Include `admin.php` routes in `RouteServiceProvider`

#### Validation
- [ ] Visit every public URL in browser — page renders, correct data, no errors
- [ ] `dd()` one controller to confirm props structure matches what React expects

#### Deliverable
All 9 public routes respond with correct Inertia JSON props.

---

### PHASE 4 — Public Site React Migration
**Goal:** All public pages work with DB data, zero static `.data.js` imports remain.
**Duration:** Days 10–15

#### App Entry Point
- [ ] `resources/js/app.jsx` — `createInertiaApp` with `import.meta.glob('./pages/**/*.jsx')`
- [ ] Remove `BrowserRouter`, `Routes`, `Route` wrappers (Inertia handles routing)

#### Page Migrations
For each page below, the change is: **remove static data import → use `usePage().props`**

- [ ] `Home.jsx` — destructure `{ services, projects, stats, testimonials, whyChooseItems }` from `usePage().props`; pass to child sections
- [ ] `HeroSection.jsx` — consume `company` from shared props for hero text & image
- [ ] `StatsSection.jsx` — consume `stats` prop (passed from Home/About)
- [ ] `ServicesSection.jsx` — consume `services` prop
- [ ] `WhyChooseUsSection.jsx` — consume `whyChooseItems` prop
- [ ] `PortfolioSection.jsx` — consume `projects` prop
- [ ] `TestimonialsSection.jsx` — consume `testimonials` prop
- [ ] `About.jsx` — consume `{ stats, coreValues, about }` from props; replace 3 hardcoded arrays
- [ ] `Services.jsx` — consume `{ services }` from props
- [ ] `ServiceDetail.jsx` — remove `useParams` + `find()`; consume `{ service }` from props
- [ ] `SubServiceDetail.jsx` — remove `useParams` + `find()`; consume `{ service, subService }` from props
- [ ] `Portfolio.jsx` — consume `{ projects, activeCategory, categories }`; implement Inertia category filter:
  ```jsx
  router.get('/portfolio', { category }, { preserveState: true, replace: true })
  ```
- [ ] `ProjectDetail.jsx` — remove `useParams`; consume `{ project }` from props
- [ ] `Contact.jsx` — replace EmailJS with Inertia `useForm`; consume `flash.success` for success state
- [ ] `Navbar.jsx` — replace `NAV_LINKS` constant with `navServices` from shared props
- [ ] `Footer.jsx` — replace `COMPANY` constant with `company` from shared props
- [ ] `ContactCTASection.jsx` — consume CTA text from `company`/settings shared props
- [ ] Add `<Head>` SEO tags to every page using `seo` shared props

#### Link / Navigation
- [ ] Replace all `<Link to="...">` with `<Link href="...">`
- [ ] Replace `useNavigate()` calls with `router.visit('...')`
- [ ] Remove `import { ... } from 'react-router-dom'` from every file

#### Cleanup
- [ ] Delete `src/data/*.data.js` (data now in MySQL)
- [ ] Delete `src/services/*.js` (replaced by controllers)
- [ ] Remove `react-router-dom` from package.json
- [ ] Remove `emailjs-com` from package.json
- [ ] `npm run build` — zero errors, zero warnings about removed packages

#### Deliverable
Full public site works end-to-end with DB data. Framer Motion animations unchanged.
react-countup stats, Swiper carousel, lightbox all verified working.

---

### PHASE 5 — Admin Authentication
**Goal:** Secure admin login/logout working with custom React login page.
**Duration:** Days 15–17

#### Laravel Auth Setup
- [ ] Create `EnsureIsAdmin` middleware: checks `$request->user()->is_admin === true`
- [ ] Register middleware in `bootstrap/app.php` as `'auth.admin'`
- [ ] `Admin\Auth\LoginController`:
  - `show()` → `Inertia::render('Admin/Login', ['error' => session('error')])`
  - `login()` → validate email+password, `Auth::attempt()`, check `is_admin`, redirect to `/admin`
  - On failure: `back()->with('error', 'Invalid credentials or not an admin')`
- [ ] `Admin\Auth\LogoutController::logout()` → `Auth::logout()`, redirect `/admin/login`
- [ ] Protect all `/admin/*` routes (except login) with `auth` + `EnsureIsAdmin` middleware
- [ ] Guest middleware on login route (redirect to dashboard if already logged in)

#### React Login Page (`pages/Admin/Login.jsx`)
- [ ] Full-screen dark navy background (`bg-[#0F1D35]`)
- [ ] Subtle diagonal line pattern via CSS background
- [ ] Centered white card (max-w-md, rounded-2xl, shadow-2xl)
- [ ] Company logo / wordmark at top of card
- [ ] `useForm` from `@inertiajs/react` for email + password + remember
- [ ] Error message display (from flash or `form.errors`)
- [ ] Gold submit button with loading spinner while `form.processing`
- [ ] No public Navbar/Footer — standalone page, no `AdminLayout` (login is outside the shell)

#### Test
- [ ] Navigate to `/admin` → redirects to `/admin/login`
- [ ] Submit wrong credentials → error shown, stays on login
- [ ] Submit correct admin credentials → redirects to `/admin` (Dashboard)
- [ ] Non-admin user credentials → error "not an admin"
- [ ] Click logout → redirects to `/admin/login`

#### Deliverable
Secure admin auth gate with branded login page.

---

### PHASE 6 — Admin Layout Shell
**Goal:** `AdminLayout.jsx` component working with sidebar, header, and active nav states.
**Duration:** Days 17–19

#### `AdminLayout.jsx`
```jsx
export default function AdminLayout({ children, title }) {
  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader title={title} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
```

#### `AdminSidebar.jsx`
- [ ] Fixed 240px dark navy sidebar (`bg-[#0F1D35]`)
- [ ] Company logo + "Admin Panel" text at top
- [ ] Navigation groups: Content / Inbox / Configuration
- [ ] Each nav item: icon + label, hover state, active state (gold left border + gold text)
- [ ] Active detection: `usePage().url` compared to item href
- [ ] Inquiries item shows red badge with `unreadContacts` count from shared props
- [ ] "View Site" external link and "Sign Out" at bottom

#### `AdminHeader.jsx`
- [ ] Top bar with page title (prop)
- [ ] Breadcrumb navigation
- [ ] Admin name + avatar initials
- [ ] Dropdown: Profile, View Site, Sign Out

#### `DataTable.jsx` (reusable)
- [ ] Props: `columns`, `data`, `searchable`, `pagination`
- [ ] Client-side search filter by searchable columns
- [ ] Pagination (10 rows per page, prev/next)
- [ ] Bulk select checkboxes (for future bulk actions)
- [ ] Empty state with illustration

#### `FormCard.jsx`, `ImageField.jsx`, `RepeaterField.jsx`, `SortableList.jsx`, `ConfirmModal.jsx`
- [ ] Build each reusable component (see Section 5.3)

#### Test
- [ ] Navigate to `/admin` → Dashboard renders inside AdminLayout
- [ ] Sidebar nav items highlight correctly for each admin page
- [ ] Unread contacts badge shows correct count
- [ ] Logout works from sidebar and header dropdown

#### Deliverable
Full admin shell renders correctly; all reusable components built and ready.

---

### PHASE 7 — Admin Dashboard
**Goal:** Dashboard page with 4 stat cards, inquiry chart, recent contacts, quick actions.
**Duration:** Days 19–21

#### `Admin\DashboardController::index`
```php
return Inertia::render('Admin/Dashboard', [
    'stats' => [
        'services'         => Service::active()->count(),
        'projects'         => Project::active()->count(),
        'newContacts'      => Contact::where('status','new')->count(),
        'totalContacts'    => Contact::count(),
        'testimonials'     => Testimonial::active()->count(),
    ],
    'chartData'      => Contact::selectRaw('DATE(created_at) as date, COUNT(*) as total')
                          ->where('created_at', '>=', now()->subDays(30))
                          ->groupBy('date')->orderBy('date')->get(),
    'recentContacts' => Contact::latest()->take(5)
                          ->select('id','name','service','status','created_at')->get(),
]);
```

#### `pages/Admin/Dashboard.jsx`
- [ ] 4 `StatCard` components (Services, Projects, Inquiries with red highlight if >0, Reviews)
- [ ] `InquiryChart` — Recharts `BarChart` with 30-day data, navy bars, gold highlight on hover
- [ ] "Recent Inquiries" list with name, service, time-ago, `StatusBadge`, link to detail
- [ ] Quick Actions: 3 gold-outline buttons (+ Service, + Project, + Testimonial) + "View Site ↗"
- [ ] Greeting with current date

#### Deliverable
Dashboard shows live data, chart animates in, recent contacts link to detail pages.

---

### PHASE 8 — Admin Content Management (Services & Projects)
=======
### PHASE 1 — Laravel + Inertia Foundation ✅ COMPLETE
**Goal:** New Laravel project running with Inertia + React, Vite building, no errors.
**Duration:** Days 1–3 | **Completed:** 2026-07-29

#### Tasks
- [x] `composer create-project laravel/laravel jonith-bogdad`
- [x] `composer require inertiajs/inertia-laravel tightenco/ziggy`
- [x] Configure `.env` (app name, DB placeholder)
- [x] Install Node packages (all deps + devDeps including @inertiajs/react, @dnd-kit, recharts, date-fns, framer-motion, swiper, heroicons, etc.)
- [x] NOTE: `react-router-dom` and `emailjs-com` kept in Phase 1; removed in Phase 4 when pages migrate
- [x] Configure `vite.config.js` (React plugin + `@` alias for `resources/js`)
- [x] Configure `tailwind.config.js` (brand colours: primary/accent/dark + admin navy/gold, content paths)
- [x] Create `resources/views/app.blade.php` (Inertia root template with Google Fonts)
- [x] Create `app/Http/Middleware/HandleInertiaRequests.php` (flash + ziggy shared)
- [x] Register HandleInertiaRequests in `bootstrap/app.php`
- [x] Create `resources/js/app.jsx` (Inertia bootstrap, glob resolver, gold progress bar)
- [x] Copy all existing React files from `src/` → `resources/js/` (components/, pages/, utils/, styles/)
- [x] Create `resources/js/pages/Welcome.jsx` (Phase 1 status page)
- [x] Create `pages/Admin/Login.jsx` (full navy/gold design, useForm)
- [x] Create `pages/Admin/Dashboard.jsx` (placeholder with AdminLayout)
- [x] Create `components/admin/AdminLayout.jsx`, `AdminSidebar.jsx`, `AdminHeader.jsx`
- [x] Update `routes/web.php` (WelcomeController + admin placeholder routes)
- [x] Create `app/Http/Controllers/WelcomeController.php`
- [x] `npm run build` — ✓ 1920 modules, 0 errors, 7.81s build

#### Deliverable
✅ Vite building (867 kB bundle), Inertia responding, admin shell live at `/admin`.

---

### PHASE 2 — Database, Models & Seeders ✅ COMPLETE
**Goal:** All 14 tables created, Eloquent models ready, all existing static data seeded.
**Duration:** Days 3–7 | **Completed:** 2026-07-29

#### Migrations (13 migrations + users modified)
- [x] `create_users_table` — added `is_admin` boolean column
- [x] `create_services_table`
- [x] `create_sub_services_table`
- [x] `create_projects_table`
- [x] `create_project_images_table`
- [x] `create_testimonials_table`
- [x] `create_stats_table`
- [x] `create_contacts_table`
- [x] `create_team_contacts_table`
- [x] `create_settings_table` (group+key unique, type enum)
- [x] `create_about_content_table` (section+key unique — `$table = 'about_content'` on model)
- [x] `create_why_choose_items_table`
- [x] `create_core_values_table`
- [x] `php artisan migrate:fresh` — all 16 tables created, zero errors

#### Models (12 domain models + User updated)
- [x] `Service` — casts: highlights/key_features/process → array; scopes: active, ordered, featured
- [x] `SubService` — casts: highlights/features/gallery → array; belongsTo Service
- [x] `Project` — casts: tags → array; hasMany ProjectImage; scopes: active, featured, ordered
- [x] `ProjectImage` — belongsTo Project; `$timestamps = false`
- [x] `Testimonial` — scopes: active, ordered
- [x] `Stat` — scope: ordered; `$timestamps = false`
- [x] `Contact` — scopeUnread, markRead(), markReplied()
- [x] `TeamContact` — scopes: active, ordered
- [x] `Setting` — `Setting::get('company.phone')`, `Setting::group('company')`, `Setting::set()`
- [x] `AboutContent` — `AboutContent::get('story.paragraph_1')`, `AboutContent::section()`
- [x] `WhyChooseItem` — scopes: active, ordered
- [x] `CoreValue` — scopes: active, ordered
- [x] `User` — `is_admin` added to fillable + boolean cast

#### Seeders (10 seeders — all pass)
- [x] `StatSeeder` — 4 stats ✓
- [x] `SettingSeeder` — 20 settings (company/hero/cta groups) ✓
- [x] `AboutContentSeeder` — 16 entries (story/capabilities/vision/mission) ✓
- [x] `WhyChooseSeeder` — 6 why-choose items ✓
- [x] `CoreValueSeeder` — 4 core values ✓
- [x] `TeamContactSeeder` — 2 team contacts (Mosa + General Info) ✓
- [x] `TestimonialSeeder` — 4 testimonials ✓
- [x] `ServiceSeeder` — 8 services + 29 sub-services ✓
- [x] `ProjectSeeder` — 8 projects + 9 images ✓
- [x] `AdminUserSeeder` — admin@jonith-bogdad.com (is_admin=true) ✓

#### Deliverable ✅
`Setting::get('company.phone')` → `+971 4 334 2290`
`Service::with('subServices')->count()` → 8, `SubService::count()` → 29

---

### PHASE 3 — Public Site Controllers ✅ COMPLETE
**Goal:** All 9 public pages return correct Inertia renders with real DB data.
**Duration:** Days 7–10 | **Completed:** 2026-07-29

#### Controllers
- [x] `Public\HomeController::index`
  - Props: `services` (featured, with subServices), `projects` (featured, 6), `stats`, `testimonials`, `whyChooseItems`, `hero`
- [x] `Public\AboutController::index`
  - Props: `stats`, `coreValues`, `about` (pluck value,key from about_content)
- [x] `Public\ServiceController::index`
  - Props: `services` (all active, with subServices), `categories`
- [x] `Public\ServiceController::show($slug)`
  - Props: `service` (with active subServices), `others`, `company` or 404
- [x] `Public\ServiceController::subShow($slug, $subSlug)`
  - Props: `service`, `subService`, `company` or 404
- [x] `Public\PortfolioController::index`
  - Props: `projects`, `activeCategory`, `categories` (distinct list)
  - Accepts `?category=` query string
- [x] `Public\PortfolioController::show($slug)`
  - Props: `project` (with images) or 404
- [x] `Public\ContactController::index`
  - Props: `teamContacts` (company + navServices from shared middleware)
- [x] `Public\ContactController::store`
  - Validates via `ContactFormRequest`
  - Creates `Contact` record in DB
  - Returns `back()->with('flash.success', '...')`
- [x] `HandleInertiaRequests::share` — company, seo, navServices, flash, adminUser, unreadContacts
- [x] All public routes registered in `web.php`
- [x] `admin.php` included via `bootstrap/app.php` `then:` callback

#### Eloquent API Resources
- [x] `ServiceResource` — snake_case → camelCase; serializes to plain array (not `{data:[...]}`)
- [x] `SubServiceResource`
- [x] `ProjectResource`

#### Deliverable ✅
All 9 public routes respond with correct Inertia JSON props; browser verified.

---

### PHASE 4 — Public Site React Migration ✅ COMPLETE
**Goal:** All public pages work with DB data, zero static `.data.js` imports remain.
**Duration:** Days 10–15 | **Completed:** 2026-07-29

#### App Entry Point
- [x] `resources/js/app.jsx` — `createInertiaApp` with `import.meta.glob('./pages/**/*.jsx')`
- [x] `BrowserRouter`/`Routes`/`Route` removed — Inertia handles all routing

#### Page Migrations
- [x] `Home.jsx` — destructures `{ services, projects, stats, testimonials, whyChooseItems, hero }` from `usePage().props`
- [x] `HeroSection.jsx` — consumes `hero` prop + `company` from shared props; `Link href`, `company.whatsapp_url`
- [x] `StatsSection.jsx` — accepts `stats = []` prop; uses `HeroIcon` for DB icon names; `useCountUp`
- [x] `ServicesSection.jsx` — accepts `services = []` prop; defensive guard for `services?.data ?? []`
- [x] `WhyChooseUsSection.jsx` — accepts `whyChooseItems = []` prop; `<HeroIcon name={item.icon} />`
- [x] `PortfolioSection.jsx` — accepts `projects = []` prop; `Link href`
- [x] `TestimonialsSection.jsx` — accepts `testimonials = []` prop; returns `null` if empty
- [x] `About.jsx` — consumes `{ stats, coreValues, about }` from props; `HeroIcon` for core values
- [x] `Services.jsx` — consumes `{ services, categories }` from props; local filter state
- [x] `ServiceDetail.jsx` — no `useParams`; consumes `{ service, others, company }` from props
- [x] `SubServiceDetail.jsx` — no `useParams`; consumes `{ service, subService, company }` from props
- [x] `Portfolio.jsx` — consumes `{ projects, categories, activeCategory }`; partial reload:
  ```jsx
  router.get('/portfolio', { category }, { preserveState: true, replace: true, only: ['projects','activeCategory'] })
  ```
- [x] `ProjectDetail.jsx` — no `useParams`; consumes `{ project }` from props
- [x] `Contact.jsx` — Inertia `useForm` replaces EmailJS; `post('/contact')`; `flash.success` for success state
- [x] `Navbar.jsx` — `navServices` from shared props; `usePage().url` for active detection; `router.on('navigate',...)`
- [x] `Footer.jsx` — `company` from shared props; all 4 columns dynamic
- [x] `PageLayout.jsx` — `usePage().component` as AnimatePresence key (replaces `useLocation`)

#### Link / Navigation
- [x] All `<Link to="...">` → `<Link href="...">`
- [x] All `useNavigate()` → `router.visit('...')`
- [x] All `react-router-dom` imports removed

#### Cleanup
- [x] Deleted `resources/js/data/*.data.js` (4 files)
- [x] Deleted `resources/js/services/*.js` (4 files)
- [x] Deleted `components/ui/ScrollToTop.jsx`
- [x] `react-router-dom` uninstalled from package.json
- [x] `emailjs-com` uninstalled from package.json

#### Key Patterns
- `usePage().props` — all page data; `usePage().url` — active route detection; `usePage().component` — AnimatePresence key
- `HeroIcon.jsx` helper resolves both PascalCase (`StarIcon`) and kebab-case (`check-badge`) DB icon names
- Defensive guard: `(Array.isArray(services) ? services : services?.data ?? [])` in ServicesSection

#### Deliverable ✅
Full public site works end-to-end with DB data. Framer Motion, Swiper carousel, countup all verified. Original design 100% preserved — only data sources and routing primitives changed.

---

### PHASE 5 — Admin Authentication ✅ COMPLETE
**Goal:** Secure admin login/logout working with custom React login page.
**Duration:** Days 15–17 | **Completed:** 2026-07-29

#### Laravel Auth Setup
- [x] `EnsureIsAdmin` middleware — checks auth + `is_admin`; saves `url.intended` in session; logs out non-admins
- [x] Registered in `bootstrap/app.php` as `'auth.admin'` alias
- [x] `Admin\Auth\LoginController`:
  - `show()` — redirects to dashboard if already admin; else renders `Admin/Login`
  - `login()` — validates email+password, `Auth::attempt()`, checks `is_admin`, regenerates session, restores `url.intended`
  - Non-admin user is logged out with error on `email` field (handled by `useForm.errors`)
- [x] `Admin\Auth\LogoutController` (single-action) — `Auth::logout()`, invalidate, regenerateToken, redirect to login
- [x] All `/admin/*` routes (except login/logout) protected by `auth.admin` middleware
- [x] `DashboardController::index` stub — `Inertia::render('Admin/Dashboard')`

#### Routes (`routes/admin.php`)
- [x] `GET /admin/login` → `LoginController@show` (name: `admin.login`)
- [x] `POST /admin/login` → `LoginController@login` (name: `admin.login.store`)
- [x] `POST /admin/logout` → `LogoutController` (name: `admin.logout`)
- [x] `GET /admin/dashboard` → `DashboardController@index` (protected, name: `admin.dashboard`)
- [x] `GET /admin` → redirect to `/admin/dashboard`

#### React Login Page (`pages/Admin/Login.jsx`)
- [x] Full-screen dark navy + gradient orbs background
- [x] Company logo + "Admin Portal" heading
- [x] `useForm` from `@inertiajs/react` — email, password, remember fields
- [x] `errors.email` display for auth failures (no page-prop errors — all via `useForm`)
- [x] Gold submit button with spin animation while `processing`
- [x] "← Back to Website" link; no Navbar/Footer

#### Admin Credentials
- Email: `admin@jonith-bogdad.com` | Password: `Admin@123!`

#### Deliverable ✅
Secure admin auth gate with branded login page. Unauthenticated `/admin` redirects to login, restores intended URL after login.

---

### PHASE 6 — Admin Layout Shell ✅ COMPLETE
**Goal:** `AdminLayout.jsx` component working with sidebar, header, and active nav states.
**Duration:** Days 17–19 | **Completed:** 2026-07-29

#### `AdminLayout.jsx` ✅
- [x] Flex h-screen layout: sidebar (fixed 256px) + main column (flex-col overflow)
- [x] Inline `FlashMessages` sub-component — shows `flash.success` / `flash.error` above page content
- [x] `AdminSidebar` and `AdminHeader` pull their own data from `usePage()` — no prop drilling

#### `AdminSidebar.jsx` ✅
- [x] 256px dark navy sidebar (`bg-gradient-admin`)
- [x] Company logo + "Admin Panel" label at top
- [x] 4 nav groups: Overview / Content / Inbox / Configuration
- [x] Full nav: Dashboard, Services, Projects, Testimonials, Why Choose, Core Values, Team, Stats, Inquiries, About Page, Settings, Admin Users
- [x] Active detection: `usePage().url` with `startsWith(href + '/')` for sub-paths
- [x] Gold active state (`bg-admin-gold text-admin-navy`)
- [x] Inquiries badge — red pill with `unreadContacts` count from shared props
- [x] "View Site ↗" external link at bottom
- [x] "Sign Out" button → `router.post('/admin/logout')`

#### `AdminHeader.jsx` ✅
- [x] 64px top bar: page title + optional subtitle (props)
- [x] "View Site" link (hidden on mobile)
- [x] Bell notification icon → `/admin/contacts` with red badge when `unreadContacts > 0`
- [x] User avatar (initials from `adminUser.name`) + dropdown
- [x] Dropdown: user name/email, "View Site", "Sign Out"
- [x] Click-outside close via `useRef` + `mousedown` listener

#### Reusable Components ✅ (all in `components/admin/`)

| File | What it does |
|---|---|
| `Toggle.jsx` | iOS-style on/off switch (`checked`, `onChange`, `disabled`, `label`) |
| `StatusBadge.jsx` | Colored pill: new/read/replied/active/inactive/featured/draft |
| `StatCard.jsx` | Dashboard stat card with icon, value, label, subtext, color variant, optional `href` |
| `FormCard.jsx` | White card with title/description header, content slot, optional actions footer |
| `ConfirmModal.jsx` | Delete confirmation dialog: backdrop, ESC close, spinner during `loading` |
| `DataTable.jsx` | Client-side search + sort + pagination (15/page, 5-page window) |
| `ImageField.jsx` | URL input OR file upload with live preview + remove button |
| `RepeaterField.jsx` | Add/remove string or object rows; `fields` prop enables multi-column mode |
| `SortableList.jsx` | `@dnd-kit/core` drag-and-drop reorder; drag handle appears on hover |
| `TagInput.jsx` | Gold pill tags; add on Enter/comma, remove with ×, Backspace removes last |
| `StarRating.jsx` | Clickable 1–5 stars (filled=gold), hover preview, `readonly` mode |
| `InquiryChart.jsx` | Recharts `BarChart`, 30-day data, navy bars, gold highlight on last bar |

**Barrel export:** `import { DataTable, FormCard, … } from '@/components/admin'`

#### Build ✅
`npm run build` → 1895 modules, 0 errors, 7.48s

#### Deliverable ✅
Full admin shell live at `/admin/dashboard`. All 15 reusable components built. Phase 7 can wire in live data immediately.

---

### PHASE 7 — Admin Dashboard ✅ COMPLETE
**Goal:** Dashboard page with 4 stat cards, inquiry chart, recent contacts, quick actions.
**Duration:** Days 19–21 | **Completed:** 2026-07-29

#### `Admin\DashboardController::index` ✅
- [x] `stats.services` — `Service::active()->count()`
- [x] `stats.projects` — `Project::active()->count()`
- [x] `stats.newContacts` — `Contact::where('status','new')->count()`
- [x] `stats.totalContacts` — `Contact::count()`
- [x] `stats.testimonials` — `Testimonial::active()->count()`
- [x] `chartData` — `DATE(created_at)` grouped, last 30 days, ordered by date
- [x] `recentContacts` — latest 5, selects id/name/email/service/status/created_at

#### `pages/Admin/Dashboard.jsx` ✅
- [x] 4 `StatCard` components: Services (blue), Projects (gold), Inquiries (red if newContacts>0 else blue, subtext shows count), Testimonials (green)
- [x] `InquiryChart` — Recharts BarChart, 30-day data, navy bars, gold last bar, custom tooltip
- [x] "Recent Inquiries" — `ContactRow` sub-component: name + service + time-ago (`date-fns formatDistanceToNow`) + `StatusBadge` + link to detail
- [x] Quick Actions: Add Service / Add Project / Add Testimonial / View Site ↗ (`QuickAction` sub-component)
- [x] Subtitle shows current date via `format(new Date(), 'EEEE, d MMMM yyyy')`
- [x] `FormCard` updated with `headerAction` prop — "View All →" link in Recent Inquiries header

#### Also updated ✅
- `FormCard.jsx` — added `headerAction` prop (renders next to title in card header; used by all CRUD index pages going forward)

#### Build ✅
`npm run build` → 2818 modules, 0 errors, 14.06s (bundle grew ~416 kB — recharts + date-fns first inclusion)

#### Deliverable ✅
Dashboard live at `/admin/dashboard` with real counts, 30-day bar chart, and recent contact rows linking to detail.

---

### PHASE 8 — Admin Content Management (Services & Projects) ✅ COMPLETE
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
**Goal:** Full CRUD for Services, Sub-Services, and Projects with all fields and reorder.
**Duration:** Days 21–27

#### Services CRUD
<<<<<<< HEAD
- [ ] `Admin\ServiceController` — index, create, store, edit, update, destroy, toggleActive, toggleFeatured, reorder
- [ ] `pages/Admin/Services/Index.jsx` — DataTable, drag reorder, inline toggles
- [ ] `pages/Admin/Services/Create.jsx` — tabbed form (Basic, Highlights, Process, Sub-Services)
- [ ] `pages/Admin/Services/Edit.jsx` — same form, pre-filled
- [ ] `ServiceRequest` — validation rules (title required, slug unique, etc.)
- [ ] Auto-generate slug from title on frontend with manual override
- [ ] `ImageField` dual-mode (upload or URL) for cover_image
- [ ] `RepeaterField` for highlights and key_features
- [ ] `RepeaterField` of `{title, desc}` objects for process steps
- [ ] Inline sub-services list in Tab 4 (links to SubService edit pages)
- [ ] Reorder via POST `/admin/services/reorder` with `{order: [id1, id2, ...]}` payload, update sort_order
- [ ] Delete confirmation via `ConfirmModal`

#### Sub-Services CRUD
- [ ] `Admin\SubServiceController` — index, create, store, edit, update, destroy
- [ ] `pages/Admin/SubServices/Create.jsx` and `Edit.jsx`
- [ ] Parent service selector on create
- [ ] `ImageField` for main image
- [ ] `RepeaterField` for gallery (up to 6 images, drag reorder)
- [ ] `RepeaterField` for highlights and features

#### Projects CRUD
- [ ] `Admin\ProjectController` — index, create, store, edit, update, destroy, reorder
- [ ] `pages/Admin/Projects/Index.jsx` — DataTable with category filter, featured/active toggles
- [ ] `pages/Admin/Projects/Create.jsx` — tabs: Info | Images
- [ ] `ProjectRequest` — validation rules
- [ ] `TagInput` component for tags (enter tag, press Enter, gold pill added)
- [ ] Date picker for `completed_at`
- [ ] `ImageField` for cover_image
- [ ] `RepeaterField` for gallery images
=======
- [x] `Admin\ServiceController` — index, create, store, edit, update, destroy, toggleActive, toggleFeatured, reorder
- [x] `pages/Admin/Services/Index.jsx` — SortableList drag reorder, inline star + active toggle
- [x] `pages/Admin/Services/Create.jsx` — tabbed form (Basic Info, Highlights & Features, Process Steps, Sub-Services)
- [x] `pages/Admin/Services/Edit.jsx` — same form, pre-filled; sub-services tab with add/edit/delete
- [x] `ServiceRequest` — validation rules (title required, slug unique, boolean coercion, array fields)
- [x] Auto-generate slug from title on frontend (`utils/admin.js` → `toSlug()`) with manual override + Reset button
- [x] `ImageField` dual-mode (upload or URL) for cover_image
- [x] `RepeaterField` for highlights and key_features
- [x] `RepeaterField` of `{title, desc}` objects for process steps
- [x] Inline sub-services list in Tab 4 (links to SubService edit pages, inline delete with ConfirmModal)
- [x] Reorder via POST `/admin/services/reorder` with `{order: [ids]}`, custom route declared before resource()
- [x] Delete confirmation via `ConfirmModal`
- [x] `cache()->forget('nav.services')` on all mutating operations
- [x] `Tabs.jsx` reusable tab navigation component (gold underline, optional badge)

#### Sub-Services CRUD
- [x] `Admin\SubServiceController` — create, store, edit, update, destroy (no index — accessed from service edit)
- [x] `pages/Admin/SubServices/Create.jsx` and `Edit.jsx` with `_SubServiceForm` shared component
- [x] Parent service shown read-only on create (passed via `?service_id=` query param)
- [x] `ImageField` for main image; `RepeaterField` for highlights, features, gallery
- [x] After store → redirect to parent service edit page
- [x] Slug unique within service (`UNIQUE(service_id, slug)` — validation uses extra where clause)

#### Projects CRUD
- [x] `Admin\ProjectController` — index, create, store, edit, update, destroy, toggleActive, toggleFeatured, reorder
- [x] `pages/Admin/Projects/Index.jsx` — DataTable with category filter pills, featured star, active toggle
- [x] `pages/Admin/Projects/Create.jsx` + `Edit.jsx` with `_ProjectForm` (tabs: Project Info, Images)
- [x] `ProjectRequest` — validation rules including `images.*` array for gallery
- [x] `TagInput` for tags; `date` input for `completed_at`; `ImageField` for cover_image
- [x] `RepeaterField` for gallery images + image preview grid on Images tab
- [x] Gallery saved to `project_images` table (delete-all + recreate on update)
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)

#### Deliverable
Create a new service in admin → immediately visible on public `/services`. Delete project → gone from portfolio.

<<<<<<< HEAD
---

### PHASE 9 — Admin Marketing Content
=======
**Phase 8 Status:** Build passes 0 errors · All routes wired · Frontend + backend complete.

---

### PHASE 9 — Admin Marketing Content ✅ COMPLETE
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
**Goal:** CRUD for Testimonials, Stats, Why Choose Us, Core Values, Team Contacts.
**Duration:** Days 27–31

#### Testimonials
<<<<<<< HEAD
- [ ] `Admin\TestimonialController` — full CRUD + reorder
- [ ] `pages/Admin/Testimonials/Index.jsx` — table with avatar preview, star rating, active toggle, drag reorder
- [ ] `pages/Admin/Testimonials/Create.jsx` + `Edit.jsx`
- [ ] `StarRating` component — clickable 1–5 stars (gold), persists to form state

#### Stats
- [ ] `Admin\StatController` — full CRUD + reorder
- [ ] `pages/Admin/Stats/Index.jsx` — inline edit table (click value → edit in place) + drag reorder
- [ ] Simple create/edit modal (label, value, suffix)

#### Why Choose Us
- [ ] `Admin\WhyChooseController` — full CRUD + reorder
- [ ] `pages/Admin/WhyChoose/Index.jsx` — table + drag reorder
- [ ] Edit page with icon preview (heroicon name → live icon render)

#### Core Values
- [ ] `Admin\CoreValueController` — full CRUD + reorder
- [ ] `pages/Admin/CoreValues/Index.jsx` — same pattern as Why Choose Us

#### Team Contacts
- [ ] `Admin\TeamContactController` — full CRUD + reorder
- [ ] `pages/Admin/Team/Index.jsx` — table with gradient avatar preview
- [ ] Edit page: initial char → live avatar preview using the selected gradient
=======
- [x] `Admin\TestimonialController` — full CRUD + reorder + toggleActive
- [x] `pages/Admin/Testimonials/Index.jsx` — SortableList with avatar preview, StarRating (read-only), active toggle
- [x] `pages/Admin/Testimonials/_TestimonialForm.jsx` — live preview card (navy bg), StarRating (clickable lg), ImageField for avatar
- [x] `pages/Admin/Testimonials/Create.jsx` + `Edit.jsx`

#### Stats
- [x] `Admin\StatController` — full CRUD + reorder (no `is_active`, no timestamps)
- [x] `pages/Admin/Stats/Index.jsx` — SortableList showing large value+suffix, icon badge
- [x] `pages/Admin/Stats/_StatForm.jsx` — live preview card (navy bg) with formatted number
- [x] `pages/Admin/Stats/Create.jsx` + `Edit.jsx`

#### Why Choose Us
- [x] `Admin\WhyChooseController` — full CRUD + reorder + toggleActive
- [x] `pages/Admin/WhyChoose/Index.jsx` — SortableList with HeroIcon preview + active toggle
- [x] `pages/Admin/WhyChoose/_WhyChooseForm.jsx` — navy live preview, `IconPickerField` component
- [x] `pages/Admin/WhyChoose/Create.jsx` + `Edit.jsx`

#### Core Values
- [x] `Admin\CoreValueController` — full CRUD + reorder + toggleActive
- [x] `pages/Admin/CoreValues/Index.jsx` — same pattern (accent/amber colour scheme for visual distinction)
- [x] `pages/Admin/CoreValues/_CoreValueForm.jsx` — accent/amber preview card
- [x] `pages/Admin/CoreValues/Create.jsx` + `Edit.jsx`

#### Team Contacts
- [x] `Admin\TeamContactController` — full CRUD + reorder + toggleActive
- [x] `pages/Admin/Team/Index.jsx` — SortableList with gradient avatar, email mailto link
- [x] `pages/Admin/Team/_TeamForm.jsx` — gradient swatch picker (6 presets) + custom class input + live card preview; initial auto-derived from name
- [x] `pages/Admin/Team/Create.jsx` + `Edit.jsx`

#### New Admin Component
- [x] `IconPickerField.jsx` — text input + click-to-browse grid of 19 HeroIcons; live preview; added to barrel export

#### Config
- [x] `tailwind.config.js` safelist — gradient preset classes added so DB-stored values aren't purged
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)

#### Deliverable
Add a new testimonial in admin → immediately appears in homepage Swiper carousel.

<<<<<<< HEAD
---

### PHASE 10 — Inquiry Inbox
=======
**Phase 9 Status:** Build passes 0 errors · All 5 entities fully wired front-to-back.

---

### PHASE 10 — Inquiry Inbox ✅ COMPLETE
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
**Goal:** Contact inquiry management fully operational.
**Duration:** Days 31–33

#### `Admin\ContactController`
<<<<<<< HEAD
- [ ] `index` — paginated contacts list, filter by status, filter by service
- [ ] `show` — single contact detail; automatically marks `read` when opened
- [ ] `updateStatus` — PATCH endpoint to change status; clears `contacts.unread` cache
- [ ] `updateNotes` — PATCH endpoint to save admin_notes
- [ ] `export` — CSV download of contacts (filtered by date or status)

#### `pages/Admin/Contacts/Index.jsx`
- [ ] Summary badges: total, new (red), read (amber), replied (green)
- [ ] DataTable with status filter dropdown and date range filter
- [ ] Bulk action: mark selected as read / replied
- [ ] Export CSV button
- [ ] Clicking a row → navigate to Show page

#### `pages/Admin/Contacts/Show.jsx`
- [ ] Full contact detail card
- [ ] `mailto:` reply link, WhatsApp link if phone provided
- [ ] Admin notes textarea with save button
- [ ] Status change buttons (Mark Read / Mark Replied)
- [ ] Back navigation
=======
- [x] `index` — server-filtered list (status + service query params); passes `contacts`, `counts`, `services`, `filters`
- [x] `show` — auto-marks `new → read` on open; clears `contacts.unread` cache
- [x] `updateStatus` — PATCH; clears unread cache; `back()` with flash
- [x] `updateNotes` — PATCH; saves `admin_notes`; `back()` with flash
- [x] `bulkUpdateStatus` — POST `/contacts/bulk-status`; bulk mark read/replied
- [x] `export` — `StreamedResponse` CSV download; honours active status+service filters

#### Migration
- [x] `add_admin_notes_to_contacts_table` — adds nullable `text admin_notes` column
- [x] `Contact::$fillable` updated to include `admin_notes`

#### `pages/Admin/Contacts/Index.jsx`
- [x] 4 summary cards (All / New / Read / Replied) — clickable status filters, gold ring when active
- [x] New rows have subtle red tint + red dot indicator; bold name for unread
- [x] Local search (name, email, service) + server-side status + service filter
- [x] Sortable columns (name, service, status, created_at) — toggles asc/desc
- [x] Checkbox row selection + bulk action bar (Mark Read, Mark Replied, clear × )
- [x] Export CSV button — passes current filters to `/contacts/export`
- [x] Row click → navigate to Show page

#### `pages/Admin/Contacts/Show.jsx`
- [x] Two-column layout: contact details + message (2/3) | status panel + notes (1/3)
- [x] `mailto:` prefilled reply link; WhatsApp deeplink (wa.me) if phone provided
- [x] Admin notes textarea with PATCH save (spinner while saving)
- [x] Status change buttons — shows only valid transitions (new→read/replied, read→replied, replied→read)
- [x] Timeline showing submission → read → replied events
- [x] `formatDistanceToNow` relative time + absolute `d MMM yyyy, HH:mm`
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)

#### Deliverable
Admin sees new inquiries in real time. Unread badge on sidebar decrements as contacts are opened.

<<<<<<< HEAD
---

### PHASE 11 — Configuration Pages
=======
**Phase 10 Status:** Build passes 0 errors · Migration ran · Full inbox + detail view operational.

---

### PHASE 11 — Configuration Pages ✅ COMPLETE
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
**Goal:** Site Settings and About Page content fully editable from admin.
**Duration:** Days 33–37

#### Site Settings
<<<<<<< HEAD
- [ ] `Admin\SettingController::index` — load all settings grouped
- [ ] `Admin\SettingController::update($group)` — PATCH, update all keys in group, clear cache
- [ ] `pages/Admin/Settings/Index.jsx` — 5 tabs (Company, Hero, CTA, SEO, Social)
- [ ] Each tab has a form; saving via Inertia `useForm.put()` with group-specific endpoint
- [ ] Success flash message on save
- [ ] Character count on meta description fields (max 160)

#### About Page Content
- [ ] `Admin\AboutController::index` — load all about_content records
- [ ] `Admin\AboutController::update($section)` — PATCH by section key
- [ ] `pages/Admin/About/Index.jsx` — 3 tabs (Story, Capability List, Vision & Mission)
- [ ] Story tab: text inputs + `ImageField` for story image
- [ ] Capability list tab: `RepeaterField` for the 8 capability bullet points
- [ ] Vision & Mission tab: textareas + `RepeaterField` for mission items

#### Admin Users
- [ ] `Admin\UserController` — index, create, store, edit, update, destroy
- [ ] `pages/Admin/Users/Index.jsx` — table of admin users
- [ ] Create: name, email, password; Edit: name, email, optional password change
- [ ] Prevent self-delete (compare `$request->user()->id`)

#### Deliverable
Admin updates "Company Phone" in Settings → immediately reflected in site footer and contact page.
=======
- [x] `Admin\SettingController::index` — loads all 5 groups into `settings` prop
- [x] `Admin\SettingController::update($group)` — PATCH; upserts each key; clears `settings.{group}` cache (+ `settings.company`/`settings.seo` for shared props)
- [x] `pages/Admin/Settings/Index.jsx` — 5 icon tabs (Company, Hero, CTA, SEO, Social)
- [x] Each tab is its own isolated `useForm` → `patch('/admin/settings/{group}')` — tabs don't interfere
- [x] Character counter on meta_description (red when > 160 chars)
- [x] Hero tab: mini live image preview with title+highlight overlay
- [x] Social tab: 5 social links; leave blank to hide icon in footer

#### About Page Content
- [x] `Admin\AboutController::index` — loads all 4 sections
- [x] `Admin\AboutController::update($section)` — flat key→value for story/vision; `items[]` array → `item_1…item_N` for capabilities/mission (prunes deleted items from DB)
- [x] `pages/Admin/About/Index.jsx` — 3 tabs (Our Story, Capabilities, Vision & Mission)
- [x] Story: paragraph_1, paragraph_2 textareas + `ImageField`
- [x] Capabilities: `RepeaterField` (converts `{item_1:'...'}` ↔ `['...']`); up to 16 items
- [x] Vision & Mission: separate forms per section (Vision statement textarea, Mission `RepeaterField`); two save buttons on one tab

#### Admin Users
- [x] `Admin\UserController` — index, create, store, edit, update, destroy; only serves `is_admin=true` users
- [x] `AdminUserRequest` — email unique excluding self; password required on create, optional on edit with `confirmed` rule
- [x] `pages/Admin/Users/Index.jsx` — "You" badge on own row; self-delete disabled with greyed trash icon
- [x] `_UserForm.jsx` — show/hide password toggle (EyeIcon); warning banner about full admin access
- [x] `pages/Admin/Users/Create.jsx` + `Edit.jsx`

#### Deliverable
Admin updates "Company Phone" in Settings → immediately reflected in site footer and contact page.

**Phase 11 Status:** Build passes 0 errors · All 3 config areas (Settings, About, Users) fully operational.
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
Admin adds a paragraph to Vision text → immediately visible on About page.

---

<<<<<<< HEAD
### PHASE 12 — Mail System
=======
### PHASE 12 — Mail System ✅ COMPLETE
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
**Goal:** Contact form emails working end-to-end in production.
**Duration:** Days 37–39

#### Mailables
<<<<<<< HEAD
- [ ] `ContactInquiryMail` — to `Info@jonith-bogdad.com`
  - HTML template: sender details, service, message, "Reply to inquiry" button
  - Admin deep link: `{{ url('/admin/contacts/'.$contact->id) }}`
- [ ] `ContactAutoReplyMail` — to submitter's email
  - Branded "Thank you" message with company contact info
  - Expected response: within 24 hours

#### Laravel Config
- [ ] `.env` — `MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_ADMIN_TO`
- [ ] `config/mail.php` — add `'admin_to' => env('MAIL_ADMIN_TO')`

#### Test
=======
- [x] `app/Mail/ContactInquiryMail.php` — to `config('mail.admin_to')` (`Info@jonith-bogdad.com`)
  - HTML template: sender name/email/phone, service badge, message (navy left-border), "View in Admin Inbox →" CTA
  - Admin deep link: `url('/admin/contacts/'.$contact->id)`
- [x] `app/Mail/ContactAutoReplyMail.php` — to submitter's email
  - Branded thank-you with submission summary, direct contact links (phone/WhatsApp/email)
  - Expected response: within 24 hours

#### Blade Templates
- [x] `resources/views/mail/contact-inquiry.blade.php` — table-layout HTML email, inline CSS, navy/gold brand
- [x] `resources/views/mail/contact-autoreply.blade.php` — branded confirmation with company contact block

#### Laravel Config
- [x] `config/mail.php` — `'admin_to' => env('MAIL_ADMIN_TO', 'Info@jonith-bogdad.com')`, defaults updated
- [x] `.env` — `MAIL_FROM_ADDRESS`, `MAIL_FROM_NAME`, `MAIL_ADMIN_TO` set; mailer stays `log` for local dev
- [x] `.env.example` — documented all mail keys including `MAIL_ADMIN_TO`

#### Controller
- [x] `Public\ContactController::store` — dispatches both mailables after `Contact::create()`
- [x] Each mail wrapped in `try/catch` + `Log::error()` — mail failure never blocks form submission or DB save

#### Test Checklist
- [ ] Configure SMTP in `.env` (production)
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
- [ ] Submit contact form → `Contact` row created in DB
- [ ] `ContactInquiryMail` received at admin email with correct content
- [ ] `ContactAutoReplyMail` received at submitter email
- [ ] Flash success shows on contact page
- [ ] Dashboard "New Inquiries" count increments

<<<<<<< HEAD
---

### PHASE 13 — SEO, Sitemap & Performance
**Goal:** Per-page SEO, sitemap, robots.txt, performance-optimized build.
**Duration:** Days 39–42

#### SEO
- [ ] Every public page uses Inertia `<Head>` component:
  ```jsx
  <Head>
    <title>{seo['seo.home_title'] ?? 'Jonith Bogdad'}</title>
    <meta name="description" content={seo['seo.home_description'] ?? ''} />
    <meta property="og:title" content={seo['seo.home_title'] ?? ''} />
    <meta property="og:description" content={seo['seo.home_description'] ?? ''} />
  </Head>
  ```
- [ ] Service detail pages use service title in `<Head>`
- [ ] Project detail pages use project title in `<Head>`

#### Sitemap
- [ ] `composer require spatie/laravel-sitemap`
- [ ] Generate sitemap including: all pages, all service slugs, all sub-service slugs, all project slugs
- [ ] Registered as scheduled command: `php artisan sitemap:generate` daily
- [ ] Accessible at `/sitemap.xml`

#### robots.txt
- [ ] Public: `Allow: /`
- [ ] Admin: `Disallow: /admin`

#### Performance
- [ ] Cache middleware on public GET routes (60-second page cache for home/services/portfolio)
- [ ] Laravel route caching: `php artisan route:cache`
- [ ] Config caching: `php artisan config:cache`
- [ ] View caching: `php artisan view:cache`
- [ ] Vite build optimization: `npm run build` with code splitting
=======
**Phase 12 Status:** Build passes 0 errors · Both mailables instantiate cleanly · Mail failure is non-blocking.

---

### PHASE 13 — SEO, Sitemap & Performance ✅ COMPLETE
**Goal:** Per-page SEO, sitemap, robots.txt, performance-optimized build.
**Duration:** Days 39–42 | **Completed:** 2026-07-30

#### SEO ✅
- [x] All 8 public pages + NotFound use Inertia `<Head>` component with `head-key` deduplication:
  - `title` — full custom title (bypasses the app.jsx title callback for full control)
  - `meta name="description"` — from seo settings or service/project description (sliced to 160 chars)
  - `meta property="og:title"` — same as title
  - `meta property="og:description"` — same as description
  - `meta property="og:type"` — `website` / `article` (ProjectDetail)
  - `meta property="og:image"` — service/project cover image where available
  - `meta name="robots"` — `index, follow` on all public pages; `noindex, nofollow` on 404
- [x] Static pages (Home, About, Services, Portfolio, Contact) pull title+description from `seo` shared prop (admin-editable via Settings → SEO tab)
- [x] Dynamic pages (ServiceDetail, SubServiceDetail, ProjectDetail) compose title from record data
- [x] `SeoSettingSeeder` — 10 sensible defaults seeded; overridable in admin Settings

**SEO key pattern:**
```jsx
const { seo, company } = usePage().props
const title = seo?.home_title ?? company?.name ?? 'Jonith Bogdad Technical Services'
<Head>
  <title>{title}</title>
  <meta head-key="description" name="description" content={description} />
  <meta head-key="og-title" property="og:title" content={title} />
  <meta head-key="og-type" property="og:type" content="website" />
  <meta head-key="robots" name="robots" content="index, follow" />
</Head>
```

#### Sitemap ✅
- [x] `app/Http/Controllers/Public/SitemapController.php` — native XML controller (no spatie dependency)
  - Static URLs: `/`, `/about`, `/services`, `/portfolio`, `/contact`
  - All active service slugs: `/services/{slug}`
  - All active sub-service slugs: `/services/{slug}/{subSlug}`
  - All active project slugs: `/portfolio/{slug}`
  - Response cached 24 hours in Laravel cache; cleared on admin mutating operations
- [x] Route: `GET /sitemap.xml` → `SitemapController`
- [x] Sitemap cache cleared in: `Admin\ServiceController::clearCache()`, `Admin\ProjectController` (store/update/destroy), `Admin\SubServiceController` (store/update/destroy)

#### robots.txt ✅
- [x] `Disallow: /admin` and `Disallow: /admin/*` — admin panel hidden from crawlers
- [x] `Sitemap: https://jonith-bogdad.com/sitemap.xml` directive added

#### Performance ✅
- [x] Vite lazy code splitting — `import.meta.glob('./pages/**/*.jsx')` without `eager: true`; async page resolver → each page is its own chunk
- [x] Named vendor chunks via `rollupOptions.output.manualChunks(id)`:
  - `vendor-react` — react, react-dom, @inertiajs/react
  - `vendor-motion` — framer-motion (public pages only)
  - `vendor-charts` — recharts + d3 (dashboard only)
  - `vendor-dnd` — @dnd-kit (admin only)
  - `vendor-icons` — @heroicons/react
  - `vendor-swiper` — swiper (home page only)
  - `vendor-date` — date-fns (admin only)
- [x] Build: 3203 modules, 0 errors, 0 warnings — each page chunk 1–18 kB; initial load only downloads needed chunks
- [x] Laravel caching commands (run at deployment — Phase 15): `route:cache`, `config:cache`, `view:cache`
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)

---

### PHASE 14 — QA & Cross-Device Testing
**Goal:** Full site and admin verified on all devices, all features confirmed working.
**Duration:** Days 42–46

#### Public Site QA
- [ ] Home page — all 7 sections, animations, countup, Swiper carousel
- [ ] About page — all sections, stats countup, vision/mission from DB
- [ ] Services page — all 8 services listed from DB
- [ ] Service detail — all tabs, sub-services, process steps
- [ ] Sub-service detail — gallery lightbox, features, highlights
- [ ] Portfolio — category filter, card grid, responsive
- [ ] Project detail — images, description
- [ ] Contact — form validation, success state, both emails sent
- [ ] 404 — renders correctly
- [ ] WhatsApp button — works with DB phone number
- [ ] Mobile (375px), Tablet (768px), Desktop (1280px, 1920px) — all layouts verified

#### Admin QA
- [ ] Login / logout flow
- [ ] Dashboard stats accurate
- [ ] Chart renders correctly
- [ ] Services CRUD — create, edit, toggle active, delete, reorder
- [ ] Sub-services CRUD — create from within service, edit, delete
- [ ] Projects CRUD — create with images, edit, category filter
- [ ] Testimonials CRUD — star rating, active toggle, reorder
- [ ] Stats — edit inline, reorder
- [ ] Why Choose / Core Values — CRUD, reorder
- [ ] Team — CRUD, avatar preview, reorder
- [ ] Contacts inbox — status change, notes, export CSV
- [ ] Settings — all 5 tabs save and reflect on public site
- [ ] About content — all 3 tabs save and reflect on About page
- [ ] Admin users — create second admin, login with new account

#### End-to-End Flows
- [ ] Create new service in admin → appears on public Services page
- [ ] Deactivate service → disappears from public site
- [ ] Update company phone → reflected in footer and contact page
- [ ] Submit contact form → appears in inbox, emails sent, badge increments

---

### PHASE 15 — Deployment
**Goal:** Live on production server with SSL, CI/CD pipeline.
**Duration:** Days 46–50

#### Server Setup
- [ ] Provision VPS (Ubuntu 22.04 LTS)
- [ ] Install: Nginx, PHP 8.3-FPM, MySQL 8, Node 20, Composer, Git
- [ ] Configure MySQL: create database `jonith_bogdad`, user with password
- [ ] Configure Nginx server block:
  ```nginx
  server {
    listen 80;
    server_name jonith-bogdad.com www.jonith-bogdad.com;
    root /var/www/jonith-bogdad/public;
    index index.php;
    location / { try_files $uri $uri/ /index.php?$query_string; }
    location ~ \.php$ { fastcgi_pass unix:/var/run/php/php8.3-fpm.sock; ... }
  }
  ```
- [ ] SSL via Let's Encrypt (`certbot --nginx`)

#### Deploy
- [ ] Clone repo to `/var/www/jonith-bogdad`
- [ ] `composer install --no-dev --optimize-autoloader`
- [ ] `npm ci && npm run build`
- [ ] Copy `.env.production` to `.env`, fill all values
- [ ] `php artisan migrate --seed` (one-time, seeds all data)
- [ ] `php artisan storage:link` (uploaded images served via /storage/)
- [ ] `php artisan config:cache && route:cache && view:cache`
- [ ] `chown -R www-data:www-data /var/www/jonith-bogdad/storage`
- [ ] Verify site at `https://jonith-bogdad.com`
- [ ] Verify admin at `https://jonith-bogdad.com/admin`

#### CI/CD (GitHub Actions)
```yaml
# .github/workflows/deploy.yml
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - SSH to VPS
      - git pull origin main
      - composer install --no-dev
      - npm ci && npm run build
      - php artisan migrate --force
      - php artisan config:cache && route:cache && view:cache
      - php artisan queue:restart (if using queues later)
```

#### Deliverable
`git push origin main` → site live on production within 2 minutes.

---

## 13. Timeline Summary

| Phase | Focus | Days | Deliverable |
|---|---|---|---|
| 1 | Laravel + Inertia Foundation | 1–3 | Vite builds, Inertia responds |
| 2 | Database, Models & Seeders | 3–7 | All 14 tables seeded with real data |
| 3 | Public Controllers & Routes | 7–10 | All 9 pages serve DB data |
| 4 | Public React Migration | 10–15 | Full public site on Inertia, no static data |
| 5 | Admin Auth | 15–17 | Secure login/logout, branded login page |
| 6 | Admin Layout Shell | 17–19 | Sidebar, header, all admin components built |
| 7 | Admin Dashboard | 19–21 | Live stats, chart, recent contacts |
| 8 | Services & Projects CRUD | 21–27 | Full content management for main features |
| 9 | Marketing Content CRUD | 27–31 | Testimonials, Stats, Why Choose, Team |
| 10 | Inquiry Inbox | 31–33 | Contacts managed end-to-end |
| 11 | Settings & About Config | 33–37 | All site text editable from admin |
| 12 | Mail System | 37–39 | Both emails working on contact form |
| 13 | SEO & Performance | 39–42 | Sitemap, meta tags, caching |
| 14 | QA | 42–46 | All features verified on all devices |
| 15 | Deployment | 46–50 | Live on production with CI/CD |

**Total: 50 working days (~10 weeks, 1 developer)**

---

## 14. Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Inertia partial reloads on portfolio filter cause full page reload | Medium | Use `preserveState: true, only: ['projects']` |
| Admin and public share same Inertia app — layout conflict | Low | Each admin page renders `AdminLayout`, public renders `PageLayout` — separate components, no conflict |
| Framer Motion breaks after removing react-router | Low | Animations are component-scoped, not router-dependent |
| Email deliverability on shared hosting SMTP | High | Use Mailgun or SMTP2GO with verified domain and SPF/DKIM records |
| Large image uploads slow the admin | Medium | Limit upload size (5MB), resize on the backend with `Intervention/Image` |
| MySQL JSON column performance as data grows | None at this scale | <500 rows; not a concern |
| Cache stale after settings update | Medium | Clear `settings.company`, `nav.services` keys in controller after every save |
| Slug conflicts when admin creates duplicate titles | Low | Unique constraint on DB + validation in Form Request |

---

## 15. Definition of Done

- [ ] All 9 public pages serve 100% DB-driven content — no `.data.js` files remain
- [ ] Admin panel is custom Inertia + React with full navy/gold brand design
- [ ] Every piece of text, image, number, and link on the public site is editable in admin
- [ ] Dashboard shows live counts, 30-day chart, recent contacts
- [ ] Contact form: saves to DB, sends 2 emails, success state shown
- [ ] Adding a new service in admin instantly appears on the public services page
- [ ] Toggling a service inactive removes it from the public site immediately
- [ ] All Framer Motion animations, Swiper carousel, lightbox gallery work correctly
- [ ] Site deployed on production with HTTPS, CI/CD on `git push`
- [ ] Lighthouse performance ≥ 90 on Home, Services, Portfolio pages

---

<<<<<<< HEAD
*Lead Solutions Architect: Amir-16 — Version 3.0 — Ready for Phase 1 execution*
*Start command: `composer create-project laravel/laravel jonith-bogdad`*
=======
*Lead Solutions Architect: Amir-16 — Version 3.6 — Phases 1–12 Complete*
*Updated: 2026-07-29 | Next: Phase 13 — SEO, Sitemap & Performance*
>>>>>>> 95d05b3 (Complete full-stack Laravel + Inertia + React application — Phases 1–13)
