<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class StatRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'label'      => 'required|string|max:80',
            'value'      => 'required|integer|min:0',
            'suffix'     => 'nullable|string|max:20',
            'icon'       => 'nullable|string|max:80',
            'sort_order' => 'nullable|integer',
        ];
    }
}
