@echo off
title Portal LUME - Deploy Automatico
color 0B
cls

echo.
echo ========================================================
echo   PORTAL LUME REACT - DEPLOYMENT AUTOMATICO
echo ========================================================
echo.
echo Este script desplegara automaticamente en Railway.
echo.
echo Proceso:
echo  1. Verificar requisitos
echo  2. Commit cambios
echo  3. Push a GitHub
echo  4. Desplegar en Railway
echo.
timeout /t 3 /nobreak >nul

:: ────────────────────────────────────────────────────────
:: PASO 1: Verificar Node.js
:: ────────────────────────────────────────────────────────
echo.
echo [1/6] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] Node.js no instalado
    echo Descarga desde: https://nodejs.org
    pause
    exit /b 1
)
echo [OK] Node.js instalado
timeout /t 1 /nobreak >nul

:: ────────────────────────────────────────────────────────
:: PASO 2: Verificar/Instalar Railway CLI
:: ────────────────────────────────────────────────────────
echo.
echo [2/6] Verificando Railway CLI...
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] Railway CLI no encontrado. Instalando...
    call npm install -g @railway/cli
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] No se pudo instalar Railway CLI
        pause
        exit /b 1
    )
)
echo [OK] Railway CLI instalado
timeout /t 1 /nobreak >nul

:: ────────────────────────────────────────────────────────
:: PASO 3: Verificar sesion Railway
:: ────────────────────────────────────────────────────────
echo.
echo [3/6] Verificando sesion Railway...
railway whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo [INFO] No has iniciado sesion en Railway
    echo.
    echo Abriendo navegador para login...
    echo Sigue estos pasos:
    echo  1. Inicia sesion con GitHub
    echo  2. Autoriza Railway
    echo  3. VUELVE A ESTA VENTANA y presiona Enter
    echo.
    start "" railway login
    echo.
    pause
    
    :: Verificar de nuevo
    railway whoami >nul 2>&1
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] Login fallido
        pause
        exit /b 1
    )
)
echo [OK] Sesion activa
timeout /t 1 /nobreak >nul

:: ────────────────────────────────────────────────────────
:: PASO 4: Git commit y push
:: ────────────────────────────────────────────────────────
echo.
echo [4/6] Preparando codigo para despliegue...

:: Verificar si hay cambios
git status --porcelain | findstr "^" >nul
if %errorlevel% equ 0 (
    echo [INFO] Detectados cambios. Haciendo commit...
    git add .
    git commit -m "Deploy automatico - %date% %time%"
    if %errorlevel% neq 0 (
        echo [WARN] No se pudo hacer commit (posiblemente no hay cambios)
    )
)

echo [INFO] Subiendo a GitHub...
git push origin main
if %errorlevel% neq 0 (
    color 0E
    echo [WARN] Push fallido, pero continuando...
    timeout /t 2 /nobreak >nul
)
echo [OK] Codigo actualizado en GitHub
timeout /t 1 /nobreak >nul

:: ────────────────────────────────────────────────────────
:: PASO 5: Inicializar/Verificar proyecto Railway
:: ────────────────────────────────────────────────────────
echo.
echo [5/6] Configurando proyecto Railway...

if not exist ".railway" (
    echo [INFO] Proyecto no vinculado. Inicializando...
    echo.
    echo IMPORTANTE: Cuando aparezca el menu:
    echo  - Si ves tu proyecto: Seleccionalo
    echo  - Si no: Selecciona "Create new project"
    echo  - Usa las flechas y Enter
    echo.
    timeout /t 3 /nobreak >nul
    
    railway init
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] No se pudo inicializar proyecto
        echo.
        echo Solucion manual:
        echo  1. Ve a railway.app
        echo  2. New Project - Deploy from GitHub
        echo  3. Selecciona: lume-portal-react
        echo  4. Vuelve a ejecutar este script
        echo.
        pause
        exit /b 1
    )
)
echo [OK] Proyecto configurado
timeout /t 1 /nobreak >nul

:: ────────────────────────────────────────────────────────
:: PASO 6: Desplegar
:: ────────────────────────────────────────────────────────
echo.
echo [6/6] Desplegando en Railway...
echo.
echo Esto puede tomar 2-3 minutos...
echo Railway ejecutara:
echo  - npm install
echo  - npm run build  
echo  - npm start
echo.
timeout /t 2 /nobreak >nul

railway up

if %errorlevel% equ 0 (
    :: ── EXITO ──────────────────────────────────────────
    color 0A
    cls
    echo.
    echo ========================================================
    echo   DEPLOYMENT EXITOSO
    echo ========================================================
    echo.
    echo Portal LUME React desplegado correctamente en Railway
    echo.
    echo ────────────────────────────────────────────────────────
    echo   SIGUIENTE PASO: Obtener URL
    echo ────────────────────────────────────────────────────────
    echo.
    echo 1. Ve a: https://railway.app
    echo 2. Entra a tu proyecto "lume-portal-react"
    echo 3. Click en "Settings" (engranaje)
    echo 4. Seccion "Domains"
    echo 5. Click "Generate Domain"
    echo 6. Copia la URL generada
    echo.
    echo ────────────────────────────────────────────────────────
    echo   Caracteristicas Desplegadas
    echo ────────────────────────────────────────────────────────
    echo.
    echo  - Splash screen animado LUME
    echo  - 6 modulos del sistema
    echo  - Animaciones dock suaves
    echo  - Tema dia/noche
    echo  - Reloj en tiempo real
    echo  - Diseno responsive
    echo  - Auto-deploy activado
    echo.
    echo ────────────────────────────────────────────────────────
    echo   Comandos Utiles
    echo ────────────────────────────────────────────────────────
    echo.
    echo Ver logs:        railway logs
    echo Abrir proyecto:  railway open
    echo Estado:          railway status
    echo.
    echo Para futuros deploys: Solo ejecuta este .bat de nuevo
    echo.
) else (
    :: ── ERROR ─────────────────────────────────────────────
    color 0C
    cls
    echo.
    echo ========================================================
    echo   ERROR EN DEPLOYMENT
    echo ========================================================
    echo.
    echo El deploy fallo. Revisa el error arriba.
    echo.
    echo ────────────────────────────────────────────────────────
    echo   Solucion
    echo ────────────────────────────────────────────────────────
    echo.
    echo 1. Revisa los logs:
    echo    railway logs
    echo.
    echo 2. Verifica en railway.app:
    echo    - Tab "Deployments"
    echo    - Click en el deployment fallido
    echo    - Ve los logs completos
    echo.
    echo 3. Problemas comunes:
    echo    - Build timeout: Normal en primer deploy
    echo    - Module not found: package.json corrupto
    echo    - Port error: Verificar railway.json
    echo.
    echo 4. Intenta de nuevo:
    echo    Ejecuta este .bat otra vez
    echo.
)

pause
