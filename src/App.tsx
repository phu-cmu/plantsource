'use client'
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import AboutView from './components/AboutView';
import JournalView from './components/JournalView';
import ContactView from './components/ContactView';
import ShippingPolicyView from './components/ShippingPolicyView';
import CartDrawer from './components/CartDrawer';
import { ViewType, Product, Article, CartItem } from './types';
import { SiteSettings, DEFAULT_SETTINGS } from './lib/api';
import { parseRoute, CategoryFilter, VALID_CATEGORIES, shopCategoryPath } from './lib/routes';
import { motion, AnimatePresence } from 'motion/react';

// pdfjs-dist / canvas rendering only works in the browser — never render this on the server.
const CatalogView = dynamic(() => import('./components/CatalogView'), { ssr: false });

/**
 * Reads ?category= from the URL. Isolated in its own <Suspense> boundary so pages can be
 * statically generated: useSearchParams only opts this tiny null-rendering component out of
 * static rendering, instead of the whole page.
 */
function CategorySync({ onChange }: { onChange: (cat: CategoryFilter) => void }) {
  const searchParams = useSearchParams();
  const param = searchParams.get('category');
  useEffect(() => {
    onChange(VALID_CATEGORIES.includes(param as CategoryFilter) ? (param as CategoryFilter) : 'all');
  }, [param, onChange]);
  return null;
}

interface AppProps {
  initialProducts?: Product[];
  initialStories?: Article[];
  initialSettings?: SiteSettings;
}

export default function App({ initialProducts = [], initialStories = [], initialSettings = DEFAULT_SETTINGS }: AppProps) {
  const router = useRouter();
  const pathname = usePathname();
  const route = parseRoute(pathname) ?? { view: 'home' as ViewType };
  const view: ViewType = route.view;

  const [categoryFilter, setCategoryFilterState] = useState<CategoryFilter>('all');

  const setCategoryFilter = useCallback((cat: CategoryFilter) => {
    setCategoryFilterState(cat);
    router.replace(shopCategoryPath(cat), { scroll: false });
  }, [router]);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount (durability persistent states)
  useEffect(() => {
    const savedCart = localStorage.getItem('plantsource_wholesale_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
  }, []);

  // Save cart to local storage whenever it changes
  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('plantsource_wholesale_cart', JSON.stringify(newCart));
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      const updated = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity }]);
    }
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    const existing = cart.find(item => item.product.id === productId);
    if (!existing) return;

    const newQuantity = existing.quantity + delta;
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
    } else {
      const updated = cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      saveCart(updated);
    }
  };

  const handleRemoveItem = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] font-sans selection:bg-[#FDD05A] selection:text-[#362800] antialiased">
      <Suspense fallback={null}>
        <CategorySync onChange={setCategoryFilterState} />
      </Suspense>

      {/* Floating Navbar */}
      <Header
        currentView={view}
        cartCount={totalCartCount}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Screen view content area wrapped in AnimatePresence with custom animations.
          initial={false}: the first (server-rendered) view is visible immediately instead of
          starting at opacity 0, which delayed Largest Contentful Paint. */}
      <main className="relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {view === 'home' && (
              <HomeView
                products={initialProducts}
                stories={initialStories}
                settings={initialSettings}
              />
            )}

            {view === 'shop' && (
              <ShopView
                initialProducts={initialProducts}
                categoryFilter={categoryFilter}
                setCategoryFilter={setCategoryFilter}
                onAddToCart={handleAddToCart}
                selectedProductSlug={route.productSlug ?? null}
              />
            )}

            {view === 'story' && (
              <AboutView />
            )}

            {view === 'journal' && (
              <JournalView
                initialStories={initialStories}
                selectedArticleSlug={route.articleSlug ?? null}
              />
            )}

            {view === 'contact' && (
              <ContactView />
            )}

            {view === 'shipping-policy' && (
              <ShippingPolicyView />
            )}

            {view === 'catalog' && (
              <div className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] pt-28 pb-24">
                <div className="max-w-6xl mx-auto px-6 md:px-12 space-y-10">
                  {/* Heading is rendered here (server-side) because CatalogView is browser-only. */}
                  <section className="text-center space-y-4">
                    <p className="font-serif text-[#edc14d] text-xs font-bold tracking-widest uppercase">
                      Plantsource Wholesale
                    </p>
                    <h1 className="font-serif text-4xl md:text-5xl text-[#1C1C1C] font-bold leading-tight">
                      Product Catalog
                    </h1>
                    <div className="w-16 h-1 bg-[#edc14d] rounded-full mx-auto" />
                  </section>
                  <CatalogView />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Sliding Luxury Cart Drawer overlay */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
