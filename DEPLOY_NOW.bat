@echo off
cls
echo ========================================================
echo   PORTAL LUME - DEPLOY AUTOMATICO
echo ========================================================
echo.

:: Verificar Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no instalado
    pause
    exit /b 1
)
echo [OK] Node.js

:: Verificar Railway
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Instalando Railway CLI...
    npm install -g @railway/cli
)
echo [OK] Railway CLI

:: Verificar login
railway whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Necesitas iniciar sesion en Railway
    echo Se abrira el navegador...
    echo.
    echo Pasos:
    echo 1. Inicia sesion con GitHub
    echo 2. Autoriza Railway
    echo 3. Vuelve aqui y presiona Enter
    echo.
    railway login
    pause
)

:: Git push
echo.
echo Subiendo codigo a GitHub...
git add .
git commit -m "Deploy %date% %time%" >nul 2>&1
git push origin main

:: Deploy
echo.
echo Desplegando en Railway...
echo.

if not exist ".railway" (
    echo Inicializando proyecto...
    railway init
)

railway up

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo   DEPLOY EXITOSO
    echo ========================================================
    echo.
    echo Siguiente paso:
    echo 1. Ve a railway.app
    echo 2. Settings - Domains - Generate Domain
    echo.
) else (
    echo.
    echo ERROR: Deploy fallido
    echo Revisa: railway logs
    echo.
)

pause
