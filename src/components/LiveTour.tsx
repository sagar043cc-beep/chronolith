import React, { useState } from 'react';
import { Calendar, User, Compass, AlertCircle, CheckCircle, Clock, X } from 'lucide-react';

interface Tour {
  id: string;
  title: string;
  location: string;
  guideName: string;
  guideTitle: string;
  date: string;
  time: string;
  price: number;
  description: string;
  image: string;
  totalSeats: number;
  bookedSeats: number;
}

const toursData: Tour[] = [
  {
    id: 'lava-tube',
    title: 'Kilauea Lava Tube Exploration',
    location: 'Hawaii Volcanoes National Park, USA',
    guideName: 'Dr. Marcus Vance',
    guideTitle: 'Field Volcanologist',
    date: 'June 28, 2026',
    time: '09:00 AM HST (UTC-10)',
    price: 79,
    description: 'Venture inside active heat-venting basalt structures. Examine glassy obsidian crusts and sulfuric crystallization under expert volcanic guidance.',
    image: 'https://images.unsplash.com/photo-1541356625066-5779a0551410?auto=format&fit=crop&w=600&q=80',
    totalSeats: 12,
    bookedSeats: 8,
  },
  {
    id: 'burgess-fossil',
    title: 'Burgess Shale Paleo Fossil Hunt',
    location: 'Yoho National Park, Canada',
    guideName: 'Prof. Clara Mendez',
    guideTitle: 'Paleontologist',
    date: 'July 15, 2026',
    time: '08:30 AM MDT (UTC-6)',
    price: 120,
    description: 'Hike the restricted mountain trails to uncover 508-million-year-old siltstone beds preserving bizarre Cambrian marine creatures.',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&w=600&q=80',
    totalSeats: 15,
    bookedSeats: 13,
  },
  {
    id: 'norway-fjord',
    title: 'Norway Fjord & Glacial Tectonics',
    location: 'Sognefjord, Norway',
    guideName: 'Dr. Eoin O\'Connor',
    guideTitle: 'Structural Geologist',
    date: 'August 02, 2026',
    time: '10:00 AM CEST (UTC+2)',
    price: 95,
    description: 'Trace the massive shear folds and glacial scars carved into Precambrian basement rock. Discover how tectonic thrusts shaped fjords.',
    image: 'https://images.unsplash.com/photo-1498855926480-d98e83099315?auto=format&fit=crop&w=600&q=80',
    totalSeats: 20,
    bookedSeats: 12,
  }
];

