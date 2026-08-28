<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('associates', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('initials', 3)->default('');
            $table->string('logo', 255)->nullable();
            $table->string('country', 80)->nullable();
            $table->string('website', 255)->nullable();
            $table->text('description')->nullable();
            $table->string('color', 80)->default('bg-navy-800');
            $table->smallInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('associates'); }
};
