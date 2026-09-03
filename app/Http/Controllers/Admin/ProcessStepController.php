<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProcessStepRequest;
use App\Models\ProcessStep;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProcessStepController extends Controller {
    use ClearsPublicCache;
    public function index(): Response {
        return Inertia::render('Admin/ProcessSteps/Index', [
            'steps' => ProcessStep::ordered()->get(),
        ]);
    }

    public function create(): Response {
        return Inertia::render('Admin/ProcessSteps/Create');
    }

    public function store(ProcessStepRequest $request): RedirectResponse {
        $item = ProcessStep::create($request->validated());
        $this->clearProcessStepCache();
        return redirect()->route('admin.process-steps.index')
            ->with('flash.success', "\"{$item->title}\" added.");
    }

    public function edit(ProcessStep $processStep): Response {
        return Inertia::render('Admin/ProcessSteps/Edit', ['step' => $processStep]);
    }

    public function update(ProcessStepRequest $request, ProcessStep $processStep): RedirectResponse {
        $processStep->update($request->validated());
        $this->clearProcessStepCache();
        return redirect()->route('admin.process-steps.edit', $processStep->id)
            ->with('flash.success', "\"{$processStep->title}\" saved.");
    }

    public function destroy(ProcessStep $processStep): RedirectResponse {
        $title = $processStep->title;
        $processStep->delete();
        $this->clearProcessStepCache();
        return redirect()->route('admin.process-steps.index')
            ->with('flash.success', "\"{$title}\" deleted.");
    }

    public function reorder(Request $request): RedirectResponse {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);
        foreach ($request->order as $sortOrder => $id) {
            ProcessStep::where('id', $id)->update(['sort_order' => $sortOrder]);
        }
        $this->clearProcessStepCache();
        return redirect()->route('admin.process-steps.index');
    }
}
