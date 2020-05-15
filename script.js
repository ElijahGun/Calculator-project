var prevNum = document.querySelector('[data-previous-num]');
var curNum = document.querySelector('[data-current-num]');
var deleteNum = document.querySelector('[data-delete]');
var allClear = document.querySelector('[data-all-clear]');
var equalBtn = document.querySelector('[data-equals]');
var dataOperator = document.querySelectorAll('[data-operator]');
var dataNum = document.querySelectorAll('[data-number]');

var mathSymbol = '';
var statusComplete = false;

function appendNum(x) {
  if (x == '.' && curNum.innerText.includes('.')) return;
  if (statusComplete) {
    curNum.innerText = '';
    curNum.innerText = curNum.innerText + x;
    statusComplete = false;
  } else {
    curNum.innerText = curNum.innerText + x;
  }
}

function removeNum() {
  curNum.innerText = curNum.innerText.slice(0, -1);
}

function clear() {
  curNum.innerText = '';
  prevNum.innerText = '';
}

function compute() {
  var lastOperator = prevNum.innerText.slice(-1).toString();
  switch (lastOperator) {
    case '+':
      prevNum.innerText =
        parseFloat(prevNum.innerText.slice(0, -1)) +
        parseFloat(curNum.innerText) +
        ' ' +
        mathSymbol;
      curNum.innerText = '';
      break;
    case '-':
      prevNum.innerText =
        parseFloat(prevNum.innerText.slice(0, -1)) -
        parseFloat(curNum.innerText) +
        ' ' +
        mathSymbol;
      curNum.innerText = '';
      break;
    case '*':
      prevNum.innerText =
        parseFloat(prevNum.innerText.slice(0, -1)) *
          parseFloat(curNum.innerText) +
        ' ' +
        mathSymbol;
      curNum.innerText = '';
      break;
    case '÷':
      prevNum.innerText =
        parseFloat(prevNum.innerText.slice(0, -1)) /
          parseFloat(curNum.innerText) +
        ' ' +
        mathSymbol;
      curNum.innerText = '';
      break;
    case '/':
      prevNum.innerText =
        parseFloat(prevNum.innerText.slice(0, -1)) /
          parseFloat(curNum.innerText) +
        ' ' +
        mathSymbol;
      curNum.innerText = '';
      break;
    default:
      return;
      break;
  }
}

function mathOperation(x) {
  mathSymbol = x;
  if (curNum.innerText == '' && prevNum.innerText == '') return; //disallows operator by itself
  if (curNum.innerText == '' && prevNum.innerText !== '') {
    prevNum.innerText = prevNum.innerText.slice(0, -1) + x;
    return;
  }
  if (curNum.innerText !== '' && prevNum.innerText !== '') {
    compute();
    return;
  }
  prevNum.innerText = `${curNum.innerText} ${x}`;
  curNum.innerText = '';
}

function equals() {
  if (curNum.innerText == '' || prevNum.innerText == '') return;
  compute();
  curNum.innerText = prevNum.innerText.slice(0, -1);
  prevNum.innerText = '';
  statusComplete = true;
}

//---------Event listeners-----------

dataNum.forEach((num) =>
  num.addEventListener('click', function () {
    appendNum(num.innerText);
  })
);

deleteNum.addEventListener('click', function () {
  removeNum();
});

allClear.addEventListener('click', function () {
  clear();
});

dataOperator.forEach((operator) =>
  operator.addEventListener('click', function () {
    mathOperation(operator.innerText);
  })
);

equalBtn.addEventListener('click', function () {
  equals();
});

addEventListener('keydown', function (e) {
  switch (e.key) {
    case 'Backspace':
      clear();
      break;
    case 'Delete':
      removeNum();
      break;
    case 'Enter':
      equals();
      break;
    case '+':
      mathOperation('+');
      break;
    case '-':
      mathOperation('-');
      break;
    case '*':
      mathOperation('*');
      break;
    case '/':
      mathOperation('/');
      break;
    default:
      break;
  }
  if (e.key < 10 && e.key >= 0) {
    appendNum(e.key);
  }
});
