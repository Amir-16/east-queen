<?php
namespace App\Models;

use App\Traits\CleansUploadedImages;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Product extends Model {
    use CleansUploadedImages;

    protected array $storageImages = ['image'];

    protected $fillable = [
        'name','slug','type','category','detail_title','icon','description',
        'long_description','image','gallery_images','specs','tags','use_cases',
        'sort_order','is_active',
    ];

    protected function casts(): array {
        return [
            'long_description' => 'array',
            'gallery_images'   => 'array',
            'specs'            => 'array',
            'tags'             => 'array',
            'use_cases'        => 'array',
            'is_active'        => 'boolean',
        ];
    }

    public function scopeActive(Builder $query): Builder {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder {
        return $query->orderBy('sort_order')->orderBy('id');
    }

    public function scopeExports(Builder $query): Builder {
        return $query->where('type', 'export');
    }

    public function scopeImports(Builder $query): Builder {
        return $query->where('type', 'import');
    }
}
