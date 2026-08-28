<?php

namespace Database\Seeders;

use App\Models\TimelineEntry;
use Illuminate\Database\Seeder;

class TimelineEntrySeeder extends Seeder
{
    public function run(): void
    {
        TimelineEntry::truncate();

        TimelineEntry::insert([
            ['year' => '2010', 'title' => 'Foundation',               'desc' => 'Started with 2 ponds and a vision for sustainable aquaculture.',                              'done' => true,  'sort_order' => 1],
            ['year' => '2024', 'title' => 'Scale-Up',                 'desc' => '38 ponds, 65 acres, 800+ MT capacity. $1.41M revenue.',                                      'done' => true,  'sort_order' => 2],
            ['year' => '2025', 'title' => 'RB-RAS Rollout',           'desc' => 'Deploying Raceway Bottom-clean Recirculating Aquaculture Systems across all ponds.',          'done' => false, 'sort_order' => 3],
            ['year' => '2026', 'title' => 'Solar + IoT',              'desc' => '50 KW solar plant live. Folon IoT sensors monitoring all 5 water parameters.',               'done' => false, 'sort_order' => 4],
            ['year' => '2027', 'title' => 'Feed Mill & Marketplace',  'desc' => '8,000 MT/year feed mill operational. Agro Marketplace soft launch.',                         'done' => false, 'sort_order' => 5],
            ['year' => '2028', 'title' => 'Precision Agro Hub',       'desc' => 'Full ecosystem running. $5.44M revenue | $2.65M net profit. Export to East Asia.',           'done' => false, 'sort_order' => 6],
        ]);
    }
}