export const LiveTour: React.FC = () => {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', count: '1' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const handleBook = (tour: Tour) => {
    setSelectedTour(tour);
    setBookingSuccess(false);
    setFormData({ name: '', email: '', count: '1' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-16 px-4 sm:px-8 md:px-16 flex flex-col items-center">
      {/* Title block */}
      <div className="max-w-4xl text-center mb-12 hero-anim hero-fade" style={{ animationDelay: '0.1s' }}>
        <span className="text-[#e8702a] text-xs uppercase font-mono tracking-widest font-semibold bg-[#e8702a]/10 px-3 py-1 rounded-full border border-[#e8702a]/20">
          Live From The Field
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-playfair italic mt-4 mb-4">
          Guided Virtual Expeditions
        </h2>
        <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Connect in real-time with field researchers broadcasting live from remote global geological hotspots. Ask questions, analyze formations, and study samples.
        </p>
      </div>

      {/* Grid of Tours */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl items-stretch">
        {toursData.map((tour, index) => {
          const seatsLeft = tour.totalSeats - tour.bookedSeats;
          const percentageFilled = (tour.bookedSeats / tour.totalSeats) * 100;

          return (
            <div
              key={tour.id}
              className="bg-[#0d0d0d] border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
              style={{
                animation: 'heroFadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                animationDelay: `${0.25 + index * 0.08}s`,
                opacity: 0,
              }}
            >
              {/* Header Image */}
              <div className="h-48 relative overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${tour.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/15">
                  ${tour.price} USD
                </div>
              </div>

              {/* Body Content */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">{tour.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-white/50 mb-4 font-mono">
                    <Compass size={12} className="text-[#e8702a]" />
                    {tour.location}
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed mb-6">{tour.description}</p>
                </div>

                <div>
                  {/* Guide info */}
                  <div className="flex items-center gap-3 border-t border-b border-white/5 py-3 mb-4">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold uppercase tracking-wider text-[#e8702a] border border-white/10">
                      {tour.guideName.split(' ').slice(1).join('')[0] || 'G'}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1">
                        <User size={10} className="text-white/40" />
                        {tour.guideName}
                      </div>
                      <div className="text-[10px] text-white/40">{tour.guideTitle}</div>
                    </div>
                  </div>

                  {/* Schedule details */}
                  <div className="flex justify-between items-center text-[11px] text-white/60 mb-5 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} className="text-[#e8702a]" />
                      {tour.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} className="text-[#e8702a]" />
                      {tour.time.split(' ')[0]} {tour.time.split(' ')[1]}
                    </div>
                  </div>

                  {/* Progress seats bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center text-[10px] uppercase font-mono text-white/50 mb-1.5">
                      <span>Occupancy</span>
                      <span className={seatsLeft <= 3 ? 'text-red-400 font-bold' : 'text-[#e8702a]'}>
                        {seatsLeft} Seats Left
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          seatsLeft <= 3 ? 'bg-red-500' : 'bg-[#e8702a]'
                        }`}
                        style={{ width: `${percentageFilled}%` }}
                      />
                    </div>
                  </div>

                  {/* Book Button */}
                  <button
                    onClick={() => handleBook(tour)}
                    className="w-full bg-white/5 hover:bg-white/15 border border-white/15 text-white py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:scale-[1.02] active:scale-95"
                  >
                    Reserve Tour Seat
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking Modal */}
      {selectedTour && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-[200] flex items-center justify-center p-4">
          <div 
            className="bg-[#0c0c0c] border border-white/15 w-full max-w-md rounded-2xl p-6 relative shadow-2xl overflow-hidden"
            style={{
              animation: 'heroFadeUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute top-4 right-4 p-1 text-white/55 hover:text-white hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={18} />
            </button>

            {!bookingSuccess ? (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold mb-1 text-white">Book Your Expedition</h3>
                <p className="text-xs text-[#e8702a] font-medium font-mono mb-4">{selectedTour.title}</p>
                
                <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3 mb-5 text-xs text-white/70 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-white/40">Date:</span>
                    <span className="font-mono">{selectedTour.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Time:</span>
                    <span className="font-mono">{selectedTour.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/40">Guide:</span>
                    <span className="font-bold">{selectedTour.guideName}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/5 pt-2 mt-1 font-bold text-white">
                    <span>Seat Ticket Price:</span>
                    <span className="text-[#e8702a]">${selectedTour.price} USD</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/50 font-mono mb-1.5">
                      Explorer Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jean-Yves Cousteau"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/50 font-mono mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="explorer@deep-time.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-white/50 font-mono mb-1.5">
                      Number of Tickets
                    </label>
                    <select
                      value={formData.count}
                      onChange={(e) => setFormData({ ...formData, count: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#e8702a] transition-colors"
                    >
                      <option value="1">1 Ticket</option>
                      <option value="2">2 Tickets</option>
                      <option value="3">3 Tickets (Max)</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[10px] text-white/50 bg-white/5 p-2.5 rounded-lg border border-white/5 mb-5">
                  <AlertCircle size={14} className="text-[#e8702a] flex-shrink-0" />
                  <span>Your live feed access link will be emailed 15 minutes before the start time.</span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 shadow-md shadow-[#e8702a]/20"
                >
                  Confirm Reservation (${selectedTour.price * parseInt(formData.count)} USD)
                </button>
              </form>
            ) : (
              <div className="text-center py-6 flex flex-col items-center">
                <CheckCircle size={56} className="text-emerald-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Booking Confirmed!</h3>
                <p className="text-xs text-white/60 max-w-xs leading-relaxed mb-6">
                  Thank you, <strong className="text-white">{formData.name}</strong>. We've sent a booking confirmation and schedule invite to <strong className="text-white">{formData.email}</strong> for {formData.count} ticket(s) to the <strong className="text-[#e8702a]">{selectedTour.title}</strong> expedition.
                </p>
                <button
                  onClick={() => setSelectedTour(null)}
                  className="bg-white/10 hover:bg-white/20 border border-white/15 text-white px-8 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
                >
                  Return to Explorer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
