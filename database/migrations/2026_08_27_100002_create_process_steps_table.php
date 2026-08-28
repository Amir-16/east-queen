<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('process_steps', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('step_number')->default(1);
            $table->string('title', 120);
            $table->text('description')->nullable();
            $table->string('icon', 60)->default('CheckCircleIcon');
            $table->smallInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('process_steps'); }
};
