'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Star, Zap, Target } from 'lucide-react';
import { GameStats, DifficultyMode, difficultySettings } from '@/lib/translations';

interface GameOverModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRestart: () => void;
  stats: GameStats;
  difficultyMode: DifficultyMode;
}

export function GameOverModal({ isOpen, onClose, onRestart, stats, difficultyMode }: GameOverModalProps) {
  const accuracy = stats.wordsTotal > 0 ? Math.round((stats.wordsCorrect / stats.wordsTotal) * 100) : 0;
  const difficulty = difficultySettings[difficultyMode];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="pixel-border bg-card/95 backdrop-blur-sm max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl neon-glow text-accent">
            Mission Complete
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="text-center space-y-2">
            <div className="text-4xl">🛸</div>
            <p className="text-sm text-muted-foreground">
              Earth has been defended! Great work, pilot.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="text-lg">{difficulty.icon}</span>
              <span className="font-bold text-primary">{difficulty.name} Mode</span>
            </div>
          </div>

          <Card className="bg-background/50">
            <CardContent className="p-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm font-bold">Score</span>
                  </div>
                  <p className="text-lg font-bold text-primary neon-glow">
                    {stats.score.toLocaleString()}
                  </p>
                </div>
                
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="w-4 h-4 text-secondary" />
                    <span className="text-sm font-bold">Level</span>
                  </div>
                  <p className="text-lg font-bold text-secondary neon-glow">
                    {stats.level}
                  </p>
                </div>
                
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Zap className="w-4 h-4 text-accent" />
                    <span className="text-sm font-bold">Max Combo</span>
                  </div>
                  <p className="text-lg font-bold text-accent neon-glow">
                    {stats.maxCombo}x
                  </p>
                </div>
                
                <div className="text-center space-y-1">
                  <div className="flex items-center justify-center gap-1">
                    <Target className="w-4 h-4 text-green-400" />
                    <span className="text-sm font-bold">Accuracy</span>
                  </div>
                  <p className="text-lg font-bold text-green-400 neon-glow">
                    {accuracy}%
                  </p>
                </div>
              </div>

              <div className="text-center text-xs text-muted-foreground space-y-1">
                <div>Words Translated: {stats.wordsCorrect} / {stats.wordsTotal}</div>
                <div>Difficulty Multiplier: {difficulty.scoreMultiplier}x</div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button 
              onClick={onRestart}
              className="flex-1 retro-button bg-primary hover:bg-primary/80"
            >
              New Mission
            </Button>
            <Button 
              onClick={onClose}
              variant="outline"
              className="flex-1 retro-button"
            >
              Main Menu
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}