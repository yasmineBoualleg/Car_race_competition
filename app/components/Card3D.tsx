'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface CardProps {
  images: string[];
}

const Card: React.FC<CardProps> = ({ images }) => {
  const [isRotating, setIsRotating] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!isRotating || !isMobile) return;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % images.length);
    }, 2000); // Change step every 2 seconds
    
    return () => clearInterval(interval);
  }, [isRotating, isMobile, images.length]);

  const handleClick = () => {
    if (isMobile) {
      setIsRotating(!isRotating);
    }
  };

  const getStepTransform = (index: number) => {
    if (!isMobile) return '';
    const stepDiff = (index - currentStep + images.length) % images.length;
    const angle = (360 / images.length) * stepDiff;
    return `rotateY(${angle}deg)`;
  };

  return (
    <StyledWrapper style={{ margin: '50px' }}>
      {/* Irregular blurred glow overlay */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
        <svg width="420" height="220" viewBox="0 0 420 220" fill="none" xmlns="http://www.w3.org/2000/svg" className="blur-3xl opacity-70">
          <path d="M60 60 Q210 0 360 60 Q420 110 360 180 Q210 220 60 180 Q0 110 60 60Z" fill="#0031d1f7" />
        </svg>
      </div>
      <div className={`card-3d ${isMobile ? 'mobile' : ''} ${!isRotating && isMobile ? 'paused' : ''}`} onClick={handleClick}>
        {images.map((image, index) => (
          <div
            key={index}
            style={{ transform: isMobile ? `translate(-50%, -50%) ${getStepTransform(index)} translateZ(350px)` : undefined }}
          >
            <Image
              src={image}
              alt={`Event ${index + 1}`}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              unoptimized
              quality={100}
            />
            {/* Blue transparent overlay for dimming and clarity */}
            <div className="absolute inset-0 rounded-lg bg-[#0031d1]/90" />
            {/* Black overlay for extra dimming */}
            <div className="absolute inset-0 rounded-lg bg-black/40" />
            {/* High z-index overlay for maximum stacking */}
            <div className="absolute inset-0 rounded-lg" style={{ zIndex: 10000000 }} />
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes autoRun3d {
    from {
      transform: perspective(800px) rotateY(-360deg);
    }
    to {
      transform: perspective(800px) rotateY(0deg);
    }
  }

  @keyframes animateBrightness {
    10% {
      filter: brightness(1);
    }
    50% {
      filter: brightness(0.1);
    }
    90% {
      filter: brightness(1);
    }
  }

  .card-3d {
    position: relative;
    width: 160px;
    height: 160px;
    transform-style: preserve-3d;
    transform: perspective(800px);
    animation: autoRun3d 20s linear infinite;
    will-change: transform;
  }

  .card-3d.mobile {
    animation: none;
    transition: transform 0.5s ease;
  }

  .card-3d.mobile div {
    transition: transform 0.5s ease;
  }

  .card-3d.paused div {
    animation-play-state: paused !important;
  }

  .card-3d div {
    position: absolute;
    width: 160px;
    height: 160px;
    /* background-color removed for clarity */
    border: solid 2px lightgray;
    border-radius: 0.5rem;
    top: 50%;
    left: 50%;
    transform-origin: center center;
    animation: animateBrightness 20s linear infinite;
    transition-duration: 200ms;
    will-change: transform, filter;
    overflow: hidden;
  }

  .card-3d:not(.mobile):hover {
    animation-play-state: paused !important;
  }

  .card-3d:not(.mobile):hover div {
    animation-play-state: paused !important;
  }

  .card-3d div:nth-child(1) {
    transform: translate(-50%, -50%) rotateY(0deg) translateZ(350px);
    animation-delay: -0s;
  }

  .card-3d div:nth-child(2) {
    transform: translate(-50%, -50%) rotateY(36deg) translateZ(350px);
    animation-delay: -2s;
  }

  .card-3d div:nth-child(3) {
    transform: translate(-50%, -50%) rotateY(72deg) translateZ(350px);
    animation-delay: -4s;
  }

  .card-3d div:nth-child(4) {
    transform: translate(-50%, -50%) rotateY(108deg) translateZ(350px);
    animation-delay: -6s;
  }

  .card-3d div:nth-child(5) {
    transform: translate(-50%, -50%) rotateY(144deg) translateZ(350px);
    animation-delay: -8s;
  }

  .card-3d div:nth-child(6) {
    transform: translate(-50%, -50%) rotateY(180deg) translateZ(350px);
    animation-delay: -10s;
  }

  .card-3d div:nth-child(7) {
    transform: translate(-50%, -50%) rotateY(216deg) translateZ(350px);
    animation-delay: -12s;
  }

  .card-3d div:nth-child(8) {
    transform: translate(-50%, -50%) rotateY(252deg) translateZ(350px);
    animation-delay: -14s;
  }

  .card-3d div:nth-child(9) {
    transform: translate(-50%, -50%) rotateY(288deg) translateZ(350px);
    animation-delay: -16s;
  }

  .card-3d div:nth-child(10) {
    transform: translate(-50%, -50%) rotateY(324deg) translateZ(350px);
    animation-delay: -18s;
  }
`;

export default Card; 