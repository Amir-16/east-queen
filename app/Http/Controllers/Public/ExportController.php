<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ProcessStep;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ExportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Export', [
            'products' => cache()->remember('public.products.export', 3600,
                fn () => Product::active()->exports()->ordered()->get()),

            'processSteps' => cache()->remember('public.process_steps', 3600,
                fn () => ProcessStep::ordered()->get()),
        ]);
    }
}
