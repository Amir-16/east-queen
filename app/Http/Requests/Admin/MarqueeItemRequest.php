<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class MarqueeItemRequest extends FormRequest {
    public function authorize(): bool { return true; }

    public function rules(): array {
        return [
            'text'       => 'required|string|max:200',
            'sort_order' => 'nullable|integer',
            'is_active'  => 'boolean',
        ];
    }
}
