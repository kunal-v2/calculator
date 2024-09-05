let currentInput = "0";   // Set initial input
let previousInput = "";
let operation = null;
let shouldResetDisplay = false;

// Get the display element after the DOM has loaded
const display = document.getElementById('display');

// Update the display with the current input
function updateDisplay() {
    display.value = currentInput;
}

// Append number to current input and update the display
function appendNumber(number) {
    if (currentInput === "0" || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// Append a decimal point, but only allow one
function appendDecimal() {
    if (!currentInput.includes(".")) {
        currentInput += ".";
        updateDisplay();
    }
}

// Clear the calculator display and reset values
function clearDisplay() {
    currentInput = "0";
    previousInput = "";
    operation = null;
    updateDisplay();
}

// Toggle the sign of the current input
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
