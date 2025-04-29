'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SponsorsCarouselProps {
  sponsors: Array<{
    name: string;
    image?: string;
  }>;
}

const SponsorsCarousel: React.FC<SponsorsCarouselProps> = ({ sponsors }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Calculate relative position for each card
  const getRelativePos = (i: number) => {
    let pos = i - activeIndex;
    // Handle circular carousel
    if (pos > Math.floor(sponsors.length / 2)) pos -= sponsors.length;
    if (pos < -Math.floor(sponsors.length / 2)) pos += sponsors.length;
    return pos;
  };

  // 3D transform for each card based on relative position
  const getTransform = (rel: number) => {
    if (rel === 0) return 'translateX(0px) scale(1.15) rotateY(0deg)';
    if (rel === -1) return `translateX(${isMobile ? '-160px' : '-320px'}) scale(${isMobile ? '0.7' : '0.8'}) rotateY(35deg)`;
    if (rel === 1) return `translateX(${isMobile ? '160px' : '320px'}) scale(${isMobile ? '0.7' : '0.8'}) rotateY(-35deg)`;
    if (rel === -2) return `translateX(${isMobile ? '-280px' : '-600px'}) scale(${isMobile ? '0.5' : '0.6'}) rotateY(50deg)`;
    if (rel === 2) return `translateX(${isMobile ? '280px' : '600px'}) scale(${isMobile ? '0.5' : '0.6'}) rotateY(-50deg)`;
    return 'translateX(0px) scale(0.5) rotateY(0deg)';
  };

  const getZIndex = (rel: number) => {
    if (rel === 0) return 30;
    if (Math.abs(rel) === 1) return 20;
    if (Math.abs(rel) === 2) return 10;
    return 0;
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + sponsors.length) % sponsors.length);
  };
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % sponsors.length);
  };

  return (
    <section className="py-16 overflow-hidden relative flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-8 text-center font-poppins italic">Our Sponsors</h2>
      <div className="relative flex items-center justify-center gap-2 md:gap-6" style={{ perspective: 1200, minHeight: 420 }}>
        {/* Irregular blurred glow below the slides */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
          <svg width="100%" height="340" viewBox="0 0 700 340" fill="none" xmlns="http://www.w3.org/2000/svg" className="blur-3xl opacity-30">
            <path d="M40 120 Q80 40 180 80 Q350 10 580 100 Q700 180 580 280 Q350 340 120 280 Q60 250 40 200 Q20 160 40 120Z" fill="#0031d1f7" />
            </svg>
        </div>

        {/* Main carousel container */}
        <div className="relative w-full max-w-[280px] md:max-w-[900px] h-[400px]" style={{ perspective: 1200 }}>
          {/* Cards */}
          {sponsors.map((sponsor, i) => {
            const rel = getRelativePos(i);
            let visible = Math.abs(rel) <= 2;
            let sizeClass =
              rel === 0
                ? 'w-[180px] md:w-[240px] h-[250px] md:h-[300px] shadow-2xl border-2 border[white]'
                : 'w-[200px] md:w-[260px] h-[240px] md:h-[290px] opacity-70';
            return (
              <motion.div
                key={sponsor.name}
                className={`absolute top-1/2 left-1/2 rounded-2xl bg-gray-200 flex items-center justify-center overflow-hidden transition-all duration-700 ${sizeClass}`}
                animate={{
                  transform: `translate(-50%, -50%) ${getTransform(rel)}`,
                  zIndex: getZIndex(rel),
                  opacity: visible ? 1 : 0,
                  pointerEvents: rel === 0 ? 'auto' : 'none',
                }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                    style={{
                  boxShadow: rel === 0 ? '0 8px 40px 0 #01098f55' : '0 2px 12px 0 #01098f33',
                }}
              >
                {sponsor.image ? (
                  <img src={sponsor.image} alt={sponsor.name} className="object-cover w-full h-full" />
                ) : (
                  <span className="text-white/80 text-2xl font-semibold">{sponsor.name}</span>
                )}
              </motion.div>
            );
          })}
          </div>

        {/* Add outer container for arrows */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute w-full top-1/2 -translate-y-1/2">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              className="absolute left-[calc(50%-30vw)] z-40 w-8 h-8 md:w-10 md:h-10 bg-[#02576bcc]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#2D5BA0] transition-all duration-300 flex items-center justify-center border border-white/10 pointer-events-auto"
              aria-label="Previous sponsor"
            >
              <span className="text-white/90 text-lg md:text-xl flex items-center justify-center">&#8249;</span>
            </button>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              className="absolute right-[calc(50%-30vw)] z-40 w-8 h-8 md:w-10 md:h-10 bg-[#02576bcc]/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[#2D5BA0] transition-all duration-300 flex items-center justify-center border border-white/10 pointer-events-auto"
              aria-label="Next sponsor"
            >
              <span className="text-white/90 text-lg md:text-xl flex items-center justify-center">&#8250;</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorsCarousel; 