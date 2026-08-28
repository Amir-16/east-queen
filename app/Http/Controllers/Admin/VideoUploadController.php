<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class VideoUploadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        // Case 1: post_max_size exceeded — PHP silently empties $_FILES entirely.
        if ($request->hasHeader('Content-Length') && empty($_FILES)) {
            throw ValidationException::withMessages([
                'video' => ['The file exceeds the server\'s maximum POST size (' . ini_get('post_max_size') . '). Ask your host to raise post_max_size.'],
            ]);
        }

        // Case 2: upload_max_filesize exceeded — PHP keeps the $_FILES entry but marks it with UPLOAD_ERR_INI_SIZE.
        // Laravel's UploadedFile wrapper still exposes the raw error code, but checking $_FILES directly is simplest.
        $rawUploadError = $_FILES['video']['error'] ?? null;
        if (in_array($rawUploadError, [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true)) {
            throw ValidationException::withMessages([
                'video' => ['The file exceeds the server\'s upload limit (' . ini_get('upload_max_filesize') . '). Ask your host to raise upload_max_filesize.'],
            ]);
        }

        $request->validate([
            'video' => 'required|file|mimes:mp4,mov,webm|max:20480', // 20 MB
        ]);

        $path = $request->file('video')->store('uploads/videos/' . now()->format('Y/m'), 'public');

        return response()->json([
            'url' => Storage::url($path),
        ]);
    }
}
