<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Contact extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'service',
        'message', 'status', 'ip_address', 'admin_notes',
    ];

    public function scopeUnread(Builder $query): Builder
    {
        return $query->where('status', 'new');
    }

    public function scopeLatest(Builder $query): Builder
    {
        return $query->orderBy('created_at', 'desc');
    }

    public function markRead(): void
    {
        $this->update(['status' => 'read']);
    }

    public function markReplied(): void
    {
        $this->update(['status' => 'replied']);
    }
}
