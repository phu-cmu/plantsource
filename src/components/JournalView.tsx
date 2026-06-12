import React, { useState, useEffect } from 'react';
import { ArrowLeft, Bookmark, ArrowRight, Check, Sparkles, BookOpen, Clock, User, Share2 } from 'lucide-react';
import { Article } from '../types';
import { ARTICLES, IMAGES } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface JournalViewProps {
  selectedArticleId: string | null;
  setSelectedArticleId: (id: string | null) => void;
}

export default function JournalView({ selectedArticleId, setSelectedArticleId }: JournalViewProps) {
  const [activeTag, setActiveTag] = useState<'all' | 'recipes' | 'nutrition' | 'mindfulness' | 'sustainability'>('all');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);
  const [shareFeedbackId, setShareFeedbackId] = useState<string | null>(null);

  // Auto-scroll to top when reading an article
  useEffect(() => {
    if (selectedArticleId) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [selectedArticleId]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarkedIds.includes(id)) {
      setBookmarkedIds(bookmarkedIds.filter(bId => bId !== id));
    } else {
      setBookmarkedIds([...bookmarkedIds, id]);
    }
  };

  const handleShare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setShareFeedbackId(id);
    setTimeout(() => setShareFeedbackId(null), 3000);
    // write to clipboard
    navigator.clipboard.writeText(`${window.location.origin}/?article=${id}`);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail && newsletterEmail.includes('@')) {
      setNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSuccess(false), 5000);
    }
  };

  // Filter articles based on active tag
  const filteredArticles = ARTICLES.filter(article => {
    if (activeTag === 'all') return true;
    return article.category === activeTag;
  });

  // Specific article expansion view
  if (selectedArticleId) {
    const article = ARTICLES.find(art => art.id === selectedArticleId);
    if (article) {
      return (
        <article className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] pt-28 pb-24 px-6">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* Back Button */}
            <button
              onClick={() => setSelectedArticleId(null)}
              className="flex items-center gap-2 text-[#edc14d] hover:text-[#1C1C1C] font-sans text-xs tracking-widest font-semibold uppercase group cursor-pointer"
              id="back-to-journal-btn"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              BACK TO JOURNAL
            </button>

            {/* Header Meta */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="bg-[#013120] text-[#a3d1b8] border border-[#a3d1b8]/15 px-3 py-1 rounded-full text-[11px] font-sans tracking-widest uppercase font-semibold">
                  {article.categoryLabel}
                </span>
                <span className="flex items-center gap-1.5 text-[#8A9490] text-[11px] uppercase tracking-wider font-sans">
                  <Clock size={12} /> {article.readTime}
                </span>
                <span className="text-[#AAB0AE] hidden sm:inline">•</span>
                <span className="text-[#8A9490] text-[11px] uppercase tracking-wider font-sans hidden sm:inline">
                  {article.date}
                </span>
              </div>

              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight text-[#1C1C1C]">
                {article.title}
              </h1>

              {/* Author Row */}
              <div className="flex items-center justify-between border-y border-black/8 py-4 mt-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#013120]/6 border border-black/10 flex items-center justify-center text-[#edc14d] font-bold font-serif text-sm">
                    {article.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-sans tracking-wider text-[#1C1C1C] font-semibold uppercase">{article.author}</p>
                    <p className="text-[10px] text-[#8A9490] font-sans uppercase">Plantsource Wholesale Editorial Board</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => toggleBookmark(article.id, e)}
                    className="p-2 rounded-full hover:bg-black/5 text-[#edc14d] cursor-pointer"
                  >
                    <Bookmark size={18} className={bookmarkedIds.includes(article.id) ? 'fill-current' : ''} />
                  </button>
                  <button
                    onClick={(e) => handleShare(article.id, e)}
                    className="p-2 rounded-full hover:bg-black/5 text-[#edc14d] relative cursor-pointer"
                  >
                    <AnimatePresence>
                      {shareFeedbackId === article.id && (
                        <motion.span
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.9 }}
                          className="absolute -top-10 right-0 bg-[#013120] border border-[#a3d1b8]/20 text-white text-[10px] font-sans px-2.5 py-1 rounded-md whitespace-nowrap"
                        >
                          Copied Link!
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <Share2 size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Featured Image */}
            <div className="w-full h-[320px] md:h-[480px] rounded-3xl overflow-hidden border border-black/8">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>

            {/* Article Body Content */}
            <div className="font-sans text-[#1C1C1C]/80 space-y-6 leading-relaxed text-base md:text-lg font-light pt-4 border-b border-black/8 pb-10">
              {article.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="font-serif text-2xl text-[#1C1C1C] font-semibold pt-6 pb-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n');
                  return (
                    <ul key={idx} className="space-y-3 pl-5 list-disc text-[#556260]">
                      {items.map((it, i) => {
                        const cleanItem = it.replace(/^[0-9\-\.\s]+/, '');
                        // Check if bold prefix exists
                        const boldMatch = cleanItem.match(/^\*\*(.*?)\*\*(.*)/);
                        if (boldMatch) {
                          return (
                            <li key={i}>
                              <strong className="text-[#1C1C1C] font-semibold">{boldMatch[1]}</strong>
                              {boldMatch[2]}
                            </li>
                          );
                        }
                        return <li key={i}>{cleanItem}</li>;
                      })}
                    </ul>
                  );
                }
                return <p key={idx}>{paragraph}</p>;
              })}
            </div>

            {/* Newsletter section integrated inside reading page for high-end feel */}
            <div className="bg-[#013120]/6 border border-black/8 rounded-3xl p-8 text-center space-y-4">
              <Sparkles className="text-[#edc14d] mx-auto" size={24} />
              <h4 className="font-serif text-xl font-medium text-[#1C1C1C]">Nourished with these ideas?</h4>
              <p className="text-xs text-[#556260] font-light max-w-sm mx-auto">
                Subscribe to receive our meticulously researched bio-nutrient reports and gourmet secret organic recipes.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto items-center border-b border-black/15 pb-2 pt-2 focus-within:border-[#edc14d] transition-transform">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your Email Address"
                  className="bg-transparent border-none text-xs w-full focus:outline-none p-0 focus:ring-0 text-[#1C1C1C] placeholder-black/30"
                />
                <button type="submit" className="text-[#edc14d] font-sans text-xs tracking-wider uppercase font-bold cursor-pointer">
                  SUBSCRIBE
                </button>
              </form>
              {newsletterSuccess && (
                <p className="text-emerald-600 text-xs font-sans">You have entered the Inner Circle.</p>
              )}
            </div>
          </div>
        </article>
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Banner Headers (Image 2) */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-[#edc14d] font-sans text-xs font-bold tracking-widest uppercase">
            THE PLANTSOURCE WHOLESALE
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-[#1C1C1C] font-bold tracking-tight">
            Share & Connect
          </h1>
          <p className="font-sans text-sm md:text-base text-[#556260] max-w-2xl mx-auto font-light leading-relaxed">
            Curated insights on high-end organic wellness, seasonal recipes, and the art of sustainable living.
          </p>
        </div>

        {/* Categories/Tags Filter (Image 2) */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-16 border-b border-black/8 pb-8" id="journal-filter-trigger">
          {[
            { id: 'all', label: 'All Stories' },
            { id: 'recipes', label: 'Recipes' },
            { id: 'nutrition', label: 'Nutrition' },
            { id: 'mindfulness', label: 'Mindfulness' },
            { id: 'sustainability', label: 'Sustainability' }
          ].map(tag => (
            <button
              key={tag.id}
              onClick={() => setActiveTag(tag.id as any)}
              className={`px-5 py-2.5 rounded-full font-sans text-xs tracking-wider uppercase font-semibold border transition-all cursor-pointer ${
                activeTag === tag.id
                  ? 'bg-[#edc14d]/10 text-[#edc14d] border-[#edc14d]'
                  : 'bg-transparent text-[#8A9490] border-black/10 hover:text-[#1C1C1C] hover:border-black/20'
              }`}
              id={`filter-${tag.id}`}
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Articles List matching the Journal Feed design precisely */}
        <div className="space-y-16">

          {/* Main big featured article on top (Soil Sustainability) */}
          {activeTag === 'all' && (
            <div
              onClick={() => setSelectedArticleId('art_1')}
              className="group bg-[#013120]/6 border border-black/8 rounded-3xl overflow-hidden cursor-pointer flex flex-col lg:flex-row transition-all duration-300 hover:bg-[#013120]/10"
            >
              {/* Image side */}
              <div className="lg:w-1/2 min-h-[300px] lg:min-h-auto relative">
                <img
                  src={IMAGES.sunriseFarm}
                  alt="Regenerative agriculture and fertile biological soils"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                />
              </div>
              {/* Content side */}
              <div className="p-8 md:p-12 lg:w-1/2 flex flex-col justify-center space-y-6">
                <div className="flex items-center gap-3">
                  <span className="border border-[#edc14d]/30 text-[#edc14d] px-3.5 py-1 rounded-full font-sans text-[11px] tracking-wider uppercase font-bold bg-[#edc14d]/5">
                    SUSTAINABILITY
                  </span>
                  <span className="text-[#8A9490] font-sans text-[11px] uppercase tracking-wider">
                    12 MIN READ
                  </span>
                </div>

                <h2 className="font-serif text-3xl md:text-4xl text-[#1C1C1C] font-medium hover:text-[#edc14d] transition-colors leading-tight">
                  The Future of Soil: Why Regenerative Agriculture is the New Organic.
                </h2>

                <p className="font-sans text-sm text-[#556260] leading-relaxed font-light">
                  Discover how restoring the earth's natural rhythms creates a more potent, nutrient-dense harvest for your kitchen. We examine cover cropping and multi-biodiverse biology.
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-black/8">
                  <span
                    className="text-[#edc14d] font-sans text-xs font-semibold tracking-widest flex items-center gap-2 uppercase"
                  >
                    Read Full Story <ArrowRight size={14} />
                  </span>
                  <span className="text-[#AAB0AE] font-sans text-xs font-light uppercase">
                    MAY 28, 2026
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Grid of secondary articles containing specific card layouts from Image 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredArticles.filter(art => art.id !== 'art_1').map((article) => {
              const isBookmarked = bookmarkedIds.includes(article.id);

              return (
                <div
                  key={article.id}
                  onClick={() => setSelectedArticleId(article.id)}
                  className="group bg-[#013120]/6 hover:bg-[#013120]/10 border border-black/8 rounded-3xl overflow-hidden cursor-pointer flex flex-col justify-between transition-all duration-300"
                >
                  <div className="space-y-6">
                    {/* Image frame */}
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      />
                      <button
                        onClick={(e) => toggleBookmark(article.id, e)}
                        className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-[#edc14d] hover:bg-black p-2 rounded-full border border-white/10 transition-colors"
                      >
                        <Bookmark size={15} className={isBookmarked ? 'fill-current' : ''} />
                      </button>
                    </div>

                    {/* Metadata and texts */}
                    <div className="px-8 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-[#edc14d] font-sans text-[10px] tracking-widest uppercase font-bold">
                          {article.categoryLabel}
                        </span>
                        <span className="text-[#8A9490] font-sans text-[10px] uppercase font-light">
                          {article.readTime}
                        </span>
                      </div>

                      <h3 className="font-serif text-2xl font-medium text-[#1C1C1C] group-hover:text-[#edc14d] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="font-sans text-xs text-[#556260] line-clamp-3 leading-relaxed font-light">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Footer card action */}
                  <div className="px-8 pb-8 pt-6 flex items-center justify-between border-t border-black/8 mt-6">
                    {article.category === 'recipes' ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedArticleId(article.id);
                        }}
                        className="bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] px-5 py-2.5 rounded-full font-sans text-[10px] tracking-widest uppercase font-bold hover:scale-105 active:scale-95 transition-all text-center"
                      >
                        View Recipe
                      </button>
                    ) : article.category === 'mindfulness' ? (
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-[#013120]/6 flex items-center justify-center text-xs">🌱</div>
                        <span className="text-[#8A9490] font-sans text-[10px] tracking-wider uppercase font-semibold">
                          Plantsource Wholesale Editorial Team
                        </span>
                      </div>
                    ) : (
                      <span className="text-[#edc14d] font-sans text-[10px] tracking-widest uppercase font-bold flex items-center gap-1">
                        LEARN MORE <ArrowRight size={12} />
                      </span>
                    )}

                    <span className="text-[#AAB0AE] font-sans text-[10px] tracking-wider uppercase">
                      {article.date}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Newsletter Circle card matching Image 2 perfectly */}
        <section className="mt-24 bg-[#013120] border border-black/8 text-center p-12 md:p-20 rounded-3xl relative overflow-hidden max-w-4xl mx-auto">
          {/* Subtle decoration elements */}
          <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#edc14d]/5 rounded-full blur-2xl" />
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#a3d1b8]/5 rounded-full blur-2xl" />

          <div className="relative z-10 max-w-md mx-auto space-y-6">
            <h2 className="font-serif text-3xl text-white font-medium">
              Join the Inner Circle.
            </h2>
            <p className="font-sans text-sm text-[#556260] font-light leading-relaxed">
              Receive weekly seasonal recipes, holistic wellness reports, and exclusive farm-to-table reserve notifications directly in your inbox.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4 pt-4">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Email Address"
                maxLength={80}
                required
                className="w-full bg-[#F0EDE8] border border-black/10 rounded-full py-4 px-6 text-center text-sm text-[#1C1C1C] placeholder-black/30 focus:outline-none focus:border-[#edc14d] focus:ring-1 focus:ring-[#edc14d] transition-all"
              />
              <button
                type="submit"
                className="w-full bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] py-4 rounded-full font-sans text-xs tracking-widest uppercase font-bold transition-transform active:scale-98 cursor-pointer shadow-lg shadow-[#FDD05A]/10"
              >
                Subscribe
              </button>
            </form>

            <AnimatePresence>
              {newsletterSuccess && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-[#edc14d] text-xs font-semibold uppercase tracking-wider font-sans mt-4"
                >
                  Respecting your privacy and inbox. Welcome.
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </div>
  );
}
