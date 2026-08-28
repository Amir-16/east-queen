<?php
namespace App\Http\Controllers\Api;

use App\Models\Setting;
use Illuminate\Http\JsonResponse;

class SettingApiController extends BaseApiController {
    public function show(string $group): JsonResponse {
        $allowed = ['company','chairman','seo','contact','about','social'];
        if (!in_array($group, $allowed)) {
            return response()->json(['error' => 'Not found'], 404);
        }
        $data = $this->cached("api.settings.{$group}", 3600,
            fn () => Setting::group($group)
        );
        return response()->json($data);
    }
}
