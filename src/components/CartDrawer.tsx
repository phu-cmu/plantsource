import React, { useState } from 'react';
import { ShoppingBag, X, Plus, Minus, Trash2, Tag, Gift, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoFeedback, setPromoFeedback] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'processing' | 'success'>('cart');

  // Calculates subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const total = subtotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const normalized = promoCode.trim().toUpperCase();
    if (normalized === 'PLANTSOURCE10') {
      setDiscountPercent(10);
      setPromoFeedback({ type: 'success', text: '10% Discount applied successfully!' });
    } else if (normalized === 'SOILGEN') {
      setDiscountPercent(15);
      setPromoFeedback({ type: 'success', text: '15% Bio-Soil discount is active!' });
    } else {
      setPromoFeedback({ type: 'error', text: 'Voucher code not recognized.' });
      setTimeout(() => setPromoFeedback(null), 3500);
    }
  };

  const handleCheckoutSubmit = () => {
    if (cartItems.length === 0) return;
    setCheckoutStep('processing');
    
    // Simulate high-end checking logs
    setTimeout(() => {
      setCheckoutStep('success');
      onClearCart();
    }, 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black z-40 cursor-pointer"
          />

          {/* Slider Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full sm:max-w-md bg-[#1a1c1c] z-50 shadow-2xl flex flex-col justify-between border-l border-white/5 overflow-hidden"
            id="cart-drawer-panel"
          >
            
            {/* Header Area */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white">
                <ShoppingBag size={18} className="text-[#edc14d]" />
                <h2 className="font-serif text-lg tracking-wide font-semibold uppercase">Your Basket</h2>
                <span className="text-white/40 text-xs">({cartItems.length} styles)</span>
              </div>
              <button
                onClick={onClose}
                className="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/5"
                aria-label="Close basket"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Steps Rendering */}
            {checkoutStep === 'cart' && (
              <>
                {/* Scrollable list items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-24 space-y-4">
                      <div className="w-16 h-16 bg-[#121414] rounded-full flex items-center justify-center mx-auto border border-white/5">
                        <ShoppingBag size={24} className="text-white/20" />
                      </div>
                      <h3 className="font-serif text-lg font-medium text-white/80">Basket is empty</h3>
                      <p className="text-xs text-white/40 max-w-[200px] mx-auto font-light">
                        Select from our organic reserves to begin your culinary journey.
                      </p>
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item.product.id}
                        className="flex gap-4 p-4 bg-[#121414] rounded-2xl border border-white/5 hover:border-white/10 transition-colors"
                      >
                        {/* Thumbnail image */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/20 flex-shrink-0">
                          <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                        </div>

                        {/* Title descriptions */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div className="space-y-1">
                            <span className="text-[9px] tracking-wider text-[#edc14d] uppercase font-bold">
                              {item.product.categoryLabel}
                            </span>
                            <h4 className="font-semibold text-xs text-white leading-snug line-clamp-1">
                              {item.product.name}
                            </h4>
                            <p className="text-[10px] text-white/50">${item.product.price.toFixed(2)} / {item.product.unit}</p>
                          </div>

                          {/* Quantities increment rows */}
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-1.5 bg-[#1A4233]/20 border border-white/5 rounded-full p-1">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, -1)}
                                className="text-white/60 hover:text-white p-1 hover:bg-white/5 rounded-full"
                              >
                                <Minus size={10} />
                              </button>
                              <span className="text-xs font-semibold text-white px-1.5 min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, 1)}
                                className="text-white/60 hover:text-white p-1 hover:bg-white/5 rounded-full"
                              >
                                <Plus size={10} />
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-white/30 hover:text-rose-400 p-1 rounded-full transition-colors"
                              aria-label="Remove item"
                            >
                              <Trash2 size={13} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Bottom summaries price calculator */}
                {cartItems.length > 0 && (
                  <div className="border-t border-white/5 p-6 bg-[#121414]/90 backdrop-blur space-y-4">
                    {/* Promo voucher entry */}
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="flex-1 relative flex items-center">
                        <span className="absolute left-3 text-white/40">
                          <Tag size={12} />
                        </span>
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="PROMO CODE (PLANTSOURCE10)"
                          className="w-full bg-[#1A4233]/20 border border-white/10 rounded-full py-2 pl-9 pr-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-[#edc14d] text-white"
                        />
                      </div>
                      <button 
                        type="submit" 
                        className="bg-transparent border border-[#edc14d] hover:bg-[#edc14d]/10 text-[#edc14d] px-4 py-2 rounded-full text-[10px] tracking-wider uppercase font-bold cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>

                    {promoFeedback && (
                      <p className={`text-[10px] text-center font-semibold uppercase tracking-wider font-sans ${
                        promoFeedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                      }`}>
                        {promoFeedback.text}
                      </p>
                    )}

                    {/* Numeric totals */}
                    <div className="space-y-2 text-xs font-sans">
                      <div className="flex justify-between text-white/60">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-emerald-400 font-semibold uppercase tracking-wider text-[11px]">
                          <span className="flex items-center gap-1"><Gift size={11} /> Promo Code Applied ({discountPercent}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between text-white/60">
                        <span>Courier Bio-Fresh Delivery</span>
                        <span className="text-emerald-400 uppercase font-semibold text-[10px] tracking-wider">Free</span>
                      </div>
                      <div className="flex justify-between text-base text-white font-serif font-bold border-t border-white/5 pt-2.5 mt-2">
                        <span>Total Due</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCheckoutSubmit}
                      className="w-full bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] py-4 rounded-full font-sans text-xs tracking-widest uppercase font-bold hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      PROCEED TO CHECKOUT <ArrowRight size={13} />
                    </button>
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'processing' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center animate-pulse">
                <div className="w-12 h-12 bg-transparent border-t-2 border-[#edc14d] rounded-full animate-spin" />
                <div className="space-y-2">
                  <h3 className="font-serif text-lg font-medium text-white uppercase tracking-wider">Compiling Botanical Reserve</h3>
                  <p className="text-xs text-white/40 max-w-[220px] mx-auto font-light leading-relaxed">
                    Analyzing direct farm supply chains and local bio-fresh dispatch locks...
                  </p>
                </div>
              </div>
            )}

            {checkoutStep === 'success' && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-center bg-[#013120]/30">
                <div className="w-16 h-16 bg-[#1A4233] border border-white/10 rounded-full flex items-center justify-center text-[#edc14d] shadow-xl">
                  <CheckCircle size={32} />
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-serif text-2xl font-semibold text-white">Order Completed</h3>
                  <p className="text-sm text-white/80 font-light max-w-xs mx-auto leading-relaxed">
                    Thank you! Your bio-fresh organic reserves are prepared for packaging. Dispatch departs within 6 hours.
                  </p>
                  
                  <div className="bg-[#121414] p-4 rounded-xl text-left text-[10px] uppercase font-mono tracking-wide text-white/40 space-y-1 divide-y divide-white/5">
                    <p className="pb-1 text-white/60">Dispatch Code: VRD-{Math.floor(Math.random() * 900000) + 100000}</p>
                    <p className="pt-1">Delivery Grid: Local Eco-Air-Tight Van</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setCheckoutStep('cart');
                    onClose();
                  }}
                  className="bg-transparent border border-[#edc14d] hover:bg-[#edc14d]/10 text-[#edc14d] py-3 px-8 rounded-full font-sans text-xs tracking-widest uppercase font-bold cursor-pointer"
                >
                  Return to Boutique
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
