export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'produce' | 'pantry' | 'meals';
  categoryLabel: string;
  image: string;
  description: string;
  details: string;
  benefits: string[];
  unit: string;
  rating: number;
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'sustainability' | 'nutrition' | 'recipes' | 'mindfulness';
  categoryLabel: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ViewType = 'home' | 'shop' | 'story' | 'journal' | 'contact';
