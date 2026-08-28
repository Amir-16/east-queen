<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('slug', 120)->unique();
            $table->enum('type', ['export', 'import'])->default('export');
            $table->string('category', 80)->nullable();
            $table->string('detail_title', 200)->nullable();
            $table->string('icon', 10)->nullable();
            $table->text('description')->nullable();
            $table->json('long_description')->nullable();
            $table->string('image', 255)->nullable();
            $table->json('gallery_images')->nullable();
            $table->json('specs')->nullable();
            $table->json('tags')->nullable();
            $table->json('use_cases')->nullable();
            $table->smallInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('products'); }
};
