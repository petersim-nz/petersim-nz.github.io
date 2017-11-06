/**************************************\
| JavaScript for jsCalculator          |
| Peter Sim, November, 2017            |
\**************************************/

const MAXDIGITS = 14  // maximum number of digits to display
const DIGITS    = '01234567890.'
const OPCODES   = '+-*/% x2 sr pm'
const TIMES     = '\u00D7' // multiplication sign
const DIVIDE    = '\u00F7' // division sign
const SQUARED   = '\u00B2' // superscripted 2
const ROOT      = '\u221A' // square root

// create calc data structure
let calc = {
  num1:     undefined,
  operand:  undefined,
  num2:     undefined,
  answer:   undefined,

  reset: function() {
    this.num1 = undefined
    this.operand = undefined
    this.num2 = undefined
    this.answer = undefined
    updateDisplay()
  },

  display:  function() {
    if (this.num2 !== undefined) {
      return this.num2
    } else if (this.operand !== undefined) {
      if (this.operand === '*') return TIMES
      if (this.operand === '/') return DIVIDE
      return this.operand
    } else if (this.num1 !== undefined) {
      return this.num1
    } else {
      return '0'
    }
  },

  history: function() {
    let historyString = ''
    if (this.num1 === undefined) {
      return historyString
    } else {
      historyString += this.num1
      if (this.operand !== undefined) {
        if (this.operand === '*') {
          historyString += TIMES
        } else if (this.operand === '/') {
          historyString += DIVIDE
        } else {
          historyString += this.operand
        }
        if (this.num2 !== undefined) {
          historyString += this.num2
        }
      }
      return historyString
    }
  },

  pushAnswer: function() {
    let tempNum = this.answer
    calc.reset()
    if (!(tempNum === 'Infinity' || tempNum === 'NaN')) {
      this.num1 = tempNum
    }
    updateDisplay()
  },

  round: function(number, precision) { // this function from MDN
    let factor = Math.pow(10, precision)
    let tempNumber = number * factor
    let roundedTempNumber = Math.round(tempNumber)
    return roundedTempNumber / factor
  }
}

// Wait until the DOM has loaded, then call the start function.
document.addEventListener('DOMContentLoaded', start)

function start () {
  calc.reset()
  addEventListeners()
}

function updateDisplay() {
  document.getElementById('display1').innerText = calc.display()
  document.getElementById('display2').innerText = calc.history()
}

function addEventListeners() {
  /* Add click event to all calculator buttons
     Future development: add listener for keyboard keys so that
     users can also use the numeric keypad */
  let calcKeys = document.getElementsByClassName('buttons')
  for (let myKey in calcKeys) {
    if (calcKeys[myKey].localName === 'button') {
      calcKeys[myKey].addEventListener('click', function() {useButton(calcKeys[myKey].value)}, false)
    }
  }
}

function useButton(buttonCode) {
  if (buttonCode === 'AC') { // All Clear
    calc.reset()
    return
  }
  if (buttonCode === 'CE') { // Clear Entry
    clearEntry()
    return
  }
  if (DIGITS.includes(buttonCode)) { // 0123456789 and .
    addDigit(buttonCode)
    return
  }
  if (OPCODES.includes(buttonCode)) { // + - * / % +/- square and square root
    addOpcode(buttonCode)
    return
  }
  if (buttonCode === '=') { // Equals
    doMath()
    return
  }
}

function clearEntry() { // Could be a method in the calc object
  calc['answer'] = undefined
  if (calc['num2'] !== undefined) {
    calc['num2'] = undefined
  } else if (calc['operand'] !== undefined) {
    calc['operand'] = undefined
  } else if (calc['num1'] !== undefined) {
    calc['num1'] = undefined
  }
  updateDisplay()
}

function addDigit(theDigit) {
  if ((calc.answer !== undefined) ||
      (calc.num1 === 'NaN') ||
      (calc.num1 === 'Infinity') ||
      (calc.num2 === 'NaN') ||
      (calc.num2 === 'Infinity')) {
    calc.reset()
  }
  let target = 'num1'
  if (calc.operand !== undefined) {
    target = 'num2'
  }
  if (theDigit === '.') {
    addDecimal(target)
  } else if (calc[target] === undefined) {
      calc[target] = theDigit
  } else if (calc[target].length >= MAXDIGITS) {
    return
  } else if (parseFloat(calc[target] !== 0)) {
    calc[target] = parseFloat(calc[target] += theDigit).toString()
  } else {
    calc[target] += theDigit
  }
  updateDisplay()
}

function addDecimal(myTarget) {
  if (calc[myTarget] === undefined) {
    calc[myTarget] = '0.'
  } else if (!(calc[myTarget].includes('.'))) { // not already a decimal point
    calc[myTarget] += '.'
  }
}

function addOpcode(myOperand) {
  if (calc.answer !== undefined) {
    calc.pushAnswer()
  }
  if (calc.num1 === undefined) {
    calc.num1 = 0
  }
  if (myOperand === 'pm') {
    changeSign()
  } else if (myOperand === '%') {
    percent()
  } else if (myOperand === 'x2') {
    square()
  } else if (myOperand === 'sr') {
    squareRoot()
  } else if (calc.operand === undefined){
    calc['operand'] = myOperand
  }
  updateDisplay()
}

function changeSign() {
  let target = 'num1'
  if (calc.operand !== undefined) {
    target = 'num2'
  }
  let tempStr = '-' + calc[target]
  calc[target] = eval(tempStr).toString()
}

function percent() {
  let target = 'num1'
  if (calc.operand !== undefined) {
    target = 'num2'
  }
  let tempStr = calc[target] + '/ 100'
  calc[target] = eval(tempStr).toString()
}

function square() {
  let target = 'num1'
  if (calc.operand !== undefined) {
    target = 'num2'
  }
  let tempStr = calc[target] + '*' + calc[target]
  calc[target] = calc.round(eval(tempStr), 8).toString()
}

function squareRoot() {
  let target = 'num1'
  if (calc.operand !== undefined) {
    target = 'num2'
  }
  calc[target] = calc.round(Math.sqrt(parseFloat(calc[target])), 8).toString()
}

function doMath() {
  let myAnswer = calc.history()
  myAnswer = myAnswer.replace(/×/g, '\*')
  myAnswer = myAnswer.replace(/÷/g, '\/')
  myAnswer = eval(myAnswer)
  calc['answer'] = calc.round(myAnswer, 8).toString()
  document.getElementById('display1').innerText = calc['answer']
  document.getElementById('display2').innerText = calc.history() + '=' + calc['answer']
}
