<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GalleryMediaRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'category'      => ['required', Rule::exists('gallery_categories', 'slug')->where('is_active', true)],
            'type'          => 'required|in:image,video',
            'src'           => 'required|string|max:512',
            'thumbnail_src' => 'nullable|string|max:512',
            'title'         => 'nullable|string|max:150',
            'caption'       => 'nullable|string',
            'sort_order'    => 'nullable|integer',
            'is_active'     => 'boolean',
        ];
    }
}
