<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\CompanyRequest;
use App\Models\Company;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller {
    use ClearsPublicCache;
    public function index(): Response {
        return Inertia::render('Admin/Companies/Index', [
            'companies' => Company::ordered()->get([
                'id','name','slug','industry','logo','is_active','sort_order',
            ]),
        ]);
    }

    public function create(): Response {
        return Inertia::render('Admin/Companies/Create');
    }

    public function store(CompanyRequest $request): RedirectResponse {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $company = Company::create($data);
        $this->clearCompanyCache();
        return redirect()->route('admin.companies.index')
            ->with('flash.success', "\"{$company->name}\" added.");
    }

    public function edit(Company $company): Response {
        return Inertia::render('Admin/Companies/Edit', ['company' => $company]);
    }

    public function update(CompanyRequest $request, Company $company): RedirectResponse {
        $company->update($request->validated());
        $this->clearCompanyCache($company->slug);
        return redirect()->route('admin.companies.edit', $company->id)
            ->with('flash.success', "\"{$company->name}\" saved.");
    }

    public function destroy(Company $company): RedirectResponse {
        $name = $company->name;
        $this->clearCompanyCache($company->slug);
        $company->delete();
        return redirect()->route('admin.companies.index')
            ->with('flash.success', "\"{$name}\" deleted.");
    }

    public function reorder(Request $request): RedirectResponse {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);
        foreach ($request->order as $sortOrder => $id) {
            Company::where('id', $id)->update(['sort_order' => $sortOrder]);
        }
        $this->clearCompanyCache();
        return redirect()->route('admin.companies.index');
    }

    public function toggleActive(Company $company): RedirectResponse {
        $company->update(['is_active' => !$company->is_active]);
        $this->clearCompanyCache();
        return back()->with('flash.success', "\"{$company->name}\" visibility updated.");
    }
}
