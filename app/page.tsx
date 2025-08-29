'use client';

import { useState } from 'react';
import { GameMenu } from '@/components/GameMenu';
import { GameHeader } from '@/components/GameHeader';
import { GameArea } from '@/components/GameArea';
import { AuthModal } from '@/components/AuthModal';
import { GameOverModal } from '@/components/GameOverModal';
import { Button } from '@/components/ui/button';
import { Home, Pause, Play } from 'lucide-react';
import { useGameStats } from '@/hooks/useGameStats';
import { DifficultyMode, difficultySettings } from '@/lib/translations';

type GameState = 'menu' | 'playing' | 'paused' | 'gameOver';

export default function Home() {
  const [gameState, setGameState] = useState<GameState>('menu');
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyMode>('normal');
  const [showAuth, setShowAuth] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const { stats, resetStats } = useGameStats(selectedDifficulty);

  const handleStartGame = (language: string, difficulty: DifficultyMode) => {
    setSelectedLanguage(language);
    setSelectedDifficulty(difficulty);
    resetStats();
    setGameState('playing');
  };

  const handlePauseGame = () => {
    setGameState('paused');
  };

  const handleResumeGame = () => {
    setGameState('playing');
  };

  const handleEndGame = () => {
    setGameState('gameOver');
  };

  const handleBackToMenu = () => {
    setGameState('menu');
  };

  const handleRestartGame = () => {
    resetStats();
    setGameState('playing');
  };

  if (gameState === 'menu') {
    return (
      <>
        <GameMenu
          onStartGame={handleStartGame}
          onShowAuth={() => setShowAuth(true)}
          onShowLeaderboard={() => setShowLeaderboard(true)}
        />
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <GameHeader stats={stats} />
      
      {/* Difficulty indicator */}
      <div className="bg-card/30 backdrop-blur-sm border-b border-border px-4 py-2">
        <div className="flex items-center justify-center gap-2 text-sm">
          <span className="text-lg">{difficultySettings[selectedDifficulty].icon}</span>
          <span className="font-bold text-primary">{difficultySettings[selectedDifficulty].name} Mode</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{difficultySettings[selectedDifficulty].description}</span>
        </div>
      </div>
      
      <div className="flex-1 relative">
        <GameArea
          selectedLanguage={selectedLanguage}
          difficultyMode={selectedDifficulty}
          isGameActive={gameState === 'playing'}
          onGameEnd={handleEndGame}
        />
        
        {/* Game Controls */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            onClick={gameState === 'playing' ? handlePauseGame : handleResumeGame}
            size="sm"
            variant="outline"
            className="retro-button"
          >
            {gameState === 'playing' ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            onClick={handleBackToMenu}
            size="sm"
            variant="outline"
            className="retro-button"
          >
            <Home className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Pause Overlay */}
        {gameState === 'paused' && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="bg-card/95 backdrop-blur-sm pixel-border p-8 rounded-lg text-center space-y-4">
              <h2 className="text-2xl font-bold neon-glow">Mission Paused</h2>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-lg">{difficultySettings[selectedDifficulty].icon}</span>
                <span className="font-bold text-primary">{difficultySettings[selectedDifficulty].name} Mode</span>
              </div>
              <p className="text-muted-foreground">Ready to continue defending Earth?</p>
              <div className="flex gap-4">
                <Button onClick={handleResumeGame} className="retro-button">
                  <Play className="w-4 h-4 mr-2" />
                  Resume
                </Button>
                <Button onClick={handleBackToMenu} variant="outline" className="retro-button">
                  <Home className="w-4 h-4 mr-2" />
                  Menu
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <GameOverModal
        isOpen={gameState === 'gameOver'}
        onClose={handleBackToMenu}
        onRestart={handleRestartGame}
        stats={stats}
        difficultyMode={selectedDifficulty}
      />
    </div>
  );
}