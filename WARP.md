# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Turnstile is a Solana-native x402 marketplace for AI agents and on-chain services. It enables instant micropayments between AI agents and API providers using the x402 protocol on Solana, offering pay-per-call billing with instant settlement.

## Development Commands

### Setup & Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Starts Vite dev server with HMR (Hot Module Reloading) enabled
```

### Build for Production
```bash
npm run build
# Runs TypeScript compilation followed by Vite build
# Output: dist/
```

### Linting
```bash
npm run lint
# ESLint check for TypeScript/TSX files with React hooks and refresh rules
```

### Preview Production Build
```bash
npm run preview
# Serves the built distribution locally to preview production build
```

## Architecture & Code Organization

### Project Stack
- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 4 + PostCSS
- **Animation**: Framer Motion
- **Routing**: React Router 7
- **Icons**: Lucide React
- **Linting**: ESLint 9 with TypeScript support

### Directory Structure

```
src/
├── pages/               # Page-level components (route destinations)
│   ├── Home.tsx        # Landing page with hero, features, roadmap, email signup
│   └── Docs.tsx        # Documentation page with sidebar navigation
│
├── components/
│   └── ui/             # Reusable UI components with animations
│       ├── hero-section.tsx           # Hero with word animations, grid background, mouse gradient
│       ├── container-scroll-animation.tsx  # Scroll-triggered 3D card animation (Framer Motion)
│       ├── email-signup.tsx           # Email subscription form
│       ├── how-it-works.tsx           # 4-step process explanation
│       ├── roadmap.tsx                # Feature roadmap/timeline
│       └── footer.tsx                 # Footer component
│
├── App.tsx             # React Router setup with /  and /docs routes
├── main.tsx            # React 19 entry point with StrictMode
├── index.css           # Global styles, Tailwind imports, custom animations
└── App.css             # Component-specific styles
```

### Key Patterns & Architecture

#### Color System
A consistent 10-level color palette is defined in `hero-section.tsx` and used across components:
```
50: #f8f7f5    (light/off-white)
100: #e6e1d7
200: #c8b4a0   (primary accent)
300: #a89080
400: #8a7060
500: #6b5545
600: #544237
700: #3c4237
800: #2a2e26
900: #1a1d18   (dark/background)
```

#### Animation Framework
- **Hero Section**: Word-by-word staggered animations using `data-delay` attributes and JavaScript event listeners
- **Scroll Animations**: Framer Motion's `useScroll` hook for parallax/transform effects triggered by viewport scroll
- **Keyframe Animations**: Global `index.css` defines reusable animations (`word-appear`, `grid-draw`, `pulse-glow`, `float`) applied via CSS classes
- **Interactive Effects**: Mouse-tracked gradient overlay, ripple effects on click, floating elements that trigger on scroll

#### State Management
- Minimal state: Components mostly presentational, using React hooks for local state (`useState`)
- Docs page: Single `activeSection` state for sidebar navigation highlighting
- Container scroll: Mobile detection via `useState` and `useEffect` with resize listener

#### Routing
- Simple two-route setup using React Router 7
- `/` → Home page (landing/marketing)
- `/docs` → Documentation page (static content with sidebar navigation)

#### Responsive Design
- Tailwind-based responsive classes (md:, lg: breakpoints)
- Container scroll animation checks window width to adjust mobile scaling
- Most components use flex layouts for fluid responsiveness

### Important Rules & Constraints

**Map/Business Interactions Rule**:
The map should not reset or react to any user interactions or events triggered by hovering over businesses or other site actions. (Note: Current version doesn't include a map component; this rule applies if map functionality is added.)

## TypeScript & Build Configuration

### tsconfig.json Structure
- Root tsconfig references two sub-configs:
  - `tsconfig.app.json` - Application code
  - `tsconfig.node.json` - Vite/build-time code

### ESLint Configuration
- Extended with:
  - TypeScript ESLint recommended rules
  - React Hooks best practices
  - React Refresh plugin for Vite
- No type-aware linting enabled yet (can be configured per README recommendations)

## Development Notes

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `App.tsx` using React Router
3. Follow existing component patterns for styling (Tailwind) and animations (Framer Motion + CSS keyframes)

### Adding New UI Components
1. Create in `src/components/ui/`
2. Use existing color palette from `colors` object
3. Leverage global animation keyframes in `index.css` or define component-specific animations inline

### Component Composition Pattern
- Pages composed of stacked UI sections (hero, features, etc.)
- Each section is a self-contained component
- Heavy use of Tailwind for styling (no CSS modules)
- Custom animations through Framer Motion hooks or CSS keyframes
