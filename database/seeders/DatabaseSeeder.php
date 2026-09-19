<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder {
    public function run(): void {
        Schema::disableForeignKeyConstraints();

        $this->call([
            AdminUserSeeder::class,
            SettingSeeder::class,
            StatSeeder::class,
            HeroSlideSeeder::class,
            CompanySeeder::class,
            ProductSeeder::class,
            AssociateSeeder::class,
            ProcessStepSeeder::class,
            MarqueeItemSeeder::class,
            TimelineSeeder::class,
            GalleryCategorySeeder::class,
            GalleryMediaSeeder::class,
            DifferentiatorSeeder::class,
            CoreValueSeeder::class,
        ]);

        Schema::enableForeignKeyConstraints();
    }
}
