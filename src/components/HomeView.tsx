import React, { useState, useRef } from 'react';
import { ArrowRight, Leaf, ShieldAlert, Heart, Sprout, ShieldCheck, Sparkles, AlertCircle, Star, Trophy, Truck, Package, Award, Headphones, ChevronLeft, ChevronRight } from 'lucide-react';
import { ViewType, Product, Article } from '../types';
import { IMAGES, ARTICLES, PRODUCTS } from '../data';
import { motion } from 'motion/react';

interface HomeViewProps {
  setView: (view: ViewType) => void;
  setCategoryFilter: (category: 'all' | 'produce' | 'pantry' | 'meals') => void;
  setSelectedArticleId: (id: string | null) => void;
  setSelectedProductId: (id: string | null) => void;
}

export default function HomeView({ setView, setCategoryFilter, setSelectedArticleId, setSelectedProductId }: HomeViewProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleCategoryNav = (cat: 'produce' | 'pantry' | 'meals') => {
    setCategoryFilter(cat);
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleArticleClick = (articleId: string) => {
    setSelectedArticleId(articleId);
    setView('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      setTimeout(() => setNewsletterStatus('idle'), 3000);
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
    setTimeout(() => setNewsletterStatus('idle'), 5000);
  };

  const handleViewProduct = (productId: string) => {
    setSelectedProductId(productId);
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get the two specific articles from the screenshot to display:
  // "The Art of Seasonal Stewing" (art_2) and "Protein Purity: A Guide" (art_3)
  const homeArticles = ARTICLES.filter(art => art.id === 'art_2' || art.id === 'art_3');

  return (
    <div id="home-view" className="bg-[#F7F4EF] text-[#1C1C1C] scroll-smooth">

      {/* 1. Hero Section - Extreme high-end overhead view */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover brightness-[0.35]"
            src={IMAGES.heroMain}
            alt="Vibrant fresh vegan buddha bowl premium backgrounds"
          />
          {/* Elegant soft gradient overlay transitioning to primary green */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#013120] via-black/30 to-[#F7F4EF]/40" />
        </div>

        <div className="relative z-10 text-center px-6 md:px-12 max-w-4xl max-w-7xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-white leading-tight font-bold">
              Purity In Every Bite
            </h1>
            <p className="font-sans text-lg md:text-2xl text-on-surface-variant font-light max-w-2xl mx-auto leading-relaxed">
              Experience the pinnacle of plant-based culinary art. Sustainably sourced, ethically harvested, and prepared for the discerning palate.
            </p>
            <div className="pt-6">
              <button
                onClick={() => handleNavCategoryAll()}
                className="bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] px-10 py-5 rounded-full font-sans text-sm font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#FDD05A]/10 cursor-pointer"
                id="hero-shop-button"
              >
                SHOP NOW
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll helper mouse animation or accent badge */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8A9490] text-[10px] tracking-widest font-semibold uppercase">
          <span className="w-1.5 h-6 bg-[#AAB0AE] rounded-full flex justify-center py-1">
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 bg-[#edc14d] rounded-full"
            />
          </span>
          <span>SCROLL</span>
        </div>
      </section>

      {/* 2. Trust Strip */}
      <section className="border-y border-black/8 bg-[#EDEAE4]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-black/8">
          {[
            {
              icon: <Truck size={22} className="text-[#edc14d]" />,
              title: 'Free Delivery',
              subtitle: 'For local area',
            },
            {
              icon: <Package size={22} className="text-[#edc14d]" />,
              title: 'Always Fresh',
              subtitle: 'Product well packaged',
            },
            {
              icon: <Award size={22} className="text-[#edc14d]" />,
              title: 'Superior Quality',
              subtitle: 'Quality products',
            },
            {
              icon: <Headphones size={22} className="text-[#edc14d]" />,
              title: 'Support',
              subtitle: '24/7 support',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center gap-4 py-6 px-6 md:px-10"
            >
              <div className="w-10 h-10 rounded-full bg-[#013120] border border-black/8 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-[#1C1C1C] tracking-wide">
                  {item.title}
                </p>
                <p className="font-sans text-xs text-[#8A9490] font-light mt-0.5">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. Curated Selections Bento Grid Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-start" id="curated-selections-trigger">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1C1C] tracking-wide">
            Curated Selections
          </h2>
          <div className="w-20 h-1 bg-[#edc14d] mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[550px]">
          {/* Main big category: Fresh Produce */}
          <div
            onClick={() => handleCategoryNav('produce')}
            className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-[#1A4233] border border-black/8 cursor-pointer flex flex-col justify-end"
          >
            <div className="absolute inset-0 z-0">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-65"
                src={IMAGES.freshProduce}
                alt="Direct organic farm fresh greens"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>

            <div className="relative z-10 p-8 md:p-12">
              <span className="text-[#edc14d] font-sans text-xs tracking-widest uppercase mb-2 block font-bold">
                Direct from Farms
              </span>
              <h3 className="font-serif text-3xl md:text-4xl font-semibold text-white">
                Fresh Produce
              </h3>
              <p className="text-[#556260] font-sans text-base max-w-sm mt-3 font-light leading-relaxed">
                Organic heirloom greens harvested at dawn for mineral density.
              </p>
            </div>
          </div>

          {/* Secondary Categories column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-8">
            {/* Category: Pantry */}
            <div
              onClick={() => handleCategoryNav('pantry')}
              className="group relative overflow-hidden rounded-3xl bg-[#1A4233] border border-black/8 cursor-pointer flex flex-col justify-end p-8"
            >
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
                  src={IMAGES.pantryJars}
                  alt="Organic artisan staples and ancient grains"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10">
                <span className="text-[#edc14d] font-sans text-[10px] tracking-widest uppercase font-bold block mb-1">
                  PRESERVED VITALITY
                </span>
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Pantry Staples
                </h3>
              </div>
            </div>

            {/* Category: Ready Meals */}
            <div
              onClick={() => handleCategoryNav('meals')}
              className="group relative overflow-hidden rounded-3xl bg-[#1A4233] border border-black/8 cursor-pointer flex flex-col justify-end p-8"
            >
              <div className="absolute inset-0 z-0">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
                  src={IMAGES.readyMeals}
                  alt="Gourmet ready to heat vegan meals"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10">
                <span className="text-[#edc14d] font-sans text-[10px] tracking-widest uppercase font-bold block mb-1">
                  MICHELIN ARTISTRY
                </span>
                <h3 className="font-serif text-2xl font-semibold text-white">
                  Ready Meals
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Top 10 Most Favorite — Carousel */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Star size={16} className="text-[#edc14d] fill-current" />
              <span className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
                Community Favorites
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1C1C] tracking-wide">
              Top 10 Most Favorite
            </h2>
            <div className="w-20 h-1 bg-[#edc14d] mt-4 rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            {/* Prev / Next buttons */}
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: -280, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-black/12 hover:border-[#edc14d] flex items-center justify-center text-[#556260] hover:text-[#edc14d] transition-all cursor-pointer"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => carouselRef.current?.scrollBy({ left: 280, behavior: 'smooth' })}
              className="w-10 h-10 rounded-full border border-black/12 hover:border-[#edc14d] flex items-center justify-center text-[#556260] hover:text-[#edc14d] transition-all cursor-pointer"
            >
              <ChevronRight size={18} />
            </button>
            <button
              onClick={() => { setCategoryFilter('all'); setView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="text-[#edc14d] font-sans text-xs font-bold tracking-widest flex items-center gap-2 group hover:gap-3 transition-all cursor-pointer uppercase pb-1 border-b border-[#edc14d]/10 hover:border-[#edc14d]/60 ml-2"
            >
              VIEW ALL
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Carousel track */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {[...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 10).map((product, index) => (
            <div
              key={product.id}
              className="group bg-[#013120]/6 border border-black/8 rounded-2xl overflow-hidden flex flex-col hover:border-black/12 hover:scale-[1.02] transition-all duration-300 flex-shrink-0 w-[240px]"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-black/30">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                {/* Rank badge */}
                <span className={`absolute top-2.5 left-2.5 w-7 h-7 rounded-full flex items-center justify-center font-sans text-[11px] font-black border ${
                  index === 0
                    ? 'bg-[#edc14d] text-[#362800] border-[#edc14d]'
                    : index === 1
                    ? 'bg-white/20 text-white border-white/30 backdrop-blur-sm'
                    : index === 2
                    ? 'bg-[#a3732a]/70 text-[#fde4a0] border-[#a3732a] backdrop-blur-sm'
                    : 'bg-black/60 text-white/70 border-white/10 backdrop-blur-sm'
                }`}>
                  {index + 1}
                </span>

                {/* Rating */}
                <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-[#edc14d] text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10">
                  <Star size={9} className="fill-current" /> {product.rating}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <span className="font-sans text-[9px] tracking-widest text-[#edc14d] uppercase font-bold">
                  {product.categoryLabel}
                </span>
                <h3 className="font-serif text-sm font-medium text-[#1C1C1C] leading-snug line-clamp-2 group-hover:text-[#edc14d] transition-colors flex-1">
                  {product.name}
                </h3>
                <span className="font-serif text-base font-bold text-[#1C1C1C]">
                  ${product.price.toFixed(2)}
                </span>
                <button
                  onClick={() => handleViewProduct(product.id)}
                  className="w-full mt-1 py-2 rounded-full border border-[#edc14d]/40 hover:border-[#edc14d] hover:bg-[#edc14d]/10 text-[#edc14d] font-sans text-[10px] font-bold tracking-widest uppercase transition-all cursor-pointer"
                >
                  View Product
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. The Plantsource Wholesale Philosophy Section */}
      <section className="bg-[#EDEAE4] py-24 border-y border-black/8">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1C1C] tracking-wide">
              The Plantsource Wholesale Philosophy
            </h2>
            <p className="font-sans text-base md:text-lg text-[#556260] max-w-2xl mx-auto font-light leading-relaxed">
              Commitment to purity isn't just a tagline, it's our core operating principle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: 100% Organic */}
            <div className="flex flex-col items-center text-center p-10 bg-[#F7F4EF] border border-black/8 rounded-3xl hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#013120] rounded-full flex items-center justify-center mb-6 text-[#edc14d] border border-black/8 group-hover:bg-[#1A4233] transition-colors">
                <Sprout size={28} className="text-[#edc14d]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">100% Organic</h4>
              <p className="font-sans text-sm text-[#556260] leading-relaxed font-light">
                No synthetic pesticides or fertilizers. Ever. Just nature in its purest, most vitalizing form.
              </p>
            </div>

            {/* Card 2: Carbon Neutral */}
            <div className="flex flex-col items-center text-center p-10 bg-[#F7F4EF] border border-black/8 rounded-3xl hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#013120] rounded-full flex items-center justify-center mb-6 text-[#edc14d] border border-black/8 group-hover:bg-[#1A4233] transition-colors">
                <Leaf size={28} className="text-[#edc14d]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Carbon Neutral</h4>
              <p className="font-sans text-sm text-[#556260] leading-relaxed font-light">
                Our delivery courier grids and fully compostable packaging systems are meticulously designed with local soil health in mind.
              </p>
            </div>

            {/* Card 3: Nutrition First */}
            <div className="flex flex-col items-center text-center p-10 bg-[#F7F4EF] border border-black/8 rounded-3xl hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#013120] rounded-full flex items-center justify-center mb-6 text-[#edc14d] border border-black/8 group-hover:bg-[#1A4233] transition-colors">
                <Sparkles size={28} className="text-[#edc14d]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-[#1C1C1C] mb-3">Nutrition First</h4>
              <p className="font-sans text-sm text-[#556260] leading-relaxed font-light">
                Formulated by functional nutritional experts to ensure every molecule absorbed boosts cellular vitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Latest Blog Preview (Plantsource Wholesale Living) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1C1C] tracking-wide">
              Plantsource Wholesale Living
            </h2>
            <p className="font-sans text-sm text-[#556260] font-light mt-2">
              Insights into an elevated plant-powered lifestyle.
            </p>
          </div>

          <button
            onClick={() => handleViewAllArticles()}
            className="text-[#edc14d] font-sans text-xs font-bold tracking-widest flex items-center gap-2 group hover:gap-3 transition-all cursor-pointer uppercase pb-1 border-b border-[#edc14d]/10 hover:border-[#edc14d]/60"
          >
            EXPLORE MORE
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Column Horizontal Cards exactly matching Image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {homeArticles.map((article) => (
            <article
              key={article.id}
              className="group bg-[#013120]/6 hover:bg-[#013120]/10 border border-black/8 overflow-hidden rounded-3xl flex flex-col md:flex-row transition-all duration-300"
            >
              <div className="md:w-1/2 overflow-hidden relative min-h-[220px] md:min-h-auto flex items-stretch">
                <img
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                  src={article.image}
                  alt={article.title}
                />
              </div>

              <div className="p-8 md:w-1/2 flex flex-col justify-center space-y-4">
                <div className="flex items-center gap-3">
                  <span className="border border-black/10 px-3 py-1 rounded-full font-sans text-[10px] tracking-wider uppercase text-[#1C1C1C]/80">
                    {article.categoryLabel}
                  </span>
                  <span className="text-[#8A9490] font-sans text-[10px] tracking-wider uppercase font-medium">
                    {article.readTime}
                  </span>
                </div>

                <h3 className="font-serif text-xl font-medium text-[#1C1C1C] group-hover:text-[#edc14d] transition-colors leading-snug">
                  {article.title}
                </h3>

                <p className="font-sans text-xs text-[#556260] line-clamp-2 leading-relaxed font-light">
                  {article.excerpt}
                </p>

                <button
                  onClick={() => handleArticleClick(article.id)}
                  className="w-fit text-[#edc14d] font-sans text-xs tracking-wider uppercase border-b border-transparent hover:border-[#edc14d]/60 pb-0.5 pt-2 transition-all font-semibold cursor-pointer align-left text-left"
                >
                  READ MORE
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* YouTube Videos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            { id: '7hNtuYT4Gaw' },
            { id: 'nrDlg17dmWw' },
          ].map((video) => (
            <div key={video.id} className="rounded-2xl overflow-hidden border border-black/10 aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${video.id}`}
                title="Plantsource video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 8. Join the Movement / Call-To-Action (Image 3) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative bg-[#013120]/6 border border-black/8 rounded-3xl p-10 md:p-20 text-center overflow-hidden">
          {/* Accent light source */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#edc14d]/50 to-transparent opacity-80" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1C1C] tracking-wide">
              Join the Movement.
            </h2>
            <p className="font-sans text-base md:text-lg text-[#556260] font-light leading-relaxed">
              Experience the Plantsource Wholesale lifestyle through our seasonal farm-fresh harvests, curated recipes, and exquisite botanical wellness workshops.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button
                onClick={() => handleViewAllRecipes()}
                className="bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] px-8 py-5 rounded-full font-sans text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-xl shadow-[#FDD05A]/10 cursor-pointer"
              >
                BROWSE OUR RECIPES
              </button>
              <button
                onClick={() => handleNavCategoryAll()}
                className="border border-[#edc14d]/30 hover:border-[#edc14d] text-[#1C1C1C] hover:bg-black/5 px-8 py-5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                VISIT THE BOUTIQUE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="bg-[#EDEAE4] border-t border-black/8 py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto">

          {/* Brand */}
          <div className="mb-12 pb-10 border-b border-black/8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#013120] flex items-center justify-center border border-black/10">
                <Leaf size={15} className="text-[#edc14d]" />
              </div>
              <span className="font-serif text-lg tracking-wider font-semibold text-[#1C1C1C] uppercase">
                Plantsource Wholesale
              </span>
            </div>
            <p className="font-sans text-xs text-[#AAB0AE] font-light max-w-xs">
              Purity in every bite — sustainably sourced, ethically harvested.
            </p>
          </div>

          {/* 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Col 1: Connect with us */}
            <div className="space-y-5">
              <h4 className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
                Connect With Us
              </h4>
              <div className="flex flex-col gap-3">
                {[
                  {
                    label: 'Instagram',
                    icon: (
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'TikTok',
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.28 6.28 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'YouTube',
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1C4.6 3 3.3 3 2.2 4.2 1.3 5 1 7 1 7S.7 9.3.7 11.5v2.1c0 2.2.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.6 22.2 12 22.2 12 22.2s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.2.9-.8 1.2-2.8 1.2-2.8s.3-2.3.3-4.5v-2.1C23.3 9.3 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
                      </svg>
                    ),
                  },
                  {
                    label: 'Pinterest',
                    icon: (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.08 3.16 9.44 7.63 11.22-.1-.96-.2-2.43.04-3.47.22-.94 1.47-6.23 1.47-6.23s-.37-.75-.37-1.87c0-1.75 1.02-3.06 2.28-3.06 1.08 0 1.6.81 1.6 1.78 0 1.08-.69 2.7-1.05 4.2-.3 1.26.62 2.28 1.86 2.28 2.23 0 3.73-2.85 3.73-6.22 0-2.57-1.74-4.37-4.22-4.37-2.88 0-4.57 2.16-4.57 4.39 0 .87.33 1.8.75 2.3a.3.3 0 0 1 .07.29c-.08.31-.25 1-.28 1.14-.04.18-.14.22-.32.13-1.25-.58-2.03-2.42-2.03-3.9 0-3.17 2.3-6.08 6.63-6.08 3.48 0 6.19 2.48 6.19 5.8 0 3.46-2.18 6.24-5.2 6.24-1.02 0-1.97-.53-2.3-1.15l-.62 2.33c-.23.87-.84 1.96-1.25 2.62.94.29 1.93.45 2.96.45 6.63 0 12-5.37 12-12S18.63 0 12 0z"/>
                      </svg>
                    ),
                  },
                ].map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    className="flex items-center gap-3 text-[#8A9490] hover:text-[#edc14d] transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-full border border-black/10 group-hover:border-[#edc14d]/40 flex items-center justify-center transition-colors">
                      {social.icon}
                    </span>
                    <span className="font-sans text-sm font-light">{social.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Policies */}
            <div className="space-y-5">
              <h4 className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
                Policies
              </h4>
              <ul className="space-y-3 font-sans text-sm text-[#8A9490] font-light">
                <li>
                  <a href="#" className="hover:text-[#1C1C1C] transition-colors">Shipping Policy</a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#1C1C1C] transition-colors">Refund Policy</a>
                </li>
              </ul>
            </div>

            {/* Col 3: Quick Links */}
            <div className="space-y-5">
              <h4 className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
                Quick Links
              </h4>
              <ul className="space-y-3 font-sans text-sm text-[#8A9490] font-light">
                <li>
                  <button onClick={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1C1C1C] transition-colors cursor-pointer text-left">
                    Home
                  </button>
                </li>
                <li>
                  <button onClick={() => { setCategoryFilter('all'); setView('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1C1C1C] transition-colors cursor-pointer text-left">
                    Product
                  </button>
                </li>
                <li>
                  <button onClick={() => { setView('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-[#1C1C1C] transition-colors cursor-pointer text-left">
                    Contact Us
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Copyright */}
          <div className="mt-12 pt-8 border-t border-black/8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-wider font-sans text-[#AAB0AE] font-semibold uppercase">
            <span>© 2024 Plantsource Wholesale CO. All Rights Reserved.</span>
            <span>Purity In Every Bite.</span>
          </div>
        </div>
      </footer>
    </div>
  );

  function handleNavCategoryAll() {
    setCategoryFilter('all');
    setView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleViewAllRecipes() {
    // sets category filter to recipes in journal and routes to journal
    setCategoryFilter('all');
    setSelectedArticleId(null);
    setView('journal');
    // scroll down slightly
    setTimeout(() => {
      const el = document.getElementById('journal-filter-trigger');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }

  function handleViewAllArticles() {
    setCategoryFilter('all');
    setSelectedArticleId(null);
    setView('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
