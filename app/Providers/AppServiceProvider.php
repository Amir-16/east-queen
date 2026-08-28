<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void {}

    public function boot(): void
    {
        // Inertia receives props via Responsable::toResponse() on resource collections.
        // Without this, every ResourceCollection is wrapped in {data:[...]} instead of
        // a plain array, breaking all .map() calls on the frontend.
        JsonResource::withoutWrapping();

        $this->configureRateLimiters();
    }

    private function configureRateLimiters(): void
    {
        RateLimiter::for('contact', function (Request $request) {
            $ip    = $request->ip();
            $email = strtolower(trim($request->input('email', '')));

            return [
                // Per-IP: burst guard (1/min) + hourly hard cap (5/hr)
                Limit::perMinute(5)->by("contact:ip:{$ip}"),
                Limit::perHour(5)->by("contact:ip:{$ip}"),

                // Per-email: stops the same address being used across IPs/proxies
                Limit::perHour(3)->by("contact:email:{$email}"),
            ];
        });
    }
}
