<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder {
    public function run(): void {
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
            GalleryMediaSeeder::class,
        ]);
    }
}
