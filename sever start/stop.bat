@echo off
chcp 65001 >nul
echo 正在关闭端口 3266 上的服务器...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3266" ^| findstr "LISTENING"') do (
    echo 终止进程 PID: %%a
    taskkill /PID %%a /F >nul 2>&1
)
echo 已关闭。
pause
