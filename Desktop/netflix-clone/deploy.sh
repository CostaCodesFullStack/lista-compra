#!/bin/bash

# 🚀 Script de Deploy Automatizado - Netflix Clone
# Este script automatiza o deploy do projeto na Vercel

echo "🎬 Iniciando deploy do Netflix Clone..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para imprimir mensagens coloridas
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    print_error "Vercel CLI não está instalado. Instalando..."
    npm install -g vercel
fi

# Verificar se está logado no Vercel
if ! vercel whoami &> /dev/null; then
    print_warning "Você precisa fazer login no Vercel primeiro."
    print_status "Execute: vercel login"
    exit 1
fi

print_status "Verificando estrutura do projeto..."

# Verificar se as pastas existem
if [ ! -d "backend" ]; then
    print_error "Pasta 'backend' não encontrada!"
    exit 1
fi

if [ ! -d "frontend" ]; then
    print_error "Pasta 'frontend' não encontrada!"
    exit 1
fi

print_success "Estrutura do projeto verificada!"

# Deploy do Backend
print_status "🚀 Fazendo deploy do backend..."
cd backend

# Verificar se package.json existe
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado na pasta backend!"
    exit 1
fi

# Deploy
vercel --prod --yes

if [ $? -eq 0 ]; then
    print_success "Backend deployado com sucesso!"
    BACKEND_URL=$(vercel ls | grep "netflix-clone-backend" | head -1 | awk '{print $2}')
    print_status "URL do Backend: https://$BACKEND_URL"
else
    print_error "Falha no deploy do backend!"
    exit 1
fi

cd ..

# Deploy do Frontend
print_status "🎨 Fazendo deploy do frontend..."
cd frontend

# Verificar se package.json existe
if [ ! -f "package.json" ]; then
    print_error "package.json não encontrado na pasta frontend!"
    exit 1
fi

# Deploy
vercel --prod --yes

if [ $? -eq 0 ]; then
    print_success "Frontend deployado com sucesso!"
    FRONTEND_URL=$(vercel ls | grep "netflix-clone-frontend" | head -1 | awk '{print $2}')
    print_status "URL do Frontend: https://$FRONTEND_URL"
else
    print_error "Falha no deploy do frontend!"
    exit 1
fi

cd ..

print_success "🎉 Deploy concluído com sucesso!"
print_status "📋 Próximos passos:"
print_status "1. Configure as variáveis de ambiente na Vercel"
print_status "2. Configure o MongoDB Atlas"
print_status "3. Teste a aplicação"
print_status ""
print_status "📖 Consulte o arquivo ENV_VARIABLES.md para mais detalhes"
