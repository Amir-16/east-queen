<?php
namespace App\Http\Controllers\Api;

use App\Models\Stat;
use Illuminate\Http\JsonResponse;

class StatApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.stats', 3600,
            fn () => Stat::ordered()->get()
        );
        return response()->json($data);
    }
}
