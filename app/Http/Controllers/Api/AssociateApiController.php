<?php
namespace App\Http\Controllers\Api;

use App\Models\Associate;
use Illuminate\Http\JsonResponse;

class AssociateApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.associates', 3600,
            fn () => Associate::active()->ordered()->get()
        );
        return response()->json($data);
    }
}
