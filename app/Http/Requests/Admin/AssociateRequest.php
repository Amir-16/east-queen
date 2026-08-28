<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AssociateRequest extends FormRequest {
    public function authorize(): bool { return true; }

    public function rules(): array {
        return [
            'name'        => 'required|string|max:120',
            'initials'    => 'nullable|string|max:3',
            'logo'        => 'nullable|string|max:255',
            'country'     => 'nullable|string|max:80',
            'website'     => 'nullable|url|max:255',
            'description' => 'nullable|string',
            'color'       => 'nullable|string|max:80',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'boolean',
        ];
    }
}
