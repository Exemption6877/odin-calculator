const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equality = document.querySelector(".equality");
const output = document.querySelector(".output");
const dot = document.querySelector(".dot");
const negative = document.querySelector(".negative");
const ac = document.querySelector(".ac");

const ROUND = 3;

let userInput = {
  first_num: "",
  second_num: "",
  operator: null,
  computed: false,
  negative: false,
  dot: false,
};

ac.addEventListener("click", () => {
  resetOutput();
  pushOutput(userInput.first_num);
});

negative.addEventListener("click", () => {
  userInput.negative = !userInput.negative;

  if (userInput.negative && !userInput.first_num.startsWith("-")) {
    userInput.first_num = "-" + userInput.first_num;
    pushOutput(userInput.first_num);
  } else if (!userInput.negative && userInput.first_num.startsWith("-")) {
    userInput.first_num = userInput.first_num.slice(1);
    pushOutput(userInput.first_num);
  }
});

dot.addEventListener("click", () => {
  if (!userInput.dot) {
    userInput.dot = true;

    userInput.first_num += dot.innerText;
    pushOutput(userInput.first_num);
  }
});

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (userInput.computed) {
      userInput.computed = false;
      pushOutput(resetOutput());
    }
    userInput.first_num += button.innerText;

    pushOutput(userInput.first_num);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.operator = button.innerText;
    userInput.second_num = userInput.first_num;
    userInput.first_num = "";
    userInput.dot = false;
    userInput.negative = false;
    pushOutput(userInput.first_num);
  });
});

equality.addEventListener("click", () => {
  let num1 = parseFloat(userInput.first_num);
  let num2 = parseFloat(userInput.second_num);

  if (userInput.second_num.length > 0 && userInput.operator !== null) {
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

      default:
        pushOutput("3RR0R");
        break;
    }
  } else {
    pushOutput("3RR0R");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Backspace") {
    if (
      userInput.first_num[userInput.first_num.length - 1] != "." &&
      userInput.first_num[userInput.first_num.length - 1] != "-"
    ) {
      userInput.first_num = userInput.first_num.slice(0, -1);
      pushOutput(userInput.first_num);
    }
  }
});

function pushOutput(info) {
  const result = document.createElement("p");
  if (document.querySelector(".result")) {
    output.removeChild(document.querySelector(".result"));
  }
  result.innerText = info;
  result.classList.add("result");
  output.appendChild(result);
}

function resetOutput() {
  userInput.first_num = "";
  userInput.second_num = "";
  userInput.dot = false;
  userInput.operator = null;
  userInput.negative = false;
}
