# 🧪 Script de Teste Pós-Deploy - Netflix Clone (PowerShell)
# Execute este script após fazer o deploy do backend e frontend

Write-Host "🚀 Iniciando testes de deploy do Netflix Clone..." -ForegroundColor Cyan
Write-Host ""

# Função para testar API
function Test-Api {
    param($BackendUrl)
    
    Write-Host "🔍 Testando API do backend: $BackendUrl" -ForegroundColor Yellow
    
    try {
        $response = Invoke-RestMethod -Uri "$BackendUrl/api/test" -Method Get -TimeoutSec 10
        
        if ($response.message -like "*Netflix Clone API funcionando*") {
            Write-Host "✅ API funcionando corretamente" -ForegroundColor Green
            Write-Host "Resposta: $($response | ConvertTo-Json -Compress)" -ForegroundColor Gray
            return $true
        } else {
            Write-Host "❌ API não está respondendo corretamente" -ForegroundColor Red
            Write-Host "Resposta: $($response | ConvertTo-Json -Compress)" -ForegroundColor Gray
            return $false
        }
    }
    catch {
        Write-Host "❌ Erro ao conectar com a API: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Função para testar endpoints específicos
function Test-Endpoints {
    param($BackendUrl)
    
    Write-Host "🔍 Testando endpoints específicos..." -ForegroundColor Yellow
    
    # Teste de categorias
    Write-Host "Testando /api/categories..."
    try {
        $categoriesResponse = Invoke-RestMethod -Uri "$BackendUrl/api/categories" -Method Get -TimeoutSec 10
        if ($categoriesResponse) {
            Write-Host "✅ Endpoint de categorias funcionando" -ForegroundColor Green
        } else {
            Write-Host "❌ Endpoint de categorias com problema" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "❌ Erro no endpoint de categorias: $($_.Exception.Message)" -ForegroundColor Red
    }
    
    # Teste de filmes
    Write-Host "Testando /api/movies..."
    try {
        $moviesResponse = Invoke-RestMethod -Uri "$BackendUrl/api/movies" -Method Get -TimeoutSec 10
        if ($moviesResponse.movies) {
            Write-Host "✅ Endpoint de filmes funcionando" -ForegroundColor Green
        } else {
            Write-Host "❌ Endpoint de filmes com problema" -ForegroundColor Red
        }
    }
    catch {
        Write-Host "❌ Erro no endpoint de filmes: $($_.Exception.Message)" -ForegroundColor Red
    }
}

# Função para testar frontend
function Test-Frontend {
    param($FrontendUrl)
    
    Write-Host "🔍 Testando frontend: $FrontendUrl" -ForegroundColor Yellow
    
    try {
        $response = Invoke-WebRequest -Uri $FrontendUrl -Method Head -TimeoutSec 10
        
        if ($response.StatusCode -eq 200) {
            Write-Host "✅ Frontend carregando corretamente" -ForegroundColor Green
            return $true
        } else {
            Write-Host "❌ Frontend com problema - Status: $($response.StatusCode)" -ForegroundColor Red
            return $false
        }
    }
    catch {
        Write-Host "❌ Erro ao conectar com o frontend: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Função principal
function Main {
    Write-Host "📋 Por favor, insira as URLs do seu deploy:" -ForegroundColor Cyan
    Write-Host ""
    
    $backendUrl = Read-Host "URL do Backend (ex: https://netflix-clone-backend.vercel.app)"
    $frontendUrl = Read-Host "URL do Frontend (ex: https://netflix-clone-frontend.vercel.app)"
    
    Write-Host ""
    Write-Host "🧪 Iniciando testes..." -ForegroundColor Cyan
    Write-Host ""
    
    # Teste do backend
    if (Test-Api -BackendUrl $backendUrl) {
        Test-Endpoints -BackendUrl $backendUrl
    }
    
    Write-Host ""
    
    # Teste do frontend
    Test-Frontend -FrontendUrl $frontendUrl
    
    Write-Host ""
    Write-Host "📊 Resumo dos testes:" -ForegroundColor Cyan
    Write-Host "- Backend: $backendUrl" -ForegroundColor Gray
    Write-Host "- Frontend: $frontendUrl" -ForegroundColor Gray
    Write-Host ""
    Write-Host "✅ Testes concluídos!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🔗 Acesse seu Netflix Clone em: $frontendUrl" -ForegroundColor Yellow
}

# Executar testes
Main
