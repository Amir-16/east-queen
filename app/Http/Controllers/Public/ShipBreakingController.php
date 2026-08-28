<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class ShipBreakingController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Public/ShipBreaking');
    }
}
