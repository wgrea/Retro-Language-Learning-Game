'use client';

import { useState, useEffect, useCallback } from 'react';
import { FallingWord } from './FallingWord';
import { TranslationInput } from './TranslationInput';
import { WordPair, getRandomWords, calculateScore, getSpeedMultiplier, getSpawnRate, DifficultyMode } from '@/lib/translations';
import { useGameStats } from '@/hooks/useGameStats';

interface GameAreaProps {
  selectedLanguage: string;
  difficultyMode: DifficultyMode;
  isGameActive: boolean;
  onGameEnd: () => void;
}

export function GameArea({ selectedLanguage, difficultyMode, isGameActive, onGameEnd }: GameAreaProps) {
  const [fallingWords, setFallingWords] = useState<Array<{ word: WordPair; id: string }>>([]);
  const [currentWord, setCurrentWord] = useState<WordPair | null>(null);
  const [gameHeight, setGameHeight] = useState(600);
  const { stats, incrementScore, incrementCombo, resetCombo, loseLife, addCorrectAnswer, addIncorrectAnswer } = useGameStats(difficultyMode);

  useEffect(() => {
    const updateHeight = () => {
      setGameHeight(window.innerHeight - 200);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const spawnWord = useCallback(() => {
    if (!isGameActive) return;
    
    const words = getRandomWords(selectedLanguage, 1);
    if (words.length > 0) {
      const newWord = {
        word: words[0],
        id: Math.random().toString(36).substr(2, 9),
      };
      setFallingWords(prev => [...prev, newWord]);
      setCurrentWord(words[0]);
    }
  }, [selectedLanguage, isGameActive]);

  useEffect(() => {
    if (!isGameActive) return;
    
    const spawnInterval = getSpawnRate(stats.level, difficultyMode);
    const interval = setInterval(() => {
      spawnWord();
    }, spawnInterval);

    return () => clearInterval(interval);
  }, [spawnWord, stats.level, isGameActive, difficultyMode]);

  const handleWordComplete = (wordId: string) => {
    setFallingWords(prev => prev.filter(item => item.id !== wordId));
    loseLife();
    resetCombo();
    addIncorrectAnswer();
    
    if (stats.lives <= 1) {
      onGameEnd();
    }
  };

  const handleWordHit = (wordId: string, correct: boolean) => {
    if (correct) {
      const points = calculateScore(true, stats.combo, currentWord?.difficulty || 'easy', difficultyMode);
      incrementScore(points);
      incrementCombo();
      addCorrectAnswer();
    } else {
      resetCombo();
      addIncorrectAnswer();
    }
    
    setFallingWords(prev => prev.filter(item => item.id !== wordId));
  };

  const handleTranslationSubmit = (translation: string) => {
    if (!currentWord) return;
    
    const correct = translation.toLowerCase().trim() === currentWord.translation.toLowerCase().trim();
    
    if (correct) {
      const points = calculateScore(true, stats.combo, currentWord.difficulty, difficultyMode);
      incrementScore(points);
      incrementCombo();
      addCorrectAnswer();
    } else {
      resetCombo();
      addIncorrectAnswer();
    }
  };

  return (
    <div className="relative flex-1 overflow-hidden">
      {/* Starfield background */}
      <div className="absolute inset-0 stars opacity-30" />
      
      {/* Game area */}
      <div 
        className="relative w-full h-full"
        style={{ height: `${gameHeight}px` }}
      >
        {fallingWords.map((item) => (
          <FallingWord
            key={item.id}
            word={item.word}
            speed={getSpeedMultiplier(stats.level, difficultyMode)}
            onComplete={() => handleWordComplete(item.id)}
            onHit={(correct) => handleWordHit(item.id, correct)}
            gameHeight={gameHeight}
          />
        ))}
      </div>
      
      {/* Translation input */}
      <div className="absolute bottom-4 left-4 right-4">
        <TranslationInput
          currentWord={currentWord}
          onSubmit={handleTranslationSubmit}
          disabled={!isGameActive}
        />
      </div>
    </div>
  );
}