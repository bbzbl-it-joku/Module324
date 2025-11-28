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

## Build Scripts

For a complete build similar to the CI/CD pipeline, use the provided build scripts:

### Unix/Linux/macOS
```bash
# Full build (frontend + backend + Docker image)
./build.sh

# Skip cleaning previous builds
./build.sh --no-clean

# Skip cleaning (faster rebuilds)
./build.sh --no-clean

# Show help
./build.sh --help
```

### Windows
```cmd
REM Full build (frontend + backend + Docker image)
build.bat

REM Show help
build.bat --help
```

The build script will:
1. Clean previous builds
2. Install dependencies for both frontend and backend
3. Run backend tests
4. Build frontend for production
5. Build backend uber-jar with production profile
6. **Rebundle JAR** - Combine frontend assets into backend JAR
7. Output rebundled JAR to `dist/app.jar`

This creates a single JAR file that serves both the API and web UI, identical to the CI/CD pipeline (which uses the same rebundle script).

### Standalone Rebundling

You can also use the rebundling scripts directly:

```bash
# Unix/Linux/macOS
./ci/rebundle.sh backend/target/backend-PROD-SNAPSHOT-runner.jar frontend/dist dist/app.jar

# Windows
ci\rebundle.bat backend\target\backend-PROD-SNAPSHOT-runner.jar frontend\dist dist\app.jar
```

## Manual Setup

### Frontend

For more information about the frontend, see the [Frontend README](./frontend/README.md).

### Backend

For more information about the backend, see the [Backend README](./backend/README.md).
