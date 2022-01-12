let button = document.getElementById("calcButton");
let errorWindow = document.getElementById("errWindow");
let inputWindow = document.getElementById("inputNum");
let serverUrl = "http://localhost:5050/fibonacci/";
let outputValue = document.getElementById("outputNum");
let error42 = document.getElementById("err42");

button.addEventListener("click", () => {
  let inputValue = document.getElementById("inputNum").value;

  fetch(serverUrl + inputValue)
    .then((res) => {
      outputValue.classList.add("spinner-border", "d-none")
      errorWindow.classList.add("d-none")
      error42.classList.add("d-none")
      inputWindow.classList.remove("text-danger", "is-invalid")

      if (res.status >= 400) {
        return res.text();
      }
      return res.json();

    })
    .then((res) => {
      outputValue.classList.remove("spinner-border")

      if (typeof res === "object") {
        errorWindow.innerText = "";
        outputValue.classList.remove("d-none")
        outputValue.innerText = res.result;
        return;
      }

      if (inputValue > 50) {
        outputValue.innerText = "";
        errorWindow.classList.remove("d-none");
        inputWindow.classList.add("text-danger", "is-invalid");
        errorWindow.innerText = "Can't be larger than 50";

      } else if (inputValue == 42) {
        errorWindow.innerText = "";
        error42.classList.remove("d-none")
        error42.innerText = "Server Error: " + res;

      } else {
        error42.innerText = "";
      }
    });
});
