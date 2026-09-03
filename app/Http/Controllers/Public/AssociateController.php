<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Associate;
use Inertia\Inertia;
use Inertia\Response;

class AssociateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Associates', [
            'associates' => cache()->remember('public.associates', 3600,
                fn () => Associate::active()->ordered()->get()),
        ]);
    }
}
