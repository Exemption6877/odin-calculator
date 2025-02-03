const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equality = document.querySelector(".equality");
const output = document.querySelector(".output");

let userInput = {
  first_num: "",
  second_num: "",
  operator: null,
  computed: false,
};

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    if (userInput.computed) {
      userInput.computed = false;
      pushOutput(resetOutput());
    }
    userInput.first_num += button.innerText;
    pushOutput(userInput.first_num);
    console.log(userInput.first_num);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    userInput.operator = button.innerText;
    userInput.second_num = userInput.first_num;
    userInput.first_num = "";
    console.log(userInput.operator);
  });
});

equality.addEventListener("click", () => {
  if (userInput.second_num.length > 0 && userInput.operator !== null) {
    let num1 = parseInt(userInput.first_num);
    let num2 = parseInt(userInput.second_num);

    switch (userInput.operator) {
      case "+":
        userInput.computed = true;
        return pushOutput(num2 + num1);
      case "-":
        userInput.computed = true;
        return pushOutput(num2 - num1);
      case "*":
        userInput.computed = true;
        return pushOutput(num2 * num1);
      case "/":
        userInput.computed = true;

        return num1 != 0 && num2 != 0
          ? pushOutput(num2 / num1)
          : pushOutput("3RR0R");
      case "%":
        userInput.computed = true;

        return pushOutput(num2 % num1);
      case "AC":
        userInput.computed = true;
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
}
