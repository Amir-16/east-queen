<?php
namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder {
    public function run(): void {
        HeroSlide::truncate();
        HeroSlide::insert([
            [
                'image_path'       => '/images/shipping/bbg-master-night.jpeg',
                'label'            => 'Ship Breaking',
                'category'         => 'Maritime',
                'animation_preset' => 'zoom_out',
                'title'            => 'Four Decades of Maritime Excellence',
                'subtitle'         => 'East Queen Group',
                'description'      => 'From the shores of Sitakunda to global markets — pioneering safe and sustainable ship recycling since 1982.',
                'cta_text'         => 'Explore Ship Breaking',
                'cta_url'          => '/ship-breaking',
                'media_type'       => 'image',
                'video_url'        => null,
                'is_active'        => true,
                'sort_order'       => 1,
            ],
            [
                'image_path'       => '/images/shipping/ship-port-1.jpeg',
                'label'            => 'Global Trading',
                'category'         => 'Trade',
                'animation_preset' => 'pan_right',
                'title'            => 'Bangladesh\'s Gateway to Global Markets',
                'subtitle'         => 'Ariko International',
                'description'      => 'Exporting premium Bangladeshi commodities and importing essential raw materials across 20+ countries.',
                'cta_text'         => 'View Our Exports',
                'cta_url'          => '/export',
                'media_type'       => 'image',
                'video_url'        => null,
                'is_active'        => true,
                'sort_order'       => 2,
            ],
            [
                'image_path'       => '/images/shipping/tristar-prosperity.jpeg',
                'label'            => 'Energy',
                'category'         => 'Energy',
                'animation_preset' => 'zoom_in',
                'title'            => 'Powering Bangladesh\'s Growth',
                'subtitle'         => 'Bay Gas LTD.',
                'description'      => 'Reliable LPG distribution for homes, businesses, and industry across Bangladesh.',
                'cta_text'         => 'Our Companies',
                'cta_url'          => '/companies',
                'media_type'       => 'image',
                'video_url'        => null,
                'is_active'        => true,
                'sort_order'       => 3,
            ],
        ]);
    }
}
