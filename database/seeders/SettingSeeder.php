<?php
namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder {
    public function run(): void {
        $settings = [
            // Company
            ['group'=>'company','key'=>'name',       'value'=>'East Queen Group',                     'type'=>'text',     'label'=>'Company Name',      'sort_order'=>1],
            ['group'=>'company','key'=>'short_name',  'value'=>'East Queen',                            'type'=>'text',     'label'=>'Short Name',        'sort_order'=>2],
            ['group'=>'company','key'=>'tagline',     'value'=>'Building Bangladesh\'s Industrial Future Since 1982', 'type'=>'text', 'label'=>'Tagline', 'sort_order'=>3],
            ['group'=>'company','key'=>'est_year',    'value'=>'1982',                                  'type'=>'text',     'label'=>'Est. Year',         'sort_order'=>4],
            ['group'=>'company','key'=>'address',     'value'=>'Agrabad, Chittagong, Bangladesh',        'type'=>'text',     'label'=>'Address',           'sort_order'=>5],
            ['group'=>'company','key'=>'email',       'value'=>'contact@eastqueengroup.com',             'type'=>'text',     'label'=>'Email',             'sort_order'=>6],
            ['group'=>'company','key'=>'phone',       'value'=>'+880 1713 042261',                       'type'=>'text',     'label'=>'Phone',             'sort_order'=>7],
            ['group'=>'company','key'=>'whatsapp',    'value'=>'+8801713042261',                         'type'=>'text',     'label'=>'WhatsApp',          'sort_order'=>8],
            ['group'=>'company','key'=>'map_embed_url','value'=>'',                                      'type'=>'url',      'label'=>'Google Map Embed',  'sort_order'=>9],

            // Chairman
            ['group'=>'chairman','key'=>'name',        'value'=>'A K M Abu Taher BSc.',                'type'=>'text',     'label'=>'Chairman Name',     'sort_order'=>1],
            ['group'=>'chairman','key'=>'title',       'value'=>'Chairman, East Queen Group',           'type'=>'text',     'label'=>'Chairman Title',    'sort_order'=>2],
            ['group'=>'chairman','key'=>'photo_url',   'value'=>'/images/team/chairman.jpeg',           'type'=>'text',     'label'=>'Photo URL',         'sort_order'=>3],
            ['group'=>'chairman','key'=>'greeting_quote','value'=>'Welcome to East Queen Group.',       'type'=>'text',     'label'=>'Greeting Quote',    'sort_order'=>4],
            ['group'=>'chairman','key'=>'para_1',      'value'=>"As Chairman, it gives me great pleasure to witness how far we have come in our journey — from humble beginnings on the shores of Chittagong to a diversified conglomerate with strong foundations in ship recycling, international commodity trading, energy, fisheries, and more.", 'type'=>'textarea','label'=>'Message Paragraph 1','sort_order'=>5],
            ['group'=>'chairman','key'=>'para_2',      'value'=>"At East Queen Group, our mission is clear: to deliver quality, reliability, and integrity across every sector we operate in. Through companies like Ariko International, we have established a significant presence in the export of mill scale, zinc ash, PET flakes, and fresh agricultural produce, as well as the import of aggregate, coal, steel scrap, and industrial raw materials.", 'type'=>'textarea','label'=>'Message Paragraph 2','sort_order'=>6],
            ['group'=>'chairman','key'=>'para_3',      'value'=>"Our long-standing business relationships across Asia, the Middle East, and Europe reflect our global outlook and trustworthy reputation. Our success is driven by the trust of our partners, the hard work of our people, and our unwavering values — honesty, innovation, and sustainability.", 'type'=>'textarea','label'=>'Message Paragraph 3','sort_order'=>7],
            ['group'=>'chairman','key'=>'para_4',      'value'=>"As industries evolve, we remain committed to adapting through modern logistics and environmentally conscious practices that ensure long-term growth. This is more than a business — it is a legacy we are proud to grow.", 'type'=>'textarea','label'=>'Message Paragraph 4','sort_order'=>8],
            ['group'=>'chairman','key'=>'para_5',      'value'=>"I invite you to explore our companies, connect with our team, and partner with us as we continue building a story of strength and excellence through East Queen Group.", 'type'=>'textarea','label'=>'Message Paragraph 5','sort_order'=>9],

            // SEO
            ['group'=>'seo','key'=>'meta_title',       'value'=>'East Queen Group — Industrial Conglomerate Since 1982', 'type'=>'text',     'label'=>'Meta Title',       'sort_order'=>1],
            ['group'=>'seo','key'=>'meta_description', 'value'=>'East Queen Group is a Bangladeshi industrial conglomerate with operations in ship breaking, LPG distribution, commodity trading, fisheries, construction materials, and food trading.', 'type'=>'textarea','label'=>'Meta Description','sort_order'=>2],
            ['group'=>'seo','key'=>'og_image',         'value'=>'/images/og-image.jpg',                 'type'=>'text',     'label'=>'OG Image URL',     'sort_order'=>3],

            // Contact config
            ['group'=>'contact','key'=>'inquiry_email', 'value'=>'shahrear@eastqueengroup.com',         'type'=>'text',     'label'=>'Inquiry Email',    'sort_order'=>1],
            ['group'=>'contact','key'=>'cc_email',      'value'=>'contact@eastqueengroup.com',           'type'=>'text',     'label'=>'CC Email',         'sort_order'=>2],

            // About — Overview section
            ['group'=>'about','key'=>'overview_p1',       'value'=>"East Queen Group is one of Bangladesh's most respected industrial conglomerates, proudly rooted in Chittagong since 1982. With over four decades of experience, we have established ourselves as pioneers in multiple sectors — including ship recycling, international trade, energy, fisheries, construction materials, and food industries.", 'type'=>'textarea','label'=>'Overview Paragraph 1','sort_order'=>1],
            ['group'=>'about','key'=>'overview_p2',       'value'=>"Founded by a visionary entrepreneur, East Queen Group has grown through resilience, integrity, and strategic foresight. Today we are known not only for being one of Bangladesh's most established ship recyclers but also for our dynamic expansion into new industries and global markets.", 'type'=>'textarea','label'=>'Overview Paragraph 2','sort_order'=>2],
            ['group'=>'about','key'=>'vision_heading',    'value'=>"Leading Bangladesh's Industrial Transformation", 'type'=>'text','label'=>'Vision Card Heading','sort_order'=>3],
            ['group'=>'about','key'=>'vision_body',       'value'=>"To lead Bangladesh's industrial transformation by delivering excellence, fostering innovation, and building global partnerships that create value for generations.", 'type'=>'textarea','label'=>'Vision Card Body','sort_order'=>4],
            ['group'=>'about','key'=>'mission_heading',   'value'=>'A National & International Benchmark', 'type'=>'text','label'=>'Mission Card Heading','sort_order'=>5],
            ['group'=>'about','key'=>'mission_body',      'value'=>'To be recognized as a national and international benchmark in exporting, importing, manufacturing, and infrastructure development — through consistent performance, transparency, and customer satisfaction.', 'type'=>'textarea','label'=>'Mission Card Body','sort_order'=>6],
            ['group'=>'about','key'=>'spirit_tagline',    'value'=>'Enterprise is our spirit.', 'type'=>'text','label'=>'Spirit Tagline','sort_order'=>7],
            ['group'=>'about','key'=>'glance_image',      'value'=>'/images/shipping/tristar-prosperity.jpeg', 'type'=>'text','label'=>'At-A-Glance Section Image','sort_order'=>8],

            // Mission / Vision / Purpose page
            ['group'=>'mission_vision','key'=>'m_heading',  'value'=>'Excellence Through Integrity', 'type'=>'text','label'=>'Mission Heading','sort_order'=>1],
            ['group'=>'mission_vision','key'=>'m_body',     'value'=>'Delivering industrial excellence through ethical, reliable trade and service that creates lasting value for clients, employees, and communities.', 'type'=>'textarea','label'=>'Mission Body','sort_order'=>2],
            ['group'=>'mission_vision','key'=>'m_detail',   'value'=>'Every shipment, contract, and handshake is guided by the same commitment: to do what we say, deliver what we promise, and stand behind our work unconditionally. This commitment has defined us since 1982.', 'type'=>'textarea','label'=>'Mission Detail','sort_order'=>3],
            ['group'=>'mission_vision','key'=>'m_image',    'value'=>'/images/shipping/tristar-prosperity.jpeg', 'type'=>'text','label'=>'Mission Image','sort_order'=>4],
            ['group'=>'mission_vision','key'=>'v_heading',  'value'=>'The Most Trusted Conglomerate in South Asia', 'type'=>'text','label'=>'Vision Heading','sort_order'=>5],
            ['group'=>'mission_vision','key'=>'v_body',     'value'=>'To be the most trusted diversified conglomerate in South Asian markets, setting standards in quality, compliance, and international partnership.', 'type'=>'textarea','label'=>'Vision Body','sort_order'=>6],
            ['group'=>'mission_vision','key'=>'v_detail',   'value'=>'We envision a future where East Queen Group is synonymous with reliability — a partner of choice for businesses from Chittagong to Chicago, Tokyo to London. Every decision we make today is a step toward that future.', 'type'=>'textarea','label'=>'Vision Detail','sort_order'=>7],
            ['group'=>'mission_vision','key'=>'v_image',    'value'=>'/images/shipping/vessel-1.jpeg', 'type'=>'text','label'=>'Vision Image','sort_order'=>8],
            ['group'=>'mission_vision','key'=>'p_heading',  'value'=>'Connecting Bangladesh to the World', 'type'=>'text','label'=>'Purpose Heading','sort_order'=>9],
            ['group'=>'mission_vision','key'=>'p_body',     'value'=>"To connect Bangladesh's industrial strength with global demand — driving economic growth while upholding the highest standards of integrity.", 'type'=>'textarea','label'=>'Purpose Body','sort_order'=>10],
            ['group'=>'mission_vision','key'=>'p_detail',   'value'=>"Bangladesh has enormous industrial potential. Our purpose is to be the bridge — creating pathways for this strength to reach global markets and returning tangible value to the communities that power our operations.", 'type'=>'textarea','label'=>'Purpose Detail','sort_order'=>11],
            ['group'=>'mission_vision','key'=>'p_image',    'value'=>'/images/products/exports/mill-scale/mill-1.jpeg', 'type'=>'text','label'=>'Purpose Image','sort_order'=>12],
            ['group'=>'mission_vision','key'=>'bottom_quote','value'=>'These are not aspirational statements — they are the principles we have lived by for over four decades.', 'type'=>'textarea','label'=>'Bottom Quote','sort_order'=>13],

            // Social
            ['group'=>'social','key'=>'facebook',  'value'=>'', 'type'=>'url','label'=>'Facebook', 'sort_order'=>1],
            ['group'=>'social','key'=>'instagram', 'value'=>'', 'type'=>'url','label'=>'Instagram','sort_order'=>2],
            ['group'=>'social','key'=>'linkedin',  'value'=>'', 'type'=>'url','label'=>'LinkedIn', 'sort_order'=>3],

            // Ship Hero Section (homepage top banner)
            ['group'=>'ship_hero','key'=>'media_type',    'value'=>'video',                                           'type'=>'text',    'label'=>'Media Type (image|video)',  'sort_order'=>1],
            ['group'=>'ship_hero','key'=>'video_url',     'value'=>'/videos/ship-breaking/ship-hero.mp4',             'type'=>'text',    'label'=>'Video URL',                 'sort_order'=>2],
            ['group'=>'ship_hero','key'=>'video_poster',  'value'=>'/images/gallery/ship-breaking/yard-wide-1.jpeg',  'type'=>'text',    'label'=>'Video Poster Image',        'sort_order'=>3],
            ['group'=>'ship_hero','key'=>'image_url',     'value'=>'',                                                'type'=>'text',    'label'=>'Background Image URL',      'sort_order'=>4],
            ['group'=>'ship_hero','key'=>'eyebrow',       'value'=>'East Queen Group · Est. 1982 · Chittagong, Bangladesh', 'type'=>'text', 'label'=>'Eyebrow Text',          'sort_order'=>5],
            ['group'=>'ship_hero','key'=>'headline',      'value'=>'GATEWAY TO GLOBAL BUSINESS',                      'type'=>'text',    'label'=>'Headline (full text)',      'sort_order'=>6],
            ['group'=>'ship_hero','key'=>'headline_accent','value'=>'BUSINESS',                                        'type'=>'text',    'label'=>'Accented Word (gold)',      'sort_order'=>7],
            ['group'=>'ship_hero','key'=>'tagline',       'value'=>'Your Partner for Global Business & Sourcing',     'type'=>'text',    'label'=>'Tagline',                   'sort_order'=>8],
            ['group'=>'ship_hero','key'=>'body',          'value'=>'From Chittagong to markets across four continents — East Queen Group delivers end-to-end export, import, and sourcing solutions across commodities, materials, and industrial goods since 1982.', 'type'=>'textarea','label'=>'Body Text','sort_order'=>9],
            ['group'=>'ship_hero','key'=>'cta1_text',     'value'=>'Explore Our Services',                            'type'=>'text',    'label'=>'Primary CTA Text',          'sort_order'=>10],
            ['group'=>'ship_hero','key'=>'cta1_url',      'value'=>'/export',                                         'type'=>'text',    'label'=>'Primary CTA URL',           'sort_order'=>11],
            ['group'=>'ship_hero','key'=>'badge_text',    'value'=>'Trusted Globally · Est. 1982',                    'type'=>'text',    'label'=>'Badge Text',                'sort_order'=>12],
        ];

        foreach ($settings as $s) {
            Setting::updateOrCreate(['group'=>$s['group'],'key'=>$s['key']], $s);
        }
    }
}
