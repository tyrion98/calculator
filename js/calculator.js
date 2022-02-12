

// const
const numDigits = 10;
const calculatorLayout = ["7", "8", "9", "/", "4", "5", "6", "x", "1", "2", "3", "-",
                    ".", "0", "=", "+"];
let displayValue = 0;
let currentOperator = "";
let numList = [];


// add function
function add(a, b) {

  return a+b;
}

// subtract function
function subtract(a, b) {

  return a-b;
}

// multiply function
function multiply(a, b) {

  return a*b;
}

// divide function
function divide(a, b) {

  return a/b;
}

// operate function takes an operator and 2 nums and calls above function
function operate(operatorStr, a, b){

  let result = 0;
  // switch statement
  switch(operatorStr){

    case "+":
      result = add(a,b);
      break;

    case "-":
      result = subtract(a,b);
      break;

    case "*":
      result = multiply(a,b);
      break;

      case "/":
        result = divide(a,b);
        break;
  }

  // update display
  updateDisplay(result);
  numList = [];

}

// updates display after operation
function updateDisplay(result){

  const displayNum = document.querySelector(".display-value");
  displayNum.textContent = result;
}

// creates clear button
function createClearButton(){
  const clearContainer = document.querySelector(".clear-container");
  const clearButton = document.createElement("button");
  clearButton.textContent = "CLEAR"
  clearButton.classList.add("clear-button");

  clearContainer.appendChild(clearButton);

}

// on clear buttons
function clearDisplay(){
  console.log("hi");
  // check
  const displayNum = document.querySelector(".display-value");

  displayNum.textContent = 0;
}

// create number buttons for calculator
function createDigits(){
  // vars
  let i;
  const buttonContainer = document.querySelector(".button-container");

  for(i = 0; i < calculatorLayout.length; i++){

      // make div for each button
      const digitButton = document.createElement("button");
      digitButton.textContent = calculatorLayout[i];
      digitButton.classList.add("buttons");

      // add to container
      buttonContainer.appendChild(digitButton);

  }

  createClearButton();

}

// button listening functions
function buttonListen() {

  const buttonContainer = document.querySelector(".button-container").childNodes;
  const displayNum = document.querySelector(".display-value");
  // get children of button container
  // add an event listener for each button
  buttonContainer.forEach(button => {
    button.addEventListener("click", event => {

      // check
      displayValue = parseInt(button.textContent);
      if(isNaN(displayValue)){

        if(button.textContent == "="){
          operate(currentOperator, numList[0], numList[1]);
        } else {
          currentOperator = button.textContent;
        }
      } else {

        numList.push(displayValue);
        displayNum.textContent = displayValue;
      }

    })
  });

}

// create numDigits
createDigits();
const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clearDisplay);
// button listener
buttonListen();
