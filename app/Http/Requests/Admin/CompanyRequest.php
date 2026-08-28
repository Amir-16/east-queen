<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class CompanyRequest extends FormRequest {
    public function authorize(): bool { return true; }

    public function rules(): array {
        $id = $this->route('company')?->id;
        return [
            'name'             => 'required|string|max:120',
            'slug'             => ['required','string','max:120', Rule::unique('companies','slug')->ignore($id)],
            'tagline'          => 'nullable|string|max:200',
            'description'      => 'nullable|string',
            'long_description' => 'nullable|array',
            'long_description.*' => 'string',
            'industry'         => 'nullable|string|max:60',
            'services'         => 'nullable|array',
            'services.*'       => 'string|max:120',
            'logo'             => 'nullable|string|max:255',
            'cover_image'      => 'nullable|string|max:255',
            'gallery_images'   => 'nullable|array',
            'gallery_images.*' => 'string|max:255',
            'founded'          => 'nullable|integer|min:1800|max:2100',
            'team_size'        => 'nullable|integer|min:1',
            'website'          => 'nullable|url|max:255',
            'pdf_url'          => 'nullable|string|max:255',
            'export_items'     => 'nullable|array',
            'export_items.*'   => 'string|max:120',
            'import_items'     => 'nullable|array',
            'import_items.*'   => 'string|max:120',
            'color'            => 'nullable|string|max:120',
            'sort_order'       => 'nullable|integer',
            'is_active'        => 'boolean',
        ];
    }
}
