<?php
namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatSeeder extends Seeder {
    public function run(): void {
        Stat::truncate();
        Stat::insert([
            ['label'=>'Years of Excellence',   'value'=>42,  'suffix'=>'+',   'icon'=>'calendar',          'sort_order'=>1],
            ['label'=>'Vessels Recycled',       'value'=>200, 'suffix'=>'+',   'icon'=>'ship-wheel',        'sort_order'=>2],
            ['label'=>'Countries Traded With',  'value'=>20,  'suffix'=>'+',   'icon'=>'globe-alt',         'sort_order'=>3],
            ['label'=>'Group Companies',        'value'=>6,   'suffix'=>'',    'icon'=>'building-office-2', 'sort_order'=>4],
            ['label'=>'MT Exported Annually',   'value'=>50000,'suffix'=>'+',  'icon'=>'arrow-up-tray',     'sort_order'=>5],
            ['label'=>'Employees',              'value'=>400, 'suffix'=>'+',   'icon'=>'users',             'sort_order'=>6],
        ]);
    }
}
