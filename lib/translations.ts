export interface WordPair {
  id: string;
  word: string;
  translation: string;
  language: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface GameStats {
  score: number;
  level: number;
  wordsCorrect: number;
  wordsTotal: number;
  combo: number;
  maxCombo: number;
  lives: number;
  timeElapsed: number;
}

export type DifficultyMode = 'beginner' | 'normal' | 'expert';

export interface DifficultySettings {
  name: string;
  description: string;
  fallSpeed: number;
  spawnRate: number;
  lives: number;
  scoreMultiplier: number;
  icon: string;
}

export const difficultySettings: Record<DifficultyMode, DifficultySettings> = {
  beginner: {
    name: 'Beginner',
    description: 'Slow pace, more time to think',
    fallSpeed: 0.8,
    spawnRate: 4000,
    lives: 5,
    scoreMultiplier: 0.8,
    icon: '🌱'
  },
  normal: {
    name: 'Normal',
    description: 'Balanced challenge',
    fallSpeed: 1.2,
    spawnRate: 3000,
    lives: 3,
    scoreMultiplier: 1.0,
    icon: '⚡'
  },
  expert: {
    name: 'Expert',
    description: 'Fast-paced, intense action',
    fallSpeed: 2.0,
    spawnRate: 2000,
    lives: 2,
    scoreMultiplier: 1.5,
    icon: '🔥'
  }
};

// Sample vocabulary database
export const vocabularyDatabase: WordPair[] = [
  // Spanish - Easy
  { id: '1', word: 'casa', translation: 'house', language: 'es', difficulty: 'easy', category: 'home' },
  { id: '2', word: 'agua', translation: 'water', language: 'es', difficulty: 'easy', category: 'food' },
  { id: '3', word: 'sol', translation: 'sun', language: 'es', difficulty: 'easy', category: 'nature' },
  { id: '4', word: 'libro', translation: 'book', language: 'es', difficulty: 'easy', category: 'education' },
  { id: '5', word: 'perro', translation: 'dog', language: 'es', difficulty: 'easy', category: 'animals' },
  { id: '6', word: 'gato', translation: 'cat', language: 'es', difficulty: 'easy', category: 'animals' },
  { id: '7', word: 'coche', translation: 'car', language: 'es', difficulty: 'easy', category: 'transport' },
  { id: '8', word: 'amigo', translation: 'friend', language: 'es', difficulty: 'easy', category: 'people' },
  { id: '9', word: 'tiempo', translation: 'time', language: 'es', difficulty: 'easy', category: 'abstract' },
  { id: '10', word: 'comida', translation: 'food', language: 'es', difficulty: 'easy', category: 'food' },
  
  // Spanish - Medium
  { id: '11', word: 'universidad', translation: 'university', language: 'es', difficulty: 'medium', category: 'education' },
  { id: '12', word: 'restaurante', translation: 'restaurant', language: 'es', difficulty: 'medium', category: 'food' },
  { id: '13', word: 'computadora', translation: 'computer', language: 'es', difficulty: 'medium', category: 'technology' },
  { id: '14', word: 'biblioteca', translation: 'library', language: 'es', difficulty: 'medium', category: 'education' },
  { id: '15', word: 'medicina', translation: 'medicine', language: 'es', difficulty: 'medium', category: 'health' },
  { id: '16', word: 'gobierno', translation: 'government', language: 'es', difficulty: 'medium', category: 'politics' },
  
  // Spanish - Hard
  { id: '17', word: 'responsabilidad', translation: 'responsibility', language: 'es', difficulty: 'hard', category: 'abstract' },
  { id: '18', word: 'extraordinario', translation: 'extraordinary', language: 'es', difficulty: 'hard', category: 'adjectives' },
  { id: '19', word: 'incomprensible', translation: 'incomprehensible', language: 'es', difficulty: 'hard', category: 'adjectives' },
  
  // French - Easy
  { id: '20', word: 'chat', translation: 'cat', language: 'fr', difficulty: 'easy', category: 'animals' },
  { id: '21', word: 'chien', translation: 'dog', language: 'fr', difficulty: 'easy', category: 'animals' },
  { id: '22', word: 'eau', translation: 'water', language: 'fr', difficulty: 'easy', category: 'food' },
  { id: '23', word: 'pain', translation: 'bread', language: 'fr', difficulty: 'easy', category: 'food' },
  { id: '24', word: 'maison', translation: 'house', language: 'fr', difficulty: 'easy', category: 'home' },
  { id: '25', word: 'voiture', translation: 'car', language: 'fr', difficulty: 'easy', category: 'transport' },
  { id: '26', word: 'livre', translation: 'book', language: 'fr', difficulty: 'easy', category: 'education' },
  { id: '27', word: 'temps', translation: 'time', language: 'fr', difficulty: 'easy', category: 'abstract' },
  
  // French - Medium
  { id: '28', word: 'université', translation: 'university', language: 'fr', difficulty: 'medium', category: 'education' },
  { id: '29', word: 'restaurant', translation: 'restaurant', language: 'fr', difficulty: 'medium', category: 'food' },
  { id: '30', word: 'ordinateur', translation: 'computer', language: 'fr', difficulty: 'medium', category: 'technology' },
  { id: '31', word: 'bibliothèque', translation: 'library', language: 'fr', difficulty: 'medium', category: 'education' },
  
  // German - Easy
  { id: '32', word: 'haus', translation: 'house', language: 'de', difficulty: 'easy', category: 'home' },
  { id: '33', word: 'wasser', translation: 'water', language: 'de', difficulty: 'easy', category: 'food' },
  { id: '34', word: 'katze', translation: 'cat', language: 'de', difficulty: 'easy', category: 'animals' },
  { id: '35', word: 'hund', translation: 'dog', language: 'de', difficulty: 'easy', category: 'animals' },
  { id: '36', word: 'auto', translation: 'car', language: 'de', difficulty: 'easy', category: 'transport' },
  { id: '37', word: 'buch', translation: 'book', language: 'de', difficulty: 'easy', category: 'education' },
  { id: '38', word: 'zeit', translation: 'time', language: 'de', difficulty: 'easy', category: 'abstract' },
  
  // German - Medium
  { id: '39', word: 'universität', translation: 'university', language: 'de', difficulty: 'medium', category: 'education' },
  { id: '40', word: 'computer', translation: 'computer', language: 'de', difficulty: 'medium', category: 'technology' },
  { id: '41', word: 'bibliothek', translation: 'library', language: 'de', difficulty: 'medium', category: 'education' },
];

export const languageOptions = [
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'it', name: 'Italian', flag: '🇮🇹' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
];

export function getRandomWords(language: string, count: number, difficulty?: string): WordPair[] {
  let filteredWords = vocabularyDatabase.filter(word => word.language === language);
  
  if (difficulty) {
    filteredWords = filteredWords.filter(word => word.difficulty === difficulty);
  }
  
  // Shuffle and return requested count
  const shuffled = filteredWords.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function calculateScore(correct: boolean, combo: number, difficulty: string, difficultyMode: DifficultyMode = 'normal'): number {
  if (!correct) return 0;
  
  const baseScore = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
  const comboBonus = Math.floor(combo * 0.5);
  const modeMultiplier = difficultySettings[difficultyMode].scoreMultiplier;
  
  return Math.round((baseScore + comboBonus) * modeMultiplier);
}

export function calculateLevel(score: number): number {
  return Math.floor(score / 1000) + 1;
}

export function getSpeedMultiplier(level: number, difficultyMode: DifficultyMode = 'normal'): number {
  const baseDifficulty = difficultySettings[difficultyMode];
  const levelMultiplier = 1 + (level - 1) * 0.05; // Reduced from 0.1 to 0.05 for slower progression
  return baseDifficulty.fallSpeed * levelMultiplier;
}

export function getSpawnRate(level: number, difficultyMode: DifficultyMode = 'normal'): number {
  const baseDifficulty = difficultySettings[difficultyMode];
  const levelReduction = (level - 1) * 100; // Reduce spawn time by 100ms per level
  return Math.max(1000, baseDifficulty.spawnRate - levelReduction); // Minimum 1 second between spawns
}