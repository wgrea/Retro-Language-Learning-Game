'use client';

import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { WordPair } from '@/lib/translations';

interface TranslationInputProps {
  currentWord: WordPair | null;
  onSubmit: (translation: string) => void;
  disabled: boolean;
}

export function TranslationInput({ currentWord, onSubmit, disabled }: TranslationInputProps) {
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled, currentWord]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  return (
    <div className="pixel-border bg-card/90 backdrop-blur-sm p-4 rounded-lg">
      <div className="mb-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Translate to English:
        </p>
        {currentWord && (
          <p className="text-lg font-bold text-primary neon-glow">
            {currentWord.word}
          </p>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type translation..."
          disabled={disabled}
          className="flex-1 bg-background/50 border-primary/30 focus:border-primary"
        />
        <Button 
          type="submit" 
          size="sm" 
          disabled={disabled || !input.trim()}
          className="retro-button"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}