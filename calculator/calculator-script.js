const allBtn = document.querySelectorAll(".button");
const displayResult = document.querySelector(".result");

let prevResult;
const numberStr = "1234567890.";
const operatorStr = "+-%÷×";
const dotOperatorStr = ".";
const plustMinusOperatorStr = "+/-";
let operationVar1, operationVar2;
let operation;
let tempResult = "";

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (numberStr.includes(btn.textContent)) {
      console.log(`btn textcontent ${btn.textContent}`);
      if (!tempResult.includes(".")) {
        tempResult = displayResult.textContent;
      }
      tempResult += btn.textContent;
      console.log(`tempResult is ${tempResult}`);
      displayResult.textContent = parseFloat(tempResult);
    }
    if (dotOperatorStr.includes(btn.textContent)) {
      if (tempResult.includes(".") && btn.textContent === ".") return;
      tempResult += btn.textContent;
    }
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
  });
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (operatorStr.includes(btn.textContent)) {
      clearMemory();
      operation = btn.textContent;
      operationVar1 = displayResult.textContent;

      displayResult.textContent = 0;
    }
  });
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "=") {
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
  });
});

allBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "CE") {
      clearMemory();
      displayResult.textContent = 0;
    }
  });
});

const calculateOperation = function (var1, optn, var2) {
  console.log("in switch " + optn);
  switch (optn) {
    case "+":
      return parseFloat(var1) + parseFloat(var2);
      break;
    case "-":
      return parseFloat(var1) - parseFloat(var2);
      break;
    case "÷":
      return parseFloat(var1) / parseFloat(var2);
      break;
    case "×":
      return parseFloat(var1) * parseFloat(var2);
      break;
    case "%":
      return parseFloat(var1) % parseFloat(var2);
      break;
  }
};

const clearMemory = function () {
  tempResult = "";
};
