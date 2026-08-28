<?php
namespace App\Http\Controllers\Api;

use App\Models\Product;
use Illuminate\Http\JsonResponse;

class ProductApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.products', 3600,
            fn () => Product::active()->ordered()->get()
        );
        return response()->json($data);
    }

    public function exports(): JsonResponse {
        $data = $this->cached('api.products.export', 3600,
            fn () => Product::active()->exports()->ordered()->get()
        );
        return response()->json($data);
    }

    public function imports(): JsonResponse {
        $data = $this->cached('api.products.import', 3600,
            fn () => Product::active()->imports()->ordered()->get()
        );
        return response()->json($data);
    }

    public function show(string $slug): JsonResponse {
        $data = $this->cached("api.product.{$slug}", 3600,
            fn () => Product::active()->where('slug', $slug)->firstOrFail()
        );
        return response()->json($data);
    }
}
