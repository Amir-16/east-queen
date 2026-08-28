<?php
namespace Database\Seeders;

use App\Models\ProcessStep;
use Illuminate\Database\Seeder;

class ProcessStepSeeder extends Seeder {
    public function run(): void {
        ProcessStep::truncate();
        ProcessStep::insert([
            ['step_number'=>1,'title'=>'Source & Procure','description'=>'We identify and source materials directly from certified mills, manufacturers, and recyclers across Bangladesh and internationally.','icon'=>'MagnifyingGlassIcon','sort_order'=>1,'created_at'=>now(),'updated_at'=>now()],
            ['step_number'=>2,'title'=>'Inspect & Certify','description'=>'Every consignment undergoes independent third-party inspection and laboratory testing before shipment or delivery.','icon'=>'ClipboardDocumentCheckIcon','sort_order'=>2,'created_at'=>now(),'updated_at'=>now()],
            ['step_number'=>3,'title'=>'Document & Comply','description'=>'We prepare all export/import documentation, certificates of origin, and customs clearance papers to international standards.','icon'=>'DocumentTextIcon','sort_order'=>3,'created_at'=>now(),'updated_at'=>now()],
            ['step_number'=>4,'title'=>'Ship & Track','description'=>'We manage vessel chartering or booking, coordinate logistics end-to-end, and provide real-time shipment tracking to our clients.','icon'=>'TruckIcon','sort_order'=>4,'created_at'=>now(),'updated_at'=>now()],
            ['step_number'=>5,'title'=>'Deliver & Support','description'=>'We confirm delivery, resolve any port or customs issues, and provide after-shipment support to ensure complete buyer satisfaction.','icon'=>'CheckBadgeIcon','sort_order'=>5,'created_at'=>now(),'updated_at'=>now()],
        ]);
    }
}
