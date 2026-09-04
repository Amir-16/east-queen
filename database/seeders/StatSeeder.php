<?php
namespace Database\Seeders;

use App\Models\Stat;
use Illuminate\Database\Seeder;

class StatSeeder extends Seeder {
    public function run(): void {
        Stat::truncate();
        Stat::insert([
            ['label'=>'Year Founded',          'value'=>1982, 'suffix'=>'',    'icon'=>'calendar',          'color'=>'gold',  'count_start'=>1974, 'sort_order'=>1],
            ['label'=>'Years of Excellence',   'value'=>42,   'suffix'=>'+',   'icon'=>'clock',             'color'=>'gold',  'count_start'=>0,    'sort_order'=>2],
            ['label'=>'Group Companies',       'value'=>6,    'suffix'=>'',    'icon'=>'building-office-2', 'color'=>'teal',  'count_start'=>0,    'sort_order'=>3],
            ['label'=>'Continents Served',     'value'=>4,    'suffix'=>'',    'icon'=>'globe-alt',         'color'=>'teal',  'count_start'=>0,    'sort_order'=>4],
            ['label'=>'Vessels Recycled',      'value'=>200,  'suffix'=>'+',   'icon'=>'ship-wheel',        'color'=>'gold',  'count_start'=>0,    'sort_order'=>5],
            ['label'=>'Countries Traded With', 'value'=>20,   'suffix'=>'+',   'icon'=>'globe-alt',         'color'=>'teal',  'count_start'=>0,    'sort_order'=>6],
        ]);
    }
}
