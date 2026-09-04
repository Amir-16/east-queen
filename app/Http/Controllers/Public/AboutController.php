<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\CoreValue;
use App\Models\Differentiator;
use App\Models\Setting;
use App\Models\Stat;
use App\Models\TimelineEntry;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/About', [
            'about'    => cache()->remember('public.about', 3600,
                fn () => Setting::group('about')->toArray()),
            'timeline' => cache()->remember('public.timeline', 3600,
                fn () => TimelineEntry::ordered()->get()),
            'stats'    => cache()->remember('public.stats', 3600,
                fn () => Stat::ordered()->get()),
            'differentiators' => cache()->remember('public.differentiators', 3600,
                fn () => Differentiator::ordered()->get()),
        ]);
    }

    public function missionVision(): Response
    {
        return Inertia::render('Public/MissionVision', [
            'mv' => cache()->remember('public.mission_vision', 3600,
                fn () => Setting::group('mission_vision')->toArray()),
        ]);
    }

    public function coreValues(): Response
    {
        return Inertia::render('Public/CoreValues', [
            'values' => cache()->remember('public.core_values', 3600,
                fn () => CoreValue::ordered()->get()),
        ]);
    }
}
