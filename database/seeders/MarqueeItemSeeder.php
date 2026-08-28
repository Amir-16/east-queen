<?php
namespace Database\Seeders;

use App\Models\MarqueeItem;
use Illuminate\Database\Seeder;

class MarqueeItemSeeder extends Seeder {
    public function run(): void {
        MarqueeItem::truncate();
        MarqueeItem::insert([
            ['text'=>'Mill Scale Export','sort_order'=>1,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'Zinc Ash / Zinc Oxide','sort_order'=>2,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'PET Flakes','sort_order'=>3,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'Steel Scrap Import','sort_order'=>4,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'Aggregate & Limestone','sort_order'=>5,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'Ship Breaking & Recycling','sort_order'=>6,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'LPG Distribution','sort_order'=>7,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'Frozen Fish Export','sort_order'=>8,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'Fresh Vegetables Export','sort_order'=>9,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['text'=>'Thermal & Coking Coal','sort_order'=>10,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
        ]);
    }
}
