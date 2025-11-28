# CI/CD Scripts

This directory contains scripts and configurations used in the CI/CD pipeline.

## Files

### `Dockerfile`
Docker configuration for the final application image. Uses the rebundled JAR file to create a lightweight runtime container.

### `rebundle.sh` / `rebundle.bat`
JAR rebundling scripts that combine a Quarkus uber-jar with frontend static assets.

**Usage:**
```bash
# Unix/Linux/macOS
./rebundle.sh <jar-file> <frontend-dist-dir> <output-jar>

# Windows
rebundle.bat <jar-file> <frontend-dist-dir> <output-jar>
```

**Example:**
```bash
./rebundle.sh ../backend/target/backend-PROD-SNAPSHOT-runner.jar ../frontend/dist ../dist/app.jar
```

**What it does:**
1. Extracts the original Quarkus uber-jar
2. Removes any existing static resources
3. Adds frontend build artifacts to `META-INF/resources/static/`
4. Repackages the JAR with the original manifest
5. Creates a single JAR that serves both API and web UI

This process mirrors what the `deploy-artifacts.yml` workflow does in GitHub Actions, allowing the backend JAR to serve the frontend files directly from the classpath.

## Pipeline Integration

These scripts are designed to be used in:
- **Local development**: Via the main `build.sh`/`build.bat` scripts
- **CI/CD pipelines**: Used in `.github/workflows/deploy-artifacts.yml`
- **Manual deployment**: For custom build processes

### GitHub Actions Integration

The `rebundle.sh` script is used in the GitHub Actions pipeline:

```yaml
- name: Make rebundle script executable
  run: chmod +x ci/rebundle.sh

- name: Rebundle JAR using script
  run: |
    JAR_FILE=$(find ./backend-jar -name "*-runner.jar" | head -1)
    ./ci/rebundle.sh "$JAR_FILE" ./frontend-dist ./app.jar
```

This replaces the previous manual rebundling steps and ensures consistency between local builds and CI/CD.

The rebundled JAR can be deployed anywhere Java 21+ is available and will serve the complete application on port 8080.