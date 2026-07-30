"use client";

import { useState, useEffect } from 'react';
import Image from '@/components/site-image';

interface ImageCarouselProps {
  images: string[];
  interval?: number; // en millisecondes
  alt: string;
  dataAiHint?: string;
  className?: string;
}

export function ImageCarousel({
  images,
  interval = 5000, // 5 secondes par défaut
  alt,
  dataAiHint,
  className = "",
}: ImageCarouselProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      // Préparer la prochaine image
      const nextIndex = (currentImageIndex + 1) % images.length;
      setNextImageIndex(nextIndex);
      
      // Attendre que la transition de fondu soit terminée
      const transitionTimer = setTimeout(() => {
        setCurrentImageIndex(nextIndex);
        setIsTransitioning(false);
      }, 1000); // 1 seconde pour la transition
      
      return () => clearTimeout(transitionTimer);
    }, interval);

    return () => clearInterval(timer);
  }, [currentImageIndex, images.length, interval]);

  if (images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className={`relative w-full h-full ${className}`}>
        <Image
          src={images[0]}
          alt={alt}
          data-ai-hint={dataAiHint}
          fill
          priority
          className="object-cover object-center"
        />
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      {/* Image actuelle */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
      >
        <Image
          src={images[currentImageIndex]}
          alt={alt}
          data-ai-hint={dataAiHint}
          fill
          priority
          className="object-cover object-center"
        />
      </div>
      
      {/* Image suivante (préchargée) */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isTransitioning ? 'opacity-100' : 'opacity-0'}`}
      >
        <Image
          src={images[nextImageIndex]}
          alt={alt}
          data-ai-hint={dataAiHint}
          fill
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
