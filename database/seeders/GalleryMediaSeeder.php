<?php

namespace Database\Seeders;

use App\Models\GalleryMedia;
use Illuminate\Database\Seeder;

class GalleryMediaSeeder extends Seeder
{
    public function run(): void
    {
        GalleryMedia::truncate();

        $rows = array_merge(
            self::operations(),
            self::products(),
            self::facilities(),
        );

        GalleryMedia::insert($rows);
    }

    /* ── helpers ── */

    private static function img(string $src, string $category, string $title, ?string $caption, int $sort): array
    {
        return [
            'type'          => 'image',
            'src'           => $src,
            'thumbnail_src' => null,
            'category'      => $category,
            'title'         => $title,
            'caption'       => $caption,
            'is_active'     => true,
            'sort_order'    => $sort,
        ];
    }

    private static function vid(string $src, string $thumb, string $category, string $title, ?string $caption, int $sort): array
    {
        return [
            'type'          => 'video',
            'src'           => $src,
            'thumbnail_src' => $thumb,
            'category'      => $category,
            'title'         => $title,
            'caption'       => $caption,
            'is_active'     => true,
            'sort_order'    => $sort,
        ];
    }

    /* ── Operations ── */

    private static function operations(): array
    {
        $c = 'operations';
        return [
            // Images
            self::img('/images/shipping/bbg-master-night.jpeg',          $c, 'BBG Master at Night',        'Vessel recycling operations at Sitakunda.',           1),
            self::img('/images/shipping/tristar-prosperity.jpeg',         $c, 'MV Tristar Prosperity',      'Bulk carrier arriving at Chittagong port.',           2),
            self::img('/images/shipping/harmonia-arrival.jpeg',           $c, 'MV Harmonia Arrival',        'Vessel entering harbour for scrapping.',              3),
            self::img('/images/shipping/vessel-1.jpeg',                   $c, 'Cargo Vessel in Transit',    null,                                                  4),
            self::img('/images/shipping/vessel-2.jpeg',                   $c, 'Vessel at Port',             'Loading operations at Chittagong.',                   5),
            self::img('/images/shipping/vessel-3.jpeg',                   $c, 'Bulk Carrier',               null,                                                  6),
            self::img('/images/shipping/vessel-4.jpeg',                   $c, 'Container Vessel',           'International shipping fleet.',                       7),
            self::img('/images/shipping/ship-port-1.jpeg',                $c, 'Port Operations',            'Berthing and cargo handling.',                        8),
            self::img('/images/gallery/ship-breaking/bbg-master.jpeg',    $c, 'BBG Master — Breaking',      'Ship deconstruction in progress.',                    9),
            self::img('/images/gallery/ship-breaking/harmonia.jpeg',      $c, 'MV Harmonia',                'Vessel awaiting dismantling.',                        10),
            self::img('/images/gallery/ship-breaking/tristar.jpeg',       $c, 'MV Tristar at Yard',         null,                                                  11),
            self::img('/images/gallery/ship-breaking/yard-wide-1.jpeg',   $c, 'Ship Breaking Yard',         'Aerial view of Sitakunda breaking yard.',             12),
            self::img('/images/gallery/ship-breaking/yard-wide-2.jpeg',   $c, 'Yard Overview',              'Full-scale operations across the yard.',              13),
            self::img('/images/gallery/ship-breaking/scrap-1.jpeg',       $c, 'Metal Reclamation',          'Steel plates being separated for recycling.',         14),
            self::img('/images/gallery/ship-breaking/scrap-2.jpeg',       $c, 'Recycling Operations',       'Processed scrap ready for steel mills.',              15),
            self::img('/images/operations/facility-1.jpeg',               $c, 'Operational Facility',       null,                                                  16),
            self::img('/images/operations/facility-2.jpeg',               $c, 'Facility View',              'Trading and logistics hub.',                          17),
            // Videos
            self::vid('/videos/shipping/vessel-1.mp4',       '/images/shipping/vessel-1.jpeg',                $c, 'Vessel Operations',      'Cargo vessel underway on the Bay of Bengal.',  18),
            self::vid('/videos/shipping/vessel-2.mp4',       '/images/shipping/vessel-2.jpeg',                $c, 'Fleet Navigation',        null,                                           19),
            self::vid('/videos/shipping/vessel-3.mp4',       '/images/shipping/vessel-3.jpeg',                $c, 'Cargo Vessel',            null,                                           20),
            self::vid('/videos/shipping/vessel-4.mp4',       '/images/shipping/vessel-4.jpeg',                $c, 'Port Approach',           'Vessel entering Chittagong.',                  21),
            self::vid('/videos/ship-breaking/yard-1.mp4',    '/images/gallery/ship-breaking/yard-wide-1.jpeg',$c, 'Yard Operations I',       'Breaking yard in full operation.',             22),
            self::vid('/videos/ship-breaking/yard-2.mp4',    '/images/gallery/ship-breaking/yard-wide-2.jpeg',$c, 'Yard Operations II',      null,                                           23),
            self::vid('/videos/ship-breaking/yard-3.mp4',    '/images/gallery/ship-breaking/scrap-1.jpeg',   $c, 'Deconstruction Process',  'Step-by-step dismantling of a bulk carrier.',  24),
            self::vid('/videos/ship-breaking/yard-4.mp4',    '/images/gallery/ship-breaking/scrap-2.jpeg',   $c, 'Steel Recovery',          'Reclaimed steel being sorted at the yard.',    25),
            self::vid('/videos/operations/ops-1.mp4',        '/images/operations/facility-1.jpeg',            $c, 'Operational Overview',    null,                                           26),
            self::vid('/videos/operations/ops-2.mp4',        '/images/operations/facility-2.jpeg',            $c, 'Logistics Operations',    'Supply chain in action.',                      27),
            self::vid('/videos/hero/hero-shipping.mp4',      '/images/shipping/tristar-prosperity.jpeg',      $c, 'Shipping Fleet',          'Our fleet serving global trade routes.',       28),
            self::vid('/videos/hero/hero-yard.mp4',          '/images/gallery/ship-breaking/yard-wide-1.jpeg',$c, 'Ship Breaking — Feature', null,                                           29),
        ];
    }

