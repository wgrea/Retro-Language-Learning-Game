# LinguaFender 🛸

A retro-style language learning game where you defend Earth by translating alien words!

## Features

- 🎮 **Retro Gaming Experience**: Pixel-art UI with Press Start 2P font and neon aesthetics
- 🌍 **Multiple Languages**: Learn Spanish, French, German, Italian, Portuguese, and Japanese
- 🎯 **Interactive Gameplay**: Space invaders-style word matching with falling translations
- 📊 **Progress Tracking**: Score system, combos, levels, and accuracy tracking
- 🔐 **User Authentication**: Firebase Auth integration for saving progress
- 📱 **Responsive Design**: Optimized for both mobile and desktop play
- ⚡ **Real-time Feedback**: Particle effects and animations for engaging gameplay

## Quick Start

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Set up Firebase** (Optional):
   - Create a Firebase project
   - Copy `.env.local.example` to `.env.local`
   - Add your Firebase configuration

3. **Run the Game**:
   ```bash
   npm run dev
   ```

4. **Play**:
   - Select your target language
   - Click falling words to destroy them
   - Type translations in the input field
   - Defend Earth and learn vocabulary!

## Game Mechanics

- **Lives**: Start with 3 lives, lose one when words reach the bottom
- **Score**: Earn points for correct translations (10/20/30 for easy/medium/hard)
- **Combo**: Build combos for bonus points
- **Levels**: Progress through levels as your score increases
- **Speed**: Game speed increases with each level

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui with custom retro styling
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore (for progress tracking)
- **Animations**: Framer Motion
- **Deployment**: Vercel-ready

## Development

The game is built with a modular component architecture:

- `GameMenu`: Main menu with language selection
- `GameArea`: Main game loop and falling word mechanics
- `GameHeader`: Score, level, and life display
- `FallingWord`: Individual word components with physics
- `TranslationInput`: Input field for typing translations
- `AuthModal`: Authentication interface

## Customization

- **Add Languages**: Extend `vocabularyDatabase` in `lib/translations.ts`
- **Modify Difficulty**: Adjust scoring and speed in game mechanics
- **Styling**: Customize colors and effects in `globals.css`
- **Game Rules**: Modify game logic in `useGameStats` hook

## Firebase Setup

1. Create a Firebase project
2. Enable Authentication (Email/Password)
3. Set up Firestore Database
4. Add configuration to `.env.local`

## Deployment

The app is pre-configured for Vercel deployment:

```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this for educational purposes!

---

**Ready to defend Earth and learn languages? Start your mission now!** 🚀