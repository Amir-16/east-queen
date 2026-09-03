<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Admin\Concerns\ClearsPublicCache;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\ProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller {
    use ClearsPublicCache;
    public function index(): Response {
        return Inertia::render('Admin/Products/Index', [
            'products' => Product::ordered()->get([
                'id','name','slug','type','category','image','is_active','sort_order',
            ]),
        ]);
    }

    public function create(): Response {
        return Inertia::render('Admin/Products/Create');
    }

    public function store(ProductRequest $request): RedirectResponse {
        $data = $request->validated();
        $data['slug'] = $data['slug'] ?? Str::slug($data['name']);
        $product = Product::create($data);
        $this->clearProductCache($product->type, $product->slug);
        return redirect()->route('admin.products.index')
            ->with('flash.success', "\"{$product->name}\" added.");
    }

    public function edit(Product $product): Response {
        return Inertia::render('Admin/Products/Edit', ['product' => $product]);
    }

    public function update(ProductRequest $request, Product $product): RedirectResponse {
        $product->update($request->validated());
        $this->clearProductCache($product->type, $product->slug);
        return redirect()->route('admin.products.edit', $product->id)
            ->with('flash.success', "\"{$product->name}\" saved.");
    }

    public function destroy(Product $product): RedirectResponse {
        $name = $product->name;
        $this->clearProductCache($product->type, $product->slug);
        $product->delete();
        return redirect()->route('admin.products.index')
            ->with('flash.success', "\"{$name}\" deleted.");
    }

    public function reorder(Request $request): RedirectResponse {
        $request->validate(['order' => 'required|array', 'order.*' => 'integer']);
        foreach ($request->order as $sortOrder => $id) {
            Product::where('id', $id)->update(['sort_order' => $sortOrder]);
        }
        // Reorder affects both types; clear lists but not individual product caches
        $this->clearProductCache('export', '');
        $this->clearProductCache('import', '');
        return redirect()->route('admin.products.index');
    }

    public function toggleActive(Product $product): RedirectResponse {
        $product->update(['is_active' => !$product->is_active]);
        $this->clearProductCache($product->type, $product->slug);
        return back()->with('flash.success', "\"{$product->name}\" visibility updated.");
    }
}
