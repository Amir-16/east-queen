<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use enshrined\svgSanitize\Sanitizer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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

        $isSvg = strtolower((string) $request->file('image')?->getClientOriginalExtension()) === 'svg';

        $request->validate([
            'image' => $isSvg
                ? 'required|file|max:5120|mimetypes:image/svg+xml,image/svg,text/xml,application/xml,text/plain'
                : 'required|image|mimes:jpeg,png,webp,gif|max:5120',
        ]);

        $directory = 'uploads/' . now()->format('Y/m');

        $path = $isSvg
            ? $this->storeSanitizedSvg($request->file('image')->getRealPath(), $directory)
            : $request->file('image')->store($directory, 'public');

        // Relative path: independent of APP_URL (avoids localhost / double-slash URLs on live).
        return response()->json([
            'url' => '/storage/' . ltrim($path, '/'),
        ]);
    }

    /**
     * SVG is XML and can carry <script>, on* handlers and external references (stored XSS
     * if opened directly from our origin). Strip all of that before it touches disk.
     */
    private function storeSanitizedSvg(string $file, string $directory): string
    {
        $sanitizer = new Sanitizer();
        $sanitizer->removeRemoteReferences(true);
        $sanitizer->minify(true);

        $clean = $sanitizer->sanitize((string) file_get_contents($file));

        if (! is_string($clean) || ! str_contains($clean, '<svg')) {
            throw ValidationException::withMessages([
                'image' => ['This SVG file is invalid or could not be made safe.'],
            ]);
        }

        $path = $directory . '/' . Str::random(40) . '.svg';
        Storage::disk('public')->put($path, $clean);

        return $path;
    }
}
