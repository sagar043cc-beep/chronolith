import React, { useState } from 'react';
import { Check, Info, ShieldCheck, Flame } from 'lucide-react';

interface PricingPlan {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  description: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  accent: string;
  accentHover: string;
  shadowColor: string;
}

const plansData: PricingPlan[] = [
  {
    name: 'Novice Explorer',
    priceMonthly: 0,
    priceYearly: 0,
    description: 'Perfect for casual hikers, rockhounds, and geology enthusiasts starting their deep time journey.',
    features: [
      'Access to 3 active Field Guides',
      'Basic Stratigraphy Viewer',
      'Offline HTML guides (no GPS)',
      'Community forums access'
    ],
    buttonText: 'Start Exploring',
    isPopular: false,
    accent: 'bg-white/10 hover:bg-white/20 text-white',
    accentHover: 'bg-white/20',
    shadowColor: 'shadow-white/5'
  },
  {
    name: 'Field Geologist',
    priceMonthly: 19,
    priceYearly: 15, // $15/month billed annually
    description: 'Designed for active field researchers, backpackers, and dedicated students of lithology.',
    features: [
      'Unlimited access to all 120+ Field Guides',
      'Interactive Stratigraphy Columns (Full)',
      'Offline Vector Maps with GPS sync',
      'High-resolution satellite topography layers',
      'Fossil and mineral identification assistant',
      'Early access to Live virtual expeditions'
    ],
    buttonText: 'Claim Geologist Access',
    isPopular: true,
    accent: 'bg-[#e8702a] hover:bg-[#d2611f] text-white',
    accentHover: 'bg-[#d2611f]',
    shadowColor: 'shadow-[#e8702a]/20'
  },
  {
    name: 'Deep Time Scholar',
    priceMonthly: 49,
    priceYearly: 39,
    description: 'The ultimate subscription for serious researchers, collectors, and geology institutions.',
    features: [
      'All features in Field Geologist tier',
      'Direct consulting text-line with field specialists',
      'Quarterly physical rock core kit deliveries',
      'All Live Tour bookings included (Free)',
      'Professional GIS data exports (.shp, .geojson)',
      'Co-brand guides and custom stratigraphic logs'
    ],
    buttonText: 'Join the Academy',
    isPopular: false,
    accent: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
    accentHover: 'bg-white/20',
    shadowColor: 'shadow-white/5'
  }
];

export const Plans: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-8 md:px-16 flex flex-col items-center">
      {/* Header */}
      <div className="max-w-4xl text-center mb-8 hero-anim hero-fade" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair italic mb-4">
          Plans for Every Explorer
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Upgrade your field kit. Gain access to advanced topographic maps, geological layers, offline GPS navigation, and physical rock samples.
        </p>
      </div>

      {/* Monthly/Yearly Toggle */}
      <div 
        className="flex items-center gap-4 mb-16 hero-anim hero-fade"
        style={{ animationDelay: '0.2s' }}
      >
        <span className={`text-sm ${!isYearly ? 'text-white font-medium' : 'text-white/55'}`}>Monthly</span>
        <button
          onClick={() => setIsYearly(!isYearly)}
          className="w-14 h-8 bg-white/10 rounded-full p-1 transition-colors relative flex items-center focus:outline-none border border-white/10"
          aria-label="Toggle Billing Interval"
        >
          <div
            className={`w-6 h-6 bg-[#e8702a] rounded-full transition-transform transform ${
              isYearly ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${isYearly ? 'text-white font-medium' : 'text-white/55'}`}>Yearly</span>
          <span className="bg-[#e8702a]/15 text-[#e8702a] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-[#e8702a]/30">
            Save 20%
          </span>
        </div>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl items-stretch">
        {plansData.map((plan, idx) => {
          const price = isYearly ? plan.priceYearly : plan.priceMonthly;
          const displayPrice = price === 0 ? 'Free' : `$${price}`;
          const periodText = price === 0 ? '' : isYearly ? '/ month, billed annually' : '/ month';

          return (
            <div
              key={plan.name}
              className={`relative bg-[#0d0d0d] border rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:border-white/25 ${
                plan.isPopular 
                  ? 'border-[#e8702a] ring-1 ring-[#e8702a]/55 shadow-2xl shadow-[#e8702a]/10' 
                  : 'border-white/10 shadow-xl'
              }`}
              style={{
                animation: 'heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: `${0.35 + idx * 0.08}s`,
                opacity: 0,
              }}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#e8702a] text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full flex items-center gap-1 shadow-md shadow-[#e8702a]/20">
                  <Flame size={12} />
                  Most Popular
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-xs text-white/50 min-h-[40px] leading-relaxed">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mb-8 border-b border-white/5 pb-6">
                  <span className="text-4xl sm:text-5xl font-playfair italic font-bold tracking-tight text-white">
                    {displayPrice}
                  </span>
                  <span className="text-xs text-white/40 font-medium">
                    {periodText}
                  </span>
                </div>

                {/* Features List */}
                <div className="space-y-4 mb-8">
                  <span className="text-[11px] font-mono uppercase text-white/45 tracking-widest block">
                    What's Included:
                  </span>
                  <ul className="space-y-3.5">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-xs text-white/80 leading-relaxed">
                        <Check size={14} className="text-[#e8702a] mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  className={`w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all active:scale-95 duration-200 shadow-md ${plan.accent}`}
                >
                  {plan.buttonText}
                </button>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-white/30">
                  <ShieldCheck size={12} />
                  Secure checkout, cancel anytime
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
