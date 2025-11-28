# Snake Game

## Description

Snake Game is a classic video game where the player controls a snake moving around a playing field. The goal of the game is to collect as many fruits as possible without hitting the walls or yourself.
The game is inspired by the original Nokia mobile phone games and offers a simple but engaging gaming experience.
Players can compete for high scores on the leaderboard, which tracks the best performances across different difficulty levels.

## Quick Start with Docker

### Prerequisites

- Docker and Docker Compose installed

### Production Setup

```bash
# Build and start all services in production mode
docker-compose up --build -d

# Access the application
# Frontend: http://localhost:3000
# Backend API: http://localhost:8080
```

### Development Setup

```bash
# Build and start all services in development mode (with hot reload)
docker-compose -f compose.dev.yml up --build -d

# Access the application
# Frontend: http://localhost:5173 (with hot reload)
# Backend API: http://localhost:8080 (with debug port 5005)
```

### Stop Services

```bash
# Stop production
docker-compose down

# Stop development
docker-compose -f compose.dev.yml down
```

## Manual Setup

### Frontend

For more information about the frontend, see the [Frontend README](./frontend/README.md).

### Backend

For more information about the backend, see the [Backend README](./backend/README.md).
