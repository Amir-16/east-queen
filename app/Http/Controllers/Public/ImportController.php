<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\ProcessStep;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ImportController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Import', [
            'products' => cache()->remember('public.products.import', 3600,
                fn () => Product::active()->imports()->ordered()->get()),

            'processSteps' => cache()->remember('public.process_steps', 3600,
                fn () => ProcessStep::ordered()->get()),
        ]);
    }
}
