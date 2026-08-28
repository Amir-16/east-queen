<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

class Setting extends Model
{
    protected $fillable = ['group', 'key', 'value', 'type', 'label', 'sort_order'];

    // ── Static Helpers ─────────────────────────────────────────────────

    /**
     * Get a single setting by dot notation: Setting::get('company.phone')
     */
    public static function get(string $dotKey, string $default = ''): string
    {
        [$group, $key] = array_pad(explode('.', $dotKey, 2), 2, '');

        return static::where('group', $group)
            ->where('key', $key)
            ->value('value') ?? $default;
    }

    /**
     * Get all settings in a group as key → value collection.
     */
    public static function group(string $group): Collection
    {
        return static::where('group', $group)
            ->orderBy('sort_order')
            ->pluck('value', 'key');
    }

    /**
     * Set (upsert) a setting value.
     */
    public static function set(string $dotKey, string $value): void
    {
        [$group, $key] = array_pad(explode('.', $dotKey, 2), 2, '');

        static::updateOrCreate(
            ['group' => $group, 'key' => $key],
            ['value' => $value]
        );
    }
}
