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

## 4. Docker Configuration

### Base Images

- **Build Stage**: `eclipse-temurin:21-jdk`
- **Runtime Stage**: `eclipse-temurin:21-jre`

### Environment Variables

- `QUARKUS_PROFILE`: Set to `dev` or `prod`

### Volumes

- Development: Maven cache (`~/.m2`) and source code mounted for hot reload
- Production: Database file mounted for persistence
