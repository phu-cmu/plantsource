import React, { useState } from 'react';
import { ArrowRight, Leaf, ShieldAlert, Heart, Sprout, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { ViewType, Product, Article } from '../types';
import { IMAGES, ARTICLES } from '../data';
import { motion } from 'motion/react';

interface HomeViewProps {
  setView: (view: ViewType) => void;
  setCategoryFilter: (category: 'all' | 'produce' | 'pantry' | 'meals') => void;
  setSelectedArticleId: (id: string | null) => void;
}

export default function HomeView({ setView, setCategoryFilter, setSelectedArticleId }: HomeViewProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  // Get the two specific articles from the screenshot to display:
  // "The Art of Seasonal Stewing" (art_2) and "Protein Purity: A Guide" (art_3)
  const homeArticles = ARTICLES.filter(art => art.id === 'art_2' || art.id === 'art_3');

  return (
    <div id="home-view" className="bg-[#121414] text-[#e2e2e2] scroll-smooth">
      
      {/* 1. Hero Section - Extreme high-end overhead view */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover brightness-[0.35]" 
            src={IMAGES.heroMain} 
            alt="Vibrant fresh vegan buddha bowl premium backgrounds"
          />
          {/* Elegant soft gradient overlay transitioning to primary green */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#013120] via-black/30 to-[#121414]/40" />
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
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 text-[10px] tracking-widest font-semibold uppercase">
          <span className="w-1.5 h-6 bg-white/20 rounded-full flex justify-center py-1">
            <motion.span 
              animate={{ y: [0, 8, 0] }} 
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1 h-1 bg-[#edc14d] rounded-full" 
            />
          </span>
          <span>SCROLL</span>
        </div>
      </section>

      {/* 2. Curated Selections Bento Grid Section */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-start" id="curated-selections-trigger">
          <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-wide">
            Curated Selections
          </h2>
          <div className="w-20 h-1 bg-[#edc14d] mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-auto md:h-[550px]">
          {/* Main big category: Fresh Produce */}
          <div 
            onClick={() => handleCategoryNav('produce')}
            className="md:col-span-8 group relative overflow-hidden rounded-3xl bg-[#1A4233] border border-white/5 cursor-pointer flex flex-col justify-end"
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
              <p className="text-[#c1c8c2] font-sans text-base max-w-sm mt-3 font-light leading-relaxed">
                Organic heirloom greens harvested at dawn for mineral density.
              </p>
            </div>
          </div>

          {/* Secondary Categories column */}
          <div className="md:col-span-4 grid grid-rows-2 gap-8">
            {/* Category: Pantry */}
            <div 
              onClick={() => handleCategoryNav('pantry')}
              className="group relative overflow-hidden rounded-3xl bg-[#1A4233] border border-white/5 cursor-pointer flex flex-col justify-end p-8"
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
              className="group relative overflow-hidden rounded-3xl bg-[#1A4233] border border-white/5 cursor-pointer flex flex-col justify-end p-8"
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

      {/* 3. The Plantsource Wholesale Philosophy Section */}
      <section className="bg-[#1a1c1c] py-24 border-y border-white/5">
        <div className="px-6 md:px-12 max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-wide">
              The Plantsource Wholesale Philosophy
            </h2>
            <p className="font-sans text-base md:text-lg text-[#c1c8c2] max-w-2xl mx-auto font-light leading-relaxed">
              Commitment to purity isn't just a tagline, it's our core operating principle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: 100% Organic */}
            <div className="flex flex-col items-center text-center p-10 bg-[#121414] border border-white/5 rounded-3xl hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#013120] rounded-full flex items-center justify-center mb-6 text-[#edc14d] border border-white/5 group-hover:bg-[#1A4233] transition-colors">
                <Sprout size={28} className="text-[#edc14d]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-white mb-3">100% Organic</h4>
              <p className="font-sans text-sm text-[#c1c8c2] leading-relaxed font-light">
                No synthetic pesticides or fertilizers. Ever. Just nature in its purest, most vitalizing form.
              </p>
            </div>

            {/* Card 2: Carbon Neutral */}
            <div className="flex flex-col items-center text-center p-10 bg-[#121414] border border-white/5 rounded-3xl hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#013120] rounded-full flex items-center justify-center mb-6 text-[#edc14d] border border-white/5 group-hover:bg-[#1A4233] transition-colors">
                <Leaf size={28} className="text-[#edc14d]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-white mb-3">Carbon Neutral</h4>
              <p className="font-sans text-sm text-[#c1c8c2] leading-relaxed font-light">
                Our delivery courier grids and fully compostable packaging systems are meticulously designed with local soil health in mind.
              </p>
            </div>

            {/* Card 3: Nutrition First */}
            <div className="flex flex-col items-center text-center p-10 bg-[#121414] border border-white/5 rounded-3xl hover:translate-y-[-8px] transition-all duration-300 group">
              <div className="w-16 h-16 bg-[#013120] rounded-full flex items-center justify-center mb-6 text-[#edc14d] border border-white/5 group-hover:bg-[#1A4233] transition-colors">
                <Sparkles size={28} className="text-[#edc14d]" />
              </div>
              <h4 className="font-serif text-xl font-semibold text-white mb-3">Nutrition First</h4>
              <p className="font-sans text-sm text-[#c1c8c2] leading-relaxed font-light">
                Formulated by functional nutritional experts to ensure every molecule absorbed boosts cellular vitality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Latest Blog Preview (Plantsource Wholesale Living) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-wide">
              Plantsource Wholesale Living
            </h2>
            <p className="font-sans text-sm text-[#c1c8c2] font-light mt-2">
              Insights into an elevated plant-powered lifestyle.
            </p>
          </div>
          
          <button 
            onClick={() => handleViewAllArticles()}
            className="text-[#edc14d] font-sans text-xs font-bold tracking-widest flex items-center gap-2 group hover:gap-3 transition-all cursor-pointer uppercase pb-1 border-b border-[#edc14d]/10 hover:border-[#edc14d]/60"
          >
            VIEW ALL ARTICLES 
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 2-Column Horizontal Cards exactly matching Image 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {homeArticles.map((article) => (
            <article 
              key={article.id}
              className="group bg-[#1A4233]/40 hover:bg-[#1a4233]/70 border border-white/5 overflow-hidden rounded-3xl flex flex-col md:flex-row transition-all duration-300"
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
                  <span className="border border-white/10 px-3 py-1 rounded-full font-sans text-[10px] tracking-wider uppercase text-white/80">
                    {article.categoryLabel}
                  </span>
                  <span className="text-white/40 font-sans text-[10px] tracking-wider uppercase font-medium">
                    {article.readTime}
                  </span>
                </div>
                
                <h3 className="font-serif text-xl font-medium text-white group-hover:text-[#edc14d] transition-colors leading-snug">
                  {article.title}
                </h3>
                
                <p className="font-sans text-xs text-[#c1c8c2] line-clamp-2 leading-relaxed font-light">
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
      </section>

      {/* 5. Founders Quote (Image 3 section) */}
      <section className="bg-gradient-to-b from-[#121414] to-[#0c0f0f] py-24 border-t border-white/5 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="text-[#edc14d] opacity-20 flex justify-center">
            <span className="font-serif text-[120px] leading-[0] select-none h-10 block pt-10">“</span>
          </div>
          
          <blockquote className="font-serif text-2xl md:text-4xl italic text-[#e2e2e2] leading-relaxed font-light">
            "We founded Plantsource Wholesale because we couldn't find a place that honored the purity of plants with the same rigor as high-end cuisine. We wanted to create a sanctuary where health and hedonism meet."
          </blockquote>
          
          <div className="space-y-1">
            <p className="font-sans text-xs tracking-widest uppercase font-bold text-[#edc14d]">
              ELARA & JULIAN VANE
            </p>
            <p className="font-sans text-xs text-white/40 uppercase">
              Founders of Plantsource Wholesale
            </p>
          </div>
        </div>
      </section>

      {/* 6. Join the Movement / Call-To-Action (Image 3) */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative bg-[#1A4233]/40 border border-white/5 rounded-3xl p-10 md:p-20 text-center overflow-hidden">
          {/* Accent light source */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#edc14d]/50 to-transparent opacity-80" />
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white tracking-wide">
              Join the Movement.
            </h2>
            <p className="font-sans text-base md:text-lg text-[#c1c8c2] font-light leading-relaxed">
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
                className="border border-[#edc14d]/30 hover:border-[#edc14d] text-white hover:bg-white/5 px-8 py-5 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                VISIT THE BOUTIQUE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Footer details and Newsletter - Premium Black Block */}
      <footer className="bg-[#0c0f0f] border-t border-white/5 py-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Col 1: Bio */}
          <div className="space-y-6">
            <h3 className="font-serif text-xl tracking-wider text-white uppercase font-bold">
              Plantsource Wholesale
            </h3>
            <p className="font-sans text-sm text-white/50 leading-relaxed font-light">
              Cultivating a world where culinary luxury, organic biology, and ethical purity coexist elegantly in every harvest.
            </p>
          </div>

          {/* Col 2: Explore */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-wider text-[#edc14d] uppercase">
              EXPLORE
            </h4>
            <ul className="space-y-3 font-sans text-sm text-white/40 font-light">
              <li><button onClick={() => handleCategoryNav('produce')} className="hover:text-white transition-colors cursor-pointer text-left">Harvest Sourcing</button></li>
              <li><button onClick={() => setView('story')} className="hover:text-white transition-colors cursor-pointer text-left">The Philosophy</button></li>
              <li><button onClick={() => handleViewAllRecipes()} className="hover:text-white transition-colors cursor-pointer text-left">Curated Recipes</button></li>
              <li><button onClick={() => setView('contact')} className="hover:text-white transition-colors cursor-pointer text-left">Contact & Care</button></li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-wider text-[#edc14d] uppercase">
              SUPPORT
            </h4>
            <ul className="space-y-3 font-sans text-sm text-white/40 font-light">
              <li><a href="#" className="hover:text-white transition-colors">Wholesale Operations</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Bio-Fresh Cold Chains</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Charter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Soil & Botanical Sourcing Reports</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter Input matching Image 1 */}
          <div className="space-y-4">
            <h4 className="font-sans text-xs font-bold tracking-wider text-[#edc14d] uppercase">
              NEWSLETTER
            </h4>
            <p className="font-sans text-sm text-white/50 font-light">
              Join our inner harvest circle for seasonal botanical updates.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <div className="flex border-b border-white/20 pb-2 items-center group focus-within:border-[#edc14d] transition-colors">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="email@example.com" 
                  className="bg-transparent border-none text-sm w-full focus:outline-none p-0 focus:ring-0 text-white placeholder-white/30"
                />
                <button type="submit" className="text-[#edc14d] hover:scale-110 active:scale-95 transition-transform cursor-pointer p-1">
                  <ArrowRight size={18} />
                </button>
              </div>
              
              {newsletterStatus === 'success' && (
                <p className="text-emerald-400 text-xs flex items-center gap-1.5 pt-1 font-sans">
                  <ShieldCheck size={12} /> Email registered successfully.
                </p>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-rose-400 text-xs flex items-center gap-1.5 pt-1 font-sans">
                  <AlertCircle size={12} /> Please enter a valid email address.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Global copyright footer */}
        <div className="mt-16 pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] tracking-wider font-sans text-white/30 font-semibold uppercase">
          <span>© 2024 Plantsource Wholesale CO. ALL RIGHTS RESERVED.</span>
          <span>PURITY IN EVERY BITE.</span>
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
