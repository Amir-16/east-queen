<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('companies', function (Blueprint $table) {
            $table->id();
            $table->string('name', 120);
            $table->string('slug', 120)->unique();
            $table->string('tagline', 200)->nullable();
            $table->text('description')->nullable();
            $table->json('long_description')->nullable();
            $table->string('industry', 60)->nullable();
            $table->json('services')->nullable();
            $table->string('logo', 255)->nullable();
            $table->string('cover_image', 255)->nullable();
            $table->json('gallery_images')->nullable();
            $table->unsignedSmallInteger('founded')->nullable();
            $table->unsignedSmallInteger('team_size')->nullable();
            $table->string('website', 255)->nullable();
            $table->string('pdf_url', 255)->nullable();
            $table->json('export_items')->nullable();
            $table->json('import_items')->nullable();
            $table->string('color', 120)->default('from-navy-900 to-navy-700');
            $table->smallInteger('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('companies'); }
};
