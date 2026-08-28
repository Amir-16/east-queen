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
            ['group'=>'chairman','key'=>'name',        'value'=>'Md. Shahrear Islam',                  'type'=>'text',     'label'=>'Chairman Name',     'sort_order'=>1],
            ['group'=>'chairman','key'=>'title',       'value'=>'Chairman & Managing Director',         'type'=>'text',     'label'=>'Chairman Title',    'sort_order'=>2],
            ['group'=>'chairman','key'=>'photo_url',   'value'=>'/images/chairman/chairman.jpg',        'type'=>'text',     'label'=>'Photo URL',         'sort_order'=>3],
            ['group'=>'chairman','key'=>'signature_url','value'=>'/images/chairman/signature.png',      'type'=>'text',     'label'=>'Signature URL',     'sort_order'=>4],
            ['group'=>'chairman','key'=>'message',     'value'=>'For over four decades, East Queen Group has stood at the intersection of Bangladesh\'s industrial ambition and the demands of global markets. We began with ship breaking — learning the discipline of taking apart what others had discarded and finding value where others saw only waste. That philosophy has guided every business we have built since.', 'type'=>'textarea', 'label'=>'Chairman Message', 'sort_order'=>5],

            // SEO
            ['group'=>'seo','key'=>'meta_title',       'value'=>'East Queen Group — Industrial Conglomerate Since 1982', 'type'=>'text',     'label'=>'Meta Title',       'sort_order'=>1],
            ['group'=>'seo','key'=>'meta_description', 'value'=>'East Queen Group is a Bangladeshi industrial conglomerate with operations in ship breaking, LPG distribution, commodity trading, fisheries, construction materials, and food trading.', 'type'=>'textarea','label'=>'Meta Description','sort_order'=>2],
            ['group'=>'seo','key'=>'og_image',         'value'=>'/images/og-image.jpg',                 'type'=>'text',     'label'=>'OG Image URL',     'sort_order'=>3],

            // Contact config
            ['group'=>'contact','key'=>'inquiry_email', 'value'=>'shahrear@eastqueengroup.com',         'type'=>'text',     'label'=>'Inquiry Email',    'sort_order'=>1],
            ['group'=>'contact','key'=>'cc_email',      'value'=>'contact@eastqueengroup.com',           'type'=>'text',     'label'=>'CC Email',         'sort_order'=>2],

            // About
            ['group'=>'about','key'=>'mission',        'value'=>'To build enduring industrial enterprises that create value for Bangladesh\'s economy, provide opportunities for our people, and contribute to sustainable development.', 'type'=>'textarea','label'=>'Mission Statement','sort_order'=>1],
            ['group'=>'about','key'=>'vision',         'value'=>'To be recognized as Bangladesh\'s most trusted and diversified industrial group, expanding our global footprint while remaining rooted in the communities we serve.', 'type'=>'textarea','label'=>'Vision Statement','sort_order'=>2],

            // Social
            ['group'=>'social','key'=>'facebook',  'value'=>'', 'type'=>'url','label'=>'Facebook', 'sort_order'=>1],
            ['group'=>'social','key'=>'instagram', 'value'=>'', 'type'=>'url','label'=>'Instagram','sort_order'=>2],
            ['group'=>'social','key'=>'linkedin',  'value'=>'', 'type'=>'url','label'=>'LinkedIn', 'sort_order'=>3],
        ];

        foreach ($settings as $s) {
            Setting::updateOrCreate(['group'=>$s['group'],'key'=>$s['key']], $s);
        }
    }
}