    /* ── Products ── */

    private static function products(): array
    {
        $c = 'products';
        return [
            // Mill Scale
            self::img('/images/gallery/mill-scale/mill-1.jpeg',          $c, 'Mill Scale Export',          'Premium mill scale ready for shipment.',              30),
            self::img('/images/gallery/mill-scale/mill-2.jpeg',          $c, 'Mill Scale Stockpile',        'Open-yard storage awaiting loading.',                 31),
            self::img('/images/gallery/mill-scale/mill-3.jpeg',          $c, 'Mill Scale Processing',       null,                                                  32),
            self::img('/images/gallery/mill-scale/mill-4.jpeg',          $c, 'Mill Scale Loading',          'Bulk loading at port facility.',                      33),
            self::img('/images/gallery/mill-scale/mill-5.jpeg',          $c, 'Mill Scale — Grade A',        null,                                                  34),
            // Aggregate / Gabbro
            self::img('/images/gallery/aggregate/gabbro-1.jpeg',         $c, 'Gabbro Aggregate',            'High-density gabbro crushed stone from Oman.',       35),
            self::img('/images/gallery/aggregate/gabbro-closeup-1.jpeg', $c, 'Gabbro Closeup',              'Quality control inspection.',                         36),
            self::img('/images/gallery/aggregate/aggregate-golden-1.jpeg',$c, 'Golden Aggregate',            'Premium limestone aggregate.',                        37),
            self::img('/images/gallery/aggregate/aggregate-golden-2.jpeg',$c, 'Aggregate Stockpile',         null,                                                  38),
            self::img('/images/gallery/aggregate/stones-sunset-1.jpeg',  $c, 'Aggregate at Sunset',         'Stone yard at Chittagong port.',                      39),
            // Jute
            self::img('/images/gallery/jute/jute-1.jpeg',                $c, 'Raw Jute Bales',              'Grade-A jute fibre packed for export.',               40),
            self::img('/images/gallery/jute/jute-2.jpeg',                $c, 'Jute Fibre',                  null,                                                  41),
            self::img('/images/gallery/jute/jute-3.jpeg',                $c, 'Jute Processing',             'Quality sorting at our facility.',                    42),
            self::img('/images/gallery/jute/jute-4.jpeg',                $c, 'Jute Warehouse',              null,                                                  43),
            // PET Flakes
            self::img('/images/gallery/pet-flakes/bales-outdoor.jpeg',   $c, 'PET Flake Bales',             'Compressed PET bales ready for export.',              44),
            self::img('/images/gallery/pet-flakes/bales-warehouse.jpeg', $c, 'PET Bales — Warehouse',       'Indoor storage of PET flake bales.',                  45),
            self::img('/images/gallery/pet-flakes/flakes-closeup.jpeg',  $c, 'PET Flakes Closeup',          'Clean washed PET flakes, food-grade quality.',        46),
            // Vegetables
            self::img('/images/gallery/vegetables/cabbage-field.jpeg',   $c, 'Cabbage Field',               'Fresh cabbage harvested for export.',                 47),
            self::img('/images/gallery/vegetables/eggplant-baskets.jpeg',$c, 'Eggplant Harvest',            'Fresh brinjal packed in traditional baskets.',        48),
            self::img('/images/gallery/vegetables/eggplant-crate.jpeg',  $c, 'Eggplant Export',             'Export-grade eggplant in crates.',                    49),
            self::img('/images/gallery/vegetables/onion-truck.jpeg',     $c, 'Onion Shipment',              'Loaded trucks at the collection point.',              50),
            self::img('/images/gallery/vegetables/export-box.jpeg',      $c, 'Export Packaging',            'Branded export cartons at packing station.',          51),
            // Zinc Ash
            self::img('/images/gallery/zinc-ash/drums.jpeg',             $c, 'Zinc Ash Drums',              'Zinc ash sealed in industrial-grade drums.',          52),
            self::img('/images/gallery/zinc-ash/warehouse.jpeg',         $c, 'Zinc Ash Warehouse',          'Storage facility with drum inventory.',               53),
            // Coal
            self::img('/images/gallery/coal/hold-aerial.jpeg',           $c, 'Coal Hold — Aerial',          'Bird\'s-eye view of vessel coal hold.',               54),
            self::img('/images/gallery/coal/unloading-port.jpeg',        $c, 'Coal Unloading',              'Mechanical unloading at Chittagong port.',            55),
            self::img('/images/gallery/coal/yard.jpeg',                  $c, 'Coal Yard',                   'Open yard storage of imported coal.',                 56),
            // Fruits & Leather
            self::img('/images/gallery/fruits/mango-1.jpeg',             $c, 'Fresh Mango Export',          'Alphonso mangoes packed for international markets.',  57),
            self::img('/images/gallery/leather/wallet-1.jpeg',           $c, 'Leather Products',            'Premium leather goods for export.',                   58),
            // Videos
            self::vid('/videos/exports/export-ops-1.mp4',  '/images/gallery/mill-scale/mill-1.jpeg',          $c, 'Export Operations I',    'Mill scale loading and logistics.',            59),
            self::vid('/videos/exports/export-ops-2.mp4',  '/images/gallery/jute/jute-1.jpeg',                $c, 'Export Operations II',   'Jute bale handling and shipment.',             60),
            self::vid('/videos/exports/export-ops-4.mp4',  '/images/gallery/pet-flakes/bales-outdoor.jpeg',   $c, 'PET Export Operations',  null,                                           61),
            self::vid('/videos/operations/coal-ops.mp4',   '/images/gallery/coal/yard.jpeg',                  $c, 'Coal Operations',        'Coal import and yard management.',             62),
            self::vid('/videos/hero/hero-exports.mp4',     '/images/gallery/mill-scale/mill-3.jpeg',          $c, 'Exports Overview',       'Our full export product portfolio in action.', 63),
        ];
    }

