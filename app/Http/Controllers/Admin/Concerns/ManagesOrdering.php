<?php

namespace App\Http\Controllers\Admin\Concerns;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

trait ManagesOrdering
{
    protected function applyReorder(Request $request, string $modelClass, string $route): RedirectResponse
    {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);

        foreach ($request->order as $sortOrder => $id) {
            $modelClass::where('id', $id)->update(['sort_order' => $sortOrder]);
        }

        return redirect()->route($route);
    }
}
