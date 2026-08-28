<?php
namespace App\Http\Controllers\Api;

use App\Models\GalleryMedia;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GalleryApiController extends BaseApiController {
    public function index(Request $request): JsonResponse {
        $category = $request->query('category');
        $key = $category ? "api.gallery.{$category}" : 'api.gallery';
        $data = $this->cached($key, 3600, function () use ($category) {
            $q = GalleryMedia::active()->ordered();
            if ($category) $q->where('category', $category);
            return $q->get();
        });
        return response()->json($data);
    }
}
