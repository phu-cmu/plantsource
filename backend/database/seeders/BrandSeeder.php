<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Product;
use Illuminate\Database\Seeder;

class BrandSeeder extends Seeder
{
    public function run(): void
    {
        $names = ['Vegefarm', 'Vegan for all', 'Beleaf', 'Vegebest'];

        $brands = collect($names)->map(fn (string $name) => Brand::firstOrCreate(['name' => $name]));

        Product::query()->whereNull('brand_id')->get()->each(function (Product $product) use ($brands) {
            $product->update(['brand_id' => $brands->random()->id]);
        });
    }
}
