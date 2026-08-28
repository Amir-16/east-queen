<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function show(string $type, string $slug): Response
    {
        return Inertia::render('Public/ProductDetail', [
            'slug' => $slug,
            'type' => $type,
        ]);
    }
}
