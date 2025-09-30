const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");
const historyList = document.getElementById("history-list");
const toggleTheme = document.getElementById("toggle-theme");
let currentInput = "";

function addToHistory(expression, result) {
  const li = document.createElement("li");
  li.textContent = `${expression} = ${result}`;
  historyList.prepend(li);
}

function calculate() {
  try {
    const result = eval(currentInput);
    addToHistory(currentInput, result);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Erro";
    currentInput = "";
  }
}

buttons.forEach((btn) => {
  const value = btn.textContent;
  if (value === "=") {
    btn.addEventListener("click", calculate);
  } else if (btn.id === "clear") {
    btn.addEventListener("click", () => {
      currentInput = "";
      display.value = "";
    });
  } else if (btn.id !== "toggle-theme") {
    btn.addEventListener("click", () => {
      currentInput += value;
      display.value = currentInput;
    });
  }
});

// Teclado
document.addEventListener("keydown", (e) => {
  const validKeys = "0123456789+-*/.";
  if (validKeys.includes(e.key)) {
    currentInput += e.key;
    display.value = currentInput;
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  } else if (e.key === "Escape") {
    currentInput = "";
    display.value = "";
  }
});

// Modo escuro
toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
