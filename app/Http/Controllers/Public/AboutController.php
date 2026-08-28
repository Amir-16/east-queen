<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AboutController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/About');
    }

    public function missionVision(): Response
    {
        return Inertia::render('Public/MissionVision');
    }

    public function coreValues(): Response
    {
        return Inertia::render('Public/CoreValues');
    }
}
