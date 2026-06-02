import React, { useState } from 'react';
import { Menu, ShoppingBag, X, Leaf, Info, ShoppingCart } from 'lucide-react';
import { ViewType } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ currentView, setView, cartCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'shop', label: 'SHOP' },
    { id: 'story', label: 'OUR STORY' },
    { id: 'journal', label: 'JOURNAL' },
    { id: 'contact', label: 'CONTACT' },
  ] as const;

  const handleNavClick = (viewId: ViewType) => {
    setView(viewId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-[#121414]/90 backdrop-blur-md border-b border-white/5 transition-all duration-300">
        <nav className="flex justify-between items-center px-6 md:px-12 py-4 max-w-7xl mx-auto">
          
          {/* Left Block with Menu Icon and Logo */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-[#edc14d] hover:scale-105 active:scale-95 transition-transform p-1 rounded-full hover:bg-white/5"
              id="mobile-menu-toggle"
              aria-label="Toggle Menu"
            >
              <Menu size={24} />
            </button>
            
            <button 
              onClick={() => handleNavClick('home')} 
              className="flex items-center gap-2 text-left group"
              id="brand-logo"
            >
              <div className="w-8 h-8 rounded-full bg-[#013120] flex items-center justify-center text-[#edc14d] border border-[#a3d1b8]/10 group-hover:bg-[#a3d1b8]/20 transition-all">
                <Leaf size={16} className="text-[#edc14d] group-hover:rotate-12 transition-transform" />
              </div>
              <span className="font-serif text-lg tracking-wider font-semibold text-white group-hover:text-[#edc14d] transition-colors uppercase">
                Plantsource Wholesale
              </span>
            </button>
          </div>

          {/* Center navigation links on Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`font-sans text-xs tracking-widest font-semibold transition-all uppercase relative py-2 ${
                  currentView === item.id 
                    ? 'text-[#edc14d]' 
                    : 'text-white/70 hover:text-white'
                }`}
                id={`nav-${item.id}`}
              >
                {item.label}
                {currentView === item.id && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#edc14d] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Right corner with Shopping Bag */}
          <div className="flex items-center gap-2">
            <button
              onClick={onCartClick}
              className="relative p-2 rounded-full hover:bg-white/5 active:scale-95 transition-all text-[#edc14d]"
              id="cart-toggle-button"
              aria-label="Shopping Cart"
            >
              <ShoppingBag size={22} className="stroke-[2px]" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 bg-[#edc14d] text-[#362800] text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#121414] shadow-md shadow-[#edc14d]/20"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </header>

      {/* Full Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#0c0f0f]/98 z-50 md:hidden flex flex-col pt-24 px-8"
          >
            {/* Close Button top-right */}
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-4 right-6 text-[#edc14d] p-2 hover:bg-white/5 rounded-full"
              aria-label="Close Menu"
              id="close-mobile-menu"
            >
              <X size={26} />
            </button>

            {/* Menu Header Brand */}
            <div className="flex items-center gap-3 mb-12 border-b border-white/5 pb-6">
              <Leaf size={24} className="text-[#edc14d]" />
              <span className="font-serif text-2xl tracking-widest text-[#e2e2e2] font-semibold uppercase">
                Plantsource Wholesale
              </span>
            </div>

            {/* Nav Items Link List */}
            <div className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left font-serif text-3xl font-medium tracking-wide border-b border-white/5 pb-3 transition-colors ${
                    currentView === item.id ? 'text-[#edc14d]' : 'text-white/60 hover:text-white'
                  }`}
                  id={`mobile-nav-${item.id}`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* Footer metadata in mobile menu */}
            <div className="mt-auto mb-12 border-t border-white/5 pt-6 text-white/40 text-xs tracking-wider space-y-2 font-sans">
              <p>Plantsource Wholesale CO.</p>
              <p className="text-white/20">Cultivating food honoring cellular health & pure culinary luxury.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
