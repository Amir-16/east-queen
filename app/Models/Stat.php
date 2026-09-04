<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Stat extends Model
{
    public $timestamps = false;

    protected $fillable = ['label', 'value', 'suffix', 'icon', 'color', 'count_start', 'sort_order'];

    protected function casts(): array
    {
        return ['value' => 'integer', 'count_start' => 'integer'];
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }
}
