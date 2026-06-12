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
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">

        {/* 1. Brand Philosophy Grid (Image 3) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Block Text */}
          <div className="lg:col-span-7 space-y-6">
            <h1 className="font-serif text-[#edc14d] text-xs font-bold tracking-widest uppercase">
              THE PLANTSOURCE WHOLESALE PHILOSOPHY
            </h1>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1C1C1C] font-bold leading-tight">
              A Philosophy of Earth-First Living
            </h2>
            <div className="w-16 h-1 bg-[#edc14d] rounded-full" />

            <p className="font-sans text-base md:text-lg text-[#556260] font-light leading-relaxed">
              We don't just cook; we cultivate. Every ingredient entering our workshop represents the vital exchange between the soil and the soul. True biological wellness isn't a destination—it is the biological fuel we choose for our daily physical journeys.
            </p>
            <p className="font-sans text-sm md:text-base text-[#8A9490] font-light leading-relaxed">
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
                className="border border-[#edc14d]/30 text-[#1C1C1C] hover:bg-black/5 px-8 py-4 rounded-full font-sans text-xs font-bold tracking-widest uppercase transition-all cursor-pointer"
              >
                Partner with us
              </button>
            </div>
          </div>

          {/* Right Column Image Framer */}
          <div className="lg:col-span-5 relative group overflow-hidden rounded-3xl border border-black/8 shadow-2xl h-[420px] lg:h-[500px]">
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
          <div className="bg-[#013120]/6 border border-black/8 rounded-3xl p-8 space-y-4 hover:border-black/12 transition-colors">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
              <Sprout size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1C1C]">100% Certified Organic</h3>
            <p className="font-sans text-sm text-[#556260] font-light leading-relaxed">
              We compile and analyze dynamic chemical soil reports. Sourced exclusively from small family estates that preserve trace mineral structures.
            </p>
          </div>

          {/* Pillar 2: Neutral Base */}
          <div className="bg-[#013120]/6 border border-black/8 rounded-3xl p-8 space-y-4 hover:border-black/12 transition-colors">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
              <RefreshCw size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1C1C]">Carbon Closed Loop</h3>
            <p className="font-sans text-sm text-[#556260] font-light leading-relaxed">
              Our logistics frameworks operate on zero waste objectives. Transportation runs inside integrated, localized dispatch networks.
            </p>
          </div>

          {/* Pillar 3: Culinary Science */}
          <div className="bg-[#013120]/6 border border-black/8 rounded-3xl p-8 space-y-4 hover:border-black/12 transition-colors">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
              <Award size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1C1C]">Culinary Gastronomy</h3>
            <p className="font-sans text-sm text-[#556260] font-light leading-relaxed">
              Merging deep chemical dietetic knowledge with elite plating and preparation. Healthy living never sacrifices gourmet pleasure.
            </p>
          </div>

        </section>

        {/* 3. Premium Quality */}
        <section className="border-t border-black/8 pt-20 space-y-16">
          <div className="text-center space-y-4">
            <span className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
              What's Inside
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1C1C]">
              Premium Quality
            </h2>
            <p className="font-sans text-sm text-[#556260] font-light max-w-xl mx-auto leading-relaxed">
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
              <img src="/plant/hotdog.png" alt="Plant-based hotdog" className="w-full h-full object-cover" />
            </motion.div>

            {/* Top-left — Shiitake Mushroom */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="absolute top-4 left-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 p-3"
            >
              <svg viewBox="0 0 80 60" className="w-16 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Mushroom cap */}
                <path d="M40 8 C18 8 10 28 10 36 C20 33 30 32 40 32 C50 32 60 33 70 36 C70 28 62 8 40 8Z" stroke="#edc14d" strokeWidth="2" strokeLinejoin="round"/>
                {/* Gills */}
                <line x1="20" y1="35" x2="22" y2="28" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="30" y1="33" x2="31" y2="26" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="40" y1="32" x2="40" y2="25" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="50" y1="33" x2="49" y2="26" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round"/>
                <line x1="60" y1="35" x2="58" y2="28" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round"/>
                {/* Stem */}
                <path d="M33 32 L33 54 Q40 57 47 54 L47 32" stroke="#edc14d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <div className="text-center">
                <p className="font-sans text-[10px] font-bold text-[#edc14d] uppercase tracking-wide leading-tight">Shiitake</p>
                <p className="font-sans text-[9px] text-[#8A9490] leading-tight">Mushroom</p>
              </div>
            </motion.div>

            {/* Top-right — Wheat Protein */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="absolute top-4 right-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 p-3"
            >
              <svg viewBox="0 0 60 80" className="w-12 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main stem */}
                <line x1="30" y1="75" x2="30" y2="10" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                {/* Left grains */}
                <ellipse cx="20" cy="62" rx="9" ry="5" stroke="#edc14d" strokeWidth="1.5" transform="rotate(-35 20 62)"/>
                <ellipse cx="17" cy="48" rx="9" ry="5" stroke="#edc14d" strokeWidth="1.5" transform="rotate(-35 17 48)"/>
                <ellipse cx="16" cy="34" rx="9" ry="5" stroke="#edc14d" strokeWidth="1.5" transform="rotate(-35 16 34)"/>
                {/* Right grains */}
                <ellipse cx="40" cy="62" rx="9" ry="5" stroke="#edc14d" strokeWidth="1.5" transform="rotate(35 40 62)"/>
                <ellipse cx="43" cy="48" rx="9" ry="5" stroke="#edc14d" strokeWidth="1.5" transform="rotate(35 43 48)"/>
                <ellipse cx="44" cy="34" rx="9" ry="5" stroke="#edc14d" strokeWidth="1.5" transform="rotate(35 44 34)"/>
                {/* Top grain */}
                <ellipse cx="30" cy="16" rx="7" ry="5" stroke="#edc14d" strokeWidth="1.5"/>
              </svg>
              <div className="text-center">
                <p className="font-sans text-[10px] font-bold text-[#edc14d] uppercase tracking-wide leading-tight">Wheat</p>
                <p className="font-sans text-[9px] text-[#8A9490] leading-tight">Protein</p>
              </div>
            </motion.div>

            {/* Bottom-left — Konjac */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute bottom-4 left-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 p-3"
            >
              <svg viewBox="0 0 80 70" className="w-16 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Front face */}
                <path d="M15 40 L15 62 L55 62 L55 40Z" stroke="#edc14d" strokeWidth="2" strokeLinejoin="round"/>
                {/* Top face */}
                <path d="M15 40 L30 26 L70 26 L55 40Z" stroke="#edc14d" strokeWidth="2" strokeLinejoin="round"/>
                {/* Right face */}
                <path d="M55 40 L70 26 L70 48 L55 62Z" stroke="#edc14d" strokeWidth="2" strokeLinejoin="round"/>
                {/* Grid on front */}
                <line x1="28" y1="40" x2="28" y2="62" stroke="#edc14d" strokeWidth="1" strokeOpacity="0.6"/>
                <line x1="42" y1="40" x2="42" y2="62" stroke="#edc14d" strokeWidth="1" strokeOpacity="0.6"/>
                <line x1="15" y1="51" x2="55" y2="51" stroke="#edc14d" strokeWidth="1" strokeOpacity="0.6"/>
              </svg>
              <div className="text-center">
                <p className="font-sans text-[10px] font-bold text-[#edc14d] uppercase tracking-wide leading-tight">Konjac</p>
                <p className="font-sans text-[9px] text-[#8A9490] leading-tight">High Mesh</p>
              </div>
            </motion.div>

            {/* Bottom-right — Soy Protein */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="absolute bottom-4 right-4 w-40 h-40 bg-[#013120] border border-[#edc14d] rounded-2xl shadow-lg flex flex-col items-center justify-center gap-2 p-3"
            >
              <svg viewBox="0 0 80 65" className="w-16 h-14" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bean 1 top-center */}
                <ellipse cx="40" cy="18" rx="14" ry="10" stroke="#edc14d" strokeWidth="2" transform="rotate(-15 40 18)"/>
                <path d="M32 14 Q40 10 48 16" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
                {/* Bean 2 bottom-left */}
                <ellipse cx="24" cy="46" rx="14" ry="10" stroke="#edc14d" strokeWidth="2" transform="rotate(20 24 46)"/>
                <path d="M16 44 Q24 39 32 44" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
                {/* Bean 3 bottom-right */}
                <ellipse cx="56" cy="46" rx="14" ry="10" stroke="#edc14d" strokeWidth="2" transform="rotate(-20 56 46)"/>
                <path d="M48 44 Q56 39 64 44" stroke="#edc14d" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7"/>
              </svg>
              <div className="text-center">
                <p className="font-sans text-[10px] font-bold text-[#edc14d] uppercase tracking-wide leading-tight">Soy</p>
                <p className="font-sans text-[9px] text-[#8A9490] leading-tight">Protein</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 4. Three Pillars Icons */}
        <section className="border-t border-black/8 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Product Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="w-32 h-32 rounded-full bg-[#013120] border border-[#edc14d]/40 flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Central stem */}
                  <line x1="40" y1="68" x2="40" y2="28" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                  {/* Top leaf */}
                  <path d="M40 28 Q54 18 58 8 Q44 10 40 28Z" stroke="#edc14d" strokeWidth="1.8" strokeLinejoin="round" fill="#edc14d" fillOpacity="0.15"/>
                  {/* Right leaf upper */}
                  <path d="M40 36 Q56 28 62 18 Q46 20 40 36Z" stroke="#edc14d" strokeWidth="1.8" strokeLinejoin="round" fill="#edc14d" fillOpacity="0.15"/>
                  {/* Left leaf upper */}
                  <path d="M40 36 Q24 28 18 18 Q34 20 40 36Z" stroke="#edc14d" strokeWidth="1.8" strokeLinejoin="round" fill="#edc14d" fillOpacity="0.15"/>
                  {/* Right leaf lower */}
                  <path d="M40 48 Q56 42 63 32 Q46 33 40 48Z" stroke="#edc14d" strokeWidth="1.8" strokeLinejoin="round" fill="#edc14d" fillOpacity="0.15"/>
                  {/* Left leaf lower */}
                  <path d="M40 48 Q24 42 17 32 Q34 33 40 48Z" stroke="#edc14d" strokeWidth="1.8" strokeLinejoin="round" fill="#edc14d" fillOpacity="0.15"/>
                  {/* Ground */}
                  <path d="M26 68 Q40 63 54 68" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#1C1C1C]">Product Items</h3>
                <p className="font-sans text-sm text-[#556260] font-light">As many as hundreds of species</p>
              </div>
            </motion.div>

            {/* Safe to Eat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="w-32 h-32 rounded-full bg-[#013120] border border-[#edc14d]/40 flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Shield */}
                  <path d="M40 8 L64 19 L64 40 Q64 62 40 74 Q16 62 16 40 L16 19 Z"
                    stroke="#edc14d" strokeWidth="2" strokeLinejoin="round" fill="#edc14d" fillOpacity="0.08"/>
                  {/* Checkmark */}
                  <path d="M26 40 L36 52 L56 28"
                    stroke="#edc14d" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                  {/* Small leaf on top of shield */}
                  <path d="M40 8 Q46 4 50 8 Q46 12 40 8Z" fill="#edc14d" fillOpacity="0.5"/>
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#1C1C1C]">Safe to Eat</h3>
                <p className="font-sans text-sm text-[#556260] font-light">Multiple international certifications</p>
              </div>
            </motion.div>

            {/* Quality Assurance — IQF Snowflake */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center text-center gap-5"
            >
              <div className="w-32 h-32 rounded-full bg-[#013120] border border-[#edc14d]/40 flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 80 80" className="w-16 h-16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* 6 main arms */}
                  <line x1="40" y1="40" x2="66" y2="40" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="40" y1="40" x2="14" y2="40" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="40" y1="40" x2="53" y2="62" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="40" y1="40" x2="27" y2="18" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="40" y1="40" x2="27" y2="62" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="40" y1="40" x2="53" y2="18" stroke="#edc14d" strokeWidth="2" strokeLinecap="round"/>
                  {/* Branches on 0° arm at r=17 (point 57,40) */}
                  <line x1="57" y1="40" x2="51" y2="50" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="57" y1="40" x2="51" y2="30" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Branches on 180° arm at (23,40) */}
                  <line x1="23" y1="40" x2="29" y2="50" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="23" y1="40" x2="29" y2="30" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Branches on 60° arm at (48,54) */}
                  <line x1="48" y1="54" x2="42" y2="57" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="48" y1="54" x2="54" y2="48" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Branches on 240° arm at (32,26) */}
                  <line x1="32" y1="26" x2="38" y2="23" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="32" y1="26" x2="26" y2="32" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Branches on 120° arm at (32,54) */}
                  <line x1="32" y1="54" x2="26" y2="48" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="32" y1="54" x2="38" y2="57" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Branches on 300° arm at (48,26) */}
                  <line x1="48" y1="26" x2="54" y2="32" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  <line x1="48" y1="26" x2="42" y2="23" stroke="#edc14d" strokeWidth="1.5" strokeLinecap="round"/>
                  {/* Center circle */}
                  <circle cx="40" cy="40" r="4" fill="#edc14d"/>
                </svg>
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-semibold text-[#1C1C1C]">Quality Assurance</h3>
                <p className="font-sans text-sm text-[#556260] font-light">IQF rapid freezing</p>
              </div>
            </motion.div>

          </div>
        </section>

        {/* 5. Certificates */}
        <section className="border-t border-black/8 pt-16">
          <div className="text-center mb-10 space-y-2">
            <span className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
              Certifications
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#1C1C1C]">
              Internationally Certified
            </h3>
          </div>
          <div className="bg-black/5 border border-black/10 rounded-2xl p-8 flex items-center justify-center">
            <img
              src="/plant/certificate.webp"
              alt="International certifications"
              className="w-full max-w-2xl object-contain"
            />
          </div>
        </section>


      </div>
    </div>
  );
}
