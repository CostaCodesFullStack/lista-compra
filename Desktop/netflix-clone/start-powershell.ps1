Write-Host "🎬 Netflix Clone - Iniciando Frontend e Backend..." -ForegroundColor Green
Write-Host ""
Write-Host "📡 Backend: http://localhost:5000" -ForegroundColor Cyan
Write-Host "🌐 Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Pressione Ctrl+C para parar ambos os serviços" -ForegroundColor Yellow
Write-Host ""

# Iniciar backend em background
$backendJob = Start-Job -ScriptBlock {
    Set-Location "backend"
    npm run dev
}

# Aguardar um pouco para o backend iniciar
Start-Sleep -Seconds 3

# Iniciar frontend em background
$frontendJob = Start-Job -ScriptBlock {
    Set-Location "frontend"
    npm start
}

Write-Host "✅ Ambos os serviços foram iniciados!" -ForegroundColor Green
Write-Host ""
Write-Host "Para parar os serviços, pressione Ctrl+C" -ForegroundColor Yellow

try {
    # Aguardar indefinidamente
    while ($true) {
        Start-Sleep -Seconds 1
    }
} finally {
    # Parar os jobs quando o script for interrompido
    Stop-Job $backendJob, $frontendJob
    Remove-Job $backendJob, $frontendJob
    Write-Host "🛑 Serviços parados!" -ForegroundColor Red
}
