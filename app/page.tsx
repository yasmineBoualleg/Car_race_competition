'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, cubicBezier } from 'framer-motion';
import Image from 'next/image';
import Card3D from './components/Card3D';
import SponsorsCarousel from './components/SponsorsCarousel';
import Link from 'next/link';
import ieeeAbout from '../public/ieeeabout.png';

interface ParallaxEventsSectionProps {
  eventImages: string[];
}

export default function Home(): React.ReactElement {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [currentDot, setCurrentDot] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sponsorsRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is the md breakpoint in Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Smoother parallax effects with easing
  const easing = cubicBezier(0.4, 0, 0.2, 1);
  
  const headerY = useTransform(
    scrollY,
    [0, 800],
    ['0%', '25%'],
    { ease: easing }
  );
  
  const headerOpacity = useTransform(
    scrollY,
    [0, isMobile ? 600 : 400],
    [1, 0],
    { ease: easing }
  );

  const accentYellow = '#B8860B';
// deadline t3 registration
  const [days, setDays] = useState(9);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const sponsors = [
    { name: 'Sponsor 1', image: 'slide1ex.png' },
    { name: 'Sponsor 2', image: 'sponsor1.png' },
    { name: 'Sponsor 3', image: 'venti.png' },
  ];

  const eventImages = [
    '/events/startup.png',
    '/events/ai.png',
    '/events/bmsnigga.png',
    '/events/astronomy.png',
    '/events/cad.png',
    '/events/commerce.png',
    '/events/greennigga.png',
    '/events/engineer.png',
    '/events/ml.png',
    '/events/web.png',
  ];

  const timerItems = [
    { label: 'days', value: days },
    { label: 'hours', value: hours },
    { label: 'min', value: minutes },
    { label: 'sec', value: seconds }
  ];

  // Countdown timer effect
  useEffect(() => {
    const countdown = () => {
      const endDate = new Date('2025-05-06T23:59:59.999');
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    };

    countdown();
    const timer = setInterval(countdown, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animate carousel dots
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDot((prev) => (prev + 1) % 3);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Handle scroll visibility
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSponsors = () => {
    const sponsorsSection = document.getElementById('sponsors-section');
    if (sponsorsSection) {
      const yOffset = -80; // Account for navbar height
      const y = sponsorsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  // Enable smooth scroll globally
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Smooth scroll handler
  function handleSmoothScroll(e: React.MouseEvent<HTMLAnchorElement>) {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  // Add mobile menu toggle function
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking a link
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleSmoothScroll(e);
    setIsMobileMenuOpen(false);
  };

  // FooterGlass physically nested inside Home
  function FooterGlass() {
    return (
      <footer className="w-full bg-[#009ad15c]/80 backdrop-blur-md border-t border-white/10 py-8 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0">
          {/* Logo and branch */}
          <div className="flex flex-col items-start min-w-[180px] mb-6 md:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <img src="/badge_cropped.png" alt="IEEE Logo" className="w-10 h-10 object-contain" />
              <span className="text-white text-xl font-bold font-poppins">IEEE</span>
            </div>
            <span className="text-white/80 text-sm font-poppins">Student Branch<br/>University of Boumerdes</span>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col min-w-[120px] mb-6 md:mb-0">
            <span className="text-white font-semibold mb-2 font-poppins">Quick Links</span>
            <a href="#home" className="text-white/80 text-sm mb-1 hover:text-white" onClick={handleSmoothScroll}>Home</a>
            <a href="#sponsors-section" className="text-white/80 text-sm mb-1 hover:text-white" onClick={handleSmoothScroll}>Sponsors</a>
            <a href="#about-section" className="text-white/80 text-sm mb-1 hover:text-white" onClick={handleSmoothScroll}>About us</a>
            <a href="#events-section" className="text-white/80 text-sm hover:text-white" onClick={handleSmoothScroll}>Events</a>
          </div>
          {/* Support */}
          <div className="flex flex-col min-w-[120px] mb-6 md:mb-0">
            <span className="text-white font-semibold mb-2 font-poppins">support</span>
            <a href="#" className="text-white/80 text-sm mb-1 hover:text-white">FAQs</a>
            <a href="#" className="text-white/80 text-sm mb-1 hover:text-white">Privacy Policy</a>
            <a href="#" className="text-white/80 text-sm hover:text-white">Terms & conditions</a>
          </div>
          {/* Contact Info */}
          <div className="flex flex-col min-w-[180px]">
            <span className="text-white font-semibold mb-2 font-poppins">Contact Information</span>
            <span className="text-white/80 text-sm mb-1">Email: ieee.sb.algeria@gmail.com</span>
            <span className="text-white/80 text-sm mb-1">Phone:  +213 5456 78905</span>
            <div className="flex gap-3 mt-2">
              <a href="#" className="text-white/80 hover:text-white"><i className="fab fa-instagram" /></a>
              <a href="#" className="text-white/80 hover:text-white"><i className="fab fa-facebook" /></a>
              <a href="#" className="text-white/80 hover:text-white"><i className="fab fa-twitter" /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 my-6" />
        <div className="text-center text-white/60 text-xs font-poppins">© 2025 IEEE| Student Branch University of Boumerdes. All Rights Reserved.</div>
      </footer>
    );
  }

  return (
    <>
    <main id="home" className="min-h-screen bg-[#050B16]">
      {/* Floating Navbar */}
      <motion.header 
        className="fixed w-full z-50 top-4 flex justify-center items-center px-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-6 flex justify-center items-center">
          <div className="relative w-full max-w-[800px]">
            <nav 
              style={{ height: '1.2cm' }} 
              className="relative flex items-center justify-between bg-[#02576bcc] rounded-full px-4 md:px-8 border border-[#2D5BA0]/10"
            >
              <div className="flex items-center gap-2 md:gap-3">
                <Image
                  src="/badge_cropped.png"
                  alt="IEEE Badge"
                  width={32}
                  height={32}
                  className="object-contain"
                  priority
                />
                <span className="text-white font-poppins text-2xl md:text-3xl whitespace-nowrap">
                  IEEE 
                </span>
                <span className="text-white font-poppins text-xs md:text-sm font-semibold whitespace-nowrap hidden sm:inline">
                  |student branch
                </span>
              </div>
              
              {/* Desktop Navigation links */}
              <div className="hidden md:flex space-x-6 text-white/70 font-poppins text-sm">
                <a href="#home" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>Home</a>
                <a href="#sponsors-section" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>Sponsors</a>
                <a href="#about-section" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>About us</a>
                <a href="#events-section" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>Events</a>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white p-2 focus:outline-none"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <div className="w-6 h-4 flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-white transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                  <span className={`w-full h-0.5 bg-white transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`w-full h-0.5 bg-white transform transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                </div>
              </button>
            </nav>

            {/* Mobile Menu Dropdown */}
            <motion.div
              className={`absolute top-full left-0 right-0 mt-2 bg-[#02576bcc] backdrop-blur-sm rounded-xl overflow-hidden md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: isMobileMenuOpen ? 1 : 0, y: isMobileMenuOpen ? 0 : -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="py-2 px-4 space-y-2">
                <a href="#home" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>Home</a>
                <a href="#sponsors-section" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>Sponsors</a>
                <a href="#about-section" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>About us</a>
                <a href="#events-section" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>Events</a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section 
        className="relative min-h-screen pt-24 pb-16 md:pt-0 md:pb-0 flex items-center justify-center overflow-hidden bg-[#050B16]"
        style={{ opacity: isMobile ? 1 : headerOpacity }}
      >
        {/* Background Pattern and Glows */}
        <div className="absolute inset-0 z-0">
          {/* Base pattern */}
            <div className="absolute inset-0 bg-[#01098f] opacity-20" />
          
          {/* Header Gradient Glows */}
          <div className="absolute top-0 left-0 w-full h-[70vh]">
            {/* Blue glow */}
              <div className="absolute top-0 left-[10%] w-[80px] h-[500px]">
                <div className="absolute inset-0 bg-[#01098f] rounded-full blur-[90px] opacity-30" />
            </div>
            

            {/* Animated center glow */}
            <motion.div
              className="absolute top-[30%] left-1/2 transform -translate-x-1/2 w-[600px] h-[300px]"
              animate={{
                opacity: [0.15, 0.25, 0.15],
                  scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#2D5BA0] via-[#4B7BE5] to-[#FFD700] rounded-full blur-[100px]" />
            </motion.div>
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050B16]/50 to-[#050B16]" />
          <div className="absolute inset-0 bg-[#1E3A6E]/10 mix-blend-overlay" />
        </div>

        {/* Main Content */}
        <div className="container relative z-10 h-full flex items-center pb-20 md:pb-0">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-center w-full gap-4 px-4 lg:pl-20">
            {/* Left Content */}
            <motion.div 
              className="lg:w-1/2 flex flex-col items-center lg:items-start w-full mt-8 lg:mt-0"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Text content with lyrics-style animation */}
              <div className="relative h-[250px] flex items-center justify-center w-full">
                <motion.div 
                  className="absolute"
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                    y: [30, 0, 0, -30]
                  }}
                  transition={{
                    times: [0, 0.2, 0.8, 1],
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 7.5,
                    ease: [0.6, 0.01, -0.05, 0.95]
                  }}
                >
                  <h2 className="text-6xl font-bold text-white font-poppins text-center">
                    Welcome
                  </h2>
                </motion.div>

                <motion.div 
                  className="absolute"
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                    y: [30, 0, 0, -30]
                  }}
                  transition={{
                    times: [0, 0.2, 0.8, 1],
                    duration: 2.5,
                    delay: 2.5,
                    repeat: Infinity,
                    repeatDelay: 7.5,
                    ease: [0.6, 0.01, -0.05, 0.95]
                  }}
                >
                  <h2 className="text-7xl font-bold text-[#A3BFFA] font-poppins text-center">
                    IEEE
                  </h2>
                </motion.div>

                <motion.div 
                  className="absolute"
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                    y: [30, 0, 0, -30]
                  }}
                  transition={{
                    times: [0, 0.2, 0.8, 1],
                    duration: 2.5,
                    delay: 5,
                    repeat: Infinity,
                    repeatDelay: 7.5,
                    ease: [0.6, 0.01, -0.05, 0.95]
                  }}
                >
                  <h2 className="text-5xl font-bold text-[#A3BFFA] font-poppins text-center">
                    Presents
                  </h2>
                </motion.div>

                <motion.div 
                  className="absolute"
                  animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.8, 1, 1, 0.8],
                    y: [30, 0, 0, -30]
                  }}
                  transition={{
                    times: [0, 0.2, 0.8, 1],
                    duration: 2.5,
                    delay: 7.5,
                    repeat: Infinity,
                    repeatDelay: 7.5,
                    ease: [0.6, 0.01, -0.05, 0.95]
                  }}
                >
                  <h1 className="text-6xl font-bold font-poppins text-center">
                    <div className="text-white text-5xl md:text-6xl">CAR RACE</div>
                    <div className={`text-[${accentYellow}] text-3xl md:text-6xl`}>COMPETITION</div>
                  </h1>
                </motion.div>

                {/* Background glow effect */}
                <motion.div
                  className="absolute inset-0 bg-[#2D5BA0] opacity-20 blur-2xl rounded-lg"
                  animate={{
                    scale: [0.9, 1, 0.9],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </div>

              <motion.p 
                className="text-lg text-[#A3BFFA]/80 max-w-xl text-center px-4 lg:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                Build and race your own Arduino-powered car! Learn the basics of electronics, coding, and sensor control in
                a fun, hands-on session designed for electrical engineering enthusiasts.
              </motion.p>

              {/* Timer Section */}
                <div className="mt-8 flex flex-col items-center w-full">
                <Link 
                  href="/form" 
                    className="block w-[200px]"
                  prefetch={true}
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = '/form';
                  }}
                >
                  <motion.button
                      className="group relative w-full px-6 py-2 mb-8 overflow-hidden rounded-full 
                                font-poppins text-white text-base font-semibold shadow-lg hover:scale-105 transition-transform
                                border-2 border-[transparent] bg-clip-padding backdrop-blur-sm bg-[#02576bcc]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Gradient overlay for hover effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#02576bcc] via-[#fcff07b8] to-[#02576bcc] opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

                    {/* Dark overlay for dimming */}
                    <div className="absolute inset-0 bg-black/20 rounded-full" />

                    {/* Button content */}
                    <span className="relative z-10">Join Now!</span>
                  </motion.button>
                </Link>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full max-w-[400px] px-4 lg:px-0">
                  {timerItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-[#0B1E38]/60 backdrop-blur-lg rounded-xl p-4 border border-[#2D5BA0]/20
                               hover:border-[#2D5BA0]/40 transition-colors hover:bg-[#0B1E38]/80"
                    >
                      <div className="text-5xl font-bold text-white mb-2 font-poppins">
                        {String(item.value).padStart(2, '0')}
                      </div>
                      <div className="text-[#A3BFFA] text-base uppercase tracking-wider">
                        {item.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Content - Car Race Logo with Glow */}
            <motion.div 
              className="lg:w-1/2 flex justify-center items-center w-full pt-20 pb-4 lg:py-0 md:pt-24"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Car Race Logo Container */}
              <div className="relative w-[280px] h-[280px] lg:w-[350px] lg:h-[350px]">
                {/* Glow Effect Behind Logo */}
                <div className="absolute inset-0 z-0">
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ 
                      opacity: [0.4, 0.7, 0.4],
                      scale: [0.9, 1.1, 0.9],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="absolute inset-0 bg-[#01098f] blur-[60px] lg:blur-[80px] opacity-80" />
                  </motion.div>
                </div>
                
                {/* Car Race Logo */}
                <div className="relative z-10 w-full h-full">
                  <Image
                    src="/carrace.png"
                    alt="Car Race Logo"
                    width={280}
                    height={280}
                    style={{ objectFit: 'contain' }}
                    priority
                    className="lg:scale-125"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>

          {/* Scroll Indicator - Move outside other containers for proper z-indexing */}
        <div className="fixed inset-0 pointer-events-none z-50">
          <motion.button
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 
                       cursor-pointer group hover:scale-110 transition-transform focus:outline-none pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={scrollToSponsors}
            aria-label="Scroll to sponsors section"
          >
            {/* Mouse Button with Dots */}
            <div className="relative">
              <div className="w-6 h-10 border-2 border-[#2D5BA0]/30 rounded-full p-1 group-hover:border-[#2D5BA0]/50 transition-colors">
                <div className="w-1 h-1 bg-[#2D5BA0] rounded-full mx-auto mb-1" />
                <motion.div
                    className={`w-1 h-1 bg-[#01098f] rounded-full mx-auto`}
                  animate={{
                    y: [0, 12, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </div>

            {/* Scroll text */}
              <span className="text-[white]/70 text-sm font-medium group-hover:text-[#A3BFFA] transition-colors">
              Scroll
            </span>
          </motion.button>
        </div>
      </motion.section>

      {/* Content Sections */}
      <div className="bg-[#050B16]">
        {/* Sponsors Section */}
        <section 
          id="sponsors-section"
            className="relative pt-4 scroll-mt-8"
        >
          <motion.div
              initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <SponsorsCarousel sponsors={sponsors} />
          </motion.div>
        </section>

          {/* About IEEE Organizer Club Section */}
          <section id="about-section" className="relative py-24 flex flex-col items-center justify-center bg-gradient-to-b from-[#07112a] via-[#050B16] to-[#07112a] overflow-hidden">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-white mb-4 font-poppins text-center z-10"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              About us
            </motion.h2>
            <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl px-4 z-10">
              {/* Text Content */}
              <motion.div
                className="flex-1 flex flex-col items-start md:items-start"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <h3 className="italic text-2xl md:text-3xl font-semibold text-[#A3BFFA] mb-2 font-poppins">A lifetime of opportunities</h3>
                <p className="text-lg md:text-xl text-white/90 mb-4 font-poppins max-w-xl">
                  Innovating for a Better Tomorrow<br/>
                  IEEE is the world's largest technical professional organization dedicated to advancing technology for the benefit of humanity. Our student branch provides opportunities to learn, connect, and grow through hands-on workshops, competitions, and networking events.
                </p>
              </motion.div>
              {/* About Image */}
              <motion.div
                className="flex-1 flex items-center justify-center relative"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
                viewport={{ once: true }}
              >
                <div className="relative w-[380px] h-[440px] overflow-hidden rounded-2xl border-2 border-[#1A4D9B]">
                  <Image
                    src="/ieeeabout.png"
                    alt="IEEE About"
                    fill
                    className="object-cover"
                    quality={100}
                  />
                  {/* Blue overlay for consistency */}
                  <div className="absolute inset-0 bg-[#0031d1]/20" />
                </div>
              </motion.div>
            </div>
            {/* Soft blue glow behind image */}
            <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-[520px] h-[420px] z-0 pointer-events-none hidden md:block">
              <div className="absolute inset-0 bg-[#0031d1f7] rounded-3xl blur-[90px] opacity-40" />
            </div>
          </section>

        {/* Events Section */}
        <div id="events-section">
          <ParallaxEventsSection eventImages={eventImages} />
        </div>
        </div>
      </main>
      <FooterGlass />
    </>
  );
}

// Parallax Events Section
function ParallaxEventsSection({ eventImages }: ParallaxEventsSectionProps) {
  const ref = React.useRef(null);
  const { scrollY } = useScroll({ target: ref });
  const y = useTransform(scrollY, [0, 400], [0, -80]);
  return (
    <section ref={ref} className="pt-32 pb-16 relative overflow-hidden" style={{ paddingBottom: '30vh' }}>
      <motion.div
        style={{ y }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.h2
          className="text-4xl font-bold text-white text-center mb-16 font-poppins"
        >
          Our Events
        </motion.h2>
        <div className="flex justify-center">
          <Card3D images={eventImages} />
        </div>
      </motion.div>
    </section>
  );
} 