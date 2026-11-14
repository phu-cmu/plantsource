import { Product, Article } from '../types';

// Shared by server components (initial render) and client components (fallback refetch).
export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api';

// How long (seconds) server-rendered pages and API responses may be cached before refreshing.
export const REVALIDATE_SECONDS = 300;

export interface SiteSettings {
  home_trust_delivery_title: string;
  home_trust_delivery_subtitle: string;
  social_facebook_url: string;
  social_tiktok_url: string;
  social_youtube_url: string;
  social_instagram_url: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  home_trust_delivery_title: 'Free Delivery',
  home_trust_delivery_subtitle: 'Pick Up available for local area',
  social_facebook_url: '#',
  social_tiktok_url: '#',
  social_youtube_url: '#',
  social_instagram_url: '#',
};

export function normalizeProduct(p: any): Product {
  return {
    id: String(p.id),
    slug: p.slug ?? undefined,
    name: p.name,
    price: p.price,
    category: p.category as Product['category'],
    categoryLabel: p.category_label,
    brand: p.brand ?? undefined,
    image: p.image,
    images: p.images ?? [],
    description: p.description ?? '',
    details: p.details ?? '',
    benefits: p.benefits ?? [],
    unit: p.unit,
    isFeatured: p.is_featured ?? false,
  };
}

export function normalizeStory(s: any): Article {
  return {
    id: `api_${s.slug}`,
    slug: s.slug,
    title: s.title,
    excerpt: s.excerpt ?? '',
    content: s.content ?? '',
    category: s.type as Article['category'],
    categoryLabel: s.category_label ?? s.type,
    readTime: '',
    date: s.date ?? '',
    author: '',
    image: s.image ?? s.youtube_thumbnail ?? '',
    featured: !!s.featured,
    youtube_url: s.youtube_url ?? undefined,
    youtube_thumbnail: s.youtube_thumbnail ?? undefined,
    isHtmlContent: true,
  };
}

async function getJson(path: string): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function fetchProducts(): Promise<Product[]> {
  const json = await getJson('/products');
  return Array.isArray(json?.data) ? json.data.map(normalizeProduct) : [];
}

export async function fetchStories(): Promise<Article[]> {
  const json = await getJson('/explore/stories');
  return Array.isArray(json?.data) ? json.data.map(normalizeStory) : [];
}

export async function fetchSettings(): Promise<SiteSettings> {
  const json = await getJson('/settings');
  return { ...DEFAULT_SETTINGS, ...(json?.data ?? {}) };
}
