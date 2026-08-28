<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProductRequest extends FormRequest {
    public function authorize(): bool { return true; }

    public function rules(): array {
        $id = $this->route('product')?->id;
        return [
            'name'             => 'required|string|max:120',
            'slug'             => ['required','string','max:120', Rule::unique('products','slug')->ignore($id)],
            'type'             => 'required|in:export,import',
            'category'         => 'nullable|string|max:80',
            'detail_title'     => 'nullable|string|max:200',
            'icon'             => 'nullable|string|max:10',
            'description'      => 'nullable|string',
            'long_description' => 'nullable|array',
            'long_description.*' => 'string',
            'image'            => 'nullable|string|max:255',
            'gallery_images'   => 'nullable|array',
            'gallery_images.*' => 'string|max:255',
            'specs'            => 'nullable|array',
            'tags'             => 'nullable|array',
            'tags.*'           => 'string|max:60',
            'use_cases'        => 'nullable|array',
            'use_cases.*'      => 'string',
            'sort_order'       => 'nullable|integer',
            'is_active'        => 'boolean',
        ];
    }
}
