<?php
namespace App\Http\Controllers\Api;

use App\Models\HeroSlide;
use Illuminate\Http\JsonResponse;

class HeroSlideApiController extends BaseApiController {
    public function index(): JsonResponse {
        $data = $this->cached('api.hero_slides', 3600,
            fn () => HeroSlide::active()->ordered()->get()
        );
        return response()->json($data);
    }
}
