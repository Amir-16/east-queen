<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('gallery_media', function (Blueprint $table) {
            // Poster image for video thumbnails — avoids loading the video file just for a preview frame
            $table->string('thumbnail_src', 512)->nullable()->after('src');

            // Speeds up the active+ordered query on every page load (cache miss)
            $table->index(['is_active', 'sort_order'], 'gallery_active_order_idx');

            // Speeds up filtered queries by category (used by the admin list)
            $table->index(['is_active', 'category'], 'gallery_active_category_idx');
        });
    }

    public function down(): void
    {
        Schema::table('gallery_media', function (Blueprint $table) {
            $table->dropIndex('gallery_active_order_idx');
            $table->dropIndex('gallery_active_category_idx');
            $table->dropColumn('thumbnail_src');
        });
    }
};
