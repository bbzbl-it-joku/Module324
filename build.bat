@echo off
setlocal enabledelayedexpansion

REM Build Script for Snake Game Application (Windows)
REM This script compiles both frontend and backend, similar to the CI/CD pipeline

REM Configuration
set "PROJECT_ROOT=%~dp0"
set "FRONTEND_DIR=%PROJECT_ROOT%frontend"
set "BACKEND_DIR=%PROJECT_ROOT%backend"
set "OUTPUT_DIR=%PROJECT_ROOT%dist"

echo Snake Game Build Script (Windows)
echo ==============================

:check_prerequisites
echo [*] Checking prerequisites...

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo [X] Node.js is not installed. Please install Node.js 20 or higher.
    exit /b 1
)

REM Check npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo [X] npm is not installed. Please install npm.
    exit /b 1
)

REM Check Java
java -version >nul 2>&1
if errorlevel 1 (
    echo [X] Java is not installed. Please install Java 21 or higher.
    exit /b 1
)

REM Check Maven wrapper
if not exist "%BACKEND_DIR%\mvnw.cmd" (
    echo [X] Maven wrapper not found in backend directory.
    exit /b 1
)

echo [√] All prerequisites are available

:clean_build
echo [*] Cleaning previous builds...

REM Clean output directory
if exist "%OUTPUT_DIR%" rmdir /s /q "%OUTPUT_DIR%"
mkdir "%OUTPUT_DIR%"

REM Clean backend
cd /d "%BACKEND_DIR%"
call mvnw.cmd clean >nul 2>&1

REM Clean frontend
cd /d "%FRONTEND_DIR%"
if exist "dist" rmdir /s /q "dist"
if exist "node_modules" (
    echo [!] Removing node_modules (will be reinstalled)
    rmdir /s /q "node_modules"
)

echo [√] Cleaned previous builds

:build_frontend
echo [*] Building frontend...

cd /d "%FRONTEND_DIR%"

echo [*] Installing frontend dependencies...
call npm ci --silent
if errorlevel 1 (
    echo [X] Frontend dependency installation failed
    exit /b 1
)

echo [*] Building frontend for production...
call npm run build
if errorlevel 1 (
    echo [X] Frontend build failed
    exit /b 1
)

REM Copy built files to output directory
xcopy /e /i "dist\*" "%OUTPUT_DIR%\" >nul

echo [√] Frontend build completed

:build_backend
echo [*] Building backend...

cd /d "%BACKEND_DIR%"

echo [*] Installing backend dependencies...
call mvnw.cmd dependency:go-offline -B -q
if errorlevel 1 (
    echo [X] Backend dependency installation failed
    exit /b 1
)

echo [*] Running tests...
call mvnw.cmd test -q
if errorlevel 1 (
    echo [X] Backend tests failed
    exit /b 1
)

echo [*] Building production JAR with uber-jar profile...
call mvnw.cmd clean package -Pprod -DskipTests -q
if errorlevel 1 (
    echo [X] Backend build failed
    exit /b 1
)

REM Find the uber-jar file
for /r "target" %%f in (*-runner.jar) do (
    set "BACKEND_JAR=%%f"
    set "FOUND_JAR=1"
    goto :jar_found
)

if not defined FOUND_JAR (
    echo [X] Could not find uber-jar file
    exit /b 1
)

:jar_found
echo [√] Backend uber-jar build completed: %BACKEND_JAR%

:rebundle_jar
echo [*] Rebundling JAR with frontend assets...

cd /d "%PROJECT_ROOT%"

REM Use the rebundle script to combine backend JAR with frontend assets
call "%PROJECT_ROOT%\ci\rebundle.bat" "%BACKEND_JAR%" "%FRONTEND_DIR%\dist" "%OUTPUT_DIR%\app.jar"
if errorlevel 1 (
    echo [X] JAR rebundling failed
    exit /b 1
)

echo [√] Rebundled JAR created: %OUTPUT_DIR%\app.jar

:show_summary
echo.
echo ========================================
echo          BUILD COMPLETED SUCCESSFULLY   
echo ========================================
echo.
echo Build artifacts:
echo   📁 Output directory: %OUTPUT_DIR%
echo   ☕ Rebundled JAR: app.jar (backend + frontend combined)
echo      └─ Contains backend uber-jar with embedded frontend assets
echo      └─ Serves both API and web UI from single JAR
echo.
echo To run the application:
echo   java -jar %OUTPUT_DIR%\app.jar
echo.
echo The application will be available at:
echo   🌐 Web UI: http://localhost:8080
echo   🔌 API: http://localhost:8080/api
echo.

goto :eof

:show_help
echo Usage: %0 [OPTIONS]
echo Options:
echo   --no-clean    Skip cleaning previous builds
echo   --help        Show this help message
echo.
echo This script creates a rebundled JAR containing both backend and frontend.
goto :eof

REM Handle command line arguments
if "%1"=="--help" goto :show_help
if "%1"=="-h" goto :show_help

REM Parse arguments (simple version for batch)
if "%1"=="--no-clean" (
    goto :main_no_clean
) else (
    goto :main_with_clean
)

:main_with_clean
call :check_prerequisites
call :clean_build
call :build_frontend
call :build_backend
call :rebundle_jar
call :show_summary
goto :eof

:main_no_clean
call :check_prerequisites
call :build_frontend
call :build_backend
call :rebundle_jar
call :show_summary

endlocal