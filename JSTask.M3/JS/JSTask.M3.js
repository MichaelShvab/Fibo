// Milestone 3
function fibSic(inputValue) {
  let fib = [0, 1];
  let input = [];
  for (i = 0; i <= inputValue; i++) {
    fib[i + 2] = fib[i] + fib[i + 1];
    console.log(fib[i]);
    input.push(fib[i]);
  }
  return input.slice(-1);
  // n < 2 ? n : fibSic(n - 1) + fibSic(n - 2);
}

// console.log(fibSic(14));
let button = document.getElementById("calcButton")
button.addEventListener("click", () => {
  let inputValue = document.getElementById("inputNum").value;
  let outputValue = fibSic(inputValue);
  document.getElementById("outputNum").innerHTML = outputValue;
});