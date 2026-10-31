<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class AssociateRequest extends FormRequest {
    public function authorize(): bool { return true; }

    // ConvertEmptyStringsToNull turns a blank initials field into null, but the column is NOT NULL.
    // Fall back to letters derived from the name so the DB never receives null.
    protected function prepareForValidation(): void {
        $initials = trim((string) $this->input('initials'));

        if ($initials === '') {
            $initials = collect(preg_split('/[\s\-_]+/u', trim((string) $this->input('name')), -1, PREG_SPLIT_NO_EMPTY))
                ->map(fn (string $word) => mb_strtoupper(mb_substr($word, 0, 1)))
                ->take(3)
                ->implode('');
        }

        $this->merge(['initials' => $initials]);
    }

    public function rules(): array {
        return [
            'name'        => 'required|string|max:120',
            'initials'    => 'required|string|max:3',
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
