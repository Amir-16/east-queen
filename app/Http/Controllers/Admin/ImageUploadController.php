<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class ImageUploadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // When PHP's upload_max_filesize is exceeded, $_FILES is empty.
        // Detect this early and return a clear error instead of "required".
        if ($request->hasHeader('Content-Length') && empty($_FILES)) {
            throw ValidationException::withMessages([
                'image' => ['File too large for server. Ask your host to raise upload_max_filesize (currently ' . ini_get('upload_max_filesize') . ').'],
            ]);
        }

        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,webp,gif|max:5120',
        ]);

        $path = $request->file('image')->store('uploads/' . now()->format('Y/m'), 'public');

        return response()->json([
            'url' => Storage::url($path),
        ]);
    }
}
