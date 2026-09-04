<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class GalleryMediaRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'category'      => 'required|in:operations,products,facilities',
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
