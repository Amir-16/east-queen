<?php

use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\AssociateController;
use App\Http\Controllers\Public\CompanyController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\ExportController;
use App\Http\Controllers\Public\GalleryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ImportController;
use App\Http\Controllers\Public\LegalController;
use App\Http\Controllers\Public\ProductController;
use App\Http\Controllers\Public\ShipBreakingController;
use Illuminate\Support\Facades\Route;

// ─── Public site ──────────────────────────────────────────────────────────────

Route::get('/', HomeController::class)->name('home');

// About
Route::get('about-east-queen',       [AboutController::class, 'index'])->name('about.index');
Route::get('mission-vision-purpose', [AboutController::class, 'missionVision'])->name('about.mission-vision');
Route::get('our-core-values',        [AboutController::class, 'coreValues'])->name('about.core-values');

// Backward-compat 301 redirects for old about URLs
Route::redirect('about',                 'about-east-queen',       301);
Route::redirect('about/mission-vision',  'mission-vision-purpose', 301);
Route::redirect('about/core-values',     'our-core-values',        301);
Route::redirect('mission-vision',        'mission-vision-purpose', 301);
Route::redirect('core-values',           'our-core-values',        301);

// Companies
Route::prefix('companies')->name('companies.')->group(function () {
    Route::get('/',      [CompanyController::class, 'index'])->name('index');
    Route::get('{slug}', [CompanyController::class, 'show'])->name('show');
});

// Associates
Route::get('associates', [AssociateController::class, 'index'])->name('associates');

// Trade — list pages
Route::get('export', [ExportController::class, 'index'])->name('export');
Route::get('import', [ImportController::class, 'index'])->name('import');

// Product detail — single wildcard route replaces 11 hardcoded closures.
// Constraint: URL must start with "export-" or "import-" followed by a slug.
// ProductController::show() splits on the first dash to recover type + slug.
Route::get('{typeAndSlug}', [ProductController::class, 'show'])
    ->where('typeAndSlug', '(export|import)-[a-z0-9-]+')
    ->name('products.show');

// Backward-compat redirects (kept for SEO / old links)
Route::redirect('import-gabbro',     'import-aggregate', 301);
Route::get('products/{type}/{slug}', fn ($type, $slug) => redirect("/{$type}-{$slug}", 301));

// Ship breaking
Route::get('ship-breaking', ShipBreakingController::class)->name('ship-breaking');

// Gallery
Route::get('gallery', GalleryController::class)->name('gallery');

// Contact
Route::get('contact-us',  [ContactController::class, 'index'])->name('contact.index');
Route::post('contact-us', [ContactController::class, 'store'])
    ->middleware('throttle:contact')
    ->name('contact.store');

// Legal
Route::get('privacy-policy',       [LegalController::class, 'privacy'])->name('privacy');
Route::get('terms-and-conditions',  [LegalController::class, 'terms'])->name('terms');
Route::redirect('terms', 'terms-and-conditions', 301);

// 404 fallback
Route::fallback(fn () => inertia('Public/NotFound')->toResponse(request())->setStatusCode(404));

// Admin routes are loaded via bootstrap/app.php
