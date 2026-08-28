<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Support\Facades\Route;

return Application::configure(basePath: dirname(__DIR__))
    ->withCommands([
        \App\Console\Commands\ServeCommand::class,
    ])
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
        then: function () {
            Route::middleware('web')
                ->group(base_path('routes/admin.php'));
        },
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        $middleware->alias([
            'auth.admin' => \App\Http\Middleware\EnsureIsAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Convert 429 throttle errors into Inertia-friendly validation errors so the
        // contact form shows an inline message instead of a blank 429 page.
        $exceptions->render(function (
            \Illuminate\Http\Exceptions\ThrottleRequestsException $e,
            \Illuminate\Http\Request $request,
        ) {
            if ($request->inertia()) {
                $retryAfter = (int) ($e->getHeaders()['Retry-After'] ?? 60);

                return back()
                    ->with('flash.rate_limit_retry_after', $retryAfter)
                    ->withErrors(['rate_limit' => 'Too many submissions — please wait before trying again.']);
            }
        });
    })->create();
