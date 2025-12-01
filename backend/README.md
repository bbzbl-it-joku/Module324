# Backend

## 1. Prerequisites

### Manual Setup

- **Java** (version 21 or higher)
- **Maven** (version 3.8 or higher)

### Docker Setup

- **Docker** and **Docker Compose**

## 2. Technologies and Libraries

- **Quarkus** - Supersonic Subatomic Java Framework
- **Hibernate ORM with Panache** - Database ORM
- **SQLite** - Database
- **Flyway** - Database Migration
- **REST & Jackson** - RESTful API and JSON Processing
- **Lombok** - Boilerplate Code Reduction
- **Spotless** - Code Formatting

## 3. Getting Started

### With Docker (Recommended)

```bash
# Development mode (from project root)
docker-compose -f compose.dev.yml up -d backend

# Production mode (from project root)
docker-compose up -d backend

# The backend will be available at:
# - http://localhost:8080 (API)
# - http://localhost:5005 (Debug port - dev mode only)
```

### Manual Setup

```bash
# Install dependencies and compile
./mvnw clean install

# Start development server
./mvnw quarkus:dev

# Build project
./mvnw package

# Run tests
./mvnw test
```

## 4. Demo Data

In development mode, the backend automatically loads demo leaderboard data on startup. This includes:
- 10 sample leaderboard entries
- Various difficulty levels (easy, medium, hard)
- Different scores and timestamps
- Realistic user names

The demo data is only loaded:
- When running in development profile (`QUARKUS_PROFILE=dev`)
- When the database is empty (prevents duplicates)

Demo data loading is handled by `DemoDataService` which runs on application startup.

## 5. Docker Configuration

### Base Images

- **Build Stage**: `eclipse-temurin:21-jdk`
- **Runtime Stage**: `eclipse-temurin:21-jre`

### Environment Variables

- `QUARKUS_PROFILE`: Set to `dev` or `prod`

### Volumes

- Development: Maven cache (`~/.m2`) and source code mounted for hot reload
- Production: Database file mounted for persistence
