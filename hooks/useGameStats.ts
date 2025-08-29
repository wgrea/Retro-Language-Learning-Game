'use client';

import { useState, useEffect } from 'react';
import { GameStats, DifficultyMode, difficultySettings } from '@/lib/translations';

const defaultStats: GameStats = {
  score: 0,
  level: 1,
  wordsCorrect: 0,
  wordsTotal: 0,
  combo: 0,
  maxCombo: 0,
  lives: 3,
  timeElapsed: 0,
};

export function useGameStats(difficultyMode: DifficultyMode = 'normal') {
  const [stats, setStats] = useState<GameStats>(() => ({
    ...defaultStats,
    lives: difficultySettings[difficultyMode].lives,
  }));

  useEffect(() => {
    const saved = localStorage.getItem(`gameStats_${difficultyMode}`);
    if (saved) {
      const savedStats = JSON.parse(saved);
      setStats({
        ...savedStats,
        lives: difficultySettings[difficultyMode].lives, // Reset lives for new game
      });
    }
  }, [difficultyMode]);

  useEffect(() => {
    localStorage.setItem(`gameStats_${difficultyMode}`, JSON.stringify(stats));
  }, [stats, difficultyMode]);

  const updateStats = (updates: Partial<GameStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const resetStats = () => {
    const newStats = {
      ...defaultStats,
      lives: difficultySettings[difficultyMode].lives,
    };
    setStats(newStats);
  };

  const incrementScore = (points: number) => {
    setStats(prev => ({
      ...prev,
      score: prev.score + points,
      level: Math.floor((prev.score + points) / 1000) + 1,
    }));
  };

  const incrementCombo = () => {
    setStats(prev => ({
      ...prev,
      combo: prev.combo + 1,
      maxCombo: Math.max(prev.maxCombo, prev.combo + 1),
    }));
  };

  const resetCombo = () => {
    setStats(prev => ({
      ...prev,
      combo: 0,
    }));
  };

  const loseLife = () => {
    setStats(prev => ({
      ...prev,
      lives: Math.max(0, prev.lives - 1),
    }));
  };

  const addCorrectAnswer = () => {
    setStats(prev => ({
      ...prev,
      wordsCorrect: prev.wordsCorrect + 1,
      wordsTotal: prev.wordsTotal + 1,
    }));
  };

  const addIncorrectAnswer = () => {
    setStats(prev => ({
      ...prev,
      wordsTotal: prev.wordsTotal + 1,
    }));
  };

  return {
    stats,
    updateStats,
    resetStats,
    incrementScore,
    incrementCombo,
    resetCombo,
    loseLife,
    addCorrectAnswer,
    addIncorrectAnswer,
  };
}