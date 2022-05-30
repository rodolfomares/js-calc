const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const invertSignalButton = document.querySelector('[data-invert-signal]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  invertSignal() {
    if('-' === this.currentOperand.toString().charAt(0)) {
      this.currentOperand = this.currentOperand.toString().slice(1);
    } 
    else {
      this.currentOperand = `-${this.currentOperand}`;
    }
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];

    let integerDisplay;

    if(isNaN(integerDigits)) {
      integerDisplay = '';
    } 
    else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    } 

    if(decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    }
    else {
      return integerDisplay;
    }

  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let result;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case '+':
        result = _previousOperand + _currentOperand;
        break;
      case '-':
        result = _previousOperand - _currentOperand;
        break;
      case 'x':
        result = _previousOperand * _currentOperand;
        break;
      case '÷':
        result = _previousOperand / _currentOperand;
        break;
      default:
    }

    this.currentOperand = result;
    this.operation = undefined;
    this.previousOperand = '';
  }

  chooseOperation(operation) {
    if(this.currentOperand === '') return;
    if(this.currentOperand !== '') this.calculate();

    this.operation = operation;

    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  clear() {
    this.previousOperand = '';
    this.currentOperand = '';
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(this.previousOperand)}${this.operation || ''}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(this.currentOperand);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (number === '.' && this.currentOperand === '') {
      this.currentOperand = '0';
    }
    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

for (const numberButton of numberButtons) {
  numberButton.addEventListener('click', () => {
    calculator.appendNumber(numberButton.getAttribute('data-number'));
    calculator.updateDisplay();
  })
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener('click', () => {
    calculator.chooseOperation(operationButton.getAttribute('data-operator'));
    calculator.updateDisplay();
  })
}

allClearButton.addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
})

equalsButton.addEventListener('click', () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

invertSignalButton.addEventListener('click', () => {
  calculator.invertSignal();
  calculator.updateDisplay();
});