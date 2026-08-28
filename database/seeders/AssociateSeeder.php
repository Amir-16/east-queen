<?php
namespace Database\Seeders;

use App\Models\Associate;
use Illuminate\Database\Seeder;

class AssociateSeeder extends Seeder {
    public function run(): void {
        Associate::truncate();
        Associate::insert([
            ['name'=>'Adnan PSF Industries Ltd.','initials'=>'AP','logo'=>'/images/brand/concerns/con-5.png','country'=>'Bangladesh','website'=>null,'description'=>"One of Bangladesh's leading manufacturers of polyester staple fibre (PSF).",'color'=>'bg-navy-800','sort_order'=>1,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Icon Fashion','initials'=>'IF','logo'=>'/images/brand/concerns/con-9.png','country'=>'Bangladesh','website'=>null,'description'=>'A dynamic fashion accessories and stationery products company.','color'=>'bg-navy-700','sort_order'=>2,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Alliance Leather Goods','initials'=>'AL','logo'=>'/images/brand/concerns/con-8.png','country'=>'Bangladesh','website'=>null,'description'=>'A premium leather goods manufacturer based in Dhaka.','color'=>'bg-gold-600','sort_order'=>3,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Eco Trade International','initials'=>'ET','logo'=>null,'country'=>'International','website'=>null,'description'=>'An international trading partner specializing in eco-friendly recyclable commodities.','color'=>'bg-teal-600','sort_order'=>4,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
            ['name'=>'Allied Maritime Services','initials'=>'AM','logo'=>null,'country'=>'Bangladesh','website'=>null,'description'=>'A Chittagong-based maritime services firm offering ship agency and port logistics.','color'=>'bg-navy-900','sort_order'=>5,'is_active'=>true,'created_at'=>now(),'updated_at'=>now()],
        ]);
    }
}
