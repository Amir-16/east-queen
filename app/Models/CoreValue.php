<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class CoreValue extends Model
{
    public $timestamps = false;

    protected $fillable = ['icon_name', 'title', 'tagline', 'description', 'detail', 'sort_order'];

    public function scopeOrdered(Builder $query): Builder
    {
        return $query->orderBy('sort_order')->orderBy('id');
    }
}
