const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
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
  computed: false,
  negative: false,
  dot: false,
};

let currentNum = userInput.inputNum;

ac.addEventListener("click", () => {
  resetOutput();
  pushOutput();
});

negative.addEventListener("click", () => {
  userInput.negative = !userInput.negative;

  if (userInput.negative && !currentNum.startsWith("-")) {
    currentNum = "-" + currentNum;
    pushOutput();
  } else if (!userInput.negative && currentNum.startsWith("-")) {
    currentNum = currentNum.slice(1);
    pushOutput();
  }
});

dot.addEventListener("click", () => {
  if (!userInput.dot) {
    userInput.dot = true;

    currentNum += ".";
    pushOutput();
  }
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (userInput.computed) {
      userInput.computed = false;
      resetOutput();
      pushOutput();
    }
    currentNum += button.innerText;

    pushOutput();
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.operator = button.innerText;
    userInput.savedNum = currentNum;
    currentNum = "";
    userInput.dot = false;
    userInput.negative = false;
    pushOutput();
  });
});

equality.addEventListener("click", () => {
  let num1 = parseFloat(currentNum);
  let num2 = parseFloat(userInput.savedNum);

  if (userInput.savedNum.length > 0 && userInput.operator !== null) {
    switch (userInput.operator) {
      case "+":
        userInput.computed = true;
        pushOutput(
          Number.isInteger(num2 + num1)
            ? num2 + num1
            : Number((num2 + num1).toFixed(ROUND))
        );
        break;
      case "-":
        userInput.computed = true;
        pushOutput(
          Number.isInteger(num2 - num1)
            ? num2 - num1
            : Number((num2 - num1).toFixed(ROUND))
        );
        break;
      case "*":
        userInput.computed = true;
        pushOutput(
          Number.isInteger(num2 * num1)
            ? num2 * num1
            : Number((num2 * num1).toFixed(ROUND))
        );
        break;
      case "/":
        userInput.computed = true;
        num1 != 0 && num2 != 0
          ? pushOutput(
              Number.isInteger(num2 / num1)
                ? num2 / num1
                : Number((num2 / num1).toFixed(ROUND))
            )
          : pushOutput("3RR0R");
        break;
      case "%":
        userInput.computed = true;
        pushOutput(
          Number.isInteger((num2 / 100) * num1)
            ? (num2 / 100) * num1
            : Number(((num2 / 100) * num1).toFixed(ROUND))
        );
        break;
    }
  }
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
  userInput.dot = false;
  userInput.operator = null;
  userInput.negative = false;
}

// Just realized that everything would be much easier
// if I've used array to store number inputs and "-", ".".
// Bruh.
