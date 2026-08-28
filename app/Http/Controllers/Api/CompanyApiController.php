<?php
namespace App\Http\Controllers\Api;

use App\Models\Company;
use Illuminate\Http\JsonResponse;

class CompanyApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.companies', 3600,
            fn () => Company::active()->ordered()->get()
        );
        return response()->json($data);
    }

    public function show(string $slug): JsonResponse {
        $data = $this->cached("api.company.{$slug}", 3600,
            fn () => Company::active()->where('slug', $slug)->firstOrFail()
        );
        return response()->json($data);
    }
}
