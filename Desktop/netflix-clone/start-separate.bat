@echo off
echo 🎬 Netflix Clone - Iniciando Frontend e Backend...
echo.
echo 📡 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo.
echo Pressione Ctrl+C para parar ambos os serviços
echo.

start "Backend" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak >nul
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo ✅ Ambos os serviços foram iniciados em janelas separadas!
echo.
pause
