<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StatRequest;
use App\Models\Stat;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatController extends Controller
{
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

        return redirect()->route('admin.stats.edit', $model->id)
            ->with('flash.success', "\"{$model->label}\" stat saved.");
    }

    public function destroy($stat): RedirectResponse
    {
        $model = Stat::findOrFail($stat);
        $label = $model->label;
        $model->delete();

        return redirect()->route('admin.stats.index')
            ->with('flash.success', "\"{$label}\" stat deleted.");
    }

    public function reorder(Request $request): RedirectResponse
    {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);

        foreach ($request->order as $sortOrder => $id) {
            Stat::where('id', $id)->update(['sort_order' => $sortOrder]);
        }

        return redirect()->route('admin.stats.index');
    }
}
