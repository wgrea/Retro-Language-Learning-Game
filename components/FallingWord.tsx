'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WordPair } from '@/lib/translations';

interface FallingWordProps {
  word: WordPair;
  speed: number;
  onComplete: () => void;
  onHit: (correct: boolean) => void;
  gameHeight: number;
}

export function FallingWord({ word, speed, onComplete, onHit, gameHeight }: FallingWordProps) {
  const [position, setPosition] = useState({ x: Math.random() * 80, y: -10 });
  const [isHit, setIsHit] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition(prev => {
        const newY = prev.y + speed;
        if (newY > gameHeight) {
          onComplete();
          return prev;
        }
        return { ...prev, y: newY };
      });
    }, 16);

    return () => clearInterval(interval);
  }, [speed, gameHeight, onComplete]);

  const handleClick = () => {
    if (isHit) return;
    setIsHit(true);
    onHit(true);
    
    // Create particle effect
    const particles = document.createElement('div');
    particles.className = 'fixed pointer-events-none z-50';
    particles.style.left = `${position.x}%`;
    particles.style.top = `${position.y}%`;
    
    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle bg-accent';
      particle.style.setProperty('--random-x', `${(Math.random() - 0.5) * 100}px`);
      particle.style.setProperty('--random-y', `${(Math.random() - 0.5) * 100}px`);
      particles.appendChild(particle);
    }
    
    document.body.appendChild(particles);
    setTimeout(() => document.body.removeChild(particles), 500);
  };

  return (
    <AnimatePresence>
      {!isHit && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="falling-word cursor-pointer select-none"
          style={{
            left: `${position.x}%`,
            top: `${position.y}%`,
          }}
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {word.word}
        </motion.div>
      )}
    </AnimatePresence>
  );
}