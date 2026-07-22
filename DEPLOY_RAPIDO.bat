@echo off
title Portal LUME - Deploy Rapido
color 0B
echo.
echo ========================================================
echo   Portal LUME React - Deploy Rapido
echo ========================================================
echo.
echo Este script:
echo  1. Hace commit de los cambios actuales
echo  2. Push a GitHub
echo  3. Railway despliega automaticamente
echo.
echo IMPORTANTE: Solo funciona si ya desplegaste antes
echo y Railway esta conectado al repositorio GitHub.
echo.
pause

:: ── Git Status ─────────────────────────────────────────────
echo.
echo [1/4] Verificando cambios...
git status
echo.

:: ── Git Add ────────────────────────────────────────────────
echo.
echo [2/4] Preparando archivos...
git add .
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] No se pudieron agregar los archivos
    pause
    exit /b 1
)
echo [OK] Archivos preparados

:: ── Git Commit ─────────────────────────────────────────────
echo.
echo [3/4] Creando commit...
set /p mensaje="Mensaje del commit (o Enter para 'Actualizacion'): "
if "%mensaje%"=="" set mensaje=Actualizacion del portal

git commit -m "%mensaje%"
if %errorlevel% neq 0 (
    echo [INFO] No hay cambios para hacer commit
    echo.
    echo Verificando si hay commits pendientes de push...
    git status | find "Your branch is ahead"
    if %errorlevel% equ 0 (
        echo [INFO] Hay commits pendientes. Procediendo con push...
    ) else (
        echo [INFO] No hay cambios pendientes
        pause
        exit /b 0
    )
) else (
    echo [OK] Commit creado
)

:: ── Git Push ───────────────────────────────────────────────
echo.
echo [4/4] Subiendo a GitHub y desplegando...
echo.
git push origin main
if %errorlevel% neq 0 (
    color 0C
    echo [ERROR] No se pudo hacer push a GitHub
    echo.
    echo Verifica:
    echo  - Tienes conexion a internet
    echo  - Tienes permisos en el repositorio
    echo  - No hay conflictos
    echo.
    pause
    exit /b 1
)

:: ── EXITO ──────────────────────────────────────────────────
color 0A
echo.
echo ========================================================
echo   EXITO - Cambios subidos a GitHub
echo ========================================================
echo.
echo Railway esta desplegando automaticamente...
echo.
echo En 2-3 minutos tu portal estara actualizado.
echo.
echo Para ver el progreso:
echo  1. Ve a railway.app
echo  2. Entra a tu proyecto
echo  3. Tab "Deployments"
echo  4. Ve los logs en tiempo real
echo.
echo O ejecuta desde aqui:
echo   railway logs
echo.
pause
