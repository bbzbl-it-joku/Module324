# Frontend

## 1. Prerequisites

### Manual Setup

- **Node.js** (version 20 or higher)
- **npm** (comes with Node.js)

### Docker Setup

- **Docker** and **Docker Compose**

## 2. Technologies and Libraries

- **React** - UI Library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build Tool and Dev Server
- **React Router DOM** - Routing
- **Tailwind CSS** - CSS Framework
- **ESLint & Prettier** - Code Linting and Formatting

## 3. Getting Started

### With Docker (Recommended)

```bash
# Development mode (from project root)
docker-compose -f compose.dev.yml up -d frontend

# Production mode (from project root)
docker-compose up -d frontend

# The frontend will be available at:
# - http://localhost:5173 (Development with hot reload)
# - http://localhost:3000 (Production)
```

### Manual Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build project
npm run build

# Preview build
npm run preview

# Run tests
npm test

# Run tests with coverage report
npm run test:coverage
```

## 4. Testing

The frontend uses **Vitest** as a test framework together with **React Testing Library** for component testing.

### Test Commands

```bash
# Run tests (Watch Mode)
npm test

# Run tests once
npm test -- --run

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage

Tests focus on logic-heavy components and utilities:

- ✅ **Game logic utilities** (`gameLogic.ts`) - Position generation, fruit spawning, game state initialization
- ✅ **Game constants** (`game.ts`) - Difficulty configurations, direction mappings, key bindings
- ✅ **Game state management** (`useSnakeGame.ts`) - Game loop, keyboard controls, pause/resume, collision detection, score tracking
- ✅ **Interactive components** (`GameControls`, `DifficultySwitcher`) - User interactions and state changes

**Current Coverage:**

- **89.42%** Statement Coverage
- **82.81%** Branch Coverage
- **100%** Function Coverage
- **89.69%** Line Coverage

Purely presentational components without logic are not tested.

### View Coverage Report

After running `npm run test:coverage`, a detailed HTML report is generated:

```bash
# Open HTML report (macOS)
open coverage/index.html

# Open HTML report (Linux)
xdg-open coverage/index.html

# Open HTML report (Windows)
start coverage/index.html
```

## 5. Docker Configuration

### Base Images

- **Build Stage**: `node:20-alpine`
- **Production Stage**: `nginx:alpine`

### Development vs Production

- **Development**: Uses `Dockerfile.dev` with hot reload and volume mounting
- **Production**: Multi-stage build with optimized Nginx serving static files

### Environment Variables

- `VITE_API_URL`: Backend API URL (auto-configured in Docker setup)

### Nginx Configuration

- Serves React app with SPA routing support
- Proxies `/api` requests to backend service
