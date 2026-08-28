<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('hero_slides', function (Blueprint $table) {
            $table->string('title', 200)->nullable()->after('image_path');
            $table->string('subtitle', 200)->nullable()->after('title');
            $table->text('description')->nullable()->after('subtitle');
            $table->string('cta_text', 80)->nullable()->after('description');
            $table->string('cta_url', 255)->nullable()->after('cta_text');
            $table->enum('media_type', ['image', 'video'])->default('image')->after('cta_url');
            $table->string('video_url', 255)->nullable()->after('media_type');
        });
    }
    public function down(): void {
        Schema::table('hero_slides', function (Blueprint $table) {
            $table->dropColumn(['title','subtitle','description','cta_text','cta_url','media_type','video_url']);
        });
    }
};
