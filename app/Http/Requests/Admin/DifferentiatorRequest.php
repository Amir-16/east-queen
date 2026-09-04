<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class DifferentiatorRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'title'      => 'required|string|max:150',
            'body'       => 'required|string',
            'image'      => 'nullable|string|max:300',
            'chip_color' => 'nullable|string|max:30',
            'sort_order' => 'nullable|integer',
        ];
    }
}
