<?php
namespace App\Models;

use App\Traits\CleansUploadedImages;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Associate extends Model {
    use CleansUploadedImages;

    protected array $storageImages = ['logo'];

    protected $fillable = [
        'name','initials','logo','country','website','description','color','sort_order','is_active',
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
