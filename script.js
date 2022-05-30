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
    if ('-' === this.currentOperand.toString().charAt(0)) {
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

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    }
    else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
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
    if (this.currentOperand === '') return;
    if (this.currentOperand !== '') this.calculate();

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

document.addEventListener('keydown', (event) => {
  event.preventDefault();
  switch (event.key) {
    case '0':
      document.querySelector('[data-number="0"]').click();
      break;
    case '1':
      document.querySelector('[data-number="1"]').click();
      break;
    case '2':
      document.querySelector('[data-number="2"]').click();
      break;
    case '3':
      document.querySelector('[data-number="3"]').click();
      break;
    case '4':
      document.querySelector('[data-number="4"]').click();
      break;
    case '5':
      document.querySelector('[data-number="5"]').click();
      break;
    case '6':
      document.querySelector('[data-number="6"]').click();
      break;
    case '7':
      document.querySelector('[data-number="7"]').click();
      break;
    case '8':
      document.querySelector('[data-number="8"]').click();
      break;
    case '9':
      document.querySelector('[data-number="9"]').click();
      break;
    case '+':
      document.querySelector('[data-operator="+"]').click();
      break;
    case '-':
      document.querySelector('[data-operator="-"]').click();
      break;
    case '*':
      document.querySelector('[data-operator="x"]').click();
      break;
    case '/':
      document.querySelector('[data-operator="÷"]').click();
      break;
    case 'Escape':
      allClearButton.click();
      break;
    case 'Backspace':
      deleteButton.click();
      break;
    case 'Enter':
      equalsButton.click();
      break;
    default: break;
  }
});

// document.addEventListener('keydown', (event) => {
//   event.preventDefault();
//   switch (event.key) {
//     case 'Escape': 
//       allClearButton.click();
//       break;
//     case 'Backspace': 
//       deleteButton.click();
//       break;
//     case 'Enter': 
//       equalsButton.click();
//       break;
//   }
// })