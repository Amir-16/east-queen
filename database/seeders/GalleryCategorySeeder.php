<?php

namespace Database\Seeders;

use App\Models\GalleryCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class GalleryCategorySeeder extends Seeder
{
    public function run(): void
    {
        Schema::disableForeignKeyConstraints();
        GalleryCategory::truncate();
        Schema::enableForeignKeyConstraints();
        GalleryCategory::insert([
            ['slug' => 'operations', 'label' => 'Operations', 'sort_order' => 1, 'is_active' => true],
            ['slug' => 'products',   'label' => 'Products',   'sort_order' => 2, 'is_active' => true],
            ['slug' => 'facilities', 'label' => 'Facilities', 'sort_order' => 3, 'is_active' => true],
        ]);
    }
}
