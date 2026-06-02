import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Sparkles, Send, CheckCircle2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'wholesale',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields.');
      return;
    }

    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: 'wholesale', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-[#121414] text-[#e2e2e2] pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-16">
        
        {/* Title sections */}
        <div className="space-y-4 text-center">
          <p className="text-[#edc14d] font-sans text-xs font-bold tracking-widest uppercase">
            PLANTSOURCE WHOLESALE INTERACTION
          </p>
          <h1 className="font-serif text-4xl md:text-6xl text-white font-bold leading-tight">
            Connect With Our Sourcing Team
          </h1>
          <p className="font-sans text-sm md:text-base text-[#c1c8c2] max-w-2xl mx-auto font-light leading-relaxed">
            Whether you are a chef seeking Michelin-standard organic materials, or a health conscious epicurean, we welcome customized private reserve requests.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch" id="contact-view-form-grid">
          
          {/* Left info box columns */}
          <div className="lg:col-span-5 bg-[#1A4233]/15 border border-white/5 rounded-3xl p-8 md:p-12 space-y-10 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl text-white font-semibold">HQ Botanical Chambers</h3>
              <p className="font-sans text-xs md:text-sm text-[#c1c8c2] leading-relaxed font-light">
                Our main processing greenhouse operates on absolute circular biology. Visitation requests must be submitted 14 days in advance.
              </p>
            </div>

            {/* Info rows details */}
            <div className="space-y-6 font-sans text-xs md:text-sm text-white/70">
              
              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#013120] rounded-xl flex items-center justify-center text-[#edc14d] border border-white/5 flex-shrink-0">
                  <MapPin size={16} />
                </div>
                <div>
                  <p className="font-semibold text-white">Chamber Offices</p>
                  <p className="font-light text-white/50">986 botanical Ridge Road, Greenhouse C, Portland, OR</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#013120] rounded-xl flex items-center justify-center text-[#edc14d] border border-white/5 flex-shrink-0">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="font-semibold text-white">Direct Email</p>
                  <p className="font-light text-white/50">purity@plantsourcewholesale.example.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <div className="w-10 h-10 bg-[#013120] rounded-xl flex items-center justify-center text-[#edc14d] border border-white/5 flex-shrink-0">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="font-semibold text-white">Wholesale Inquiries</p>
                  <p className="font-light text-white/50">+1 (503) 887-ORGANIC</p>
                </div>
              </div>

            </div>

            {/* Micro warning indicator */}
            <div className="border-t border-white/5 pt-6 text-[10px] text-white/40 uppercase tracking-wider space-y-1">
              <p className="font-semibold text-white/60">Strict Ecological Code</p>
              <p>We do not communicate with chemical-dependent distributors.</p>
            </div>

          </div>

          {/* Right form submission element */}
          <div className="lg:col-span-7 bg-[#1A4233]/15 border border-white/5 rounded-3xl p-8 md:p-12">
            <h3 className="font-serif text-2xl text-white font-semibold mb-6">Dispatch a Message</h3>
            
            <AnimatePresence mode="wait">
              {submitStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-6 text-center py-12"
                >
                  <div className="w-16 h-16 bg-[#013120] border border-white/10 text-[#edc14d] rounded-full flex items-center justify-center mx-auto shadow-xl shadow-[#edc14d]/5">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-white">Message Transmitted</h4>
                  <p className="font-sans text-xs md:text-sm text-[#c1c8c2] font-light max-w-sm mx-auto leading-relaxed">
                    Our ecological sourcing team has received your inquiry. We verify all partner records against botanical purity benchmarks before reply. Expect correspondence within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleFormSubmit} 
                  className="space-y-5"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Name input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#edc14d] block">Your Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Elara Vane" 
                        className="w-full bg-[#121414] border border-white/10 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-[#edc14d] text-white placeholder-white/20"
                      />
                    </div>
                    {/* Email input */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#edc14d] block">Your Email *</label>
                      <input 
                        type="email" 
                        name="email" 
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="elara@example.com" 
                        className="w-full bg-[#121414] border border-white/10 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-[#edc14d] text-white placeholder-white/20"
                      />
                    </div>
                  </div>

                  {/* Subject selector */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#edc14d] block">Nature of Inquiry</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-[#121414] border border-white/10 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-[#edc14d] text-white cursor-pointer"
                    >
                      <option value="wholesale">High-End Wholesale Sourcing Partnership</option>
                      <option value="private">Private Consumer Soil Reserve Purchase</option>
                      <option value="press">Press & Botanical Scientific Collab</option>
                      <option value="other">General Sourcing Inquiry</option>
                    </select>
                  </div>

                  {/* Message body */}
                  <div className="space-y-2">
                    <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#edc14d] block">Your Message *</label>
                    <textarea 
                      name="message" 
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please delineate your chemical-free farming standard or custom boutique orders..." 
                      className="w-full bg-[#121414] border border-white/10 rounded-2xl py-3 px-4 text-xs focus:outline-none focus:border-[#edc14d] text-white placeholder-white/20 resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                      className="w-full bg-[#FDD05A] hover:bg-[#edc14d] text-[#362800] py-3.5 rounded-full font-sans text-xs font-bold tracking-widest uppercase hover:scale-[1.01] active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                    >
                      {submitStatus === 'submitting' ? 'Transmitting Inquiries...' : (
                        <>
                          TRANSMIT INQUIRY <Send size={13} />
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
