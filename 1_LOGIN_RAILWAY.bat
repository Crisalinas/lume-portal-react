@echo off
title Railway - Login
color 0B
echo.
echo ========================================================
echo   Railway Login
echo ========================================================
echo.
echo Se abrira el navegador para que inicies sesion.
echo.
echo Pasos:
echo  1. Inicia sesion con GitHub
echo  2. Autoriza Railway
echo  3. Vuelve a esta ventana
echo.
pause

railway login

if %errorlevel% equ 0 (
    color 0A
    echo.
    echo ========================================================
    echo   Login exitoso
    echo ========================================================
    echo.
    echo Ahora ejecuta: 2_DEPLOY_RAILWAY.bat
    echo.
) else (
    color 0C
    echo.
    echo Error en el login
    echo.
)

pause
