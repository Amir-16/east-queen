<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Admin\Concerns\ManagesOrdering;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\DifferentiatorRequest;
use App\Models\Differentiator;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DifferentiatorController extends Controller
{
    use ClearsPublicCache, ManagesOrdering;

    public function index(): Response
    {
        return Inertia::render('Admin/Differentiators/Index', [
            'items' => Differentiator::ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Differentiators/Create');
    }

    public function store(DifferentiatorRequest $request): RedirectResponse
    {
        $item = Differentiator::create($request->validated());
        $this->clearDifferentiatorCache();

        return redirect()->route('admin.differentiators.index')
            ->with('flash.success', "\"{$item->title}\" added.");
    }

    public function edit(Differentiator $differentiator): Response
    {
        return Inertia::render('Admin/Differentiators/Edit', ['item' => $differentiator]);
    }

    public function update(DifferentiatorRequest $request, Differentiator $differentiator): RedirectResponse
    {
        $differentiator->update($request->validated());
        $this->clearDifferentiatorCache();

        return redirect()->route('admin.differentiators.edit', $differentiator->id)
            ->with('flash.success', "\"{$differentiator->title}\" saved.");
    }

    public function destroy(Differentiator $differentiator): RedirectResponse
    {
        $title = $differentiator->title;
        $differentiator->delete();
        $this->clearDifferentiatorCache();

        return redirect()->route('admin.differentiators.index')
            ->with('flash.success', "\"{$title}\" deleted.");
    }

    public function reorder(Request $request): RedirectResponse
    {
        $result = $this->applyReorder($request, Differentiator::class, 'admin.differentiators.index');
        $this->clearDifferentiatorCache();

        return $result;
    }
}
