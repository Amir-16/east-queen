<?php
namespace App\Http\Controllers\Api;

use App\Models\TimelineEntry;
use Illuminate\Http\JsonResponse;

class TimelineApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.timeline', 3600,
            fn () => TimelineEntry::orderBy('year')->get()
        );
        return response()->json($data);
    }
}
