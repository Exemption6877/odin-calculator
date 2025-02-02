const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equality = document.querySelector(".equality");

let currentNumber = {
  first_num: "",
  second_num: "",
  operator: null,
  compute: false,
};

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber.first_num += button.innerText;
    console.log(currentNumber.first_num);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber.operator = button.innerText;
    currentNumber.second_num = currentNumber.first_num;
    currentNumber.first_num = "";
    console.log(currentNumber.operator);
  });
});

equality.addEventListener("click", () => {
  if (currentNumber.second_num.length > 0 && currentNumber.operator !== null) {
    let num1 = parseInt(currentNumber.first_num);
    let num2 = parseInt(currentNumber.second_num);

    // reformat to switch
    if (currentNumber.operator == "+") {
      addCalculator(num1, num2);
    }
  } else {
    console.log("123");
  }
});

function addCalculator(x, y) {
  console.log(x + y);
  return x + y;
}
