export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'produce' | 'pantry' | 'meals';
  categoryLabel: string;
  brand?: string;
  image: string;
  images?: string[];
  description: string;
  details: string;
  benefits: string[];
  unit: string;
  isFeatured?: boolean;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'sustainability' | 'nutrition' | 'recipes' | 'mindfulness' | 'media';
  categoryLabel: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
  slug?: string;
  youtube_url?: string;
  youtube_thumbnail?: string;
  isHtmlContent?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewType = 'home' | 'shop' | 'story' | 'journal' | 'contact' | 'shipping-policy' | 'catalog';
