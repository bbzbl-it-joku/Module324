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
```

## 4. Docker Configuration

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
