var prevNum = document.querySelector('[data-previous-num]');
var curNum = document.querySelector('[data-current-num]');
var deleteNum = document.querySelector('[data-delete]');
var allClear = document.querySelector('[data-all-clear]')
var equalBtn = document.querySelector('[data-equals]');
var dataOperator = document.querySelectorAll('[data-operator]');
var dataNum = document.querySelectorAll('[data-number]');

var mathSymbol = '';
var statusComplete = false;

function appendNum(x) {
    if (x == '.' && curNum.innerText.includes('.')) return
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
            prevNum.innerText = parseFloat(prevNum.innerText.slice(0, -1)) + parseFloat(curNum.innerText) + ' ' + mathSymbol;
            curNum.innerText = '';
            break;
        case '-':
            prevNum.innerText = parseFloat(prevNum.innerText.slice(0, -1)) - parseFloat(curNum.innerText) + ' ' + mathSymbol;
            curNum.innerText = '';
            break;
        case '*':
            prevNum.innerText = parseFloat(prevNum.innerText.slice(0, -1)) * parseFloat(curNum.innerText) + ' ' + mathSymbol;
            curNum.innerText = '';
            break;
        case '÷':
            prevNum.innerText = parseFloat(prevNum.innerText.slice(0, -1)) / parseFloat(curNum.innerText) + ' ' + mathSymbol;
            curNum.innerText = '';
            break;
        case '/':
            prevNum.innerText = parseFloat(prevNum.innerText.slice(0, -1)) / parseFloat(curNum.innerText) + ' ' + mathSymbol;
            curNum.innerText = '';
            break;
        default: return;
            break;
    };
    
};

//---------Event listeners-----------

dataNum.forEach(num => num.addEventListener('click', function () {
    appendNum(num.innerText);
}));

deleteNum.addEventListener('click', function () {
    removeNum()
});

allClear.addEventListener('click', function () {
    clear();
});

dataOperator.forEach(operator => operator.addEventListener('click', function (params) {
    mathSymbol = operator.innerText;
    if (curNum.innerText == '' && prevNum.innerText == '') return; //disallows operator by itself
    if (curNum.innerText == '' && prevNum.innerText !== '') {
        prevNum.innerText = prevNum.innerText.slice(0, -1) + mathSymbol;
        return
    };
    if (curNum.innerText !== '' && prevNum.innerText !== '') {
        compute();
        return
    };
    prevNum.innerText = `${curNum.innerText} ${operator.innerText}`;
    curNum.innerText = '';
}))

function equals() {
    if (curNum.innerText == '' || prevNum.innerText == '') return
    compute();
    curNum.innerText = prevNum.innerText.slice(0, -1);
    prevNum.innerText = '';
    statusComplete = true;
}

equalBtn.addEventListener('click', function () {
    equals();
});

addEventListener('keydown', function (e) {
    
});

// I need something that reads what the e.key is and responds with the correct function.





