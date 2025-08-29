'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Play, Settings, Trophy, User } from 'lucide-react';
import { languageOptions, DifficultyMode, difficultySettings } from '@/lib/translations';
import { useGameStats } from '@/hooks/useGameStats';

interface GameMenuProps {
  onStartGame: (language: string, difficulty: DifficultyMode) => void;
  onShowAuth: () => void;
  onShowLeaderboard: () => void;
}

export function GameMenu({ onStartGame, onShowAuth, onShowLeaderboard }: GameMenuProps) {
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyMode>('normal');
  const { stats } = useGameStats(selectedDifficulty);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold neon-glow text-primary">
            LINGUAFENDER
          </h1>
          <p className="text-sm text-muted-foreground uppercase tracking-wider">
            Defend Earth • Learn Languages
          </p>
        </div>

        {/* Main Menu Card */}
        <Card className="pixel-border bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg text-center">Mission Control</CardTitle>
            <CardDescription className="text-center">
              Configure your mission parameters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider">
                Target Language
              </label>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="retro-button">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider">
                Difficulty Mode
              </label>
              <Select value={selectedDifficulty} onValueChange={(value: DifficultyMode) => setSelectedDifficulty(value)}>
                <SelectTrigger className="retro-button">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(difficultySettings).map(([key, settings]) => (
                    <SelectItem key={key} value={key}>
                      <div className="flex items-center gap-2">
                        <span>{settings.icon}</span>
                        <div className="flex flex-col">
                          <span className="font-bold">{settings.name}</span>
                          <span className="text-xs text-muted-foreground">{settings.description}</span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Info */}
            <div className="bg-background/50 p-3 rounded-lg border border-border">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{difficultySettings[selectedDifficulty].icon}</span>
                <span className="font-bold text-sm">{difficultySettings[selectedDifficulty].name}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-muted-foreground">Lives:</span>
                  <span className="ml-1 font-bold text-destructive">
                    {difficultySettings[selectedDifficulty].lives}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Score:</span>
                  <span className="ml-1 font-bold text-primary">
                    {difficultySettings[selectedDifficulty].scoreMultiplier}x
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {difficultySettings[selectedDifficulty].description}
              </p>
            </div>

            <Button 
              onClick={() => onStartGame(selectedLanguage, selectedDifficulty)}
              className="w-full retro-button bg-primary hover:bg-primary/80"
              size="lg"
            >
              <Play className="w-4 h-4 mr-2" />
              Start Mission
            </Button>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card className="pixel-border bg-card/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-sm">Pilot Stats - {difficultySettings[selectedDifficulty].name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <p className="text-muted-foreground">High Score</p>
                <p className="font-bold text-primary">{stats.score.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Max Level</p>
                <p className="font-bold text-secondary">{stats.level}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Accuracy</p>
                <p className="font-bold text-accent">
                  {stats.wordsTotal > 0 ? Math.round((stats.wordsCorrect / stats.wordsTotal) * 100) : 0}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Best Combo</p>
                <p className="font-bold text-yellow-400">{stats.maxCombo}x</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={onShowAuth}
            variant="outline"
            className="retro-button"
          >
            <User className="w-4 h-4 mr-2" />
            Account
          </Button>
          <Button 
            onClick={onShowLeaderboard}
            variant="outline"
            className="retro-button"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
}