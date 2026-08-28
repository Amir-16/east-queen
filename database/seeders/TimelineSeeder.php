<?php
namespace Database\Seeders;

use App\Models\TimelineEntry;
use Illuminate\Database\Seeder;

class TimelineSeeder extends Seeder {
    public function run(): void {
        TimelineEntry::truncate();
        TimelineEntry::insert([
            ['year'=>'1982','title'=>'Laying the Foundation','desc'=>'East Queen Group was established in Chittagong, Bangladesh. Beginning with ship-breaking and industrial raw material trading.','done'=>true,'sort_order'=>1],
            ['year'=>'2003','title'=>'Energy Sector Entry','desc'=>'Bay Gas LTD. was founded, entering Bangladesh\'s LPG distribution sector with licensed cylinder filling and distribution operations.','done'=>true,'sort_order'=>2],
            ['year'=>'2008','title'=>'Agribusiness Launch','desc'=>'Syedpur Fisheries & Farms was established in Noakhali, combining freshwater aquaculture, poultry farming, and fresh produce cultivation.','done'=>true,'sort_order'=>3],
            ['year'=>'2009','title'=>'International Trading','desc'=>'Ariko International was incorporated, establishing the group\'s flagship commodity trading operations across 20+ countries.','done'=>true,'sort_order'=>4],
            ['year'=>'2012','title'=>'Construction Materials','desc'=>'BSC Limited was formed to supply aggregate, limestone, and construction materials to Bangladesh\'s infrastructure sector.','done'=>true,'sort_order'=>5],
            ['year'=>'2013','title'=>'Expanding Horizons','desc'=>'Three decades of growth laid the groundwork for bold diversification across energy, agribusiness, and international trade.','done'=>true,'sort_order'=>6],
            ['year'=>'2017','title'=>'Diversifying Strengths','desc'=>'Marinona Foodstaff Trading LLC was incorporated, entering international halal food commodity trading.','done'=>true,'sort_order'=>7],
            ['year'=>'2023','title'=>'Digital Transformation','desc'=>'East Queen Group embraced digital infrastructure upgrades and began transformation of its web and communication platforms.','done'=>true,'sort_order'=>8],
        ]);
    }
}
