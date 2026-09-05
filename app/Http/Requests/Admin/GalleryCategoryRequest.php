<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class GalleryCategoryRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        if ($this->isMethod('PUT') || $this->isMethod('PATCH')) {
            return [
                'label'      => 'required|string|max:100',
                'sort_order' => 'nullable|integer',
                'is_active'  => 'boolean',
            ];
        }

        return [
            'slug'       => [
                'required', 'string', 'max:50',
                'regex:/^[a-z0-9-]+$/',
                Rule::unique('gallery_categories', 'slug'),
            ],
            'label'      => 'required|string|max:100',
            'sort_order' => 'nullable|integer',
            'is_active'  => 'boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'slug.regex' => 'Slug may only contain lowercase letters, numbers, and hyphens.',
        ];
    }
}
