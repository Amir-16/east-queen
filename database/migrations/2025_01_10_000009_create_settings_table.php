<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('group', 60);
            $table->string('key', 100);
            $table->text('value')->nullable();
            $table->enum('type', ['text', 'number', 'boolean', 'json', 'textarea', 'image', 'url'])
                  ->default('text');
            $table->string('label', 120)->nullable();
            $table->smallInteger('sort_order')->default(0);
            $table->timestamps();

            $table->unique(['group', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
