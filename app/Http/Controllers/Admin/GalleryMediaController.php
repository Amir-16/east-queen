<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Admin\Concerns\ManagesOrdering;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\GalleryMediaRequest;
use App\Models\GalleryCategory;
use App\Models\GalleryMedia;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GalleryMediaController extends Controller
{
    use ClearsPublicCache, ManagesOrdering;

    private function categories(): Collection
    {
        return GalleryCategory::active()->ordered()->get(['id', 'slug', 'label']);
    }

    public function index(): Response
    {
        return Inertia::render('Admin/Gallery/Index', [
            'media'      => GalleryMedia::ordered()->get(),
            'categories' => $this->categories(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Gallery/Create', [
            'categories' => $this->categories(),
        ]);
    }

    public function store(GalleryMediaRequest $request): RedirectResponse
    {
        $item = GalleryMedia::create($request->validated());
        $this->clearGalleryCache();

        return redirect()->route('admin.gallery.index')
            ->with('flash.success', "\"{$item->title}\" media item added.");
    }

    public function edit(GalleryMedia $gallery): Response
    {
        return Inertia::render('Admin/Gallery/Edit', [
            'media'      => $gallery,
            'categories' => $this->categories(),
        ]);
    }

    public function update(GalleryMediaRequest $request, GalleryMedia $gallery): RedirectResponse
    {
        $gallery->update($request->validated());
        $this->clearGalleryCache();

        return redirect()->route('admin.gallery.edit', $gallery->id)
            ->with('flash.success', "\"{$gallery->title}\" saved.");
    }

    public function destroy(GalleryMedia $gallery): RedirectResponse
    {
        $title = $gallery->title;
        $gallery->delete();
        $this->clearGalleryCache();

        return redirect()->route('admin.gallery.index')
            ->with('flash.success', "\"{$title}\" deleted.");
    }

    public function toggleActive(GalleryMedia $gallery): RedirectResponse
    {
        $gallery->update(['is_active' => ! $gallery->is_active]);
        $this->clearGalleryCache();

        return redirect()->route('admin.gallery.index');
    }

    public function reorder(Request $request): RedirectResponse
    {
        $result = $this->applyReorder($request, GalleryMedia::class, 'admin.gallery.index');
        $this->clearGalleryCache();

        return $result;
    }
}
