<?php

use App\Http\Controllers\Api\AssociateApiController;
use App\Http\Controllers\Api\CompanyApiController;
use App\Http\Controllers\Api\ContactApiController;
use App\Http\Controllers\Api\GalleryApiController;
use App\Http\Controllers\Api\HeroSlideApiController;
use App\Http\Controllers\Api\MarqueeApiController;
use App\Http\Controllers\Api\ProcessStepApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\SettingApiController;
use App\Http\Controllers\Api\StatApiController;
use App\Http\Controllers\Api\TimelineApiController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->name('api.v1.')->group(function () {
    Route::get('/hero-slides',        [HeroSlideApiController::class, 'index']);
    Route::get('/stats',              [StatApiController::class, 'index']);
    Route::get('/companies',          [CompanyApiController::class, 'index']);
    Route::get('/companies/{slug}',   [CompanyApiController::class, 'show']);
    Route::get('/products',           [ProductApiController::class, 'index']);
    Route::get('/products/export',    [ProductApiController::class, 'exports']);
    Route::get('/products/import',    [ProductApiController::class, 'imports']);
    Route::get('/products/{slug}',    [ProductApiController::class, 'show']);
    Route::get('/associates',         [AssociateApiController::class, 'index']);
    Route::get('/timeline',           [TimelineApiController::class, 'index']);
    Route::get('/gallery',            [GalleryApiController::class, 'index']);
    Route::get('/process-steps',      [ProcessStepApiController::class, 'index']);
    Route::get('/marquee',            [MarqueeApiController::class, 'index']);
    Route::get('/settings/{group}',   [SettingApiController::class, 'show']);
    Route::post('/contacts',          [ContactApiController::class, 'store'])->middleware('throttle:contact');
});
