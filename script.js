let opBtns = document.querySelectorAll(".operator");
let numBtns = document.querySelectorAll(".number");
let currentOp = document.querySelector(".current-op");
let equalBtn = document.querySelector(".equals");
let acBtn = document.querySelector(".ac");
let decimalBtn = document.getElementById("decimal");

let number1 = '';
let number2 = '';
let operation = '';
let result = 0;

// Operation Functions

function add(num1,num2){
    return num1 + num2;
}

function multiply(num1,num2){
    return Number.parseFloat(num1 * num2).toFixed(5);
}

function subtract(num1,num2){
    return num1-num2;
}

function divide(num1,num2){
    if (num2 != 0){
        return Number.parseFloat(num1/num2).toFixed(5);
    }
    else {return "ERROR"};
}

function mod(num1,num2){
    return num1 % num2;
}


function calculate(operation, num1, num2){
    switch(operation){
        case "+": return add(num1,num2);
                break;
        case "-": return subtract(num1,num2);
                break;
        case "*":return multiply(num1,num2);
                break;
        case "/": return divide(num1,num2);
                break;
        case "%": return mod(num1,num2);
                break;
    }
}

// Check for Button Type

function buttonHandler(input){
    const inputValue = input;
    if (inputValue === '+' || 
        inputValue === '-' ||
        inputValue === '/' ||
        inputValue === '*' ||
        inputValue === '%' ) {
            if (!operation){
                operation = inputValue;
            }
            else{
                result = calculate(operation,parseFloat(number1),parseFloat(number2));
                number1 = `${result}`;
                operation = inputValue;
                number2 = '';
            }
        }
    else if(number1 && operation){
        number2 += inputValue;
    }
    else {
        number1 += inputValue;
    }
    console.log(typeof(number1));
    console.log(number2);
    // console.log(number1.concat("."))

    displayInfo();
}


function displayInfo(){
    if (operation && (!number1) && (!number2)){
    currentOp.textContent = '';
    }
    else if (number1 && operation && !(number2)){
        currentOp.textContent = number1 + operation;
    }
    else if (number1 && number2 && result && operation){
        currentOp.textContent =  `${result}${operation}` + number2;
    }
    else {
        currentOp.textContent = number1 + operation + number2;
    } 
}

// EVENT LISTENERS
decimalBtn.addEventListener("click", event => {
    let test1 = Array.from(number1);
    test1  = test1.map(item => {return item.toString();});
    console.log(test1);

    let test2 = Array.from(number2);
    test2  = test2.map(item => {return item.toString();});

    if (number1 && !number2 && !operation) {
        if (test1.includes('.') === false){
            number1 += ".";
            displayInfo();
        }
        else{
            return;
        }
    }
    if (number1 && number2 && operation){
        if (test2.includes(".") === false){
            number2 += ".";
            displayInfo();
        }
        else{
            return;
        }
    }
})

numBtns.forEach(button => {
    button.addEventListener("click", event => {
        buttonHandler(button.textContent);

    })
})

opBtns.forEach(button => {
    button.addEventListener("click", event => {
        buttonHandler(button.textContent);
    })
})

acBtn.addEventListener("click", event =>{
    currentOp.textContent = '';
    number1 = '';
    number2 = '';
    operation = '';
    result = 0;
})

equalBtn.addEventListener("click", event =>{
    result = calculate(operation,parseFloat(number1),parseFloat(number2));
    if(number1 && number2 && result != 0){
        currentOp.textContent = result;
    }
    else if(number1 == NaN || number2 == NaN || result == NaN){
        return "ERROR";
    }
    else{
        currentOp.textContent = '';
    }
})







