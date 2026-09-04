<?php

use App\Http\Controllers\Admin\Auth\LoginController;
use App\Http\Controllers\Admin\Auth\LogoutController;
use App\Http\Controllers\Admin\AssociateController;
use App\Http\Controllers\Admin\CoreValueController;
use App\Http\Controllers\Admin\DifferentiatorController;
use App\Http\Controllers\Admin\CompanyController;
use App\Http\Controllers\Admin\ContactController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\GalleryCategoryController;
use App\Http\Controllers\Admin\GalleryMediaController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\Admin\MarqueeItemController;
use App\Http\Controllers\Admin\ProcessStepController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\StatController;
use App\Http\Controllers\Admin\TimelineEntryController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\VideoUploadController;
use Illuminate\Support\Facades\Route;

Route::prefix('admin')->name('admin.')->group(function () {

    Route::get('/login',   [LoginController::class, 'show'])->name('login');
    Route::post('/login',  [LoginController::class, 'login'])->name('login.store');
    Route::post('/logout', LogoutController::class)->name('logout');

    Route::middleware('auth.admin')->group(function () {

        Route::redirect('/', '/admin/dashboard')->name('home');
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Stats
        Route::post('/stats/reorder', [StatController::class, 'reorder'])->name('stats.reorder');
        Route::resource('stats', StatController::class)->except(['show']);

        // Hero Slides
        Route::post('/hero-slides/reorder',                    [HeroSlideController::class, 'reorder'])->name('hero-slides.reorder');
        Route::patch('/hero-slides/{heroSlide}/toggle-active', [HeroSlideController::class, 'toggleActive'])->name('hero-slides.toggle-active');
        Route::resource('hero-slides', HeroSlideController::class)->except(['show']);

        // Companies
        Route::post('/companies/reorder',                   [CompanyController::class, 'reorder'])->name('companies.reorder');
        Route::patch('/companies/{company}/toggle-active',  [CompanyController::class, 'toggleActive'])->name('companies.toggle-active');
        Route::resource('companies', CompanyController::class)->except(['show']);

        // Products
        Route::post('/products/reorder',                   [ProductController::class, 'reorder'])->name('products.reorder');
        Route::patch('/products/{product}/toggle-active',  [ProductController::class, 'toggleActive'])->name('products.toggle-active');
        Route::resource('products', ProductController::class)->except(['show']);

        // Associates
        Route::post('/associates/reorder',                      [AssociateController::class, 'reorder'])->name('associates.reorder');
        Route::patch('/associates/{associate}/toggle-active',   [AssociateController::class, 'toggleActive'])->name('associates.toggle-active');
        Route::resource('associates', AssociateController::class)->except(['show']);

        // Process Steps
        Route::post('/process-steps/reorder', [ProcessStepController::class, 'reorder'])->name('process-steps.reorder');
        Route::resource('process-steps', ProcessStepController::class)->except(['show']);

        // Marquee Items
        Route::post('/marquee/reorder',                 [MarqueeItemController::class, 'reorder'])->name('marquee.reorder');
        Route::patch('/marquee/{marquee}/toggle-active',[MarqueeItemController::class, 'toggleActive'])->name('marquee.toggle-active');
        Route::resource('marquee', MarqueeItemController::class)->except(['show'])
            ->parameters(['marquee' => 'marquee']);

        // Differentiators (About page — "What Sets Us Apart")
        Route::post('/differentiators/reorder', [DifferentiatorController::class, 'reorder'])->name('differentiators.reorder');
        Route::resource('differentiators', DifferentiatorController::class)->except(['show']);

        // Core Values
        Route::post('/core-values/reorder', [CoreValueController::class, 'reorder'])->name('core-values.reorder');
        Route::resource('core-values', CoreValueController::class)->except(['show'])
            ->parameters(['core-values' => 'coreValue']);

        // Timeline
        Route::post('/timeline/reorder', [TimelineEntryController::class, 'reorder'])->name('timeline.reorder');
        Route::resource('timeline', TimelineEntryController::class)->except(['show'])
            ->parameters(['timeline' => 'timeline']);

        // Gallery Media
        Route::post('/gallery/reorder',                  [GalleryMediaController::class, 'reorder'])->name('gallery.reorder');
        Route::patch('/gallery/{gallery}/toggle-active', [GalleryMediaController::class, 'toggleActive'])->name('gallery.toggle-active');
        Route::resource('gallery', GalleryMediaController::class)->except(['show'])
            ->parameters(['gallery' => 'gallery']);

        // Gallery Categories
        Route::post('/gallery-categories/reorder', [GalleryCategoryController::class, 'reorder'])->name('gallery-categories.reorder');
        Route::patch('/gallery-categories/{galleryCategory}/toggle-active', [GalleryCategoryController::class, 'toggleActive'])->name('gallery-categories.toggle-active');
        Route::resource('gallery-categories', GalleryCategoryController::class)->except(['show'])
            ->parameters(['gallery-categories' => 'galleryCategory']);

        // Inquiry Inbox
        Route::get('/contacts',                    [ContactController::class, 'index'])->name('contacts.index');
        Route::get('/contacts/export',             [ContactController::class, 'export'])->name('contacts.export');
        Route::get('/contacts/{contact}',          [ContactController::class, 'show'])->name('contacts.show');
        Route::patch('/contacts/{contact}/status', [ContactController::class, 'updateStatus'])->name('contacts.update-status');
        Route::patch('/contacts/{contact}/notes',  [ContactController::class, 'updateNotes'])->name('contacts.update-notes');
        Route::post('/contacts/{contact}/reply',   [ContactController::class, 'sendReply'])->name('contacts.reply');
        Route::post('/contacts/bulk-status',       [ContactController::class, 'bulkUpdateStatus'])->name('contacts.bulk-status');

        // Settings
        Route::get('/settings',           [SettingController::class, 'index'])->name('settings.index');
        Route::patch('/settings/{group}', [SettingController::class, 'update'])->name('settings.update');

        // Users
        Route::resource('users', UserController::class)->except(['show']);

        // File uploads
        Route::post('/upload/image', [ImageUploadController::class, 'store'])->name('upload.image');
        Route::post('/upload/video', [VideoUploadController::class, 'store'])->name('upload.video');
    });
});
