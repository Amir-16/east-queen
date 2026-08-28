<?php

namespace App\Mail\Concerns;

trait HasEmbeddedLogo
{
    /**
     * Returns the logo as a base64 data URI so email clients never need
     * to fetch it from an external URL (which fails for localhost and
     * unreachable servers).
     */
    protected function logoSrc(): string
    {
        $path = public_path('images/logo/JB -LOGO.png');

        if (! file_exists($path)) {
            return '';
        }

        return 'data:image/png;base64,' . base64_encode(file_get_contents($path));
    }
}
