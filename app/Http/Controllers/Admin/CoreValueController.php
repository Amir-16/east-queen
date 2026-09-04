<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Admin\Concerns\ManagesOrdering;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CoreValueRequest;
use App\Models\CoreValue;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CoreValueController extends Controller
{
    use ClearsPublicCache, ManagesOrdering;

    public function index(): Response
    {
        return Inertia::render('Admin/CoreValues/Index', [
            'values' => CoreValue::ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/CoreValues/Create');
    }

    public function store(CoreValueRequest $request): RedirectResponse
    {
        $value = CoreValue::create($request->validated());
        $this->clearCoreValueCache();

        return redirect()->route('admin.core-values.index')
            ->with('flash.success', "\"{$value->title}\" added.");
    }

    public function edit(CoreValue $coreValue): Response
    {
        return Inertia::render('Admin/CoreValues/Edit', ['value' => $coreValue]);
    }

    public function update(CoreValueRequest $request, CoreValue $coreValue): RedirectResponse
    {
        $coreValue->update($request->validated());
        $this->clearCoreValueCache();

        return redirect()->route('admin.core-values.edit', $coreValue->id)
            ->with('flash.success', "\"{$coreValue->title}\" saved.");
    }

    public function destroy(CoreValue $coreValue): RedirectResponse
    {
        $title = $coreValue->title;
        $coreValue->delete();
        $this->clearCoreValueCache();

        return redirect()->route('admin.core-values.index')
            ->with('flash.success', "\"{$title}\" deleted.");
    }

    public function reorder(Request $request): RedirectResponse
    {
        $result = $this->applyReorder($request, CoreValue::class, 'admin.core-values.index');
        $this->clearCoreValueCache();

        return $result;
    }
}
