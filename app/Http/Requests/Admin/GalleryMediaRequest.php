<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class GalleryMediaRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'category'   => 'required|in:fish,cattle,fruits,farm,team,videos',
            'type'        => 'required|in:image,video',
            'src'         => 'required|string|max:512',
            'title'       => 'nullable|string|max:150',
            'caption'     => 'nullable|string',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'boolean',
        ];
    }
}
