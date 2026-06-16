import React, { useState } from 'react';
import { Layers, ChevronRight, HelpCircle, Activity, Award } from 'lucide-react';

interface GeologicEra {
  id: string;
  name: string;
  subtitle: string;
  timeSpan: string;
  colorClass: string;
  patternStyle: React.CSSProperties;
  description: string;
  lithology: string[];
  fossils: string[];
  events: string[];
  rockSample: {
    name: string;
    description: string;
    textureGradient: string;
  };
}

const erasData: GeologicEra[] = [
  {
    id: 'cenozoic',
    name: 'Cenozoic Era',
    subtitle: 'Era of Recent Life',
    timeSpan: '66 Million Years Ago – Present',
    colorClass: 'bg-amber-500/20 border-amber-500/40 text-amber-300',
    patternStyle: {
      backgroundImage: 'radial-gradient(circle, rgba(245,158,11,0.1) 20%, transparent 20%), radial-gradient(circle, rgba(245,158,11,0.1) 20%, transparent 20%)',
      backgroundSize: '10px 10px',
      backgroundPosition: '0 0, 5px 5px'
    },
    description: 'The age of mammals and modern flora. Tectonic movements drove massive continental collisions, uplifting the Himalayas, the Alps, and the Rocky Mountains, shaping modern climate zones.',
    lithology: ['Limestone', 'Sandstone', 'Unconsolidated gravels', 'Glacial till'],
    fossils: ['Mammoths', 'Early hominids', 'Nummulites', 'Deciduous trees'],
    events: [
      'Rapid radiation of mammals and birds.',
      'Uplift of the Himalayas and European Alps.',
      'Pleistocene Ice Ages and glacial carving.'
    ],
    rockSample: {
      name: 'Travertine (Limestone)',
      description: 'A banded sedimentary rock formed by hot mineral springs, full of carbonated pores.',
      textureGradient: 'linear-gradient(135deg, #f5e6d3 0%, #d2b48c 50%, #8b5a2b 100%)'
    }
  },
  {
    id: 'mesozoic',
    name: 'Mesozoic Era',
    subtitle: 'Era of Middle Life',
    timeSpan: '252 – 66 Million Years Ago',
    colorClass: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300',
    patternStyle: {
      backgroundImage: 'repeating-linear-gradient(45deg, rgba(16,185,129,0.05) 0px, rgba(16,185,129,0.05) 2px, transparent 2px, transparent 10px)',
    },
    description: 'Renowned as the Age of Reptiles. Pangea gradually split into separate landmasses, triggering global volcanic outbursts and massive basaltic eruptions, culminating in the opening of the Atlantic Ocean.',
    lithology: ['Chalk', 'Black shale', 'Flood basalt', 'Mudstone'],
    fossils: ['Tyrannosaurus rex', 'Ammonites', 'Archaeopteryx', 'Cycads'],
    events: [
      'Breakup of the supercontinent Pangea.',
      'Dominance and mass extinction of non-avian dinosaurs.',
      'Opening of the Atlantic Ocean via active rifting.'
    ],
    rockSample: {
      name: 'Deccan Basalt',
      description: 'A dense igneous volcanic rock produced by massive fissure eruptions during the late Cretaceous.',
      textureGradient: 'linear-gradient(135deg, #1a1a1a 0%, #333333 60%, #4f4f4f 100%)'
    }
  },
  {
    id: 'paleozoic',
    name: 'Paleozoic Era',
    subtitle: 'Era of Ancient Life',
    timeSpan: '541 – 252 Million Years Ago',
    colorClass: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300',
    patternStyle: {
      backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(6,182,212,0.1) 25%, rgba(6,182,212,0.1) 26%, transparent 27%, transparent 74%, rgba(6,182,212,0.1) 75%, rgba(6,182,212,0.1) 76%, transparent 77%)',
      backgroundSize: '15px 15px'
    },
    description: 'Began with the Cambrian explosion of marine life and ended with the largest mass extinction in history. Tectonic plates joined to form Pangea, creating massive folded mountain chains across continents.',
    lithology: ['Coal layers', 'Reef limestone', 'Quartzite', 'Gypsum'],
    fossils: ['Trilobites', 'Giant lycopod trees', 'Eurypterids', 'Early amphibians'],
    events: [
      'Cambrian explosion of marine skeletal animals.',
      'Colonization of land by plants and arthropods.',
      'Permian-Triassic extinction event clearing 95% of ocean species.'
    ],
    rockSample: {
      name: 'Bituminous Coal',
      description: 'An organic sedimentary rock formed from highly compacted plant debris in ancient swamp forests.',
      textureGradient: 'linear-gradient(135deg, #09090b 0%, #1c1917 50%, #2e2a24 100%)'
    }
  },
  {
    id: 'proterozoic',
    name: 'Proterozoic Eon',
    subtitle: 'Eon of Early Complex Life',
    timeSpan: '2.5 Billion – 541 Million Years Ago',
    colorClass: 'bg-purple-500/20 border-purple-500/40 text-purple-300',
    patternStyle: {
      backgroundImage: 'radial-gradient(rgba(168,85,247,0.1) 15%, transparent 16%)',
      backgroundSize: '8px 8px'
    },
    description: 'The era of massive atmospheric oxygenation and tectonic cycle stabilization. Cyanobacteria precipitated vast iron deposits, and the earth experienced global glaciations (Snowball Earth).',
    lithology: ['Banded Iron Formations (BIF)', 'Stromatolitic dolomite', 'Tillite'],
    fossils: ['Stromatolites', 'Dickinsonia (Ediacaran biota)', 'Acritarchs'],
    events: [
      'Great Oxidation Event, transforming Earth’s atmosphere.',
      'Huronian and Cryogenian global glaciations (Snowball Earth).',
      'Assembly and rifting of the Rodinia supercontinent.'
    ],
    rockSample: {
      name: 'Banded Iron Formation',
      description: 'Alternating layers of silver-gray hematite/magnetite and red jasper, representing ancient oceanic oxygen releases.',
      textureGradient: 'linear-gradient(135deg, #7f1d1d 0%, #450a0a 40%, #1e293b 80%, #0f172a 100%)'
    }
  },
  {
    id: 'archean',
    name: 'Archean Eon',
    subtitle: 'The Ancient Dawn',
    timeSpan: '4.0 – 2.5 Billion Years Ago',
    colorClass: 'bg-rose-500/20 border-rose-500/40 text-rose-300',
    patternStyle: {
      backgroundImage: 'repeating-linear-gradient(-45deg, rgba(244,63,94,0.04) 0px, rgba(244,63,94,0.04) 1px, transparent 1px, transparent 8px)',
    },
    description: 'Earth was covered in acidic oceans under a carbon dioxide rich atmosphere. Crustal heat was extremely high, producing unique volcanic rocks and organizing the first micro-continents (cratons).',
    lithology: ['Greenstone', 'Granite-Gneiss complex', 'Komatiite (ultra-mafic lava)'],
    fossils: ['Anaerobic micro-fossils', 'Carbon-12 biochemical signatures'],
    events: [
      'Solidification of the first continental cratons.',
      'Origin of first unicellular, anaerobic life.',
      'Formation of the first liquid water oceans.'
    ],
    rockSample: {
      name: 'Granite Gneiss',
      description: 'High-grade metamorphic rock formed by severe shearing and heating of early continental granites.',
      textureGradient: 'linear-gradient(135deg, #374151 0%, #6b7280 40%, #d1d5db 80%, #9ca3af 100%)'
    }
  }
];

