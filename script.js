const displayElement = document.getElementById('display');
let currentInput = '0';
let previousInput = null;
let currentOperator = null;
let shouldResetDisplay = false;

function updateDisplay() {
    displayElement.innerText = currentInput;
}

function appendNumber(number) {
    if (currentInput === '0' || shouldResetDisplay) {
        currentInput = number;
        shouldResetDisplay = false;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
        currentInput += number;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function plusMinus() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function percent() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

function setOperator(operator) {
    if (currentOperator !== null) calculate();
    previousInput = currentInput;
    currentOperator = operator;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || previousInput === null) return;
    
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (currentOperator) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '*':
            computation = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Error");
                clearDisplay();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    currentOperator = null;
    previousInput = null;
    shouldResetDisplay = true;
    updateDisplay();
}


