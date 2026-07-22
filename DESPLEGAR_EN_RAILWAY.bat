@echo off
title Portal LUME React - Desplegar en Railway
color 0A
echo.
echo ========================================================
echo   Portal LUME React - Desplegar en Railway
echo ========================================================
echo.
echo IMPORTANTE: 
echo - Necesitas tener una cuenta en railway.app
echo - El codigo ya esta en GitHub (Crisalinas/lume-portal-react)
echo.
pause

:: ── PASO 1: Verificar Node.js ─────────────────────────────
echo.
echo [1/5] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    color 0E
    echo.
    echo Node.js no esta instalado. Es necesario para Railway CLI.
    echo.
    echo Descargalo desde: https://nodejs.org
    echo Instala la version LTS con todas las opciones por defecto.
    echo Luego cierra esta ventana y vuelve a ejecutar el .bat
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js encontrado

:: ── PASO 2: Instalar Railway CLI ──────────────────────────
echo.
echo [2/5] Verificando Railway CLI...
railway --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Railway CLI no encontrado. Instalando...
    npm install -g @railway/cli
    if %errorlevel% neq 0 (
        color 0C
        echo [ERROR] No se pudo instalar Railway CLI
        echo Intenta ejecutar este .bat como Administrador
        echo (clic derecho en el .bat - Ejecutar como administrador)
        pause
        exit /b 1
    )
)
echo [OK] Railway CLI instalado

:: ── PASO 3: Login en Railway ──────────────────────────────
echo.
echo [3/5] Iniciando sesion en Railway...
echo.
echo Se abrira el navegador para que inicies sesion en Railway.
echo.
echo INSTRUCCIONES:
echo 1. Inicia sesion con GitHub cuando se abra la pagina
echo 2. Autoriza Railway para acceder a tus repositorios
echo 3. Vuelve a esta ventana
echo.
pause

railway login
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] No se pudo iniciar sesion en Railway
    pause
    exit /b 1
)
echo [OK] Sesion iniciada en Railway

:: ── PASO 4: Crear/Vincular Proyecto ────────────────────────
echo.
echo [4/5] Configurando el proyecto en Railway...
echo.

:: Verificar si ya existe vinculacion
if exist ".railway" (
    echo [INFO] Proyecto ya vinculado anteriormente
    echo.
    echo Desvinculando para reconectar...
    rd /s /q .railway
)

echo.
echo OPCION 1: Si YA TIENES un proyecto en Railway:
echo   - Seleccionalo de la lista que aparecera
echo.
echo OPCION 2: Si NO TIENES proyecto creado todavia:
echo   - Presiona Ctrl+C para cancelar
echo   - Ve a railway.app
echo   - New Project - Deploy from GitHub repo
echo   - Selecciona: Crisalinas/lume-portal-react
echo   - Espera a que termine el deploy inicial
echo   - Vuelve a ejecutar este .bat
echo.
pause

railway link
if %errorlevel% neq 0 (
    color 0E
    echo.
    echo [INFO] No hay proyecto vinculado.
    echo.
    echo Creando nuevo proyecto desde GitHub...
    echo.
    
    :: Intentar crear proyecto nuevo
    echo Iniciando railway init...
    railway init
    
    if %errorlevel% neq 0 (
        color 0C
        echo.
        echo [ERROR] No se pudo crear el proyecto.
        echo.
        echo Solucion manual:
        echo   1. Ve a railway.app
        echo   2. Click "New Project"
        echo   3. Selecciona "Deploy from GitHub repo"
        echo   4. Busca: lume-portal-react
        echo   5. Click en "Crisalinas/lume-portal-react"
        echo   6. Click "Deploy"
        echo   7. Vuelve a ejecutar este .bat
        echo.
        pause
        exit /b 1
    )
)

echo [OK] Proyecto configurado

:: ── PASO 5: Desplegar ──────────────────────────────────────
echo.
echo [5/5] Desplegando Portal LUME en Railway...
echo.
echo Esto puede tardar 2-3 minutos...
echo Railway ejecutara:
echo   - npm install
echo   - npm run build
echo   - npm start
echo.

railway up --detach
if %errorlevel% neq 0 (
    color 0C
    echo.
    echo [ERROR] El despliegue fallo.
    echo.
    echo Revisa los logs en railway.app para ver el error especifico.
    echo O ejecuta: railway logs
    echo.
    pause
    exit /b 1
)

:: ── EXITO ──────────────────────────────────────────────────
color 0A
echo.
echo ========================================================
echo   EXITO - Portal LUME desplegado en Railway
echo ========================================================
echo.
echo El Portal LUME React esta corriendo en la nube.
echo.
echo SIGUIENTE PASO - Obtener tu URL publica:
echo.
echo   1. Ve a railway.app
echo   2. Entra a tu proyecto lume-portal-react
echo   3. Click en "Settings" (engranaje)
echo   4. Seccion "Domains"
echo   5. Click "Generate Domain"
echo   6. Railway te dara una URL como:
echo      https://lume-portal-react-production.up.railway.app
echo.
echo Para ver los logs en tiempo real:
echo   railway logs
echo.
echo Para futuros despliegues (despues de cambios):
echo   git add .
echo   git commit -m "Actualizacion"
echo   git push origin main
echo   (Railway desplegara automaticamente)
echo.
echo O ejecuta de nuevo este .bat
echo.
echo ========================================================
echo   Caracteristicas del Portal Desplegado
echo ========================================================
echo.
echo  - Splash screen animado con logo LUME
echo  - 6 modulos del sistema
echo  - Animaciones dock suaves
echo  - Tema dia/noche
echo  - Reloj en tiempo real
echo  - Diseno responsive
echo  - Auto-deploy configurado
echo.
pause
