<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

abstract class BaseApiController extends Controller {
    protected function cached(string $key, int $ttl, callable $callback): mixed {
        return cache()->remember($key, $ttl, $callback);
    }
}
