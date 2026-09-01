<?php

use App\Http\Controllers\Public\AboutController;
use App\Http\Controllers\Public\CompanyController;
use App\Http\Controllers\Public\ContactController;
use App\Http\Controllers\Public\ExportController;
use App\Http\Controllers\Public\GalleryController;
use App\Http\Controllers\Public\HomeController;
use App\Http\Controllers\Public\ImportController;
use App\Http\Controllers\Public\LegalController;
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

// Export product detail — explicit routes matching frontend SPA exactly
Route::get('export-mill-scale',                  fn () => inertia('Public/ProductDetail', ['type' => 'export', 'slug' => 'mill-scale']))->name('products.export.mill-scale');
Route::get('export-zinc-oxide',                  fn () => inertia('Public/ProductDetail', ['type' => 'export', 'slug' => 'zinc-oxide']))->name('products.export.zinc-oxide');
Route::get('export-pet-flakes',                  fn () => inertia('Public/ProductDetail', ['type' => 'export', 'slug' => 'pet-flakes']))->name('products.export.pet-flakes');
Route::get('export-fresh-vegetables-and-fruits', fn () => inertia('Public/ProductDetail', ['type' => 'export', 'slug' => 'fresh-vegetables-and-fruits']))->name('products.export.vegetables');
Route::get('export-leather-goods',               fn () => inertia('Public/ProductDetail', ['type' => 'export', 'slug' => 'leather-goods']))->name('products.export.leather-goods');
Route::get('export-jute-made-products',          fn () => inertia('Public/ProductDetail', ['type' => 'export', 'slug' => 'jute-made-products']))->name('products.export.jute');

// Import product detail — explicit routes matching frontend SPA exactly
Route::get('import-aggregate',              fn () => inertia('Public/ProductDetail', ['type' => 'import', 'slug' => 'aggregate']))->name('products.import.aggregate');
Route::get('import-coal',                   fn () => inertia('Public/ProductDetail', ['type' => 'import', 'slug' => 'coal']))->name('products.import.coal');
Route::get('import-steel-scraps',           fn () => inertia('Public/ProductDetail', ['type' => 'import', 'slug' => 'steel-scraps']))->name('products.import.steel-scraps');
Route::get('import-automobile-spare-parts', fn () => inertia('Public/ProductDetail', ['type' => 'import', 'slug' => 'automobile-spare-parts']))->name('products.import.auto-parts');
Route::get('import-lime-stone',             fn () => inertia('Public/ProductDetail', ['type' => 'import', 'slug' => 'lime-stone']))->name('products.import.lime-stone');

// Backward-compat redirects
Route::redirect('import-gabbro',          'import-aggregate', 301);
Route::get('products/{type}/{slug}',      fn ($type, $slug) => redirect("/{$type}-{$slug}", 301));

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
