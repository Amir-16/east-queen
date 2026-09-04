<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\GalleryCategory;
use App\Models\GalleryMedia;
use Inertia\Inertia;
use Inertia\Response;

class GalleryController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/Gallery', [
            'gallery' => cache()->remember('public.gallery', 3600,
                fn () => GalleryMedia::active()->ordered()->get()),
            'categories' => cache()->remember('public.gallery_categories', 3600,
                fn () => GalleryCategory::active()->ordered()->get(['slug', 'label'])),
        ]);
    }
}
