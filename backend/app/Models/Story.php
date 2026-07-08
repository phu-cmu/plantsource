<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Story extends Model
{
    use HasFactory;

    protected $fillable = [
        'type', 'title', 'slug', 'excerpt',
        'content', 'youtube_url', 'image',
        'featured', 'status', 'published_at',
    ];

    protected $casts = [
        'featured'     => 'boolean',
        'published_at' => 'datetime',
    ];

    protected static function booted(): void
    {
        static::creating(function (Story $story) {
            if (empty($story->slug)) {
                $story->slug = str($story->title)->slug();
            }
        });
    }
}
