<?php
namespace App\Models;

use App\Traits\CleansUploadedImages;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Company extends Model {
    use CleansUploadedImages;

    protected array $storageImages = ['logo','cover_image'];

    protected $fillable = [
        'name','slug','tagline','description','long_description','industry',
        'services','logo','cover_image','gallery_images','founded','team_size',
        'website','pdf_url','export_items','import_items','color','sort_order','is_active',
    ];

    protected function casts(): array {
        return [
            'long_description' => 'array',
            'services'         => 'array',
            'gallery_images'   => 'array',
            'export_items'     => 'array',
            'import_items'     => 'array',
            'is_active'        => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
