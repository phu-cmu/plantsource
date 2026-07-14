import React from 'react';
import { Package, Truck, ThermometerSun, RotateCcw, Mail } from 'lucide-react';

export default function ShippingPolicyView() {
  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#1C1C1C] pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-16">

        {/* Header */}
        <section className="text-center space-y-4">
          <h1 className="font-serif text-[#edc14d] text-xs font-bold tracking-widest uppercase">
            Plantsource Wholesale
          </h1>
          <h2 className="font-serif text-4xl md:text-5xl text-[#1C1C1C] font-bold leading-tight">
            Shipping Policy
          </h2>
          <div className="w-16 h-1 bg-[#edc14d] rounded-full mx-auto" />
        </section>

        {/* Processing & Shipping Time */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#013120]/6 border border-black/8 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
              <Package size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1C1C]">Processing Time</h3>
            <p className="font-sans text-sm text-[#556260] font-light leading-relaxed">
              How long it will take to process, package, and drop off your order.
            </p>
            <p className="font-sans text-sm text-[#1C1C1C] font-semibold">
              Current Process Time: <span className="text-[#edc14d]">1-3 Business Days</span>
            </p>
          </div>

          <div className="bg-[#013120]/6 border border-black/8 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
              <Truck size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1C1C]">Shipping Time</h3>
            <p className="font-sans text-sm text-[#556260] font-light leading-relaxed">
              How long will it take to receive your order once dropped off at the post office.
            </p>
            <p className="font-sans text-sm text-[#1C1C1C] font-semibold">
              Shipping Time: <span className="text-[#edc14d]">1-2 Business Days</span>
            </p>
          </div>
        </section>

        {/* Warm weather note */}
        <section className="bg-black/5 border border-black/10 rounded-2xl p-6 flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
            <ThermometerSun size={18} />
          </div>
          <p className="font-sans text-sm text-[#556260] font-light leading-relaxed">
            During warm weather, products may arrive slightly thawed. This is normal and safe, provided your order arrives within 2 days with the included cold packs or dry ice.
          </p>
        </section>

        {/* Refund Policy */}
        <section id="refund-policy" className="border-t border-black/8 pt-16 space-y-8">
          <div className="text-center space-y-4">
            <span className="font-sans text-xs font-bold tracking-widest text-[#edc14d] uppercase">
              Our Commitment
            </span>
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-[#1C1C1C]">
              Refund Policy
            </h2>
            <div className="w-16 h-1 bg-[#edc14d] rounded-full mx-auto" />
          </div>

          <p className="font-sans text-base text-[#556260] font-light leading-relaxed">
            All food sales are <span className="font-semibold text-[#1C1C1C]">final</span>. We do not accept returns or exchanges unless the product is defective or there is a verified quality issue. We are not responsible for lost or stolen packages or orders shipped to an incorrect address provided at checkout.
          </p>

          <div className="bg-[#013120]/6 border border-black/8 rounded-3xl p-8 space-y-4">
            <div className="w-12 h-12 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
              <RotateCcw size={20} />
            </div>
            <p className="font-sans text-base text-[#556260] font-light leading-relaxed">
              If your order arrives <span className="font-semibold text-[#1C1C1C]">damaged, spoiled, defective, or incorrect</span>, please contact our customer service within <span className="font-semibold text-[#1C1C1C]">24 hours of delivery</span> by email. To process a refund or replacement, please include:
            </p>
            <ul className="list-disc list-inside space-y-2 font-sans text-sm text-[#556260] font-light pl-2">
              <li>Your order number</li>
              <li>A brief description of the issue</li>
              <li>Clear photos of the damaged product and packaging</li>
            </ul>
          </div>

          <p className="font-sans text-sm text-[#8A9490] font-light leading-relaxed">
            Please <span className="font-semibold text-[#1C1C1C]">do not dispose of the damaged items</span> until your claim has been reviewed, as additional information may be required. Claims submitted after 24 hours of delivery may not be eligible for a refund or replacement.
          </p>

          <div className="flex items-center gap-3 pt-4 border-t border-black/8">
            <div className="w-10 h-10 bg-[#013120] rounded-full flex items-center justify-center text-[#edc14d] border border-black/8">
              <Mail size={16} />
            </div>
            <a href="mailto:plantsourcewholesale@gmail.com" className="font-sans text-sm text-[#1C1C1C] hover:text-[#edc14d] transition-colors">
              plantsourcewholesale@gmail.com
            </a>
          </div>
        </section>

      </div>
    </div>
  );
}
