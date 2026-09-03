<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
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
        ]);
    }
}
