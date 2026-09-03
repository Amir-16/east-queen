<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AssociateRequest;
use App\Models\Associate;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AssociateController extends Controller {
    use ClearsPublicCache;
    public function index(): Response {
        return Inertia::render('Admin/Associates/Index', [
            'associates' => Associate::ordered()->get(),
        ]);
    }

    public function create(): Response {
        return Inertia::render('Admin/Associates/Create');
    }

    public function store(AssociateRequest $request): RedirectResponse {
        $item = Associate::create($request->validated());
        $this->clearAssociateCache();
        return redirect()->route('admin.associates.index')
            ->with('flash.success', "\"{$item->name}\" added.");
    }

    public function edit(Associate $associate): Response {
        return Inertia::render('Admin/Associates/Edit', ['associate' => $associate]);
    }

    public function update(AssociateRequest $request, Associate $associate): RedirectResponse {
        $associate->update($request->validated());
        $this->clearAssociateCache();
        return redirect()->route('admin.associates.edit', $associate->id)
            ->with('flash.success', "\"{$associate->name}\" saved.");
    }

    public function destroy(Associate $associate): RedirectResponse {
        $name = $associate->name;
        $associate->delete();
        $this->clearAssociateCache();
        return redirect()->route('admin.associates.index')
            ->with('flash.success', "\"{$name}\" removed.");
    }

    public function reorder(Request $request): RedirectResponse {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);
        foreach ($request->order as $sortOrder => $id) {
            Associate::where('id', $id)->update(['sort_order' => $sortOrder]);
        }
        $this->clearAssociateCache();
        return redirect()->route('admin.associates.index');
    }

    public function toggleActive(Associate $associate): RedirectResponse {
        $associate->update(['is_active' => !$associate->is_active]);
        $this->clearAssociateCache();
        return back()->with('flash.success', "\"{$associate->name}\" visibility updated.");
    }
}
