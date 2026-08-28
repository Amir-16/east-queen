<?php

namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait CleansUploadedImages
{
    protected static function bootCleansUploadedImages(): void
    {
        static::deleting(function (self $model) {
            foreach ($model->storageImages ?? [] as $field) {
                static::deleteFromPublicDisk($model->{$field});
            }
            foreach ($model->storageImageArrays ?? [] as $field) {
                foreach ((array) ($model->{$field} ?? []) as $url) {
                    static::deleteFromPublicDisk($url);
                }
            }
        });

        static::updating(function (self $model) {
            foreach ($model->storageImages ?? [] as $field) {
                if ($model->isDirty($field)) {
                    static::deleteFromPublicDisk($model->getOriginal($field));
                }
            }
            foreach ($model->storageImageArrays ?? [] as $field) {
                if ($model->isDirty($field)) {
                    $removed = array_diff(
                        (array) ($model->getOriginal($field) ?? []),
                        (array) ($model->{$field} ?? []),
                    );
                    foreach ($removed as $url) {
                        static::deleteFromPublicDisk($url);
                    }
                }
            }
        });
    }

    public static function deleteFromPublicDisk(?string $url): void
    {
        if (!$url) {
            return;
        }

        // Accepts both absolute (http://host/storage/uploads/file.jpg)
        // and relative (/storage/uploads/file.jpg) URLs.
        $urlPath = parse_url($url, PHP_URL_PATH) ?? $url;

        if (!str_starts_with($urlPath, '/storage/')) {
            return;
        }

        $storagePath = substr($urlPath, strlen('/storage/'));

        if ($storagePath) {
            Storage::disk('public')->delete($storagePath);
        }
    }
}
