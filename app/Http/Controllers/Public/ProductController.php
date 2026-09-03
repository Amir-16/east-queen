<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Serve a product detail page from a combined {type}-{slug} URL segment.
     *
     * Route constraint ensures $typeAndSlug matches: (export|import)-[a-z0-9-]+
     * We split on the first dash to recover type and slug separately.
     *
     * Examples:
     *   export-mill-scale                    → type=export, slug=mill-scale
     *   import-fresh-vegetables-and-fruits   → type=import, slug=fresh-vegetables-and-fruits
     */
    public function show(string $typeAndSlug): Response
    {
        [$type, $slug] = explode('-', $typeAndSlug, 2);

        try {
            $product = cache()->remember("public.product.{$type}.{$slug}", 3600,
                fn () => Product::active()
                            ->where('type', $type)
                            ->where('slug', $slug)
                            ->firstOrFail());
        } catch (ModelNotFoundException) {
            abort(404);
        }

        return Inertia::render('Public/ProductDetail', compact('product'));
    }
}
