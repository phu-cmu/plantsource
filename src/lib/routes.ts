import { ViewType } from '../types';

// Single source of truth for which URL paths exist. Anything not matched here is a 404.
export const VIEW_PATHS: Record<ViewType, string> = {
  home: '/',
  shop: '/shop',
  story: '/story',
  journal: '/journal',
  contact: '/contact',
  'shipping-policy': '/shipping-policy',
  catalog: '/catalog',
};

const PATH_TO_VIEW: Record<string, ViewType> = Object.fromEntries(
  Object.entries(VIEW_PATHS).map(([view, path]) => [path, view as ViewType]),
);

export interface ParsedRoute {
  view: ViewType;
  /** Product slug for /shop/[slug] */
  productSlug?: string;
  /** Story slug for /journal/[slug] */
  articleSlug?: string;
}

/** Maps a pathname (or catch-all segments) to a view. Returns null for unknown paths. */
export function parseRoute(input: string | string[] | undefined): ParsedRoute | null {
  const segments = Array.isArray(input)
    ? input
    : (input ?? '/').split('/').filter(Boolean);
  const clean = segments.map((s) => decodeURIComponent(s));

  if (clean.length === 0) return { view: 'home' };
  if (clean.length === 1) {
    const view = PATH_TO_VIEW[`/${clean[0]}`];
    return view ? { view } : null;
  }
  if (clean.length === 2 && clean[0] === 'shop') return { view: 'shop', productSlug: clean[1] };
  if (clean.length === 2 && clean[0] === 'journal') return { view: 'journal', articleSlug: clean[1] };
  return null;
}

export const productPath = (slug: string) => `/shop/${encodeURIComponent(slug)}`;
export const articlePath = (slug: string) => `/journal/${encodeURIComponent(slug)}`;

export type CategoryFilter = 'all' | 'produce' | 'pantry' | 'meals';
export const VALID_CATEGORIES: CategoryFilter[] = ['produce', 'pantry', 'meals'];
export const shopCategoryPath = (cat: CategoryFilter) => (cat === 'all' ? '/shop' : `/shop?category=${cat}`);
