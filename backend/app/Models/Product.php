<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id', 'brand_id', 'name', 'slug', 'unit',
        'description', 'details',
        'benefits', 'image', 'images', 'is_active', 'is_featured', 'sort_order',
    ];

    protected $casts = [
        'benefits'    => 'array',
        'images'      => 'array',
        'is_active'   => 'boolean',
        'is_featured' => 'boolean',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    protected static function booted(): void
    {
        static::creating(function (Product $product) {
            if (empty($product->slug)) {
                $product->slug = str($product->name)->slug();
            }
        });

        static::deleting(function (Product $product) {
            if ($product->image) {
                Storage::disk('public')->delete($product->image);
            }

            if (! empty($product->images)) {
                Storage::disk('public')->delete($product->images);
            }
        });
    }
}
