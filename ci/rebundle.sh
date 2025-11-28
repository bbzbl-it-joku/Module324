#!/bin/bash

# JAR Rebundling Script
# This script extracts a Quarkus uber-jar, adds frontend static assets, and repackages it

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

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

# Check parameters
if [ $# -ne 3 ]; then
    echo "Usage: $0 <jar-file> <frontend-dist-dir> <output-jar>"
    echo
    echo "Example:"
    echo "  $0 backend-PROD-SNAPSHOT-runner.jar frontend/dist app.jar"
    echo
    exit 1
fi

JAR_FILE="$1"
FRONTEND_DIST="$2"
OUTPUT_JAR="$3"

# Validate inputs
if [ ! -f "$JAR_FILE" ]; then
    print_error "JAR file not found: $JAR_FILE"
    exit 1
fi

if [ ! -d "$FRONTEND_DIST" ]; then
    print_error "Frontend dist directory not found: $FRONTEND_DIST"
    exit 1
fi

# Check if jar command is available
if ! command -v jar &> /dev/null; then
    print_error "jar command not found. Please ensure Java JDK is installed."
    exit 1
fi

print_step "Rebundling JAR with frontend assets"
echo "  Source JAR: $JAR_FILE"
echo "  Frontend: $FRONTEND_DIST"
echo "  Output: $OUTPUT_JAR"

# Get absolute paths
ABS_JAR_FILE="$(cd "$(dirname "$JAR_FILE")" && pwd)/$(basename "$JAR_FILE")"
ABS_FRONTEND_DIST="$(cd "$FRONTEND_DIST" && pwd)"
ABS_OUTPUT_JAR="$(cd "$(dirname "$OUTPUT_JAR")" 2>/dev/null && pwd)/$(basename "$OUTPUT_JAR")" || {
    # If output directory doesn't exist, create it
    mkdir -p "$(dirname "$OUTPUT_JAR")"
    ABS_OUTPUT_JAR="$(cd "$(dirname "$OUTPUT_JAR")" && pwd)/$(basename "$OUTPUT_JAR")"
}

# Create temporary directory
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

print_step "Extracting original JAR..."
cd "$TEMP_DIR"
jar -xf "$ABS_JAR_FILE"

print_step "Preparing static resources..."
# Create resources directory if it doesn't exist
mkdir -p META-INF/resources

# Remove existing frontend resources if any (preserve Quarkus files)
find META-INF/resources -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.svg" -o -name "*.png" -o -name "*.jpg" -o -name "*.ico" | xargs rm -f 2>/dev/null || true
rm -rf META-INF/resources/assets 2>/dev/null || true

# Copy frontend assets directly to META-INF/resources (Quarkus serves from here)
cp -r "$ABS_FRONTEND_DIST"/* META-INF/resources/

print_step "Repackaging JAR..."
# Repackage JAR with manifest
jar -cfm "$ABS_OUTPUT_JAR" META-INF/MANIFEST.MF .

print_success "Successfully created rebundled JAR: $OUTPUT_JAR"

# Show some info about the result
JAR_SIZE=$(du -h "$ABS_OUTPUT_JAR" | cut -f1)
print_success "Final JAR size: $JAR_SIZE"

# Verify static resources are included
if jar -tf "$ABS_OUTPUT_JAR" | grep -q "META-INF/resources/index.html"; then
    print_success "Frontend assets successfully embedded"
else
    print_warning "Could not verify frontend assets in JAR"
fi