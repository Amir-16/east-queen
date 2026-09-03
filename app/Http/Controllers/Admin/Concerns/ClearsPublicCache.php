<?php

namespace App\Http\Controllers\Admin\Concerns;

use Illuminate\Support\Facades\Cache;

/**
 * Centralised cache-busting for every public Inertia page and API endpoint.
 *
 * Call the appropriate method inside every admin store / update / destroy /
 * reorder / toggleActive action so the public site reflects changes immediately.
 *
 * Two namespaces are cleared together:
 *   public.*  — cached Inertia props served by Public controllers
 *   api.*     — cached JSON payloads served by Api controllers (/api/v1/*)
 */
trait ClearsPublicCache
{
    protected function clearHeroCache(): void
    {
        Cache::forget('public.hero_slides');
    }

    protected function clearCompanyCache(?string $slug = null): void
    {
        Cache::forget('public.companies');
        Cache::forget('public.nav_companies');
        Cache::forget('api.companies');

        if ($slug) {
            Cache::forget("public.company.{$slug}");
            Cache::forget("api.company.{$slug}");
        }
    }

    protected function clearAssociateCache(): void
    {
        Cache::forget('public.associates');
        Cache::forget('api.associates');
    }

    protected function clearGalleryCache(): void
    {
        Cache::forget('public.gallery');
        Cache::forget('public.gallery.home');
    }

    protected function clearMarqueeCache(): void
    {
        Cache::forget('public.marquee');
        Cache::forget('api.marquee');
    }

    protected function clearStatCache(): void
    {
        Cache::forget('public.stats');
        Cache::forget('api.stats');
    }

    protected function clearTimelineCache(): void
    {
        Cache::forget('public.timeline');
        Cache::forget('api.timeline');
    }

    protected function clearProcessStepCache(): void
    {
        Cache::forget('public.process_steps');
        Cache::forget('api.process_steps');
    }

    protected function clearProductCache(string $type, string $slug): void
    {
        Cache::forget('public.products.export');
        Cache::forget('public.products.import');
        Cache::forget("public.product.{$type}.{$slug}");
        Cache::forget('api.products');
        Cache::forget("api.products.{$type}");
        Cache::forget("api.product.{$slug}");
    }
}