    /* ── Facilities ── */

    private static function facilities(): array
    {
        $c = 'facilities';
        return [
            // Fisheries / Aquaculture
            self::img('/images/gallery/fisheries/farm-1.jpeg',        $c, 'Aquaculture Farm',          'Integrated fish farming at Syedpur.',                 64),
            self::img('/images/gallery/fisheries/pond-1.jpeg',        $c, 'Fish Ponds',                'Raised fish ponds managed by Syedpur Fisheries.',     65),
            self::img('/images/gallery/fisheries/coastal-land.jpeg',  $c, 'Coastal Landholding',       'Extensive coastal land for aquaculture.',              66),
            self::img('/images/gallery/fisheries/nets-field.jpeg',    $c, 'Fishing Nets',              'Traditional net drying on the foreshore.',             67),
            self::img('/images/gallery/fisheries/livestock-1.jpeg',   $c, 'Livestock Operations',      'Integrated cattle rearing alongside aquaculture.',     68),
            // Syedpur Farm
            self::img('/images/companies/syedpur/farm-1.jpeg',        $c, 'Syedpur Farm',              'Overview of the Syedpur agricultural complex.',       69),
            self::img('/images/companies/syedpur/farm-2.jpeg',        $c, 'Farm Grounds',              'Open farmland under cultivation.',                    70),
            self::img('/images/companies/syedpur/coastal-sea.jpeg',   $c, 'Coastal Waters',            'Sea frontage of Syedpur holdings.',                   71),
            self::img('/images/companies/syedpur/coastal-land.jpeg',  $c, 'Coastal Estate',            null,                                                  72),
            self::img('/images/companies/syedpur/nature-1.jpeg',      $c, 'Natural Landscape',         'Green fields surrounding the facility.',               73),
            self::img('/images/companies/syedpur/nature-2.jpeg',      $c, 'Green Fields',              null,                                                  74),
            // Operational facilities
            self::img('/images/operations/facility-3.jpeg',           $c, 'Processing Facility',       null,                                                  75),
            self::img('/images/operations/facility-4.jpeg',           $c, 'Storage Warehouse',         'Climate-controlled storage for sensitive goods.',     76),
            self::img('/images/operations/facility-5.jpeg',           $c, 'Cold Storage',              null,                                                  77),
            self::img('/images/operations/facility-6.jpeg',           $c, 'Logistics Centre',          'Distribution hub for inland and port delivery.',      78),
            // Videos
            self::vid('/videos/fisheries/fisheries-1.mp4', '/images/gallery/fisheries/farm-1.jpeg',   $c, 'Fisheries Operations',   'Day-in-the-life at Syedpur Fisheries.',        79),
            self::vid('/videos/fisheries/fisheries-2.mp4', '/images/gallery/fisheries/pond-1.jpeg',   $c, 'Aquaculture Process',    'Pond management and fish harvesting.',         80),
            self::vid('/videos/operations/ops-3.mp4',      '/images/operations/facility-3.jpeg',      $c, 'Facility Walkthrough',   null,                                           81),
            self::vid('/videos/hero/hero-operations.mp4',  '/images/operations/facility-1.jpeg',      $c, 'Operations — Feature',   'Our facilities powering Bangladesh\'s trade.', 82),
        ];
    }
}
