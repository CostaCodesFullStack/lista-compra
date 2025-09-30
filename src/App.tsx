import React, { useState, useEffect } from 'react';
import './App.css';

interface IMCResult {
  imc: number;
  classification: string;
  color: string;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const AnimatedBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.1,
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;
          
          // Wrap around screen edges
          if (newX > window.innerWidth) newX = 0;
          if (newX < 0) newX = window.innerWidth;
          if (newY > window.innerHeight) newY = 0;
          if (newY < 0) newY = window.innerHeight;
          
          return {
            ...particle,
            x: newX,
            y: newY,
          };
        })
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animated-background">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
          }}
        />
      ))}
      <div className="gradient-orb orb-1"></div>
      <div className="gradient-orb orb-2"></div>
      <div className="gradient-orb orb-3"></div>
    </div>
  );
};

function App() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<IMCResult | null>(null);
  const [error, setError] = useState<string>('');

  const calculateIMC = (): void => {
    setError('');
    
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weight || !height) {
      setError('😊 Ops! Preciso que você preencha os dois campos para calcularmos juntos');
      return;
    }

    if (isNaN(weightNum) || isNaN(heightNum)) {
      setError('🤔 Parece que você digitou algo que não é um número. Que tal tentar novamente?');
      return;
    }

    if (weightNum <= 0 || heightNum <= 0) {
      setError('💡 Lembre-se: peso e altura precisam ser valores positivos para o cálculo funcionar');
      return;
    }

    if (heightNum < 0.5 || heightNum > 3) {
      setError('📏 A altura deve estar entre 0,5m e 3,0m. Verifique se você digitou corretamente');
      return;
    }

    if (weightNum < 10 || weightNum > 500) {
      setError('⚖️ O peso deve estar entre 10kg e 500kg. Confira se você digitou o valor certo');
      return;
    }

    const imc = weightNum / (heightNum * heightNum);
    const classification = getIMCClassification(imc);
    const color = getIMCColor(imc);

    setResult({
      imc: Math.round(imc * 10) / 10,
      classification,
      color
    });
  };

  const getIMCClassification = (imc: number): string => {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso ideal';
    if (imc < 30) return 'Sobrepeso';
    if (imc < 35) return 'Obesidade grau I';
    if (imc < 40) return 'Obesidade grau II';
    return 'Obesidade grau III';
  };

  const getEncouragingMessage = (imc: number): string => {
    if (imc < 18.5) return '💪 Que tal focar em uma alimentação equilibrada e exercícios de força? Você está no caminho certo!';
    if (imc < 25) return '🎉 Parabéns! Você está em uma faixa de peso saudável. Continue mantendo seus bons hábitos!';
    if (imc < 30) return '🌟 Você está quase lá! Pequenos ajustes na alimentação e mais movimento podem fazer toda a diferença!';
    if (imc < 35) return '💚 Lembre-se: cada pequeno passo conta! Consulte um profissional de saúde para um plano personalizado.';
    if (imc < 40) return '🤝 Você não está sozinho nessa jornada! Busque apoio de profissionais qualificados.';
    return '💙 Sua saúde é importante! Vamos trabalhar juntos para alcançar seus objetivos com acompanhamento médico.';
  };

  const getHealthTips = (imc: number): string[] => {
    if (imc < 18.5) return [
      '🥗 Inclua mais proteínas e gorduras saudáveis na sua alimentação',
      '🏋️‍♀️ Pratique exercícios de musculação para ganhar massa muscular',
      '⏰ Faça refeições regulares ao longo do dia'
    ];
    if (imc < 25) return [
      '🎯 Mantenha sua rotina atual de exercícios',
      '🥗 Continue com uma alimentação variada e colorida',
      '😴 Priorize uma boa noite de sono'
    ];
    if (imc < 30) return [
      '🚶‍♀️ Caminhe pelo menos 30 minutos por dia',
      '🥗 Reduza gradualmente o consumo de alimentos processados',
      '💧 Beba mais água ao longo do dia'
    ];
    if (imc < 35) return [
      '👨‍⚕️ Consulte um nutricionista para um plano alimentar personalizado',
      '🏃‍♀️ Comece com atividades físicas leves e aumente gradualmente',
      '🧘‍♀️ Pratique técnicas de relaxamento para reduzir o estresse'
    ];
    if (imc < 40) return [
      '🏥 Busque acompanhamento médico especializado',
      '👥 Considere participar de grupos de apoio',
      '📱 Use aplicativos para monitorar sua alimentação e exercícios'
    ];
    return [
      '🏥 É essencial o acompanhamento médico regular',
      '👨‍⚕️ Consulte uma equipe multidisciplinar (médico, nutricionista, psicólogo)',
      '💙 Lembre-se: sua saúde mental é tão importante quanto a física'
    ];
  };

  const getIMCColor = (imc: number): string => {
    if (imc < 18.5) return '#4CAF50'; // Verde
    if (imc < 25) return '#8BC34A'; // Verde claro
    if (imc < 30) return '#FFC107'; // Amarelo
    if (imc < 35) return '#FF9800'; // Laranja
    if (imc < 40) return '#FF5722'; // Vermelho claro
    return '#F44336'; // Vermelho
  };

  const resetCalculator = (): void => {
    setWeight('');
    setHeight('');
    setResult(null);
    setError('');
  };

  return (
    <div className="App">
      <AnimatedBackground />
      <div className="calculator-container">
        <h1 className="title">💚 Sua Calculadora de IMC</h1>
        <p className="subtitle">Vamos cuidar da sua saúde juntos! ✨</p>
        
        <div className="form-container">
          <div className="input-group">
            <label htmlFor="weight">⚖️ Qual é o seu peso? (kg)</label>
            <input
              id="weight"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="Ex: 70"
              step="0.1"
              min="10"
              max="500"
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="height">📏 E a sua altura? (m)</label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="Ex: 1.75"
              step="0.01"
              min="0.5"
              max="3"
            />
          </div>
          
          <div className="button-group">
            <button onClick={calculateIMC} className="calculate-btn">
              🧮 Vamos calcular!
            </button>
            <button onClick={resetCalculator} className="reset-btn">
              🔄 Começar novamente
            </button>
          </div>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {result && (
          <div className="result-container">
            <h2>📊 Seu Resultado</h2>
            <div className="imc-display" style={{ color: result.color }}>
              {result.imc}
            </div>
            <div className="classification" style={{ color: result.color }}>
              {result.classification}
            </div>
            <div className="encouraging-message">
              {getEncouragingMessage(result.imc)}
            </div>
            <div className="health-tips">
              <h4>💡 Dicas para você:</h4>
              <ul>
                {getHealthTips(result.imc).map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="info-container">
          <h3>📋 Referência de Classificação</h3>
          <p className="info-subtitle">Entenda melhor o que significa cada faixa de IMC</p>
          <div className="classification-table">
            <div className="classification-item">
              <span className="range">Abaixo de 18,5</span>
              <span className="status">Abaixo do peso</span>
            </div>
            <div className="classification-item">
              <span className="range">18,5 - 24,9</span>
              <span className="status normal">Peso ideal</span>
            </div>
            <div className="classification-item">
              <span className="range">25,0 - 29,9</span>
              <span className="status">Sobrepeso</span>
            </div>
            <div className="classification-item">
              <span className="range">30,0 - 34,9</span>
              <span className="status">Obesidade grau I</span>
            </div>
            <div className="classification-item">
              <span className="range">35,0 - 39,9</span>
              <span className="status">Obesidade grau II</span>
            </div>
            <div className="classification-item">
              <span className="range">40,0 ou mais</span>
              <span className="status">Obesidade grau III</span>
            </div>
          </div>
          <div className="disclaimer">
            <p>⚠️ <strong>Importante:</strong> O IMC é apenas uma referência. Para uma avaliação completa da sua saúde, consulte sempre um profissional qualificado.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
