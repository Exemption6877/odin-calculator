const numbers = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operators");
const equality = document.querySelector(".equality");

let currentNumber = 0;
let operator = "";
let compute = false;

numbers.forEach((button) => {
  button.addEventListener("click", () => {
    currentNumber = parseInt(button.innerText);
    console.log(currentNumber);
  });
});

operators.forEach((button) => {
  button.addEventListener("click", () => {
    operator = button.innerText;
    console.log(operator);
  });
});

equality.addEventListener("click", () => {
  compute = true;
});
