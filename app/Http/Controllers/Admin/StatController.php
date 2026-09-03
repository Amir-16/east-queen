<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StatRequest;
use App\Models\Stat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatController extends Controller
{
    use ClearsPublicCache;

    public function index(): Response
    {
        return Inertia::render('Admin/Stats/Index', [
            'stats' => Stat::ordered()->get(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Stats/Create');
    }

    public function store(StatRequest $request): RedirectResponse
    {
        $stat = Stat::create($request->validated());
        $this->clearStatCache();

        return redirect()->route('admin.stats.index')
            ->with('flash.success', "\"{$stat->label}\" stat added.");
    }

    public function edit($stat): Response
    {
        return Inertia::render('Admin/Stats/Edit', [
            'stat' => Stat::findOrFail($stat),
        ]);
    }

    public function update(StatRequest $request, $stat): RedirectResponse
    {
        $model = Stat::findOrFail($stat);
        $model->update($request->validated());
        $this->clearStatCache();

        return redirect()->route('admin.stats.edit', $model->id)
            ->with('flash.success', "\"{$model->label}\" stat saved.");
    }

    public function destroy($stat): RedirectResponse
    {
        $model = Stat::findOrFail($stat);
        $label = $model->label;
        $model->delete();
        $this->clearStatCache();

        return redirect()->route('admin.stats.index')
            ->with('flash.success', "\"{$label}\" stat deleted.");
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);

        foreach ($request->order as $sortOrder => $id) {
            Stat::where('id', $id)->update(['sort_order' => $sortOrder]);
        }

        $this->clearStatCache();

        return redirect()->route('admin.stats.index');
    }
}
