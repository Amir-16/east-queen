<?php
namespace Database\Seeders;

use App\Models\GalleryMedia;
use Illuminate\Database\Seeder;

class GalleryMediaSeeder extends Seeder {
    public function run(): void {
        GalleryMedia::truncate();
        GalleryMedia::insert([
            ['type'=>'image','src'=>'/images/shipping/bbg-master-night.jpeg','thumbnail_src'=>null,'category'=>'operations','title'=>'BBG Master at Night','caption'=>'Vessel recycling operations at Sitakunda.','is_active'=>true,'sort_order'=>1],
            ['type'=>'image','src'=>'/images/shipping/tristar-prosperity.jpeg','thumbnail_src'=>null,'category'=>'operations','title'=>'MV Tristar Prosperity','caption'=>null,'is_active'=>true,'sort_order'=>2],
            ['type'=>'image','src'=>'/images/products/exports/mill-scale/mill-1.jpeg','thumbnail_src'=>null,'category'=>'products','title'=>'Mill Scale Export','caption'=>'Premium mill scale ready for shipment.','is_active'=>true,'sort_order'=>3],
            ['type'=>'image','src'=>'/images/products/imports/aggregate/aggregate-1.png','thumbnail_src'=>null,'category'=>'products','title'=>'Gabbro Aggregate','caption'=>null,'is_active'=>true,'sort_order'=>4],
            ['type'=>'image','src'=>'/images/companies/syedpur/farm-1.jpeg','thumbnail_src'=>null,'category'=>'facilities','title'=>'Syedpur Farm','caption'=>'Integrated aquaculture and farming operations.','is_active'=>true,'sort_order'=>5],
            ['type'=>'image','src'=>'/images/companies/syedpur/pond-1.jpeg','thumbnail_src'=>null,'category'=>'facilities','title'=>'Fish Ponds','caption'=>null,'is_active'=>true,'sort_order'=>6],
        ]);
    }
}
