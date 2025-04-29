'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

interface CardProps {
  images: string[];
}

const Card: React.FC<CardProps> = ({ images }) => {
  return (
    <StyledWrapper>
      <div className="card-3d">
        {images.map((image, index) => (
          <div key={index}>
            <Image
              src={image}
              alt={`Event ${index + 1}`}
              width={110}
              height={140}
              className="w-full h-full object-cover"
              unoptimized
              quality={100}
            />
          </div>
        ))}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  @keyframes autoRun3d {
    from {
      transform: perspective(1200px) rotateY(-360deg);
    }
    to {
      transform: perspective(1200px) rotateY(0deg);
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
    width: 600px;
    height: 300px;
    transform-style: preserve-3d;
    transform: perspective(1200px);
    animation: autoRun3d 20s linear infinite;
    will-change: transform;
  }

  .card-3d div {
    position: absolute;
    width: 160px;
    height: 224px;
    background-color: rgb(199, 199, 199);
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

  .card-3d:hover {
    animation-play-state: paused !important;
  }

  .card-3d:hover div {
    animation-play-state: paused !important;
  }

  .card-3d div:nth-child(1) {
    transform: translate(-50%, -50%) rotateY(0deg) translateZ(250px);
    animation-delay: -0s;
  }

  .card-3d div:nth-child(2) {
    transform: translate(-50%, -50%) rotateY(36deg) translateZ(250px);
    animation-delay: -2s;
  }

  .card-3d div:nth-child(3) {
    transform: translate(-50%, -50%) rotateY(72deg) translateZ(250px);
    animation-delay: -4s;
  }

  .card-3d div:nth-child(4) {
    transform: translate(-50%, -50%) rotateY(108deg) translateZ(250px);
    animation-delay: -6s;
  }

  .card-3d div:nth-child(5) {
    transform: translate(-50%, -50%) rotateY(144deg) translateZ(250px);
    animation-delay: -8s;
  }

  .card-3d div:nth-child(6) {
    transform: translate(-50%, -50%) rotateY(180deg) translateZ(250px);
    animation-delay: -10s;
  }

  .card-3d div:nth-child(7) {
    transform: translate(-50%, -50%) rotateY(216deg) translateZ(250px);
    animation-delay: -12s;
  }

  .card-3d div:nth-child(8) {
    transform: translate(-50%, -50%) rotateY(252deg) translateZ(250px);
    animation-delay: -14s;
  }

  .card-3d div:nth-child(9) {
    transform: translate(-50%, -50%) rotateY(288deg) translateZ(250px);
    animation-delay: -16s;
  }

  .card-3d div:nth-child(10) {
    transform: translate(-50%, -50%) rotateY(324deg) translateZ(250px);
    animation-delay: -18s;
  }
`;

export default Card; 