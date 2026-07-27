<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    public function run(): void
    {
        $settings = [
            [
                'key'   => 'home_trust_delivery_title',
                'label' => 'Homepage - Trust Badge Title',
                'value' => 'Free Delivery',
            ],
            [
                'key'   => 'home_trust_delivery_subtitle',
                'label' => 'Homepage - Trust Badge Subtitle',
                'value' => 'Pick Up available for local area',
            ],
            [
                'key'   => 'social_facebook_url',
                'label' => 'Footer - Facebook URL',
                'value' => '#',
            ],
            [
                'key'   => 'social_tiktok_url',
                'label' => 'Footer - TikTok URL',
                'value' => '#',
            ],
            [
                'key'   => 'social_youtube_url',
                'label' => 'Footer - YouTube URL',
                'value' => '#',
            ],
            [
                'key'   => 'social_instagram_url',
                'label' => 'Footer - Instagram URL',
                'value' => '#',
            ],
        ];

        foreach ($settings as $setting) {
            Setting::firstOrCreate(['key' => $setting['key']], $setting);
        }
    }
}
