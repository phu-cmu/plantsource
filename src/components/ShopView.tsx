import React, { useState, useEffect } from 'react';
import { Search, ShoppingBasket, Eye, X, Star, Sparkles, Filter, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ShopViewProps {
  categoryFilter: 'all' | 'produce' | 'pantry' | 'meals';
  setCategoryFilter: (cat: 'all' | 'produce' | 'pantry' | 'meals') => void;
  onAddToCart: (product: Product, quantity: number) => void;
  selectedProductId?: string | null;
  onClearSelectedProductId?: () => void;
}

export default function ShopView({ categoryFilter, setCategoryFilter, onAddToCart, selectedProductId, onClearSelectedProductId }: ShopViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popular' | 'priceAsc' | 'priceDesc'>('popular');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedProductId) {
      const product = PRODUCTS.find(p => p.id === selectedProductId) ?? null;
      setSelectedProduct(product);
      onClearSelectedProductId?.();
    }
  }, [selectedProductId]);

  const handleAddToCartClick = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(prod, 1);
    setAddedProductId(prod.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  const handleModalAdd = (prod: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(prod, 1);
    setAddedProductId(prod.id);
    setTimeout(() => setAddedProductId(null), 2000);
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = categoryFilter === 'all' || prod.category === categoryFilter;
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    return b.rating - a.rating; // Default popular
  });

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">

        {/* Page Titles */}
        <div className="space-y-4 text-center md:text-left">
          <p className="text-[#edc14d] font-sans text-xs font-bold tracking-widest uppercase">
            PLANTSOURCE WHOLESALE BOUTIQUE
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#1C1C1C] font-bold leading-tight">
            OUR VEGE & VEGAN FOOD
          </h1>
        </div>

        {/* Filter and Search controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-y border-black/8 py-8">

          {/* Categories Tab buttons */}
          <div className="lg:col-span-6 flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Product' },
              { id: 'produce', label: 'Vegetarian' },
              { id: 'pantry', label: 'Vegan' },
              { id: 'meals', label: 'Dry & Snack' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full font-sans text-xs tracking-wider uppercase font-semibold transition-all cursor-pointer ${
                  categoryFilter === tab.id
                    ? 'bg-[#edc14d]/10 text-[#edc14d] border border-[#edc14d]'
                    : 'bg-transparent text-[#8A9490] border border-black/10 hover:text-[#1C1C1C] hover:border-black/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search + Sort side by side */}
          <div className="lg:col-span-6 flex gap-3 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A9490]">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-[#013120]/6 border border-black/10 rounded-full py-2.5 pl-11 pr-4 text-xs focus:outline-none focus:border-[#edc14d] text-[#1C1C1C]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8A9490] hover:text-[#1C1C1C]"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#013120]/6 border border-black/10 rounded-full py-2.5 px-4 text-xs focus:outline-none focus:border-[#edc14d] text-[#1C1C1C] cursor-pointer shrink-0"
            >
              <option value="popular" className="bg-[#F0EDE8] text-[#1C1C1C]">Popularity</option>
              <option value="priceAsc" className="bg-[#F0EDE8] text-[#1C1C1C]">Price: Low to High</option>
              <option value="priceDesc" className="bg-[#F0EDE8] text-[#1C1C1C]">Price: High to Low</option>
            </select>
          </div>

        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-[#013120]/5 rounded-3xl border border-black/8 space-y-4">
            <ShoppingBasket size={48} className="text-[#AAB0AE] mx-auto" />
            <h3 className="font-serif text-xl font-medium text-[#1C1C1C]">Reserves not found</h3>
            <p className="text-sm text-[#8A9490] font-light max-w-sm mx-auto">
              We couldn't locate any reserves matching your criteria. Try adjusting your query or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layoutId={`prod-card-${product.id}`}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-[#013120]/6 border border-black/8 rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:border-black/12"
                >
                  <div className="space-y-4">
                    {/* Visual box */}
                    <div className="aspect-[4/3] overflow-hidden relative bg-black/40">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />

                      {/* Rating float */}
                      <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 text-[#edc14d] text-[10px] font-sans font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                        <Star size={10} className="fill-current" /> {product.rating}
                      </span>

                      {/* Hover action banner overlay */}
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                        <span className="bg-black/80 backdrop-blur-md border border-white/15 p-3 rounded-full text-[#edc14d] hover:text-[#1C1C1C] hover:scale-110 active:scale-95 transition-all">
                          <Eye size={18} />
                        </span>
                      </div>
                    </div>

                    {/* Metadata & textual metrics */}
                    <div className="px-6 space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-sans tracking-widest text-[#edc14d] uppercase font-bold">
                        <span>{product.categoryLabel}</span>
                        <span className="text-[#8A9490]">{product.unit}</span>
                      </div>

                      <h3 className="font-serif text-lg font-medium text-[#1C1C1C] group-hover:text-[#edc14d] transition-colors leading-tight">
                        {product.name}
                      </h3>

                      <p className="font-sans text-xs text-[#556260] line-clamp-2 leading-relaxed font-light">
                        {product.description}
                      </p>
                    </div>
                  </div>

                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Product Detail Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
              <motion.div
                initial={{ scale: 0.93, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.93, opacity: 0 }}
                className="bg-white max-w-3xl w-full rounded-3xl overflow-hidden border border-black/10 flex flex-col md:flex-row shadow-2xl relative max-h-[90vh] md:max-h-none overflow-y-auto"
                id="product-detail-modal"
              >
                {/* Close absolute */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-20 bg-black/10 text-[#1C1C1C] hover:text-[#013120] p-2 border border-black/10 rounded-full hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <X size={18} />
                </button>

                {/* Left image segment */}
                <div className="md:w-1/2 min-h-[250px] md:min-h-auto relative bg-black/40">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* Right text informational segment */}
                <div className="p-8 md:w-1/2 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[#edc14d] font-sans text-xs font-bold tracking-widest uppercase">
                        {selectedProduct.categoryLabel}
                      </span>
                      <span className="text-[#8A9490] font-sans text-xs uppercase font-medium">
                        {selectedProduct.unit}
                      </span>
                    </div>

                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1C1C1C] leading-tight">
                      {selectedProduct.name}
                    </h2>

                    <div className="flex items-center gap-1.5 text-[#edc14d]">
                      <Star size={14} className="fill-current" />
                      <span className="text-xs font-sans font-bold">{selectedProduct.rating} / 5.0 Rating</span>
                    </div>

                    <p className="font-sans text-xs md:text-sm text-[#556260] leading-relaxed font-light">
                      {selectedProduct.details}
                    </p>

                    {/* Bio-nutrients / Benefits bullets list */}
                    <div className="space-y-2 pt-2">
                      <p className="text-[10px] tracking-wider text-[#8A9490] uppercase font-bold flex items-center gap-1">
                        <Sparkles size={11} className="text-[#edc14d]" /> Active Botanical Benefits:
                      </p>
                      <ul className="grid grid-cols-1 gap-1.5">
                        {selectedProduct.benefits.map((benefit, idx) => (
                          <li key={idx} className="font-sans text-[11px] text-[#556260] flex items-center gap-1.5">
                            <span className="w-1 h-1 bg-[#edc14d] rounded-full" /> {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
