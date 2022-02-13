

// const
const numDigits = 10;
const calculatorLayout = ["7", "8", "9", "/", "4", "5", "6", "*", "1", "2", "3", "-",
                    ".", "0", "=", "+"];
let displayValue = 0;
let currentOperator = "";
let isFloat = false;
let numList = [];
let currNum = [];


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
        // display an error msg if someone tries to divide by zero
        if(b == 0){
          alert("You can't divide by 0!");
          return;
        }
        result = divide(a,b);
        break;
  }

  // update display
  // check if isFloat if so rounding
  if(isFloat){result = roundResult(result);}
  updateDisplay(result);
  // empty the list
  numList = [];
  // add result to numList
  numList.push(result);

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
  // check
  const displayNum = document.querySelector(".display-value");

  displayNum.textContent = 0;
  currNum = [];
  numList = [];
  isFloat = false;
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

// rounding function
function roundResult(result){

  return Math.round(result * 1000) / 1000;
}

// show current displayNum
function showCurrentDisplay(displayNum){
  displayNum.textContent = currNum.join("");
}

// clears current entered number
function clearCurrentNum(){

  currNum = [];

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
      // if operator button has been pressed
      if(isNaN(displayValue)){

        // operate
        if(button.textContent == "="){

          // check if there's anything to operate on, if not return
          if(numList < 2){

            return;

          } else{

            // add current number to list and operate
            numList.push(currNum.join(""));
            clearCurrentNum();
            if(isFloat){
              operate(currentOperator, parseFloat(numList[0]), parseFloat(numList[1]));
            } else{
              operate(currentOperator, parseInt(numList[0]), parseInt(numList[1]));
            }


          }
        }else if(button.textContent == "."){

          // add to currNum list
          currNum.push(".");
          isFloat = true;

        }else {
            // operator button has been pressed
            if(currNum.length == 0){

              return;
            }

            // add current num to list & clear for next one
            numList.push(currNum.join(""));
            clearCurrentNum();
            // auto operate
            if(numList.length == 2){

              if(isFloat){
                operate(currentOperator, parseFloat(numList[0]), parseFloat(numList[1]));
              } else{
                operate(currentOperator, parseInt(numList[0]), parseInt(numList[1]));
              }
            }
          // keeps track of current operator
          currentOperator = button.textContent;
        }
        // if number button has been pressed
      } else {

          // push num to number list and display in display
          currNum.push(displayValue);
          showCurrentDisplay(displayNum);
          // operate if numList length ==2 and current operator != null

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
