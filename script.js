// Calculadora de IMC Avançada
class IMCCalculator {
    constructor() {
        this.currentUnit = 'metric';
        this.history = this.loadHistory();
        this.weightGoal = this.loadWeightGoal();
        this.chart = null;
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
        this.renderHistory();
        this.updateChart();
    }

    initializeElements() {
        // Form elements
        this.form = document.getElementById('imcForm');
        this.weightInput = document.getElementById('weight');
        this.heightInput = document.getElementById('height');
        this.weightUnit = document.getElementById('weightUnit');
        this.heightUnit = document.getElementById('heightUnit');
        
        // Result elements
        this.resultDiv = document.getElementById('imcResult');
        this.imcValue = document.getElementById('imcValue');
        this.imcCategory = document.getElementById('imcCategory');
        this.imcAdvice = document.getElementById('imcAdvice');
        this.indicatorFill = document.getElementById('indicatorFill');
        this.indicatorMarker = document.getElementById('indicatorMarker');
        
        // Advanced features
        this.idealWeightDiv = document.getElementById('idealWeight');
        this.weightGoalInput = document.getElementById('weightGoal');
        this.setGoalBtn = document.getElementById('setGoalBtn');
        this.goalProgress = document.getElementById('goalProgress');
        this.healthTips = document.getElementById('healthTips');
        
        // History elements
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        this.exportCSVBtn = document.getElementById('exportCSV');
        this.historyChart = document.getElementById('historyChart');
        this.evolutionChart = document.getElementById('evolutionChart');
        
        // Share elements
        this.shareResultBtn = document.getElementById('shareResult');
        
        // Reminder elements
        this.enableRemindersCheckbox = document.getElementById('enableReminders');
        this.reminderOptions = document.getElementById('reminderOptions');
        this.reminderFrequency = document.getElementById('reminderFrequency');
        this.reminderTime = document.getElementById('reminderTime');
        
        // Health integration elements
        this.tabButtons = document.querySelectorAll('.tab-btn');
        this.tabContents = document.querySelectorAll('.tab-content');
        this.foodSearchInput = document.getElementById('foodSearch');
        this.searchFoodBtn = document.getElementById('searchFood');
        this.nutritionResults = document.getElementById('nutritionResults');
        this.recipeCategory = document.getElementById('recipeCategory');
        this.loadRecipesBtn = document.getElementById('loadRecipes');
        this.recipesResults = document.getElementById('recipesResults');
        this.exerciseType = document.getElementById('exerciseType');
        this.exerciseIntensity = document.getElementById('exerciseIntensity');
        this.loadExercisesBtn = document.getElementById('loadExercises');
        this.exercisesResults = document.getElementById('exercisesResults');
        this.ageInput = document.getElementById('age');
        this.genderSelect = document.getElementById('gender');
        this.activityLevelSelect = document.getElementById('activityLevel');
        this.calculateCaloriesBtn = document.getElementById('calculateCalories');
        this.calorieResults = document.getElementById('calorieResults');
        
        // Theme toggle
        this.themeToggle = document.getElementById('themeToggle');
        
        // Unit toggles
        this.unitToggles = document.querySelectorAll('input[name="unit"]');
    }

    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Unit toggle
        this.unitToggles.forEach(toggle => {
            toggle.addEventListener('change', (e) => this.handleUnitChange(e));
        });
        
        // Weight goal
        this.setGoalBtn.addEventListener('click', () => this.setWeightGoal());
        
        // Clear history
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        
        // Export CSV
        this.exportCSVBtn.addEventListener('click', () => this.exportToCSV());
        
        // Share result
        this.shareResultBtn.addEventListener('click', () => this.shareResult());
        
        // Reminders
        this.enableRemindersCheckbox.addEventListener('change', () => this.toggleReminders());
        this.reminderFrequency.addEventListener('change', () => this.updateReminderSettings());
        this.reminderTime.addEventListener('change', () => this.updateReminderSettings());
        
        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
        
        // Input validation
        this.weightInput.addEventListener('input', () => this.validateInputs());
        this.heightInput.addEventListener('input', () => this.validateInputs());
        
