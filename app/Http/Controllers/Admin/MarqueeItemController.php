<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\MarqueeItemRequest;
use App\Models\MarqueeItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MarqueeItemController extends Controller {
    use ClearsPublicCache;
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
        $this->clearMarqueeCache();
        return redirect()->route('admin.marquee.index')
            ->with('flash.success', "Marquee item added.");
    }

    public function edit(MarqueeItem $marquee): Response {
        return Inertia::render('Admin/MarqueeItems/Edit', ['item' => $marquee]);
    }

    public function update(MarqueeItemRequest $request, MarqueeItem $marquee): RedirectResponse {
        $marquee->update($request->validated());
        $this->clearMarqueeCache();
        return redirect()->route('admin.marquee.edit', $marquee->id)
            ->with('flash.success', "Marquee item saved.");
    }

    public function destroy(MarqueeItem $marquee): RedirectResponse {
        $marquee->delete();
        $this->clearMarqueeCache();
        return redirect()->route('admin.marquee.index')
            ->with('flash.success', "Marquee item deleted.");
    }

    public function reorder(Request $request): RedirectResponse {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);
        foreach ($request->order as $sortOrder => $id) {
            MarqueeItem::where('id', $id)->update(['sort_order' => $sortOrder]);
        }
        $this->clearMarqueeCache();
        return redirect()->route('admin.marquee.index');
    }

    public function toggleActive(MarqueeItem $marquee): RedirectResponse {
        $marquee->update(['is_active' => !$marquee->is_active]);
        $this->clearMarqueeCache();
        return back()->with('flash.success', "Marquee item visibility updated.");
    }
}
