<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    use ClearsPublicCache;

    private const GROUPS = ['company', 'seo', 'social', 'ship_hero', 'about', 'chairman', 'mission_vision'];

    public function index(): Response
    {
        $groups = [];
        foreach (self::GROUPS as $group) {
            $groups[$group] = Setting::where('group', $group)
                ->orderBy('sort_order')
                ->pluck('value', 'key')
                ->toArray();
        }

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $groups,
        ]);
    }

    public function update(Request $request, string $group): RedirectResponse
    {
        abort_unless(in_array($group, self::GROUPS), 404);

        foreach ($request->except(['_token', '_method']) as $key => $value) {
            Setting::updateOrCreate(
                ['group' => $group, 'key' => $key],
                ['value' => is_array($value) ? json_encode($value) : (string) ($value ?? '')]
            );
        }

        cache()->forget("settings.{$group}");

        // Shared-prop caches (every page)
        if ($group === 'company')       cache()->forget('settings.company');
        if ($group === 'seo')           cache()->forget('settings.seo');
        if ($group === 'chairman')      cache()->forget('settings.chairman');
        if (in_array($group, ['about', 'chairman', 'mission_vision'])) {
            $this->clearAboutCache();
        }

        return back()->with('flash.success', ucfirst(str_replace('_', ' ', $group)) . ' settings saved.');
    }
}
