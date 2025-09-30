import React, { useState, useEffect } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [display, setDisplay] = useState('');
  const [history, setHistory] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const addToHistory = (expression, result) => {
    setHistory(prev => [{ expression, result }, ...prev]);
  };

  const calculate = () => {
    try {
      const result = eval(display);
      addToHistory(display, result);
      setDisplay(result.toString());
    } catch {
      setDisplay('Erro');
    }
  };

  const handleButtonClick = (value) => {
    if (value === '=') {
      calculate();
    } else if (value === 'C') {
      setDisplay('');
    } else if (value === 'toggle-theme') {
      setIsDarkMode(!isDarkMode);
    } else {
      // Se o display tem um resultado e o usuário clica em um operador, 
      // usar o resultado como início da nova expressão
      if (display && !isNaN(display) && '+-*/'.includes(value)) {
        setDisplay(display + value);
      } else {
        setDisplay(prev => prev + value);
      }
    }
  };

  const handleKeyPress = (e) => {
    const validKeys = '0123456789+-*/';
    if (validKeys.includes(e.key)) {
      // Se o display tem um resultado e o usuário digita um operador, 
      // usar o resultado como início da nova expressão
      if (display && !isNaN(display) && '+-*/'.includes(e.key)) {
        setDisplay(display + e.key);
      } else {
        setDisplay(prev => prev + e.key);
      }
    } else if (e.key === 'Enter') {
      calculate();
    } else if (e.key === 'Backspace') {
      setDisplay(prev => prev.slice(0, -1));
    } else if (e.key === 'Escape') {
      setDisplay('');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [display]);

  const buttons = [
    { value: '7' }, { value: '8' }, { value: '9' }, { value: 'C', id: 'clear' },
    { value: '4' }, { value: '5' }, { value: '6' }, { value: '/' },
    { value: '1' }, { value: '2' }, { value: '3' }, { value: '*' },
    { value: '0' }, { value: '.' }, { value: '+' }, { value: '-' },
    { value: '=', id: 'equals' }
  ];

  return (
    <div className={`container ${isDarkMode ? 'dark' : ''}`}>
      <div className="calculator">
        <div className="top-bar">
          <button 
            id="toggle-theme" 
            onClick={() => handleButtonClick('toggle-theme')}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <input 
          type="text" 
          id="display" 
          value={display}
          disabled 
        />
        
        <div className="buttons">
          {buttons.map((button, index) => (
            <button
              key={index}
              id={button.id}
              onClick={() => handleButtonClick(button.value)}
            >
              {button.value}
            </button>
          ))}
        </div>
        
        <div className="history">
          <h3>Histórico</h3>
          <ul id="history-list">
            {history.map((item, index) => (
              <li key={index}>
                {item.expression} = {item.result}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
