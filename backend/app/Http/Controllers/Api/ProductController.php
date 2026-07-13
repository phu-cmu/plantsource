<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private const CATEGORY_MAP = [
        'Vegetarian' => 'produce',
        'Vegan'      => 'pantry',
        'Dry & Snack' => 'meals',
    ];

    public function index(Request $request): JsonResponse
    {
        $query = Product::with(['category', 'brand'])
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id');

        if ($request->filled('category')) {
            $nameMap = array_flip(self::CATEGORY_MAP);
            $categoryName = $nameMap[$request->category] ?? null;
            if ($categoryName) {
                $query->whereHas('category', fn ($q) => $q->where('name', $categoryName));
            }
        }

        $products = $query->get()->map(fn ($p) => $this->transform($p));

        return response()->json(['data' => $products]);
    }

    public function show(string $slug): JsonResponse
    {
        $product = Product::with(['category', 'brand'])
            ->where('slug', $slug)
            ->where('is_active', true)
            ->firstOrFail();

        return response()->json(['data' => $this->transform($product)]);
    }

    private function transform(Product $product): array
    {
        $categorySlug = self::CATEGORY_MAP[$product->category->name ?? ''] ?? 'produce';

        return [
            'id'             => 'api_' . $product->id,
            'slug'           => $product->slug,
            'name'           => $product->name,
            'category'       => $categorySlug,
            'category_label' => $product->category->name ?? '',
            'brand'          => $product->brand->name ?? null,
            'image'          => $product->image ? asset('storage/' . $product->image) : '',
            'images'         => collect($product->images ?? [])->map(fn ($path) => asset('storage/' . $path))->values(),
            'description'    => $product->description ?? '',
            'details'        => $product->details ?? '',
            'benefits'       => $product->benefits ?? [],
            'unit'           => $product->unit ?? '',
            'is_featured'    => (bool) $product->is_featured,
        ];
    }
}
