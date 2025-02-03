const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const equalsButton = document.querySelector(".equals");
const output = document.querySelector(".output");
const dotButton = document.querySelector(".dot");
const negativeButton = document.querySelector(".negative");
const acButton = document.querySelector(".ac");

const ROUND = 3;

let userInput = {
  inputNum: "",
  savedNum: "",
  operator: null,
  isComputed: false,
  isNegative: false,
  isFloat: false,
};

acButton.addEventListener("click", () => {
  resetOutput();
});

negativeButton.addEventListener("click", () => {
  userInput.isNegative = !userInput.isNegative;

  if (userInput.isNegative && !userInput.inputNum.startsWith("-")) {
    userInput.inputNum = "-" + userInput.inputNum;
    pushOutput();
  } else if (!userInput.isNegative && userInput.inputNum.startsWith("-")) {
    userInput.inputNum = userInput.inputNum.slice(1);
    pushOutput();
  }
});

dotButton.addEventListener("click", () => {
  if (!userInput.isFloat) {
    userInput.isFloat = true;
    userInput.inputNum += ".";
    pushOutput();
  }
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (userInput.isComputed) {
      userInput.isComputed = false;
      resetOutput();
    }
    userInput.inputNum += button.innerText;

    pushOutput();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.operator = button.innerText;
    userInput.savedNum = userInput.inputNum;
    userInput.inputNum = "";
    userInput.isFloat = false;
    userInput.isNegative = false;
    pushOutput();
  });
});

equalsButton.addEventListener("click", () => {
  let num1 = parseFloat(userInput.inputNum);
  let num2 = parseFloat(userInput.savedNum);

  if (userInput.savedNum.length > 0 && userInput.operator !== null) {
    switch (userInput.operator) {
      case "+":
        pushOutput(roundCheck(num2 + num1));
        break;

      case "-":
        pushOutput(roundCheck(num2 - num1));
        break;

      case "*":
        pushOutput(roundCheck(num2 * num1));
        break;

      case "/":
        num1 !== 0 && num2 !== 0
          ? pushOutput(roundCheck(num2 / num1))
          : pushOutput("3RR0R");
        break;

      case "%":
        pushOutput(roundCheck((num2 / 100) * num1));
        break;
    }
  }
  userInput.isComputed = true;
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    if (
      userInput.inputNum[userInput.inputNum.length - 1] != "." &&
      userInput.inputNum[userInput.inputNum.length - 1] != "-"
    ) {
      userInput.inputNum = userInput.inputNum.slice(0, -1);
      pushOutput();
    }
  }
});

function pushOutput(info = userInput.inputNum) {
  const result = document.createElement("p");
  const oldResult = document.querySelector(".result");

  if (oldResult) {
    output.removeChild(oldResult);
  }

  result.innerText = info;
  result.classList.add("result");
  output.appendChild(result);
}

function resetOutput() {
  userInput.inputNum = "";
  userInput.savedNum = "";
  userInput.isFloat = false;
  userInput.operator = null;
  userInput.isNegative = false;
  pushOutput();
}

function roundCheck(arg) {
  return Number.isInteger(arg) ? arg : Number(arg.toFixed(ROUND));
}

// Just realized that everything would be much easier
// if I've used array to store number inputs and "-", ".".
// Bruh.
