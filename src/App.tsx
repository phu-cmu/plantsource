'use client'
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HomeView from './components/HomeView';
import ShopView from './components/ShopView';
import AboutView from './components/AboutView';
import JournalView from './components/JournalView';
import ContactView from './components/ContactView';
import CartDrawer from './components/CartDrawer';
import { ViewType, Product, CartItem } from './types';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [view, setView] = useState<ViewType>('home');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'produce' | 'pantry' | 'meals'>('all');
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
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
      
      {/* Floating Navbar */}
      <Header 
        currentView={view} 
        setView={setView} 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      {/* Screen view content area wrapped in AnimatePresence with custom animations */}
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {view === 'home' && (
              <HomeView 
                setView={setView} 
                setCategoryFilter={setCategoryFilter} 
                setSelectedArticleId={setSelectedArticleId} 
              />
            )}
            
            {view === 'shop' && (
              <ShopView 
                categoryFilter={categoryFilter} 
                setCategoryFilter={setCategoryFilter} 
                onAddToCart={handleAddToCart} 
              />
            )}
            
            {view === 'story' && (
              <AboutView 
                setView={setView} 
              />
            )}
            
            {view === 'journal' && (
              <JournalView 
                selectedArticleId={selectedArticleId}
                setSelectedArticleId={setSelectedArticleId}
              />
            )}
            
            {view === 'contact' && (
              <ContactView />
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
