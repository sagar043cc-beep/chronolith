import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { FieldGuides } from './components/FieldGuides';
import { GeologyExplorer } from './components/GeologyExplorer';
import { Plans } from './components/Plans';
import { LiveTour } from './components/LiveTour';

const BG_IMAGE_1 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85";
const BG_IMAGE_2 = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85";
const SPOTLIGHT_R = 260;

interface RevealLayerProps {
  image: string;
  cursorX: number;
  cursorY: number;
}

const RevealLayer: React.FC<RevealLayerProps> = ({ image, cursorX, cursorY }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const revealDivRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
    height: typeof window !== 'undefined' ? window.innerHeight : 768,
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update canvas and apply mask on cursor change or dimension change
  useEffect(() => {
    const canvas = canvasRef.current;
    const revealDiv = revealDivRef.current;
    if (!canvas || !revealDiv) return;

    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, dimensions.width, dimensions.height);

    // Only draw if cursor is on screen/valid (not -999)
    if (cursorX !== -999 && cursorY !== -999) {
      // Build radial gradient at (cursorX, cursorY) from radius 0 -> SPOTLIGHT_R
      const grad = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, SPOTLIGHT_R);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.4, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.6, 'rgba(255, 255, 255, 0.75)');
      grad.addColorStop(0.75, 'rgba(255, 255, 255, 0.4)');
      grad.addColorStop(0.88, 'rgba(255, 255, 255, 0.12)');
      grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, 2 * Math.PI);
      ctx.fill();

      try {
        const dataUrl = canvas.toDataURL();
        revealDiv.style.maskImage = `url(${dataUrl})`;
        revealDiv.style.webkitMaskImage = `url(${dataUrl})`;
        revealDiv.style.maskSize = '100% 100%';
        revealDiv.style.webkitMaskSize = '100% 100%';
      } catch (e) {
        console.error('Failed to generate canvas mask url', e);
      }
    } else {
      // If cursor is not active, mask should be completely transparent (hide reveal image)
      revealDiv.style.maskImage = 'none';
      revealDiv.style.webkitMaskImage = 'none';
    }
  }, [cursorX, cursorY, dimensions]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-20"
        style={{ display: 'none' }}
      />
      <div
        ref={revealDivRef}
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none"
        style={{ backgroundImage: `url(${image})` }}
      />
    </>
  );
};

export default function App() {
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Course');

  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef<number | null>(null);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as any });
  }, [activeTab]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      // If first movement, initialize smooth position immediately
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const tick = () => {
      if (smooth.current.x === -999) {
        // Wait for first mouse move
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;

      setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const navItems = ['Course', 'Field Guides', 'Geology', 'Plans', 'Live Tour'];

  return (
    <div className="min-h-screen bg-black tracking-[-0.02em]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 bg-gradient-to-b from-black/85 via-black/40 to-transparent backdrop-blur-[2px]">
        {/* Left: Logo + Wordmark */}
        <div 
          onClick={() => setActiveTab('Course')}
          className="flex items-center gap-2.5 z-[110] cursor-pointer hover:opacity-90 transition-opacity"
        >
          <svg className="w-[26px] h-[26px]" viewBox="0 0 256 256" fill="#ffffff">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-white text-2xl font-playfair italic select-none">Chronolith</span>
        </div>

        {/* Center Pill (Desktop only) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-1.5 py-1.5 items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`px-6 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === item
                  ? 'bg-white text-gray-900 shadow-md font-semibold scale-[1.02]'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item === 'Course' ? 'Home' : item}
            </button>
          ))}
        </div>

        {/* Right (Desktop only) */}
        <div className="hidden md:block">
          <button 
            onClick={() => setActiveTab('Plans')}
            className="bg-white text-gray-900 text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-gray-100 transition-all active:scale-95 shadow-md"
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger (Mobile only) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-[110] p-2 text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
          aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[90] flex flex-col items-center justify-center gap-8 md:hidden">
          <div className="flex flex-col items-center gap-6">
            {navItems.map((item, idx) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setMobileMenuOpen(false);
                }}
                className={`text-2xl font-medium transition-colors ${
                  activeTab === item ? 'text-[#e8702a]' : 'text-white/80 hover:text-white'
                }`}
                style={{
                  animation: `heroFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  animationDelay: `${idx * 0.08}s`,
                  opacity: 0,
                }}
              >
                {item === 'Course' ? 'Home' : item}
              </button>
            ))}
            <button
              onClick={() => {
                setActiveTab('Plans');
                setMobileMenuOpen(false);
              }}
              className="mt-6 bg-[#e8702a] text-white text-base font-semibold px-8 py-3.5 rounded-full hover:bg-[#d2611f] transition-all hover:scale-[1.03] active:scale-95 w-48 shadow-lg shadow-[#e8702a]/30"
              style={{
                animation: `heroFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                animationDelay: `${navItems.length * 0.08}s`,
                opacity: 0,
              }}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Page Routing */}
      {activeTab === 'Course' && (
        <section className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
          {/* Base Image (z-10) */}
          <div
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
            style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
          />

          {/* Reveal Layer (z-30) */}
          <RevealLayer image={BG_IMAGE_2} cursorX={cursorPos.x} cursorY={cursorPos.y} />

          {/* Heading (z-50) */}
          <div className="absolute top-[14%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
            <h1 className="text-white leading-[0.95] flex flex-col items-center">
              <span
                className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
                style={{ letterSpacing: '-0.05em', animationDelay: '0.25s' }}
              >
                Layers hold
              </span>
              <span
                className="block font-normal text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
                style={{ letterSpacing: '-0.08em', animationDelay: '0.42s' }}
              >
                tales of time
              </span>
            </h1>
          </div>

          {/* Bottom-left paragraph (z-50) */}
          <div
            className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[260px] z-50 hero-anim hero-fade"
            style={{ animationDelay: '0.7s' }}
          >
            <p className="text-sm text-white/80 leading-relaxed">
              Every layer of sediment records a chapter of our planet, from ancient seabeds to drifting ash, layered across millions of years beneath us.
            </p>
          </div>

          {/* Bottom-right block (z-50) */}
          <div
            className="absolute bottom-10 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[260px] flex flex-col items-start gap-4 sm:gap-5 z-50 hero-anim hero-fade"
            style={{ animationDelay: '0.85s' }}
          >
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Our interactive maps let you peel back the crust to trace how stones, fossils, and deep time combine to shape the ground beneath your feet.
            </p>
            <button 
              onClick={() => setActiveTab('Geology')}
              className="bg-[#e8702a] hover:bg-[#d2611f] text-white text-sm font-medium px-7 py-3 rounded-full transition-all hover:scale-[1.03] active:scale-95 hover:shadow-lg hover:shadow-[#e8702a]/30"
            >
              Start Digging
            </button>
          </div>
        </section>
      )}

      {activeTab === 'Field Guides' && <FieldGuides />}
      {activeTab === 'Geology' && <GeologyExplorer />}
      {activeTab === 'Plans' && <Plans />}
      {activeTab === 'Live Tour' && <LiveTour />}
    </div>
  );
}
