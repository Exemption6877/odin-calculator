const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const equality = document.querySelector(".equality");
const output = document.querySelector(".output");
const dot = document.querySelector(".dot");
const negative = document.querySelector(".negative");
const ac = document.querySelector(".ac");

const ROUND = 3;

let userInput = {
  inputNum: "",
  savedNum: "",
  operator: null,
  isComputed: false,
  isNegative: false,
  isFloat: false,
};

// const {inputNum, savedNum,operator,computed,}

let currentNum = userInput.inputNum;

ac.addEventListener("click", () => {
  resetOutput();
});

negative.addEventListener("click", () => {
  userInput.isNegative = !userInput.isNegative;

  if (userInput.isNegative && !currentNum.startsWith("-")) {
    currentNum = "-" + currentNum;
    pushOutput();
  } else if (!userInput.isNegative && currentNum.startsWith("-")) {
    currentNum = currentNum.slice(1);
    pushOutput();
  }
});

dot.addEventListener("click", () => {
  if (!userInput.isFloat) {
    userInput.isFloat = true;
    currentNum += ".";
    pushOutput();
  }
});

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (userInput.isComputed) {
      userInput.isComputed = false;
      resetOutput();
    }
    currentNum += button.innerText;

    pushOutput();
  });
});

operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.operator = button.innerText;
    userInput.savedNum = currentNum;
    currentNum = "";
    userInput.isFloat = false;
    userInput.isNegative = false;
    pushOutput();
  });
});

equality.addEventListener("click", () => {
  let num1 = parseFloat(currentNum);
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
      currentNum[currentNum.length - 1] != "." &&
      currentNum[currentNum.length - 1] != "-"
    ) {
      currentNum = currentNum.slice(0, -1);
      pushOutput();
    }
  }
});

function pushOutput(info = currentNum) {
  const result = document.createElement("p");
  if (document.querySelector(".result")) {
    output.removeChild(document.querySelector(".result"));
  }
  result.innerText = info;
  result.classList.add("result");
  output.appendChild(result);
}

function resetOutput() {
  currentNum = "";
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
