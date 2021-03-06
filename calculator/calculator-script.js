const allBtn = document.querySelectorAll(".button");
const displayResult = document.querySelector(".result");

let prevResult;
const numberStr = "1234567890";
const operatorStr = "+-%÷×";
const dotOperatorStr = ".";
const plustMinusOperatorStr = "+/-";
let operationVar1, operationVar2, operation;
let tempResult = "";
let operationConfirmed = false;

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Listen for number buttons
    if (numberStr.includes(btn.textContent)) {
      if (operationConfirmed) {
        displayResult.textContent = 0;
      }
      if (!tempResult.includes(".")) {
        operationConfirmed = false;
        tempResult = displayResult.textContent;
        tempResult += btn.textContent;
        displayResult.textContent = parseFloat(tempResult);
      } else {
        tempResult += btn.textContent;
        displayResult.textContent = tempResult;
      }
    }

    // Listen for . operator button
    if (dotOperatorStr.includes(btn.textContent)) {
      // Can not contain more than 1 dot
      if (tempResult.includes(".")) return;
      if (tempResult === "") tempResult = "0";
      tempResult += btn.textContent;
      tempResult = formatFloatingNumberDisplay(tempResult);
    }

    // Listen for +/- opreator button
    if (plustMinusOperatorStr === btn.textContent) {
      tempResult = displayResult.textContent;

      if (parseFloat(tempResult) < 0) {
        tempResult = Math.abs(parseFloat(tempResult));
        displayResult.textContent = tempResult;
      } else if (parseFloat(tempResult) > 0) {
        tempResult = "-" + parseFloat(tempResult);
        displayResult.textContent = tempResult;
      }
    }

    // Listen for different operator buttons + - * / %
    if (operatorStr.includes(btn.textContent)) {
      clearMemory();
      operation = btn.textContent;
      operationVar1 = displayResult.textContent;

      // displayResult.textContent = 0;
      operationConfirmed = true;
    }

    // Listen for = operator button
    if (btn.textContent === "=") {
      operationConfirmed = true;
      clearMemory();
      operationVar2 = displayResult.textContent;
      displayResult.textContent = calculateOperation(
        operationVar1,
        operation,
        operationVar2
      );
      operationVar1 = displayResult.textContent;
      operationVar2 = "";
    }

    // Listen for CE clear button
    if (btn.textContent === "CE") {
      clearMemory();
      displayResult.textContent = 0;
    }
  });
});

const calculateOperation = function (var1, optn, var2) {
  switch (optn) {
    case "+":
      return parseFloat(var1) + parseFloat(var2);

    case "-":
      return parseFloat(var1) - parseFloat(var2);

    case "÷":
      return parseFloat(var1) / parseFloat(var2);

    case "×":
      return parseFloat(var1) * parseFloat(var2);

    case "%":
      return parseFloat(var1) % parseFloat(var2);
  }
};

const clearMemory = function () {
  tempResult = "";
};

const formatFloatingNumberDisplay = function (numberStr) {
  if (numberStr.includes(".")) {
    numberStr =
      parseInt(numberStr.substring(0, numberStr.indexOf("."))) +
      numberStr.substring(numberStr.indexOf("."), numberStr.length);
  }
  return numberStr;
};
