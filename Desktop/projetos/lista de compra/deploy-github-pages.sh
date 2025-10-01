#!/bin/bash

echo "🚀 Iniciando deploy para GitHub Pages..."
echo

echo "📦 Instalando dependências do cliente..."
cd client
npm install
if [ $? -ne 0 ]; then
    echo "❌ Erro ao instalar dependências"
    exit 1
fi

echo
echo "🔨 Fazendo build da aplicação React..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Erro no build"
    exit 1
fi

echo
echo "🚀 Fazendo deploy para GitHub Pages..."
npm run deploy
if [ $? -ne 0 ]; then
    echo "❌ Erro no deploy"
    exit 1
fi

echo
echo "✅ Deploy concluído com sucesso!"
echo "🌐 Acesse: https://jpepo.github.io/lista-de-compras"
echo
