<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Admin\Concerns\ManagesOrdering;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GalleryCategoryRequest;
use App\Models\GalleryCategory;
use App\Models\GalleryMedia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryCategoryController extends Controller
{
    use ClearsPublicCache, ManagesOrdering;

    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Categories/Index', [
            'categories' => GalleryCategory::withCount('media')->ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Gallery/Categories/Create');
    }

    public function store(GalleryCategoryRequest $request): RedirectResponse
    {
        GalleryCategory::create($request->validated());
        $this->clearGalleryCategoryCache();

        return redirect()->route('admin.gallery-categories.index')
            ->with('flash.success', "Category \"{$request->label}\" created.");
    }

    public function edit(GalleryCategory $galleryCategory): Response
    {
        return Inertia::render('Admin/Gallery/Categories/Edit', [
            'category' => $galleryCategory,
        ]);
    }

    public function update(GalleryCategoryRequest $request, GalleryCategory $galleryCategory): RedirectResponse
    {
        $galleryCategory->update($request->validated());
        $this->clearGalleryCategoryCache();

        return redirect()->route('admin.gallery-categories.edit', $galleryCategory->id)
            ->with('flash.success', "\"{$galleryCategory->label}\" saved.");
    }

    public function destroy(GalleryCategory $galleryCategory): RedirectResponse
    {
        if (GalleryMedia::where('category', $galleryCategory->slug)->exists()) {
            return back()->with('flash.error',
                "Cannot delete \"{$galleryCategory->label}\" — reassign or remove its media items first.");
        }

        $label = $galleryCategory->label;
        $galleryCategory->delete();
        $this->clearGalleryCategoryCache();

        return redirect()->route('admin.gallery-categories.index')
            ->with('flash.success', "\"{$label}\" deleted.");
    }

    public function toggleActive(GalleryCategory $galleryCategory): RedirectResponse
    {
        $galleryCategory->update(['is_active' => ! $galleryCategory->is_active]);
        $this->clearGalleryCategoryCache();

        return redirect()->route('admin.gallery-categories.index');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $result = $this->applyReorder($request, GalleryCategory::class, 'admin.gallery-categories.index');
        $this->clearGalleryCategoryCache();

        return $result;
    }
}
