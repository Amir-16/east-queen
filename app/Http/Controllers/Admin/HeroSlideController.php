<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\HeroSlideRequest;
use App\Models\HeroSlide;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class HeroSlideController extends Controller
{
    private const PRESETS = [
        'zoom_out'    => 'Zoom Out',
        'zoom_in'     => 'Zoom In',
        'pan_right'   => 'Pan Right',
        'pan_left'    => 'Pan Left',
        'pan_up'      => 'Pan Up',
        'pan_down'    => 'Pan Down',
        'diagonal_lr' => 'Diagonal (L→R)',
        'diagonal_rl' => 'Diagonal (R→L)',
    ];

    public function index(): Response
    {
        return Inertia::render('Admin/HeroSlides/Index', [
            'slides' => HeroSlide::ordered()->get([
                'id', 'image_path', 'label', 'category', 'animation_preset', 'is_active', 'sort_order',
            ]),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/HeroSlides/Create', [
            'presets' => self::PRESETS,
        ]);
    }

    public function store(HeroSlideRequest $request): RedirectResponse
    {
        HeroSlide::create($request->validated());
        Cache::forget('public.hero_slides');

        return redirect()->route('admin.hero-slides.index')
            ->with('flash.success', 'Hero slide added successfully.');
    }

    public function edit(HeroSlide $heroSlide): Response
    {
        return Inertia::render('Admin/HeroSlides/Edit', [
            'slide'   => $heroSlide,
            'presets' => self::PRESETS,
        ]);
    }

    public function update(HeroSlideRequest $request, HeroSlide $heroSlide): RedirectResponse
    {
        $heroSlide->update($request->validated());
        Cache::forget('public.hero_slides');

        return redirect()->route('admin.hero-slides.index')
            ->with('flash.success', "\"{$heroSlide->label}\" updated successfully.");
    }

    public function destroy(HeroSlide $heroSlide): RedirectResponse
    {
        $label = $heroSlide->label;
        $heroSlide->delete();
        Cache::forget('public.hero_slides');

        return back()->with('flash.success', "\"{$label}\" deleted.");
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);

        foreach ($request->order as $sortOrder => $id) {
            HeroSlide::where('id', $id)->update(['sort_order' => $sortOrder]);
        }

        Cache::forget('public.hero_slides');

        return redirect()->route('admin.hero-slides.index');
    }

    public function toggleActive(HeroSlide $heroSlide): RedirectResponse
    {
        $heroSlide->update(['is_active' => ! $heroSlide->is_active]);
        Cache::forget('public.hero_slides');

        return back()->with('flash.success', "\"{$heroSlide->label}\" visibility updated.");
    }
}
