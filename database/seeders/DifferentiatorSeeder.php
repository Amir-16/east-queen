<?php

namespace Database\Seeders;

use App\Models\Differentiator;
use Illuminate\Database\Seeder;

class DifferentiatorSeeder extends Seeder
{
    public function run(): void
    {
        Differentiator::truncate();
        Differentiator::insert([
            [
                'title'      => '40+ Years Proven Track Record',
                'body'       => 'Founded in 1982, East Queen Group has weathered decades of market cycles, political shifts, and global trade disruptions — emerging stronger each time. Our longevity is our most compelling credential.',
                'image'      => '/images/shipping/bbg-master-night.jpeg',
                'chip_color' => 'bg-gold-500',
                'sort_order' => 1,
            ],
            [
                'title'      => 'International Compliance & Quality',
                'body'       => 'We comply with HKC standards, phytosanitary requirements, SGS inspections, and all relevant international trade regulations. Our quality control processes are documented and auditable.',
                'image'      => '/images/products/exports/mill-scale/mill-1.jpeg',
                'chip_color' => 'bg-teal-500',
                'sort_order' => 2,
            ],
            [
                'title'      => 'Full-Service Logistics Support',
                'body'       => 'From Letter of Credit to final delivery, we handle all documentation, third-party inspections, customs clearance, and logistics coordination — offering complete peace of mind.',
                'image'      => '/images/products/imports/aggregate/aggregate-3.jpeg',
                'chip_color' => 'bg-navy-700',
                'sort_order' => 3,
            ],
        ]);
    }
}
