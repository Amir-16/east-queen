<?php
namespace App\Http\Controllers\Api;

use App\Models\ProcessStep;
use Illuminate\Http\JsonResponse;

class ProcessStepApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.process_steps', 3600,
            fn () => ProcessStep::ordered()->get()
        );
        return response()->json($data);
    }
}