export const GeologyExplorer: React.FC = () => {
  const [selectedEra, setSelectedEra] = useState<GeologicEra>(erasData[0]);

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-8 md:px-16 flex flex-col items-center">
      {/* Title Block */}
      <div className="max-w-4xl text-center mb-12 hero-anim hero-fade" style={{ animationDelay: '0.1s' }}>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair italic mb-4">
          The Stratigraphic Columns
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Earth’s history is written in vertical stacks. Tap the crust layers below to peel back the sediment and travel billions of years back in deep time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-6xl items-stretch">
        
        {/* Stratigraphic Column Selector (Left) */}
        <div 
          className="lg:col-span-5 flex flex-col gap-3 justify-center hero-anim hero-fade" 
          style={{ animationDelay: '0.25s' }}
        >
          <div className="text-xs uppercase font-mono tracking-widest text-[#e8702a] mb-2 flex items-center gap-2">
            <Layers size={14} />
            Interactive Strata (Top = Youngest)
          </div>

          <div className="border border-white/10 rounded-2xl p-4 bg-[#0d0d0d] flex flex-col gap-2">
            {erasData.map((era) => {
              const isSelected = selectedEra.id === era.id;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEra(era)}
                  className={`group relative w-full text-left py-6 px-6 rounded-xl transition-all duration-300 border flex flex-col justify-center overflow-hidden hover:-translate-y-0.5 ${
                    isSelected 
                      ? 'border-[#e8702a] ring-1 ring-[#e8702a] shadow-lg shadow-[#e8702a]/10 bg-[#141414]'
                      : 'border-white/10 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/20'
                  }`}
                  style={era.patternStyle}
                >
                  <div className="relative z-10 flex justify-between items-center w-full">
                    <div>
                      <h4 className="font-bold text-lg leading-tight group-hover:text-[#e8702a] transition-colors">
                        {era.name}
                      </h4>
                      <p className="text-xs text-white/50 mt-1 font-mono">{era.timeSpan}</p>
                    </div>
                    <ChevronRight 
                      className={`transition-all duration-300 ${
                        isSelected 
                          ? 'text-[#e8702a] translate-x-1' 
                          : 'text-white/30 group-hover:text-white/70 group-hover:translate-x-0.5'
                      }`}
                      size={18}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Inspector Card (Right) */}
        <div 
          className="lg:col-span-7 flex flex-col justify-between bg-[#0d0d0d] border border-white/10 rounded-2xl p-6 sm:p-8 hero-anim hero-fade relative overflow-hidden"
          style={{ animationDelay: '0.4s' }}
        >
          {/* Subtle accent background glow matching the era */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient opacity-10 pointer-events-none rounded-full blur-3xl" />

          <div>
            {/* Header */}
            <div className="border-b border-white/5 pb-5 mb-5">
              <span className="text-xs uppercase font-mono tracking-widest text-[#e8702a]">
                {selectedEra.subtitle}
              </span>
              <h3 className="text-3xl font-playfair italic mt-1 text-white">
                {selectedEra.name}
              </h3>
              <p className="text-sm font-mono text-white/50 mt-1">{selectedEra.timeSpan}</p>
            </div>

            {/* Description */}
            <p className="text-white/80 leading-relaxed text-sm mb-6">
              {selectedEra.description}
            </p>

            {/* Specifics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Rock Formations */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <span className="text-[11px] font-mono uppercase text-white/45 tracking-widest flex items-center gap-1.5 mb-2.5">
                  <Activity size={12} className="text-[#e8702a]" />
                  Key Lithology
                </span>
                <ul className="space-y-1">
                  {selectedEra.lithology.map((rock) => (
                    <li key={rock} className="text-xs text-white/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8702a]" />
                      {rock}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fossils */}
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl">
                <span className="text-[11px] font-mono uppercase text-white/45 tracking-widest flex items-center gap-1.5 mb-2.5">
                  <Award size={12} className="text-[#e8702a]" />
                  Biota & Fossils
                </span>
                <ul className="space-y-1">
                  {selectedEra.fossils.map((fossil) => (
                    <li key={fossil} className="text-xs text-white/80 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#e8702a]" />
                      {fossil}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Key Tectonic Events */}
            <div className="mb-6">
              <span className="text-[11px] font-mono uppercase text-white/45 tracking-widest block mb-2.5">
                Key Events
              </span>
              <ul className="space-y-2">
                {selectedEra.events.map((event, idx) => (
                  <li key={idx} className="text-xs text-white/70 flex items-start gap-2">
                    <span className="text-[#e8702a] font-mono">0{idx + 1}.</span>
                    <span className="leading-relaxed">{event}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Simulated Rock Core Sample (Premium Feature) */}
          <div className="border border-white/10 rounded-xl p-4 bg-black/40 flex items-center gap-4">
            {/* Rock Core Visual Orb */}
            <div 
              className="w-16 h-16 rounded-full flex-shrink-0 shadow-inner border border-white/10 relative overflow-hidden"
              style={{ 
                background: selectedEra.rockSample.textureGradient,
                boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6), 0 4px 6px rgba(0,0,0,0.3)' 
              }}
            >
              {/* Core gleam */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none" />
            </div>
            <div>
              <span className="text-[9px] uppercase font-mono tracking-widest text-[#e8702a]">
                Standard Rock Core
              </span>
              <h5 className="text-sm font-bold text-white">{selectedEra.rockSample.name}</h5>
              <p className="text-xs text-white/50 leading-snug mt-0.5">
                {selectedEra.rockSample.description}
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
