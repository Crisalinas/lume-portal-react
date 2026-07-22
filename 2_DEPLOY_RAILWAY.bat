@echo off
title Railway - Deploy Portal LUME
color 0B
echo.
echo ========================================================
echo   Portal LUME - Deploy en Railway
echo ========================================================
echo.

:: Verificar login
railway whoami >nul 2>&1
if %errorlevel% neq 0 (
    color 0C
    echo ERROR: No has iniciado sesion en Railway
    echo.
    echo Ejecuta primero: 1_LOGIN_RAILWAY.bat
    echo.
    pause
    exit /b 1
)

echo [1/3] Verificando sesion de Railway...
railway whoami
echo.

echo [2/3] Inicializando proyecto...
echo.
echo Se abrira una ventana para seleccionar/crear proyecto.
echo.
echo OPCIONES:
echo  - Si ya tienes el proyecto: Seleccionalo
echo  - Si no: Selecciona "Create new project"
echo.
pause

railway init

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo ERROR: No se pudo inicializar el proyecto
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Desplegando en Railway...
echo.
echo Esto tomara 2-3 minutos...
echo.

railway up

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ========================================================
    echo   DEPLOY EXITOSO
    echo ========================================================
    echo.
    echo Portal LUME desplegado correctamente.
    echo.
    echo SIGUIENTE PASO:
    echo  1. Ve a railway.app
    echo  2. Entra a tu proyecto
    echo  3. Settings - Domains - Generate Domain
    echo  4. Copia la URL generada
    echo.
    echo Para ver logs:
    echo   railway logs
    echo.
) else (
    color 0C
    echo.
    echo ERROR: El deploy fallo
    echo.
    echo Revisa los logs con: railway logs
    echo.
)

pause
