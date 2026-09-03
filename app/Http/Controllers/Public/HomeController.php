<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Associate;
use App\Models\Company;
use App\Models\GalleryMedia;
use App\Models\HeroSlide;
use App\Models\MarqueeItem;
use App\Models\ProcessStep;
use App\Models\Product;
use App\Models\Stat;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Home', [
            'heroSlides' => cache()->remember('public.hero_slides', 3600,
                fn () => HeroSlide::active()->ordered()->get()),

            'marqueeItems' => cache()->remember('public.marquee', 3600,
                fn () => MarqueeItem::active()->ordered()->get(['id', 'text'])),

            'companies' => cache()->remember('public.companies', 3600,
                fn () => Company::active()->ordered()->get()),

            'associates' => cache()->remember('public.associates', 3600,
                fn () => Associate::active()->ordered()->get()),

            'stats' => cache()->remember('public.stats', 3600,
                fn () => Stat::ordered()->get()),

            'processSteps' => cache()->remember('public.process_steps', 3600,
                fn () => ProcessStep::ordered()->get()),

            'gallery' => cache()->remember('public.gallery.home', 3600,
                fn () => GalleryMedia::active()->ordered()->limit(10)->get()),

            'exportProducts' => cache()->remember('public.export_products', 3600,
                fn () => Product::active()->ordered()->exports()->get()),

            'importProducts' => cache()->remember('public.import_products', 3600,
                fn () => Product::active()->ordered()->imports()->get()),
        ]);
        // 'chairman' is injected on every page via HandleInertiaRequests::share()
    }
}
