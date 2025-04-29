'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface TeamMember {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  yearOfStudy: 'L1' | 'L2' | 'L3' | 'M1' | 'M2';
  college: string;
}

interface FormData {
  teamName: string;
  members: TeamMember[];
}

export default function FormPage() {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    members: [{
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      yearOfStudy: 'L1',
      college: ''
    }]
  });

  // Navbar state and handlers
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
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
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    handleSmoothScroll(e);
    setIsMobileMenuOpen(false);
  };

  const handleChange = (memberIndex: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...formData.members];
    updatedMembers[memberIndex] = {
      ...updatedMembers[memberIndex],
      [field]: value
    };
    setFormData({ ...formData, members: updatedMembers });
  };

  const addTeamMember = () => {
    setFormData({
      ...formData,
      members: [...formData.members, {
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        yearOfStudy: 'L1',
        college: ''
      }]
    });
  };

  const deleteTeamMember = (index: number) => {
    if (formData.members.length === 1) return; // Prevent deleting the last member
    const updatedMembers = formData.members.filter((_, i) => i !== index);
    setFormData({ ...formData, members: updatedMembers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
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
                <a href="/#home" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>Home</a>
                <a href="/#sponsors-section" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>Sponsors</a>
                <a href="/#about-section" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>About us</a>
                <a href="/#events-section" className="hover:text-[yellow] transition-colors whitespace-nowrap" onClick={handleSmoothScroll}>Events</a>
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
                <a href="/#home" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>Home</a>
                <a href="/#sponsors-section" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>Sponsors</a>
                <a href="/#about-section" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>About us</a>
                <a href="/#events-section" className="block py-2 text-white/70 hover:text-[yellow] transition-colors font-poppins text-sm" onClick={handleMobileNavClick}>Events</a>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Background Image with Blur */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/image.png"
          alt="Background"
          fill
          className="object-cover"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-[#050B16]/70 backdrop-blur-[8px]" />
      </div>

      {/* Animated Gradient Overlay */}
      <motion.div
        className="fixed inset-0 z-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, #2D5BA0 0%, transparent 50%)',
            'radial-gradient(circle at 60% 40%, #2D5BA0 0%, transparent 50%)',
            'radial-gradient(circle at 40% 60%, #2D5BA0 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, #2D5BA0 0%, transparent 50%)',
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      <div className="relative z-10 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Centered Badge and Animated Title */}
          <div className="flex flex-col items-center justify-center mb-10 mt-8">
            <div className="relative w-[160px] h-[160px] mb-6">
              <Image
                src="/carrace.png"
                alt="Car Race Badge"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            {/* Lyrics-style animated title */}
            <div className="relative h-[100px] flex items-center justify-center w-full mb-2">
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
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white font-poppins text-center uppercase tracking-wider">
                  CAR RACE
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
                <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#FFD700] font-poppins text-center uppercase tracking-wider">
                  COMPETITION
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
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-poppins text-center uppercase tracking-wider">
                  REGISTRATION
                </h2>
              </motion.div>
            </div>
          </div>

          {/* Rules and Description Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-12"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(45,91,160,0.15)]">
              <div className="absolute inset-0 bg-gradient-to-br from-[#02576b40] to-[#02576b20] backdrop-blur-xl" />
              <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
              
              <div className="relative p-8 sm:p-10">
                {/* Description */}
                <div className="mb-10">
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-4 font-poppins flex items-center gap-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <span className="text-[#FFD700] text-3xl">⚡</span> About the Competition
                  </motion.h3>
                  <motion.p 
                    className="text-white/80 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    Build and race your own Arduino-powered car in this exciting competition! Learn the basics of electronics, 
                    coding, and sensor control in a fun, hands-on session designed for electrical engineering enthusiasts.
                  </motion.p>
                </div>

                {/* Rules Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins flex items-center gap-2">
                    <span className="text-[#FFD700] text-3xl">📋</span> Competition Rules
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Rules Cards */}
                    <motion.div 
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FFD700]/30 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[#FFD700] font-semibold mb-3">Team Requirements</h4>
                      <ul className="text-white/70 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          2-4 members per team
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          All team members must be currently enrolled students
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Mixed teams from different colleges are allowed
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FFD700]/30 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[#FFD700] font-semibold mb-3">Technical Guidelines</h4>
                      <ul className="text-white/70 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Arduino-based car design required
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Maximum car dimensions: 30x20x20 cm
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Battery-powered operations only
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FFD700]/30 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[#FFD700] font-semibold mb-3">Competition Format</h4>
                      <ul className="text-white/70 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Multiple rounds of racing challenges
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Time-based scoring system
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Bonus points for innovative features
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div 
                      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-[#FFD700]/30 transition-colors duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-[#FFD700] font-semibold mb-3">Judging Criteria</h4>
                      <ul className="text-white/70 space-y-2">
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Speed and maneuverability
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Design innovation and creativity
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#FFD700] mt-1">•</span>
                          Code efficiency and documentation
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-2xl shadow-[0_0_50px_rgba(45,91,160,0.15)]"
          >
            {/* Glassmorphism Card */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl shadow-[inset_0_2px_15px_rgba(255,255,255,0.1)]" />
            <div className="absolute inset-[1px] rounded-2xl bg-gradient-to-br from-white/10 via-white/5 to-transparent" />
            
            {/* Content Container */}
            <div className="relative p-8 sm:p-10">
              <motion.h2 
                className="text-4xl font-bold text-white mb-8 text-center font-poppins"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Team Registration
              </motion.h2>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Team Name */}
                <div>
                  <label htmlFor="teamName" className="block text-lg font-medium text-white mb-2">
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border-none text-white placeholder-white/50
                             focus:outline-none focus:bg-white/10 transition-all duration-300
                             backdrop-blur-md hover:bg-white/8 shadow-[0_2px_10px_rgba(0,0,0,0.1)]
                             focus:shadow-[0_4px_20px_rgba(45,91,160,0.25)]"
                    placeholder="Enter your team name"
                    required
                  />
                </div>

                {/* Team Members */}
                {formData.members.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 bg-[#ffffff05] backdrop-blur-lg rounded-xl space-y-4
                             hover:bg-[#ffffff08] transition-all duration-300
                             shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(45,91,160,0.15)]"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-white">
                        Team Member {index + 1}
                      </h3>
                      {formData.members.length > 1 && index > 0 && (
                        <button
                          type="button"
                          onClick={() => deleteTeamMember(index)}
                          className="ml-4 px-3 py-1 rounded-md bg-red-500/80 text-white text-sm font-medium shadow-[0_2px_8px_rgba(255,0,0,0.12)] hover:bg-red-600/90 hover:shadow-[0_4px_16px_rgba(255,0,0,0.18)] transition-all duration-200"
                          title="Remove this team member"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">First Name</label>
                        <input
                          type="text"
                          value={member.firstName}
                          onChange={(e) => handleChange(index, 'firstName', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border-none text-white
                                   outline-none transition-all duration-300 backdrop-blur-md
                                   hover:bg-white/8 focus:bg-white/10
                                   shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(45,91,160,0.15)]
                                   focus:shadow-[0_4px_20px_rgba(45,91,160,0.25)]"
                          required
                        />
                      </div>

                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Last Name</label>
                        <input
                          type="text"
                          value={member.lastName}
                          onChange={(e) => handleChange(index, 'lastName', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border-none text-white
                                   outline-none transition-all duration-300 backdrop-blur-md
                                   hover:bg-white/8 focus:bg-white/10
                                   shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(45,91,160,0.15)]
                                   focus:shadow-[0_4px_20px_rgba(45,91,160,0.25)]"
                          required
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Phone</label>
                        <input
                          type="tel"
                          value={member.phone}
                          onChange={(e) => handleChange(index, 'phone', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border-none text-white
                                   outline-none transition-all duration-300 backdrop-blur-md
                                   hover:bg-white/8 focus:bg-white/10
                                   shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(45,91,160,0.15)]
                                   focus:shadow-[0_4px_20px_rgba(45,91,160,0.25)]"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Email</label>
                        <input
                          type="email"
                          value={member.email}
                          onChange={(e) => handleChange(index, 'email', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border-none text-white
                                   outline-none transition-all duration-300 backdrop-blur-md
                                   hover:bg-white/8 focus:bg-white/10
                                   shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(45,91,160,0.15)]
                                   focus:shadow-[0_4px_20px_rgba(45,91,160,0.25)]"
                          required
                        />
                      </div>

                      {/* Year of Study */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">Year of Study</label>
                        <select
                          value={member.yearOfStudy}
                          onChange={(e) => handleChange(index, 'yearOfStudy', e.target.value as any)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border-none text-white
                                   outline-none transition-all duration-300 backdrop-blur-md
                                   hover:bg-white/8 focus:bg-white/10
                                   shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(45,91,160,0.15)]
                                   focus:shadow-[0_4px_20px_rgba(45,91,160,0.25)]"
                          required
                        >
                          {['L1', 'L2', 'L3', 'M1', 'M2'].map((year) => (
                            <option key={year} value={year} className="bg-[#0B1E38]">{year}</option>
                          ))}
                        </select>
                      </div>

                      {/* College */}
                      <div>
                        <label className="block text-sm font-medium text-white mb-1">College</label>
                        <input
                          type="text"
                          value={member.college}
                          onChange={(e) => handleChange(index, 'college', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-white/5 border-none text-white
                                   outline-none transition-all duration-300 backdrop-blur-md
                                   hover:bg-white/8 focus:bg-white/10
                                   shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_15px_rgba(45,91,160,0.15)]
                                   focus:shadow-[0_4px_20px_rgba(45,91,160,0.25)]"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add Team Member Button */}
                <motion.button
                  type="button"
                  onClick={addTeamMember}
                  className="w-full py-3 px-4 rounded-lg bg-white/5 border-none text-white
                           hover:bg-white/10 active:bg-white/15
                           transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md
                           shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_30px_rgba(45,91,160,0.25)]
                           hover:-translate-y-0.5 active:translate-y-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Team Member
                </motion.button>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-4 px-6 rounded-lg bg-[#02576bcc] text-white font-semibold
                           hover:bg-[#02576b] active:bg-[#024459] transition-all duration-300
                           border border-[#2D5BA0]/10 backdrop-blur-md
                           shadow-[0_4px_25px_rgba(2,87,107,0.3)] hover:shadow-[0_8px_40px_rgba(2,87,107,0.4)]
                           hover:-translate-y-1 active:translate-y-0"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Submit Registration
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 