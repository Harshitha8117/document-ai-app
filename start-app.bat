@echo off
title Document AI App Launcher

:: --- Step 1: Start backend ---
echo Starting backend server...
start cmd /k "cd /d %~dp0\backend && node server.js"

:: --- Step 2: Start frontend ---
echo Starting frontend...
start cmd /k "cd /d %~dp0\frontend && live-server"

echo All services started. Backend on http://localhost:5000
echo Frontend opened in default browser.
pause
