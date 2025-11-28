#!/bin/bash

# Build Script for Snake Game Application
# This script compiles both frontend and backend, similar to the CI/CD pipeline

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
FRONTEND_DIR="$PROJECT_ROOT/frontend"
BACKEND_DIR="$PROJECT_ROOT/backend"
OUTPUT_DIR="$PROJECT_ROOT/dist"

print_step() {
    echo -e "${BLUE}==>${NC} $1"
}

print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

check_prerequisites() {
    print_step "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js 20 or higher."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    # Check Java
    if ! command -v java &> /dev/null; then
        print_error "Java is not installed. Please install Java 21 or higher."
        exit 1
    fi
    
    # Check Maven wrapper
    if [ ! -f "$BACKEND_DIR/mvnw" ]; then
        print_error "Maven wrapper not found in backend directory."
        exit 1
    fi
    
    print_success "All prerequisites are available"
}

clean_build() {
    print_step "Cleaning previous builds..."
    
    # Clean output directory
    rm -rf "$OUTPUT_DIR"
    mkdir -p "$OUTPUT_DIR"
    
    # Clean backend
    cd "$BACKEND_DIR"
    ./mvnw clean > /dev/null 2>&1
    
    # Clean frontend
    cd "$FRONTEND_DIR"
    if [ -d "dist" ]; then
        rm -rf dist
    fi
    if [ -d "node_modules" ]; then
        print_warning "Removing node_modules (will be reinstalled)"
        rm -rf node_modules
    fi
    
    print_success "Cleaned previous builds"
}

build_frontend() {
    print_step "Building frontend..."
    
    cd "$FRONTEND_DIR"
    
    print_step "Installing frontend dependencies..."
    npm ci --silent
    
    print_step "Building frontend for production..."
    npm run build
    
    # Copy built files to output directory
    cp -r dist/* "$OUTPUT_DIR/"
    
    print_success "Frontend build completed"
}

build_backend() {
    print_step "Building backend..."
    
    cd "$BACKEND_DIR"
    
    print_step "Installing backend dependencies..."
    ./mvnw dependency:go-offline -B -q
    
    print_step "Running tests..."
    ./mvnw test -q
    
    print_step "Building production JAR with uber-jar profile..."
    ./mvnw clean package -Pprod -DskipTests -q
    
    # Find the uber-jar file
    UBER_JAR=$(find target -name "*-runner.jar" | head -1)
    
    if [ -z "$UBER_JAR" ]; then
        print_error "Could not find uber-jar file"
        exit 1
    fi
    
    print_success "Backend uber-jar build completed: $UBER_JAR"
    
    # Store the JAR path for rebundling
    BACKEND_JAR="$UBER_JAR"
}

rebundle_jar() {
    print_step "Rebundling JAR with frontend assets..."
    
    cd "$PROJECT_ROOT"
    
    # Use the rebundle script to combine backend JAR with frontend assets
    "$PROJECT_ROOT/ci/rebundle.sh" "$BACKEND_DIR/$BACKEND_JAR" "$FRONTEND_DIR/dist" "$OUTPUT_DIR/app.jar"
    
    print_success "Rebundled JAR created: $OUTPUT_DIR/app.jar"
}

show_summary() {
    echo
    echo -e "${GREEN}========================================${NC}"
    echo -e "${GREEN}         BUILD COMPLETED SUCCESSFULLY   ${NC}"
    echo -e "${GREEN}========================================${NC}"
    echo
    echo "Build artifacts:"
    echo "📁 Output directory: $OUTPUT_DIR"
    echo "☕ Rebundled JAR: app.jar (backend + frontend combined)"
    echo "   └─ Contains backend uber-jar with embedded frontend assets"
    echo "   └─ Serves both API and web UI from single JAR"
    echo
    echo "To run the application:"
    echo "  java -jar $OUTPUT_DIR/app.jar"
    echo
    echo "The application will be available at:"
    echo "  🌐 Web UI: http://localhost:8080"
    echo "  🔌 API: http://localhost:8080/api"
    echo
}

# Main execution
main() {
    echo -e "${BLUE}Snake Game Build Script${NC}"
    echo "=============================="
    
    # Parse arguments
    SKIP_CLEAN=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --no-clean)
                SKIP_CLEAN=true
                shift
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  --no-clean    Skip cleaning previous builds"
                echo "  -h, --help    Show this help message"
                echo ""
                echo "This script creates a rebundled JAR containing both backend and frontend."
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                echo "Use --help for usage information"
                exit 1
                ;;
        esac
    done
    
    check_prerequisites
    
    if [ "$SKIP_CLEAN" = false ]; then
        clean_build
    fi
    
    build_frontend
    build_backend
    rebundle_jar
    
    show_summary
}

# Run main function
main "$@"