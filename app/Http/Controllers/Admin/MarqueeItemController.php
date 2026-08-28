<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarqueeItemRequest;
use App\Models\MarqueeItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;

class MarqueeItemController extends Controller {
    public function index(): Response {
        return Inertia::render('Admin/MarqueeItems/Index', [
            'items' => MarqueeItem::ordered()->get(),
        ]);
    }

    public function create(): Response {
        return Inertia::render('Admin/MarqueeItems/Create');
    }

    public function store(MarqueeItemRequest $request): RedirectResponse {
        $item = MarqueeItem::create($request->validated());
        Cache::forget('api.marquee');
        return redirect()->route('admin.marquee.index')
            ->with('flash.success', "Marquee item added.");
    }

    public function edit(MarqueeItem $marquee): Response {
        return Inertia::render('Admin/MarqueeItems/Edit', ['item' => $marquee]);
    }

    public function update(MarqueeItemRequest $request, MarqueeItem $marquee): RedirectResponse {
        $marquee->update($request->validated());
        Cache::forget('api.marquee');
        return redirect()->route('admin.marquee.edit', $marquee->id)
            ->with('flash.success', "Marquee item saved.");
    }

    public function destroy(MarqueeItem $marquee): RedirectResponse {
        $marquee->delete();
        Cache::forget('api.marquee');
        return redirect()->route('admin.marquee.index')
            ->with('flash.success', "Marquee item deleted.");
    }

    public function reorder(Request $request): RedirectResponse {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);
        foreach ($request->order as $sortOrder => $id) {
            MarqueeItem::where('id', $id)->update(['sort_order' => $sortOrder]);
        }
        Cache::forget('api.marquee');
        return redirect()->route('admin.marquee.index');
    }

    public function toggleActive(MarqueeItem $marquee): RedirectResponse {
        $marquee->update(['is_active' => !$marquee->is_active]);
        Cache::forget('api.marquee');
        return back()->with('flash.success', "Marquee item visibility updated.");
    }
}
