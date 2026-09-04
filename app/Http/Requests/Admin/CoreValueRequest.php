<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class CoreValueRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'icon_name'   => 'required|string|max:50',
            'title'       => 'required|string|max:100',
            'tagline'     => 'required|string|max:200',
            'description' => 'required|string',
            'detail'      => 'required|string',
            'sort_order'  => 'nullable|integer',
        ];
    }
}
