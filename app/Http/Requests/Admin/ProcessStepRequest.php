<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class ProcessStepRequest extends FormRequest {
    public function authorize(): bool { return true; }

    public function rules(): array {
        return [
            'step_number' => 'required|integer|min:1|max:20',
            'title'       => 'required|string|max:120',
            'description' => 'nullable|string',
            'icon'        => 'nullable|string|max:60',
            'sort_order'  => 'nullable|integer',
        ];
    }
}
