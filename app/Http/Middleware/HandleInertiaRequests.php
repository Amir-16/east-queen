<?php

namespace App\Http\Middleware;

use App\Models\Contact;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        if ($success = $request->session()->get('flash.success')) {
            Inertia::flash('success', $success);
        }
        if ($error = $request->session()->get('flash.error')) {
            Inertia::flash('error', $error);
        }
        if ($retryAfter = $request->session()->get('flash.rate_limit_retry_after')) {
            Inertia::flash('rate_limit_retry_after', $retryAfter);
        }

        return array_merge(parent::share($request), [
            'company'  => fn () => cache()->remember('settings.company', 3600, fn () => Setting::group('company')),
            'chairman' => fn () => cache()->remember('settings.chairman', 3600, fn () => Setting::group('chairman')),
            'seo'      => fn () => cache()->remember('settings.seo', 3600, fn () => Setting::group('seo')),

            'adminUser' => fn () => $request->user()?->only(['id', 'name', 'email']),

            'unreadContacts' => fn () => $request->user()?->is_admin
                ? cache()->remember('contacts.unread', 60, fn () => Contact::unread()->count())
                : null,
        ]);
    }
}
