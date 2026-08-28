<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Companies');
    }

    public function show(string $slug): Response
    {
        return Inertia::render('Public/CompanyDetail', [
            'slug' => $slug,
        ]);
    }
}
