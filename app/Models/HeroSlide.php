<?php
namespace App\Models;

use App\Traits\CleansUploadedImages;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model {
    use CleansUploadedImages;

    protected array $storageImages = ['image_path'];

    protected $fillable = [
        'image_path','label','category','animation_preset',
        'title','subtitle','description','cta_text','cta_url','media_type','video_url',
        'is_active','sort_order',
    ];

    protected function casts(): array {
        return ['is_active' => 'boolean'];
    }

    public function scopeActive(Builder $query): Builder {
        return $query->where('is_active', true);
    }

    public function scopeOrdered(Builder $query): Builder {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
