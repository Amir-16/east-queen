<?php
namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder {
    public function run(): void {
        Company::truncate();
        $companies = [
            [
                'name'=>'Ariko International','slug'=>'ariko-international',
                'tagline'=>'Global Gateway for Industrial Raw Materials & Recyclables',
                'description'=>'Founded in 2009, Ariko International is the trading arm of East Queen Group — exporting mill scale, zinc ash, PET flakes, leather goods, vegetables, and jute while importing aggregate, coal, steel scrap, and industrial equipment from 20+ countries.',
                'long_description'=>json_encode(["Ariko International is the flagship trading company of East Queen Group, incorporated in 2009 and headquartered in Chittagong."]),
                'industry'=>'trading',
                'services'=>json_encode(['Mill Scale & Zinc Ash Export','PET Flakes & RMG Export','Leather Goods & Jute Export','Aggregate & Clinker Import','Coal & Steel Scrap Import','Heavy Equipment Import']),
                'logo'=>'/images/brand/concerns/con-7.png',
                'cover_image'=>'/images/products/exports/mill-scale/mill-1.jpeg',
                'gallery_images'=>json_encode(['/images/products/exports/mill-scale/mill-3.jpeg','/images/products/exports/zinc-ash/drums-closeup.jpeg']),
                'founded'=>2009,'team_size'=>25,'website'=>'https://scrapbangla.com/',
                'export_items'=>json_encode(['Mill Scale','Zinc Ash / Zinc Oxide','PET Flakes','Ready-Made Garments (RMG)','Fresh Vegetables & Fruits','Jute and Jute-Made Goods','Leather Goods']),
                'import_items'=>json_encode(['Aggregate Stones (Gabbro, Limestone)','Coal (Thermal & Coking)','Steel Scrap (HMS 1 & 2)','Automobile Spare Parts','Geo Synthetic Material','Clinker','Heavy Equipment']),
                'color'=>'from-navy-900 to-navy-700','sort_order'=>1,'is_active'=>true,
            ],
            [
                'name'=>'East Queen Shipping Ltd.','slug'=>'east-queen-shipping',
                'tagline'=>'Maritime Excellence — Safe, Sustainable Ship Recycling',
                'description'=>'A leading ship-breaking and maritime services company operating in Sitakunda, Chittagong.',
                'long_description'=>json_encode(["East Queen Shipping Ltd. is the maritime backbone of East Queen Group."]),
                'industry'=>'shipping',
                'services'=>json_encode(['Ship Breaking & Dismantling','Marine Recycling Operations','Scrap Metal Processing & Sales','Vessel Pre-Purchase Inspection','Maritime Consulting']),
                'logo'=>'/images/brand/concerns/con-6.png',
                'cover_image'=>'/images/shipping/bbg-master-night.jpeg',
                'gallery_images'=>json_encode(['/images/shipping/tristar-prosperity.jpeg','/images/shipping/harmonia-arrival.jpeg']),
                'founded'=>1982,'team_size'=>150,
                'color'=>'from-navy-800 to-navy-950','sort_order'=>2,'is_active'=>true,
            ],
            [
                'name'=>'Bay Gas LTD.','slug'=>'bay-gas',
                'tagline'=>'Powering Homes & Industry Across Bangladesh',
                'description'=>'A licensed LPG gas cylinder filling and distribution company serving residential, commercial, and industrial customers.',
                'long_description'=>json_encode(["Bay Gas LTD. is East Queen Group's entry into Bangladesh's energy sector."]),
                'industry'=>'energy',
                'services'=>json_encode(['LPG Cylinder Filling (12 kg & 35 kg)','Residential Gas Distribution','Commercial & Industrial LPG Supply','Safety Compliance & Inspection','Bulk LPG Supply']),
                'logo'=>'/images/brand/concerns/con-1.png',
                'cover_image'=>'/images/hero/old-services-03.jpg',
                'gallery_images'=>json_encode([]),
                'founded'=>2003,'team_size'=>45,
                'color'=>'from-gold-600 to-gold-700','sort_order'=>3,'is_active'=>true,
            ],
            [
                'name'=>'Syedpur Fisheries & Farms','slug'=>'syedpur-fisheries',
                'tagline'=>'Sustainable Agri-Business from Land & Water',
                'description'=>'Integrated agri-business covering freshwater fisheries, poultry farming, and fresh produce supply.',
                'long_description'=>json_encode(["Syedpur Fisheries & Farms represents East Queen Group's investment in Bangladesh's agricultural heartland."]),
                'industry'=>'fisheries',
                'services'=>json_encode(['Freshwater Fish Cultivation & Harvesting','Poultry Farming (Broiler & Layer)','Frozen Fish Processing & Export','Fresh Vegetable Production','Agri Outgrower Programme']),
                'logo'=>'/images/brand/concerns/con-3.png',
                'cover_image'=>'/images/companies/syedpur/farm-1.jpeg',
                'gallery_images'=>json_encode(['/images/companies/syedpur/pond-1.jpeg','/images/companies/syedpur/coastal-land.jpeg']),
                'founded'=>2008,'team_size'=>80,
                'color'=>'from-teal-600 to-teal-500','sort_order'=>4,'is_active'=>true,
            ],
            [
                'name'=>'BSC Limited','slug'=>'bsc-limited',
                'tagline'=>'Building the Foundations of Tomorrow',
                'description'=>'Supplier of high-grade construction materials and industrial raw goods — aggregate, limestone, coal, and structural steel.',
                'long_description'=>json_encode(["BSC Limited was formed to meet a specific and growing need in Bangladesh's construction materials supply chain."]),
                'industry'=>'construction',
                'services'=>json_encode(['Aggregate & Gabbro Distribution','Limestone Trading & Supply','Coal Distribution for Industry','Construction Material Logistics','Covered Storage & Yard Management']),
                'logo'=>'/images/brand/concerns/con-4.png',
                'cover_image'=>'/images/products/imports/aggregate/aggregate-1.png',
                'gallery_images'=>json_encode(['/images/products/imports/aggregate/aggregate-golden-1.jpeg','/images/products/imports/limestone/lime-3.jpeg']),
                'founded'=>2012,'team_size'=>60,
                'color'=>'from-slate-700 to-slate-900','sort_order'=>5,'is_active'=>true,
            ],
            [
                'name'=>'Marinona Foodstaff Trading LLC','slug'=>'marinona-foodstaff',
                'tagline'=>'Quality Food Commodities Across Borders',
                'description'=>'International food trading company specializing in the procurement and distribution of quality food commodities to global markets with strict halal compliance.',
                'long_description'=>json_encode(["Marinona Foodstaff Trading LLC is East Queen Group's dedicated food commodity trading entity."]),
                'industry'=>'food',
                'services'=>json_encode(['Frozen Fish & Seafood Export','Agricultural Commodity Trading','Halal-Certified Supply Chain Management','Food Safety Audit Coordination','International Procurement & Distribution']),
                'logo'=>'/images/brand/concerns/con-2.png',
                'cover_image'=>'/images/products/exports/vegetables/cabbage-field.jpeg',
                'gallery_images'=>json_encode(['/images/companies/syedpur/frozen-frozen-1.jpeg','/images/products/exports/vegetables/produce-1.jpeg']),
                'founded'=>2018,'team_size'=>20,
                'color'=>'from-gold-500 to-gold-600','sort_order'=>6,'is_active'=>true,
            ],
        ];
        foreach ($companies as $c) { Company::create($c); }
    }
}
