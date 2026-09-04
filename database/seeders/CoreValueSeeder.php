<?php

namespace Database\Seeders;

use App\Models\CoreValue;
use Illuminate\Database\Seeder;

class CoreValueSeeder extends Seeder
{
    public function run(): void
    {
        CoreValue::truncate();
        CoreValue::insert([
            [
                'icon_name'   => 'Shield',
                'title'       => 'Integrity',
                'tagline'     => 'We say what we mean. We do what we say.',
                'description' => 'Ethical practices and transparent dealings in every transaction. Our partners trust us because we have never compromised on honesty — not in good times, not in difficult ones.',
                'detail'      => 'Integrity is our most valuable asset. In an industry where relationships are everything, our word is our bond. Every contract, every negotiation, every delivery reflects this core commitment.',
                'sort_order'  => 1,
            ],
            [
                'icon_name'   => 'Target',
                'title'       => 'Quality',
                'tagline'     => 'International standards. No exceptions.',
                'description' => 'Strict adherence to international standards across all operations. We comply with ISO requirements, industry certifications, and regulatory frameworks in every market we serve.',
                'detail'      => 'Quality is not a checklist — it is a culture. From sourcing to delivery, every step is governed by documented processes and third-party verification that our partners can trust and audit.',
                'sort_order'  => 2,
            ],
            [
                'icon_name'   => 'Handshake',
                'title'       => 'Partnership',
                'tagline'     => 'Long-term relationships over short-term gains.',
                'description' => "Long-term relationships built on trust and mutual success. We invest in understanding our partners' businesses and growing alongside them — not just transacting with them.",
                'detail'      => 'We measure our success not just in revenue, but in the longevity of our partnerships. Many of our most valued business relationships span more than a decade — a testament to this commitment.',
                'sort_order'  => 3,
            ],
            [
                'icon_name'   => 'Lightbulb',
                'title'       => 'Innovation',
                'tagline'     => 'Always improving. Always adapting.',
                'description' => 'Continuously improving processes to meet evolving market needs. We embrace change as an opportunity, investing in digital infrastructure and operational efficiency year after year.',
                'detail'      => 'Four decades in business requires constant reinvention. We have evolved from a local ship-breaking operation to a multi-continent trading conglomerate by embracing innovation at every stage of growth.',
                'sort_order'  => 4,
            ],
        ]);
    }
}
