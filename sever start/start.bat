@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ================================
echo   千问 AI - 启动开发服务器
echo ================================
echo.
pnpm dev
pause
