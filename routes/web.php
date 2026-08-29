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

// About
Route::prefix('about')->name('about.')->group(function () {
    Route::get('/', [AboutController::class, 'index'])->name('index');
    Route::get('mission-vision', [AboutController::class, 'missionVision'])->name('mission-vision');
    Route::get('core-values', [AboutController::class, 'coreValues'])->name('core-values');
});

// Also support /mission-vision and /core-values as top-level
Route::get('mission-vision', [AboutController::class, 'missionVision'])->name('mission-vision');
Route::get('core-values', [AboutController::class, 'coreValues'])->name('core-values');

// Companies
Route::prefix('companies')->name('companies.')->group(function () {
    Route::get('/', [CompanyController::class, 'index'])->name('index');
    Route::get('{slug}', [CompanyController::class, 'show'])->name('show');
});

// Short company URLs: /con-{slug} → same as /companies/{slug}
Route::get('con-{slug}', [CompanyController::class, 'show'])->name('companies.con');

// Trade
Route::get('export', [ExportController::class, 'index'])->name('export');
Route::get('import', [ImportController::class, 'index'])->name('import');

// Products (export/import sub-detail)
Route::get('products/{type}/{slug}', [ProductController::class, 'show'])->name('products.show');

// Ship breaking
Route::get('ship-breaking', ShipBreakingController::class)->name('ship-breaking');

// Gallery
Route::get('gallery', GalleryController::class)->name('gallery');

// Contact
Route::get('contact-us', [ContactController::class, 'index'])->name('contact.index');
Route::post('contact-us', [ContactController::class, 'store'])->name('contact.store');

// Legal
Route::get('privacy-policy', [LegalController::class, 'privacy'])->name('privacy');
Route::get('terms', [LegalController::class, 'terms'])->name('terms');

// 404 fallback — renders the Inertia NotFound page for all unmatched public routes
Route::fallback(fn () => inertia('Public/NotFound')->toResponse(request())->setStatusCode(404));

// Admin routes are loaded via bootstrap/app.php
