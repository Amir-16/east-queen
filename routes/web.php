<?php

use App\Http\Controllers\Public\AboutController;
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

// About — canonical URLs match the frontend SPA
Route::get('about-east-queen',      [AboutController::class, 'index'])->name('about.index');
Route::get('mission-vision-purpose',[AboutController::class, 'missionVision'])->name('about.mission-vision');
Route::get('our-core-values',       [AboutController::class, 'coreValues'])->name('about.core-values');

// Backward-compat 301 redirects for old about URLs
Route::redirect('about',                    'about-east-queen',       301);
Route::redirect('about/mission-vision',     'mission-vision-purpose', 301);
Route::redirect('about/core-values',        'our-core-values',        301);
Route::redirect('mission-vision',           'mission-vision-purpose', 301);
Route::redirect('core-values',              'our-core-values',        301);

// Companies
Route::prefix('companies')->name('companies.')->group(function () {
    Route::get('/', [CompanyController::class, 'index'])->name('index');
    Route::get('{slug}', [CompanyController::class, 'show'])->name('show');
});

// Associates
Route::get('associates', fn () => inertia('Public/Associates'))->name('associates');

// Trade
Route::get('export', [ExportController::class, 'index'])->name('export');
Route::get('import', [ImportController::class, 'index'])->name('import');

// Product detail — frontend-style flat URLs: /export-{slug} and /import-{slug}
Route::get('export-{slug}', [ProductController::class, 'show'])->defaults('type', 'export')->name('products.export');
Route::get('import-{slug}', [ProductController::class, 'show'])->defaults('type', 'import')->name('products.import');

// Backward-compat redirect for old /import-gabbro (was an alias for aggregate)
Route::redirect('import-gabbro', 'import-aggregate', 301);

// Backward-compat redirect for old /products/{type}/{slug} deep path
Route::get('products/{type}/{slug}', fn ($type, $slug) => redirect("/{$type}-{$slug}", 301));

// Ship breaking
Route::get('ship-breaking', ShipBreakingController::class)->name('ship-breaking');

// Gallery
Route::get('gallery', GalleryController::class)->name('gallery');

// Contact
Route::get('contact-us', [ContactController::class, 'index'])->name('contact.index');
Route::post('contact-us', [ContactController::class, 'store'])->name('contact.store');

// Legal — canonical URL matches the frontend SPA
Route::get('privacy-policy',       [LegalController::class, 'privacy'])->name('privacy');
Route::get('terms-and-conditions', [LegalController::class, 'terms'])->name('terms');
Route::redirect('terms', 'terms-and-conditions', 301);

// 404 fallback — renders the Inertia NotFound page for all unmatched public routes
Route::fallback(fn () => inertia('Public/NotFound')->toResponse(request())->setStatusCode(404));

// Admin routes are loaded via bootstrap/app.php
