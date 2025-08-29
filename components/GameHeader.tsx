'use client';

import { Heart, Star, Zap } from 'lucide-react';
import { GameStats } from '@/lib/translations';

interface GameHeaderProps {
  stats: GameStats;
}

export function GameHeader({ stats }: GameHeaderProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-card/50 backdrop-blur-sm border-b border-border">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-bold neon-glow text-yellow-400">
            {stats.score.toLocaleString()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">LVL</span>
          <span className="text-sm font-bold text-primary neon-glow">
            {stats.level}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm font-bold text-accent neon-glow">
            {stats.combo}x
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-1">
        {Array.from({ length: stats.lives }).map((_, i) => (
          <Heart 
            key={i} 
            className="w-4 h-4 text-destructive fill-destructive" 
          />
        ))}
        {Array.from({ length: 3 - stats.lives }).map((_, i) => (
          <Heart 
            key={i + stats.lives} 
            className="w-4 h-4 text-muted-foreground" 
          />
        ))}
      </div>
    </div>
  );
}