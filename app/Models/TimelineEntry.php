<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class TimelineEntry extends Model
{
    public $timestamps = false;

    protected $fillable = ['year', 'title', 'desc', 'done', 'sort_order'];

    protected function casts(): array
    {
        return ['done' => 'boolean'];
    }

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order');
    }
}
