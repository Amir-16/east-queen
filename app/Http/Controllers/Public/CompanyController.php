<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\Company;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class CompanyController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Public/Companies', [
            'companies' => cache()->remember('public.companies', 3600,
                fn () => Company::active()->ordered()->get()),
        ]);
    }

    public function show(string $slug): Response
    {
        try {
            $company = cache()->remember("public.company.{$slug}", 3600,
                fn () => Company::active()->where('slug', $slug)->firstOrFail());
        } catch (ModelNotFoundException) {
            abort(404);
        }

        $otherCompanies = cache()->remember('public.companies', 3600,
            fn () => Company::active()->ordered()->get());

        return Inertia::render('Public/CompanyDetail', [
            'company'        => $company,
            'otherCompanies' => $otherCompanies->where('slug', '!=', $slug)->values(),
        ]);
    }
}
