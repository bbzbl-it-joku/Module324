@echo off
setlocal enabledelayedexpansion

REM JAR Rebundling Script (Windows)
REM This script extracts a Quarkus uber-jar, adds frontend static assets, and repackages it

REM Check parameters
if "%~3"=="" (
    echo Usage: %0 ^<jar-file^> ^<frontend-dist-dir^> ^<output-jar^>
    echo.
    echo Example:
    echo   %0 backend-PROD-SNAPSHOT-runner.jar frontend\dist app.jar
    echo.
    exit /b 1
)

set "JAR_FILE=%~1"
set "FRONTEND_DIST=%~2"
set "OUTPUT_JAR=%~3"

REM Validate inputs
if not exist "%JAR_FILE%" (
    echo [X] JAR file not found: %JAR_FILE%
    exit /b 1
)

if not exist "%FRONTEND_DIST%" (
    echo [X] Frontend dist directory not found: %FRONTEND_DIST%
    exit /b 1
)

REM Check if jar command is available
jar -version >nul 2>&1
if errorlevel 1 (
    echo [X] jar command not found. Please ensure Java JDK is installed.
    exit /b 1
)

echo [*] Rebundling JAR with frontend assets
echo   Source JAR: %JAR_FILE%
echo   Frontend: %FRONTEND_DIST%
echo   Output: %OUTPUT_JAR%

REM Create temporary directory
set "TEMP_DIR=%TEMP%\rebundle_%RANDOM%"
mkdir "%TEMP_DIR%"

REM Extract original JAR
echo [*] Extracting original JAR...
pushd "%TEMP_DIR%"
jar -xf "%~f1"
if errorlevel 1 (
    echo [X] Failed to extract JAR
    popd
    rmdir /s /q "%TEMP_DIR%"
    exit /b 1
)

REM Prepare static resources
echo [*] Preparing static resources...
if exist "META-INF\resources\*" (
    for /d %%d in ("META-INF\resources\*") do rmdir /s /q "%%d" 2>nul
    for %%f in ("META-INF\resources\*") do del "%%f" 2>nul
)

REM Copy frontend assets directly to META-INF/resources (Quarkus serves from here)
xcopy /e /i "%~f2\*" "META-INF\resources\" >nul
if errorlevel 1 (
    echo [X] Failed to copy frontend assets
    popd
    rmdir /s /q "%TEMP_DIR%"
    exit /b 1
)

REM Repackage JAR
echo [*] Repackaging JAR...
jar -cfm "%~f3" "META-INF\MANIFEST.MF" .
if errorlevel 1 (
    echo [X] Failed to repackage JAR
    popd
    rmdir /s /q "%TEMP_DIR%"
    exit /b 1
)

popd
rmdir /s /q "%TEMP_DIR%"

echo [√] Successfully created rebundled JAR: %OUTPUT_JAR%

REM Show JAR size
for %%A in ("%OUTPUT_JAR%") do echo [√] Final JAR size: %%~zA bytes

REM Verify static resources are included
jar -tf "%OUTPUT_JAR%" | findstr /c:"META-INF/resources/index.html" >nul
if not errorlevel 1 (
    echo [√] Frontend assets successfully embedded
) else (
    echo [!] Could not verify frontend assets in JAR
)

endlocal