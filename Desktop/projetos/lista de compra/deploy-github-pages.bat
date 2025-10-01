@echo off
echo 🚀 Iniciando deploy para GitHub Pages...
echo.

echo 📦 Instalando dependências do cliente...
cd client
call npm install
if %errorlevel% neq 0 (
    echo ❌ Erro ao instalar dependências
    pause
    exit /b 1
)

echo.
echo 🔨 Fazendo build da aplicação React...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ Erro no build
    pause
    exit /b 1
)

echo.
echo 🚀 Fazendo deploy para GitHub Pages...
call npm run deploy
if %errorlevel% neq 0 (
    echo ❌ Erro no deploy
    pause
    exit /b 1
)

echo.
echo ✅ Deploy concluído com sucesso!
echo 🌐 Acesse: https://jpepo.github.io/lista-de-compras
echo.
pause
