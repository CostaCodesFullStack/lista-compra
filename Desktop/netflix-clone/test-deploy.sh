#!/bin/bash

# 🧪 Script de Teste Pós-Deploy - Netflix Clone
# Execute este script após fazer o deploy do backend e frontend

echo "🚀 Iniciando testes de deploy do Netflix Clone..."
echo ""

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para testar API
test_api() {
    local backend_url=$1
    echo -e "${YELLOW}🔍 Testando API do backend: $backend_url${NC}"
    
    response=$(curl -s "$backend_url/api/test")
    
    if [[ $response == *"Netflix Clone API funcionando"* ]]; then
        echo -e "${GREEN}✅ API funcionando corretamente${NC}"
        echo "Resposta: $response"
        return 0
    else
        echo -e "${RED}❌ API não está respondendo corretamente${NC}"
        echo "Resposta: $response"
        return 1
    fi
}

# Função para testar endpoints específicos
test_endpoints() {
    local backend_url=$1
    echo -e "${YELLOW}🔍 Testando endpoints específicos...${NC}"
    
    # Teste de categorias
    echo "Testando /api/categories..."
    categories_response=$(curl -s "$backend_url/api/categories")
    if [[ $categories_response == *"["* ]]; then
        echo -e "${GREEN}✅ Endpoint de categorias funcionando${NC}"
    else
        echo -e "${RED}❌ Endpoint de categorias com problema${NC}"
    fi
    
    # Teste de filmes
    echo "Testando /api/movies..."
    movies_response=$(curl -s "$backend_url/api/movies")
    if [[ $movies_response == *"movies"* ]]; then
        echo -e "${GREEN}✅ Endpoint de filmes funcionando${NC}"
    else
        echo -e "${RED}❌ Endpoint de filmes com problema${NC}"
    fi
}

# Função para testar frontend
test_frontend() {
    local frontend_url=$1
    echo -e "${YELLOW}🔍 Testando frontend: $frontend_url${NC}"
    
    response=$(curl -s -I "$frontend_url")
    
    if [[ $response == *"200 OK"* ]]; then
        echo -e "${GREEN}✅ Frontend carregando corretamente${NC}"
        return 0
    else
        echo -e "${RED}❌ Frontend com problema${NC}"
        echo "Resposta: $response"
        return 1
    fi
}

# Função principal
main() {
    echo "📋 Por favor, insira as URLs do seu deploy:"
    echo ""
    
    read -p "URL do Backend (ex: https://netflix-clone-backend.vercel.app): " BACKEND_URL
    read -p "URL do Frontend (ex: https://netflix-clone-frontend.vercel.app): " FRONTEND_URL
    
    echo ""
    echo "🧪 Iniciando testes..."
    echo ""
    
    # Teste do backend
    if test_api "$BACKEND_URL"; then
        test_endpoints "$BACKEND_URL"
    fi
    
    echo ""
    
    # Teste do frontend
    test_frontend "$FRONTEND_URL"
    
    echo ""
    echo "📊 Resumo dos testes:"
    echo "- Backend: $BACKEND_URL"
    echo "- Frontend: $FRONTEND_URL"
    echo ""
    echo "✅ Testes concluídos!"
    echo ""
    echo "🔗 Acesse seu Netflix Clone em: $FRONTEND_URL"
}

# Executar testes
main
