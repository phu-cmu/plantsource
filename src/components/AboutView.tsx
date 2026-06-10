import React from 'react';
import { Sprout, Trash2, Heart, Award, ShieldCheck, MapPin, Truck, Leaf, RefreshCw } from 'lucide-react';
import { ViewType } from '../types';
import { IMAGES } from '../data';
import { motion } from 'motion/react';

interface AboutViewProps {
  setView: (view: ViewType) => void;
}

export default function AboutView({ setView }: AboutViewProps) {
  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
        
        {/* 1. Brand Philosophy Grid (Image 3) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-[#edc14d] text-xs font-bold tracking-widest uppercase">
              THE PLANTSOURCE WHOLESALE PHILOSOPHY
            </h1>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight">
              A Philosophy of Earth-First Living
            </h2>
            <div className="w-16 h-1 bg-[#edc14d] rounded-full" />
            
            <p className="font-sans text-base md:text-lg text-[#c1c8c2] font-light leading-relaxed">
              We don't just cook; we cultivate. Every ingredient entering our workshop represents the vital exchange between the soil and the soul. True biological wellness isn't a destination—it is the biological fuel we choose for our daily physical journeys.
            </p>
            <p className="font-sans text-sm md:text-base text-white/50 font-light leading-relaxed">
              Our pledge to 100% organic, vegan culinary craft is absolute and unwavering. By stripping away processing mechanisms, chemical agents, and unnecessary sugars, we expose the deep, exquisite flavors designed by nature itself. The result is a dining and home pantry standard as pristine as it is sensory and sophisticated.
            </p>

            <div className="pt-4 flex flex-wrap gap-4">
              <button 
                onClick={() => { setView('shop'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                className="bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] px-8 py-4 rounded-full font-sans text-xs font-bold tracking-widest uppercase hover:scale-105 active:scale-95 transition-all shadow-lg cursor-pointer"
              >
                Browse Sourcing
              </button>
              <button
                onClick={() => { setView('contact'); window.scrollTo({ top: 0, behavior: 'instant' }); }}
                className="border border-[#edc14d]/30 text-white hover:bg-white/5 px-8 py-4 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                Partner with us
              </button>
            </div>
          </div>

          {/* Right Column Image Framer */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-white/5 shadow-2xl h-[420px] lg:h-[500px]">
            <img 
              src={IMAGES.earthFirst} 
              alt="Sophisticated minimalist raw farm vegetables top down" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102 opacity-85"
            />
            <div className="absolute inset-0 bg-[#013120]/10 group-hover:bg-transparent transition-colors duration-500" />
          </div>

        </section>

        {/* 2. Core Operational Pillars (Image 3 Cards) */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Pillar 1: 100% Organic */}
          <div className="bg-[#1A4233]/20 border border-white/5 rounded-3xl p-8 space-y-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-white/5">
              <Sprout size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">100% Certified Organic</h3>
            <p className="font-sans text-sm text-[#c1c8c2] font-light leading-relaxed">
              We compile and analyze dynamic chemical soil reports. Sourced exclusively from small family estates that preserve trace mineral structures.
            </p>
          </div>

          {/* Pillar 2: Neutral Base */}
          <div className="bg-[#1A4233]/20 border border-white/5 rounded-3xl p-8 space-y-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-white/5">
              <RefreshCw size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">Carbon Closed Loop</h3>
            <p className="font-sans text-sm text-[#c1c8c2] font-light leading-relaxed">
              Our logistics frameworks operate on zero waste objectives. Transportation runs inside integrated, localized dispatch networks.
            </p>
          </div>

          {/* Pillar 3: Culinary Science */}
          <div className="bg-[#1A4233]/20 border border-white/5 rounded-3xl p-8 space-y-4 hover:border-white/10 transition-colors">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-white/5">
              <Award size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-white">Culinary Gastronomy</h3>
            <p className="font-sans text-sm text-[#c1c8c2] font-light leading-relaxed">
              Merging deep chemical dietetic knowledge with elite plating and preparation. Healthy living never sacrifices gourmet pleasure.
            </p>
          </div>

        </section>

        {/* 3. Premium Quality */}
        <section className="border-t border-white/5 pt-20 space-y-16">
          <div className="text-center space-y-4">
            <span className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
              What's Inside
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">
              Premium Quality
            </h2>
            <p className="font-sans text-sm text-[#c1c8c2] font-light max-w-xl mx-auto leading-relaxed">
              Every product is crafted from nature's finest plant-based ingredients, selected for maximum purity and nutritional potency.
            </p>
            <div className="w-16 h-1 bg-[#edc14d] rounded-full mx-auto" />
          </div>

          {/* Ingredient diagram */}
          <div className="relative max-w-2xl mx-auto" style={{ minHeight: '520px' }}>

            {/* SVG connecting lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 520" fill="none" preserveAspectRatio="xMidYMid meet">
              <line x1="145" y1="145" x2="265" y2="235" stroke="#edc14d" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.35"/>
              <line x1="455" y1="145" x2="335" y2="235" stroke="#edc14d" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.35"/>
              <line x1="145" y1="375" x2="265" y2="285" stroke="#edc14d" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.35"/>
              <line x1="455" y1="375" x2="335" y2="285" stroke="#edc14d" strokeWidth="1" strokeDasharray="6 4" strokeOpacity="0.35"/>
            </svg>

            {/* Center — hotdog (original colors) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-52 h-52 rounded-full overflow-hidden border-4 border-[#edc14d]/30 shadow-2xl shadow-[#edc14d]/10"
            >
              <img src="/plant/hotdog.webp" alt="Plant-based hotdog" className="w-full h-full object-cover" />
            </motion.div>

            {/* Top-left — Shiitake Mushroom */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute top-4 left-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-1"
            >
              <img
                src="/plant/shiitake_mushroom.webp"
                alt="Shiitake Mushroom"
                className="w-full h-full object-contain"
                              />
            </motion.div>

            {/* Top-right — Wheat Protein */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="absolute top-4 right-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-1"
            >
              <img
                src="/plant/wheat_protein.webp"
                alt="Wheat Protein"
                className="w-full h-full object-contain"
                              />
            </motion.div>

            {/* Bottom-left — High Mesh Konjac */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-4 left-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-1"
            >
              <img
                src="/plant/high_mesh.webp"
                alt="High Mesh Konjac"
                className="w-full h-full object-contain"
                              />
            </motion.div>

            {/* Bottom-right — Soy Protein */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="absolute bottom-4 right-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl overflow-hidden shadow-lg flex items-center justify-center p-1"
            >
              <img
                src="/plant/soy_protein.webp"
                alt="Soy Protein"
                className="w-full h-full object-contain"
                              />
            </motion.div>

          </div>
        </section>

        {/* 4. Three Pillars Icons */}
        <section className="border-t border-white/5 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                src: '/plant/product_item.webp',
                title: 'Product Items',
                subtitle: 'As many as hundreds of species',
              },
              {
                src: '/plant/safe_to_eat.webp',
                title: 'Safe to Eat',
                subtitle: 'Multiple international certifications',
              },
              {
                src: '/plant/iqf.webp',
                title: 'Quality Assurance',
                subtitle: 'IQF rapid freezing',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center text-center gap-5"
              >
                <div className="w-32 h-32 rounded-full bg-[#013120] border border-[#edc14d]/40 flex items-center justify-center overflow-hidden p-3 shadow-lg">
                  <img src={item.src} alt={item.title} className="w-full h-full object-contain" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-semibold text-white">{item.title}</h3>
                  <p className="font-sans text-sm text-[#c1c8c2] font-light">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Certificates */}
        <section className="border-t border-white/5 pt-16">
          <div className="text-center mb-10 space-y-2">
            <span className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
              Certifications
            </span>
            <h3 className="font-serif text-2xl font-semibold text-white">
              Internationally Certified
            </h3>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center">
            <img
              src="/plant/certificate.webp"
              alt="International certifications"
              className="w-full max-w-2xl object-contain"
            />
          </div>
        </section>

        {/* 6. The Root of Responsibility (Sourcing / Parallax Section) */}
        <section className="border-t border-white/5 pt-20 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-white">
              The Root of Responsibility
            </h2>
            <p className="font-sans text-sm md:text-base text-[#c1c8c2] font-light max-w-xl mx-auto">
              Sourcing ethically goes deeper than standard fair-trade certificates. We trace every delivery back to the specific soil plot.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Sourcing bullet points */}
            <div className="lg:col-span-6 space-y-8">
              
              <div className="flex gap-4 items-start">
                <div className="bg-[#013120] p-3 rounded-2xl border border-white/10 text-[#edc14d]">
                  <Truck size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-medium text-white">Short Supply Chains</h4>
                  <p className="font-sans text-xs md:text-sm text-[#c1c8c2] leading-relaxed font-light">
                    By shipping produce directly from active regenerative farms within hours of sunrise, we bypass heavy multi-tier distribution warehouses entirely, maintaining maximum cellular moisture.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#013120] p-3 rounded-2xl border border-white/10 text-[#edc14d]">
                  <Trash2 size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-medium text-white">Zero Waste Ambition</h4>
                  <p className="font-sans text-xs md:text-sm text-[#c1c8c2] leading-relaxed font-light">
                    Every scrap of organic bio-matter from our processing facilities is carefully returned to soil partners to make deep carbonized compost, preserving ecological soil integrity.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-[#013120] p-3 rounded-2xl border border-white/10 text-[#edc14d]">
                  <Leaf size={20} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-medium text-white">Regenerative Farming</h4>
                  <p className="font-sans text-xs md:text-sm text-[#c1c8c2] leading-relaxed font-light">
                    We actively fund agricultural trials focusing on biodiverse crop integration and fungal soil restore zones, transforming dead tilled fields back into flourishing carbon sinks.
                  </p>
                </div>
              </div>

            </div>

            {/* Sourcing dynamic illustration badge with soil holding image */}
            <div className="lg:col-span-6 relative flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={IMAGES.handsSoil} 
                  alt="Hands holding rich composted dark soil seeding" 
                  className="w-full h-full object-cover min-h-[350px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Accent Float Badge exactly matching Image 3 design */}
                <div className="absolute bottom-6 right-6 bg-[#edc14d] text-[#362800] p-6 rounded-2xl shadow-xl space-y-1 border border-white/10 max-w-[200px]">
                  <p className="font-serif text-3xl font-bold leading-none">98%</p>
                  <p className="font-sans text-[10px] uppercase font-bold tracking-wider leading-tight text-[#594400]">
                    Plastic-Free Packaging
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 4. Founders Quote block */}
        <section className="bg-gradient-to-b from-[#1A4233]/15 to-[#121414] py-16 border border-white/5 rounded-3xl text-center px-10 relative overflow-hidden">
          <div className="absolute -top-12 -left-12 w-24 h-24 bg-[#edc14d]/2 rounded-full blur-xl" />
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-4xl text-[#edc14d] font-serif inline-block">“</span>
            <p className="font-serif text-xl italic text-white/90 leading-relaxed font-light">
              "We hold ourselves to a strict evolutionary code: our soil must be chemical-free, our packaging must build composting health, and our dishes must awaken the soul. Purity is absolute."
            </p>
            <div className="space-y-1">
              <p className="font-sans text-xs tracking-widest font-bold text-[#edc14d] uppercase">Elara & Julian Vane</p>
              <p className="font-sans text-[10px] text-white/40 uppercase">Co-founders, Plantsource Wholesale</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
