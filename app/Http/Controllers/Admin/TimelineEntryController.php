<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Admin\Concerns\ManagesOrdering;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\TimelineEntryRequest;
use App\Models\TimelineEntry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TimelineEntryController extends Controller
{
    use ClearsPublicCache, ManagesOrdering;

    public function index(): Response
    {
        return Inertia::render('Admin/Timeline/Index', [
            'entries' => TimelineEntry::ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Timeline/Create');
    }

    public function store(TimelineEntryRequest $request): RedirectResponse
    {
        $entry = TimelineEntry::create($request->validated());
        $this->clearTimelineCache();

        return redirect()->route('admin.timeline.index')
            ->with('flash.success', "\"{$entry->title}\" timeline entry added.");
    }

    public function edit(TimelineEntry $timeline): Response
    {
        return Inertia::render('Admin/Timeline/Edit', ['entry' => $timeline]);
    }

    public function update(TimelineEntryRequest $request, TimelineEntry $timeline): RedirectResponse
    {
        $timeline->update($request->validated());
        $this->clearTimelineCache();

        return redirect()->route('admin.timeline.edit', $timeline->id)
            ->with('flash.success', "\"{$timeline->title}\" saved.");
    }

    public function destroy(TimelineEntry $timeline): RedirectResponse
    {
        $title = $timeline->title;
        $timeline->delete();
        $this->clearTimelineCache();

        return redirect()->route('admin.timeline.index')
            ->with('flash.success', "\"{$title}\" deleted.");
    }

    public function reorder(Request $request): RedirectResponse
    {
        $result = $this->applyReorder($request, TimelineEntry::class, 'admin.timeline.index');
        $this->clearTimelineCache();

        return $result;
    }
}
