<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class HeroSlideRequest extends FormRequest {
    public function authorize(): bool { return true; }

    public function rules(): array {
        return [
            'image_path'       => 'nullable|string|max:255',
            'label'            => 'required|string|max:120',
            'category'         => 'nullable|string|max:80',
            'animation_preset' => 'nullable|string|max:30',
            'title'            => 'nullable|string|max:200',
            'subtitle'         => 'nullable|string|max:200',
            'description'      => 'nullable|string',
            'cta_text'         => 'nullable|string|max:80',
            'cta_url'          => 'nullable|string|max:255',
            'media_type'       => 'nullable|in:image,video',
            'video_url'        => 'nullable|string|max:255',
            'is_active'        => 'boolean',
            'sort_order'       => 'nullable|integer',
        ];
    }
}
