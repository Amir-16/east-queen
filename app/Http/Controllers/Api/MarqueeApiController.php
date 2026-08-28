<?php
namespace App\Http\Controllers\Api;

use App\Models\MarqueeItem;
use Illuminate\Http\JsonResponse;

class MarqueeApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.marquee', 3600,
            fn () => MarqueeItem::active()->ordered()->get()
        );
        return response()->json($data);
    }
}
