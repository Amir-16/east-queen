<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class TimelineEntryRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'year'       => 'required|string|max:10',
            'title'      => 'required|string|max:120',
            'desc'       => 'required|string',
            'done'       => 'boolean',
            'sort_order' => 'nullable|integer',
        ];
    }
}
