const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equality = document.querySelector(".equality");

let currentNumber = {
  num: "",
  operator: null,
  compute: false,
};

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber.num += [parseInt(button.innerText)];
    console.log(currentNumber.num);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber.operator = button.innerText;
    console.log(currentNumber.operator);
  });
});

equality.addEventListener("click", () => {
  compute = true;
});
