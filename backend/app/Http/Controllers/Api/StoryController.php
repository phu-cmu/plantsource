<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Story;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class StoryController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Story::query()
            ->where('status', 'published')
            ->orderByDesc('featured')
            ->orderByDesc('published_at');

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $stories = $query->get()->map(fn ($story) => $this->transform($story));

        return response()->json(['data' => $stories]);
    }

    public function show(string $slug): JsonResponse
    {
        $story = Story::where('slug', $slug)
            ->where('status', 'published')
            ->firstOrFail();

        return response()->json(['data' => $this->transform($story)]);
    }

    private function transform(Story $story): array
    {
        $imageUrl = $story->image
            ? asset('storage/' . $story->image)
            : $this->getYoutubeThumbnail($story->youtube_url);

        return [
            'id'                => $story->id,
            'type'              => $story->type,
            'title'             => $story->title,
            'slug'              => $story->slug,
            'excerpt'           => $story->excerpt,
            'content'           => $story->content,
            'youtube_url'       => $story->youtube_url,
            'youtube_thumbnail' => $this->getYoutubeThumbnail($story->youtube_url),
            'image'             => $imageUrl,
            'featured'          => (bool) $story->featured,
            'category'          => $story->type,
            'category_label'    => ucfirst($story->type),
            'date'              => $story->published_at
                ? $story->published_at->format('M d, Y')
                : $story->created_at->format('M d, Y'),
            'published_at'      => $story->published_at,
        ];
    }

    private function getYoutubeThumbnail(?string $url): ?string
    {
        if (!$url) return null;
        preg_match('/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/', $url, $matches);
        return isset($matches[1])
            ? "https://img.youtube.com/vi/{$matches[1]}/hqdefault.jpg"
            : null;
    }
}
