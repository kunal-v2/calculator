let currentInput = "0";  
let previousInput = "";
let operation = null;
let shouldResetDisplay = false;


const display = document.getElementById('display');


function updateDisplay() {
    display.value = currentInput;
}


function appendNumber(number) {
    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}


function appendDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}


function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operation = null;
    updateDisplay();
}


function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function performOperation(op) {
    if (operation !== null) {
        calculateResult(); 
    }
    previousInput = currentInput;
    operation = op;
    shouldResetDisplay = true;
}

function calculateResult() {
    if (operation === null || shouldResetDisplay) return; 

    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            result = prev / current;
            break;
        case "%":
            result = prev % current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operation = null;
    previousInput = "";
    shouldResetDisplay = true;
    updateDisplay();
}

function handleKeyPress(event) {
    const key = event.key;

    if (!isNaN(key)) {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === 'Enter') {
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
    } else if (key === '%') {
        performOperation('%');
    } else if (key === 'Escape') {
    } else if (key === 'Backspace') {
    }
}

function backspace() {
    if (currentInput.length > 1) {
        currentInput = currentInput.slice(0, -1);
    } else {
        currentInput = "0";
    }
    updateDisplay();
}

document.addEventListener('keydown', handleKeyPress);
