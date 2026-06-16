import React, { useState } from 'react';
import { Compass, BookOpen, Star, ArrowRight } from 'lucide-react';

interface Guide {
  id: string;
  title: string;
  category: 'Igneous' | 'Sedimentary' | 'Metamorphic';
  difficulty: 'Easy' | 'Moderate' | 'Expert';
  location: string;
  age: string;
  description: string;
  image: string;
  rating: number;
}

const guidesData: Guide[] = [
  {
    id: '1',
    title: "Iceland's Volcanic Fissures",
    category: 'Igneous',
    difficulty: 'Moderate',
    location: 'Reykjanes Peninsula, Iceland',
    age: 'Active (Holocene)',
    description: 'Walk along the active Mid-Atlantic Ridge where tectonic plates tear apart, exposing fresh basaltic lava flows and steam vents.',
    image: 'https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
  },
  {
    id: '2',
    title: 'Grand Canyon Stratigraphy',
    category: 'Sedimentary',
    difficulty: 'Easy',
    location: 'Arizona, USA',
    age: '2 Billion Years of History',
    description: "Deconstruct the visual timelines of our planet. Read the stacked strata from the Vishnu Basement Rocks to the Kaibab Limestone.",
    image: 'https://images.unsplash.com/photo-1615551043360-33de8b5f410c?auto=format&fit=crop&w=600&q=80',
    rating: 4.8,
  },
  {
    id: '3',
    title: 'The Alps Fold Nappes',
    category: 'Metamorphic',
    difficulty: 'Expert',
    location: 'Zermatt, Switzerland',
    age: '30–40 Million Years Ago',
    description: 'Explore the high-altitude folds where parts of Africa overrode Europe, metamorphic greenstone and blueschist under intense pressure.',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    rating: 5.0,
  },
  {
    id: '4',
    title: "Giant's Causeway Basalt Columns",
    category: 'Igneous',
    difficulty: 'Easy',
    location: 'County Antrim, Northern Ireland',
    age: '50–60 Million Years Ago',
    description: 'Investigate the physics behind 40,000 interlocking, hexagonal basalt columns formed by the rapid cooling of an ancient lava plateau.',
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80',
    rating: 4.7,
  },
  {
    id: '5',
    title: 'Burgess Shale Paleo-reef',
    category: 'Sedimentary',
    difficulty: 'Expert',
    location: 'Yoho National Park, Canada',
    age: '508 Million Years Ago (Cambrian)',
    description: 'Hike to the legendary fossil beds capturing the Cambrian Explosion, preserving delicate soft tissues of bizarre early marine life.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80',
    rating: 4.9,
  },
  {
    id: '6',
    title: 'Carrara Marble Quarries',
    category: 'Metamorphic',
    difficulty: 'Moderate',
    location: 'Apuan Alps, Italy',
    age: '190 Million Years Ago (Jurassic)',
    description: 'Witness the scale of pure white marble formation, where ancient marine limestone was subjected to extreme crustal heating and folding.',
    image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?auto=format&fit=crop&w=600&q=80',
    rating: 4.6,
  },
];

export const FieldGuides: React.FC = () => {
  const [filter, setFilter] = useState<'All' | 'Igneous' | 'Sedimentary' | 'Metamorphic'>('All');

  const filteredGuides = filter === 'All' 
    ? guidesData 
    : guidesData.filter(g => g.category === filter);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-8 md:px-16 flex flex-col items-center">
      {/* Title block */}
      <div className="max-w-4xl text-center mb-12 hero-anim hero-fade" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair italic mb-4">
          Field Guides to Deep Time
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Embark on self-guided excursions through tectonic fractures, ancient sea beds, and metamorphosed mountain roots. Download interactive offline maps for your next expedition.
        </p>
      </div>

      {/* Filter Tabs */}
      <div 
        className="flex flex-wrap justify-center gap-2 mb-12 bg-white/5 border border-white/10 p-1.5 rounded-full hero-anim hero-fade"
        style={{ animationDelay: '0.2s' }}
      >
        {(['All', 'Igneous', 'Sedimentary', 'Metamorphic'] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              filter === cat
                ? 'bg-[#e8702a] text-white shadow-lg shadow-[#e8702a]/20'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
        {filteredGuides.map((guide, index) => (
          <div
            key={guide.id}
            className="group relative bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
            style={{
              animation: 'heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              animationDelay: `${0.3 + index * 0.08}s`,
              opacity: 0,
            }}
          >
            {/* Image section */}
            <div className="h-56 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url(${guide.image})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              {/* Tags overlay */}
              <div className="absolute top-4 left-4 flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider ${
                  guide.category === 'Igneous' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                  guide.category === 'Sedimentary' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                  'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                }`}>
                  {guide.category}
                </span>
                <span className="bg-black/55 backdrop-blur-md text-white/95 px-3 py-1 rounded-full text-[10px] font-medium border border-white/10">
                  {guide.difficulty}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="text-[11px] text-white/60 font-mono flex items-center gap-1">
                  <Compass size={12} className="text-[#e8702a]" />
                  {guide.location}
                </div>
              </div>
            </div>

            {/* Description section */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-[#e8702a] transition-colors line-clamp-1">
                    {guide.title}
                  </h3>
                  <div className="flex items-center gap-1 text-[#e8702a] text-xs font-semibold bg-[#e8702a]/10 px-2 py-0.5 rounded">
                    <Star size={12} fill="currentColor" />
                    {guide.rating}
                  </div>
                </div>

                <p className="text-xs text-white/40 font-mono mb-3 uppercase tracking-wider">{guide.age}</p>
                
                <p className="text-sm text-white/70 leading-relaxed mb-6 line-clamp-3">
                  {guide.description}
                </p>
              </div>

              {/* Action */}
              <button className="flex items-center justify-between w-full pt-4 border-t border-white/5 text-sm text-white/60 group-hover:text-white transition-colors">
                <span className="flex items-center gap-2">
                  <BookOpen size={16} className="text-[#e8702a]" />
                  View Field Details
                </span>
                <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform text-[#e8702a]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