        // Health integration events
        this.tabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });
        
        this.searchFoodBtn.addEventListener('click', () => this.searchFood());
        this.foodSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.searchFood();
        });
        
        this.loadRecipesBtn.addEventListener('click', () => this.loadRecipes());
        this.loadExercisesBtn.addEventListener('click', () => this.loadExercises());
        this.calculateCaloriesBtn.addEventListener('click', () => this.calculateCalories());
    }

    // Cálculo do IMC
    calculateBMI(weight, height) {
        if (this.currentUnit === 'imperial') {
            // Converter libras para kg e pés para metros
            weight = weight * 0.453592;
            height = height * 0.3048;
        }
        
        if (height <= 0) return 0;
        return weight / (height * height);
    }

    // Classificação do IMC
    getBMICategory(bmi) {
        if (bmi < 18.5) return {
            category: 'Abaixo do peso',
            color: 'var(--imc-underweight)',
            advice: 'Seu IMC indica que você está abaixo do peso ideal. Consulte um nutricionista para um plano alimentar adequado e pratique exercícios de fortalecimento muscular.'
        };
        if (bmi < 25) return {
            category: 'Peso normal',
            color: 'var(--imc-normal)',
            advice: 'Parabéns! Seu IMC está na faixa considerada saudável. Mantenha uma alimentação equilibrada e pratique exercícios regularmente.'
        };
        if (bmi < 30) return {
            category: 'Sobrepeso',
            color: 'var(--imc-overweight)',
            advice: 'Seu IMC indica sobrepeso. Considere ajustar sua alimentação e aumentar a prática de exercícios físicos. Consulte um profissional de saúde.'
        };
        if (bmi < 35) return {
            category: 'Obesidade Grau I',
            color: 'var(--imc-obesity1)',
            advice: 'Seu IMC indica obesidade grau I. É importante buscar orientação médica e nutricional para um plano de emagrecimento saudável.'
        };
        if (bmi < 40) return {
            category: 'Obesidade Grau II',
            color: 'var(--imc-obesity2)',
            advice: 'Seu IMC indica obesidade grau II. Recomenda-se acompanhamento médico especializado para um tratamento adequado.'
        };
        return {
            category: 'Obesidade Grau III',
            color: 'var(--imc-obesity3)',
            advice: 'Seu IMC indica obesidade grau III. É essencial buscar acompanhamento médico especializado imediatamente.'
        };
    }

    // Cálculo do peso ideal
    calculateIdealWeight(height) {
        if (this.currentUnit === 'imperial') {
            height = height * 0.3048; // Converter pés para metros
        }
        
        const minWeight = 18.5 * height * height;
        const maxWeight = 24.9 * height * height;
        
        if (this.currentUnit === 'imperial') {
            return {
                min: (minWeight / 0.453592).toFixed(1),
                max: (maxWeight / 0.453592).toFixed(1),
                unit: 'lb'
            };
        }
        
        return {
            min: minWeight.toFixed(1),
            max: maxWeight.toFixed(1),
            unit: 'kg'
        };
    }

    // Validação de inputs
    validateInputs() {
        const weight = parseFloat(this.weightInput.value);
        const height = parseFloat(this.heightInput.value);
        
        // Validações básicas
        if (weight && (weight <= 0 || weight > 1000)) {
            this.weightInput.style.borderColor = 'var(--danger-color)';
        } else {
            this.weightInput.style.borderColor = 'var(--border-color)';
        }
        
        if (height && (height <= 0 || height > 3)) {
            this.heightInput.style.borderColor = 'var(--danger-color)';
        } else {
            this.heightInput.style.borderColor = 'var(--border-color)';
        }
    }

    // Manipulação do formulário
    handleSubmit(e) {
        e.preventDefault();
        
        const weight = parseFloat(this.weightInput.value);
        const height = parseFloat(this.heightInput.value);
        
        if (!weight || !height || weight <= 0 || height <= 0) {
            alert('Por favor, insira valores válidos para peso e altura.');
            return;
        }
        
        const bmi = this.calculateBMI(weight, height);
        this.displayResult(bmi, weight, height);
        this.addToHistory(bmi, weight, height);
        this.updateAdvancedFeatures(weight, height);
    }

    // Exibição do resultado
    displayResult(bmi, weight, height) {
        const category = this.getBMICategory(bmi);
        
        this.imcValue.textContent = bmi.toFixed(1);
        this.imcCategory.textContent = category.category;
        this.imcCategory.style.color = category.color;
        this.imcAdvice.textContent = category.advice;
        
        // Atualizar indicador visual
        this.updateVisualIndicator(bmi);
        
        // Mostrar resultado com animação
        this.resultDiv.classList.remove('hidden');
        this.resultDiv.classList.add('fade-in');
    }

    // Atualizar indicador visual
    updateVisualIndicator(bmi) {
        let position = 0;
        
        if (bmi < 18.5) position = (bmi / 18.5) * 20;
        else if (bmi < 25) position = 20 + ((bmi - 18.5) / 6.5) * 20;
        else if (bmi < 30) position = 40 + ((bmi - 25) / 5) * 20;
        else if (bmi < 35) position = 60 + ((bmi - 30) / 5) * 20;
        else if (bmi < 40) position = 80 + ((bmi - 35) / 5) * 20;
        else position = 100;
        
        this.indicatorMarker.style.left = `${Math.min(position, 100)}%`;
    }

    // Mudança de unidade
    handleUnitChange(e) {
        this.currentUnit = e.target.value;
        this.updateDisplay();
        this.updateUnitToggleVisual();
    }

    // Atualizar visual do toggle de unidades
    updateUnitToggleVisual() {
        const labels = document.querySelectorAll('.toggle-label');
        labels.forEach(label => {
            const input = label.querySelector('input[type="radio"]');
            if (input.value === this.currentUnit) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    }

    updateDisplay() {
        if (this.currentUnit === 'imperial') {
            this.weightUnit.textContent = 'lb';
            this.heightUnit.textContent = 'ft';
            this.weightInput.placeholder = '0.0';
            this.heightInput.placeholder = '0.00';
        } else {
            this.weightUnit.textContent = 'kg';
            this.heightUnit.textContent = 'm';
            this.weightInput.placeholder = '0.0';
            this.heightInput.placeholder = '0.00';
        }
        
        // Limpar inputs
        this.weightInput.value = '';
        this.heightInput.value = '';
        this.resultDiv.classList.add('hidden');
        
        // Atualizar visual do toggle
        this.updateUnitToggleVisual();
    }

    // Funcionalidades avançadas
    updateAdvancedFeatures(weight, height) {
        this.updateIdealWeight(height);
        this.updateHealthTips(weight, height);
        this.updateWeightGoal(weight);
    }

    updateIdealWeight(height) {
        const ideal = this.calculateIdealWeight(height);
        this.idealWeightDiv.innerHTML = `
            <p><strong>Faixa de peso saudável:</strong></p>
            <p>${ideal.min} - ${ideal.max} ${ideal.unit}</p>
        `;
    }

    updateHealthTips(weight, height) {
        const bmi = this.calculateBMI(weight, height);
        let tips = [];
        
        if (bmi < 18.5) {
            tips = [
                '• Consulte um nutricionista para um plano alimentar adequado',
                '• Pratique exercícios de fortalecimento muscular',
                '• Mantenha uma alimentação rica em nutrientes',
                '• Evite pular refeições'
            ];
        } else if (bmi < 25) {
            tips = [
                '• Mantenha uma alimentação equilibrada',
                '• Pratique exercícios regularmente (150 min/semana)',
                '• Beba bastante água',
                '• Durma bem (7-9 horas por noite)'
            ];
        } else if (bmi < 30) {
            tips = [
                '• Reduza o consumo de alimentos processados',
                '• Aumente a prática de exercícios físicos',
                '• Controle o tamanho das porções',
                '• Consulte um nutricionista'
            ];
        } else {
            tips = [
                '• Busque acompanhamento médico especializado',
                '• Consulte um nutricionista para um plano personalizado',
                '• Pratique exercícios com supervisão profissional',
                '• Mantenha um diário alimentar'
            ];
        }
        
        this.healthTips.innerHTML = `
            <ul style="margin: 0; padding-left: 1.5rem;">
                ${tips.map(tip => `<li style="margin-bottom: 0.5rem;">${tip}</li>`).join('')}
            </ul>
        `;
    }

    setWeightGoal() {
        const goal = parseFloat(this.weightGoalInput.value);
        if (!goal || goal <= 0) {
            alert('Por favor, insira uma meta de peso válida.');
            return;
        }
        
        this.weightGoal = goal;
        localStorage.setItem('weightGoal', goal);
        this.updateWeightGoal();
    }

    updateWeightGoal(currentWeight = null) {
        if (!this.weightGoal) {
            this.goalProgress.classList.add('hidden');
            return;
        }
        
        if (!currentWeight) {
            this.goalProgress.classList.add('hidden');
            return;
        }
        
        const difference = currentWeight - this.weightGoal;
        const status = difference > 0 ? 'acima' : 'abaixo';
        const absDifference = Math.abs(difference).toFixed(1);
        
        this.goalProgress.innerHTML = `
            <p><strong>Meta:</strong> ${this.weightGoal} kg</p>
            <p><strong>Status:</strong> ${absDifference} kg ${status} da meta</p>
        `;
        this.goalProgress.classList.remove('hidden');
    }

    // Sistema de histórico
    addToHistory(bmi, weight, height) {
        const entry = {
            id: Date.now(),
            date: new Date().toISOString(),
            bmi: bmi,
            weight: weight,
            height: height,
            unit: this.currentUnit
        };
        
        this.history.unshift(entry);
        this.saveHistory();
        this.renderHistory();
        this.updateChart();
    }

    renderHistory() {
        if (this.history.length === 0) {
            this.historyList.innerHTML = '<p class="empty-state">Nenhuma medição registrada ainda</p>';
            this.historyChart.classList.add('hidden');
            return;
        }
        
        this.historyList.innerHTML = this.history.map(entry => {
            const date = new Date(entry.date).toLocaleDateString('pt-BR');
            const category = this.getBMICategory(entry.bmi);
            
            return `
                <div class="history-item slide-in">
                    <div class="history-item-info">
                        <div class="history-item-date">${date}</div>
                        <div class="history-item-values">
                            ${entry.weight} ${entry.unit === 'imperial' ? 'lb' : 'kg'} / 
                            ${entry.height} ${entry.unit === 'imperial' ? 'ft' : 'm'}
                        </div>
                    </div>
                    <div class="history-item-imc" style="color: ${category.color}">
                        ${entry.bmi.toFixed(1)}
                    </div>
                </div>
            `;
        }).join('');
        
        this.historyChart.classList.remove('hidden');
    }

    updateChart() {
        if (this.history.length < 2) {
            this.historyChart.classList.add('hidden');
            return;
        }
        
        const ctx = this.evolutionChart.getContext('2d');
        
        if (this.chart) {
            this.chart.destroy();
        }
        
        const sortedHistory = [...this.history].reverse();
        const labels = sortedHistory.map(entry => 
            new Date(entry.date).toLocaleDateString('pt-BR')
        );
        const bmiData = sortedHistory.map(entry => entry.bmi);
        
        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'IMC',
                    data: bmiData,
                    borderColor: 'var(--primary-color)',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: 'var(--primary-color)',
                    pointBorderColor: 'white',
                    pointBorderWidth: 2,
                    pointRadius: 6,
                    pointHoverRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: Math.max(0, Math.min(...bmiData) - 5),
                        max: Math.max(...bmiData) + 5,
                        grid: {
                            color: 'var(--border-color)'
                        },
                        ticks: {
                            color: 'var(--text-secondary)'
                        }
                    },
                    x: {
                        grid: {
                            color: 'var(--border-color)'
                        },
                        ticks: {
                            color: 'var(--text-secondary)'
                        }
                    }
                }
            }
        });
    }

    clearHistory() {
        if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
            this.history = [];
            this.saveHistory();
            this.renderHistory();
            this.updateChart();
        }
    }

    // Tema escuro/claro
    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Armazenamento local
    saveHistory() {
        localStorage.setItem('imcHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('imcHistory');
        return saved ? JSON.parse(saved) : [];
    }

    loadWeightGoal() {
        return parseFloat(localStorage.getItem('weightGoal')) || null;
    }

    // Inicialização do tema
    initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        
        const icon = this.themeToggle.querySelector('i');
        icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Exportar dados para CSV
    exportToCSV() {
        if (this.history.length === 0) {
            alert('Nenhum dado para exportar. Faça pelo menos uma medição primeiro.');
            return;
        }

        const headers = ['Data', 'Peso', 'Altura', 'IMC', 'Categoria', 'Unidade'];
        const csvContent = [
            headers.join(','),
            ...this.history.map(entry => {
                const date = new Date(entry.date).toLocaleDateString('pt-BR');
                const category = this.getBMICategory(entry.bmi).category;
                const unit = entry.unit === 'imperial' ? 'Imperial' : 'Métrico';
                return [
                    `"${date}"`,
                    entry.weight,
                    entry.height,
                    entry.bmi.toFixed(1),
                    `"${category}"`,
                    `"${unit}"`
                ].join(',');
            })
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `imc_historico_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Compartilhar resultado
    async shareResult() {
        const currentBMI = this.imcValue.textContent;
        const category = this.imcCategory.textContent;
        
        if (!currentBMI || currentBMI === '0.0') {
            alert('Calcule seu IMC primeiro para compartilhar o resultado.');
            return;
        }

        const shareText = `Meu IMC é ${currentBMI} - ${category}. Calculado com a Calculadora de IMC Avançada!`;
        const shareUrl = window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Meu Resultado de IMC',
                    text: shareText,
                    url: shareUrl
                });
            } catch (err) {
                console.log('Erro ao compartilhar:', err);
                this.fallbackShare(shareText, shareUrl);
            }
        } else {
            this.fallbackShare(shareText, shareUrl);
        }
    }

    // Compartilhamento alternativo (cópia para área de transferência)
    fallbackShare(text, url) {
        const shareText = `${text}\n\n${url}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('Resultado copiado para a área de transferência!');
            }).catch(() => {
                this.showShareModal(shareText);
            });
        } else {
            this.showShareModal(shareText);
        }
    }

    // Modal de compartilhamento
    showShareModal(text) {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        `;
        
        modal.innerHTML = `
            <div style="
                background: var(--bg-primary);
                padding: 2rem;
                border-radius: var(--radius-lg);
                max-width: 500px;
                width: 90%;
                box-shadow: var(--shadow-xl);
            ">
                <h3 style="margin-bottom: 1rem; color: var(--text-primary);">Compartilhar Resultado</h3>
                <textarea readonly style="
                    width: 100%;
                    height: 100px;
                    padding: 1rem;
                    border: 1px solid var(--border-color);
                    border-radius: var(--radius-md);
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                    resize: none;
                    margin-bottom: 1rem;
                ">${text}</textarea>
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button id="copyText" style="
                        padding: 0.75rem 1.5rem;
                        background: var(--primary-color);
                        color: white;
                        border: none;
                        border-radius: var(--radius-md);
                        cursor: pointer;
                    ">Copiar</button>
                    <button id="closeModal" style="
                        padding: 0.75rem 1.5rem;
                        background: var(--text-muted);
                        color: white;
                        border: none;
                        border-radius: var(--radius-md);
                        cursor: pointer;
                    ">Fechar</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('#copyText').addEventListener('click', () => {
            const textarea = modal.querySelector('textarea');
            textarea.select();
            document.execCommand('copy');
            alert('Texto copiado para a área de transferência!');
        });
        
        modal.querySelector('#closeModal').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    // Sistema de lembretes
    toggleReminders() {
        const isEnabled = this.enableRemindersCheckbox.checked;
        this.reminderOptions.classList.toggle('hidden', !isEnabled);
        
        if (isEnabled) {
            this.setupReminders();
        } else {
            this.clearReminders();
        }
        
        localStorage.setItem('remindersEnabled', isEnabled);
    }

    setupReminders() {
        const frequency = this.reminderFrequency.value;
        const time = this.reminderTime.value;
        
        this.clearReminders();
        
        const reminderSettings = {
            frequency,
            time,
            enabled: true
        };
        
        localStorage.setItem('reminderSettings', JSON.stringify(reminderSettings));
        
        // Configurar notificação
        this.scheduleReminder(frequency, time);
    }

    scheduleReminder(frequency, time) {
        const [hours, minutes] = time.split(':').map(Number);
        const now = new Date();
        const reminderTime = new Date();
        reminderTime.setHours(hours, minutes, 0, 0);
        
        // Se o horário já passou hoje, agendar para amanhã
        if (reminderTime <= now) {
            reminderTime.setDate(reminderTime.getDate() + 1);
        }
        
        const timeUntilReminder = reminderTime.getTime() - now.getTime();
        
        setTimeout(() => {
            this.showReminderNotification();
            this.scheduleNextReminder(frequency, time);
        }, timeUntilReminder);
    }

    scheduleNextReminder(frequency, time) {
        const intervals = {
            daily: 24 * 60 * 60 * 1000,
            weekly: 7 * 24 * 60 * 60 * 1000,
            monthly: 30 * 24 * 60 * 60 * 1000
        };
        
        const interval = intervals[frequency];
        if (interval) {
            setInterval(() => {
                this.showReminderNotification();
            }, interval);
        }
    }

    showReminderNotification() {
        if (Notification.permission === 'granted') {
            new Notification('Lembrete de IMC', {
                body: 'Hora de medir seu peso e altura! Acompanhe sua evolução.',
                icon: '/icon-192.png'
            });
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    this.showReminderNotification();
                }
            });
        }
    }

    clearReminders() {
        // Limpar todos os timeouts e intervals
        for (let i = 1; i < 10000; i++) {
            clearTimeout(i);
            clearInterval(i);
        }
        
        localStorage.removeItem('reminderSettings');
    }

    updateReminderSettings() {
        if (this.enableRemindersCheckbox.checked) {
            this.setupReminders();
        }
    }

    // Carregar configurações de lembretes
    loadReminderSettings() {
        const enabled = localStorage.getItem('remindersEnabled') === 'true';
        const settings = JSON.parse(localStorage.getItem('reminderSettings') || '{}');
        
        this.enableRemindersCheckbox.checked = enabled;
        this.reminderOptions.classList.toggle('hidden', !enabled);
        
        if (settings.frequency) {
            this.reminderFrequency.value = settings.frequency;
        }
        if (settings.time) {
            this.reminderTime.value = settings.time;
        }
        
        if (enabled) {
            this.setupReminders();
        }
    }

    // Health Integration Methods
    
    // Tab switching
    switchTab(tabName) {
        // Remove active class from all tabs and contents
        this.tabButtons.forEach(btn => btn.classList.remove('active'));
        this.tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    // Food search using Edamam Nutrition API (free tier)
    async searchFood() {
        const query = this.foodSearchInput.value.trim();
        if (!query) {
            alert('Digite um alimento para buscar');
            return;
        }

        this.showLoading(this.nutritionResults);
        
        try {
            // Using a mock API response since we don't have API keys
            // In a real implementation, you would use actual APIs like:
            // - Edamam Nutrition API
            // - USDA Food Database
            // - Spoonacular API
            
            const mockNutritionData = this.getMockNutritionData(query);
            this.displayNutritionResults(mockNutritionData);
        } catch (error) {
            this.showError(this.nutritionResults, 'Erro ao buscar informações nutricionais');
        }
    }

    getMockNutritionData(query) {
        // Mock data for demonstration
        const mockData = {
            'maçã': {
                name: 'Maçã',
                calories: 52,
                protein: 0.3,
                carbs: 14,
                fat: 0.2,
                fiber: 2.4,
                sugar: 10.4
            },
            'frango': {
                name: 'Peito de Frango',
                calories: 165,
                protein: 31,
                carbs: 0,
                fat: 3.6,
                fiber: 0,
                sugar: 0
            },
            'arroz': {
                name: 'Arroz Branco',
                calories: 130,
                protein: 2.7,
                carbs: 28,
                fat: 0.3,
                fiber: 0.4,
                sugar: 0.1
            },
            'banana': {
                name: 'Banana',
                calories: 89,
                protein: 1.1,
                carbs: 23,
                fat: 0.3,
                fiber: 2.6,
                sugar: 12.2
            }
        };

        return mockData[query.toLowerCase()] || {
            name: query,
            calories: Math.floor(Math.random() * 200) + 50,
            protein: Math.floor(Math.random() * 20) + 1,
            carbs: Math.floor(Math.random() * 30) + 5,
            fat: Math.floor(Math.random() * 10) + 1,
            fiber: Math.floor(Math.random() * 5) + 1,
            sugar: Math.floor(Math.random() * 15) + 1
        };
    }

    displayNutritionResults(data) {
        this.nutritionResults.innerHTML = `
            <div class="nutrition-item">
                <h4>${data.name}</h4>
                <div class="nutrition-info">
                    <div class="nutrition-value">
                        <div class="label">Calorias</div>
                        <div class="value">${data.calories}</div>
                    </div>
                    <div class="nutrition-value">
                        <div class="label">Proteína</div>
                        <div class="value">${data.protein}g</div>
                    </div>
                    <div class="nutrition-value">
                        <div class="label">Carboidratos</div>
                        <div class="value">${data.carbs}g</div>
                    </div>
                    <div class="nutrition-value">
                        <div class="label">Gordura</div>
                        <div class="value">${data.fat}g</div>
                    </div>
                    <div class="nutrition-value">
                        <div class="label">Fibra</div>
                        <div class="value">${data.fiber}g</div>
                    </div>
                    <div class="nutrition-value">
                        <div class="label">Açúcar</div>
                        <div class="value">${data.sugar}g</div>
                    </div>
                </div>
            </div>
        `;
    }

    // Load healthy recipes
    async loadRecipes() {
        const category = this.recipeCategory.value;
        this.showLoading(this.recipesResults);
        
        try {
            const recipes = this.getMockRecipes(category);
            this.displayRecipes(recipes);
        } catch (error) {
            this.showError(this.recipesResults, 'Erro ao carregar receitas');
        }
    }

    getMockRecipes(category) {
        const allRecipes = {
            'breakfast': [
                {
                    name: 'Aveia com Frutas',
                    time: '10 min',
                    servings: 1,
                    calories: 320,
                    description: 'Aveia integral com banana, morangos e mel. Rico em fibras e energia.'
                },
                {
                    name: 'Omelete de Vegetais',
                    time: '15 min',
                    servings: 1,
                    calories: 280,
                    description: 'Omelete com espinafre, tomate e queijo cottage. Proteína de alta qualidade.'
                }
            ],
            'lunch': [
                {
                    name: 'Salada de Quinoa',
                    time: '20 min',
                    servings: 2,
                    calories: 450,
                    description: 'Quinoa com vegetais frescos, grão-de-bico e molho de limão.'
                },
                {
                    name: 'Salmão Grelhado',
                    time: '25 min',
                    servings: 2,
                    calories: 380,
                    description: 'Salmão com brócolis e batata-doce assada. Rico em ômega-3.'
                }
            ],
            'dinner': [
                {
                    name: 'Frango com Vegetais',
                    time: '30 min',
                    servings: 2,
                    calories: 350,
                    description: 'Peito de frango grelhado com mix de vegetais no vapor.'
                },
                {
                    name: 'Sopa de Legumes',
                    time: '35 min',
                    servings: 4,
                    calories: 180,
                    description: 'Sopa cremosa de abóbora, cenoura e batata-doce.'
                }
            ],
            'snack': [
                {
                    name: 'Mix de Castanhas',
                    time: '5 min',
                    servings: 1,
                    calories: 200,
                    description: 'Amêndoas, nozes e castanhas-do-pará. Gorduras boas e proteína.'
                },
                {
                    name: 'Iogurte com Granola',
                    time: '5 min',
                    servings: 1,
                    calories: 250,
                    description: 'Iogurte grego com granola caseira e frutas vermelhas.'
                }
            ]
        };

        return category ? allRecipes[category] : Object.values(allRecipes).flat();
    }

    displayRecipes(recipes) {
        this.recipesResults.innerHTML = recipes.map(recipe => `
            <div class="recipe-item">
                <h4>${recipe.name}</h4>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${recipe.time}</span>
                    <span><i class="fas fa-users"></i> ${recipe.servings} porções</span>
                    <span><i class="fas fa-fire"></i> ${recipe.calories} cal</span>
                </div>
                <div class="recipe-description">${recipe.description}</div>
            </div>
        `).join('');
    }

    // Load exercises
    async loadExercises() {
        const type = this.exerciseType.value;
        const intensity = this.exerciseIntensity.value;
        this.showLoading(this.exercisesResults);
        
        try {
            const exercises = this.getMockExercises(type, intensity);
            this.displayExercises(exercises);
        } catch (error) {
            this.showError(this.exercisesResults, 'Erro ao carregar exercícios');
        }
    }

    getMockExercises(type, intensity) {
        const allExercises = {
            'cardio': [
                {
                    name: 'Caminhada Rápida',
                    duration: '30-45 min',
                    intensity: 'Moderada',
                    calories: '200-300',
                    description: 'Caminhada em ritmo acelerado. Ideal para iniciantes e queima de gordura.'
                },
                {
                    name: 'Corrida',
                    duration: '20-30 min',
                    intensity: 'Alta',
                    calories: '300-500',
                    description: 'Corrida em ritmo constante. Excelente para condicionamento cardiovascular.'
                },
                {
                    name: 'Ciclismo',
                    duration: '30-60 min',
                    intensity: 'Moderada',
                    calories: '250-400',
                    description: 'Pedalada ao ar livre ou indoor. Trabalha pernas e glúteos.'
                }
            ],
            'strength': [
                {
                    name: 'Flexões',
                    duration: '15-20 min',
                    intensity: 'Moderada',
                    calories: '100-200',
                    description: 'Exercício clássico para peitoral, tríceps e ombros. Pode ser adaptado para iniciantes.'
                },
                {
                    name: 'Agachamentos',
                    duration: '15-20 min',
                    intensity: 'Moderada',
                    calories: '150-250',
                    description: 'Exercício fundamental para pernas e glúteos. Melhora força e resistência.'
                },
                {
                    name: 'Prancha',
                    duration: '10-15 min',
                    intensity: 'Alta',
                    calories: '80-150',
                    description: 'Exercício isométrico para core. Fortalece abdômen e estabilidade.'
                }
            ],
            'flexibility': [
                {
                    name: 'Yoga',
                    duration: '30-60 min',
                    intensity: 'Baixa',
                    calories: '100-200',
                    description: 'Prática que combina posturas, respiração e meditação. Melhora flexibilidade e relaxamento.'
                },
                {
                    name: 'Pilates',
                    duration: '45-60 min',
                    intensity: 'Moderada',
                    calories: '150-250',
                    description: 'Foco em força, flexibilidade e controle. Trabalha core e postura.'
                },
                {
                    name: 'Alongamento',
                    duration: '15-30 min',
                    intensity: 'Baixa',
                    calories: '50-100',
                    description: 'Exercícios de alongamento estático. Melhora flexibilidade e reduz tensão.'
                }
            ],
            'balance': [
                {
                    name: 'Tai Chi',
                    duration: '30-45 min',
                    intensity: 'Baixa',
                    calories: '100-150',
                    description: 'Arte marcial suave que melhora equilíbrio, coordenação e concentração.'
                },
                {
                    name: 'Exercícios de Equilíbrio',
                    duration: '15-20 min',
                    intensity: 'Moderada',
                    calories: '80-120',
                    description: 'Exercícios específicos para melhorar equilíbrio e estabilidade.'
                }
            ]
        };

        let exercises = Object.values(allExercises).flat();
        
        if (type) {
            exercises = allExercises[type] || [];
        }
        
        if (intensity) {
            exercises = exercises.filter(ex => 
                (intensity === 'beginner' && ex.intensity === 'Baixa') ||
                (intensity === 'intermediate' && ex.intensity === 'Moderada') ||
                (intensity === 'advanced' && ex.intensity === 'Alta')
            );
        }
        
        return exercises;
    }

    displayExercises(exercises) {
        this.exercisesResults.innerHTML = exercises.map(exercise => `
            <div class="exercise-item">
                <h4>${exercise.name}</h4>
                <div class="exercise-meta">
                    <span><i class="fas fa-clock"></i> ${exercise.duration}</span>
                    <span><i class="fas fa-signal"></i> ${exercise.intensity}</span>
                    <span><i class="fas fa-fire"></i> ${exercise.calories} cal</span>
                </div>
                <div class="exercise-description">${exercise.description}</div>
            </div>
        `).join('');
    }

    // Calculate daily calories
    calculateCalories() {
        const age = parseInt(this.ageInput.value);
        const gender = this.genderSelect.value;
        const activityLevel = parseFloat(this.activityLevelSelect.value);
        const weight = parseFloat(this.weightInput.value);
        const height = parseFloat(this.heightInput.value);
        
        if (!age || !weight || !height) {
            alert('Preencha todos os campos necessários (idade, peso e altura)');
            return;
        }

        // Convert height to cm if in imperial
        let heightCm = height;
        if (this.currentUnit === 'imperial') {
            heightCm = height * 30.48; // feet to cm
        } else {
            heightCm = height * 100; // meters to cm
        }

        // Convert weight to kg if in imperial
        let weightKg = weight;
        if (this.currentUnit === 'imperial') {
            weightKg = weight * 0.453592; // pounds to kg
        }

        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender === 'male') {
            bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
        } else {
            bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
        }

        // Calculate TDEE (Total Daily Energy Expenditure)
        const tdee = bmr * activityLevel;

        // Calculate macronutrient distribution
        const protein = Math.round(weightKg * 1.6); // 1.6g per kg body weight
        const proteinCalories = protein * 4;
        const fat = Math.round(tdee * 0.25 / 9); // 25% of calories from fat
        const fatCalories = fat * 9;
        const carbCalories = tdee - proteinCalories - fatCalories;
        const carbs = Math.round(carbCalories / 4);

        this.displayCalorieResults({
            bmr: Math.round(bmr),
            tdee: Math.round(tdee),
            protein,
            carbs,
            fat,
            proteinCalories: Math.round(proteinCalories),
            carbCalories: Math.round(carbCalories),
            fatCalories: Math.round(fatCalories)
        });
    }

    displayCalorieResults(data) {
        this.calorieResults.innerHTML = `
            <h5>Suas Necessidades Calóricas Diárias</h5>
            <div class="calorie-breakdown">
                <div class="calorie-item">
                    <div class="label">Taxa Metabólica Basal</div>
                    <div class="value">${data.bmr}</div>
                </div>
                <div class="calorie-item">
                    <div class="label">Calorias Totais</div>
                    <div class="value">${data.tdee}</div>
                </div>
                <div class="calorie-item">
                    <div class="label">Proteína</div>
                    <div class="value">${data.protein}g</div>
                </div>
                <div class="calorie-item">
                    <div class="label">Carboidratos</div>
                    <div class="value">${data.carbs}g</div>
                </div>
                <div class="calorie-item">
                    <div class="label">Gordura</div>
                    <div class="value">${data.fat}g</div>
                </div>
            </div>
            <div style="margin-top: 1rem; padding: 1rem; background: var(--bg-secondary); border-radius: var(--radius-md); font-size: 0.875rem; color: var(--text-secondary);">
                <strong>Dicas:</strong><br>
                • Para perder peso: consuma ${Math.round(data.tdee - 500)} calorias/dia<br>
                • Para ganhar peso: consuma ${Math.round(data.tdee + 500)} calorias/dia<br>
                • Beba pelo menos 2-3 litros de água por dia
            </div>
        `;
        this.calorieResults.classList.remove('hidden');
    }

    // Utility methods
    showLoading(element) {
        element.innerHTML = '<div class="loading">Carregando...</div>';
    }

    showError(element, message) {
        element.innerHTML = `<div class="error-message">${message}</div>`;
    }
}

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    const calculator = new IMCCalculator();
    calculator.initTheme();
    calculator.loadReminderSettings();
    
    // Adicionar animações de entrada
    document.querySelectorAll('.calculator-card, .feature-card, .history-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});

// Adicionar suporte a PWA básico
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}
