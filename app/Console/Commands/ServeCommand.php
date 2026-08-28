<?php

namespace App\Console\Commands;

use Illuminate\Foundation\Console\ServeCommand as BaseServeCommand;

/**
 * Overrides `artisan serve` to raise PHP upload limits for the built-in
 * development server. The built-in server ignores .user.ini and .htaccess,
 * and upload_max_filesize / post_max_size are PHP_INI_SYSTEM — they cannot
 * be changed with ini_set(). Passing -d flags is the only reliable approach.
 */
class ServeCommand extends BaseServeCommand
{
    protected function serverCommand(): array
    {
        $command = parent::serverCommand();

        // Inject -d overrides right after the PHP binary (index 0).
        array_splice($command, 1, 0, [
            '-d', 'upload_max_filesize=25M',
            '-d', 'post_max_size=26M',
        ]);

        return $command;
    }
}
